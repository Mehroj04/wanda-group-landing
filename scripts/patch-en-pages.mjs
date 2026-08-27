import fs from 'fs'

const path = 'src/i18n/locales/en.json'
const en = JSON.parse(fs.readFileSync(path, 'utf8'))

en.nav = {
  ...en.nav,
  home: 'Home',
  about: 'About',
  products: 'Products',
  factory: 'Factory',
  certifications: 'Certifications',
  oem: 'OEM',
  markets: 'Markets',
  contact: 'Contact',
  getQuote: 'Get a Quote',
  quality: 'Quality',
  faq: 'FAQ',
  applications: 'Applications',
}

en.hero = {
  ...en.hero,
  badge: 'Industrial Gas Cylinder Manufacturer',
  title: 'Industrial Gas Cylinders and Equipment Manufacturer',
  subtitle:
    'Manufacturing, OEM and wholesale supply of acetylene cylinders, propane/LPG cylinders, generators and welding accessories for international export buyers.',
  cta: 'Get a Quote',
  ctaSecondary: 'View Products',
  stats: [
    { value: 'Factory Direct', label: 'Manufacturer-focused supply' },
    { value: 'OEM', label: 'Private label and customization' },
    { value: 'Export', label: 'International shipping support' },
    { value: 'QC', label: 'Inspection and testing process' },
    { value: 'Standards', label: 'Market-specific options on request' },
  ],
}

en.whoWeAre = {
  label: 'Who We Are',
  title: 'Industrial manufacturer for B2B buyers',
  text: 'Wanda Groups manufactures and supplies industrial gas cylinders, generators and welding accessories for overseas distributors, OEM partners and project buyers.',
  text2:
    'Our focus is factory-linked supply, product selection support, bulk orders and export coordination — not retail consumer sales.',
  cta: 'Learn More About Us',
}

en.about = {
  ...en.about,
  facts: [
    { title: 'Manufacturing', desc: 'Forming, welding, testing and finishing for industrial gas cylinders.' },
    { title: 'OEM Support', desc: 'Colour, marking, valve, cap and packing options by order.' },
    { title: 'Quality Process', desc: 'Inspection and testing aligned with order and market requirements.' },
    { title: 'International Export', desc: 'Documentation and packing support for overseas industrial buyers.' },
  ],
}

en.whyUs = {
  ...en.whyUs,
  title: 'Why Choose Wanda Groups',
  subtitle: 'Concrete capabilities for industrial buyers evaluating a manufacturing partner.',
  items: [
    { title: 'Manufacturer-focused supply', desc: 'Product supply oriented around production, not only trading catalogues.' },
    { title: 'OEM support', desc: 'Custom colour, marking, valve and packing discussed per order.' },
    { title: 'Quality control', desc: 'Inspection from materials through packing before shipment.' },
    { title: 'International export', desc: 'Export packing and shipping coordination for overseas buyers.' },
    { title: 'Product customization', desc: 'Specifications adapted to market and application requirements.' },
    { title: 'Responsive sales support', desc: 'Quotes and technical replies through form, email and messengers.' },
    { title: 'Bulk order capability', desc: 'Wholesale quantities supported for distributors and project buyers.' },
  ],
}

en.trustMarquee = [
  'Factory Direct',
  'OEM / Private Label',
  'International Export',
  'Quality Control',
  'Market Standards on Request',
  'Bulk Orders',
]

en.certifications = {
  ...en.certifications,
  subtitle:
    'Standards and certification options are discussed according to product and destination market. Certificate copies are sent privately on request — files are not published on this website.',
}

en.quality = {
  ...en.quality,
  steps: [
    { title: 'Raw Material', desc: 'Incoming materials reviewed against order and process requirements.' },
    { title: 'Production', desc: 'Forming, welding and assembly under plant process control.' },
    { title: 'Inspection', desc: 'Visual, marking and dimensional checks against the order.' },
    { title: 'Testing', desc: 'Pressure and leak tests before cylinders leave the line.' },
    { title: 'Final QC', desc: 'Final quality control before release for packing.' },
    { title: 'Packaging', desc: 'Export packing prepared for transport.' },
    { title: 'Shipment', desc: 'Loading and dispatch documentation for outbound orders.' },
  ],
}

en.cta = {
  ...en.cta,
  title: "Let's Discuss Your Requirements",
  subtitle:
    'Tell us the product, size, quantity, destination country and specifications — our sales team will reply with product information and a quotation.',
  formTitle: 'Request a Quote',
  formSubtitle: 'Complete the form for a commercial inquiry. Required fields are marked.',
  requirements: 'Requirements / Specifications',
  requirementsPlaceholder: 'Valve type, colour, standard, packing, OEM marking...',
  submit: 'Submit Inquiry',
}

en.pages.home = {
  seoTitle: 'Gas Cylinder Manufacturer | Industrial OEM and Export | Wanda Groups',
  seoDescription:
    'Wanda Groups manufactures industrial gas cylinders, generators and welding accessories for OEM, wholesale and international export buyers.',
}

en.pages.certificationsPage = {
  ...en.pages.certificationsPage,
  subtitle:
    'Standards commonly requested by buyers are listed below. Applicability depends on product and destination market. Certificate copies, numbers and validity are shared privately on request — not published as unverified claims.',
  seoTitle: 'Certifications and Standards | Wanda Groups',
  seoDescription:
    'Standards discussed for Wanda Groups gas cylinders by market. Certificate copies are provided privately on request.',
}

en.pages.markets = {
  ...en.pages.markets,
  title: 'Global Markets',
  subtitle:
    'We support international B2B buyers. Regions below describe common inquiry areas — specific countries and projects are confirmed case by case.',
  seoTitle: 'Global Markets | Wanda Groups Export',
  seoDescription:
    'Wanda Groups works with international industrial buyers across Africa, Middle East, Central Asia, Southeast Asia, Latin America and other markets.',
  note: 'We do not publish unverified country counts, customer names or project references on this page.',
  regions: [
    { title: 'Africa', text: 'Industrial and distributor inquiries from African markets.' },
    { title: 'Middle East', text: 'Buyers sourcing cylinders and related equipment for regional projects.' },
    { title: 'Central Asia', text: 'Wholesale and project supply discussions across Central Asian markets.' },
    { title: 'Southeast Asia', text: 'Industrial buyers evaluating export cylinder supply.' },
    { title: 'Latin America', text: 'Inquiries for industrial gas cylinder and accessory supply.' },
    { title: 'Other International Markets', text: 'Additional destinations are reviewed according to product standard and logistics.' },
  ],
}

en.pages.factory = {
  ...en.pages.factory,
  title: 'Factory and Manufacturing',
  subtitle: 'Production, inspection, packing and dispatch — documented with real plant photography and factory videos.',
  seoTitle: 'Factory and Production | Wanda Groups',
  sections: [
    { title: 'Manufacturing', text: 'Cylinder forming, welding and finishing as part of the plant production flow.' },
    { title: 'Production Process', text: 'From shell preparation to assembly and finishing — see in-process stock and production floor footage.' },
    { title: 'Quality Inspection', text: 'Visual, marking and dimensional checks preparing cylinders for shipment.' },
    { title: 'Testing', text: 'Pressure and leak testing applied before products leave the line, according to order requirements.' },
    { title: 'Packaging', text: 'Export packing protects cylinders and fittings for overseas transport.' },
    { title: 'Loading and Export', text: 'Warehouse staging, truck loading and dispatch documentation for outbound orders.' },
  ],
}

en.pages.oem = {
  ...en.pages.oem,
  title: 'OEM and Wholesale',
  subtitle: 'Private label and bulk supply options for distributors and industrial buyers.',
  quoteCta: 'Request OEM Quote',
  capabilities: [
    { title: 'Custom Logo', text: 'Logo and marking options discussed for qualifying OEM orders.' },
    { title: 'Custom Color', text: 'Cylinder colour according to market or brand requirements.' },
    { title: 'Custom Packaging', text: 'Export cartons, pallets and packing marks by order.' },
    { title: 'Private Label', text: 'Labelling and brand presentation for distributor channels.' },
    { title: 'Bulk Orders', text: 'Wholesale quantities for project and distributor procurement.' },
    { title: 'OEM Manufacturing', text: 'Product configuration aligned with your specification and market.' },
    { title: 'Export Support', text: 'Documents and shipping coordination for overseas delivery.' },
  ],
}

en.pages.contactPage = {
  ...en.pages.contactPage,
  title: "Let's Discuss Your Requirements",
  subtitle:
    'Reach our sales team by form, email or messenger. Share product, quantity and destination for a faster quotation.',
}

en.ui = {
  ...en.ui,
  countriesServed: 'Export support',
}

fs.writeFileSync(path, JSON.stringify(en, null, 2) + '\n')
console.log('en.json patched OK')
