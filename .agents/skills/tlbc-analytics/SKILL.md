---
name: tlbc-analytics
description: Live Google Analytics 4 (GA4) reporting and traffic insights for The Long Book Club. Use whenever the user asks about visitor stats, top-performing pages, engagement metrics, traffic channels, or geographic audience data.
---

# TLBC Analytics Skill

This skill allows Antigravity to query live Google Analytics 4 (GA4) traffic data for **The Long Book Club** (Property ID `516902131`) using our dedicated Service Account.

## Usage

Run the Node.js analytics runner:
```bash
node scripts/fetch-analytics.cjs [days]
```
Where `[days]` is an optional integer (defaults to `30`). E.g.:
- `node scripts/fetch-analytics.cjs 7` (Past week)
- `node scripts/fetch-analytics.cjs 30` (Past month)
- `node scripts/fetch-analytics.cjs 90` (Past quarter)

## What it Reports
1. **Overview Totals:** Active users, total page views, sessions, and average session duration.
2. **Top Pages by Engagement:** Identifies which collections, book reviews, or hub pages get the highest traffic and longest dwell time.
3. **Traffic Sources:** Organic Search, Direct, Social, Referral, etc.
4. **Geographic Distribution:** Breakdown by country (US, UK, Canada, Australia, etc.).

## Credentials Location
Service account key:
`/Users/thomas/Desktop/The Long Book Club Project/Web Docs/Important Keys/the-long-book-club-6661a0407573.json`
