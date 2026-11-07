---
name: tlbc-gsc-indexing
description: >-
  Manages daily Google Search Console (GSC) manual URL indexing batches for The Long Book Club.
  Use whenever the user asks for the next daily batch (12 high-value URLs) to submit to Google Search Console
  or asks about GSC indexing progress.
---

# The Long Book Club — Google Search Console Indexing Tracker (`tlbc-gsc-indexing`)

Google Search Console caps manual "Request Indexing" submissions at roughly **12 URLs per day**. To systematically index all high-value pages on `thelongbookclub.com` without ever duplicating a previously submitted URL, we maintain a persistent tracker at:

- **Tracker File:** [scripts/indexing-tracker.json](../../../scripts/indexing-tracker.json)

## Workflow When Asked for the Next GSC URLs

1. **Read [scripts/indexing-tracker.json](../../../scripts/indexing-tracker.json):**
   - Check `submittedLog` to see every batch already submitted and when.
   - Check `nextUpcomingBatch` and retrieve the 12 URLs from `batches[nextUpcomingBatch]`.
2. **Also Check for Newly Published Content:**
   - If a brand-new Curated Collection (`/collections/:slug/`) or Journal post (`/journal/:slug/`) was just published and is not yet in `submittedLog`, offer to prioritize it at the top of today's 12 URLs.
3. **Present the 12 URLs Cleanly:**
   - Output the 12 full `https://thelongbookclub.com/.../` URLs (always with trailing slashes) in a clean copy-paste list for Thomas.
4. **Update [scripts/indexing-tracker.json](../../../scripts/indexing-tracker.json):**
   - Append today's batch to `submittedLog` with today's date (`YYYY-MM-DD`) and `"status": "Submitted"`.
   - Advance `nextUpcomingBatch` to the next batch in `batches` (and if `batches` is running low, generate the next prioritized batches from `public/sitemap.xml`).
