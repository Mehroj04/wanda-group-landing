import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/i18n/locales')

const termsEn = {
  label: 'Legal',
  title: 'Terms of Use',
  updated: 'Last updated: 27 August 2026',
  intro: [
    'These terms govern use of wandagroups.com, operated by Wanda Group for industrial buyers of gas cylinders, generators and accessories.',
    'By browsing the site or sending an inquiry you agree to these terms and to our Privacy Policy. If you do not agree, do not use the site.',
  ],
  sections: [
    {
      title: 'Who we are',
      body: [
        'Wanda Group manufactures acetylene cylinders, propane cylinders, acetylene generators and related accessories for export. Contact: sales@wandagroups.com, phone / WhatsApp +998 50 713 66 46, WeChat +86 130 8285 5282.',
      ],
    },
    {
      title: 'What the website is for',
      body: [
        'The site presents product information and receives commercial inquiries. It is intended for business buyers, not for consumers shopping as private individuals and not for children.',
      ],
    },
    {
      title: 'Quotes, prices and orders',
      body: [
        'Prices, MOQ, lead times and specifications on the site are indicative. A message through the form or messenger is an inquiry, not an order.',
        'A contract exists only when both sides confirm the offer in writing (email or signed documents) and the agreed deposit is received, unless we state otherwise in that confirmation.',
      ],
    },
    {
      title: 'Photos, videos and certificates',
      body: [
        'Factory photos and videos on the site illustrate production. Extra footage and certificate files are sent privately on request and remain our confidential materials unless we say you may share them.',
      ],
    },
    {
      title: 'Intellectual property',
      body: [
        'Text, photos, videos, logos and layout on this website belong to Wanda Group or our licensors. You may not copy the catalogue for your own commercial site without our written consent.',
      ],
    },
    {
      title: 'Acceptable use',
      body: [
        'Do not misuse the inquiry form (spam, false identity, or attempts to disrupt the site). We may ignore or delete abusive requests.',
      ],
    },
    {
      title: 'Liability',
      body: [
        'We take care to keep information accurate, but the site may contain errors or be temporarily unavailable. To the extent allowed by law, Wanda Group is not liable for indirect loss arising only from use of the website.',
        'Liability for an actual supply contract is set in that contract and in the applicable law, not in these website terms alone.',
      ],
    },
    {
      title: 'Changes',
      body: [
        'We may update these terms. The date at the top shows the current version. Continued use of the site after a change means you accept the updated terms.',
      ],
    },
  ],
  contactLead: 'Questions about these terms:',
}

const termsRu = {
  label: 'Документы',
  title: 'Условия использования',
  updated: 'Обновлено: 27 августа 2026',
  intro: [
    'Эти условия регулируют пользование сайтом wandagroups.com. Сайт ведёт Wanda Group для промышленных покупателей газовых баллонов, генераторов и аксессуаров.',
    'Просматривая сайт или отправляя запрос, вы соглашаетесь с этими условиями и с политикой конфиденциальности. Если не согласны — не пользуйтесь сайтом.',
  ],
  sections: [
    {
      title: 'Кто мы',
      body: [
        'Wanda Group производит ацетиленовые и пропановые баллоны, генераторы ацетилена и сопутствующие аксессуары на экспорт. Связь: sales@wandagroups.com, телефон / WhatsApp +998 50 713 66 46, WeChat +86 130 8285 5282.',
      ],
    },
    {
      title: 'Для чего сайт',
      body: [
        'Сайт показывает продукцию и принимает коммерческие запросы. Он рассчитан на бизнес-покупателей, а не на частных потребителей и не на детей.',
      ],
    },
    {
      title: 'Цены, запросы и заказ',
      body: [
        'Цены, MOQ, сроки и характеристики на сайте — ориентир. Сообщение через форму или мессенджер — это запрос, а не заказ.',
        'Договор возникает, только когда обе стороны письменно подтверждают оферту (почта или подписанные документы) и поступает согласованный аванс, если в подтверждении не сказано иное.',
      ],
    },
    {
      title: 'Фото, видео и сертификаты',
      body: [
        'Фото и видео завода на сайте показывают производство. Дополнительные ролики и файлы сертификатов отправляем лично по запросу; это наши материалы, их нельзя публиковать без нашего согласия.',
      ],
    },
    {
      title: 'Интеллектуальная собственность',
      body: [
        'Тексты, фото, видео, логотип и вёрстка принадлежат Wanda Group или лицензиарам. Каталог нельзя копировать на свой коммерческий сайт без нашего письменного согласия.',
      ],
    },
    {
      title: 'Допустимое использование',
      body: [
        'Не используйте форму запроса для спама, чужих данных или попыток сломать сайт. Такие обращения можем не рассматривать.',
      ],
    },
    {
      title: 'Ответственность',
      body: [
        'Мы стараемся держать информацию точной, но на сайте возможны ошибки и перерывы в работе. В пределах закона Wanda Group не отвечает за косвенные убытки только от пользования сайтом.',
        'Ответственность по реальной поставке определяется договором поставки и применимым правом, а не одними этими условиями сайта.',
      ],
    },
    {
      title: 'Изменения',
      body: [
        'Мы можем обновить эти условия. Дата вверху — текущая версия. Продолжая пользоваться сайтом после изменения, вы принимаете новую редакцию.',
      ],
    },
  ],
  contactLead: 'Вопросы по условиям использования:',
}

const termsZh = {
  label: '法律信息',
  title: '使用条款',
  updated: '更新日期：2026年8月27日',
  intro: [
    '本条款适用于 wandagroups.com。本网站由 Wanda Group 运营，面向气瓶、发生器及配件的工业采购方。',
    '浏览网站或提交询盘，即表示您同意本条款及隐私政策。如不同意，请勿使用本网站。',
  ],
  sections: [
    {
      title: '我们是谁',
      body: [
        'Wanda Group 生产乙炔气瓶、丙烷气瓶、乙炔发生器及相关配件并出口。联系方式：sales@wandagroups.com，电话 / WhatsApp +998 50 713 66 46，微信 +86 130 8285 5282。',
      ],
    },
    {
      title: '网站用途',
      body: [
        '本网站用于展示产品并接收商务询盘，面向企业采购，而非个人消费者或未成年人。',
      ],
    },
    {
      title: '报价、价格与订单',
      body: [
        '网站上的价格、起订量、交期和参数均为参考。通过表单或即时通讯发送的信息属于询盘，不构成订单。',
        '仅在双方书面确认报价（邮件或签署文件）并收到约定定金后成立合同，确认函另有约定的除外。',
      ],
    },
    {
      title: '照片、视频与证书',
      body: [
        '网站上的工厂照片和视频用于说明生产情况。更多影像和证书文件按要求单独发送，未经书面同意不得对外公开。',
      ],
    },
    {
      title: '知识产权',
      body: [
        '本网站的文字、照片、视频、标识和版式归 Wanda Group 或其许可方所有。未经书面同意，不得将产品目录用于自有商业网站。',
      ],
    },
    {
      title: '正当使用',
      body: [
        '请勿滥用询盘表单（垃圾信息、虚假身份或干扰网站运行）。我们可忽略或删除此类请求。',
      ],
    },
    {
      title: '责任',
      body: [
        '我们尽力保证信息准确，但网站仍可能存在差错或短暂无法访问。在法律允许范围内，Wanda Group 不对仅因使用网站而产生的间接损失承担责任。',
        '实际供货合同的责任以该合同及适用法律为准，而非仅以本网站条款为准。',
      ],
    },
    {
      title: '变更',
      body: [
        '我们可能更新本条款。文首日期为现行版本。变更后继续使用网站，即视为接受更新后的条款。',
      ],
    },
  ],
  contactLead: '关于本条款的疑问，请联系：',
}

const chrome = {
  en: {
    termsAnd: ' and the ',
    termsLink: 'Terms of Use',
    footerTerms: 'Terms of Use',
    terms: termsEn,
  },
  ru: {
    termsAnd: ' и ',
    termsLink: 'условиями использования',
    footerTerms: 'Условия использования',
    terms: termsRu,
  },
  zh: {
    termsAnd: '和',
    termsLink: '使用条款',
    footerTerms: '使用条款',
    terms: termsZh,
  },
}

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const loc = file.replace('.json', '')
  const copy = chrome[loc] ?? chrome.en
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))

  data.cta.termsAnd = copy.termsAnd
  data.cta.termsLink = copy.termsLink
  data.footer.terms = copy.footerTerms
  data.terms = copy.terms

  if (loc === 'en') {
    data.cta.privacySuffix =
      ', and to the processing of my personal data to handle this inquiry.'
  }
  if (loc === 'ru') {
    data.cta.privacySuffix =
      ', а также с обработкой персональных данных для ответа на этот запрос.'
  }

  fs.writeFileSync(path.join(dir, file), `${JSON.stringify(data, null, 2)}\n`)
  console.log('patched', file)
}
