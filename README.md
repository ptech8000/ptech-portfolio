# P-TECH Portfolio v4

A Next.js portfolio starter for **P-TECH — Precision Technology, Engineering & Creative Hardware**.

## Included
- Responsive dark engineering-lab design
- Home, Work, Lab, Services, About and Contact pages
- 21 project case studies (merged and pruned from v4), including AgriBot, AEGIS, PT-1, MediFlight MF-1, GPS Tracker, Pet Feeder and Code4Us
- Working contact form (`/api/contact`) with validation, honeypot and basic rate limiting
- Lab page with an engineering log plus bench notes and concepts
- Redirects from old v4 project URLs to their merged pages

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Project structure
```
app/data/schema.ts          Project type
app/data/projects/*.ts      One file per case study
app/data/projects/index.ts  Display order (numbers are automatic)
app/data/lab.ts             Lab log + bench notes
app/api/contact/route.ts    Contact form endpoint
next.config.mjs             Old-URL redirects
```
**Add a project:** create `app/data/projects/<slug>.ts` (copy an existing file), import it in `index.ts` and add it to `ordered`. Give it a `flagship` block to feature it on the home page.

## Contact form setup
Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (also set them in your hosting provider's environment settings). Without them the form tells visitors to email directly. With the default sender, Resend only delivers to the address you signed up with; verify a domain to send elsewhere.

## Important content notes
- Project hero images and architecture diagrams are placeholders, not real photos.
- The syringe pump is a prototype, not a clinically validated medical device.
- MediFlight MF-1 is a concept; no flight hardware has been built.
- See `PROJECT-INVENTORY.md` for facts still to confirm.

## Next steps
1. Add real photos, circuit images and test results.
2. Confirm the items in `PROJECT-INVENTORY.md`.
3. Configure the contact-form environment variables.
4. Deploy (e.g. Vercel).
