# Sitewala website

Read `sitewala.md` first. It holds the rules for language, pages and design.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 (opens /en)
npm run build      # production build
npm run lint       # type check
```

## Where things live

| What | File |
|---|---|
| Phone, WhatsApp, email, address, social links | `src/data/site.ts` |
| All prices (packages, Care Plan, calculator, budget ranges) | `src/data/pricing.ts` |
| Sample sites (colour, live preview link) | `src/data/samples.ts` |
| All visible text, English / Hindi | `src/locales/en.json`, `src/locales/hi.json` (same keys) |
| Brand colours and font | `src/app/globals.css` (`@theme`), `src/app/[locale]/layout.tsx` |
| Form handler | `src/app/api/quote/route.ts` |

## Where enquiries go

Each website enquiry is saved as a response to the owner's Google Form, which adds a row to its Google Sheet. The form link and field codes are in `src/data/leadForm.ts`. Sample liked and message are added to the "what you need" answer.

- **Email alerts:** in Google Forms, open Responses → ⋮ → "Get email notifications for new responses".
- **If you change the form's questions,** update the codes in `src/data/leadForm.ts` (instructions are in that file).
- If Google can't be reached, the customer is asked to WhatsApp instead and the details are printed in the server log.

## Before going live

- [ ] Address and social links in `src/data/site.ts` (phone and email are set)
- [ ] Founder photo (see `src/components/FounderPhoto.tsx`)
- [ ] Email alerts turned on in Google Forms
- [ ] Owner confirms prices in `src/data/pricing.ts`
- [ ] Replace drawn sample mockups with real screenshots once the demo sites exist; set `previewUrl` in `src/data/samples.ts`
