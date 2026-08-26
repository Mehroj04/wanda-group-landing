import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'src/i18n/locales'

const byLang = {
  en: {
    title: 'What buyers say',
    items: [
      {
        quote:
          'We reordered 40L acetylene cylinders three times this year. GOST valves, OEM colour and export packing matched the first sample every time.',
        author: 'Rustam Yusupov',
        role: 'Owner, welding gas distributor',
        country: 'Uzbekistan',
      },
      {
        quote:
          'Quote came the same day with a clear MOQ and lead time. Propane bottles arrived with POL valves and full packing list — no customs delays on our side.',
        author: 'Aigerim Bekova',
        role: 'Procurement manager, industrial supply',
        country: 'Kazakhstan',
      },
      {
        quote:
          'We buy cylinders with regulators and hoses as one container order. Documents and marking were ready for our market, so resale was straightforward.',
        author: 'Faisal Al-Harbi',
        role: 'Import buyer, gas equipment trading',
        country: 'Saudi Arabia',
      },
    ],
  },
  ru: {
    title: 'Отзывы покупателей',
    items: [
      {
        quote:
          'В этом году уже третий раз заказываем ацетиленовые баллоны 40 л. Клапаны GOST, OEM-цвет и экспортная упаковка каждый раз как на первом образце.',
        author: 'Рустам Юсупов',
        role: 'Владелец дистрибьюции сварочных газов',
        country: 'Узбекистан',
      },
      {
        quote:
          'КП пришло в тот же день — с понятным MOQ и сроком. Пропановые баллоны с POL-клапанами и полным packing list, на таможне вопросов не было.',
        author: 'Айгерим Бекова',
        role: 'Менеджер по закупкам, промышленные поставки',
        country: 'Казахстан',
      },
      {
        quote:
          'Берём баллоны с редукторами и шлангами одной контейнерной партией. Маркировка и документы готовы под наш рынок — перепродажа без лишней волокиты.',
        author: 'Файсал Аль-Харби',
        role: 'Импортёр газового оборудования',
        country: 'Саудовская Аравия',
      },
    ],
  },
  zh: {
    title: '客户怎么说',
    items: [
      {
        quote:
          '今年我们已三次复购 40 升乙炔气瓶。GOST 阀门、OEM 颜色和出口包装每次都与首样一致。',
        author: 'Rustam Yusupov',
        role: '焊接气体经销商负责人',
        country: '乌兹别克斯坦',
      },
      {
        quote:
          '当天就收到报价，起订量和交期写得很清楚。丙烷瓶配 POL 阀门，装箱单齐全，我方清关顺利。',
        author: 'Aigerim Bekova',
        role: '工业物资采购经理',
        country: '哈萨克斯坦',
      },
      {
        quote:
          '气瓶与减压器、软管整柜一起订。标识和单证符合我们市场要求，转售很顺利。',
        author: 'Faisal Al-Harbi',
        role: '气体设备进口采购',
        country: '沙特阿拉伯',
      },
    ],
  },
  uz: {
    title: 'Xaridorlar fikri',
    items: [
      {
        quote:
          "Bu yil 40 litrlik atsetilen ballonlarini uchinchi marta qayta buyurtma qildik. GOST klapanlari, OEM rangi va eksport qadoqlash har safar birinchi namuna bilan mos keldi.",
        author: 'Rustam Yusupov',
        role: 'Payvandlash gazlari distribyutori egasi',
        country: "O'zbekiston",
      },
      {
        quote:
          "Taklif shu kuni keldi — MOQ va muddat aniq. POL klapanli propan ballonlari va to'liq packing list bilan keldi, bojxonada savol bo'lmadi.",
        author: 'Aigerim Bekova',
        role: "Sanoat ta'minoti xarid menejeri",
        country: "Qozog'iston",
      },
      {
        quote:
          'Ballonlarni reduktor va shlanglar bilan bir konteynerda olamiz. Belgilash va hujjatlar bozorimizga mos — qayta sotish oson.',
        author: 'Faisal Al-Harbi',
        role: 'Gaz uskunalari import xaridori',
        country: 'Saudiya Arabistoni',
      },
    ],
  },
  kk: {
    title: 'Сатып алушылар пікірі',
    items: [
      {
        quote:
          'Биыл 40 литрлік ацетилен баллондарын үшінші рет қайта тапсырыс бердік. GOST клапандары, OEM түсі және экспорттық қаптама әр жолы алғашқы үлгіге сәйкес келді.',
        author: 'Rustam Yusupov',
        role: 'Дәнекерлеу газы дистрибьюторының иесі',
        country: 'Өзбекстан',
      },
      {
        quote:
          'Ұсыныс сол күні келді — MOQ пен мерзім анық. POL клапанды пропан баллондары мен толық packing list бар, кеденде сұрақ болмады.',
        author: 'Aigerim Bekova',
        role: 'Өнеркәсіптік жеткізілім сатып алу менеджері',
        country: 'Қазақстан',
      },
      {
        quote:
          'Баллондарды редукторлар мен шлангтармен бір контейнерде аламыз. Таңбалау мен құжаттар нарығымызға сай — қайта сату оңай.',
        author: 'Faisal Al-Harbi',
        role: 'Газ жабдығы импорт сатып алушысы',
        country: 'Сауд Арабиясы',
      },
    ],
  },
  ar: {
    title: 'ماذا يقول المشترون',
    items: [
      {
        quote:
          'أعدنا طلب أسطوانات الأسيتيلين سعة 40 لتر ثلاث مرات هذا العام. صمامات GOST ولون OEM والتغليف التصديري طابقت العينة الأولى في كل مرة.',
        author: 'Rustam Yusupov',
        role: 'مالك موزع غازات اللحام',
        country: 'أوزبكستان',
      },
      {
        quote:
          'وصل العرض في اليوم نفسه مع حد أدنى واضح ومدة تسليم. وصلت أسطوانات البروبان بصمامات POL وقائمة تعبئة كاملة دون تأخير جمركي لدينا.',
        author: 'Aigerim Bekova',
        role: 'مديرة مشتريات للتوريدات الصناعية',
        country: 'كازاخستان',
      },
      {
        quote:
          'نشتري الأسطوانات مع المنظمات والخراطيم في شحنة حاوية واحدة. المستندات والوسم جاهزان لسوقنا، فإعادة البيع كانت مباشرة.',
        author: 'Faisal Al-Harbi',
        role: 'مشتري استيراد لمعدات الغاز',
        country: 'المملكة العربية السعودية',
      },
    ],
  },
  tr: {
    title: 'Alıcılar ne diyor',
    items: [
      {
        quote:
          'Bu yıl 40 litrelik asetilen tüplerini üçüncü kez yeniden sipariş ettik. GOST vanalar, OEM renk ve ihracat ambalajı her seferinde ilk numuneyle uyumlu geldi.',
        author: 'Rustam Yusupov',
        role: 'Kaynak gazları distribütörü sahibi',
        country: 'Özbekistan',
      },
      {
        quote:
          'Teklif aynı gün geldi — net MOQ ve terminle. POL vanalı propan tüpleri ve eksiksiz packing list ile geldi, gümrükte sorun olmadı.',
        author: 'Aigerim Bekova',
        role: 'Endüstriyel tedarik satın alma müdürü',
        country: 'Kazakistan',
      },
      {
        quote:
          'Tüpleri regülatör ve hortumlarla tek konteynerde alıyoruz. İşaretleme ve belgeler pazarımıza hazır — yeniden satış kolaydı.',
        author: 'Faisal Al-Harbi',
        role: 'Gaz ekipmanı ithalat alıcısı',
        country: 'Suudi Arabistan',
      },
    ],
  },
  tg: {
    title: 'Фикри харидорон',
    items: [
      {
        quote:
          'Имсол баллонҳои ацетилении 40 л-ро сеюм маротиба фармоиш додем. Клапанҳои GOST, ранги OEM ва бастабандии содиротӣ ҳар дафъа мисли намунаи аввал буд.',
        author: 'Rustam Yusupov',
        role: 'Соҳиби дистрибутсияи газҳои кафшергарӣ',
        country: 'Ӯзбекистон',
      },
      {
        quote:
          'Пешниҳод ҳамон рӯз омад — бо MOQ ва муҳлати фаҳмо. Баллонҳои пропани бо клапани POL ва packing list пурра расиданд, дар гумрук савол набуд.',
        author: 'Aigerim Bekova',
        role: 'Менеҷери харидҳои таъминоти саноатӣ',
        country: 'Қазоқистон',
      },
      {
        quote:
          'Баллонҳоро бо редуктор ва шлангҳо як контейнер фармоиш медиҳем. Аломатгузорӣ ва ҳуҷҷатҳо барои бозори мо омоданд — фурӯши дубора осон.',
        author: 'Faisal Al-Harbi',
        role: 'Харидори воридотии таҷҳизоти газ',
        country: 'Арабистони Саудӣ',
      },
    ],
  },
}

const fallback = byLang.en
let updated = 0

for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const code = f.replace('.json', '')
  const path = join(dir, f)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.testimonials = byLang[code] ?? fallback
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
  updated++
}

console.log(`updated ${updated} locales`)
console.log(`localized: ${Object.keys(byLang).join(', ')}`)
console.log('other locales use English testimonials')
