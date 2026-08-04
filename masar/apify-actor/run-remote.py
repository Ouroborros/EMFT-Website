#!/usr/bin/env python3
"""Run the Apify Actor and pull its dataset down as a CSV — one command.

    export APIFY_TOKEN=apify_api_...      # console.apify.com → Settings → API
    python3 run-remote.py --input input.executivecourses.json --out courses.csv

Assumes the Actor has been pushed once (`apify push` from this directory —
needs `npm i -g apify-cli` and `apify login`). After that, this script is the
whole loop: start a run with the given input, poll until it finishes, download
the dataset as CSV, and print the next pipeline command.

Stdlib only, so it runs anywhere Python does.
"""

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://api.apify.com/v2"


def call(method, path, token, body=None, raw=False):
    url = "{}{}{}token={}".format(API, path, "&" if "?" in path else "?", token)
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            payload = resp.read()
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:400]
        sys.exit("Apify API {} on {} {}: {}".format(e.code, method, path, detail))
    except urllib.error.URLError as e:
        sys.exit("Could not reach api.apify.com ({}) — check your network; "
                 "corporate proxies and sandboxes often block it.".format(e.reason))
    return payload if raw else json.loads(payload).get("data", {})


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--actor", default=None,
                    help="actor id, e.g. yourname~course-catalogue-scraper "
                         "(default: read .actor/actor.json name + your username)")
    ap.add_argument("--input", default="input.executivecourses.json",
                    help="input JSON file for the run")
    ap.add_argument("--out", default="courses.csv", help="where to save the dataset CSV")
    ap.add_argument("--timeout-mins", type=int, default=30,
                    help="give up waiting after this many minutes (run keeps going on Apify)")
    args = ap.parse_args()

    token = os.environ.get("APIFY_TOKEN")
    if not token:
        sys.exit("Set APIFY_TOKEN first — console.apify.com → Settings → API & Integrations.")

    with open(args.input, encoding="utf-8") as fh:
        run_input = json.load(fh)

    actor = args.actor
    if not actor:
        here = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(here, ".actor", "actor.json"), encoding="utf-8") as fh:
            name = json.load(fh)["name"]
        me = call("GET", "/users/me", token)
        actor = "{}~{}".format(me["username"], name)
    print("actor:", actor)
    print("input:", json.dumps(run_input, indent=2))

    run = call("POST", "/acts/{}/runs".format(urllib.parse.quote(actor, safe="~")),
               token, body=run_input)
    run_id = run["id"]
    print("run started: https://console.apify.com/actors/runs/{}".format(run_id))

    deadline = time.time() + args.timeout_mins * 60
    status = run.get("status")
    while status in ("READY", "RUNNING"):
        if time.time() > deadline:
            sys.exit("still running after {} min — watch it in the console and "
                     "re-fetch the dataset later".format(args.timeout_mins))
        time.sleep(15)
        run = call("GET", "/actor-runs/{}".format(run_id), token)
        status = run.get("status")
        print("  status:", status)

    if status != "SUCCEEDED":
        sys.exit("run finished with status {} — see the console link above "
                 "for the log".format(status))

    dataset_id = run["defaultDatasetId"]
    csv_bytes = call("GET", "/datasets/{}/items?format=csv&clean=true".format(dataset_id),
                     token, raw=True)
    with open(args.out, "wb") as fh:
        fh.write(csv_bytes)
    rows = max(csv_bytes.decode(errors="replace").count("\n") - 1, 0)
    print("\nsaved {} ({} data row(s))".format(args.out, rows))
    print("\nNext:")
    print("  python3 ../tools/spreadsheet-to-batch.py {} --out ../import/batch-scraped.json".format(args.out))
    print("  python3 ../tools/merge-catalogue.py ../import --write")
    print("  python3 ../tools/build.py")


if __name__ == "__main__":
    main()
