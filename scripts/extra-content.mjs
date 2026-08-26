/** Extra locale blocks migrated from content.ts, story.ts, images.ts */
export const extraEn = {
  trustMarquee: [
    'ISO 9809-1',
    'DOT 3AA',
    'TPED',
    'GB 5099',
    'CE',
    'OEM/ODM',
    'Export to 50+ Countries',
    'MOQ from 100 pcs',
    'Lead Time 15–25 Days',
  ],
  productDetails: {
    tabs: {
      acetylene: 'Acetylene',
      propane: 'Propane',
      generator: 'Generator',
      accessories: 'Accessories',
    },
    acetylene: {
      title: 'Dissolved Acetylene Cylinders',
      intro:
        'Steel cylinders with porous mass and solvent for safe acetylene storage and transport. Used in welding, cutting, brazing and metal fabrication.',
      features: [
        'Porous mass + acetone for stable storage',
        'CGA 510 / GOST / DIN valves on request',
        'Hydraulic test pressure 5.2 MPa',
        'RAL painting, stamping & OEM labels',
        'Export pallet packaging',
      ],
      tableTitle: 'Standard Acetylene Cylinder Models',
      headers: ['Model', 'Volume (L)', 'C₂H₂ (kg)', 'WP (MPa)', 'TP (MPa)', 'Weight (kg)', 'Height (mm)'],
      rows: [
        ['WG-2', '2', '0.3', '1.5', '5.2', '4.5', '395'],
        ['WG-5', '5', '0.8', '1.5', '5.2', '7.2', '490'],
        ['WG-10', '10', '1.5', '1.5', '5.2', '12.5', '780'],
        ['WG-25', '25', '4.0', '1.5', '5.2', '24.0', '980'],
        ['WG-40', '40', '6.5', '1.5', '5.2', '38.0', '1250'],
      ],
      note: '* Exact parameters depend on standard (ISO/DOT/GB) and valve configuration. Request spec sheet for your market.',
    },
    propane: {
      title: 'Propane & LPG Cylinders',
      intro:
        'Cylinders for propane, butane and LPG mixtures. Used in heating, cutting, brazing, construction and industrial gas supply.',
      features: [
        '37Mn/34CrMo4 steel per ISO 9809',
        'Working pressure 1.8–2.1 MPa',
        'POL, CGA 510, GOST valves',
        'Powder coating, anti-corrosion',
        'Certificates for EU, US, CIS markets',
      ],
      tableTitle: 'Standard Propane Cylinder Models',
      headers: ['Model', 'Volume (L)', 'Gas (kg)', 'WP (MPa)', 'TP (MPa)', 'Weight (kg)', 'Height (mm)'],
      rows: [
        ['WG-P3', '3', '1.2', '1.8', '5.2', '3.8', '280'],
        ['WG-P5', '5', '2.0', '1.8', '5.2', '5.5', '340'],
        ['WG-P11', '11', '4.5', '1.8', '5.2', '9.8', '510'],
        ['WG-P15', '15', '6.0', '1.8', '5.2', '12.5', '580'],
        ['WG-P50', '50', '20.0', '1.8', '5.2', '42.0', '1180'],
      ],
      note: '* Pricing and MOQ depend on order volume and valve type. Send inquiry for exact quotation.',
    },
    generator: {
      title: 'Acetylene Generators',
      intro:
        'Equipment for producing acetylene from calcium carbide. Stable gas supply for welding and industrial needs without centralized gas infrastructure.',
      features: [
        'Output 3–100 m³/h capacity',
        'Automatic water & carbide feed',
        'Safety system & filtration',
        'Compact and industrial models',
        'Full documentation & training',
      ],
      tableTitle: 'Acetylene Generator Models',
      headers: ['Model', 'Output (m³/h)', 'Carbide (kg/h)', 'Pressure (kPa)', 'Power (kW)', 'Weight (kg)'],
      rows: [
        ['WG-G3', '3', '12', '1.5–5', '0.5', '180'],
        ['WG-G5', '5', '20', '1.5–5', '1.0', '280'],
        ['WG-G20', '20', '80', '1.5–5', '3.5', '850'],
        ['WG-G50', '50', '200', '1.5–5', '7.5', '1800'],
        ['WG-G100', '100', '400', '1.5–5', '15', '3200'],
      ],
      note: '* Generators supplied with cooling system, filters and spare parts kit on request.',
    },
    accessories: {
      title: 'Cylinder Accessories & Fittings',
      intro:
        'Complete range for safe gas cylinder operation: from gauges to welding torches. One-stop procurement with cylinders.',
      features: [
        'Regulators & gauges (CGA/GOST/DIN)',
        'High-pressure hoses',
        'Cutting torches & welding burners',
        'Pressure relief valves',
        'Trolleys, stands, caps',
      ],
      tableTitle: 'Accessories Catalog',
      headers: ['Category', 'Models', 'Standard', 'Application'],
      rows: [
        ['Regulators', 'WG-R510, WG-R580', 'CGA 510/580', 'Acetylene, propane'],
        ['Gauges', 'WG-G63, WG-G100', 'ISO 5171', 'Pressure monitoring'],
        ['Hoses', 'WG-H6, WG-H9', 'EN 559', 'Welding, cutting'],
        ['Torches', 'WG-C100, WG-C300', '—', 'Plasma/oxy cutting'],
        ['Burners', 'WG-T200, WG-T500', '—', 'Welding, brazing'],
        ['Valves', 'WG-V510, WG-VPOL', 'CGA/POL/GOST', 'All cylinder types'],
      ],
      note: '* Accessories available separately or bundled with cylinders. Discount on combined orders.',
    },
  },
  services: {
    title: 'Our Services',
    subtitle:
      'Full cycle — from manufacturing to delivery at your warehouse. We work with distributors, OEM brands and project buyers.',
    items: [
      {
        icon: '🏭',
        title: 'Custom Manufacturing (OEM/ODM)',
        desc: 'Cylinders with your brand, color and marking.',
        points: ['Logo & RAL color', 'Market-standard valve', 'OEM packaging & labels'],
      },
      {
        icon: '🚢',
        title: 'Export & Logistics',
        desc: 'Complete international shipment support.',
        points: ['Incoterms FOB/CIF/DDP', 'Export documentation', 'Sea & rail freight'],
      },
      {
        icon: '🔬',
        title: 'Quality Control',
        desc: 'Testing and inspection at every stage.',
        points: ['Hydrostatic tests', 'UT weld inspection', 'SGS/BV inspection on request'],
      },
      {
        icon: '📋',
        title: 'Certification',
        desc: 'Documents for customs and regulators.',
        points: ['ISO 9809, DOT, TPED', 'MSDS & quality certificate', 'Certificate of origin'],
      },
      {
        icon: '🛠️',
        title: 'Technical Support',
        desc: 'Help selecting products and configuration.',
        points: ['Market-based selection', 'MOQ & lead time calculation', 'Staff training'],
      },
      {
        icon: '📦',
        title: 'Bundle Supply',
        desc: 'Cylinders + accessories in one order.',
        points: ['Single contract', 'Coordinated delivery', 'Bundle discount'],
      },
    ],
  },
  pricing: {
    title: 'Pricing & Supply Terms',
    subtitle:
      'Transparent terms for B2B procurement. Exact pricing is calculated individually — send inquiry, we reply within 24 hours.',
    note: 'Prices shown are indicative (EXW). Final cost depends on volume, valve type, certification and shipping terms.',
    cards: [
      { label: 'MOQ', value: 'from 100 pcs', desc: 'Minimum order per model' },
      { label: 'Lead Time', value: '15–25 days', desc: 'After order confirmation' },
      { label: 'Payment', value: 'T/T 30/70', desc: '30% deposit, 70% before shipment' },
      { label: 'Warranty', value: '12 months', desc: 'Against manufacturing defects' },
    ],
    factors: {
      title: 'Price Factors',
      items: [
        'Cylinder volume & model (2L – 50L)',
        'Valve type (CGA, GOST, DIN, POL)',
        'Certification standard (ISO, DOT, TPED)',
        'OEM: color, marking, packaging',
        'Order volume & Incoterms',
      ],
    },
    samples: [
      { product: 'Acetylene WG-10', moq: '200 pcs', price: '$28–35 / pc', lead: '18 days' },
      { product: 'Acetylene WG-25', moq: '100 pcs', price: '$45–58 / pc', lead: '20 days' },
      { product: 'Propane WG-P11', moq: '500 pcs', price: '$12–16 / pc', lead: '15 days' },
      { product: 'Propane WG-P50', moq: '100 pcs', price: '$55–72 / pc', lead: '22 days' },
      { product: 'Generator WG-G20', moq: '1 unit', price: '$3,500–4,200', lead: '25 days' },
      { product: 'Regulator set', moq: '50 pcs', price: '$8–15 / pc', lead: '10 days' },
    ],
    tableHeaders: ['Product', 'MOQ', 'Price (EXW)', 'Lead Time'],
  },
  certifications: {
    title: 'Certifications & Standards',
    subtitle: 'Products comply with international safety standards. Documents provided with every shipment.',
    items: [
      { name: 'ISO 9809-1', desc: 'Seamless steel gas cylinders — technical requirements' },
      { name: 'ISO 9809-3', desc: 'Dissolved acetylene cylinders' },
      { name: 'DOT 3AA', desc: 'US market certification' },
      { name: 'TPED', desc: 'European transport directive' },
      { name: 'GB 5099', desc: 'Chinese gas cylinder standard' },
      { name: 'CE Mark', desc: 'European conformity requirements' },
    ],
  },
  process: {
    title: 'How to Order',
    subtitle: 'Simple process from inquiry to cylinders at your warehouse.',
    steps: [
      { title: 'Send Inquiry', desc: 'Specify product, volume, country and valve requirements' },
      { title: 'Receive Quotation', desc: 'Price, MOQ, lead time and spec sheet within 24 hours' },
      { title: 'Confirm Order', desc: 'Contract signing and 30% deposit payment' },
      { title: 'Production & QC', desc: 'Manufacturing, testing, photo report on request' },
      { title: 'Shipment', desc: 'Packaging, documents, FOB/CIF/DDP delivery' },
    ],
  },
  testimonials: {
    title: 'Client Testimonials',
    items: [
      {
        quote:
          'Wanda Group has supplied consistent quality cylinders for 3 years. OEM marking and documents are always perfect.',
        author: 'Ahmed K.',
        role: 'Gas Equipment Distributor',
        country: 'UAE',
      },
      {
        quote:
          'Fast quotation response, competitive pricing and flexibility on GOST valves. Recommended as a reliable manufacturer.',
        author: 'Maria S.',
        role: 'Industrial Gas Buyer',
        country: 'Poland',
      },
      {
        quote:
          'Ordered bundle: cylinders + regulators + hoses. Everything arrived in one shipment, excellent packaging.',
        author: 'James L.',
        role: 'Welding Supply Manager',
        country: 'Australia',
      },
    ],
  },
  story: {
    slides: [
      {
        id: 'welding',
        eyebrow: 'Acetylene cylinders',
        title: 'Stable flame for precision welding',
        text: 'Dissolved acetylene cylinders engineered for continuous welding and brazing — consistent pressure, safe porous mass, export-ready valves.',
        points: ['ISO / DOT / GB options', 'CGA / GOST / DIN valves', 'OEM color & marking'],
      },
      {
        id: 'cutting',
        eyebrow: 'Cutting & fabrication',
        title: 'Power when metal has to move',
        text: 'High-flow acetylene and oxygen-ready cylinder sets for shipyards, workshops and heavy fabrication lines.',
        points: ['Fast pierce & cut', 'Torch-ready kits', 'Bulk MOQ friendly'],
      },
      {
        id: 'propane',
        eyebrow: 'Propane & LPG',
        title: 'Durable LPG cylinders for every market',
        text: 'From heating and cooking gas to industrial cutting — steel cylinders built for pressure, coating and long service life.',
        points: ['3L–50L range', 'POL / CGA valves', 'Powder coat finish'],
      },
      {
        id: 'factory',
        eyebrow: 'Manufacturing',
        title: 'Factory control from steel to shipment',
        text: 'In-house forming, welding, hydrostatic testing and finishing — so every batch matches your drawing and market standard.',
        points: ['Hydrostatic tested', 'Traceable batches', 'OEM / ODM ready'],
      },
      {
        id: 'quality',
        eyebrow: 'Quality & safety',
        title: 'Inspection you can put in the quote',
        text: 'Material checks, leak tests, valve torque and packing photos — documentation packs for distributors and project buyers.',
        points: ['Pressure & leak tests', 'Certificate package', 'Pre-shipment photos'],
      },
      {
        id: 'export',
        eyebrow: 'Global export',
        title: 'Packed for ports, ready for 50+ countries',
        text: 'Export pallets, valve protection, multilingual labels and shipping docs coordinated for your destination Incoterms.',
        points: ['FOB / CIF support', 'Palletized packing', 'Lead time 15–25 days'],
      },
    ],
  },
  imageAlts: {
    hero: 'Industrial acetylene gas cylinders at the factory',
    about: 'Industrial gas cylinder battery bank',
    accessories: 'Gas cylinder accessories',
    products: [
      'Acetylene gas cylinders',
      'Gas equipment and cylinder bank',
      'Propane gas cylinders',
      'Cylinder accessories and fittings',
    ],
    gallery: [
      'Acetylene cylinder manifold bank',
      'Industrial gas processing equipment',
      'Welding kit with gas cylinders',
      'Industrial propane gas cylinders',
      'Gas cylinder warehouse stock',
      'Cylinder truck transport and logistics',
    ],
  },
}

export const extraRu = {
  trustMarquee: [
    'ISO 9809-1',
    'DOT 3AA',
    'TPED',
    'GB 5099',
    'CE',
    'OEM/ODM',
    'Экспорт в 50+ стран',
    'MOQ от 100 шт.',
    'Срок 15–25 дней',
  ],
  productDetails: {
    tabs: {
      acetylene: 'Ацетилен',
      propane: 'Пропан',
      generator: 'Генератор',
      accessories: 'Аксессуары',
    },
    acetylene: {
      title: 'Баллоны с растворённым ацетиленом',
      intro:
        'Стальные баллоны с пористым наполнителем и растворителем для безопасного хранения и транспортировки ацетилена. Применяются в сварке, резке, пайке и металлообработке.',
      features: [
        'Пористая масса + ацетон для стабильного хранения',
        'Клапаны CGA 510 / GOST / DIN по запросу',
        'Испытание гидравликой 5,2 МПа',
        'Покраска RAL, тампопечать и этикетки OEM',
        'Экспортная упаковка на поддонах',
      ],
      tableTitle: 'Типовые модели ацетиленовых баллонов',
      headers: ['Модель', 'Объём (L)', 'C₂H₂ (кг)', 'Pраб. (MPa)', 'Pисп. (MPa)', 'Масса (кг)', 'Высота (мм)'],
      rows: extraEn.productDetails.acetylene.rows,
      note: '* Точные параметры зависят от стандарта (ISO/DOT/GB) и конфигурации клапана. Запросите спецификацию для вашего рынка.',
    },
    propane: {
      title: 'Пропановые и LPG баллоны',
      intro:
        'Баллоны для пропана, бутана и LPG-смесей. Используются в отоплении, резке, пайке, строительстве и промышленном газоснабжении.',
      features: [
        'Сталь 37Mn/34CrMo4 по ISO 9809',
        'Рабочее давление 1,8–2,1 MPa',
        'Клапаны POL, CGA 510, GOST',
        'Порошковая покраска, антикоррозия',
        'Сертификаты для EU, US, CIS рынков',
      ],
      tableTitle: 'Типовые модели пропановых баллонов',
      headers: ['Модель', 'Объём (L)', 'Вес газа (кг)', 'Pраб. (MPa)', 'Pисп. (MPa)', 'Масса (кг)', 'Высота (мм)'],
      rows: extraEn.productDetails.propane.rows,
      note: '* Цены и MOQ зависят от объёма заказа и типа клапана. Отправьте запрос для точного предложения.',
    },
    generator: {
      title: 'Генераторы ацетилена',
      intro:
        'Оборудование для получения ацетилена из карбида кальция. Стабильная подача газа для сварочных и промышленных нужд без централизованного газоснабжения.',
      features: [
        'Производительность 3–100 m³/ч',
        'Автоматическая подача воды и карбида',
        'Система безопасности и фильтрации',
        'Компактные и промышленные модели',
        'Полный комплект документации и обучение',
      ],
      tableTitle: 'Модели генераторов ацетилена',
      headers: ['Модель', 'Произв. (m³/ч)', 'Карбид (кг/ч)', 'Давление (kPa)', 'Мощность (kW)', 'Вес (кг)'],
      rows: extraEn.productDetails.generator.rows,
      note: '* Генераторы поставляются с системой охлаждения, фильтрами и комплектом ЗИП по запросу.',
    },
    accessories: {
      title: 'Комплектующие и аксессуары',
      intro:
        'Полный ассортимент для безопасной работы с газовыми баллонами: от манометров до сварочных горелок. Закупка вместе с баллонами — одна поставка.',
      features: [
        'Редукторы и манометры (CGA/GOST/DIN)',
        'Шланги высокого давления',
        'Резаки и сварочные горелки',
        'Предохранительные клапаны',
        'Тележки, стойки, колпаки',
      ],
      tableTitle: 'Каталог комплектующих',
      headers: ['Категория', 'Модели', 'Стандарт', 'Применение'],
      rows: [
        ['Редукторы', 'WG-R510, WG-R580', 'CGA 510/580', 'Ацетилен, пропан'],
        ['Манометры', 'WG-G63, WG-G100', 'ISO 5171', 'Контроль давления'],
        ['Шланги', 'WG-H6, WG-H9', 'EN 559', 'Сварка, резка'],
        ['Резаки', 'WG-C100, WG-C300', '—', 'Плазменная/кислородная резка'],
        ['Горелки', 'WG-T200, WG-T500', '—', 'Сварка, пайка'],
        ['Клапаны', 'WG-V510, WG-VPOL', 'CGA/POL/GOST', 'Баллоны всех типов'],
      ],
      note: '* Комплектующие доступны отдельно или в комплекте с баллонами. Скидка при комплексном заказе.',
    },
  },
  services: {
    title: 'Наши услуги',
    subtitle:
      'Полный цикл — от производства до доставки на ваш склад. Работаем с дистрибьюторами, OEM-брендами и проектными заказчиками.',
    items: [
      {
        icon: '🏭',
        title: 'Производство под заказ (OEM/ODM)',
        desc: 'Баллоны с вашим брендом, цветом и маркировкой.',
        points: ['Логотип и RAL-цвет', 'Клапан по стандарту рынка', 'Упаковка и этикетки OEM'],
      },
      {
        icon: '🚢',
        title: 'Экспорт и логистика',
        desc: 'Полное сопровождение международных поставок.',
        points: ['Incoterms FOB/CIF/DDP', 'Экспортные документы', 'Морская и ж/д доставка'],
      },
      {
        icon: '🔬',
        title: 'Контроль качества',
        desc: 'Испытания и инспекция на каждом этапе.',
        points: ['Гидроиспытания', 'УЗК сварных швов', 'SGS/BV инспекция по запросу'],
      },
      {
        icon: '📋',
        title: 'Сертификация',
        desc: 'Документы для таможни и регуляторов.',
        points: ['ISO 9809, DOT, TPED', 'MSDS и паспорт качества', 'Сертификат происхождения'],
      },
      {
        icon: '🛠️',
        title: 'Техническая поддержка',
        desc: 'Помощь в выборе продукции и конфигурации.',
        points: ['Подбор по рынку', 'Расчёт MOQ и сроков', 'Обучение персонала'],
      },
      {
        icon: '📦',
        title: 'Комплексные поставки',
        desc: 'Баллоны + комплектующие в одном заказе.',
        points: ['Единый контракт', 'Согласованные сроки', 'Скидка на комплект'],
      },
    ],
  },
  pricing: {
    title: 'Цены и условия поставки',
    subtitle:
      'Прозрачные условия для B2B-закупок. Точная цена рассчитывается индивидуально — отправьте запрос, ответим в течение 24 часов.',
    note: 'Указанные цены ориентировочные (EXW). Финальная стоимость зависит от объёма, клапана, сертификации и условий доставки.',
    cards: [
      { label: 'MOQ', value: 'от 100 шт.', desc: 'Минимальный заказ на модель' },
      { label: 'Срок производства', value: '15–25 дней', desc: 'После подтверждения заказа' },
      { label: 'Оплата', value: 'T/T 30/70', desc: '30% аванс, 70% перед отгрузкой' },
      { label: 'Гарантия', value: '12 месяцев', desc: 'На производственные дефекты' },
    ],
    factors: {
      title: 'От чего зависит цена',
      items: [
        'Объём и модель баллона (2L – 50L)',
        'Тип клапана (CGA, GOST, DIN, POL)',
        'Стандарт сертификации (ISO, DOT, TPED)',
        'OEM: цвет, маркировка, упаковка',
        'Объём заказа и условия Incoterms',
      ],
    },
    samples: [
      { product: 'Ацетилен WG-10', moq: '200 шт.', price: '$28–35 / шт.', lead: '18 дней' },
      { product: 'Ацетилен WG-25', moq: '100 шт.', price: '$45–58 / шт.', lead: '20 дней' },
      { product: 'Пропан WG-P11', moq: '500 шт.', price: '$12–16 / шт.', lead: '15 дней' },
      { product: 'Пропан WG-P50', moq: '100 шт.', price: '$55–72 / шт.', lead: '22 дней' },
      { product: 'Генератор WG-G20', moq: '1 шт.', price: '$3,500–4,200', lead: '25 дней' },
      { product: 'Комплект редукторов', moq: '50 шт.', price: '$8–15 / шт.', lead: '10 дней' },
    ],
    tableHeaders: ['Продукт', 'MOQ', 'Цена (EXW)', 'Срок'],
  },
  certifications: {
    title: 'Сертификаты и стандарты',
    subtitle: 'Продукция соответствует международным стандартам безопасности. Документы предоставляются с каждой поставкой.',
    items: [
      { name: 'ISO 9809-1', desc: 'Стальные газовые баллоны — технические требования' },
      { name: 'ISO 9809-3', desc: 'Баллоны с растворённым ацетиленом' },
      { name: 'DOT 3AA', desc: 'Сертификация для рынка США' },
      { name: 'TPED', desc: 'Европейская директива по транспортировке' },
      { name: 'GB 5099', desc: 'Китайский стандарт на газовые баллоны' },
      { name: 'CE Mark', desc: 'Соответствие европейским требованиям' },
    ],
  },
  process: {
    title: 'Как оформить заказ',
    subtitle: 'Простой процесс от запроса до получения баллонов на вашем складе.',
    steps: [
      { title: 'Отправьте запрос', desc: 'Укажите продукт, объём, страну и требования к клапану' },
      { title: 'Получите предложение', desc: 'Цена, MOQ, сроки и спецификация в течение 24 часов' },
      { title: 'Подтвердите заказ', desc: 'Подписание контракта и оплата аванса 30%' },
      { title: 'Производство и QC', desc: 'Изготовление, испытания, фотоотчёт по запросу' },
      { title: 'Отгрузка', desc: 'Упаковка, документы, доставка FOB/CIF/DDP' },
    ],
  },
  testimonials: {
    title: 'Отзывы клиентов',
    items: [
      {
        quote:
          'Wanda Group поставляет баллоны стабильного качества уже 3 года. OEM-маркировка и документы всегда в порядке.',
        author: 'Ahmed K.',
        role: 'Дистрибьютор газового оборудования',
        country: 'ОАЭ',
      },
      {
        quote:
          'Быстрый ответ на запрос, конкурентные цены и гибкость по клапанам GOST. Рекомендуем как надёжного производителя.',
        author: 'Maria S.',
        role: 'Закупщик промышленных газов',
        country: 'Польша',
      },
      {
        quote:
          'Заказывали комплект: баллоны + редукторы + шланги. Всё пришло в одной партии, упаковка отличная.',
        author: 'James L.',
        role: 'Снабженец сварочного производства',
        country: 'Австралия',
      },
    ],
  },
  story: {
    slides: [
      {
        id: 'welding',
        eyebrow: 'Ацетиленовые баллоны',
        title: 'Стабильное пламя для точной сварки',
        text: 'Баллоны с растворённым ацетиленом для непрерывной сварки и пайки — стабильное давление, безопасная пористая масса, экспортные клапаны.',
        points: ['Варианты ISO / DOT / GB', 'Клапаны CGA / GOST / DIN', 'OEM цвет и маркировка'],
      },
      {
        id: 'cutting',
        eyebrow: 'Резка и металлообработка',
        title: 'Мощность, когда металл должен поддаться',
        text: 'Комплекты баллонов с высоким расходом для верфей, цехов и тяжёлой металлообработки.',
        points: ['Быстрый прожиг и рез', 'Готовые наборы с горелками', 'Удобный оптовый MOQ'],
      },
      {
        id: 'propane',
        eyebrow: 'Пропан и LPG',
        title: 'Надёжные LPG-баллоны под любой рынок',
        text: 'От отопления и бытового газа до промышленной резки — стальные баллоны под давление, покрытие и долгий срок службы.',
        points: ['Линейка 3–50 л', 'Клапаны POL / CGA', 'Порошковое покрытие'],
      },
      {
        id: 'factory',
        eyebrow: 'Производство',
        title: 'Контроль завода — от стали до отгрузки',
        text: 'Собственная формовка, сварка, гидроиспытания и финиш — каждая партия по вашему чертежу и стандарту рынка.',
        points: ['Гидроиспытания', 'Прослеживаемые партии', 'OEM / ODM под ключ'],
      },
      {
        id: 'quality',
        eyebrow: 'Качество и безопасность',
        title: 'Контроль, который можно указать в КП',
        text: 'Проверка материала, тесты на утечку, момент клапана и фото упаковки — пакет документов для дистрибьюторов и проектов.',
        points: ['Давление и герметичность', 'Пакет сертификатов', 'Фото перед отгрузкой'],
      },
      {
        id: 'export',
        eyebrow: 'Глобальный экспорт',
        title: 'Упаковано под порты — готово для 50+ стран',
        text: 'Экспортные паллеты, защита клапанов, мультиязычные этикетки и документы под Incoterms вашего рынка.',
        points: ['Поддержка FOB / CIF', 'Паллетная упаковка', 'Срок 15–25 дней'],
      },
    ],
  },
  imageAlts: {
    hero: 'Промышленные ацетиленовые баллоны на производстве',
    about: 'Батарея промышленных газовых баллонов',
    accessories: 'Аксессуары для газовых баллонов',
    products: [
      'Ацетиленовые баллоны',
      'Газовое оборудование и баллоны',
      'Пропановые баллоны',
      'Комплектующие для баллонов',
    ],
    gallery: [
      'Батарея ацетиленовых баллонов',
      'Промышленное газовое оборудование',
      'Сварочный комплект с баллонами',
      'Пропановые баллоны',
      'Склад газовых баллонов',
      'Транспортировка баллонов',
    ],
  },
}
