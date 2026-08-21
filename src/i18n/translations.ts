export type Lang = 'ru' | 'en'

export const translations = {
  ru: {
    nav: {
      products: 'Продукция',
      specs: 'Характеристики',
      applications: 'Применение',
      about: 'О нас',
      gallery: 'Галерея',
      quality: 'Качество',
      faq: 'FAQ',
      contact: 'Контакты',
      getQuote: 'Получить расценки',
      inquire: 'Запросить →',
    },
    hero: {
      badge: 'Производитель газовых баллонов',
      title: 'Надёжные газовые баллоны для промышленности и сварки',
      subtitle:
        'Wanda Group — производитель и поставщик баллонов с ацетиленом, пропаном и комплектующих. Решения для газоснабжения, сварки, резки и хранения по всему миру.',
      cta: 'Получить расценки',
      ctaSecondary: 'Наша продукция',
      stats: [
        { value: '15+', label: 'лет опыта' },
        { value: '50+', label: 'стран поставок' },
        { value: '100%', label: 'контроль качества' },
      ],
    },
    accessories: {
      title: 'Надёжные аксессуары для газовых баллонов',
      text: 'Высококачественные манометры, клапаны, шланги и фитинги для безопасного газораспределения, сварки и промышленного применения.',
      cta: 'Получить предложение',
    },
    products: {
      title: 'Наша продукция',
      subtitle:
        'Ацетиленовые баллоны, генераторы, пропановые баллоны и принадлежности для промышленного и сварочного применения.',
      items: [
        {
          title: 'Ацетиленовый баллон',
          desc: 'Баллоны с растворённым ацетиленом для сварки, резки и промышленных газов. Различные размеры и варианты клапанов.',
          icon: '🔥',
        },
        {
          title: 'Генератор ацетилена',
          desc: 'Оборудование для стабильного производства газа, простой эксплуатации и промышленного применения.',
          icon: '⚙️',
        },
        {
          title: 'Пропановый баллон',
          desc: 'Прочные баллоны для пропана и сжиженного газа — хранение, отопление, резка и промышленность.',
          icon: '🛢️',
        },
        {
          title: 'Принадлежности',
          desc: 'Шланги, манометры, резаки, горелки, предохранительные клапаны и другие аксессуары.',
          icon: '🔧',
        },
      ],
    },
    specs: {
      title: 'Технические характеристики',
      subtitle:
        'Ознакомьтесь с вариантами баллонов, возможностями настройки и деталями доставки перед отправкой запроса.',
      items: [
        {
          title: 'Ёмкость цилиндра',
          desc: 'Баллоны различной ёмкости и объёма в зависимости от области применения и требований рынка.',
        },
        {
          title: 'Клапаны и крышки',
          desc: 'Клапаны, крышки и фитинги поставляются в соответствии с потребностями заказчика и проекта.',
        },
        {
          title: 'Варианты растворителей',
          desc: 'Пористая наполнительная система и растворители для стабильного хранения ацетилена.',
        },
        {
          title: 'Упаковка и отгрузка',
          desc: 'Поддержка экспортной упаковки и отгрузки для дистрибьюторов и проектных заказчиков.',
        },
      ],
    },
    applications: {
      title: 'Применение газовых баллонов',
      subtitle:
        'Продукция для типичных задач промышленных газов и потребностей зарубежных клиентов.',
      items: [
        'Сварка и пайка',
        'Резка металла',
        'Промышленное газоснабжение',
        'Строительство',
        'Металлообработка',
        'Хранение и распределение газа',
      ],
    },
    whyUs: {
      title: 'Почему Wanda Group?',
      subtitle:
        'Прямое производство, персонализация и полная поддержка экспорта — всё для вашего бизнеса.',
      items: [
        { title: 'Поставка с фабрики', desc: 'Прямое общение с производителем' },
        { title: 'OEM-варианты', desc: 'Цвет, клапан и маркировка на заказ' },
        { title: 'Поддержка экспорта', desc: 'Упаковка и полный пакет документов' },
        { title: 'Всё в одном месте', desc: 'Цилиндры и аксессуары — единая закупка' },
      ],
    },
    about: {
      title: 'Профессиональный производитель газовых баллонов',
      text: 'Wanda Group Gas Cylinder Manufacturer специализируется на производстве и поставке промышленных газовых баллонов и сопутствующих принадлежностей. Наша продукция используется в сварочных работах, резке, газораспределении, промышленном хранении и других областях газоснабжения.',
      text2:
        'Мы поддерживаем зарубежных покупателей в выборе продукции, индивидуальной настройке, проверке качества, упаковке и координации отгрузки.',
    },
    gallery: {
      title: 'Производство и продукция',
      subtitle: 'Фото нашего производства, оборудования и применения газовых баллонов.',
    },
    quality: {
      title: 'Контроль качества и безопасность',
      subtitle:
        'От проверки сырья до финальной упаковки — каждый этап обеспечивает надёжность продукции.',
      steps: [
        { title: 'Инспекция сырья', desc: 'Проверка материалов и требований к процессам' },
        { title: 'Формовка и сварка', desc: 'Контролируемые процессы производства цилиндров' },
        { title: 'Испытание на давление', desc: 'Тестирование безопасности и герметичности' },
        { title: 'Обработка поверхности', desc: 'Покраска, разметка и отделка по заказу' },
        { title: 'Узел клапана', desc: 'Установка клапанов, крышек и аксессуаров' },
        { title: 'Финальная упаковка', desc: 'Экспортная упаковка и подготовка к отправке' },
      ],
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Ответы на популярные вопросы покупателей — быстрее к запросу коммерческого предложения.',
      items: [
        {
          q: 'Для чего используется баллон с растворённым ацетиленом?',
          a: 'Для сварки, резки, пайки, металлообработки и подачи промышленных газов.',
        },
        {
          q: 'Какие объёмы баллонов вы поставляете?',
          a: 'Различные объёмы обсуждаются в зависимости от рынка, применения и объёма заказа.',
        },
        {
          q: 'Можно ли изменить цвет, клапан и маркировку?',
          a: 'Да. Цвет, клапан, крышка, этикетка и экспортная упаковка изготавливаются на заказ.',
        },
        {
          q: 'Поставляете ли комплектующие вместе с баллонами?',
          a: 'Да — шланги, манометры, регуляторы, резаки, горелки и предохранительные клапаны.',
        },
        {
          q: 'Как получить расценки?',
          a: 'Укажите товар, размер, тип клапана, количество, страну назначения и особые требования.',
        },
      ],
    },
    articles: {
      title: 'Полезные статьи',
      subtitle: 'Экспертные материалы для профессионалов сварки и газоснабжения.',
      readMore: 'Читать далее →',
      items: [
        {
          tag: 'Ремесленники',
          title: 'Комплексное решение для снабжения баллонами пропаном',
          desc: 'Стабильность оборудования напрямую влияет на эффективность сварочных и режущих работ.',
        },
        {
          tag: 'Хранение',
          title: 'На что обратить внимание при длительном хранении баллонов',
          desc: 'Условия хранения, методы размещения и регулярные проверки неиспользуемых баллонов.',
        },
        {
          tag: 'Цены',
          title: 'Какой бюджет необходим для покупки баллона с ацетиленом?',
          desc: 'Факторы, влияющие на стоимость, и как выбрать оптимальное предложение.',
        },
      ],
    },
    cta: {
      title: 'Нужна надёжная поставка газовых баллонов?',
      subtitle:
        'Сообщите размер, количество, страну назначения и область применения — мы подготовим предложение.',
      formTitle: 'Запрос расценок',
      formSubtitle:
        'Укажите требования — команда продаж ответит с информацией о продукте, ценах, MOQ и сроках.',
      name: 'Имя',
      phone: 'Телефон',
      email: 'Эл. адрес',
      message: 'Сообщение',
      messagePlaceholder: 'Укажите продукт, размер, количество, страну назначения...',
      submit: 'Отправить запрос',
      sending: 'Отправка...',
      success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
      sendAnother: 'Отправить ещё один запрос',
      errorGeneric: 'Не удалось отправить. Попробуйте позже или напишите на email.',
      errorNoForm: 'Форма не настроена. Напишите нам на sales@wandagroup.com',
    },
    footer: {
      company: 'Wanda Group Gas Cylinder Manufacturer',
      tagline: 'Профессиональное производство газовых баллонов',
      rights: '© 2026 Wanda Group. Все права защищены.',
    },
  },
  en: {
    nav: {
      products: 'Products',
      specs: 'Specifications',
      applications: 'Applications',
      about: 'About',
      gallery: 'Gallery',
      quality: 'Quality',
      faq: 'FAQ',
      contact: 'Contact',
      getQuote: 'Get a Quote',
      inquire: 'Inquire →',
    },
    hero: {
      badge: 'Gas Cylinder Manufacturer',
      title: 'Reliable Gas Cylinders for Industry & Welding',
      subtitle:
        'Wanda Group is a trusted manufacturer and supplier of acetylene, propane cylinders and accessories. Solutions for gas supply, welding, cutting and storage worldwide.',
      cta: 'Get a Quote',
      ctaSecondary: 'Our Products',
      stats: [
        { value: '15+', label: 'Years Experience' },
        { value: '50+', label: 'Countries Served' },
        { value: '100%', label: 'Quality Control' },
      ],
    },
    accessories: {
      title: 'Reliable Gas Cylinder Accessories',
      text: 'High-quality gauges, valves, hoses and fittings for safe gas distribution, welding and industrial applications.',
      cta: 'Get an Offer',
    },
    products: {
      title: 'Our Products',
      subtitle:
        'Acetylene cylinders, generators, propane cylinders and accessories for industrial and welding applications.',
      items: [
        {
          title: 'Acetylene Cylinder',
          desc: 'Dissolved acetylene cylinders for welding, cutting and industrial gases. Various sizes and valve options.',
          icon: '🔥',
        },
        {
          title: 'Acetylene Generator',
          desc: 'Equipment for stable gas production, easy operation and industrial applications.',
          icon: '⚙️',
        },
        {
          title: 'Propane Cylinder',
          desc: 'Durable cylinders for propane and LPG — storage, heating, cutting and industrial use.',
          icon: '🛢️',
        },
        {
          title: 'Cylinder Accessories',
          desc: 'Hoses, gauges, cutting torches, welding burners, safety valves and more.',
          icon: '🔧',
        },
      ],
    },
    specs: {
      title: 'Technical Specifications',
      subtitle:
        'Explore cylinder options, customization capabilities and shipping details before sending an inquiry.',
      items: [
        {
          title: 'Cylinder Capacity',
          desc: 'Various capacity and volume options depending on application and market requirements.',
        },
        {
          title: 'Valves & Caps',
          desc: 'Valves, caps and fittings supplied according to customer and project needs.',
        },
        {
          title: 'Solvent Options',
          desc: 'Porous filler system and solvents for stable acetylene storage.',
        },
        {
          title: 'Packaging & Shipping',
          desc: 'Export packaging and shipping support for distributors and project customers.',
        },
      ],
    },
    applications: {
      title: 'Cylinder Applications',
      subtitle:
        'Products designed for common industrial gas tasks and overseas buyer requirements.',
      items: [
        'Welding & Brazing',
        'Metal Cutting',
        'Industrial Gas Supply',
        'Construction',
        'Metal Fabrication',
        'Gas Storage & Distribution',
      ],
    },
    whyUs: {
      title: 'Why Wanda Group?',
      subtitle:
        'Direct manufacturing, customization and full export support — everything for your business.',
      items: [
        { title: 'Factory Direct', desc: 'Direct communication with manufacturer' },
        { title: 'OEM Options', desc: 'Custom color, valve and marking' },
        { title: 'Export Support', desc: 'Packaging and full documentation' },
        { title: 'One-Stop Sourcing', desc: 'Cylinders and accessories together' },
      ],
    },
    about: {
      title: 'Professional Gas Cylinder Manufacturer',
      text: 'Wanda Group Gas Cylinder Manufacturer specializes in producing and supplying industrial gas cylinders and related accessories. Our products are widely used in welding, cutting, gas distribution, industrial storage and other gas supply fields.',
      text2:
        'We support overseas buyers in product selection, customization, quality inspection, packaging and shipping coordination.',
    },
    gallery: {
      title: 'Production & Products',
      subtitle: 'Photos of our manufacturing, equipment and gas cylinder applications.',
    },
    quality: {
      title: 'Quality Control & Safety',
      subtitle:
        'From raw material inspection to final packaging — every step ensures reliable product quality.',
      steps: [
        { title: 'Raw Material Inspection', desc: 'Material and process requirement verification' },
        { title: 'Forming & Welding', desc: 'Controlled cylinder manufacturing processes' },
        { title: 'Pressure Testing', desc: 'Safety and leak testing at every stage' },
        { title: 'Surface Treatment', desc: 'Painting, marking and finishing per order' },
        { title: 'Valve Assembly', desc: 'Installation of valves, caps and accessories' },
        { title: 'Final Packaging', desc: 'Export packaging and shipping preparation' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common buyer questions — get to your quote request faster.',
      items: [
        {
          q: 'What is a dissolved acetylene cylinder used for?',
          a: 'Welding, cutting, brazing, metal fabrication and industrial gas supply.',
        },
        {
          q: 'What cylinder volumes do you supply?',
          a: 'Various volumes depending on your target market, application and order quantity.',
        },
        {
          q: 'Can I customize color, valve and marking?',
          a: 'Yes. Cylinder color, valve, cap, label and export packaging can be customized.',
        },
        {
          q: 'Do you supply accessories with cylinders?',
          a: 'Yes — hoses, gauges, regulators, cutting torches, burners and safety valves.',
        },
        {
          q: 'How do I get a quote?',
          a: 'Provide product, size, valve type, quantity, destination country and special requirements.',
        },
      ],
    },
    articles: {
      title: 'Latest Articles',
      subtitle: 'Expert content for welding and gas supply professionals.',
      readMore: 'Read more →',
      items: [
        {
          tag: 'Craftsmen',
          title: 'Complete Propane Cylinder Supply Solution',
          desc: 'Equipment stability directly affects welding and cutting work efficiency.',
        },
        {
          tag: 'Storage',
          title: 'Long-Term Acetylene Cylinder Storage Tips',
          desc: 'Storage conditions, placement methods and regular inspections for unused cylinders.',
        },
        {
          tag: 'Pricing',
          title: 'Budget Guide for Acetylene Cylinder Purchase',
          desc: 'Factors affecting cost and how to choose the optimal offer.',
        },
      ],
    },
    cta: {
      title: 'Need Reliable Gas Cylinder Supply?',
      subtitle:
        'Tell us the size, quantity, destination country and application — we will prepare a detailed quote.',
      formTitle: 'Request a Quote',
      formSubtitle:
        'Leave your requirements — our sales team will respond with product info, pricing, MOQ and lead time.',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      message: 'Message',
      messagePlaceholder: 'Product, size, quantity, destination country...',
      submit: 'Send Inquiry',
      sending: 'Sending...',
      success: 'Thank you! We will contact you shortly.',
      sendAnother: 'Send another inquiry',
      errorGeneric: 'Failed to send. Please try again or email us directly.',
      errorNoForm: 'Form not configured. Please email sales@wandagroup.com',
    },
    footer: {
      company: 'Wanda Group Gas Cylinder Manufacturer',
      tagline: 'Professional Gas Cylinder Manufacturing',
      rights: '© 2026 Wanda Group. All rights reserved.',
    },
  },
} as const

export type TranslationKeys = typeof translations.ru
