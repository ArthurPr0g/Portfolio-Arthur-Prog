// Tabela em dólar para clientes dos EUA (só neste portfólio).
//
// Como os preços foram definidos (pesquisa de 17/10/2026):
// ficam no piso do que um freelancer que mora nos EUA cobra — sites, lojas e
// marca dentro da faixa americana; sistemas de gestão a cerca de 1/3 dela —,
// para parecer bom negócio sem soar barato demais. Não seguem as regras de
// preço em reais do CLAUDE.md (combo termina em 90, não em 97).

export const DADOS_EN = {
  LV: ["Starter", "Professional", "Premium"],
  LV_ERP: ["Basic", "Intermediate", "Advanced"],
  PROD: {
    site: { icon: "🌐", meters: ["Customization", "Animations", "Features", "Support"], p: [
      { name: "Starter Website", price: 890, mo: 59, prazo: "5–10 business days", m: [1, 0, 1, 2],
        ideal: "Getting started and need to show up on Google and get contacted.",
        f: ["Up to 5 pages or a single landing page", "Professional template with your brand colors and logo", "WhatsApp, contact form and map", "Basic SEO and SSL security", "2 revision rounds · 30 days of support"] },
      { name: "Business Website", price: 1790, mo: 59, prazo: "7–14 business days", m: [3, 3, 2, 2], pop: true,
        ideal: "Businesses that want a strong brand and to earn more trust.",
        f: ["Up to 8 pages", "Layout designed for your brand — not a template", "Scroll animations and hover effects", "Complete SEO", "2 revision rounds · 30 days of support"] },
      { name: "Premium Website", price: 3490, mo: 59, prazo: "14–28 business days", m: [5, 5, 4, 4],
        ideal: "Standing out, with online booking or a client area.",
        f: ["Up to 15 pages with exclusive design and an approved preview", "Advanced animations and page transitions", "Dashboard to edit the whole site + copy review", "Online booking or members area", "Advanced SEO, very fast and accessible", "1 integration with another system", "3 revision rounds · 60 days of support"] } ] },
    loja: { icon: "🛒", meters: ["Customization", "Sales features", "Management", "Support"], p: [
      { name: "Starter Store", price: 1490, mo: 89, prazo: "7–14 business days", m: [1, 1, 1, 2],
        ideal: "Selling on Instagram or by message and want a catalog with a cart.",
        f: ["Up to 50 products (no variants), 20 added for you", "Cart with order requests by email or WhatsApp", "Flat-rate shipping", "Orders and products dashboard", "2 revision rounds · 30 days of support"] },
      { name: "Growth Store", price: 2990, mo: 89, prazo: "14–28 business days", m: [3, 4, 3, 3], pop: true,
        ideal: "Getting paid online, with inventory and customer accounts.",
        f: ["Up to 300 products with variants (size, color)", "Online card payments and discount codes", "Free shipping by order value or region, local pickup and calculated rates", "Search, filters, reviews and animations", "Customer accounts and automatic emails", "Inventory control and sales reports", "2 revision rounds · 60 days of support"] },
      { name: "Enterprise Store", price: 5490, mo: 89, prazo: "14–28 business days", m: [5, 5, 5, 5],
        ideal: "Stores that want an exclusive experience and automations.",
        f: ["Unlimited products with a full management page", "Exclusive design and custom animated banners", "Wishlist, cart and smart search", "Subscriptions or recurring orders", "Step-by-step order tracking", "Sales dashboard and automations", "3 revision rounds · 90 days of support"] } ] },
    erp: { icon: "📊", meters: ["Users", "Modules", "Automation", "Support"], p: [
      { name: "Essential Management", price: 2990, mo: 99, prazo: "7–14 business days", m: [1, 2, 1, 2],
        ideal: "Running everything on spreadsheets or paper and ready to get organized.",
        f: ["Up to 5 users (admin and staff)", "Customers, suppliers and products/services", "Quotes and orders as PDF", "Inventory with low-stock alerts", "Payables, receivables, cash flow and dashboard", "Daily backups · 1h training · 30 days of support"] },
      { name: "Professional Management", price: 5990, mo: 149, prazo: "14–28 business days", m: [3, 3, 4, 3], pop: true,
        ideal: "Teams that want automatic billing and more control.",
        f: ["Up to 15 users with permissions", "Professional invoices and receipts as PDF", "Online payments and recurring billing (Stripe)", "Purchasing, commissions and store integration", "Excel/PDF reports and change history", "2 training sessions + manual · 60 days of support"] },
      { name: "Custom Management", price: 9990, mo: 199, prazo: "28–52 business days", m: [5, 5, 5, 5], from: true,
        ideal: "Operations with their own rules that off-the-shelf software can't handle.",
        f: ["Unlimited users with detailed permissions", "Inventory by batch, expiry date or unit", "Memberships, PDF contracts, returns and P&L", "Up to 3 custom modules (work orders, scheduling, fleet…)", "Reports your way and full history", "Training per team · 90 days of support"] } ] },
  },
  BRAND: [
    { name: "Logo Design", price: 390, combo: 390, prazo: "5–7 business days", m: [2, 2, 2, 2],
      ideal: "No logo yet and want to start with the essentials done right.",
      f: ["2 logo concepts created from scratch", "2 revision rounds", "Horizontal, vertical and icon versions", "Brand color palette and fonts", "PNG, SVG and PDF files (light and dark backgrounds)", "Favicon and social media profile picture"] },
    { name: "Brand Kit from Your Logo", price: 490, combo: 490, prazo: "5–10 business days", m: [3, 3, 3, 3],
      ideal: "Already have a logo and need the rest of the brand: colors, fonts, patterns and social media.",
      f: ["Your current logo reviewed and vectorized, if needed", "Brand color palette and fonts", "Brand guide in PDF (correct use, colors, fonts)", "Business card and email signature", "Social media kit: profile, cover and 5 post/story templates", "Everything applied to your website or store"] },
    { name: "Full Brand Identity", price: 790, combo: 790, prazo: "7–14 business days", m: [5, 5, 5, 4], pop: true,
      ideal: "Logo + identity together, cheaper than separately ($880): a complete brand on your website, social media and print.",
      f: ["Everything in Logo Design, with 3 concepts and 3 revision rounds", "Brand guide in PDF (correct use, colors, fonts)", "Business card and email signature", "Social media kit: profile, cover and 5 post/story templates", "Brand graphic elements and patterns", "Everything applied to your website or store"] },
  ],
  CMP: {
    site: [["Pages", "up to 5", "up to 8", "up to 15"], ["Design", "adapted template", "designed for your brand", "exclusive + preview"], ["Animations", "—", "on scroll and hover", "advanced + transitions"], ["WhatsApp, form and map", "✓", "✓", "✓"], ["SEO (Google)", "basic", "complete", "advanced + high speed"], ["Dashboard to edit the site", "—", "—", "✓"], ["Copy review", "—", "—", "✓"], ["Booking or members area", "—", "—", "✓ (pick 1)"], ["Integration with another system", "—", "—", "1"], ["Free domain for the 1st year", "✓", "✓", "✓"], ["Revision rounds", "2", "2", "3"], ["Support after delivery", "30 days", "30 days", "60 days"], ["Timeline", "5–10 business days", "7–14 business days", "14–28 business days"]],
    loja: [["Products", "up to 50 (no variants)", "up to 300 with variants", "unlimited"], ["Checkout", "order request", "online payment", "online payment"], ["Card payments and discount codes", "—", "✓", "✓"], ["Subscriptions / recurring", "—", "—", "✓"], ["Shipping", "flat rate", "+ free, pickup, calculated rates", "+ free, pickup, calculated rates"], ["Search, filters and reviews", "—", "✓", "✓ + smart search"], ["Design", "store template", "with animations", "exclusive + animated banners"], ["Customer accounts", "—", "✓ + automatic emails", "✓ + step-by-step tracking"], ["Management", "orders and products", "+ inventory and reports", "+ dashboard and automations"], ["Free domain for the 1st year", "✓", "✓", "✓"], ["Revision rounds", "2", "2", "3"], ["Support after delivery", "30 days", "60 days", "90 days"], ["Timeline", "7–14 business days", "14–28 business days", "14–28 business days"]],
    erp: [["Users", "up to 5", "up to 15", "unlimited"], ["Customers, suppliers and products", "✓", "✓", "✓"], ["Quotes and orders", "✓ with PDF", "✓ + commissions", "✓ + contracts and returns"], ["Inventory", "in, out and alerts", "+ purchasing", "by batch, expiry date or unit"], ["Finance", "payables, receivables and cash", "+ online payments (Stripe)", "+ memberships and P&L"], ["Invoices and receipts (PDF)", "—", "✓", "✓"], ["Online store integration", "—", "✓", "✓"], ["Reports", "main dashboard", "filters + Excel/PDF", "custom"], ["Custom modules", "—", "—", "up to 3"], ["Training", "1h", "2 sessions + manual", "per team"], ["Support after delivery", "30 days", "60 days", "90 days"], ["Timeline", "7–14 business days", "14–28 business days", "28–52 business days"]],
  },
  COMBOS: [["Start", "site", 0], ["Business", "site", 1], ["Enterprise", "site", 2], ["Store Start", "loja", 0], ["Store Growth", "loja", 1], ["Store Enterprise", "loja", 2]],
  ORCAMENTO: { caps: [2000, 6000, Infinity], rotulos: ["Up to $2,000", "$2,000 – $6,000", "Over $6,000"] },
};
