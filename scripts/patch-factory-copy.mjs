import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/i18n/locales')

const gallery = {
  en: {
    subtitle:
      'Real production photos and plant videos — forming, stock, packing and dispatch.',
    videosTitle: 'Factory videos',
    videosSubtitle: 'Short clips from the production line. More footage is sent privately on request.',
    items: [
      { title: 'Packed for dispatch', desc: 'Cylinders wrapped and staged in the plant yard for shipment.' },
      { title: 'Production conveyor', desc: 'Cylinder bodies moving through the forming and handling line.' },
      { title: 'LPG finishing line', desc: 'Painted LPG cylinders on the overhead conveyor before packing.' },
      { title: 'Inside the plant', desc: 'The production hall — people, machines and in-process stock.' },
      { title: 'Welded cylinder bodies', desc: 'Shells after circumferential welding, before painting and valves.' },
      { title: 'Shells before painting', desc: 'Unpainted bodies batched on the floor for the next process step.' },
      { title: 'In-process stock', desc: 'Tube sections and capped shells waiting for assembly.' },
      { title: 'Cylinder bodies in stock', desc: 'Rolled shells stacked after welding, before heads and valves.' },
      { title: 'Base rings', desc: 'Foot rings prepared for welding onto cylinder shells.' },
      { title: 'Packed fittings', desc: 'Valves and fittings boxed with foam for export shipment.' },
      { title: 'Acetylene generator', desc: 'A generator unit with hose and fittings, ready to leave the plant.' },
      { title: 'Shells on the floor', desc: 'Open-neck bodies after welding — the batch before valve fitment.' },
    ],
    alts: [
      'Cylinders wrapped in film, staged in the factory yard',
      'Gas cylinder production conveyor under the plant roof',
      'LPG cylinders hanging on the overhead finishing conveyor',
      'Workers walking the Wanda Group factory floor',
      'Unpainted welded propane cylinder bodies stacked two-high',
      'Rows of unpainted cylinder shells on the concrete floor',
      'Cylinder tube stock and capped shells in the workshop',
      'Stacked raw cylinder bodies against the factory wall',
      'Steel base rings piled before assembly',
      'Brass fittings packed in a carton with foam',
      'Acetylene generator with hose and boxed accessories',
      'Unpainted cylinder shells with open necks after welding',
    ],
    heroAlt: 'Wrapped gas cylinders staged in the factory yard for dispatch',
    aboutAlt: 'Workers on the Wanda Group factory floor',
    generatorAlt: 'Acetylene generator photographed at the plant',
    faqA:
      'Yes. Watch production videos in the Factory section on this page. Extra footage, packing clips and certificates are sent privately on request.',
    privacy:
      'This policy explains what personal data we collect through the site, why we use it, and how you can contact us about it. Factory production videos are shown on this website. Certificate files are sent privately on request.',
  },
  ru: {
    subtitle: 'Реальные фото и видео завода — формовка, склад, упаковка и отгрузка.',
    videosTitle: 'Видео с завода',
    videosSubtitle: 'Короткие ролики с линии. Дополнительные материалы отправим лично по запросу.',
    items: [
      { title: 'Готово к отгрузке', desc: 'Баллоны в плёнке на заводском дворе — партия под отправку.' },
      { title: 'Конвейер', desc: 'Корпуса идут по линии формовки и перемещения.' },
      { title: 'Линия LPG', desc: 'Окрашенные LPG-баллоны на подвесном конвейере до упаковки.' },
      { title: 'Цех', desc: 'Производственный зал — люди, станки и незавершённый запас.' },
      { title: 'Сваренные корпуса', desc: 'Обечайки после кольцевой сварки, до покраски и вентилей.' },
      { title: 'До покраски', desc: 'Неокрашенные корпуса на полу — следующая операция.' },
      { title: 'Задел в цеху', desc: 'Трубы и корпуса с днищами ждут сборки.' },
      { title: 'Склад корпусов', desc: 'Сваренные обечайки в штабеле до приварки горловин.' },
      { title: 'Опорные кольца', desc: 'Башмаки, которые приварят к корпусу баллона.' },
      { title: 'Упакованная арматура', desc: 'Вентили и фитинги в коробе с пенозащитой.' },
      { title: 'Генератор ацетилена', desc: 'Агрегат со шлангом и комплектом — готов к отгрузке.' },
      { title: 'Корпуса на полу', desc: 'Открытая горловина после сварки — партия до установки вентиля.' },
    ],
    alts: [
      'Баллоны в плёнке на заводском дворе',
      'Конвейер газовых баллонов под навесом цеха',
      'LPG-баллоны на подвесном конвейере отделки',
      'Сотрудники на производственном участке Wanda Group',
      'Неокрашенные сваренные корпуса, сложенные в два ряда',
      'Ряды неокрашенных корпусов на бетонном полу',
      'Трубный задел и корпуса с днищами в цеху',
      'Штабель сырых корпусов у стены цеха',
      'Стальные опорные кольца до сборки',
      'Латунная арматура в картоне с пенозащитой',
      'Генератор ацетилена, снятый на заводе',
      'Неокрашенные корпуса с открытой горловиной после сварки',
    ],
    heroAlt: 'Баллоны в плёнке на заводском дворе, партия под отгрузку',
    aboutAlt: 'Сотрудники на производственном участке Wanda Group',
    generatorAlt: 'Генератор ацетилена, снятый на заводе',
    faqA:
      'Да. Ролики с производства смотрите в блоке «Завод» на этой странице. Дополнительные видео, упаковку и сертификаты отправим лично по запросу.',
    privacy:
      'Ниже описано, какие персональные данные собирает сайт, зачем они нужны и как с нами связаться. Заводские видео производства показаны на сайте. Файлы сертификатов отправляем лично по запросу.',
  },
  zh: {
    subtitle: '工厂实拍照片与视频——成型、库存、包装与发运。',
    videosTitle: '工厂视频',
    videosSubtitle: '生产线上的短视频。更多资料可按要求单独发送。',
    items: [
      { title: '待发出货', desc: '气瓶覆膜后在厂区场地集结，准备发运。' },
      { title: '生产线输送', desc: '瓶体在成型与转运线上移动。' },
      { title: 'LPG 精整线', desc: '已喷涂的液化气瓶在悬挂输送线上，等待包装。' },
      { title: '车间现场', desc: '生产车间——人员、设备与在制品。' },
      { title: '已焊瓶体', desc: '环缝焊接后的瓶壳，尚未喷漆和装阀。' },
      { title: '喷漆前瓶壳', desc: '未喷漆瓶体在地面分批等待下道工序。' },
      { title: '在制库存', desc: '筒节与已封头瓶壳等待组装。' },
      { title: '瓶体堆存', desc: '焊接后的筒体码放，尚未装阀。' },
      { title: '底座圈', desc: '准备焊到瓶体上的底圈。' },
      { title: '配件装箱', desc: '阀门与管件用泡沫装箱，供出口发运。' },
      { title: '乙炔发生器', desc: '发生器连同软管与配件，已可出厂。' },
      { title: '地面瓶壳', desc: '焊接后敞口瓶体——装阀前的批次。' },
    ],
    alts: [
      '覆膜气瓶在厂区场地集结待发',
      '厂房屋顶下的气瓶输送线',
      '悬挂精整线上的 LPG 气瓶',
      '万达集团车间内的工作人员',
      '未喷漆、已焊接的瓶体码放两层',
      '混凝土地面上成排的未喷漆瓶壳',
      '车间内的筒节与封头瓶壳',
      '靠墙码放的原瓶体',
      '装配前的钢制底座圈',
      '纸箱内泡沫保护的黄铜配件',
      '工厂实拍乙炔发生器',
      '焊接后敞口的未喷漆瓶壳',
    ],
    heroAlt: '覆膜气瓶在厂区场地集结待发',
    aboutAlt: '万达集团车间内的工作人员',
    generatorAlt: '工厂实拍乙炔发生器',
    faqA: '可以。本页「工厂」区块可观看生产线视频。更多影像、包装与证书资料可按要求单独发送。',
    privacy:
      '本政策说明我们通过本网站收集哪些个人信息、为何使用这些信息，以及您如何就此与我们联系。工厂生产视频在本网站展示。证书文件应要求单独发送。',
  },
}

const faqEnOld =
  'Yes. Videos of production, warehouses, products and packing are sent privately on request — by email or messenger. They are not published on the website.'
const faqRuOld =
  'Да. Видео о производстве, складах, продукции и упаковке отправляем лично по запросу — на электронную почту или в мессенджер. На сайте ролики не публикуются.'
const privacyEnOld =
  'This policy explains what personal data we collect through the site, why we use it, and how you can contact us about it. We do not publish factory videos or certificate files on the website; those materials are sent privately on request.'
const privacyZhOld =
  '本政策说明我们通过本网站收集哪些个人信息、为何使用这些信息，以及您如何就此与我们联系。我们不在网站上公开工厂视频或证书文件，这些资料应要求单独发送。'

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const loc = file.replace('.json', '')
  const copy = gallery[loc] ?? gallery.en
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))

  data.gallery.subtitle = copy.subtitle
  data.gallery.videosTitle = copy.videosTitle
  data.gallery.videosSubtitle = copy.videosSubtitle
  data.gallery.items = copy.items
  data.imageAlts.gallery = copy.alts
  data.imageAlts.hero = copy.heroAlt
  data.imageAlts.about = copy.aboutAlt
  if (Array.isArray(data.imageAlts.products) && data.imageAlts.products.length >= 2) {
    data.imageAlts.products[1] = copy.generatorAlt
  }

  for (const group of data.faq?.groups ?? []) {
    for (const item of group.items ?? []) {
      if (
        item.a === faqEnOld ||
        item.a === faqRuOld ||
        item.q === 'Can I watch factory videos before placing an order?' ||
        item.q === 'Могу ли я посмотреть видеоролики с вашего завода перед оформлением заказа?' ||
        item.q === '下单前可以先看工厂视频吗？'
      ) {
        item.a = copy.faqA
      }
    }
  }

  if (Array.isArray(data.privacy?.intro) && data.privacy.intro[1]) {
    const intro = data.privacy.intro[1]
    if (
      intro === privacyEnOld ||
      intro.includes('We do not publish factory videos') ||
      intro.includes('Заводские видео и файлы сертификатов на сайте не публикуются') ||
      intro === privacyZhOld
    ) {
      data.privacy.intro[1] = copy.privacy
    }
  }

  fs.writeFileSync(path.join(dir, file), `${JSON.stringify(data, null, 2)}\n`)
  console.log('patched', file)
}
