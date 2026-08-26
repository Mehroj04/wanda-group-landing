import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'src/i18n/locales'

/** Prefer rewriting the whole privacy sentence for key languages. */
const fullByLang = {
  en: 'Your message is delivered to our sales team by email. The form is processed by Web3Forms, a technical provider that transmits the message to us.',
  ru: 'Сообщение приходит в отдел продаж по электронной почте. Форма обрабатывается через Web3Forms — технический сервис, который пересылает письмо нам.',
  zh: '您的留言通过邮件发送至我们的销售团队。表单由技术服务方 Web3Forms 处理并转发给我们。',
}

let files = 0
let leftover = []

for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const code = f.replace('.json', '')
  const path = join(dir, f)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  const section = data?.privacy?.sections?.[3]
  if (!section?.body?.[0]) {
    leftover.push(`${code}: missing privacy.sections[3].body[0]`)
    continue
  }

  if (fullByLang[code]) {
    section.body[0] = fullByLang[code]
  } else {
    let s = String(section.body[0])
    s = s
      .replaceAll('FormSubmit or Formspree', 'Web3Forms')
      .replaceAll('FormSubmit или Formspree', 'Web3Forms')
      .replaceAll('FormSubmit eller Formspree', 'Web3Forms')
      .replaceAll('FormSubmit of Formspree', 'Web3Forms')
      .replaceAll('FormSubmit ou Formspree', 'Web3Forms')
      .replaceAll('FormSubmit o Formspree', 'Web3Forms')
      .replaceAll('FormSubmit lub Formspree', 'Web3Forms')
      .replaceAll('FormSubmit nebo Formspree', 'Web3Forms')
      .replaceAll('FormSubmit alebo Formspree', 'Web3Forms')
      .replaceAll('FormSubmit ali Formspree', 'Web3Forms')
      .replaceAll('FormSubmit ili Formspree', 'Web3Forms')
      .replaceAll('FormSubmit sau Formspree', 'Web3Forms')
      .replaceAll('FormSubmit vagy Formspree', 'Web3Forms')
      .replaceAll('FormSubmit veya Formspree', 'Web3Forms')
      .replaceAll('FormSubmit atau Formspree', 'Web3Forms')
      .replaceAll('FormSubmit yoki Formspree', 'Web3Forms')
      .replaceAll('FormSubmit ё Formspree', 'Web3Forms')
      .replaceAll('FormSubmit au Formspree', 'Web3Forms')
      .replaceAll('„FormSubmit“ arba „Formspree“', 'Web3Forms')
      .replaceAll('FormSubmit vai Formspree', 'Web3Forms')
      .replaceAll('FormSubmit ή το Formspree', 'Web3Forms')
      .replaceAll('FormSubmit বা Formspree', 'Web3Forms')
      .replaceAll('FormSubmit أو Formspree', 'Web3Forms')
      .replaceAll('FormSubmit 또는 Formspree', 'Web3Forms')
      .replaceAll('FormSubmit немесе Formspree', 'Web3Forms')
      .replaceAll('FormSubmit または Formspree', 'Web3Forms')
      .replaceAll('FormSubmit 或 Formspree', 'Web3Forms')
      .replaceAll('FormSubmit หรือ Formspree', 'Web3Forms')
      .replaceAll('FormSubmit hoặc Formspree', 'Web3Forms')
      .replaceAll('FormSubmit / Formspree', 'Web3Forms')
      .replaceAll('FormSubmit/Formspree', 'Web3Forms')
      .replaceAll('FormSubmit', 'Web3Forms')
      .replaceAll('Formspree', 'Web3Forms')

    // Collapse accidental duplicates after single-name swaps
    s = s
      .replaceAll('Web3Forms or Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms или Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms eller Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms of Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms ou Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms o Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms lub Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms nebo Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms alebo Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms ali Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms ili Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms sau Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms vagy Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms veya Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms atau Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms yoki Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms ё Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms au Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms vai Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms ή το Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms বা Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms أو Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms 또는 Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms немесе Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms または Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms 或 Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms หรือ Web3Forms', 'Web3Forms')
      .replaceAll('Web3Forms hoặc Web3Forms', 'Web3Forms')
      .replaceAll('„Web3Forms“ arba „Web3Forms“', 'Web3Forms')

    section.body[0] = s
  }

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
  files++

  const raw = readFileSync(path, 'utf8')
  if (/FormSubmit|Formspree/.test(raw)) leftover.push(code)
}

console.log(JSON.stringify({ files, leftover }, null, 2))
