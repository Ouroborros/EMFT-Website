#!/usr/bin/env bash
# Downloads the site's photography into assets/img/ and rewrites the HTML to
# use the local copies, so the site no longer depends on Unsplash's servers.
#
# Run once, from the repository root, on a machine with internet access:
#     bash scripts/fetch-photos.sh
#
# Then review and commit:
#     git add -A && git commit -m "Self-host site photography" && git push
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p assets/img

# local-filename|unsplash-photo-id
PHOTOS="
hero-towers|photo-1486406146926-c627a92ad1ab
about-handshake|photo-1521791136064-7986c2920216
assessments-professional|photo-1507679799987-c73779587ccf
program-fintech|photo-1451187580459-43490279c0fa
program-ai|photo-1573164713988-8665fc963095
program-cisi|photo-1611974789855-9c2a0a7236a3
program-esg|photo-1473341304170-971dccb5ac1e
program-negotiation|photo-1556761175-b413da4baf72
program-data|photo-1551288049-bebda4e38f71
case-graduates|photo-1521737604893-d14cc237f11d
case-corridor|photo-1497366216548-37526070297c
case-service|photo-1556742049-0cfed4f6a45d
case-markets|photo-1535320903710-d993d3d77d29
"

echo "Downloading photography..."
for entry in $PHOTOS; do
  name="${entry%%|*}"
  id="${entry##*|}"
  url="https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80"
  echo "  -> assets/img/${name}.jpg"
  curl -fsSL "$url" -o "assets/img/${name}.jpg"
done

echo "Rewriting image paths in HTML..."
for entry in $PHOTOS; do
  name="${entry%%|*}"
  id="${entry##*|}"
  for page in index.html case-studies.html assessments.html; do
    [ -f "$page" ] || continue
    sed -i.bak -E "s#https://images\.unsplash\.com/${id}[^\"]*#assets/img/${name}.jpg#g" "$page"
    rm -f "${page}.bak"
  done
done

echo
echo "Done. Photos are now self-hosted in assets/img/."
echo "Photo credits (Unsplash License — attribution appreciated, not required):"
echo "  Sean Pollock · Cytonn Photography · Hunters Race · NASA · ThisisEngineering"
echo "  Maxim Hopman · Karsten Wuerth · Austin Distel · Luke Chesser · Annie Spratt"
echo "  Nastuh Abootalebi · Blake Wisz · Chris Liverani"
