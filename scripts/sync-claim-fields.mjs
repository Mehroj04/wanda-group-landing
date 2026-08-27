/**
 * Force-sync claim-sensitive fields from en.json into all other locales.
 * deepMerge replaces arrays, so locale overrides were undoing EN claim softening.
 */
import fs from 'fs'
import path from 'path'

const dir = 'src/i18n/locales'
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'))

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'en.json')

let n = 0
for (const file of files) {
  const fp = path.join(dir, file)
  const loc = JSON.parse(fs.readFileSync(fp, 'utf8'))

  // Trust bar / hero claims
  loc.hero = { ...loc.hero, stats: en.hero.stats, badge: en.hero.badge, title: en.hero.title, subtitle: en.hero.subtitle, cta: en.hero.cta, ctaSecondary: en.hero.ctaSecondary }

  // About facts
  if (en.about?.facts) {
    loc.about = { ...loc.about, facts: en.about.facts }
  }

  // Why us (softened EN copy)
  if (en.whyUs) {
    loc.whyUs = JSON.parse(JSON.stringify(en.whyUs))
  }

  // Certifications subtitle (no "Products comply")
  if (loc.certifications && en.certifications?.subtitle) {
    loc.certifications = { ...loc.certifications, subtitle: en.certifications.subtitle }
  }

  // Trust marquee
  if (en.trustMarquee) {
    loc.trustMarquee = [...en.trustMarquee]
  }

  // Nav keys used by new IA
  loc.nav = {
    ...loc.nav,
    certifications: loc.nav?.certifications || en.nav.certifications,
    oem: loc.nav?.oem || en.nav.oem,
    markets: loc.nav?.markets || en.nav.markets,
    getQuote: loc.nav?.getQuote || en.nav.getQuote,
  }

  // Soften known "50+" story titles if present as English leftovers
  if (Array.isArray(loc.story?.slides)) {
    loc.story.slides = loc.story.slides.map((slide, i) => {
      const enSlide = en.story?.slides?.[i]
      if (!enSlide) return slide
      const title = String(slide.title || '')
      if (/50\+|500K|15\+/.test(title) || /50\+|500K|15\+/.test(String(slide.desc || ''))) {
        return { ...slide, title: enSlide.title, desc: enSlide.desc }
      }
      return slide
    })
  }

  fs.writeFileSync(fp, JSON.stringify(loc, null, 2) + '\n')
  n++
}

console.log(`Synced claim-sensitive fields into ${n} locale files`)
