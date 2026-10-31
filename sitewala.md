# CLAUDE.md: Sitewala

This file tells Claude (and any developer) how to work on the Sitewala website. Read it fully before writing any code or copy.

---

## 1. Project overview

**Sitewala** is a website design company for local and medium-sized businesses in India.
Owner / founder: Manvir Singh.

This repo is Sitewala's **own brand website**. Its jobs:
1. Show business owners what kind of website they can get (live samples, including 3D/animated sites).
2. Explain in simple words how a website helps their business grow.
3. Show the step-by-step process of how Sitewala builds their site.
4. Show clear starting prices.
5. Collect enquiries through a query form and WhatsApp.

**One-line promise:** "Aapke business ki website, jo customer laaye." (Your business's website, one that brings customers.)

---

## 2. Who the site is for

- Local shop owners, restaurant and cafe owners, clinic doctors, salon and gym owners, real estate agents, school and coaching owners, and transport/logistics companies.
- Many are **not tech-savvy**. Many read Hindi or Hinglish more comfortably than English.
- Most browse on a **mobile phone**, often on slower internet.
- They care about **more customers, more calls, more WhatsApp messages, and trust**. They do not care about frameworks or tech terms.

---

## 3. Language rules (most important)

Every word on the site must be understandable by a local shopkeeper. This is what sets Sitewala apart from competitors.

1. **Talk about results, not technology.**
2. **Short sentences.** One idea per line.
3. **Support English and Hindi** with a language toggle on every page. Hinglish is fine in headlines.
4. **Show prices in ₹** openly.
5. If a tech word cannot be avoided, explain it in brackets in everyday words.
6. Never use vague agency phrases like "digital ecosystems," "elevate your online presence," "scalable solutions," or "synergy."
7. Only show numbers that are true and provable. No fake stats such as "5X growth."

### Word swap list (always use the right column)

| Don't write | Write instead |
|---|---|
| Responsive design | Works perfectly on mobile, tablet and computer |
| SEO / SEO optimization | Customers find you on Google |
| Conversion rate / funnels | More visitors become paying customers |
| Lead generation / CTA | More calls and WhatsApp enquiries |
| UI/UX design | Easy to use and looks professional |
| Hosting & domain | Your website's address (like sitewala.in) and the space it lives on |
| CMS | You can change photos and prices yourself |
| Static website | Simple website |
| Dynamic website | Website you can update yourself |
| E-commerce integration | Sell your products online and take payments |
| SSL certificate | Safe and secure website (lock icon) |
| Analytics | See how many people visited your site |
| CRM integration | All your enquiries saved in one place |
| Maintenance plan | We take care of your website every month |
| 3D interactive experience | A website that moves and catches the eye |
| White-hat SEO, retargeting, email automation | Leave out |

---

## 4. Site map

| Page | Purpose |
|---|---|
| **Home** | First impression; summary of everything; strong WhatsApp/quote buttons |
| **Services** | One section per site type: Simple website, Business website, Online store, 3D/moving website, Landing page for ads, Booking website, Old website makeover |
| **Samples** | 5–6 live demo sites, one per business type |
| **How We Work** | 4-step process with time for each step |
| **Grow With a Website** | Plain-language education on how a website helps business |
| **Prices** | Packages, care plan, price calculator, FAQ |
| **Get a Quote** | Query form + WhatsApp + phone |
| **About** | Founder story and photo, why Sitewala |

### Home page section order
1. Top bar: phone, WhatsApp, English/हिंदी switch
2. Hero: headline, moving/3D preview of sample sites, buttons **WhatsApp Us** and **See Prices**
3. Who we make websites for: 6 picture cards, each opening its sample
4. Why your business needs a website: 3 short points with icons
5. How we work: 4 steps
6. Price calculator
7. Before vs After: old site next to the Sitewala version
8. Founder message: photo + 3 simple lines
9. FAQ
10. Query form
11. Footer: address, phone, WhatsApp, social links

### Process steps (use this wording)
1. **Talk to us:** tell us about your business on call or WhatsApp
2. **See the design:** we show you how it will look
3. **We build it:** you approve every change
4. **Go live:** your website is ready and we teach you how to use it

---

## 5. Sample sites

Each sample is a full demo site for an invented business. Use only invented names, never real businesses.

| Sample | Business type | Shows |
|---|---|---|
| Spice Route | Restaurant | Menu, table booking, WhatsApp order |
| CarePlus Clinic | Clinic | Appointment booking, doctor profiles |
| UrbanNest Realty | Real estate | 3D property showcase, enquiry form |
| Kapda House | Clothing shop | Online store with cart and payments |
| FitZone Gym | Gym | Plans, trainer cards, animations |
| SwiftHaul Logistics | Transport | Freight quote calculator, fleet info |

Each sample card on the Samples page shows: the problem, what we built, features (in simple words), a live preview link, and a **"Want one like this?"** button that opens the query form with that sample pre-selected.

---

## 6. Prices (draft, owner will confirm)

Show as "starting from." Keep these values in one config file (`src/data/pricing.ts`) so they can be changed in one place.

| Package | Includes | Starting price |
|---|---|---|
| Dukaan / Starter | 1–5 pages, works on mobile, WhatsApp button, contact form | ₹8,000 |
| Business | Up to 10 pages, found on Google, Maps, gallery | ₹20,000 |
| Online Store | Products, cart, online payment | ₹40,000 |
| 3D / Premium | Custom moving/3D design | Get a quote |
| Care Plan | Hosting, updates, backups, small changes | ₹1,000/month |

### Price calculator
Customer picks: business type → number of pages → extras (WhatsApp order, online payment, booking, Hindi version, 3D section). It shows an estimated ₹ range and a button to send the details as a quote request.

---

## 7. Query form

Keep it short. Five main fields only:
1. Name
2. Phone / WhatsApp number
3. Business type (dropdown)
4. What you need (dropdown: new website, online store, 3D website, makeover, not sure)
5. Budget (dropdown of ₹ ranges)

Optional: message box, sample they liked (pre-filled from the Samples page).

- After submit, show: "Thank you! We'll call you within 24 hours."
- Send each submission to the owner's email **and** save it to a Google Sheet (or Supabase later).
- Show a WhatsApp click-to-chat button next to the form as the faster option.
- Validate the phone number (10 digits for India). Error messages must say what to fix, in simple words.

---

## 8. Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **3D:** React Three Fiber (Three.js) or Spline embeds
- **Animation:** Framer Motion (GSAP only if needed)
- **Forms:** Formspree or EmailJS to start, plus Google Sheets; Supabase later for a lead dashboard
- **Translations:** next-intl (or a simple JSON dictionary) for English / Hindi
- **Hosting:** Vercel
- **Tracking:** Google Analytics + Google Search Console

### Suggested folder structure
```
src/
  app/                 # pages (home, services, samples, process, grow, prices, quote, about)
  components/          # shared UI (Header, Footer, WhatsAppButton, QuoteForm, PriceCalculator...)
  components/3d/       # 3D scenes, lazy-loaded
  data/                # pricing.ts, samples.ts, faq.ts, services.ts
  locales/             # en.json, hi.json
public/
  samples/             # screenshots of sample sites
samples/               # source of each demo site (one folder per sample)
```

---

## 9. Design and build rules

- **Mobile first.** Design for a 360–400px wide phone, then scale up.
- **Fast on slow internet.** Compress images (WebP/AVIF), lazy-load 3D scenes and below-the-fold content, and keep the home page light. 3D must never block the page from showing.
- **Fallback for 3D:** show a static image on low-end devices or when the user prefers reduced motion.
- **Floating WhatsApp button** on every page (bottom right, clear of the phone's safe area).
- **Large, clear buttons** with action words: "WhatsApp Us," "See Prices," "Get Free Quote."
- **Readable text:** body text at least 16px, good contrast, Hindi font that renders Devanagari properly (e.g. Noto Sans Devanagari or Mukta).
- Use real photos of sample sites, not stock images of laptops and sticky notes.
- Keep all text in the locale files, not hard-coded in components, so English and Hindi stay in sync.
- Accessibility: alt text on images, labels on every form field, visible keyboard focus.
- Brand colors and fonts (proposed, defined in `src/app/globals.css`):
  - Primary: deep teal `#0F766E` (trust). Accent: saffron `#F59E0B` (warmth).
  - Text `#1F2937`, background warm off-white `#FFFBF5`.
  - WhatsApp buttons: green `#15803D` (darker than WhatsApp's own green so white text is readable).
  - Font: **Mukta** for both English and Hindi.

---

## 10. Competitor note

Website Wala (website-wala.com) was reviewed for ideas. Borrow the **ideas** only:
- Instant price/quote builder
- Services grouped by business type
- Founder photo and message
- Phone and "Call Now" visible at the top

Do **not** copy their text, images or design. Sitewala must avoid their weak points: tech jargon, too many copy-paste service cards, stock photos instead of real samples, unexplained stats, no "how it works" section, and no WhatsApp button.

---

## 11. Before calling any work done

- [ ] All visible text passes the language rules in section 3 (no jargon).
- [ ] English and Hindi versions both exist for new text.
- [ ] Page works and looks right at phone width.
- [ ] WhatsApp button and quote form work.
- [ ] Prices come from `src/data/pricing.ts`, not hard-coded.
- [ ] Images are compressed; 3D is lazy-loaded with a fallback.
