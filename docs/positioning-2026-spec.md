# Spec: repositioning copy (2026-09-29)

New positioning: **AI-native web & app builder + lawyer**. General digital services built with AI
(websites, custom business apps, AI assistants/automations, AI visuals) for any niche; legal is a
specialty, not the only market. Stop advertising code review as a service.

Only touch `app/data.ts` and `app/home.tsx`. Do not change components, styles or other files.
Keep TypeScript types valid. Replace strings exactly as below.

## app/data.ts, `en`

- `meta.title`: `${NAME} — AI-Native Web & App Builder & Lawyer`
- `meta.description`: "AI-native builder and lawyer in Buenos Aires. Websites, custom business apps, AI assistants and automations, built fast with the latest AI tools."
- nav: remove the `{ href: "#reviews", label: "Reviews" }` entry.
- `hero.badge`: "Taking new projects: websites, apps & AI automations"
- `hero.role`: "AI-native web & app builder and lawyer"
- `hero.lead`: "I build websites, custom business apps and AI automations with the latest AI tools, so you get a working product in days or weeks, not months."
- `about.title`: "A builder who spent fifteen years as a lawyer first."
- `about.p1`: "I've practiced business law since 2010 and have been building digital products since 2020. Today I work AI-native: AI tools do most of the building, and I own the result, from the plan to the product running live. I build for businesses in any niche: stores, services, professionals and startups."
- `about.p2`: "The legal background isn't a footnote. It's why I scope work carefully, think about what can go wrong, and explain decisions clearly to clients who aren't technical."
- `about.tiles[1]` (label "Code"): label "Building", value "Since 2020", sub "AI-native · React & Next.js certs"
- `marquee`: replace "Code review" with "Nano Banana"; replace "Java · Spring Boot" with "AI agents".
- `graphLabels`: replace "Code review" with "Automations".
- `services.intro`: "For businesses in any niche, remote from Buenos Aires, in English or Spanish. Fixed price and clear delivery dates."
- `services.items` (replace all four):
  1. name "Websites & landing pages", body "Fast, mobile-first sites that load quickly and rank: from a one-page landing to a full company site on your own domain.", deliverables ["live in days, not months", "SEO and analytics ready", "WhatsApp and contact forms wired in"]
  2. name "Custom business apps", body "Apps shaped around how your business actually works: online stores, booking, pricing and stock tools, client portals and dashboards.", deliverables ["login, database and admin panel", "payments with Mercado Pago or Stripe", "built for your niche"]
  3. name "AI assistants & automations", body "Chatbots and agents that answer clients, capture leads and draft content, with a human approval step where it matters.", deliverables ["website, Instagram or WhatsApp", "Gemini, OpenAI or Claude", "human-in-the-loop by design"]
  4. name "AI visuals & legal-aware delivery", body "Product photos, social media assets and short promo videos made with AI, plus plain-language notes on data and terms of service from a practicing lawyer.", deliverables ["Nano Banana and Higgsfield visuals", "privacy-aware by default (GDPR / Ley 25.326)", "bilingual EN / ES"]
- `experience.items[0]`: title "AI-Native Web & App Builder (freelance)", body "Digital products for small businesses, built AI-native: the Zapatería Genaro online store, a costs & pricing tool for a shoe factory, and Digital Assistant, an AI SaaS for Instagram."
- `contact.title`: "Have a website, app or automation in mind?"

## app/data.ts, `es` (same changes, Spanish)

- `meta.title`: `${NAME} — Creador de Webs y Apps con IA y Abogado`
- `meta.description`: "Creador AI-native y abogado en Buenos Aires. Sitios web, apps a medida para tu negocio, asistentes y automatizaciones con IA, hechos rápido con las últimas herramientas."
- nav: remove the `{ href: "#reviews", label: "Revisiones" }` entry.
- `hero.badge`: "Tomando proyectos: webs, apps y automatizaciones con IA"
- `hero.role`: "Creador de webs y apps con IA, y abogado"
- `hero.lead`: "Construyo sitios web, apps a medida y automatizaciones con las últimas herramientas de IA, para que tengas tu producto funcionando en días o semanas, no meses."
- `about.title`: "Un creador de productos que antes fue abogado durante quince años."
- `about.p1`: "Ejerzo el derecho empresarial desde 2010 y construyo productos digitales desde 2020. Hoy trabajo AI-native: las herramientas de IA hacen la mayor parte de la construcción y yo me hago cargo del resultado, desde el plan hasta el producto funcionando. Trabajo para negocios de cualquier rubro: comercios, servicios, profesionales y startups."
- `about.p2`: "La formación legal no es un detalle. Por eso defino bien el alcance, pienso en qué puede salir mal y explico las decisiones con claridad a clientes que no son técnicos."
- `about.tiles[1]`: label "Productos", value "Desde 2020", sub "AI-native · certificaciones React y Next.js"
- `marquee`: replace "Revisión de código" with "Nano Banana"; replace "Java · Spring Boot" with "Agentes de IA".
- `graphLabels`: replace "Code review" with "Automatizaciones".
- `services.intro`: "Para negocios de cualquier rubro, remoto desde Buenos Aires, en español o inglés. Precio cerrado y fechas de entrega claras."
- `services.items`:
  1. name "Sitios web y landing pages", body "Sitios rápidos, pensados para celular y listos para aparecer en Google: desde una landing de una página hasta la web completa de tu empresa con tu dominio.", deliverables ["online en días, no meses", "SEO y analítica listos", "WhatsApp y formularios conectados"]
  2. name "Apps a medida para tu negocio", body "Apps adaptadas a cómo funciona tu negocio: tiendas online, turnos, herramientas de precios y stock, portales de clientes y tableros.", deliverables ["login, base de datos y panel de administración", "pagos con Mercado Pago o Stripe", "pensadas para tu rubro"]
  3. name "Asistentes y automatizaciones con IA", body "Chatbots y agentes que responden a tus clientes, capturan consultas y preparan contenido, con aprobación humana donde importa.", deliverables ["web, Instagram o WhatsApp", "Gemini, OpenAI o Claude", "humano en el circuito por diseño"]
  4. name "Contenido visual con IA y mirada legal", body "Fotos de producto, piezas para redes y videos cortos hechos con IA, más notas claras sobre datos y términos de servicio de parte de un abogado en ejercicio.", deliverables ["visuales con Nano Banana y Higgsfield", "cuidado de datos personales (Ley 25.326 / GDPR)", "bilingüe ES / EN"]
- `experience.items[0]`: title "Creador de webs y apps con IA (freelance)", body "Productos digitales para pymes, construidos AI-native: la tienda online de Zapatería Genaro, una herramienta de costos y precios para una fábrica de calzado y Digital Assistant, un SaaS de IA para Instagram."
- `contact.title`: "¿Tenés en mente una web, una app o una automatización?"

## app/home.tsx

- Stop rendering the "Code review samples" `<Section id="reviews" ...>` block (around line 410). Remove the block and the now-unused `ReviewDiff` import. Leave the `reviews` data in data.ts untouched (so types still compile).
- In the JSON-LD `knowsAbout` array (around line 133), replace "Java", "Spring Boot", "Code review" with "Websites", "Business apps", "AI automations".
- If the JSON-LD has a `jobTitle`, set it to "AI-Native Web & App Builder".

## Done when
`npx tsc --noEmit` and `npm run build` pass. Report the list of edits.
