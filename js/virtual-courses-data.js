/* EMFT virtual course schedule — the open sessions listed on
   virtual-courses.html. The body below must stay valid JSON: it is parsed by
   scripts/build-virtual-courses.py and read by the browser.

   TO ADD A SESSION, copy the shape below into the list and fill it in:

     {"id": "credit-analysis-nov-2026",
      "start": "2026-11-09",
      "end": "2026-11-12",
      "time": "09:00–13:00 Gulf Standard Time",
      "seats": "open",
      "fee": {"amount": 1450, "currency": "USD"},
      "pay": "https://buy.stripe.com/XXXXXXXXXXXX",
      "en": {"tag": "Technical", "name": "Corporate Lending & Credit Analysis",
             "summary": "Four mornings on structuring, assessing and defending
                         corporate credit decisions."},
      "ar": {"tag": "تقني", "name": "الإقراض المؤسسي والتحليل الائتماني",
             "summary": "أربع جلسات صباحية حول هيكلة قرارات الائتمان المؤسسي
                         وتقييمها والدفاع عنها."}}

   Field by field:
     id      a short unique slug. It becomes the row's anchor, so a session can
             be linked to directly.
     start   first day, as YYYY-MM-DD. The page formats it for each language.
     end     last day. Use the same value as start for a one-day session.
     time    the daily window, written out, including the time zone.
     seats   "open", "filling", "waitlist" or "full". Anything else reads as
             open. "full" and "waitlist" replace the payment button with the
             enquiry form, whatever `pay` says.
     fee     {"amount": <number>, "currency": "USD"} — or null, which shows
             "Fee on request" instead of a price.
     pay     a Stripe Payment Link for this session, or null. With a link the
             row offers Register and pay; without one it offers Request a
             place, which opens the contact form. Create the link in the
             Stripe dashboard under Payment links, one per session, and set
             its quantity limit to the seats you are willing to sell.
     en/ar   tag, name and a one-line summary in each language. Both are
             required: a session with no Arabic text would show English to an
             Arabic reader.

   AFTER EDITING, re-render the page so the schedule works without JavaScript:

       python3 scripts/build-virtual-courses.py
       python3 scripts/build-chrome.py

   An empty list is a valid state. The page then invites people to ask which
   course is running next, which is what it should say when nothing is open. */
window.EMFT_VIRTUAL_COURSES =
[]
;
