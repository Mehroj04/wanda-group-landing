import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/i18n/locales')

const refrigeration = {
  en: {
    label: 'Also from Wanda',
    title: 'Cold storage & refrigeration',
    subtitle:
      'Condensing units for cold rooms and process cooling. Compressor options include Bitzer, Copeland (Emerson) and other brands — specify the duty in the inquiry.',
    moreLink: 'Cold storage equipment →',
    cta: 'Request a quote',
    alsoTitle: 'Also available on request',
    also: [
      'Polyurethane cold-room panels (B1 / B2) and 304 stainless panels',
      'Cold-room air coolers — DL (~0 °C), DD (~−18 °C), DJ (~−25 °C)',
      'Aluminum evaporator coils',
      'Cold-room doors',
      'Industrial water chillers',
      'Vehicle refrigeration units and mobile cold rooms',
    ],
    note: 'Wanda International Trade supplies refrigeration equipment alongside the gas-cylinder line: units, panels, coolers and related cold-chain hardware. Copeland, Bitzer and similar names refer to the compressor brand inside the unit, not a rebrand of those companies.',
    videoTitle: 'Company video',
    videoSubtitle: 'Overview of the refrigeration equipment line. More footage is sent privately on request.',
    items: [
      {
        title: 'Copeland semi-hermetic air-cooled unit',
        spec: 'Condensing unit · Copeland compressor',
        desc: 'Air-cooled condensing unit with a Copeland semi-hermetic compressor for cold rooms and medium-temperature duty.',
      },
      {
        title: 'Bitzer semi-hermetic air-cooled unit',
        spec: 'Condensing unit · Bitzer compressor',
        desc: 'Air-cooled condensing unit with a Bitzer semi-hermetic compressor for higher-duty and mid-to-low temperature rooms.',
      },
      {
        title: 'Enclosed box-type unit',
        spec: 'Cabinet condensing unit',
        desc: 'Enclosed cabinet-style condensing unit for sites that need a housed machine rather than an open skid.',
      },
      {
        title: 'U-type / high-capacity condensing unit',
        spec: 'Multi-fan air-cooled',
        desc: 'Larger air-cooled condensing unit with a multi-fan condenser for bigger cold stores and process cooling.',
      },
    ],
    alts: [
      'Air-cooled condensing unit with Copeland semi-hermetic compressor',
      'Air-cooled condensing unit with Bitzer semi-hermetic compressor',
      'Enclosed cabinet-style refrigeration condensing unit',
      'High-capacity four-fan air-cooled condensing unit',
    ],
  },
  ru: {
    label: 'Ещё от Wanda',
    title: 'Холодные склады и холодильное оборудование',
    subtitle:
      'Холодильные агрегаты для камер и технологического охлаждения. Компрессоры Bitzer, Copeland (Emerson) и другие — режим работы укажите в заявке.',
    moreLink: 'Холодильное оборудование →',
    cta: 'Запросить предложение',
    alsoTitle: 'Также по запросу',
    also: [
      'Сэндвич-панели для камер (полиуретан B1 / B2) и панели из нержавеющей стали 304',
      'Воздухоохладители DL (~0 °C), DD (~−18 °C), DJ (~−25 °C)',
      'Алюминиевые испарительные батареи',
      'Двери холодильных камер',
      'Промышленные чиллеры',
      'Автомобильные холодильные установки и мобильные камеры',
    ],
    note: 'Wanda International Trade поставляет холодильное оборудование параллельно с линейкой баллонов: агрегаты, панели, воздухоохладители и комплектующие холодной цепи. Названия Copeland и Bitzer — марка компрессора в агрегате, а не перепродажа этих компаний под нашим брендом.',
    videoTitle: 'Видео компании',
    videoSubtitle: 'Обзор линейки холодильного оборудования. Дополнительные материалы отправим лично по запросу.',
    items: [
      {
        title: 'Полугерметичный воздухоохлаждаемый агрегат Copeland',
        spec: 'Компрессорно-конденсаторный агрегат · Copeland',
        desc: 'Воздухоохлаждаемый агрегат с полугерметичным компрессором Copeland для камер среднего температурного режима.',
      },
      {
        title: 'Полугерметичный воздухоохлаждаемый агрегат Bitzer',
        spec: 'Компрессорно-конденсаторный агрегат · Bitzer',
        desc: 'Воздухоохлаждаемый агрегат с полугерметичным компрессором Bitzer для более высокой нагрузки и средне-низких температур.',
      },
      {
        title: 'Шкафной холодильный агрегат',
        spec: 'Закрытый корпус',
        desc: 'Агрегат в шкафном корпусе — когда нужна закрытая машина, а не открытая рама.',
      },
      {
        title: 'U-образный / многовентиляторный агрегат',
        spec: 'Воздухоохлаждение, несколько вентиляторов',
        desc: 'Более крупный воздухоохлаждаемый агрегат с многовентиляторным конденсатором для больших камер и технологического охлаждения.',
      },
    ],
    alts: [
      'Воздухоохлаждаемый холодильный агрегат с компрессором Copeland',
      'Воздухоохлаждаемый холодильный агрегат с компрессором Bitzer',
      'Шкафной холодильный агрегат',
      'Многовентиляторный воздухоохлаждаемый холодильный агрегат',
    ],
  },
  zh: {
    label: '万达其他产品',
    title: '冷库与制冷设备',
    subtitle:
      '冷库及工艺冷却用冷凝机组。压缩机可选比泽尔、谷轮（艾默生）等品牌，请在询价中说明工况。',
    moreLink: '制冷设备 →',
    cta: '获取报价',
    alsoTitle: '亦可按需供应',
    also: [
      '聚氨酯冷库板（B1 / B2）及 304 不锈钢冷库板',
      '冷风机：DL（约 0 °C）、DD（约 −18 °C）、DJ（约 −25 °C）',
      '铝排管蒸发器',
      '冷库门',
      '工业冷水机组',
      '车载制冷机组与移动冷库',
    ],
    note: '万达国际贸易在气瓶产品之外供应制冷设备：机组、库板、冷风机及冷链配件。谷轮、比泽尔等名称指机组所配压缩机品牌，并非代售这些公司的整机品牌。',
    videoTitle: '公司视频',
    videoSubtitle: '制冷设备产品线概览。更多影像资料可按需单独发送。',
    items: [
      {
        title: '谷轮半封闭风冷机组',
        spec: '冷凝机组 · 谷轮压缩机',
        desc: '配备谷轮半封闭压缩机的风冷冷凝机组，适用于冷库及中温工况。',
      },
      {
        title: '比泽尔半封闭风冷机组',
        spec: '冷凝机组 · 比泽尔压缩机',
        desc: '配备比泽尔半封闭压缩机的风冷冷凝机组，适用于更高负荷及中低温库。',
      },
      {
        title: '箱式机组',
        spec: '柜式冷凝机组',
        desc: '封闭柜式冷凝机组，适用于需要封闭机柜而非开放式机架的场地。',
      },
      {
        title: 'U 型 / 多风扇冷凝机组',
        spec: '多风扇风冷',
        desc: '更大风冷冷凝机组，多风扇冷凝器，适用于大型冷库及工艺冷却。',
      },
    ],
    alts: [
      '谷轮半封闭风冷冷凝机组',
      '比泽尔半封闭风冷冷凝机组',
      '箱式制冷机组',
      '多风扇大容量风冷冷凝机组',
    ],
  },
}

const nav = {
  en: 'Cold storage',
  ru: 'Холодильное оборудование',
  zh: '制冷设备',
}

const heroAdd = {
  en: ' We also supply cold-storage refrigeration equipment.',
  ru: ' Также поставляем холодильное оборудование для холодных складов.',
  zh: ' 同时供应冷库制冷设备。',
}

const option = {
  en: 'Cold storage / refrigeration',
  ru: 'Холодильное оборудование',
  zh: '冷库 / 制冷设备',
}

function block(lang) {
  if (lang === 'ru') return refrigeration.ru
  if (lang === 'zh') return refrigeration.zh
  return refrigeration.en
}

function patchHero(subtitle, lang) {
  const add = heroAdd[lang] || heroAdd.en
  if (subtitle.includes(add.trim()) || /refrigerat|холодиль|冷库制冷/.test(subtitle)) return subtitle
  return subtitle.replace(/\s*$/, '') + add
}

function patchOptions(options, lang) {
  const o = option[lang] || option.en
  if (options.includes(o)) return options
  const next = options.filter((x) => x !== o)
  const bundle = next.findIndex((x) => /bundle|комплекс|一揽子|Paket/i.test(x))
  if (bundle >= 0) next.splice(bundle, 0, o)
  else next.push(o)
  return next
}

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const lang = file.replace('.json', '')
  const p = path.join(dir, file)
  const data = JSON.parse(fs.readFileSync(p, 'utf8'))
  const src = block(lang)
  data.nav = data.nav || {}
  data.nav.refrigeration = nav[lang] || nav.en
  data.refrigeration = {
    label: src.label,
    title: src.title,
    subtitle: src.subtitle,
    moreLink: src.moreLink,
    cta: src.cta,
    alsoTitle: src.alsoTitle,
    also: src.also,
    note: src.note,
    videoTitle: src.videoTitle,
    videoSubtitle: src.videoSubtitle,
    items: src.items,
  }
  data.imageAlts = data.imageAlts || {}
  data.imageAlts.refrigeration = src.alts
  if (data.hero?.subtitle && (lang === 'en' || lang === 'ru' || lang === 'zh')) {
    data.hero.subtitle = patchHero(data.hero.subtitle, lang)
  }
  if (Array.isArray(data.cta?.productOptions)) {
    data.cta.productOptions = patchOptions(data.cta.productOptions, lang)
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n')
  console.log('patched', file)
}
