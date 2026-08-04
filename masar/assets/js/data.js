/* ==========================================================================
   Masar — sample catalogue data
   --------------------------------------------------------------------------
   Every human-readable string is stored as { en, ar } so both locales render
   from one source of truth. Plain JS (not JSON) so the site works from
   file:// without a server — fetch() would be blocked there.

   NOTE: the schools below are fictional. This is demo data for a portfolio
   project; inventing dates and prices for real institutions would misrepresent
   them. Swap in a real feed before this is ever used for anything.
   ========================================================================== */

window.MASAR_DATA = (function () {
  const subjects = [
    { id: 'leadership',      en: 'Leadership & General Management', ar: 'القيادة والإدارة العامة' },
    { id: 'finance',         en: 'Finance & Accounting',            ar: 'التمويل والمحاسبة' },
    { id: 'strategy',        en: 'Strategy & Innovation',           ar: 'الاستراتيجية والابتكار' },
    { id: 'digital',         en: 'Digital Transformation & AI',     ar: 'التحول الرقمي والذكاء الاصطناعي' },
    { id: 'data',            en: 'Data & Analytics',                ar: 'البيانات والتحليلات' },
    { id: 'marketing',       en: 'Marketing & Sales',               ar: 'التسويق والمبيعات' },
    { id: 'operations',      en: 'Operations & Supply Chain',       ar: 'العمليات وسلاسل الإمداد' },
    { id: 'people',          en: 'People & Talent',                 ar: 'الموارد البشرية والمواهب' },
    { id: 'sustainability',  en: 'Sustainability & ESG',            ar: 'الاستدامة والحوكمة البيئية' },
    { id: 'negotiation',     en: 'Negotiation & Influence',         ar: 'التفاوض والتأثير' },
    { id: 'entrepreneurship',en: 'Entrepreneurship & Growth',       ar: 'ريادة الأعمال والنمو' },
    { id: 'healthcare',      en: 'Healthcare Management',           ar: 'إدارة الرعاية الصحية' }
  ];

  const formats = [
    { id: 'in-person', en: 'In person', ar: 'حضوري' },
    { id: 'online',    en: 'Online',    ar: 'عن بُعد' },
    { id: 'blended',   en: 'Blended',   ar: 'مدمج' }
  ];

  const languages = [
    { id: 'en', en: 'English', ar: 'الإنجليزية' },
    { id: 'ar', en: 'Arabic',  ar: 'العربية' },
    { id: 'fr', en: 'French',  ar: 'الفرنسية' },
    { id: 'es', en: 'Spanish', ar: 'الإسبانية' },
    { id: 'de', en: 'German',  ar: 'الألمانية' }
  ];

  const schools = [
    {
      id: 's-northgate',
      name: { en: 'Northgate Business School', ar: 'كلية نورثغيت للأعمال' },
      city: { en: 'London', ar: 'لندن' },
      country: { en: 'United Kingdom', ar: 'المملكة المتحدة' },
      region: 'europe', founded: 1921, accreditation: ['AACSB', 'EQUIS', 'AMBA'],
      about: {
        en: 'A research-led school in the City of London with a century of open-enrolment executive programmes, best known for finance and board-level leadership.',
        ar: 'كلية بحثية في قلب مدينة لندن تقدّم برامج تنفيذية مفتوحة منذ قرن، وتشتهر ببرامج التمويل والقيادة على مستوى مجالس الإدارة.'
      }
    },
    {
      id: 's-harborview',
      name: { en: 'Harborview School of Business', ar: 'كلية هاربرفيو للأعمال' },
      city: { en: 'Boston', ar: 'بوسطن' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 1908, accreditation: ['AACSB'],
      about: {
        en: 'Case-method teaching on a residential campus, with a long track record in general management and healthcare leadership.',
        ar: 'تعتمد منهج دراسة الحالة في حرم جامعي داخلي، ولها سجل طويل في الإدارة العامة وقيادة قطاع الرعاية الصحية.'
      }
    },
    {
      id: 's-rivegauche',
      name: { en: 'Rive Gauche School of Management', ar: 'كلية ريف غوش للإدارة' },
      city: { en: 'Paris', ar: 'باريس' },
      country: { en: 'France', ar: 'فرنسا' },
      region: 'europe', founded: 1957, accreditation: ['EQUIS', 'AMBA'],
      about: {
        en: 'Bilingual French and English delivery, with strengths in luxury brand management, marketing and European corporate governance.',
        ar: 'تقدّم برامجها بالفرنسية والإنجليزية، وتتميّز في إدارة العلامات الفاخرة والتسويق وحوكمة الشركات الأوروبية.'
      }
    },
    {
      id: 's-kaiserplatz',
      name: { en: 'Kaiserplatz School of Management', ar: 'كلية كايزربلاتس للإدارة' },
      city: { en: 'Berlin', ar: 'برلين' },
      country: { en: 'Germany', ar: 'ألمانيا' },
      region: 'europe', founded: 1974, accreditation: ['AACSB', 'EQUIS'],
      about: {
        en: 'Engineering-adjacent management education: industrial operations, supply chain and the industrial applications of AI.',
        ar: 'تعليم إداري قريب من الهندسة: العمليات الصناعية وسلاسل الإمداد وتطبيقات الذكاء الاصطناعي في الصناعة.'
      }
    },
    {
      id: 's-marinabay',
      name: { en: 'Marina Bay Institute of Management', ar: 'معهد مارينا باي للإدارة' },
      city: { en: 'Singapore', ar: 'سنغافورة' },
      country: { en: 'Singapore', ar: 'سنغافورة' },
      region: 'asia', founded: 1993, accreditation: ['AACSB', 'EQUIS'],
      about: {
        en: 'The regional hub for Asian market strategy, family business governance and digital banking programmes.',
        ar: 'مركز إقليمي لبرامج استراتيجيات الأسواق الآسيوية وحوكمة الشركات العائلية والخدمات المصرفية الرقمية.'
      }
    },
    {
      id: 's-almanara',
      name: { en: 'Al-Manara Business School', ar: 'كلية المنارة للأعمال' },
      city: { en: 'Dubai', ar: 'دبي' },
      country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
      region: 'mena', founded: 2004, accreditation: ['AACSB'],
      about: {
        en: 'Gulf-focused executive education delivered in Arabic and English, with programmes built around family enterprises and sovereign investment.',
        ar: 'تعليم تنفيذي موجّه لمنطقة الخليج بالعربية والإنجليزية، ببرامج مبنية حول الشركات العائلية والاستثمار السيادي.'
      }
    },
    {
      id: 's-thuraya',
      name: { en: 'Thuraya Institute of Leadership', ar: 'معهد الثريا للقيادة' },
      city: { en: 'Riyadh', ar: 'الرياض' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      region: 'mena', founded: 2016, accreditation: [],
      about: {
        en: 'Founded to support national transformation programmes, with public-sector leadership and giga-project delivery at its centre.',
        ar: 'تأسّس لدعم برامج التحوّل الوطني، وتتمحور برامجه حول القيادة في القطاع العام وإدارة المشاريع الكبرى.'
      }
    },
    {
      id: 's-nile',
      name: { en: 'Nile Delta School of Management', ar: 'كلية دلتا النيل للإدارة' },
      city: { en: 'Cairo', ar: 'القاهرة' },
      country: { en: 'Egypt', ar: 'مصر' },
      region: 'mena', founded: 1989, accreditation: ['AMBA'],
      about: {
        en: 'One of the oldest executive schools in North Africa, teaching in Arabic with a focus on banking, trade and public administration.',
        ar: 'من أقدم كليات التعليم التنفيذي في شمال أفريقيا، وتدرّس بالعربية مع تركيز على المصارف والتجارة والإدارة العامة.'
      }
    },
    {
      id: 's-bosphorus',
      name: { en: 'Bosphorus Executive Academy', ar: 'أكاديمية البوسفور التنفيذية' },
      city: { en: 'Istanbul', ar: 'إسطنبول' },
      country: { en: 'Türkiye', ar: 'تركيا' },
      region: 'europe', founded: 2001, accreditation: ['EQUIS'],
      about: {
        en: 'Bridges European and Middle Eastern practice, with short-format programmes in negotiation, trade and emerging-market strategy.',
        ar: 'تجمع بين الممارسات الأوروبية والشرق أوسطية، وتقدّم برامج قصيرة في التفاوض والتجارة واستراتيجيات الأسواق الناشئة.'
      }
    },
    {
      id: 's-cedarridge',
      name: { en: 'Cedar Ridge Executive School', ar: 'كلية سيدار ريدج التنفيذية' },
      city: { en: 'Toronto', ar: 'تورنتو' },
      country: { en: 'Canada', ar: 'كندا' },
      region: 'americas', founded: 1968, accreditation: ['AACSB', 'EQUIS'],
      about: {
        en: 'Known for coaching-intensive leadership programmes and a strong sustainability and energy-transition portfolio.',
        ar: 'تشتهر ببرامج قيادية قائمة على التدريب الفردي المكثّف، ولها حضور قوي في الاستدامة وتحوّل الطاقة.'
      }
    },
    {
      id: 's-sakura',
      name: { en: 'Sakura Institute of Management', ar: 'معهد ساكورا للإدارة' },
      city: { en: 'Tokyo', ar: 'طوكيو' },
      country: { en: 'Japan', ar: 'اليابان' },
      region: 'asia', founded: 1982, accreditation: ['AACSB'],
      about: {
        en: 'Operational excellence in the lean tradition, plus programmes on robotics, manufacturing strategy and long-horizon governance.',
        ar: 'تميّز تشغيلي وفق مدرسة الإنتاج الرشيق، إضافة إلى برامج في الروبوتات واستراتيجية التصنيع والحوكمة طويلة الأمد.'
      }
    },
    {
      id: 's-tablemountain',
      name: { en: 'Table Mountain Business School', ar: 'كلية تيبل ماونتن للأعمال' },
      city: { en: 'Cape Town', ar: 'كيب تاون' },
      country: { en: 'South Africa', ar: 'جنوب أفريقيا' },
      region: 'africa', founded: 1995, accreditation: ['AMBA'],
      about: {
        en: 'Africa-facing programmes in inclusive growth, infrastructure finance and leading organisations through volatility.',
        ar: 'برامج موجّهة للقارة الأفريقية في النمو الشامل وتمويل البنية التحتية وقيادة المؤسسات في أوقات التقلّب.'
      }
    },
    {
      id: 's-vasari',
      name: { en: 'Vasari School of Management', ar: 'كلية فاساري للإدارة' },
      city: { en: 'Milan', ar: 'ميلانو' },
      country: { en: 'Italy', ar: 'إيطاليا' },
      region: 'europe', founded: 1949, accreditation: ['EQUIS', 'AMBA'],
      about: {
        en: 'Design-led management education, strong in brand strategy, retail and the economics of the creative industries.',
        ar: 'تعليم إداري قائم على التصميم، بقوة في استراتيجية العلامة التجارية والتجزئة واقتصاديات الصناعات الإبداعية.'
      }
    },
    {
      id: 's-riverbend',
      name: { en: 'Riverbend School of Business', ar: 'كلية ريفربند للأعمال' },
      city: { en: 'Sydney', ar: 'سيدني' },
      country: { en: 'Australia', ar: 'أستراليا' },
      region: 'oceania', founded: 1977, accreditation: ['AACSB'],
      about: {
        en: 'Practical, short-format programmes for mid-career managers, with a large online portfolio across time zones.',
        ar: 'برامج قصيرة وعملية لمديري منتصف المسيرة المهنية، مع حقيبة واسعة من البرامج عن بُعد عبر مناطق زمنية مختلفة.'
      }
    },
    {
      id: 's-andes',
      name: { en: 'Andes School of Business', ar: 'كلية الأنديز للأعمال' },
      city: { en: 'Santiago', ar: 'سانتياغو' },
      country: { en: 'Chile', ar: 'تشيلي' },
      region: 'americas', founded: 1991, accreditation: ['AMBA'],
      about: {
        en: 'Latin America’s reference point for mining, commodities and family-controlled corporate governance.',
        ar: 'المرجع في أمريكا اللاتينية لبرامج التعدين والسلع الأساسية وحوكمة الشركات العائلية.'
      }
    },
    {
      id: 's-hanriver',
      name: { en: 'Han River Institute of Management', ar: 'معهد نهر الهان للإدارة' },
      city: { en: 'Seoul', ar: 'سيول' },
      country: { en: 'South Korea', ar: 'كوريا الجنوبية' },
      region: 'asia', founded: 1998, accreditation: ['AACSB'],
      about: {
        en: 'Built around the electronics and semiconductor supply chain, with programmes on manufacturing strategy, holding-group governance and building brands for export.',
        ar: 'نشأ حول سلسلة إمداد الإلكترونيات وأشباه الموصلات، ويقدّم برامج في استراتيجية التصنيع وحوكمة المجموعات القابضة وبناء العلامات التجارية للتصدير.'
      }
    },
    {
      id: 's-sahyadri',
      name: { en: 'Sahyadri School of Business', ar: 'كلية ساهيادري للأعمال' },
      city: { en: 'Mumbai', ar: 'مومباي' },
      country: { en: 'India', ar: 'الهند' },
      region: 'asia', founded: 1986, accreditation: ['AMBA'],
      about: {
        en: 'Teaches the managers of Indian conglomerates and their suppliers: distribution into fragmented markets, low-ticket financial services and succession in founder-family firms.',
        ar: 'تدرّس مديري التكتّلات الهندية ومورّديها: التوزيع في الأسواق المجزّأة، والخدمات المالية منخفضة القيمة، وتعاقب الأجيال في الشركات التي تديرها العائلات المؤسِّسة.'
      }
    },
    {
      id: 's-lantau',
      name: { en: 'Lantau Institute of Finance', ar: 'معهد لانتاو للتمويل' },
      city: { en: 'Hong Kong', ar: 'هونغ كونغ' },
      country: { en: 'China', ar: 'الصين' },
      region: 'asia', founded: 1979, accreditation: ['AACSB', 'EQUIS'],
      about: {
        en: 'A finance school first: cross-border capital markets, trade finance, and reading how mainland regulation lands on regional businesses.',
        ar: 'معهد مالي في المقام الأول: أسواق رأس المال العابرة للحدود، وتمويل التجارة، وقراءة أثر اللوائح التنظيمية الصينية على شركات المنطقة.'
      }
    },
    {
      id: 's-sundastrait',
      name: { en: 'Sunda Strait Business School', ar: 'كلية مضيق سوندا للأعمال' },
      city: { en: 'Jakarta', ar: 'جاكرتا' },
      country: { en: 'Indonesia', ar: 'إندونيسيا' },
      region: 'asia', founded: 2007, accreditation: [],
      about: {
        en: 'Southeast Asian consumer markets, Islamic finance, and the logistics of running a company across an archipelago.',
        ar: 'تركّز على أسواق المستهلك في جنوب شرق آسيا، والتمويل الإسلامي، ولوجستيات إدارة شركة موزّعة على أرخبيل من الجزر.'
      }
    },
    {
      id: 's-almarsa',
      name: { en: 'Al-Marsa Executive Institute', ar: 'معهد المرسى التنفيذي' },
      city: { en: 'Doha', ar: 'الدوحة' },
      country: { en: 'Qatar', ar: 'قطر' },
      region: 'mena', founded: 2011, accreditation: [],
      about: {
        en: 'Short programmes for energy and sovereign-fund executives, centred on gas trading, capital deployment and the governance of public-private ventures.',
        ar: 'يقدّم برامج قصيرة لقيادات قطاع الطاقة والصناديق السيادية، تتمحور حول تجارة الغاز وتوظيف رأس المال وحوكمة المشاريع المشتركة بين القطاعين العام والخاص.'
      }
    },
    {
      id: 's-almultaqa',
      name: { en: 'Al-Multaqa School of Management', ar: 'كلية الملتقى للإدارة' },
      city: { en: 'Amman', ar: 'عمّان' },
      country: { en: 'Jordan', ar: 'الأردن' },
      region: 'mena', founded: 1994, accreditation: ['AMBA'],
      about: {
        en: 'Teaches mainly in Arabic, with an unusual concentration in humanitarian operations, development finance and public budgeting.',
        ar: 'تدرّس بالعربية في الأساس، وتتميّز بتركيز نادر على إدارة العمليات الإنسانية وتمويل التنمية وإعداد الموازنات العامة.'
      }
    },
    {
      id: 's-boughaz',
      name: { en: 'Boughaz School of Business', ar: 'كلية البوغاز للأعمال' },
      city: { en: 'Casablanca', ar: 'الدار البيضاء' },
      country: { en: 'Morocco', ar: 'المغرب' },
      region: 'mena', founded: 1972, accreditation: ['EQUIS'],
      about: {
        en: 'Delivers in French, Arabic and English; strongest in port logistics, agro-industry and trade across francophone Africa.',
        ar: 'تدرّس بالفرنسية والعربية والإنجليزية، وأقوى ما فيها لوجستيات الموانئ والصناعات الزراعية والتجارة مع أفريقيا الناطقة بالفرنسية.'
      }
    },
    {
      id: 's-lagoonpoint',
      name: { en: 'Lagoon Point Business School', ar: 'كلية لاغون بوينت للأعمال' },
      city: { en: 'Lagos', ar: 'لاغوس' },
      country: { en: 'Nigeria', ar: 'نيجيريا' },
      region: 'africa', founded: 1999, accreditation: ['AMBA'],
      about: {
        en: 'Management for places where infrastructure is not a given: consumer distribution, pricing in informal markets, and financial technology under currency volatility.',
        ar: 'إدارة لبيئات لا تُعدّ فيها البنية التحتية أمرًا مضمونًا: توزيع السلع الاستهلاكية، والتسعير في الأسواق غير الرسمية، والتقنية المالية في ظلّ تقلّب العملة.'
      }
    },
    {
      id: 's-rifthighlands',
      name: { en: 'Rift Highlands School of Management', ar: 'كلية مرتفعات الوادي المتصدّع للإدارة' },
      city: { en: 'Nairobi', ar: 'نيروبي' },
      country: { en: 'Kenya', ar: 'كينيا' },
      region: 'africa', founded: 2003, accreditation: [],
      about: {
        en: 'East African in reach, with programmes on mobile money, agricultural value chains, and running operations under several regulators at once.',
        ar: 'تمتدّ برامجها في شرق أفريقيا، وتشمل المدفوعات عبر الهاتف المحمول وسلاسل القيمة الزراعية وإدارة عمليات تخضع لعدّة جهات رقابية في آنٍ واحد.'
      }
    },
    {
      id: 's-voltaridge',
      name: { en: 'Volta Ridge Institute of Business', ar: 'معهد مرتفعات فولتا للأعمال' },
      city: { en: 'Accra', ar: 'أكرا' },
      country: { en: 'Ghana', ar: 'غانا' },
      region: 'africa', founded: 2010, accreditation: [],
      about: {
        en: 'Set up around regional trade and public procurement, and now the main venue in West Africa for programmes on energy and mining governance.',
        ar: 'أُنشئ حول التجارة الإقليمية والمشتريات الحكومية، وصار المقصد الأول في غرب أفريقيا لبرامج حوكمة قطاعي الطاقة والتعدين.'
      }
    },
    {
      id: 's-altiplano',
      name: { en: 'Altiplano School of Management', ar: 'كلية ألتيبلانو للإدارة' },
      city: { en: 'Mexico City', ar: 'مدينة مكسيكو' },
      country: { en: 'Mexico', ar: 'المكسيك' },
      region: 'americas', founded: 1963, accreditation: ['AACSB'],
      about: {
        en: 'Teaches in Spanish and English, with a portfolio built around nearshoring, cross-border manufacturing and retail at Latin American scale.',
        ar: 'تدرّس بالإسبانية والإنجليزية، وتدور برامجها حول نقل التصنيع إلى الأسواق القريبة والتصنيع العابر للحدود وتجارة التجزئة على نطاق أمريكا اللاتينية.'
      }
    },
    {
      id: 's-serraverde',
      name: { en: 'Serra Verde School of Business', ar: 'كلية سيرا فيردي للأعمال' },
      city: { en: 'São Paulo', ar: 'ساو باولو' },
      country: { en: 'Brazil', ar: 'البرازيل' },
      region: 'americas', founded: 1985, accreditation: ['EQUIS', 'AMBA'],
      about: {
        en: 'Agribusiness finance and corporate finance as they are practised in a high-inflation economy, taught to managers of companies that operate at continental scale.',
        ar: 'تدرّس تمويل الأعمال الزراعية وتمويل الشركات كما يُمارَسان في اقتصاد مرتفع التضخّم، وتوجّه ذلك لمديري شركات تعمل على نطاق قارّي.'
      }
    },
    {
      id: 's-lakeshore',
      name: { en: 'Lakeshore Institute of Management', ar: 'معهد ليكشور للإدارة' },
      city: { en: 'Chicago', ar: 'شيكاغو' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 1916, accreditation: ['AACSB', 'AMBA'],
      about: {
        en: 'A quantitative school — pricing, derivatives and operations research — with a large evening portfolio for managers who keep working through the programme.',
        ar: 'معهد كمّي الطابع في التسعير والمشتقات وبحوث العمليات، وله حقيبة واسعة من البرامج المسائية لمديرين يواصلون عملهم أثناء الدراسة.'
      }
    },
    {
      id: 's-alpenblick',
      name: { en: 'Alpenblick Institute of Finance', ar: 'معهد ألبنبليك للتمويل' },
      city: { en: 'Zurich', ar: 'زيورخ' },
      country: { en: 'Switzerland', ar: 'سويسرا' },
      region: 'europe', founded: 1936, accreditation: ['AACSB', 'EQUIS'],
      about: {
        en: 'Private wealth, insurance and risk, taught in German and English, with a long-running programme for family offices.',
        ar: 'يدرّس إدارة الثروات الخاصة والتأمين والمخاطر بالألمانية والإنجليزية، وله برنامج قديم مخصّص لمكاتب إدارة ثروات العائلات.'
      }
    },
    {
      id: 's-kauriridge',
      name: { en: 'Kauri Ridge School of Business', ar: 'كلية كاوري ريدج للأعمال' },
      city: { en: 'Auckland', ar: 'أوكلاند' },
      country: { en: 'New Zealand', ar: 'نيوزيلندا' },
      region: 'oceania', founded: 1988, accreditation: ['AACSB'],
      about: {
        en: 'Primary-sector management — dairy, forestry, horticulture — and the problem of taking a small domestic company into distant export markets.',
        ar: 'تُعنى بإدارة القطاعات الأولية من ألبان وأحراج وبستنة، وبمسألة نقل شركة محلية صغيرة إلى أسواق تصدير بعيدة.'
      }
    }
  ];

  /* start: ISO date · days: teaching days · price: USD · rating out of 5 */
  const courses = [
    {
      id: 'c-agp', school: 's-northgate', subject: 'leadership', format: 'in-person',
      start: '2026-09-14', days: 12, price: 24500, langs: ['en'], rating: 4.8, reviews: 212, popularity: 98, featured: true,
      title: { en: 'Advanced General Management Programme', ar: 'برنامج الإدارة العامة المتقدّم' },
      summary: {
        en: 'A four-week residential step-up for senior managers moving into enterprise-wide responsibility.',
        ar: 'برنامج داخلي مكثّف يمتدّ أربعة أسابيع للمديرين التنفيذيين المنتقلين إلى مسؤوليات على مستوى المؤسسة بأكملها.'
      },
      highlights: {
        en: ['Enterprise strategy simulation', 'Board-level finance', '360° feedback and executive coaching', 'Alumni network of 14,000'],
        ar: ['محاكاة استراتيجية على مستوى المؤسسة', 'التمويل على مستوى مجلس الإدارة', 'تقييم شامل وتدريب تنفيذي فردي', 'شبكة خريجين تضم 14 ألف عضو']
      },
      audience: { en: 'Senior managers with 12+ years of experience', ar: 'مديرون تنفيذيون بخبرة 12 عامًا فأكثر' }
    },
    {
      id: 'c-board-fin', school: 's-northgate', subject: 'finance', format: 'in-person',
      start: '2026-10-05', days: 5, price: 11800, langs: ['en'], rating: 4.7, reviews: 156, popularity: 91, featured: true,
      title: { en: 'Finance for Board Members', ar: 'التمويل لأعضاء مجالس الإدارة' },
      summary: {
        en: 'Read any set of accounts with confidence, and ask the questions a board is supposed to ask.',
        ar: 'اقرأ أي قوائم مالية بثقة، واطرح الأسئلة التي يُفترض بمجلس الإدارة أن يطرحها.'
      },
      highlights: {
        en: ['Forensic reading of financial statements', 'Capital allocation decisions', 'Audit committee practice', 'Distress and turnaround signals'],
        ar: ['قراءة تحليلية معمّقة للقوائم المالية', 'قرارات تخصيص رأس المال', 'ممارسات لجنة المراجعة', 'مؤشرات التعثّر وإعادة الهيكلة']
      },
      audience: { en: 'Non-executive directors and board candidates', ar: 'أعضاء مجالس الإدارة غير التنفيذيين والمرشّحون للعضوية' }
    },
    {
      id: 'c-ai-exec', school: 's-marinabay', subject: 'digital', format: 'blended',
      start: '2026-09-28', days: 6, price: 8900, langs: ['en'], rating: 4.9, reviews: 341, popularity: 100, featured: true,
      title: { en: 'AI Strategy for Executives', ar: 'استراتيجية الذكاء الاصطناعي للقيادات التنفيذية' },
      summary: {
        en: 'Decide where AI actually belongs in your operating model — and where it does not.',
        ar: 'حدّد أين يندرج الذكاء الاصطناعي فعليًا ضمن نموذج تشغيل مؤسستك — وأين لا مكان له.'
      },
      highlights: {
        en: ['Build-versus-buy economics', 'Model risk and governance', 'Two live company clinics', 'A 90-day adoption roadmap'],
        ar: ['اقتصاديات البناء مقابل الشراء', 'مخاطر النماذج وحوكمتها', 'ورشتا عمل تطبيقيتان على حالات حيّة', 'خارطة طريق للتبنّي خلال 90 يومًا']
      },
      audience: { en: 'C-suite and functional heads', ar: 'الرؤساء التنفيذيون ورؤساء الوظائف' }
    },
    {
      id: 'c-negotiation', school: 's-bosphorus', subject: 'negotiation', format: 'in-person',
      start: '2026-11-09', days: 3, price: 4200, langs: ['en', 'ar'], rating: 4.8, reviews: 189, popularity: 88, featured: true,
      title: { en: 'High-Stakes Negotiation', ar: 'التفاوض في المواقف عالية المخاطر' },
      summary: {
        en: 'Twelve recorded negotiations in three days, each one debriefed on camera.',
        ar: 'اثنتا عشرة جولة تفاوض مسجّلة خلال ثلاثة أيام، تُحلَّل كل واحدة منها بالصوت والصورة.'
      },
      highlights: {
        en: ['Recorded and reviewed role-play', 'Cross-cultural deal-making', 'Multi-party and coalition tactics', 'Personal negotiation profile'],
        ar: ['تمثيل أدوار مسجّل ومُراجَع', 'إبرام الصفقات عبر الثقافات', 'تكتيكات التفاوض متعدد الأطراف والتحالفات', 'ملف تفاوضي شخصي']
      },
      audience: { en: 'Commercial, procurement and legal leaders', ar: 'قادة الشؤون التجارية والمشتريات والقانونية' }
    },
    {
      id: 'c-family-gov', school: 's-almanara', subject: 'strategy', format: 'in-person',
      start: '2026-10-19', days: 4, price: 9500, langs: ['ar', 'en'], rating: 4.7, reviews: 97, popularity: 84, featured: true,
      title: { en: 'Governance for Family Enterprises', ar: 'حوكمة الشركات العائلية' },
      summary: {
        en: 'Separating ownership, board and management before the next generation forces the issue.',
        ar: 'الفصل بين الملكية والمجلس والإدارة قبل أن يفرض الجيل القادم هذا السؤال.'
      },
      highlights: {
        en: ['Family charters and constitutions', 'Succession planning', 'Family office structures', 'Conflict resolution mechanisms'],
        ar: ['المواثيق والدساتير العائلية', 'التخطيط لتعاقب الأجيال', 'هياكل المكاتب العائلية', 'آليات حلّ النزاعات']
      },
      audience: { en: 'Family shareholders, next-generation leaders', ar: 'المساهمون من العائلة وقادة الجيل القادم' }
    },
    {
      id: 'c-public-leadership', school: 's-thuraya', subject: 'leadership', format: 'in-person',
      start: '2026-09-21', days: 10, price: 13500, langs: ['ar'], rating: 4.6, reviews: 74, popularity: 79,
      title: { en: 'Public Sector Leadership Programme', ar: 'برنامج القيادة في القطاع العام' },
      summary: {
        en: 'Delivering national transformation targets without losing the people who have to deliver them.',
        ar: 'تحقيق مستهدفات التحوّل الوطني دون فقدان الفرق التي تتولّى تنفيذها.'
      },
      highlights: {
        en: ['Policy design and delivery units', 'Cross-ministry programme management', 'Stakeholder and citizen engagement', 'Capstone ministry project'],
        ar: ['تصميم السياسات ووحدات المتابعة والتنفيذ', 'إدارة البرامج المشتركة بين الجهات', 'إشراك أصحاب المصلحة والمواطنين', 'مشروع ختامي تطبيقي داخل الجهة']
      },
      audience: { en: 'Directors-general and programme leads', ar: 'المديرون العامون وقادة البرامج' }
    },
    {
      id: 'c-digital-bank', school: 's-marinabay', subject: 'digital', format: 'online',
      start: '2026-09-07', days: 8, price: 3900, langs: ['en'], rating: 4.5, reviews: 268, popularity: 82,
      title: { en: 'Digital Banking and Embedded Finance', ar: 'الخدمات المصرفية الرقمية والتمويل المدمج' },
      summary: {
        en: 'How deposits, payments and credit are being unbundled — and what a bank does about it.',
        ar: 'كيف يُعاد تفكيك الودائع والمدفوعات والائتمان — وما الذي ينبغي للمصرف فعله حيال ذلك.'
      },
      highlights: {
        en: ['Payments rails and real-time settlement', 'Embedded lending economics', 'Regulatory sandboxes across Asia', 'Live cohort sessions, twice weekly'],
        ar: ['أنظمة المدفوعات والتسوية الفورية', 'اقتصاديات الإقراض المدمج', 'البيئات التنظيمية التجريبية في آسيا', 'جلسات مباشرة مع الدفعة مرّتين أسبوعيًا']
      },
      audience: { en: 'Banking and fintech product leaders', ar: 'قادة المنتجات في المصارف والتقنية المالية' }
    },
    {
      id: 'c-supply-resilience', school: 's-kaiserplatz', subject: 'operations', format: 'blended',
      start: '2026-10-12', days: 7, price: 7600, langs: ['en', 'de'], rating: 4.6, reviews: 143, popularity: 77,
      title: { en: 'Supply Chain Resilience', ar: 'مرونة سلاسل الإمداد' },
      summary: {
        en: 'Designing networks that bend under shock instead of snapping.',
        ar: 'تصميم شبكات إمداد تنحني أمام الصدمات بدل أن تنكسر.'
      },
      highlights: {
        en: ['Network stress-testing', 'Dual sourcing and nearshoring maths', 'Supplier risk scoring', 'Factory visit in the Ruhr'],
        ar: ['اختبارات ضغط لشبكة الإمداد', 'حسابات التوريد المزدوج والتقريب الجغرافي', 'تقييم مخاطر الموردين', 'زيارة ميدانية لمصنع في منطقة الرور']
      },
      audience: { en: 'Operations, procurement and logistics directors', ar: 'مديرو العمليات والمشتريات والخدمات اللوجستية' }
    },
    {
      id: 'c-people-analytics', school: 's-riverbend', subject: 'people', format: 'online',
      start: '2026-09-01', days: 5, price: 2400, langs: ['en'], rating: 4.4, reviews: 311, popularity: 73,
      title: { en: 'People Analytics in Practice', ar: 'تحليلات الموارد البشرية التطبيقية' },
      summary: {
        en: 'Turning HR data into decisions your CFO will accept.',
        ar: 'تحويل بيانات الموارد البشرية إلى قرارات يقبلها المدير المالي.'
      },
      highlights: {
        en: ['Attrition modelling', 'Pay equity analysis', 'Workforce planning scenarios', 'Ethics and employee privacy'],
        ar: ['نمذجة معدّلات ترك العمل', 'تحليل عدالة الأجور', 'سيناريوهات تخطيط القوى العاملة', 'الأخلاقيات وخصوصية الموظفين']
      },
      audience: { en: 'HR business partners and analysts', ar: 'شركاء الأعمال والمحللون في الموارد البشرية' }
    },
    {
      id: 'c-esg-finance', school: 's-cedarridge', subject: 'sustainability', format: 'blended',
      start: '2026-11-02', days: 6, price: 8200, langs: ['en', 'fr'], rating: 4.7, reviews: 128, popularity: 81,
      title: { en: 'Sustainable Finance and the Energy Transition', ar: 'التمويل المستدام وتحوّل الطاقة' },
      summary: {
        en: 'Where transition capital is actually going, and how to compete for it.',
        ar: 'إلى أين يتّجه رأس مال التحوّل فعليًا، وكيف تنافس للحصول عليه.'
      },
      highlights: {
        en: ['Transition finance instruments', 'Carbon accounting that survives audit', 'Disclosure regimes compared', 'Investor conversations rehearsed'],
        ar: ['أدوات تمويل التحوّل', 'محاسبة الكربون التي تصمد أمام التدقيق', 'مقارنة أنظمة الإفصاح', 'تدريب عملي على محادثات المستثمرين']
      },
      audience: { en: 'CFOs, treasurers and sustainability leads', ar: 'المديرون الماليون وأمناء الخزينة وقادة الاستدامة' }
    },
    {
      id: 'c-brand-strategy', school: 's-vasari', subject: 'marketing', format: 'in-person',
      start: '2026-10-26', days: 4, price: 7900, langs: ['en', 'es'], rating: 4.8, reviews: 164, popularity: 80,
      title: { en: 'Brand Strategy and Premium Positioning', ar: 'استراتيجية العلامة التجارية والتموضع الفاخر' },
      summary: {
        en: 'What lets one product charge four times what an identical one charges.',
        ar: 'ما الذي يتيح لمنتج أن يُسعَّر بأربعة أضعاف منتج مطابق له.'
      },
      highlights: {
        en: ['Pricing power diagnostics', 'Brand architecture decisions', 'Atelier and flagship store visits', 'Repositioning case clinics'],
        ar: ['تشخيص القدرة التسعيرية', 'قرارات معمارية العلامة التجارية', 'زيارات لورش التصميم والمتاجر الرئيسية', 'ورش حالات لإعادة التموضع']
      },
      audience: { en: 'CMOs and brand directors', ar: 'مديرو التسويق ومديرو العلامات التجارية' }
    },
    {
      id: 'c-healthcare-ops', school: 's-harborview', subject: 'healthcare', format: 'in-person',
      start: '2026-09-30', days: 5, price: 10400, langs: ['en'], rating: 4.6, reviews: 88, popularity: 68,
      title: { en: 'Leading Healthcare Organisations', ar: 'قيادة مؤسسات الرعاية الصحية' },
      summary: {
        en: 'Clinical quality, cost and staff retention are one problem, not three.',
        ar: 'جودة الرعاية والتكلفة والاحتفاظ بالكوادر مشكلة واحدة، لا ثلاث مشكلات منفصلة.'
      },
      highlights: {
        en: ['Capacity and patient flow', 'Value-based care models', 'Clinician engagement', 'Hospital site visit'],
        ar: ['إدارة الطاقة الاستيعابية وتدفّق المرضى', 'نماذج الرعاية القائمة على القيمة', 'إشراك الكوادر الطبية', 'زيارة ميدانية لمستشفى']
      },
      audience: { en: 'Hospital executives and clinical directors', ar: 'تنفيذيو المستشفيات والمديرون الطبيون' }
    },
    {
      id: 'c-data-decisions', school: 's-harborview', subject: 'data', format: 'online',
      start: '2026-09-08', days: 6, price: 3200, langs: ['en'], rating: 4.5, reviews: 402, popularity: 86,
      title: { en: 'Data-Driven Decision Making', ar: 'اتخاذ القرار المبني على البيانات' },
      summary: {
        en: 'Statistical literacy for people who sign off on the analysis rather than run it.',
        ar: 'ثقافة إحصائية لمن يعتمدون التحليلات لا لمن ينفّذونها.'
      },
      highlights: {
        en: ['Reading an A/B test honestly', 'Causal inference basics', 'Dashboards that change behaviour', 'Spotting a misleading chart'],
        ar: ['قراءة اختبارات A/B بنزاهة', 'أساسيات الاستدلال السببي', 'لوحات معلومات تغيّر السلوك فعلًا', 'كشف الرسوم البيانية المضلّلة']
      },
      audience: { en: 'Managers in any function', ar: 'المديرون في مختلف الوظائف' }
    },
    {
      id: 'c-lean-ops', school: 's-sakura', subject: 'operations', format: 'in-person',
      start: '2026-11-16', days: 5, price: 8800, langs: ['en'], rating: 4.9, reviews: 121, popularity: 76,
      title: { en: 'Operational Excellence: the Lean Study Tour', ar: 'التميّز التشغيلي: جولة دراسية في الإنتاج الرشيق' },
      summary: {
        en: 'Five days on real factory floors, not in a classroom talking about factory floors.',
        ar: 'خمسة أيام داخل مصانع حقيقية، لا في قاعة نتحدّث فيها عن المصانع.'
      },
      highlights: {
        en: ['Four plant visits', 'Standard work and kaizen practice', 'Gemba walks with plant managers', 'Transfer plan for your own site'],
        ar: ['أربع زيارات مصنعية', 'العمل المعياري وممارسة الكايزن', 'جولات ميدانية مع مديري المصانع', 'خطة نقل المعرفة إلى موقعك']
      },
      audience: { en: 'Plant and manufacturing leaders', ar: 'قادة المصانع والتصنيع' }
    },
    {
      id: 'c-growth-africa', school: 's-tablemountain', subject: 'strategy', format: 'in-person',
      start: '2026-10-07', days: 4, price: 5600, langs: ['en'], rating: 4.5, reviews: 63, popularity: 61, featured: true,
      title: { en: 'Growth Strategy for African Markets', ar: 'استراتيجية النمو في الأسواق الأفريقية' },
      summary: {
        en: 'Fifty-four markets, no single playbook — how to sequence entry and stay solvent.',
        ar: 'أربعة وخمسون سوقًا بلا وصفة واحدة — كيف ترتّب دخولك وتحافظ على ملاءتك.'
      },
      highlights: {
        en: ['Market sequencing frameworks', 'Distribution in low-infrastructure markets', 'Currency and repatriation risk', 'Local partnership structures'],
        ar: ['أطر ترتيب دخول الأسواق', 'التوزيع في الأسواق محدودة البنية التحتية', 'مخاطر العملة وتحويل الأرباح', 'هياكل الشراكات المحلية']
      },
      audience: { en: 'Regional and expansion directors', ar: 'مديرو المناطق والتوسّع' }
    },
    {
      id: 'c-first-90', school: 's-riverbend', subject: 'leadership', format: 'online',
      start: '2026-09-02', days: 3, price: 1450, langs: ['en'], rating: 4.4, reviews: 528, popularity: 85, featured: true,
      title: { en: 'Your First 90 Days as a Leader', ar: 'أول 90 يومًا في موقع القيادة' },
      summary: {
        en: 'The transition that most new managers are left to improvise.',
        ar: 'المرحلة الانتقالية التي يُترك أغلب المديرين الجدد ليرتجلوها.'
      },
      highlights: {
        en: ['Diagnosing the situation you inherited', 'Early wins that are not shortcuts', 'Building your team’s trust', 'Managing upward from day one'],
        ar: ['تشخيص الوضع الذي ورثته', 'مكاسب مبكرة ليست اختصارات', 'بناء ثقة فريقك', 'إدارة العلاقة مع رؤسائك من اليوم الأول']
      },
      audience: { en: 'Newly appointed managers', ar: 'المديرون حديثو التعيين' }
    },
    {
      id: 'c-ma', school: 's-northgate', subject: 'finance', format: 'in-person',
      start: '2026-11-23', days: 5, price: 12900, langs: ['en'], rating: 4.7, reviews: 109, popularity: 74,
      title: { en: 'Mergers, Acquisitions and Corporate Restructuring', ar: 'الاندماج والاستحواذ وإعادة هيكلة الشركات' },
      summary: {
        en: 'Most deals destroy value. This is a week on the ones that do not.',
        ar: 'معظم الصفقات تُهدر القيمة. هذا أسبوع مخصّص للصفقات التي لا تفعل.'
      },
      highlights: {
        en: ['Valuation under uncertainty', 'Due diligence red flags', 'Integration planning', 'Live deal negotiation exercise'],
        ar: ['التقييم في ظل عدم اليقين', 'مؤشرات الخطر في العناية الواجبة', 'التخطيط للدمج بعد الصفقة', 'تمرين تفاوضي على صفقة حيّة']
      },
      audience: { en: 'Corporate development and investment teams', ar: 'فرق تطوير الأعمال والاستثمار' }
    },
    {
      id: 'c-ai-arabic', school: 's-almanara', subject: 'digital', format: 'blended',
      start: '2026-10-13', days: 5, price: 5400, langs: ['ar'], rating: 4.6, reviews: 92, popularity: 78,
      title: { en: 'Artificial Intelligence for Arab Enterprises', ar: 'الذكاء الاصطناعي للمؤسسات العربية' },
      summary: {
        en: 'Delivered entirely in Arabic, using cases from Gulf and Levantine companies.',
        ar: 'يُقدَّم بالكامل باللغة العربية، بحالات من شركات خليجية وشامية.'
      },
      highlights: {
        en: ['Arabic-language NLP and its limits', 'Data residency and regional regulation', 'Vendor selection in the region', 'Sector cases: retail, banking, logistics'],
        ar: ['معالجة اللغة العربية آليًا وحدودها', 'توطين البيانات والتنظيمات الإقليمية', 'اختيار المورّدين في المنطقة', 'حالات قطاعية: التجزئة والمصارف والخدمات اللوجستية']
      },
      audience: { en: 'Executives at Arabic-speaking organisations', ar: 'القيادات في المؤسسات الناطقة بالعربية' }
    },
    {
      id: 'c-innovation', school: 's-kaiserplatz', subject: 'strategy', format: 'in-person',
      start: '2027-01-18', days: 4, price: 7200, langs: ['en', 'de'], rating: 4.5, reviews: 87, popularity: 65,
      title: { en: 'Innovation Portfolio Management', ar: 'إدارة محفظة الابتكار' },
      summary: {
        en: 'Killing projects well is the skill that makes innovation affordable.',
        ar: 'إيقاف المشاريع بطريقة سليمة هي المهارة التي تجعل الابتكار ممكنًا ماليًا.'
      },
      highlights: {
        en: ['Stage-gate versus discovery funding', 'Portfolio balance metrics', 'Killing projects without killing morale', 'Corporate venturing models'],
        ar: ['التمويل المرحلي مقابل تمويل الاستكشاف', 'مؤشرات توازن المحفظة', 'إيقاف المشاريع دون إحباط الفرق', 'نماذج الاستثمار المؤسسي الجريء']
      },
      audience: { en: 'R&D, product and strategy leaders', ar: 'قادة البحث والتطوير والمنتجات والاستراتيجية' }
    },
    {
      id: 'c-sales-ent', school: 's-vasari', subject: 'marketing', format: 'blended',
      start: '2026-09-22', days: 5, price: 6100, langs: ['en'], rating: 4.4, reviews: 134, popularity: 62,
      title: { en: 'Enterprise Sales Leadership', ar: 'قيادة المبيعات المؤسسية' },
      summary: {
        en: 'Long cycles, many buyers, one number to hit at the end of the quarter.',
        ar: 'دورات بيع طويلة ومشترون متعدّدون ورقم واحد يجب تحقيقه في نهاية الربع.'
      },
      highlights: {
        en: ['Buying-committee mapping', 'Forecast discipline', 'Compensation design', 'Coaching the pipeline review'],
        ar: ['رسم خريطة لجنة الشراء', 'انضباط التنبؤ بالمبيعات', 'تصميم أنظمة الحوافز', 'إدارة مراجعات خط المبيعات']
      },
      audience: { en: 'Sales directors and revenue leaders', ar: 'مديرو المبيعات وقادة الإيرادات' }
    },
    {
      id: 'c-cyber-board', school: 's-marinabay', subject: 'digital', format: 'online',
      start: '2026-10-20', days: 2, price: 1900, langs: ['en'], rating: 4.3, reviews: 176, popularity: 59,
      title: { en: 'Cyber Risk for Non-Technical Executives', ar: 'المخاطر السيبرانية للقيادات غير التقنية' },
      summary: {
        en: 'Two days so that the first incident is not the day you learn the vocabulary.',
        ar: 'يومان حتى لا يكون أول حادث سيبراني هو اليوم الذي تتعلّم فيه المصطلحات.'
      },
      highlights: {
        en: ['Threat landscape without the jargon', 'Tabletop breach exercise', 'Third-party and supply-chain exposure', 'Disclosure obligations'],
        ar: ['مشهد التهديدات بلا مصطلحات معقّدة', 'تمرين محاكاة لحادث اختراق', 'مخاطر الأطراف الثالثة وسلسلة الإمداد', 'التزامات الإفصاح']
      },
      audience: { en: 'Executives and board members', ar: 'التنفيذيون وأعضاء مجالس الإدارة' }
    },
    {
      id: 'c-women-lead', school: 's-cedarridge', subject: 'leadership', format: 'blended',
      start: '2026-11-04', days: 6, price: 6800, langs: ['en', 'fr'], rating: 4.8, reviews: 203, popularity: 83,
      title: { en: 'Women in Senior Leadership', ar: 'المرأة في المواقع القيادية العليا' },
      summary: {
        en: 'A cohort programme built around sponsorship, visibility and the last promotion.',
        ar: 'برنامج جماعي يتمحور حول الاحتضان المهني والحضور والترقية الأخيرة.'
      },
      highlights: {
        en: ['Executive presence work', 'Sponsorship, not just mentoring', 'Negotiating scope and pay', 'Six months of peer circles'],
        ar: ['العمل على الحضور القيادي', 'الاحتضان المهني لا الإرشاد فحسب', 'التفاوض على النطاق والأجر', 'ستة أشهر من مجموعات الدعم بين الأقران']
      },
      audience: { en: 'Senior women one step from the C-suite', ar: 'القياديات على بُعد خطوة من المناصب التنفيذية العليا' }
    },
    {
      id: 'c-startup-scale', school: 's-riverbend', subject: 'entrepreneurship', format: 'online',
      start: '2026-09-15', days: 4, price: 2100, langs: ['en'], rating: 4.3, reviews: 249, popularity: 64,
      title: { en: 'Scaling a Founder-Led Business', ar: 'توسيع نطاق شركة يقودها مؤسّسها' },
      summary: {
        en: 'The stretch between twenty and two hundred people, where most founders break.',
        ar: 'المرحلة بين عشرين وماتتي موظف، حيث ينهار أغلب المؤسّسين.'
      },
      highlights: {
        en: ['Hiring your first executives', 'Letting go of the product', 'Unit economics discipline', 'Fundraising versus profitability'],
        ar: ['توظيف أول فريق تنفيذي', 'التخلّي عن الإمساك بالمنتج', 'انضباط اقتصاديات الوحدة', 'جمع التمويل مقابل الربحية']
      },
      audience: { en: 'Founders and early executives', ar: 'المؤسّسون والتنفيذيون الأوائل' }
    },
    {
      id: 'c-commodities', school: 's-andes', subject: 'finance', format: 'in-person',
      start: '2026-11-30', days: 4, price: 6900, langs: ['en', 'es'], rating: 4.5, reviews: 58, popularity: 55,
      title: { en: 'Commodity Markets and Price Risk', ar: 'أسواق السلع ومخاطر الأسعار' },
      summary: {
        en: 'Hedging programmes that survive contact with an actual price shock.',
        ar: 'برامج تحوّط تصمد أمام صدمة سعرية حقيقية.'
      },
      highlights: {
        en: ['Futures, options and structured hedges', 'Hedge accounting basics', 'Mining and agriculture cases', 'Board reporting on price risk'],
        ar: ['العقود الآجلة والخيارات والتحوّطات المهيكلة', 'أساسيات محاسبة التحوّط', 'حالات من التعدين والزراعة', 'رفع تقارير مخاطر الأسعار للمجلس']
      },
      audience: { en: 'Treasury and commercial risk teams', ar: 'فرق الخزينة والمخاطر التجارية' }
    },
    {
      id: 'c-storytelling', school: 's-rivegauche', subject: 'marketing', format: 'in-person',
      start: '2026-10-14', days: 3, price: 4700, langs: ['en', 'fr'], rating: 4.7, reviews: 142, popularity: 67,
      title: { en: 'Executive Communication and Storytelling', ar: 'التواصل القيادي وفنّ السرد' },
      summary: {
        en: 'Three days of speaking, filmed, critiqued and done again.',
        ar: 'ثلاثة أيام من الإلقاء المصوَّر والمُنتقَد ثم المُعاد.'
      },
      highlights: {
        en: ['Structuring a narrative under pressure', 'Filmed practice with critique', 'Investor and town-hall formats', 'Handling hostile questions'],
        ar: ['بناء سردية تحت الضغط', 'تدريب مصوَّر مع نقد مباشر', 'صيغ العروض للمستثمرين واللقاءات العامة', 'التعامل مع الأسئلة العدائية']
      },
      audience: { en: 'Anyone who presents to a board or the public', ar: 'كل من يقدّم عروضًا أمام مجلس إدارة أو جمهور' }
    },
    {
      id: 'c-infra-finance', school: 's-tablemountain', subject: 'finance', format: 'blended',
      start: '2027-02-08', days: 5, price: 7400, langs: ['en'], rating: 4.4, reviews: 46, popularity: 52,
      title: { en: 'Infrastructure and Project Finance', ar: 'تمويل البنية التحتية والمشاريع' },
      summary: {
        en: 'Structuring twenty-five-year assets in markets that change every eighteen months.',
        ar: 'هيكلة أصول تمتدّ 25 عامًا في أسواق تتغيّر كل ثمانية عشر شهرًا.'
      },
      highlights: {
        en: ['Concession and PPP structures', 'Bankability and risk allocation', 'Blended and development finance', 'Financial model walkthrough'],
        ar: ['هياكل الامتيازات والشراكة بين القطاعين', 'الجدارة التمويلية وتوزيع المخاطر', 'التمويل المختلط والتنموي', 'شرح تفصيلي للنموذج المالي']
      },
      audience: { en: 'Project sponsors, lenders and advisers', ar: 'رعاة المشاريع والمقرضون والمستشارون' }
    },
    {
      id: 'c-strategy-exec', school: 's-harborview', subject: 'strategy', format: 'in-person',
      start: '2027-01-11', days: 6, price: 14200, langs: ['en'], rating: 4.8, reviews: 176, popularity: 89, featured: true,
      title: { en: 'Competitive Strategy in Practice', ar: 'الاستراتيجية التنافسية التطبيقية' },
      summary: {
        en: 'Twenty cases in six days, ending with your own strategy on the wall.',
        ar: 'عشرون حالة دراسية في ستة أيام، تنتهي باستراتيجيتك أنت معلّقة على الجدار.'
      },
      highlights: {
        en: ['Industry structure analysis', 'Choosing what not to do', 'Strategy under digital disruption', 'Peer review of your own plan'],
        ar: ['تحليل بنية الصناعة', 'اختيار ما لن تفعله', 'الاستراتيجية في ظل الاضطراب الرقمي', 'مراجعة الأقران لخطتك']
      },
      audience: { en: 'General managers and strategy heads', ar: 'المديرون العامون ورؤساء الاستراتيجية' }
    },
    {
      id: 'c-change', school: 's-northgate', subject: 'leadership', format: 'blended',
      start: '2026-12-01', days: 5, price: 8600, langs: ['en'], rating: 4.5, reviews: 118, popularity: 70,
      title: { en: 'Leading Organisational Change', ar: 'قيادة التغيير المؤسسي' },
      summary: {
        en: 'The two-thirds of transformations that fail do so for reasons you can name in advance.',
        ar: 'ثُلثا مشاريع التحوّل التي تفشل تفشل لأسباب يمكن تسميتها مسبقًا.'
      },
      highlights: {
        en: ['Diagnosing readiness honestly', 'Coalition building', 'Communication cadence', 'Sustaining change after year one'],
        ar: ['تشخيص الجاهزية بصدق', 'بناء تحالف داعم', 'إيقاع التواصل', 'ترسيخ التغيير بعد السنة الأولى']
      },
      audience: { en: 'Transformation and programme leaders', ar: 'قادة التحوّل والبرامج' }
    },
    {
      id: 'c-procurement', school: 's-bosphorus', subject: 'operations', format: 'in-person',
      start: '2027-03-08', days: 3, price: 3800, langs: ['en', 'ar'], rating: 4.3, reviews: 71, popularity: 51,
      title: { en: 'Strategic Sourcing and Procurement', ar: 'التوريد الاستراتيجي والمشتريات' },
      summary: {
        en: 'Procurement as a margin lever, not a paperwork function.',
        ar: 'المشتريات بوصفها رافعة للهامش الربحي، لا وظيفة إجرائية.'
      },
      highlights: {
        en: ['Category strategy design', 'Should-cost modelling', 'Supplier negotiation practice', 'Contract risk clauses'],
        ar: ['تصميم استراتيجية الفئات الشرائية', 'نمذجة التكلفة المستهدفة', 'تدريب على التفاوض مع الموردين', 'بنود المخاطر التعاقدية']
      },
      audience: { en: 'Procurement managers and category leads', ar: 'مديرو المشتريات ومسؤولو الفئات' }
    },
    {
      id: 'c-coaching-skills', school: 's-cedarridge', subject: 'people', format: 'online',
      start: '2026-09-16', days: 4, price: 2600, langs: ['en'], rating: 4.6, reviews: 287, popularity: 72,
      title: { en: 'Coaching Skills for Managers', ar: 'مهارات التدريب الوظيفي للمديرين' },
      summary: {
        en: 'Asking instead of telling, practised until it stops feeling unnatural.',
        ar: 'أن تسأل بدل أن تُملي، مع تدريب متكرّر حتى يصبح الأمر طبيعيًا.'
      },
      highlights: {
        en: ['The coaching conversation model', 'Feedback that lands', 'Live practice with a coach observer', 'Difficult performance cases'],
        ar: ['نموذج المحادثة التدريبية', 'تغذية راجعة تُحدث أثرًا', 'تدريب مباشر بحضور مدرّب مراقب', 'حالات أداء صعبة']
      },
      audience: { en: 'Line managers and team leads', ar: 'المديرون المباشرون وقادة الفرق' }
    },
    {
      id: 'c-risk-gov', school: 's-nile', subject: 'finance', format: 'in-person',
      start: '2026-10-11', days: 5, price: 4300, langs: ['ar', 'en'], rating: 4.4, reviews: 65, popularity: 57,
      title: { en: 'Banking Risk and Regulatory Compliance', ar: 'المخاطر المصرفية والامتثال التنظيمي' },
      summary: {
        en: 'Basel in practice, taught in Arabic for North African and Levantine banks.',
        ar: 'تطبيق مقرّرات بازل عمليًا، بالعربية، لمصارف شمال أفريقيا وبلاد الشام.'
      },
      highlights: {
        en: ['Credit and market risk frameworks', 'ICAAP and stress testing', 'AML and sanctions practice', 'Regulator relationship management'],
        ar: ['أطر مخاطر الائتمان والسوق', 'التقييم الداخلي لكفاية رأس المال واختبارات الضغط', 'مكافحة غسل الأموال والعقوبات', 'إدارة العلاقة مع الجهات الرقابية']
      },
      audience: { en: 'Risk, compliance and audit officers', ar: 'مسؤولو المخاطر والامتثال والمراجعة' }
    },
    {
      id: 'c-circular', school: 's-kaiserplatz', subject: 'sustainability', format: 'blended',
      start: '2027-02-22', days: 4, price: 5900, langs: ['en', 'de'], rating: 4.4, reviews: 54, popularity: 49,
      title: { en: 'Circular Business Models', ar: 'نماذج الأعمال الدائرية' },
      summary: {
        en: 'Product-as-a-service, take-back and remanufacturing — with the numbers attached.',
        ar: 'المنتج كخدمة والاسترجاع وإعادة التصنيع — مدعومة بالأرقام.'
      },
      highlights: {
        en: ['Material flow economics', 'Regulatory drivers in the EU', 'Redesigning for recovery', 'Pricing a service model'],
        ar: ['اقتصاديات تدفّق المواد', 'المحرّكات التنظيمية في الاتحاد الأوروبي', 'إعادة التصميم من أجل الاسترجاع', 'تسعير نموذج الخدمة']
      },
      audience: { en: 'Product, operations and strategy teams', ar: 'فرق المنتجات والعمليات والاستراتيجية' }
    },
    {
      id: 'c-giga', school: 's-thuraya', subject: 'operations', format: 'in-person',
      start: '2026-11-15', days: 6, price: 9800, langs: ['ar', 'en'], rating: 4.5, reviews: 48, popularity: 66,
      title: { en: 'Delivering Giga-Projects', ar: 'إدارة تنفيذ المشاريع الكبرى' },
      summary: {
        en: 'Schedule, cost and political reality on projects measured in billions.',
        ar: 'الجدول الزمني والتكلفة والواقع المؤسسي في مشاريع تُقاس بالمليارات.'
      },
      highlights: {
        en: ['Contract packaging strategy', 'Interface and schedule risk', 'Contractor performance management', 'Reporting to a steering board'],
        ar: ['استراتيجية تحزيم العقود', 'مخاطر التداخل والجدولة', 'إدارة أداء المقاولين', 'رفع التقارير للجنة التوجيهية']
      },
      audience: { en: 'Project directors and PMO leads', ar: 'مديرو المشاريع ورؤساء مكاتب إدارة المشاريع' }
    },
    {
      id: 'c-digital-retail', school: 's-vasari', subject: 'digital', format: 'blended',
      start: '2027-01-25', days: 4, price: 6300, langs: ['en', 'es'], rating: 4.3, reviews: 79, popularity: 53,
      title: { en: 'Omnichannel Retail Transformation', ar: 'التحوّل في تجارة التجزئة متعدّدة القنوات' },
      summary: {
        en: 'One inventory, one customer, several channels that keep contradicting each other.',
        ar: 'مخزون واحد وعميل واحد وقنوات عدّة تتناقض فيما بينها باستمرار.'
      },
      highlights: {
        en: ['Inventory visibility architecture', 'Store role redefinition', 'Marketplace and D2C economics', 'Loyalty data strategy'],
        ar: ['بنية إظهار المخزون الموحّد', 'إعادة تعريف دور المتجر', 'اقتصاديات المنصّات والبيع المباشر', 'استراتيجية بيانات الولاء']
      },
      audience: { en: 'Retail and e-commerce leaders', ar: 'قادة التجزئة والتجارة الإلكترونية' }
    },
    {
      id: 'c-ai-ops', school: 's-sakura', subject: 'data', format: 'blended',
      start: '2027-03-15', days: 5, price: 7100, langs: ['en'], rating: 4.6, reviews: 66, popularity: 60,
      title: { en: 'AI in Manufacturing Operations', ar: 'الذكاء الاصطناعي في العمليات الصناعية' },
      summary: {
        en: 'Predictive maintenance and vision inspection, past the pilot stage.',
        ar: 'الصيانة التنبؤية والفحص البصري، بما يتجاوز مرحلة التجربة الأولية.'
      },
      highlights: {
        en: ['From pilot to plant-wide rollout', 'Sensor and data infrastructure', 'Quality inspection cases', 'Workforce implications'],
        ar: ['من التجربة إلى التعميم على المصنع', 'بنية المستشعرات والبيانات', 'حالات فحص الجودة', 'الأثر على القوى العاملة']
      },
      audience: { en: 'Manufacturing and engineering leaders', ar: 'قادة التصنيع والهندسة' }
    },
    {
      id: 'c-crisis', school: 's-rivegauche', subject: 'leadership', format: 'in-person',
      start: '2027-04-12', days: 3, price: 5200, langs: ['en', 'fr'], rating: 4.7, reviews: 93, popularity: 63,
      title: { en: 'Crisis Leadership and Reputation', ar: 'القيادة في الأزمات وإدارة السمعة' },
      summary: {
        en: 'A simulated seventy-two-hour crisis, with the press in the room.',
        ar: 'محاكاة أزمة تمتدّ 72 ساعة، بحضور الصحافة داخل القاعة.'
      },
      highlights: {
        en: ['Live crisis simulation', 'Press conference under fire', 'Decision-making with partial information', 'Rebuilding trust afterwards'],
        ar: ['محاكاة أزمة حيّة', 'مؤتمر صحفي تحت الضغط', 'اتخاذ القرار بمعلومات ناقصة', 'إعادة بناء الثقة بعد الأزمة']
      },
      audience: { en: 'Executive teams and communications leads', ar: 'الفرق التنفيذية وقادة الاتصال المؤسسي' }
    },
    {
      id: 'c-vc', school: 's-andes', subject: 'entrepreneurship', format: 'online',
      start: '2026-10-06', days: 3, price: 1800, langs: ['en', 'es'], rating: 4.2, reviews: 158, popularity: 50,
      title: { en: 'Venture Capital and Startup Investing', ar: 'رأس المال الجريء والاستثمار في الشركات الناشئة' },
      summary: {
        en: 'How term sheets actually allocate control, not just money.',
        ar: 'كيف توزّع اتفاقيات الاستثمار السيطرة فعليًا، لا المال فحسب.'
      },
      highlights: {
        en: ['Term sheet mechanics', 'Valuation and dilution maths', 'Portfolio construction', 'Emerging-market fund dynamics'],
        ar: ['آليات اتفاقية الشروط', 'حسابات التقييم والتخفيف', 'بناء المحفظة الاستثمارية', 'ديناميكيات الصناديق في الأسواق الناشئة']
      },
      audience: { en: 'Angels, corporate VC and founders', ar: 'المستثمرون الملائكيون وصناديق الشركات والمؤسّسون' }
    },
    {
      id: 'c-hr-transform', school: 's-nile', subject: 'people', format: 'blended',
      start: '2027-02-15', days: 4, price: 3600, langs: ['ar'], rating: 4.3, reviews: 41, popularity: 47,
      title: { en: 'Modernising the HR Function', ar: 'تحديث وظيفة الموارد البشرية' },
      summary: {
        en: 'Moving from personnel administration to a function the business asks for advice.',
        ar: 'الانتقال من إدارة شؤون الموظفين إلى وظيفة يستشيرها العمل.'
      },
      highlights: {
        en: ['Operating model redesign', 'Digitising core HR processes', 'Capability building for HR teams', 'Measuring HR’s contribution'],
        ar: ['إعادة تصميم نموذج التشغيل', 'رقمنة عمليات الموارد البشرية الأساسية', 'بناء قدرات فرق الموارد البشرية', 'قياس مساهمة الموارد البشرية']
      },
      audience: { en: 'HR directors and transformation leads', ar: 'مديرو الموارد البشرية وقادة التحوّل' }
    },
    {
      id: 'c-experimentation-product-commercial', school: 's-riverbend', subject: 'data', format: 'blended',
      start: '2027-02-22', days: 4, price: 3400, langs: ['en'], rating: 4.6, reviews: 174, popularity: 78,
      title: { en: 'Experimentation for Product and Commercial Teams', ar: 'التجريب لفرق المنتجات والشؤون التجارية' },
      summary: {
        en: 'Run the test that settles the question, not the one everyone argues about afterwards.',
        ar: 'تصميم تجربة تحسم السؤال بدل تجربة يتجادل الجميع في نتائجها بعد انتهائها.'
      },
      highlights: {
        en: ['Sizing a test before you launch it', 'Guardrail metrics and stopping rules', 'Two live experiment designs pulled apart in class', 'A twelve-week testing calendar for one product line'],
        ar: ['تحديد حجم العيّنة قبل إطلاق الاختبار', 'مؤشرات الضبط وقواعد إيقاف الاختبار', 'تفكيك تصميمَي تجربة حقيقيتين داخل القاعة', 'تقويم اختبارات لاثني عشر أسبوعًا لخطّ منتجات واحد']
      },
      audience: { en: 'Product, growth and commercial managers', ar: 'مديرو المنتجات والنمو والشؤون التجارية' }
    },
    {
      id: 'c-forecasting-planners-budget-holders', school: 's-lakeshore', subject: 'data', format: 'online',
      start: '2026-12-01', days: 6, price: 2200, langs: ['en'], rating: 4.5, reviews: 296, popularity: 74,
      title: { en: 'Forecasting for Planners and Budget Holders', ar: 'التنبّؤ لمسؤولي التخطيط والموازنات' },
      summary: {
        en: 'A forecast without a range is a guess with a decimal point on it.',
        ar: 'التنبّؤ بلا نطاق ليس إلا تخمينًا مزيّنًا بفاصلة عشرية.'
      },
      highlights: {
        en: ['Separating trend, season and noise in your own series', 'Prediction intervals instead of single numbers', 'Judgemental overrides and the few cases where they help', 'Rebuilding one demand forecast end to end'],
        ar: ['فصل الاتجاه والموسمية والضجيج في سلاسلك الزمنية', 'فترات التنبّؤ بدل الأرقام المفردة', 'التعديلات التقديرية والحالات القليلة التي تفيد فيها', 'إعادة بناء تنبّؤ طلب واحد من أوّله إلى آخره']
      },
      audience: { en: 'Planning, supply and FP&A managers', ar: 'مديرو التخطيط والإمداد والتحليل المالي' }
    },
    {
      id: 'c-data-governance-privacy-consent', school: 's-kaiserplatz', subject: 'data', format: 'in-person',
      start: '2027-03-15', days: 4, price: 5600, langs: ['en', 'de'], rating: 4.6, reviews: 112, popularity: 69,
      title: { en: 'Data Governance, Privacy and Consent', ar: 'حوكمة البيانات والخصوصية والموافقة' },
      summary: {
        en: 'What you may keep, what you must delete, and who inside the company gets to decide.',
        ar: 'ما الذي يجوز الاحتفاظ به، وما الذي يجب حذفه، ومن داخل الشركة يملك حقّ البتّ في ذلك.'
      },
      highlights: {
        en: ['Mapping data flows across a group of companies', 'Retention schedules that survive an audit', 'Lawful basis and consent applied to real records', 'A drafted governance charter for your own firm'],
        ar: ['رسم خرائط تدفّق البيانات بين شركات المجموعة', 'جداول احتفاظ تصمد أمام التدقيق', 'الأساس القانوني والموافقة مطبَّقَين على سجلات فعلية', 'مسوّدة ميثاق حوكمة بيانات لمؤسستك']
      },
      audience: {
        en: 'Data protection, legal and IT leads',
        ar: 'مسؤولو حماية البيانات والشؤون القانونية وتقنية المعلومات'
      }
    },
    {
      id: 'c-machine-learning-for-managers', school: 's-hanriver', subject: 'data', format: 'blended',
      start: '2027-05-17', days: 12, price: 11400, langs: ['en'], rating: 4.7, reviews: 96, popularity: 72,
      title: { en: 'Machine Learning for Managers', ar: 'التعلّم الآلي للمديرين' },
      summary: {
        en: 'Enough of how a model works to tell when a vendor is overselling one.',
        ar: 'قدرٌ من فهم عمل النماذج يكفي لتمييز مبالغات المورّدين.'
      },
      highlights: {
        en: ['How training data turns into a prediction, worked by hand', 'Reading a model evaluation report and its blind spots', 'Four plant and laboratory visits across three modules', 'A go/no-go review of one model already running in your firm'],
        ar: ['كيف تتحوّل بيانات التدريب إلى تنبّؤ، بحساب يدوي خطوة بخطوة', 'قراءة تقرير تقييم نموذج وكشف ما يغفله', 'أربع زيارات لمصانع ومختبرات موزّعة على ثلاث وحدات', 'مراجعة قرار المضيّ أو التوقّف لنموذج يعمل فعلًا في مؤسستك']
      },
      audience: {
        en: 'Senior managers in technical and industrial firms',
        ar: 'كبار المديرين في الشركات التقنية والصناعية'
      }
    },
    {
      id: 'c-building-a-data-strategy', school: 's-almanara', subject: 'data', format: 'in-person',
      start: '2026-12-06', days: 4, price: 5200, langs: ['ar', 'en'], rating: 4.5, reviews: 84, popularity: 71,
      title: { en: 'Building a Data Strategy', ar: 'بناء استراتيجية البيانات' },
      summary: {
        en: 'Deciding which few decisions are worth rebuilding your data for.',
        ar: 'تحديد القرارات القليلة التي تستحقّ إعادة بناء منظومة بياناتك من أجلها.'
      },
      highlights: {
        en: ['An inventory of decisions before any technology choice', 'Costing a data platform honestly, including the people', 'Splitting ownership between IT and the business units', 'A sequenced two-year data plan you leave with'],
        ar: ['جرد القرارات قبل أيّ اختيار تقني', 'تقدير كلفة منصّة البيانات بصدق، بما فيها كلفة الكوادر', 'توزيع المسؤولية بين تقنية المعلومات ووحدات الأعمال', 'خطة بيانات مرتّبة على سنتين تخرج بها معك']
      },
      audience: { en: 'Group CIOs and business unit heads', ar: 'رؤساء تقنية المعلومات في المجموعات ورؤساء وحدات الأعمال' }
    },
    {
      id: 'c-charts-that-change-a-decision', school: 's-altiplano', subject: 'data', format: 'online',
      start: '2027-01-18', days: 3, price: 1100, langs: ['es', 'en'], rating: 4.4, reviews: 233, popularity: 66,
      title: { en: 'Charts That Change a Decision', ar: 'رسوم بيانية تغيّر القرار' },
      summary: {
        en: 'Three days rebuilding your worst reports until somebody can act on them.',
        ar: 'ثلاثة أيام في إعادة بناء أسوأ تقاريرك حتى يصبح في مقدور أحدهم أن يتصرّف بناءً عليها.'
      },
      highlights: {
        en: ['Choosing the chart form before choosing the colour', 'Cutting a forty-page pack down to six exhibits', 'Annotation that carries the argument for you', 'Your own monthly dashboard redesigned on screen'],
        ar: ['اختيار شكل الرسم قبل اختيار اللون', 'اختصار حزمة من أربعين صفحة إلى ستة رسوم', 'التعليقات التوضيحية التي تحمل الحجّة نيابةً عنك', 'إعادة تصميم لوحة تقاريرك الشهرية أمام المجموعة']
      },
      audience: { en: 'Analysts and reporting managers', ar: 'المحلّلون ومديرو التقارير' }
    },
    {
      id: 'c-the-analytics-translator', school: 's-tablemountain', subject: 'data', format: 'blended',
      start: '2027-06-14', days: 5, price: 3900, langs: ['en'], rating: 4.5, reviews: 57, popularity: 58,
      title: { en: 'The Analytics Translator', ar: 'الوسيط بين الأعمال وفرق التحليل' },
      summary: {
        en: 'Standing between the business question and the team that can answer it, without garbling either side.',
        ar: 'الوقوف بين سؤال العمل والفريق القادر على الإجابة عنه دون تشويه أيّ من الطرفين.'
      },
      highlights: {
        en: ['Turning a vague request into a written specification', 'Estimating effort before you commission the work', 'Presenting uncertainty to a sceptical executive committee', 'A brief drafted for a real request from your own inbox'],
        ar: ['تحويل طلب غامض إلى مواصفة مكتوبة', 'تقدير الجهد قبل تكليف الفريق بالعمل', 'عرض عدم اليقين أمام لجنة تنفيذية متشكّكة', 'صياغة تكليف تحليلي لطلب حقيقي من بريدك']
      },
      audience: { en: 'Business leads working with data teams', ar: 'قادة الأعمال العاملون مع فرق البيانات' }
    },
    {
      id: 'c-master-data-bad-records', school: 's-sakura', subject: 'data', format: 'in-person',
      start: '2026-11-09', days: 3, price: 3900, langs: ['en'], rating: 4.6, reviews: 41, popularity: 52,
      title: { en: 'Master Data and the Cost of Bad Records', ar: 'البيانات المرجعية وكلفة السجلات الخاطئة' },
      summary: {
        en: 'Every duplicate customer record is paid for somewhere further down the line.',
        ar: 'كلّ سجلّ عميل مكرّر تُدفَع كلفته في موضع لاحق من سلسلة العمليات.'
      },
      highlights: {
        en: ['Measuring error rates in a system that is still running', 'Matching and de-duplication rules written and tested', 'Placing ownership at the point of data entry', 'A remediation plan for one master data domain'],
        ar: ['قياس معدّلات الخطأ في نظام قيد التشغيل', 'كتابة قواعد المطابقة وإزالة التكرار واختبارها', 'تحديد المسؤولية عند نقطة إدخال البيانات', 'خطة معالجة لنطاق واحد من البيانات المرجعية']
      },
      audience: { en: 'Operations and data quality managers', ar: 'مديرو العمليات وجودة البيانات' }
    },
    {
      id: 'c-selling-data-as-a-product', school: 's-marinabay', subject: 'data', format: 'in-person',
      start: '2027-08-16', days: 4, price: 6800, langs: ['en'], rating: 4.6, reviews: 63, popularity: 64,
      title: { en: 'Selling Data as a Product', ar: 'بيع البيانات كمنتج' },
      summary: {
        en: 'The data you already collect, priced, licensed and supported like anything else you sell.',
        ar: 'البيانات التي تجمعها أصلًا، مسعّرة ومرخّصة ومدعومة كأيّ منتج آخر تبيعه.'
      },
      highlights: {
        en: ['What buyers pay for and what they quietly ignore', 'Licence terms and limits on onward use', 'Service levels and versioning for a live data feed', 'A pricing sheet built for one of your own datasets'],
        ar: ['ما يدفع المشترون ثمنه وما يتجاهلونه في صمت', 'شروط الترخيص وقيود إعادة الاستخدام', 'مستويات الخدمة وإدارة الإصدارات لتغذية بيانات حيّة', 'قائمة أسعار لمجموعة بيانات من عندك']
      },
      audience: { en: 'Commercial and product directors', ar: 'مديرو الشؤون التجارية والمنتجات' }
    },
    {
      id: 'c-fraud-analytics-in-payments', school: 's-lagoonpoint', subject: 'data', format: 'in-person',
      start: '2027-04-05', days: 3, price: 2700, langs: ['en'], rating: 4.7, reviews: 48, popularity: 61,
      title: { en: 'Fraud Analytics in Payments', ar: 'تحليلات الاحتيال في المدفوعات' },
      summary: {
        en: 'Catching more fraud while turning away fewer customers who were going to pay.',
        ar: 'ضبط قدر أكبر من الاحتيال مع رفض عدد أقلّ من العملاء الصادقين.'
      },
      highlights: {
        en: ['Rules, scores and the trade-off between the two', 'False positives costed in lost revenue, not in counts', 'Designing the case review queue and its handoffs', 'A tuned threshold set for one payment channel'],
        ar: ['القواعد ودرجات المخاطر والمفاضلة بينهما', 'احتساب كلفة الإنذارات الكاذبة بالإيراد الضائع لا بعدد الحالات', 'تصميم مسار مراجعة الحالات وتسليمها بين الفرق', 'ضبط عتبات المخاطر لقناة دفع واحدة']
      },
      audience: { en: 'Risk, fraud and payments managers', ar: 'مديرو المخاطر والاحتيال والمدفوعات' }
    },
    {
      id: 'c-building-an-analytics-team', school: 's-rifthighlands', subject: 'data', format: 'online',
      start: '2026-09-14', days: 5, price: 1650, langs: ['en'], rating: 4.4, reviews: 129, popularity: 63,
      title: { en: 'Building an Analytics Team from Nothing', ar: 'بناء فريق تحليل بيانات من الصفر' },
      summary: {
        en: 'The first five hires, in the order that keeps the work useful.',
        ar: 'التعيينات الخمسة الأولى بالترتيب الذي يُبقي العمل التحليلي مجديًا.'
      },
      highlights: {
        en: ['Hiring sequence and what each role is actually for', 'Choosing a first platform you can still afford in year three', 'An intake process that stops the team drowning in requests', 'A staffing and budget plan for the first year'],
        ar: ['ترتيب التعيينات والغرض الفعلي من كلّ دور', 'اختيار منصّة أولى تبقى في حدود موازنتك بعد ثلاث سنوات', 'آلية لاستقبال الطلبات تحمي الفريق من الغرق فيها', 'خطة توظيف وموازنة للسنة الأولى']
      },
      audience: { en: 'Heads of data in mid-size companies', ar: 'رؤساء البيانات في الشركات المتوسطة' }
    },
    {
      id: 'c-evidence-for-public-programmes', school: 's-almultaqa', subject: 'data', format: 'in-person',
      start: '2027-05-10', days: 10, price: 6500, langs: ['ar'], rating: 4.5, reviews: 39, popularity: 54,
      title: { en: 'Evidence and Measurement for Public Programmes', ar: 'قياس أثر البرامج العامة وبناء الأدلّة' },
      summary: {
        en: 'Knowing whether a programme worked, before the next budget cycle decides the question for you.',
        ar: 'معرفة ما إذا كان البرنامج قد نجح فعلًا، قبل أن تحسم دورة الموازنة القادمة الأمر نيابةً عنك.'
      },
      highlights: {
        en: ['Designing a baseline and a comparison group', 'Using administrative records as a measurement source', 'A field survey instrument built, piloted and corrected', 'An evaluation plan for one programme you run'],
        ar: ['تصميم خطّ الأساس ومجموعة المقارنة', 'استخدام السجلات الإدارية مصدرًا للقياس', 'بناء أداة مسح ميداني واختبارها وتصحيحها', 'خطة تقييم لبرنامج تديره بالفعل']
      },
      audience: { en: 'Ministry and NGO programme directors', ar: 'مديرو البرامج في الوزارات والمنظمات غير الحكومية' }
    },
    {
      id: 'c-ai-governance-and-model-risk', school: 's-alpenblick', subject: 'digital', format: 'in-person',
      start: '2026-10-19', days: 3, price: 5700, langs: ['en', 'de'], rating: 4.7, reviews: 84, popularity: 71,
      title: { en: 'AI Governance and Model Risk', ar: 'حوكمة الذكاء الاصطناعي ومخاطر النماذج' },
      summary: {
        en: 'Write the model register, the approval rule and the escalation path before a supervisor asks to see them.',
        ar: 'اكتب سجلّ النماذج وقاعدة الاعتماد ومسار التصعيد قبل أن تطلبها الجهة الرقابية.'
      },
      highlights: {
        en: ['A model inventory built in the room from your own systems', 'Three lines of defence mapped onto machine learning', 'Case files from underwriting and credit scoring', 'A board reporting pack you leave with'],
        ar: ['بناء سجلّ للنماذج داخل القاعة انطلاقًا من أنظمتك', 'إسقاط خطوط الدفاع الثلاثة على نماذج التعلّم الآلي', 'ملفات حالات من الاكتتاب التأميني والتصنيف الائتماني', 'حزمة تقارير جاهزة للعرض على مجلس الإدارة']
      },
      audience: { en: 'Risk, compliance and technology officers', ar: 'مسؤولو المخاطر والامتثال والتقنية' }
    },
    {
      id: 'c-replacing-the-core-system', school: 's-lakeshore', subject: 'digital', format: 'blended',
      start: '2027-03-01', days: 8, price: 9200, langs: ['en'], rating: 4.5, reviews: 62, popularity: 58,
      title: { en: 'Replacing the Core System', ar: 'استبدال النظام الأساسي للمؤسسة' },
      summary: {
        en: 'The multi-year replatforming that eats a budget, sequenced so the business keeps trading while it happens.',
        ar: 'مشروع إحلال يمتدّ سنوات ويلتهم الموازنة، نرتّب مراحله بحيث يستمرّ العمل أثناء تنفيذه.'
      },
      highlights: {
        en: ['Sequencing a migration one module at a time', 'Cost, contingency and benefit modelling for a multi-year build', 'Vendor contracts, escrow and exit clauses', 'A migration plan critiqued by the cohort'],
        ar: ['ترتيب مراحل الترحيل وحدةً تلو الأخرى', 'نمذجة التكلفة والاحتياطي والعوائد لمشروع يمتدّ سنوات', 'عقود المورّدين وحفظ الشيفرة لدى طرف ثالث وبنود الخروج', 'خطة ترحيل تخضع لنقد زملاء الدفعة']
      },
      audience: { en: 'CIOs and programme directors', ar: 'مديرو تقنية المعلومات ومديرو البرامج' }
    },
    {
      id: 'c-cloud-economics-finops', school: 's-riverbend', subject: 'digital', format: 'online',
      start: '2026-12-07', days: 4, price: 1750, langs: ['en'], rating: 4.4, reviews: 233, popularity: 69,
      title: { en: 'Cloud Economics and the FinOps Discipline', ar: 'اقتصاديات الحوسبة السحابية وضبط تكاليفها' },
      summary: {
        en: 'A cloud bill is a record of engineering decisions; four days on reading it and changing it.',
        ar: 'فاتورة السحابة سجلّ لقرارات هندسية، وأربعة أيام تكفي لقراءتها وتغييرها.'
      },
      highlights: {
        en: ['Unit cost per customer and per transaction', 'Commitment, reservation and spot strategy', 'Chargeback that engineering teams accept', 'Your own workload re-costed during the programme'],
        ar: ['احتساب تكلفة الوحدة لكل عميل ولكل عملية', 'استراتيجية الالتزامات والحجوزات والقدرة الفائضة', 'توزيع التكاليف على الفرق بصيغة يقبلها المهندسون', 'إعادة احتساب تكلفة أحد أحمال التشغيل لديك أثناء البرنامج']
      },
      audience: {
        en: 'Technology and finance leaders sharing a cloud budget',
        ar: 'قادة التقنية والمالية الذين يتقاسمون موازنة السحابة'
      }
    },
    {
      id: 'c-running-a-product-organisation', school: 's-sundastrait', subject: 'digital', format: 'in-person',
      start: '2027-06-14', days: 4, price: 3600, langs: ['en'], rating: 4.6, reviews: 97, popularity: 66,
      title: { en: 'Running a Product Organisation', ar: 'إدارة مؤسسة قائمة على المنتجات' },
      summary: {
        en: 'Moving from project budgets and delivery dates to teams that are held to an outcome.',
        ar: 'الانتقال من موازنات المشاريع ومواعيد التسليم إلى فرق تُحاسَب على النتيجة.'
      },
      highlights: {
        en: ['Rewriting a roadmap as outcomes rather than features', 'Funding teams instead of projects', 'Two days of customer discovery in Jakarta', 'A redesigned team structure for your own unit'],
        ar: ['إعادة صياغة خارطة الطريق بصيغة نتائج لا قوائم مزايا', 'تمويل الفرق بدل تمويل المشاريع', 'يومان في استكشاف احتياجات العملاء في جاكرتا', 'إعادة تصميم هيكل الفرق في وحدتك']
      },
      audience: {
        en: 'Heads of product, engineering and digital channels',
        ar: 'رؤساء المنتجات والهندسة والقنوات الرقمية'
      }
    },
    {
      id: 'c-digital-government-services', school: 's-almultaqa', subject: 'digital', format: 'in-person',
      start: '2026-12-13', days: 5, price: 3100, langs: ['ar'], rating: 4.5, reviews: 53, popularity: 56,
      title: { en: 'Digital Government Services That Get Used', ar: 'خدمات حكومية رقمية تُستخدَم فعلًا' },
      summary: {
        en: 'A service the public abandons halfway is not a service; this week is about finding where they leave.',
        ar: 'الخدمة التي يتركها المراجع في منتصفها ليست خدمة، وهذا أسبوع لاكتشاف نقطة انسحابه.'
      },
      highlights: {
        en: ['One real service rebuilt end to end', 'Digital identity, payments and shared registries', 'Measuring completion rates instead of page views', 'Procurement rules that leave room to iterate'],
        ar: ['إعادة بناء خدمة حقيقية واحدة من أوّلها إلى آخرها', 'الهوية الرقمية والمدفوعات والسجلّات المشتركة', 'قياس نسب إتمام المعاملات بدل عدد الزيارات', 'قواعد للمشتريات الحكومية تترك مجالًا للتطوير التدريجي']
      },
      audience: { en: 'Directors of e-government and service delivery', ar: 'مديرو الحكومة الإلكترونية وتقديم الخدمات' }
    },
    {
      id: 'c-first-48-hours-of-a-breach', school: 's-bosphorus', subject: 'digital', format: 'in-person',
      start: '2027-04-19', days: 2, price: 3400, langs: ['en', 'ar'], rating: 4.7, reviews: 118, popularity: 74,
      title: { en: 'The First 48 Hours of a Breach', ar: 'أوّل 48 ساعة بعد الاختراق' },
      summary: {
        en: 'Two days inside a running incident, with legal counsel, communications and a regulator in the room.',
        ar: 'يومان داخل حادث أمني جارٍ، بحضور المستشار القانوني وفريق الاتصال وممثّل الجهة الرقابية.'
      },
      highlights: {
        en: ['A live ransomware simulation running across both days', 'Deciding whether and when to pay', 'Notification deadlines in four jurisdictions', 'A written incident command structure for your firm'],
        ar: ['محاكاة مباشرة لهجوم فدية تمتدّ على مدى اليومين', 'قرار الدفع من عدمه وتوقيته', 'مهل الإبلاغ الإلزامية في أربع ولايات قضائية', 'هيكل مكتوب لقيادة الحوادث في مؤسستك']
      },
      audience: { en: 'Executive teams and security leads', ar: 'الفرق التنفيذية وقادة أمن المعلومات' }
    },
    {
      id: 'c-ai-in-hospital-operations', school: 's-harborview', subject: 'digital', format: 'blended',
      start: '2027-05-17', days: 4, price: 7600, langs: ['en'], rating: 4.6, reviews: 71, popularity: 63,
      title: {
        en: 'AI in Clinical and Hospital Operations',
        ar: 'الذكاء الاصطناعي في العمليات السريرية وإدارة المستشفيات'
      },
      summary: {
        en: 'Triage, imaging and scheduling models are already in the building, and someone has to own their errors.',
        ar: 'نماذج الفرز والتصوير وجدولة المواعيد موجودة في المستشفى فعلًا، ولا بدّ من جهة تتحمّل مسؤولية أخطائها.'
      },
      highlights: {
        en: ['Validating a vendor model on your own patient mix', 'Clinician trust, override rates and alert fatigue', 'Procurement and liability for clinical software', 'A deployment plan for one ward'],
        ar: ['التحقّق من نموذج مورّد على خصائص مرضى مستشفاك', 'ثقة الأطباء ونسب تجاوز التوصيات وإرهاق التنبيهات', 'شراء البرمجيات السريرية والمسؤولية القانونية عنها', 'خطة تطبيق في قسم واحد']
      },
      audience: {
        en: 'Hospital executives and medical information officers',
        ar: 'قيادات المستشفيات ومسؤولو المعلوماتية الطبية'
      }
    },
    {
      id: 'c-platform-marketplace-economics', school: 's-sahyadri', subject: 'digital', format: 'in-person',
      start: '2027-07-05', days: 4, price: 4200, langs: ['en'], rating: 4.5, reviews: 88, popularity: 60,
      title: { en: 'Platform and Marketplace Economics', ar: 'اقتصاديات المنصّات والأسواق الرقمية' },
      summary: {
        en: 'Which side of the market you subsidise, for how long, and what happens when a rival stops subsidising theirs.',
        ar: 'أيّ طرفَي السوق تدعم، وإلى متى، وماذا يحدث حين يتوقّف منافسك عن الدعم.'
      },
      highlights: {
        en: ['Take-rate and subsidy modelling in a spreadsheet', 'Liquidity metrics for a two-sided market', 'Why sellers leave the platform to transact directly', 'Cases from Indian commerce and payments'],
        ar: ['نمذجة نسبة العمولة والدعم في جدول بيانات', 'مؤشرات السيولة في سوق ذي طرفين', 'أسباب مغادرة البائعين المنصّة للتعامل المباشر', 'حالات من قطاعي التجارة والمدفوعات في الهند']
      },
      audience: {
        en: 'Founders and commercial leads in platform businesses',
        ar: 'المؤسّسون وقادة الشؤون التجارية في شركات المنصّات'
      }
    },
    {
      id: 'c-digitising-ports-trade-corridors', school: 's-boughaz', subject: 'digital', format: 'blended',
      start: '2027-03-22', days: 6, price: 4800, langs: ['fr', 'en'], rating: 4.4, reviews: 44, popularity: 48,
      title: { en: 'Digitising Ports and Trade Corridors', ar: 'رقمنة الموانئ وممرّات التجارة' },
      summary: {
        en: 'Cargo waits on paperwork far longer than it waits on ships, and the fix is mostly data rather than concrete.',
        ar: 'تنتظر البضائع الأوراق أطول ممّا تنتظر السفن، والحلّ في البيانات أكثر منه في الخرسانة.'
      },
      highlights: {
        en: ['Single-window design and customs data flows', 'A day inside a terminal operations centre', 'Electronic bills of lading and their legal standing', 'One corridor bottleneck mapped end to end'],
        ar: ['تصميم النافذة الواحدة وتدفّق البيانات الجمركية', 'يوم كامل داخل مركز تشغيل محطة الحاويات', 'سندات الشحن الإلكترونية ومركزها القانوني', 'رسم اختناق واحد في ممرّ تجاري من طرفه إلى طرفه']
      },
      audience: { en: 'Port, customs and logistics executives', ar: 'قيادات الموانئ والجمارك والخدمات اللوجستية' }
    },
    {
      id: 'c-building-mobile-money-products', school: 's-rifthighlands', subject: 'digital', format: 'in-person',
      start: '2027-01-25', days: 3, price: 2250, langs: ['en'], rating: 4.6, reviews: 67, popularity: 57,
      title: { en: 'Building Mobile Money Products', ar: 'بناء منتجات المدفوعات عبر الهاتف المحمول' },
      summary: {
        en: 'Agent networks, float and fraud decide whether a wallet survives its second year.',
        ar: 'شبكات الوكلاء والسيولة والاحتيال هي ما يحدّد بقاء المحفظة الإلكترونية في عامها الثاني.'
      },
      highlights: {
        en: ['Agent network economics and cash rebalancing', 'Fraud patterns and the rules that catch them', 'Interoperability and what regulators expect', 'A field day with agents outside Nairobi'],
        ar: ['اقتصاديات شبكة الوكلاء وإعادة توازن السيولة النقدية', 'أنماط الاحتيال والقواعد التي تكشفها', 'قابلية التشغيل البيني ومتطلّبات الجهات الرقابية', 'يوم ميداني مع الوكلاء في ضواحي نيروبي']
      },
      audience: {
        en: 'Payments and mobile financial services managers',
        ar: 'مديرو المدفوعات والخدمات المالية عبر الهاتف'
      }
    },
    {
      id: 'c-data-protection-across-borders', school: 's-northgate', subject: 'digital', format: 'blended',
      start: '2026-12-02', days: 3, price: 5100, langs: ['en'], rating: 4.5, reviews: 96, popularity: 64,
      title: { en: 'Data Protection Across Borders', ar: 'حماية البيانات عبر الحدود' },
      summary: {
        en: 'Where your data may sit, who may look at it, and what it costs to defend a transfer after the fact.',
        ar: 'أين يجوز أن تُخزَّن بياناتك، ومن يحقّ له الاطّلاع عليها، وكم يكلّف الدفاع عن نقلها لاحقًا.'
      },
      highlights: {
        en: ['Mapping data flows across a real group structure', 'Residency rules in the Gulf, Europe and Asia compared', 'Vendor and sub-processor contract clauses', 'A transfer assessment you can defend'],
        ar: ['رسم خرائط تدفّق البيانات داخل هيكل مجموعة حقيقي', 'مقارنة قواعد توطين البيانات في الخليج وأوروبا وآسيا', 'بنود التعاقد مع المورّدين والمعالجين من الباطن', 'إعداد تقييم لنقل البيانات قابل للدفاع عنه']
      },
      audience: { en: 'General counsel, privacy and data leaders', ar: 'المستشارون القانونيون وقادة الخصوصية والبيانات' }
    },
    {
      id: 'c-back-office-ai-agents', school: 's-altiplano', subject: 'digital', format: 'online',
      start: '2027-08-02', days: 6, price: 2400, langs: ['es', 'en'], rating: 4.3, reviews: 141, popularity: 55,
      title: { en: 'Automating the Back Office with AI Agents', ar: 'أتمتة العمليات الإدارية بوكلاء الذكاء الاصطناعي' },
      summary: {
        en: 'One invoice process taken apart and rebuilt with agents, exceptions written down rather than wished away.',
        ar: 'تفكيك دورة واحدة لمعالجة الفواتير وإعادة بنائها بوكلاء آليين، مع توثيق الحالات الاستثنائية بدل تجاهلها.'
      },
      highlights: {
        en: ['Process mining before a line of automation is written', 'Deciding where a human must stay in the loop', 'Error rates, audit trails and the cost of rework', 'A costed automation case for one process'],
        ar: ['تحليل مسار العملية قبل كتابة أيّ أتمتة', 'تحديد المواضع التي يجب أن يبقى فيها قرار بشري', 'نسب الخطأ ومسارات التدقيق وتكلفة إعادة العمل', 'دراسة جدوى مسعّرة لأتمتة عملية واحدة']
      },
      audience: { en: 'Shared services and finance operations managers', ar: 'مديرو الخدمات المشتركة والعمليات المالية' }
    },
    {
      id: 'c-technology-due-diligence', school: 's-lantau', subject: 'digital', format: 'in-person',
      start: '2027-06-07', days: 3, price: 5100, langs: ['en'], rating: 4.6, reviews: 59, popularity: 54,
      title: { en: 'Technology Due Diligence in Acquisitions', ar: 'العناية الواجبة التقنية في عمليات الاستحواذ' },
      summary: {
        en: "Three days on what a code base, a data estate and a CTO's answers actually tell a buyer.",
        ar: 'ثلاثة أيام في قراءة ما تكشفه الشيفرة وأصول البيانات وإجابات المدير التقني للمشتري.'
      },
      highlights: {
        en: ["Reading an architecture review from the buyer's side", 'Pricing technical debt into the valuation model', 'Licence, open-source and intellectual property exposure', 'A diligence question bank you keep'],
        ar: ['قراءة المراجعة المعمارية للأنظمة من موقع المشتري', 'إدراج الدين التقني ضمن نموذج التقييم', 'مخاطر التراخيص والمصادر المفتوحة والملكية الفكرية', 'بنك أسئلة للعناية الواجبة يبقى معك']
      },
      audience: { en: 'Deal teams and technology advisers', ar: 'فرق الصفقات والمستشارون التقنيون' }
    },
    {
      id: 'c-chief-digital-officer-programme', school: 's-thuraya', subject: 'digital', format: 'blended',
      start: '2027-04-05', days: 14, price: 16800, langs: ['ar', 'en'], rating: 4.7, reviews: 38, popularity: 72,
      title: { en: 'The Chief Digital Officer Programme', ar: 'برنامج رئيس التحوّل الرقمي' },
      summary: {
        en: 'A year in four modules for executives handed a digital mandate and no direct authority over the people delivering it.',
        ar: 'عام في أربع وحدات لتنفيذيين أُسندت إليهم مهمّة رقمية دون سلطة مباشرة على من ينفّذها.'
      },
      highlights: {
        en: ['Four residential modules with assigned work between them', 'A digital operating model designed for your own entity', 'Recruiting and holding an internal engineering team', 'Rehearsed reporting to a board and a steering committee'],
        ar: ['أربع وحدات حضورية بينها أعمال تطبيقية مكلَّف بها', 'تصميم نموذج تشغيل رقمي لجهتك تحديدًا', 'استقطاب فريق هندسي داخلي والحفاظ عليه', 'تدريب على عرض النتائج أمام المجلس واللجنة التوجيهية']
      },
      audience: { en: 'Chief digital and transformation officers', ar: 'رؤساء التحوّل الرقمي في الجهات والشركات' }
    },
    {
      id: 'c-esg-reporting-and-assurance', school: 's-rivegauche', subject: 'sustainability', format: 'blended',
      start: '2026-12-07', days: 5, price: 5200, langs: ['en', 'fr'], rating: 4.5, reviews: 96, popularity: 66,
      title: { en: 'ESG Reporting and Assurance', ar: 'تقارير الاستدامة والتحقّق المستقل منها' },
      summary: {
        en: 'The year sustainability numbers stopped being marketing and started being audited.',
        ar: 'السنة التي خرجت فيها أرقام الاستدامة من دائرة التسويق ودخلت دائرة التدقيق.'
      },
      highlights: {
        en: ['A double materiality assessment run end to end', 'Building the scope 1, 2 and 3 emissions inventory', 'What an assurance provider will ask you to evidence', 'A disclosure gap analysis on your own last report'],
        ar: ['تقييم كامل للأهمية النسبية المزدوجة من بدايته إلى نهايته', 'بناء جرد الانبعاثات بنطاقاته الثلاثة', 'ما الذي سيطلب مدقّق الاستدامة إثباته بالمستندات', 'تحليل فجوات الإفصاح في آخر تقرير أصدرته مؤسستك']
      },
      audience: {
        en: 'Finance, reporting and sustainability managers',
        ar: 'المديرون الماليون ومسؤولو التقارير والاستدامة'
      }
    },
    {
      id: 'c-decarbonising-the-supply-chain', school: 's-hanriver', subject: 'sustainability', format: 'blended',
      start: '2026-12-14', days: 6, price: 5400, langs: ['en'], rating: 4.5, reviews: 72, popularity: 64,
      title: { en: 'Decarbonising the Supply Chain', ar: 'خفض انبعاثات سلسلة الإمداد' },
      summary: {
        en: 'Nine tenths of your footprint sits inside companies you do not own and cannot instruct.',
        ar: 'تسعة أعشار بصمتك الكربونية تقع داخل شركات لا تملكها ولا تملك أمرها.'
      },
      highlights: {
        en: ['Supplier emissions data you can actually verify', 'Procurement clauses that change supplier behaviour', 'Cost-to-abate curves built component by component', 'Design of a supplier engagement programme'],
        ar: ['بيانات انبعاثات المورّدين القابلة للتحقّق فعليًا', 'بنود في عقود الشراء تغيّر سلوك المورّد', 'منحنيات تكلفة الخفض محسوبة مكوّنًا مكوّنًا', 'تصميم برنامج لإشراك المورّدين']
      },
      audience: {
        en: 'Procurement and sustainability managers in manufacturing',
        ar: 'مديرو المشتريات والاستدامة في قطاع التصنيع'
      }
    },
    {
      id: 'c-measuring-social-impact-honestly', school: 's-almultaqa', subject: 'sustainability', format: 'online',
      start: '2026-12-01', days: 6, price: 1900, langs: ['ar', 'en'], rating: 4.4, reviews: 87, popularity: 55,
      title: { en: 'Measuring Social Impact Honestly', ar: 'قياس الأثر الاجتماعي بنزاهة' },
      summary: {
        en: 'Attribution is the hard part: showing the change would not have happened anyway.',
        ar: 'المعضلة في العزو: إثبات أن التغيير ما كان ليحدث لولا تدخّلك.'
      },
      highlights: {
        en: ['Writing a theory of change and then testing it', 'Choosing indicators your field teams can collect', 'Comparison groups without a randomised trial', 'Reporting to a donor who wants a single number'],
        ar: ['صياغة نظرية التغيير ثم اختبارها', 'اختيار مؤشرات تستطيع الفرق الميدانية جمع بياناتها', 'مجموعات المقارنة دون تجربة عشوائية محكومة', 'إعداد تقرير لجهة مانحة تريد رقمًا واحدًا']
      },
      audience: {
        en: 'Programme managers in NGOs and development funds',
        ar: 'مديرو البرامج في المنظمات غير الحكومية وصناديق التنمية'
      }
    },
    {
      id: 'c-pricing-climate-risk-in-insurance', school: 's-alpenblick', subject: 'sustainability', format: 'in-person',
      start: '2027-01-25', days: 3, price: 5700, langs: ['en', 'de'], rating: 4.6, reviews: 61, popularity: 57,
      title: { en: 'Pricing Climate Risk in Insurance', ar: 'تسعير مخاطر المناخ في قطاع التأمين' },
      summary: {
        en: 'Loss models built on twenty years of history are now pricing a different climate.',
        ar: 'نماذج الخسائر المبنية على سجلّ عشرين عامًا صارت تسعّر مناخًا مختلفًا.'
      },
      highlights: {
        en: ['Catastrophe model assumptions, opened and argued over', 'Repricing a flood-exposed portfolio in session', 'Reserving after three consecutive heavy loss years', 'Drafting exclusion wording that holds up in court'],
        ar: ['افتراضات نماذج الكوارث مفكَّكة ومطروحة للنقاش', 'إعادة تسعير محفظة معرّضة لمخاطر الفيضان داخل القاعة', 'تكوين المخصّصات بعد ثلاث سنوات متتالية من الخسائر الثقيلة', 'صياغة بنود استثناء تصمد أمام القضاء']
      },
      audience: { en: 'Underwriting, actuarial and reinsurance leads', ar: 'قادة الاكتتاب والاكتواريا وإعادة التأمين' }
    },
    {
      id: 'c-gas-and-the-energy-transition', school: 's-almarsa', subject: 'sustainability', format: 'in-person',
      start: '2027-03-14', days: 4, price: 6800, langs: ['ar', 'en'], rating: 4.6, reviews: 44, popularity: 62,
      title: { en: 'Gas, Power and the Energy Transition', ar: 'الغاز والكهرباء وتحوّل الطاقة' },
      summary: {
        en: 'Planning a hydrocarbon business around demand that peaks inside the life of its own assets.',
        ar: 'التخطيط لأعمال هيدروكربونية يبلغ الطلب عليها ذروته قبل انتهاء العمر التشغيلي لأصولها.'
      },
      highlights: {
        en: ['The economics of long-term LNG contracts', 'Carbon capture projects that actually reach a final investment decision', 'Hydrogen and ammonia offtake structures', 'Portfolio stress test against three demand paths'],
        ar: ['اقتصاديات عقود الغاز الطبيعي المسال طويلة الأجل', 'مشاريع احتجاز الكربون التي تصل فعلًا إلى قرار الاستثمار النهائي', 'هياكل عقود شراء الهيدروجين والأمونيا', 'اختبار ضغط للمحفظة وفق ثلاثة مسارات للطلب']
      },
      audience: {
        en: 'Energy strategy, trading and project executives',
        ar: 'قيادات الاستراتيجية والتداول والمشاريع في قطاع الطاقة'
      }
    },
    {
      id: 'c-land-use-and-deforestation-risk', school: 's-serraverde', subject: 'sustainability', format: 'in-person',
      start: '2027-04-19', days: 4, price: 4400, langs: ['en', 'es'], rating: 4.3, reviews: 41, popularity: 46,
      title: {
        en: 'Land Use and Deforestation Risk in Agribusiness',
        ar: 'استخدام الأراضي ومخاطر إزالة الغابات في الأعمال الزراعية'
      },
      summary: {
        en: 'Buyers now ask which plot the soy came from, and the answer has to survive a check.',
        ar: 'صار المشترون يسألون عن قطعة الأرض التي جاء منها فول الصويا، وعلى الإجابة أن تصمد أمام التحقّق.'
      },
      highlights: {
        en: ['Traceability down to the individual farm plot', 'Satellite monitoring evidence and where it fails', 'Contract terms for compliant sourcing', 'A field day on a working farm'],
        ar: ['التتبّع حتى مستوى قطعة الأرض الزراعية الواحدة', 'أدلّة الرصد بالأقمار الاصطناعية ومواضع قصورها', 'الشروط التعاقدية للتوريد المطابق', 'يوم ميداني في مزرعة عاملة']
      },
      audience: {
        en: 'Sourcing, trading and compliance leads in agribusiness',
        ar: 'قادة التوريد والتداول والامتثال في الأعمال الزراعية'
      }
    },
    {
      id: 'c-sustainable-cities-built-environment', school: 's-thuraya', subject: 'sustainability', format: 'in-person',
      start: '2027-06-07', days: 8, price: 6400, langs: ['ar'], rating: 4.5, reviews: 33, popularity: 53,
      title: { en: 'Sustainable Cities and the Built Environment', ar: 'المدن المستدامة والبيئة العمرانية' },
      summary: {
        en: 'Cooling, water and waste are settled at design stage, then paid for over forty years.',
        ar: 'تُحسم مسائل التبريد والمياه والنفايات في مرحلة التصميم، ثم تدفع المدينة ثمنها أربعين عامًا.'
      },
      highlights: {
        en: ['District cooling economics', 'Water reuse in an arid climate', 'Whole-life carbon of a masterplan', 'Design review of a district under development'],
        ar: ['اقتصاديات تبريد المناطق', 'إعادة استخدام المياه في المناخ الجاف', 'الكربون على امتداد دورة حياة المخطط العام', 'مراجعة تصميمية لحيّ قيد التطوير']
      },
      audience: { en: 'Urban development and infrastructure directors', ar: 'مديرو التطوير العمراني والبنية التحتية' }
    },
    {
      id: 'c-mining-communities-social-licence', school: 's-voltaridge', subject: 'sustainability', format: 'in-person',
      start: '2027-07-05', days: 3, price: 3300, langs: ['en'], rating: 4.4, reviews: 38, popularity: 48,
      title: {
        en: 'Mining, Communities and the Social Licence',
        ar: 'التعدين والمجتمعات المحلية والرخصة الاجتماعية للعمل'
      },
      summary: {
        en: 'Most stalled mines were stopped by the people living beside them, not by the geology.',
        ar: 'أغلب المناجم المتوقّفة أوقفها السكان المجاورون لها، لا طبيعة الصخر.'
      },
      highlights: {
        en: ['Grievance mechanisms that people actually use', 'Resettlement and compensation case files', 'Negotiating a community development agreement', 'Field visit to an operating concession'],
        ar: ['آليات شكاوى يلجأ إليها الناس فعلًا', 'ملفات حالات في إعادة التوطين والتعويض', 'التفاوض على اتفاقية تنمية مجتمعية', 'زيارة ميدانية لامتياز تعديني قائم']
      },
      audience: { en: 'Mine managers and community relations leads', ar: 'مديرو المناجم ومسؤولو العلاقات المجتمعية' }
    },
    {
      id: 'c-pharma-market-access-and-launch', school: 's-lakeshore', subject: 'healthcare', format: 'in-person',
      start: '2026-10-19', days: 4, price: 7200, langs: ['en'], rating: 4.6, reviews: 68, popularity: 63,
      title: { en: 'Pharmaceutical Market Access and Launch', ar: 'النفاذ إلى الأسواق الدوائية وإطلاق المنتجات' },
      summary: {
        en: 'A launch is won or lost with payers eighteen months before the first prescription.',
        ar: 'يُحسم الإطلاق ربحًا أو خسارة مع جهات الدفع قبل ثمانية عشر شهرًا من أول وصفة طبية.'
      },
      highlights: {
        en: ['Building the value dossier', 'Health-economic evidence payers will accept', 'Pricing across reference markets', 'A launch plan defended before a mock payer panel'],
        ar: ['إعداد ملفّ القيمة الخاص بالدواء', 'الأدلّة الاقتصادية الصحية التي تقبلها جهات الدفع', 'التسعير عبر الأسواق المرجعية', 'الدفاع عن خطة إطلاق أمام لجنة صورية تمثّل جهات الدفع']
      },
      audience: {
        en: 'Market access, pricing and brand leads in pharma',
        ar: 'قادة النفاذ إلى السوق والتسعير والعلامات في شركات الأدوية'
      }
    },
    {
      id: 'c-patient-safety-and-clinical-quality', school: 's-sakura', subject: 'healthcare', format: 'in-person',
      start: '2026-11-09', days: 4, price: 6800, langs: ['en'], rating: 4.7, reviews: 57, popularity: 59,
      title: { en: 'Patient Safety and Clinical Quality', ar: 'سلامة المرضى وجودة الرعاية السريرية' },
      summary: {
        en: 'Serious harm is usually a system doing exactly what it was designed to do.',
        ar: 'الضرر الجسيم غالبًا نتيجة نظام يعمل تمامًا كما صُمّم له.'
      },
      highlights: {
        en: ['Investigating an incident without assigning blame', 'Standard work at the bedside', 'Daily ward huddles observed on site', 'Redesign of one high-risk clinical process'],
        ar: ['التحقيق في حادثة دون توجيه اللوم', 'العمل المعياري عند سرير المريض', 'حضور ميداني للاجتماعات اليومية في أجنحة المرضى', 'إعادة تصميم عملية سريرية عالية الخطورة']
      },
      audience: { en: 'Quality directors and senior nursing leaders', ar: 'مديرو الجودة وقيادات التمريض العليا' }
    },
    {
      id: 'c-from-clinician-to-manager', school: 's-sahyadri', subject: 'healthcare', format: 'blended',
      start: '2027-02-08', days: 6, price: 3600, langs: ['en'], rating: 4.5, reviews: 94, popularity: 60,
      title: { en: 'From Clinician to Manager', ar: 'من الممارسة السريرية إلى الإدارة' },
      summary: {
        en: 'You now answer for a rota, a budget and colleagues who were your peers last month.',
        ar: 'صرت مسؤولًا عن جدول المناوبات والموازنة وعن زملاء كانوا حتى الشهر الماضي أندادًا لك.'
      },
      highlights: {
        en: ['Reading a departmental budget line by line', 'Rota design and safe staffing levels', "Handling a colleague's performance problem", 'Leading one service improvement project'],
        ar: ['قراءة موازنة القسم بندًا بندًا', 'تصميم جداول المناوبات ومستويات التغطية الآمنة', 'معالجة مشكلة أداء لدى زميل', 'قيادة مشروع واحد لتحسين الخدمة']
      },
      audience: {
        en: 'Consultants and department heads new to management',
        ar: 'الأطباء الاستشاريون ورؤساء الأقسام الجدد في الإدارة'
      }
    },
    {
      id: 'c-financing-universal-health-coverage', school: 's-rifthighlands', subject: 'healthcare', format: 'blended',
      start: '2027-03-01', days: 7, price: 4900, langs: ['en'], rating: 4.4, reviews: 52, popularity: 51,
      title: { en: 'Financing Universal Health Coverage', ar: 'تمويل التغطية الصحية الشاملة' },
      summary: {
        en: 'Deciding what the public purse will buy, for whom, and what it will not buy at all.',
        ar: 'تحديد ما ستشتريه الموازنة العامة، ولمن، وما لن تشتريه إطلاقًا.'
      },
      highlights: {
        en: ['Designing and costing a benefit package', 'Provider payment mechanisms compared', 'Risk pooling, premiums and the informal sector', 'Costing exercise on a national scheme'],
        ar: ['تصميم حزمة المنافع الصحية وتقدير كلفتها', 'مقارنة آليات الدفع لمقدّمي الخدمة', 'تجميع المخاطر والاشتراكات والقطاع غير الرسمي', 'تمرين على تقدير كلفة نظام صحي وطني']
      },
      audience: { en: 'Health ministry and insurance fund officials', ar: 'مسؤولو وزارات الصحة وصناديق التأمين الصحي' }
    },
    {
      id: 'c-building-and-opening-a-hospital', school: 's-almanara', subject: 'healthcare', format: 'in-person',
      start: '2027-05-10', days: 5, price: 7500, langs: ['ar', 'en'], rating: 4.5, reviews: 39, popularity: 58,
      title: { en: 'Building and Opening a New Hospital', ar: 'إنشاء مستشفى جديد وتشغيله' },
      summary: {
        en: 'The design decisions that fix your staffing costs for the next thirty years.',
        ar: 'قرارات التصميم التي تثبّت كلفة الكوادر لديك على مدى ثلاثين عامًا.'
      },
      highlights: {
        en: ['Sizing beds, theatres and clinics from demand data', 'Adjacency choices that cut staff walking distance', 'Commissioning and the first ninety days open', 'Site visit to a hospital under construction'],
        ar: ['تحديد أعداد الأسرّة وغرف العمليات والعيادات انطلاقًا من بيانات الطلب', 'خيارات توزيع الأقسام التي تختصر مسافات تنقّل الكوادر', 'التشغيل التجريبي وأول تسعين يومًا بعد الافتتاح', 'زيارة ميدانية لمستشفى قيد الإنشاء']
      },
      audience: {
        en: 'Hospital project directors and health facility owners',
        ar: 'مديرو مشاريع المستشفيات وملّاك المنشآت الصحية'
      }
    },
    {
      id: 'c-telehealth-beyond-the-pilot', school: 's-sundastrait', subject: 'healthcare', format: 'online',
      start: '2027-08-02', days: 5, price: 2200, langs: ['en'], rating: 4.3, reviews: 118, popularity: 57,
      title: { en: 'Telehealth Beyond the Pilot', ar: 'الرعاية الصحية عن بُعد بعد مرحلة التجربة' },
      summary: {
        en: 'Remote consultation works in a pilot; the referral, the pharmacy and the payment are what break.',
        ar: 'الاستشارة عن بُعد تنجح في التجربة، لكن الإحالة والصيدلية والسداد هي ما ينهار عند التوسّع.'
      },
      highlights: {
        en: ['Triage protocols for remote consultation', 'Referral hand-offs to physical facilities', 'Reimbursement models that survive volume', 'A rollout plan across dispersed geographies'],
        ar: ['بروتوكولات الفرز في الاستشارة عن بُعد', 'تسليم الإحالات إلى المنشآت الحضورية', 'نماذج سداد تصمد أمام ارتفاع أعداد المراجعين', 'خطة تعميم على مناطق جغرافية متباعدة']
      },
      audience: {
        en: 'Health system and digital health programme leads',
        ar: 'قادة المنظومات الصحية وبرامج الصحة الرقمية'
      }
    },
    {
      id: 'c-valuation-multiples-cash-flows', school: 's-lantau', subject: 'finance', format: 'in-person',
      start: '2027-04-19', days: 5, price: 5900, langs: ['en'], rating: 4.6, reviews: 84, popularity: 66,
      title: {
        en: 'Valuation: Multiples, Cash Flows and Judgement',
        ar: 'التقييم: المضاعفات والتدفقات النقدية والحكم المهني'
      },
      summary: {
        en: 'Three methods will give you three different numbers; the week is about defending the one you put on the page.',
        ar: 'ثلاث طرق للتقييم تعطيك ثلاثة أرقام مختلفة، والأسبوع كلّه مخصّص للدفاع عن الرقم الذي تكتبه أنت.'
      },
      highlights: {
        en: ['A discounted cash flow built line by line', 'Comparable company and transaction multiples', 'Valuing a loss-making business', 'Defending a number in front of an investment committee'],
        ar: ['بناء نموذج التدفقات النقدية المخصومة سطرًا بسطر', 'مضاعفات الشركات المماثلة ومضاعفات الصفقات', 'تقييم شركة خاسرة', 'الدفاع عن رقم التقييم أمام لجنة استثمار']
      },
      audience: { en: 'Corporate development and investment analysts', ar: 'محلّلو الاستثمار وفرق تطوير الأعمال' }
    },
    {
      id: 'c-financial-modelling-first-principles', school: 's-lakeshore', subject: 'finance', format: 'blended',
      start: '2027-01-25', days: 10, price: 7500, langs: ['en'], rating: 4.7, reviews: 226, popularity: 79,
      title: { en: 'Financial Modelling from First Principles', ar: 'النمذجة المالية من الأسس' },
      summary: {
        en: 'Ten sessions spent building one model that a lender, a board and an auditor can each follow without you in the room.',
        ar: 'عشر جلسات لبناء نموذج مالي واحد يتابعه المقرض والمجلس والمدقّق دون حاجة إلى وجودك لشرحه.'
      },
      highlights: {
        en: ['A three-statement model built from an empty workbook', 'Scenario and sensitivity architecture', 'Circular references, balancing items and error checks', "Line-by-line review of another participant's model"],
        ar: ['نموذج ثلاثي القوائم يُبنى من ملف فارغ', 'هيكلة السيناريوهات وتحليل الحساسية', 'المراجع الدائرية وبنود التسوية وفحوص الأخطاء', 'مراجعة تفصيلية لنموذج أحد المشاركين الآخرين']
      },
      audience: {
        en: 'Analysts and finance managers who build the numbers',
        ar: 'المحلّلون ومديرو الإدارات المالية الذين يعدّون الأرقام'
      }
    },
    {
      id: 'c-islamic-finance-sukuk-structuring', school: 's-almanara', subject: 'finance', format: 'in-person',
      start: '2026-12-06', days: 4, price: 4600, langs: ['ar', 'en'], rating: 4.7, reviews: 71, popularity: 72,
      title: { en: 'Islamic Finance and Sukuk Structuring', ar: 'التمويل الإسلامي وهيكلة الصكوك' },
      summary: {
        en: 'How a sukuk is actually assembled, from the underlying asset to the certificate the investor ends up holding.',
        ar: 'كيف يُبنى الصكّ فعليًا، من الأصل محلّ التعاقد إلى الشهادة التي ينتهي بها المطاف في يد المستثمر.'
      },
      highlights: {
        en: ['Murabaha, ijara and mudaraba structures compared', 'A Sharia board review walked through step by step', 'Pricing a sukuk against a conventional bond', 'Documenting an asset-backed issue'],
        ar: ['مقارنة بين هياكل المرابحة والإجارة والمضاربة', 'مراجعة هيئة رقابة شرعية خطوة بخطوة', 'تسعير الصكّ مقارنةً بالسند التقليدي', 'توثيق إصدار مدعوم بأصول']
      },
      audience: {
        en: 'Bankers, treasurers and Sharia compliance officers',
        ar: 'المصرفيون وأمناء الخزينة ومسؤولو الرقابة الشرعية'
      }
    },
    {
      id: 'c-deploying-sovereign-strategic-capital', school: 's-almarsa', subject: 'finance', format: 'in-person',
      start: '2027-05-16', days: 2, price: 3200, langs: ['ar', 'en'], rating: 4.5, reviews: 38, popularity: 58,
      title: { en: 'Deploying Sovereign and Strategic Capital', ar: 'توظيف رأس المال السيادي والاستراتيجي' },
      summary: {
        en: 'What changes when the capital is patient, politically visible, and larger than the market you are investing in.',
        ar: 'ما الذي يتغيّر حين يكون رأس المال صبورًا وظاهرًا سياسيًا وأكبر من السوق الذي تستثمر فيه.'
      },
      highlights: {
        en: ['Writing a mandate and choosing a benchmark', 'Direct investment against fund commitments', 'Co-investment terms with external managers', 'Reporting to a state shareholder'],
        ar: ['صياغة التفويض الاستثماري واختيار المؤشر المرجعي', 'الاستثمار المباشر مقابل الالتزام في الصناديق', 'شروط الاستثمار المشترك مع مديري أصول خارجيين', 'رفع التقارير إلى مساهم حكومي']
      },
      audience: {
        en: 'Investment officers at sovereign funds and holdings',
        ar: 'مسؤولو الاستثمار في الصناديق السيادية والشركات القابضة'
      }
    },
    {
      id: 'c-treasury-inflation-currency-stress', school: 's-serraverde', subject: 'finance', format: 'in-person',
      start: '2027-03-15', days: 4, price: 4400, langs: ['en'], rating: 4.5, reviews: 52, popularity: 54,
      title: { en: 'Treasury Under Inflation and Currency Stress', ar: 'إدارة الخزينة في ظلّ التضخّم وضغوط العملة' },
      summary: {
        en: 'Running a treasury where the discount rate moves faster than the budget cycle.',
        ar: 'إدارة الخزينة حين يتحرّك سعر الخصم أسرع من دورة الموازنة.'
      },
      highlights: {
        en: ['Cash pooling across weak-currency subsidiaries', 'Hedging when the forward market is thin', 'Indexed pricing and the contract clauses behind it', 'A rolling thirteen-week cash forecast you build yourself'],
        ar: ['تجميع السيولة عبر شركات تابعة بعملات ضعيفة', 'التحوّط في سوق آجلة ضحلة', 'التسعير المرتبط بمؤشر والبنود التعاقدية التي تسنده', 'إعداد توقّع نقدي متجدّد لثلاثة عشر أسبوعًا بيدك']
      },
      audience: {
        en: 'Treasurers and finance directors in volatile markets',
        ar: 'أمناء الخزينة والمديرون الماليون في الأسواق المتقلّبة'
      }
    },
    {
      id: 'c-working-capital-cash-conversion', school: 's-lagoonpoint', subject: 'finance', format: 'in-person',
      start: '2026-11-17', days: 3, price: 2400, langs: ['en'], rating: 4.4, reviews: 61, popularity: 51,
      title: { en: 'Working Capital and the Cash Conversion Cycle', ar: 'رأس المال العامل ودورة التحويل النقدي' },
      summary: {
        en: 'Most companies that fail are still profitable on paper the month the cash runs out.',
        ar: 'أغلب الشركات المتعثّرة تكون رابحة على الورق في الشهر الذي ينفد فيه نقدها.'
      },
      highlights: {
        en: ['Mapping your own cash conversion cycle in days', 'Negotiating supplier and distributor terms', 'Inventory financing where credit is scarce', 'Receivables discipline with informal distributors'],
        ar: ['رسم دورة التحويل النقدي في شركتك بالأيام', 'التفاوض على شروط الموردين والموزّعين', 'تمويل المخزون في أسواق شحيحة الائتمان', 'انضباط التحصيل مع موزّعين غير رسميين']
      },
      audience: { en: 'Finance managers and owner-managers', ar: 'المديرون الماليون وأصحاب الشركات الذين يديرونها' }
    },
    {
      id: 'c-credit-decisions-without-files', school: 's-rifthighlands', subject: 'finance', format: 'blended',
      start: '2027-06-07', days: 5, price: 3300, langs: ['en'], rating: 4.6, reviews: 44, popularity: 56,
      title: { en: 'Credit Decisions Without Credit Files', ar: 'قرارات الائتمان دون ملفّات ائتمانية' },
      summary: {
        en: 'Lending to borrowers with no filed accounts and no bureau record, without pretending the risk is smaller than it is.',
        ar: 'الإقراض لعملاء بلا قوائم مالية مُودَعة ولا سجلّ لدى مكاتب الائتمان، دون التظاهر بأنّ المخاطرة أقلّ ممّا هي عليه.'
      },
      highlights: {
        en: ['Alternative data: mobile money and till records', 'Building a scorecard and back-testing it', 'Provisioning and collections policy', 'Field visit to two lending branches'],
        ar: ['البيانات البديلة: المدفوعات عبر الهاتف وسجلّات نقاط البيع', 'بناء بطاقة تقييم ائتماني واختبارها رجعيًا', 'سياسة المخصّصات والتحصيل', 'زيارة ميدانية لفرعَي إقراض']
      },
      audience: {
        en: 'Credit and risk managers at banks and lenders',
        ar: 'مديرو الائتمان والمخاطر في المصارف وشركات الإقراض'
      }
    },
    {
      id: 'c-private-equity-growth-markets', school: 's-sahyadri', subject: 'finance', format: 'in-person',
      start: '2027-02-01', days: 12, price: 9800, langs: ['en'], rating: 4.6, reviews: 67, popularity: 63,
      title: { en: 'Private Equity in Growth Markets', ar: 'الأسهم الخاصة في الأسواق النامية' },
      summary: {
        en: 'Three modules on buying, holding and leaving a company in a market where the exit is never guaranteed.',
        ar: 'ثلاث وحدات دراسية عن شراء الشركة وإدارتها والخروج منها في سوق لا يضمن لك مخرجًا.'
      },
      highlights: {
        en: ['Sourcing deals outside auction processes', 'Minority stakes and the governance rights that come with them', 'A value creation plan written with a founder-owner', 'Exit routes compared: strategic sale, listing, secondary'],
        ar: ['استقطاب الصفقات خارج المزادات التنافسية', 'حصص الأقلية وما يرافقها من حقوق حوكمة', 'إعداد خطة لخلق القيمة بالاشتراك مع مؤسّس مالك', 'مقارنة مسارات الخروج: البيع الاستراتيجي والإدراج والبيع الثانوي']
      },
      audience: {
        en: 'Private capital investors and portfolio directors',
        ar: 'مستثمرو رأس المال الخاص ومديرو المحافظ الاستثمارية'
      }
    },
    {
      id: 'c-finance-for-non-financial-managers', school: 's-riverbend', subject: 'finance', format: 'online',
      start: '2026-10-05', days: 4, price: 1350, langs: ['en'], rating: 4.4, reviews: 387, popularity: 81,
      title: { en: 'Finance for Non-Financial Managers', ar: 'المالية للمديرين من غير المتخصّصين' },
      summary: {
        en: 'Four sessions so you stop nodding through the monthly finance review.',
        ar: 'أربع جلسات تكفي لتتوقّف عن الإيماء بلا فهم في مراجعة الأداء المالي الشهرية.'
      },
      highlights: {
        en: ['Where the three statements connect', 'Reading a budget variance honestly', 'A business case with a payback number in it', 'Clinic on a cost line you actually own'],
        ar: ['نقاط الاتصال بين القوائم المالية الثلاث', 'قراءة انحرافات الموازنة بنزاهة', 'إعداد دراسة جدوى تتضمّن فترة استرداد محسوبة', 'جلسة تطبيقية على بند تكلفة تتحمّل مسؤوليته فعلًا']
      },
      audience: { en: 'Managers outside the finance function', ar: 'المديرون خارج الإدارة المالية' }
    },
    {
      id: 'c-trade-finance-documentary-credit', school: 's-nile', subject: 'finance', format: 'in-person',
      start: '2026-12-13', days: 4, price: 3200, langs: ['ar', 'en'], rating: 4.5, reviews: 79, popularity: 60,
      title: { en: 'Trade Finance and Documentary Credit', ar: 'تمويل التجارة والاعتمادات المستندية' },
      summary: {
        en: 'Letters of credit, guarantees, and the discrepancies that quietly stop a shipment from being paid for.',
        ar: 'الاعتمادات المستندية والضمانات، والمخالفات المستندية التي تعطّل بهدوء سداد قيمة الشحنة.'
      },
      highlights: {
        en: ['UCP 600 rules applied to real document sets', 'Finding the discrepancies before the bank does', 'Guarantees, standby credits and country risk', 'Structuring the finance for a commodity import'],
        ar: ['تطبيق الأعراف والممارسات الموحّدة للاعتمادات المستندية UCP 600 على مجموعات مستندات حقيقية', 'اكتشاف المخالفات قبل أن يكتشفها المصرف', 'الضمانات والاعتمادات الاحتياطية ومخاطر الدولة', 'هيكلة تمويل عملية استيراد سلعة أساسية']
      },
      audience: { en: 'Trade finance officers and export managers', ar: 'موظفو تمويل التجارة ومديرو التصدير' }
    },
    {
      id: 'c-running-a-family-office', school: 's-alpenblick', subject: 'finance', format: 'in-person',
      start: '2027-03-01', days: 5, price: 9600, langs: ['en', 'de'], rating: 4.7, reviews: 41, popularity: 62,
      title: { en: 'Running a Family Office', ar: 'إدارة المكتب العائلي' },
      summary: {
        en: "The point at which a family's wealth needs staff, a written mandate and someone whose job is to say no.",
        ar: 'اللحظة التي تحتاج فيها ثروة العائلة إلى فريق دائم وتفويض مكتوب ومن تكون مهمّته أن يقول لا.'
      },
      highlights: {
        en: ['Single-family and multi-family structures compared', 'An investment policy statement drafted in class', 'Manager selection and the total cost of fees', "Succession and the next generation's mandate"],
        ar: ['مقارنة بين هياكل المكتب الأحادي والمكتب المتعدّد العائلات', 'صياغة وثيقة السياسة الاستثمارية داخل القاعة', 'اختيار مديري الأصول والتكلفة الإجمالية للرسوم', 'التعاقب وتفويض الجيل القادم']
      },
      audience: {
        en: 'Principals, family office executives and advisers',
        ar: 'أصحاب الثروات وتنفيذيو المكاتب العائلية ومستشاروهم'
      }
    },
    {
      id: 'c-capital-investment-appraisal', school: 's-altiplano', subject: 'finance', format: 'blended',
      start: '2026-09-21', days: 5, price: 4900, langs: ['es', 'en'], rating: 4.4, reviews: 96, popularity: 57,
      title: { en: 'Capital Investment Appraisal', ar: 'تقييم القرارات الاستثمارية الرأسمالية' },
      summary: {
        en: 'Every plant, line and warehouse proposal arrives with a positive net present value; this is how to tell which ones are real.',
        ar: 'كل مقترح لمصنع أو خطّ إنتاج أو مستودع يصلك بصافي قيمة حالية موجب، وهنا تتعلّم كيف تميّز الجادّ منها.'
      },
      highlights: {
        en: ['Cash flows stripped of accounting noise', 'Hurdle rates and where the number came from', 'Real options inside a nearshoring decision', 'Post-completion audit of a project already built'],
        ar: ['تدفّقات نقدية مجرّدة من الضجيج المحاسبي', 'معدّلات العائد المطلوبة ومن أين جاء الرقم', 'الخيارات الحقيقية داخل قرار نقل التصنيع إلى سوق قريبة', 'مراجعة لاحقة لمشروع تم تنفيذه بالفعل']
      },
      audience: {
        en: 'Plant, engineering and finance decision-makers',
        ar: 'صنّاع القرار في المصانع والهندسة والإدارة المالية'
      }
    },
    {
      id: 'c-investor-relations-equity-story', school: 's-harborview', subject: 'finance', format: 'in-person',
      start: '2027-07-12', days: 3, price: 5400, langs: ['en'], rating: 4.6, reviews: 58, popularity: 64,
      title: { en: 'Investor Relations and the Equity Story', ar: 'علاقات المستثمرين وسردية الاستثمار في السهم' },
      summary: {
        en: 'The quarterly call is not a disclosure exercise; it is where your cost of equity gets set.',
        ar: 'مكالمة النتائج الفصلية ليست تمرينًا على الإفصاح، بل هي المكان الذي تُحدَّد فيه كلفة حقوق الملكية لديك.'
      },
      highlights: {
        en: ['Guidance policy and what issuing it commits you to', 'A rehearsed earnings call with buy-side questioners', 'Responding to an activist letter', 'Rebuilding the story after a missed quarter'],
        ar: ['سياسة التوجيهات المستقبلية وما يلزمك به إصدارها', 'محاكاة مكالمة نتائج بأسئلة من محلّلي جانب الشراء', 'الردّ على رسالة مستثمر ناشط', 'إعادة بناء السردية بعد ربع دون التوقّعات']
      },
      audience: { en: 'CFOs and heads of investor relations', ar: 'المديرون الماليون ورؤساء علاقات المستثمرين' }
    },
    {
      id: 'c-private-credit-direct-lending', school: 's-marinabay', subject: 'finance', format: 'online',
      start: '2027-08-09', days: 5, price: 2600, langs: ['en'], rating: 4.5, reviews: 112, popularity: 61,
      title: { en: 'Private Credit and Direct Lending', ar: 'الائتمان الخاص والإقراض المباشر' },
      summary: {
        en: 'What banks stopped lending against, and who is lending against it now.',
        ar: 'ما الذي توقّفت المصارف عن الإقراض مقابله، ومن يقرض مقابله اليوم.'
      },
      highlights: {
        en: ['Unitranche and mezzanine structures', 'Covenant packages and what they actually catch', 'Pricing illiquidity and recovery after default', 'A term sheet drafted and defended before the cohort'],
        ar: ['هياكل التمويل أحادي الشريحة وتمويل الميزانين', 'حزم التعهّدات المالية وما ترصده فعليًا', 'تسعير انعدام السيولة ومعدّلات الاسترداد عند التعثّر', 'صياغة اتفاقية شروط والدفاع عنها أمام الدفعة']
      },
      audience: { en: 'Credit investors, borrowers and their advisers', ar: 'مستثمرو الائتمان والمقترضون ومستشاروهم' }
    },
    {
      id: 'c-first-board-seat', school: 's-hanriver', subject: 'leadership', format: 'in-person',
      start: '2027-03-08', days: 4, price: 7200, langs: ['en'], rating: 4.6, reviews: 61, popularity: 63,
      title: { en: 'Preparing for Your First Board Seat', ar: 'الاستعداد لأول عضوية في مجلس إدارة' },
      summary: {
        en: 'What a board actually does between meetings, and what it will expect of you in your first year on one.',
        ar: 'ما الذي يفعله مجلس الإدارة فعليًا بين اجتماع وآخر، وما الذي سيُنتظر منك في سنتك الأولى عضوًا فيه.'
      },
      highlights: {
        en: ['Reading a full board pack in ninety minutes', 'Mock board meeting run on a real agenda', 'Director duties and personal liability', 'A written statement of what you bring to a board'],
        ar: ['قراءة حزمة وثائق المجلس كاملة في تسعين دقيقة', 'اجتماع مجلس صوري يُدار بجدول أعمال حقيقي', 'واجبات العضو ومسؤوليته الشخصية', 'وثيقة مكتوبة تعرّف بما تقدّمه لمجلس الإدارة']
      },
      audience: {
        en: 'Senior executives seeking a first non-executive role',
        ar: 'تنفيذيون كبار يسعون إلى أول عضوية غير تنفيذية'
      }
    },
    {
      id: 'c-country-manager-programme', school: 's-sahyadri', subject: 'leadership', format: 'blended',
      start: '2027-01-11', days: 20, price: 18500, langs: ['en'], rating: 4.7, reviews: 84, popularity: 72,
      title: { en: 'The Country Manager Programme', ar: 'برنامج المدير القُطري' },
      summary: {
        en: 'Running a whole country operation for the first time, with a P&L, a regulator and a head office to answer to.',
        ar: 'إدارة عمليات دولة بأكملها لأول مرة، وأمامك قائمة أرباح وخسائر تُسأل عنها وجهة رقابية ومقرّ رئيسي تُرفع إليه التقارير.'
      },
      highlights: {
        en: ['Four residential modules across eight months', 'Head-office budget negotiation simulation', 'Distributor and channel economics', 'A three-year country plan defended before a panel'],
        ar: ['أربع وحدات دراسية داخلية على مدى ثمانية أشهر', 'محاكاة تفاوض على الموازنة مع المقرّ الرئيسي', 'اقتصاديات الموزّعين وقنوات البيع', 'خطة قُطرية لثلاث سنوات تُدافع عنها أمام لجنة']
      },
      audience: { en: 'General managers taking on a national market', ar: 'مديرون عامّون يتولّون مسؤولية سوق وطني' }
    },
    {
      id: 'c-managing-managers', school: 's-rifthighlands', subject: 'leadership', format: 'in-person',
      start: '2027-08-16', days: 4, price: 2900, langs: ['en'], rating: 4.5, reviews: 112, popularity: 66,
      title: { en: 'Managing Managers', ar: 'قيادة المديرين' },
      summary: {
        en: 'The job changes once the people reporting to you are managers themselves, and almost nobody is told how.',
        ar: 'تتبدّل طبيعة العمل حين يصبح من يرفعون إليك تقاريرهم مديرين بدورهم، وقلّما يُشرح لأحد كيف.'
      },
      highlights: {
        en: ['Delegating outcomes instead of tasks', 'Running a management meeting that ends in a decision', 'Calibrating performance ratings across four teams', 'Case clinics on a manager who is failing'],
        ar: ['تفويض النتائج بدل المهام', 'إدارة اجتماع إداري ينتهي بقرار', 'معايرة تقييمات الأداء بين أربعة فرق', 'ورش حالات حول مدير متعثّر في أدائه']
      },
      audience: { en: 'Directors leading teams of managers', ar: 'مديرون يقودون فرقًا من المديرين' }
    },
    {
      id: 'c-executive-presence', school: 's-almanara', subject: 'leadership', format: 'in-person',
      start: '2026-12-07', days: 2, price: 2400, langs: ['ar', 'en'], rating: 4.6, reviews: 143, popularity: 74,
      title: { en: 'Executive Presence for Senior Leaders', ar: 'الحضور القيادي للقيادات العليا' },
      summary: {
        en: 'Two days of being filmed, questioned and interrupted, until you hold the room without raising your voice.',
        ar: 'يومان من التصوير والأسئلة والمقاطعة، حتى تُمسك بزمام القاعة دون أن ترفع صوتك.'
      },
      highlights: {
        en: ['A filmed board update delivered under interruption', 'Hostile question drills with a media coach', 'Voice, pace and stillness work', 'A one-page personal presence brief to take away'],
        ar: ['عرض مصوّر أمام المجلس يُقدَّم وسط مقاطعات متعمّدة', 'تدريبات على الأسئلة العدائية مع مدرّب إعلامي', 'تمارين على الصوت والإيقاع وثبات الحضور', 'ملخّص شخصي من صفحة واحدة عن حضورك القيادي']
      },
      audience: {
        en: 'Executives who present to boards and regulators',
        ar: 'تنفيذيون يقدّمون عروضًا أمام المجالس والجهات الرقابية'
      }
    },
    {
      id: 'c-turnaround-leadership', school: 's-serraverde', subject: 'leadership', format: 'in-person',
      start: '2027-04-12', days: 5, price: 8900, langs: ['en'], rating: 4.7, reviews: 76, popularity: 69,
      title: { en: 'Turnaround Leadership', ar: 'قيادة التحوّل في الشركات المتعثّرة' },
      summary: {
        en: 'Cash first, then people, then strategy — the order matters when the business is losing money every week.',
        ar: 'النقد أولًا، ثم الفريق، ثم الاستراتيجية — والترتيب حاسم حين تخسر الشركة مالًا كل أسبوع.'
      },
      highlights: {
        en: ['A thirteen-week cash flow built from source data', 'Standstill negotiations with lenders and suppliers', 'Rebuilding a leadership team in week one', 'A hundred-day plan reviewed by working turnaround directors'],
        ar: ['بناء تدفّق نقدي لثلاثة عشر أسبوعًا من البيانات الأصلية', 'التفاوض على تجميد المطالبات مع المصارف والموردين', 'إعادة تشكيل فريق القيادة في الأسبوع الأول', 'خطة لمئة يوم يراجعها مديرون يمارسون إعادة الهيكلة']
      },
      audience: { en: 'Executives taking over an underperforming business', ar: 'تنفيذيون يتولّون إدارة نشاط متعثّر' }
    },
    {
      id: 'c-leadership-local-government', school: 's-almultaqa', subject: 'leadership', format: 'in-person',
      start: '2027-02-15', days: 6, price: 3600, langs: ['ar'], rating: 4.4, reviews: 48, popularity: 55,
      title: { en: 'Leadership in Local Government', ar: 'القيادة في الإدارة المحلية' },
      summary: {
        en: 'Municipal leadership where the budget is fixed, the mandate is contested and residents see every failure.',
        ar: 'قيادة العمل البلدي حيث الموازنة ثابتة والصلاحيات متنازع عليها وكل إخفاق في التنفيذ ظاهر أمام السكان جميعًا.'
      },
      highlights: {
        en: ['Capital versus recurrent budget trade-offs', 'Service-level agreements with contractors', 'Practice sessions on council and community consultation', 'A redesign of one service in your own municipality'],
        ar: ['المفاضلة بين الموازنة الرأسمالية والموازنة الجارية', 'اتفاقيات مستوى الخدمة مع المقاولين', 'جلسات تدريبية على مشاورات المجلس البلدي والمجتمع المحلي', 'إعادة تصميم خدمة واحدة في بلديتك']
      },
      audience: {
        en: 'Mayors, municipal directors and heads of service',
        ar: 'رؤساء البلديات ومديروها ومديرو الخدمات البلدية'
      }
    },
    {
      id: 'c-executive-team-effectiveness', school: 's-kauriridge', subject: 'leadership', format: 'in-person',
      start: '2026-09-23', days: 3, price: 4800, langs: ['en'], rating: 4.5, reviews: 57, popularity: 58,
      title: { en: 'Making the Executive Team Work', ar: 'فاعلية فريق الإدارة العليا' },
      summary: {
        en: 'Most executive teams are really a set of one-to-one relationships with the chief executive; this is about the other conversations.',
        ar: 'معظم فرق الإدارة العليا ليست في حقيقتها سوى علاقات ثنائية مع الرئيس التنفيذي، وهذا البرنامج عن بقية الحوارات.'
      },
      highlights: {
        en: ['Mapping who actually decides what', 'Facilitated rehearsal of a live disagreement', 'Rewriting the executive meeting agenda', 'A team charter signed before you leave'],
        ar: ['رسم خريطة لمن يتخذ أيّ قرار فعليًا', 'تمرين موجَّه على خلاف قائم بين أعضاء الفريق', 'إعادة صياغة جدول أعمال اجتماع الإدارة', 'ميثاق عمل للفريق يُوقَّع قبل المغادرة']
      },
      audience: {
        en: 'Chief executives attending with their leadership team',
        ar: 'رؤساء تنفيذيون يحضرون برفقة فريق قيادتهم'
      }
    },
    {
      id: 'c-expert-to-leader', school: 's-lakeshore', subject: 'leadership', format: 'online',
      start: '2026-12-01', days: 6, price: 2100, langs: ['en'], rating: 4.4, reviews: 386, popularity: 81,
      title: { en: 'From Expert to Leader', ar: 'من متخصّص إلى قائد' },
      summary: {
        en: 'The promotion that takes away the work you were good at and hands you people instead.',
        ar: 'ترقية تسلبك العمل الذي أتقنته وتضع مكانه مسؤولية أشخاص.'
      },
      highlights: {
        en: ['Letting go of the technical work you still do best', 'Feedback practice in small breakout groups', "Estimating and defending your team's capacity", 'Six weekly live clinics with a coach'],
        ar: ['التخلّي عن العمل الفني الذي ما زلت أفضل من يؤدّيه', 'تدريب على التغذية الراجعة في مجموعات صغيرة', 'تقدير طاقة فريقك والدفاع عنها أمام الإدارة', 'ستّ جلسات مباشرة أسبوعية مع مدرّب']
      },
      audience: {
        en: 'Engineers, analysts and specialists newly in charge',
        ar: 'مهندسون ومحلّلون ومتخصّصون تولّوا القيادة حديثًا'
      }
    },
    {
      id: 'c-performance-conversation', school: 's-boughaz', subject: 'leadership', format: 'in-person',
      start: '2027-03-22', days: 2, price: 1500, langs: ['fr', 'ar'], rating: 4.5, reviews: 94, popularity: 60,
      title: { en: 'The Performance Conversation', ar: 'حوار الأداء' },
      summary: {
        en: 'Two days on the conversation managers postpone for months and then handle badly.',
        ar: 'يومان مخصّصان للحوار الذي يؤجّله المديرون شهورًا ثم يديرونه إدارة سيّئة.'
      },
      highlights: {
        en: ['Scripting the first two minutes', 'Role-play with trained actors', 'Documenting a case without building a file against someone', 'Follow-up at thirty and ninety days'],
        ar: ['صياغة الدقيقتين الأوليين من الحوار', 'تمثيل أدوار مع ممثّلين مدرَّبين', 'توثيق الحالة دون تحويلها إلى ملف اتهام', 'المتابعة بعد ثلاثين يومًا ثم بعد تسعين']
      },
      audience: { en: 'Line managers with direct reports', ar: 'مديرون مباشرون يشرفون على فرق عمل' }
    },
    {
      id: 'c-leading-teams-you-never-see', school: 's-riverbend', subject: 'leadership', format: 'online',
      start: '2027-07-06', days: 4, price: 1700, langs: ['en'], rating: 4.3, reviews: 241, popularity: 70,
      title: { en: 'Leading Teams You Never See', ar: 'قيادة فرق لا تراها' },
      summary: {
        en: 'Distributed teams fail on clarity and trust, not on tooling.',
        ar: 'تفشل الفرق الموزّعة بسبب غياب الوضوح والثقة، لا بسبب الأدوات.'
      },
      highlights: {
        en: ['Written decision records in place of meetings', 'Designing a handover across three time zones', 'Spotting disengagement at a distance', 'A team operating agreement drafted during the course'],
        ar: ['محاضر قرارات مكتوبة بدل الاجتماعات', 'تصميم تسليم للعمل عبر ثلاث مناطق زمنية', 'رصد فتور المشاركة عن بُعد', 'صياغة اتفاق عمل للفريق أثناء البرنامج']
      },
      audience: { en: 'Managers of remote and cross-border teams', ar: 'مديرو الفرق العاملة عن بُعد والعابرة للحدود' }
    },
    {
      id: 'c-leading-state-owned-enterprise', school: 's-voltaridge', subject: 'leadership', format: 'in-person',
      start: '2027-05-03', days: 5, price: 3800, langs: ['en', 'fr'], rating: 4.4, reviews: 39, popularity: 52,
      title: { en: 'Leading a State-Owned Enterprise', ar: 'قيادة المؤسسات المملوكة للدولة' },
      summary: {
        en: 'Commercial targets, a ministry for a shareholder, and a tariff you do not set.',
        ar: 'مستهدفات تجارية، ووزارة في موقع المساهم، وتعرفة لا تحدّدها أنت.'
      },
      highlights: {
        en: ['Performance contracts with the supervising ministry', 'Procurement conducted under public scrutiny', 'Board appointments and political turnover', 'A capital plan built to survive a change of government'],
        ar: ['عقود الأداء مع الوزارة المشرفة', 'إدارة المشتريات تحت أعين الرقابة العامة', 'تعيينات مجالس الإدارة وتقلّب المشهد السياسي', 'خطة استثمارية مصمّمة لتصمد أمام تغيّر الحكومات']
      },
      audience: {
        en: 'Executives and directors of public enterprises',
        ar: 'تنفيذيون وأعضاء مجالس إدارة في المؤسسات العامة'
      }
    },
    {
      id: 'c-first-pnl', school: 's-sundastrait', subject: 'leadership', format: 'in-person',
      start: '2026-12-14', days: 5, price: 4200, langs: ['en'], rating: 4.6, reviews: 118, popularity: 71,
      title: { en: 'Owning a P&L for the First Time', ar: 'تولّي مسؤولية الأرباح والخسائر لأول مرة' },
      summary: {
        en: 'Where the numbers on your P&L come from, and which of them you can actually move.',
        ar: 'من أين تأتي أرقام قائمة الأرباح والخسائر التي تتحمّل مسؤوليتها، وأيّها يمكنك التأثير فيه فعلًا.'
      },
      highlights: {
        en: ['Building a business-unit P&L from source data', 'Price, volume and mix decomposition', 'A monthly review run with a finance business partner', 'Defending a cost line under challenge'],
        ar: ['بناء قائمة أرباح وخسائر لوحدة أعمال من البيانات الأصلية', 'تفكيك الأثر بين السعر والحجم ومزيج المبيعات', 'مراجعة شهرية تُدار مع شريك أعمال مالي', 'الدفاع عن بند تكلفة أمام المساءلة']
      },
      audience: {
        en: 'Functional managers moving into general management',
        ar: 'مديرو الوظائف المنتقلون إلى الإدارة العامة'
      }
    },
    {
      id: 'c-chairing-the-board', school: 's-alpenblick', subject: 'leadership', format: 'in-person',
      start: '2027-02-01', days: 3, price: 7200, langs: ['en', 'de'], rating: 4.7, reviews: 44, popularity: 57,
      title: { en: 'Chairing the Board', ar: 'رئاسة مجلس الإدارة' },
      summary: {
        en: 'The chair sets the agenda, holds the chief executive to account and decides when a discussion is over.',
        ar: 'رئيس المجلس هو من يضع جدول الأعمال، ويُخضع الرئيس التنفيذي للمساءلة، ويقرّر متى ينتهي النقاش.'
      },
      highlights: {
        en: ['Chairing a filmed board discussion', 'Handling a dominant director and a silent one', 'The chief-executive succession conversation', 'A board evaluation run properly, start to finish'],
        ar: ['ترؤّس نقاش مصوّر لمجلس إدارة', 'التعامل مع عضو مهيمن وآخر صامت', 'حوار تعاقب الرئيس التنفيذي', 'إجراء تقييم لأداء المجلس على نحو سليم من أوله إلى آخره']
      },
      audience: { en: 'Board chairs and committee chairs', ar: 'رؤساء مجالس الإدارة ورؤساء اللجان المنبثقة عنها' }
    },
    {
      id: 'c-public-private-ventures', school: 's-almarsa', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 4, price: 6400, langs: ['ar', 'en'], rating: 4.5, reviews: 52, popularity: 62,
      title: { en: 'Leading Public-Private Ventures', ar: 'قيادة المشاريع المشتركة بين القطاعين العام والخاص' },
      summary: {
        en: 'You answer to a ministry and to a commercial partner who want different things from the same asset.',
        ar: 'أنت مسؤول أمام وزارة وأمام شريك تجاري، ولكلٍّ منهما مطلب مختلف من الأصل نفسه.'
      },
      highlights: {
        en: ['Shareholder agreements read line by line', 'Secondment and the problem of dual loyalty', 'Deadlock and exit mechanisms', 'A two-day joint-venture board simulation'],
        ar: ['قراءة اتفاقيات المساهمين بندًا بندًا', 'الإعارة الوظيفية وإشكال ازدواج الولاء', 'آليات فضّ الجمود والخروج من الشراكة', 'محاكاة لمجلس إدارة مشروع مشترك على مدى يومين']
      },
      audience: { en: 'Executives seconded into joint ventures', ar: 'تنفيذيون مُعارون إلى مشاريع مشتركة' }
    },
    {
      id: 'c-pricing-power-discount-discipline', school: 's-lakeshore', subject: 'marketing', format: 'blended',
      start: '2027-03-08', days: 5, price: 6800, langs: ['en'], rating: 4.7, reviews: 143, popularity: 74,
      title: { en: 'Pricing Power and Discount Discipline', ar: 'قوة التسعير وانضباط الخصومات' },
      summary: {
        en: 'Most price increases are given back at the desk of whoever approves the discount.',
        ar: 'معظم الزيادات السعرية تتبدّد على مكتب من يعتمد الخصومات.'
      },
      highlights: {
        en: ['Pocket-price waterfall built from your own invoices', 'Willingness-to-pay research methods', 'Discount approval and escalation rules', 'A rebuilt price list you take back with you'],
        ar: ['تحليل شلال السعر الصافي انطلاقًا من فواتيرك الفعلية', 'طرق قياس استعداد العميل للدفع', 'قواعد اعتماد الخصومات وتصعيدها', 'قائمة أسعار مُعاد بناؤها تعود بها معك']
      },
      audience: { en: 'Commercial and pricing directors', ar: 'مديرو الشؤون التجارية والتسعير' }
    },
    {
      id: 'c-customer-experience-redesign', school: 's-almanara', subject: 'marketing', format: 'in-person',
      start: '2026-12-06', days: 3, price: 4500, langs: ['ar', 'en'], rating: 4.5, reviews: 68, popularity: 63,
      title: { en: 'Customer Experience Redesign', ar: 'إعادة تصميم تجربة العميل' },
      summary: {
        en: 'Customers never meet your org chart; they meet the gaps between its boxes.',
        ar: 'لا يتعامل العميل مع هيكلك التنظيمي، بل مع الفجوات بين وحداته.'
      },
      highlights: {
        en: ['Journey mapping from call-centre recordings', 'Service recovery scripts tested in the room', 'Linking experience metrics to revenue', 'A mystery-shopping run in a Dubai mall'],
        ar: ['رسم رحلة العميل انطلاقًا من تسجيلات مركز الاتصال', 'اختبار نصوص معالجة الشكاوى داخل القاعة', 'ربط مؤشرات التجربة بالإيرادات', 'جولة تسوّق سرّي في أحد مراكز التسوّق بدبي']
      },
      audience: { en: 'Customer experience and service heads', ar: 'رؤساء تجربة العملاء والخدمة' }
    },
    {
      id: 'c-growth-marketing-arabic-consumers', school: 's-nile', subject: 'marketing', format: 'online',
      start: '2027-06-07', days: 5, price: 2200, langs: ['ar'], rating: 4.4, reviews: 187, popularity: 69,
      title: { en: 'Growth Marketing for Arabic-Speaking Consumers', ar: 'تسويق النمو في الأسواق الناطقة بالعربية' },
      summary: {
        en: 'Acquisition, retention and the cost of both, worked through on Egyptian and Levantine consumer data.',
        ar: 'الاستقطاب والاحتفاظ وتكلفتهما معًا، بتطبيق على بيانات مستهلكين من مصر وبلاد الشام.'
      },
      highlights: {
        en: ['Cost per acquisition calculated channel by channel', 'Arabic creative testing that beats translated copy', 'Retention cohorts and the triggers behind churn', 'A twelve-week acquisition plan for your own brand'],
        ar: ['احتساب تكلفة الاستقطاب لكل قناة على حدة', 'اختبار محتوى عربي أصيل يتفوّق على النصوص المترجمة', 'أفواج الاحتفاظ والمؤشرات التي تسبق التسرّب', 'خطة استقطاب لاثني عشر أسبوعًا لعلامتك أنت']
      },
      audience: { en: 'Digital marketing managers', ar: 'مديرو التسويق الرقمي' }
    },
    {
      id: 'c-marketing-analytics-spend-payback', school: 's-sahyadri', subject: 'marketing', format: 'blended',
      start: '2027-04-12', days: 4, price: 3800, langs: ['en'], rating: 4.5, reviews: 121, popularity: 66,
      title: { en: 'Marketing Analytics and Spend Payback', ar: 'تحليلات التسويق وعائد الإنفاق' },
      summary: {
        en: 'Which half of the budget is wasted is an answerable question, with caveats.',
        ar: 'السؤال عن النصف المهدور من موازنة التسويق سؤال قابل للإجابة، بشروط.'
      },
      highlights: {
        en: ['A marketing mix model built from scratch', 'Geo experiments and holdout design', 'Attribution methods and where each one lies', 'Defending a budget line to the CFO'],
        ar: ['بناء نموذج لمزيج التسويق من الصفر', 'تصميم التجارب الجغرافية ومجموعات الضبط', 'طرق عزو الأثر ومواطن تضليل كل منها', 'الدفاع عن بند في الموازنة أمام المدير المالي']
      },
      audience: { en: 'Marketing analysts and budget owners', ar: 'محلّلو التسويق وأصحاب الموازنات' }
    },
    {
      id: 'c-key-account-management-industrial', school: 's-kaiserplatz', subject: 'marketing', format: 'in-person',
      start: '2026-09-28', days: 4, price: 7200, langs: ['en', 'de'], rating: 4.6, reviews: 96, popularity: 64,
      title: { en: 'Key Account Management in Industrial Markets', ar: 'إدارة الحسابات الكبرى في الأسواق الصناعية' },
      summary: {
        en: 'Six customers are half the revenue, and losing one is not an ordinary bad quarter.',
        ar: 'ستة عملاء يمثّلون نصف الإيراد، وفقدان أحدهم ليس مجرّد ربع سيّئ.'
      },
      highlights: {
        en: ['Account plans written and reviewed by peers', 'Mapping technical, commercial and financial buyers', 'Value quantification for engineered products', 'A renewal negotiation rehearsed against a buying team'],
        ar: ['كتابة خطط الحسابات وعرضها على مراجعة الأقران', 'رسم خريطة المشترين التقنيين والتجاريين والماليين', 'تحديد القيمة كمّيًا للمنتجات الهندسية', 'تدريب تفاوضي على تجديد عقد أمام فريق شراء']
      },
      audience: { en: 'Key account and B2B sales managers', ar: 'مديرو الحسابات الكبرى والمبيعات بين الشركات' }
    },
    {
      id: 'c-brand-for-export-markets', school: 's-hanriver', subject: 'marketing', format: 'in-person',
      start: '2027-05-10', days: 5, price: 8600, langs: ['en'], rating: 4.6, reviews: 84, popularity: 62,
      title: { en: 'Building a Brand for Export Markets', ar: 'بناء علامة تجارية للأسواق التصديرية' },
      summary: {
        en: 'The name that works at home usually means nothing abroad, or something unfortunate.',
        ar: 'الاسم الذي ينجح محليًا لا يعني شيئًا في الخارج غالبًا، أو يعني ما لا تريده.'
      },
      highlights: {
        en: ['Naming and trademark screening across four markets', 'Distributor versus own-subsidiary economics', 'Packaging and claims under foreign labelling rules', 'Two consumer-electronics brand cases, start to finish'],
        ar: ['فحص الأسماء والعلامات التجارية في أربعة أسواق', 'اقتصاديات الموزّع مقابل الشركة التابعة', 'التغليف والادّعاءات وفق أنظمة التوسيم الأجنبية', 'حالتان لعلامتين في الإلكترونيات الاستهلاكية من البداية إلى النهاية']
      },
      audience: { en: 'Export and international marketing managers', ar: 'مديرو التصدير والتسويق الدولي' }
    },
    {
      id: 'c-route-to-market-fragmented', school: 's-lagoonpoint', subject: 'marketing', format: 'in-person',
      start: '2026-12-07', days: 4, price: 3200, langs: ['en'], rating: 4.4, reviews: 57, popularity: 58,
      title: { en: 'Route to Market in Fragmented Economies', ar: 'منافذ الوصول إلى السوق في الاقتصادات المجزّأة' },
      summary: {
        en: 'A million small shops, no shared data, and a truck that has to pay for itself.',
        ar: 'مليون متجر صغير، ولا بيانات مشتركة، وشاحنة عليها أن تغطّي تكلفتها بنفسها.'
      },
      highlights: {
        en: ['Distributor margin maths from factory gate to shelf', 'Two days riding delivery routes across Lagos', 'Trade credit and collection discipline', 'Coverage and drop-size targets you can actually set'],
        ar: ['حساب هوامش الموزّعين من باب المصنع إلى الرفّ', 'يومان في مرافقة خطوط التوزيع داخل لاغوس', 'الائتمان التجاري وانضباط التحصيل', 'مستهدفات واقعية للتغطية وحجم الطلبية']
      },
      audience: {
        en: 'Sales and distribution managers in consumer goods',
        ar: 'مديرو المبيعات والتوزيع في السلع الاستهلاكية'
      }
    },
    {
      id: 'c-ecommerce-merchandising', school: 's-sundastrait', subject: 'marketing', format: 'blended',
      start: '2027-07-12', days: 4, price: 3600, langs: ['en'], rating: 4.3, reviews: 112, popularity: 60,
      title: { en: 'E-commerce Merchandising and Conversion', ar: 'عرض المنتجات في التجارة الإلكترونية ومعدّل التحويل' },
      summary: {
        en: 'Traffic is the expensive part, and most of what is lost is lost after the click.',
        ar: 'الزيارات هي الجزء المكلف، وأغلب ما يُفقد يُفقد بعد النقرة.'
      },
      highlights: {
        en: ['Rebuilding one product page and testing it live', 'Marketplace ranking and review mechanics', 'Basket economics and free-delivery thresholds', 'Returns read as a merchandising signal'],
        ar: ['إعادة بناء صفحة منتج واختبارها على الموقع مباشرةً', 'آليات الترتيب والتقييمات داخل المنصّات', 'اقتصاديات سلة الشراء وحدود الشحن المجاني', 'قراءة المرتجعات كمؤشّر على اختيار المعروضات']
      },
      audience: { en: 'E-commerce and category managers', ar: 'مديرو التجارة الإلكترونية وفئات المنتجات' }
    },
    {
      id: 'c-public-affairs-communication', school: 's-voltaridge', subject: 'marketing', format: 'in-person',
      start: '2027-03-22', days: 2, price: 1900, langs: ['en', 'fr'], rating: 4.3, reviews: 39, popularity: 45,
      title: { en: 'Public Affairs and Community Communication', ar: 'الشؤون العامة والتواصل مع المجتمعات المحلية' },
      summary: {
        en: 'A licence to operate is renewed in community meetings, not in the capital.',
        ar: 'رخصة العمل تُجدَّد في اجتماعات الأهالي، لا في مكاتب العاصمة.'
      },
      highlights: {
        en: ['Stakeholder mapping for a mine or grid project', 'A community meeting run as a role-play', 'Drafting a briefing document for a regulator', 'Responding to rumour and misinformation'],
        ar: ['رسم خريطة أصحاب المصلحة لمشروع تعديني أو مشروع شبكة كهرباء', 'إدارة اجتماع مجتمعي عبر تمثيل الأدوار', 'صياغة مذكّرة إحاطة موجّهة لجهة رقابية', 'التعامل مع الشائعات والمعلومات المضلّلة']
      },
      audience: { en: 'Communications and external affairs managers', ar: 'مديرو الاتصال والعلاقات الخارجية' }
    },
    {
      id: 'c-trade-marketing-category', school: 's-altiplano', subject: 'marketing', format: 'in-person',
      start: '2027-08-09', days: 4, price: 4400, langs: ['es', 'en'], rating: 4.4, reviews: 74, popularity: 57,
      title: { en: 'Trade Marketing and Category Management', ar: 'التسويق التجاري وإدارة فئات المنتجات' },
      summary: {
        en: 'Shelf space is negotiated rather than earned, and the terms decide your margin.',
        ar: 'مساحة الرفّ يُتفاوض عليها ولا تُمنح، وشروط ذلك التفاوض هي التي تحدّد هامشك.'
      },
      highlights: {
        en: ['Planogram work using real store scan data', 'Trade-spend and listing-fee analysis', 'Evaluating a promotion after it has run', 'Store visits alongside a category buyer'],
        ar: ['العمل على مخطّطات الرفوف ببيانات مسح حقيقية من المتاجر', 'تحليل الإنفاق التجاري ورسوم إدراج المنتجات', 'تقييم عرض ترويجي بعد انتهائه', 'زيارات ميدانية للمتاجر بصحبة مسؤول شراء الفئة']
      },
      audience: { en: 'Trade marketing and retail account teams', ar: 'فرق التسويق التجاري وحسابات التجزئة' }
    },
    {
      id: 'c-selling-to-government-buyers', school: 's-almarsa', subject: 'marketing', format: 'in-person',
      start: '2026-11-16', days: 3, price: 6000, langs: ['ar', 'en'], rating: 4.5, reviews: 52, popularity: 61,
      title: { en: 'Selling to Government and Sovereign Buyers', ar: 'البيع للجهات الحكومية والمشترين السياديين' },
      summary: {
        en: 'Tender rules settle most of the outcome before anyone reads your proposal.',
        ar: 'قواعد المناقصة تحسم معظم النتيجة قبل أن يقرأ أحد عرضك.'
      },
      highlights: {
        en: ['Reading a tender document for the disqualifiers', 'Pre-qualification and consortium choices', 'Local content and offset requirements', 'A bid/no-bid decision argued out in teams'],
        ar: ['قراءة كرّاسة الشروط بحثًا عن أسباب الاستبعاد', 'التأهيل المسبق وخيارات التحالفات', 'متطلّبات المحتوى المحلي والتعويضات الصناعية', 'قرار المشاركة في المناقصة من عدمها يُناقَش ضمن فرق']
      },
      audience: { en: 'Bid, capture and public-sector sales leads', ar: 'قادة العطاءات والمبيعات للقطاع العام' }
    },
    {
      id: 'c-marketing-leadership-programme', school: 's-rivegauche', subject: 'marketing', format: 'blended',
      start: '2027-01-18', days: 12, price: 17400, langs: ['en', 'fr'], rating: 4.7, reviews: 118, popularity: 79,
      title: { en: 'The Marketing Leadership Programme', ar: 'برنامج قيادة التسويق' },
      summary: {
        en: 'For marketers who are now answerable for revenue rather than campaigns.',
        ar: 'لمسؤولي التسويق الذين صاروا مساءَلين عن الإيراد لا عن الحملات.'
      },
      highlights: {
        en: ['Three residential modules across five months', 'Rebuilding your marketing operating model', 'Agency and in-house cost benchmarking', 'A board paper written, then defended'],
        ar: ['ثلاث وحدات حضورية على مدى خمسة أشهر', 'إعادة بناء نموذج تشغيل التسويق في مؤسستك', 'مقارنة معيارية بين تكاليف الوكالات والفرق الداخلية', 'إعداد ورقة لمجلس الإدارة ثم الدفاع عنها']
      },
      audience: { en: 'Incoming chief marketing officers', ar: 'الرؤساء التنفيذيون للتسويق حديثو التعيين' }
    },
    {
      id: 'c-negotiating-renewals-price-increases', school: 's-lakeshore', subject: 'negotiation', format: 'in-person',
      start: '2026-10-13', days: 3, price: 4100, langs: ['en'], rating: 4.7, reviews: 164, popularity: 81,
      title: { en: 'Negotiating Renewals and Price Increases', ar: 'التفاوض على تجديد العقود ورفع الأسعار' },
      summary: {
        en: 'Most margin is lost at renewal, in a conversation nobody prepared for.',
        ar: 'تضيع معظم هوامش الربح عند التجديد، في محادثة لم يستعدّ لها أحد.'
      },
      highlights: {
        en: ['Recorded renewal calls with a line-by-line debrief', 'Concession ladders costed before the meeting starts', 'Prepared responses to the four tactics buyers use most', 'A price-increase letter you draft and test on the room'],
        ar: ['مكالمات تجديد مسجّلة مع تحليل تفصيلي لكل جولة', 'سلالم تنازلات مُسعَّرة قبل بدء الاجتماع', 'ردود معدّة مسبقًا لأكثر أربعة أساليب يستخدمها المشترون', 'رسالة رفع أسعار تكتبها وتختبرها أمام المجموعة']
      },
      audience: { en: 'Account directors and commercial managers', ar: 'مديرو الحسابات ومديرو الشؤون التجارية' }
    },
    {
      id: 'c-negotiating-with-sole-source-suppliers', school: 's-boughaz', subject: 'negotiation', format: 'in-person',
      start: '2027-03-08', days: 4, price: 4600, langs: ['fr', 'ar'], rating: 4.6, reviews: 88, popularity: 72,
      title: { en: 'Negotiating with Sole-Source Suppliers', ar: 'التفاوض مع المورّد الوحيد' },
      summary: {
        en: 'When there is only one supplier, leverage has to be built rather than found.',
        ar: 'حين لا يوجد سوى مورّد واحد، تُصنَع القوة التفاوضية ولا تُنتظر.'
      },
      highlights: {
        en: ['Should-cost teardown of a real supplier quotation', 'Building leverage from volume, timing, specification and exit', 'Contract clauses that price the risk you cannot remove', 'Two days of live bargaining against trained supplier roles'],
        ar: ['تفكيك عرض سعر مورّد لتقدير كلفته الحقيقية', 'بناء أوراق الضغط من الحجم والتوقيت والمواصفات وبدائل الخروج', 'بنود تعاقدية تُسعّر المخاطر التي يتعذّر إزالتها', 'يومان من المساومة الحيّة أمام ممثلين مدرّبين لأدوار المورّدين']
      },
      audience: { en: 'Category managers and procurement leads', ar: 'مديرو الفئات الشرائية ومسؤولو المشتريات' }
    },
    {
      id: 'c-negotiating-across-asian-markets', school: 's-hanriver', subject: 'negotiation', format: 'in-person',
      start: '2026-11-16', days: 4, price: 5400, langs: ['en'], rating: 4.7, reviews: 131, popularity: 78,
      title: { en: 'Negotiating Across Asian Markets', ar: 'التفاوض في الأسواق الآسيوية' },
      summary: {
        en: 'The contract gets signed in the meeting room; the deal is settled everywhere else.',
        ar: 'يُوقَّع العقد في قاعة الاجتماعات، أمّا الاتفاق فيُحسم خارجها.'
      },
      highlights: {
        en: ['Mapping who decides when nobody will say who decides', 'Negotiating through an interpreter without losing the thread', 'Term sheets that survive translation into two legal systems', 'Three supply and joint-venture role-plays with regional counterparts'],
        ar: ['تحديد صاحب القرار حين لا يُصرّح أحد بمن يقرّر', 'التفاوض عبر مترجم دون فقدان خيط الحديث', 'مذكّرات شروط تصمد عند نقلها إلى نظامين قانونيين مختلفين', 'ثلاث جلسات تمثيل أدوار مع نظراء من المنطقة حول التوريد والمشاريع المشتركة']
      },
      audience: {
        en: 'Regional directors and business development leads',
        ar: 'المديرون الإقليميون ومسؤولو تطوير الأعمال'
      }
    },
    {
      id: 'c-mediation-and-dispute-resolution', school: 's-rivegauche', subject: 'negotiation', format: 'in-person',
      start: '2027-05-17', days: 5, price: 7500, langs: ['en', 'fr'], rating: 4.8, reviews: 112, popularity: 74,
      title: { en: 'Mediation and Commercial Dispute Resolution', ar: 'الوساطة وتسوية المنازعات التجارية' },
      summary: {
        en: 'Nearly every commercial dispute settles in the end; the question is what it costs to get there.',
        ar: 'تنتهي معظم المنازعات التجارية بالتسوية، والسؤال هو كم يكلّف الوصول إليها.'
      },
      highlights: {
        en: ['Sitting as mediator in four staged disputes', 'Costing the litigation alternative before you enter the room', 'Drafting a settlement agreement that holds', 'Escalation clauses and multi-tier dispute procedures'],
        ar: ['الجلوس بصفة وسيط في أربع قضايا نزاع معدّة للتدريب', 'تقدير كلفة اللجوء إلى القضاء قبل دخول قاعة التفاوض', 'صياغة اتفاق تسوية قابل للنفاذ', 'شروط التصعيد وإجراءات فضّ النزاع متعدّدة المراحل']
      },
      audience: {
        en: 'In-house counsel and commercial directors',
        ar: 'المستشارون القانونيون الداخليون والمديرون التجاريون'
      }
    },
    {
      id: 'c-influencing-without-authority', school: 's-riverbend', subject: 'negotiation', format: 'online',
      start: '2026-12-07', days: 5, price: 2200, langs: ['en'], rating: 4.5, reviews: 287, popularity: 80,
      title: { en: 'Influencing Without Authority', ar: 'التأثير من دون سلطة' },
      summary: {
        en: 'You own the outcome and none of the people; this is how the work gets done anyway.',
        ar: 'أنت مسؤول عن النتيجة ولا تملك سلطة على أحد ممّن ينفّذونها، وهنا تتعلّم كيف يُنجَز العمل رغم ذلك.'
      },
      highlights: {
        en: ['A written influence map of your own stalled initiative', 'Building coalitions before the decision meeting, not inside it', 'Reciprocity and the currencies people actually trade in', 'Live practice in saying no to someone senior to you'],
        ar: ['خريطة تأثير مكتوبة لمبادرة متعثّرة من واقع عملك', 'بناء التحالفات قبل اجتماع القرار لا داخله', 'المعاملة بالمثل والعملات التي يتبادلها الناس فعلًا', 'تدريب عملي على رفض طلب صادر عمّن هم أعلى منك']
      },
      audience: { en: 'Project, product and functional managers', ar: 'مديرو المشاريع والمنتجات والوظائف المساندة' }
    },
    {
      id: 'c-stakeholder-negotiation-programmes', school: 's-thuraya', subject: 'negotiation', format: 'in-person',
      start: '2027-04-11', days: 6, price: 8400, langs: ['ar'], rating: 4.6, reviews: 69, popularity: 76,
      title: { en: 'Stakeholder Negotiation on Major Programmes', ar: 'التفاوض مع أصحاب المصلحة في البرامج الكبرى' },
      summary: {
        en: 'A programme with forty stakeholders has forty ways to stop, and most of them are negotiable.',
        ar: 'البرنامج الذي يضمّ أربعين جهة من أصحاب المصلحة فيه أربعون سببًا للتوقّف، ومعظمها قابل للتفاوض.'
      },
      highlights: {
        en: ['Interest and power mapping for a live programme of your own', 'Negotiating scope changes with a sponsor who cannot move the deadline', 'A four-round bargaining simulation between government entities', 'A written escalation protocol you take back to the programme office'],
        ar: ['رسم خريطة المصالح والنفوذ لبرنامج قائم تعمل عليه', 'التفاوض على تغييرات النطاق مع راعٍ لا يستطيع تأجيل الموعد النهائي', 'محاكاة تفاوضية على أربع جولات بين جهات حكومية', 'بروتوكول تصعيد مكتوب تعود به إلى مكتب إدارة البرنامج']
      },
      audience: { en: 'Programme directors and delivery office leads', ar: 'مديرو البرامج وقادة مكاتب المتابعة والتنفيذ' }
    },
    {
      id: 'c-negotiating-public-contracts', school: 's-voltaridge', subject: 'negotiation', format: 'in-person',
      start: '2027-06-14', days: 4, price: 3800, langs: ['en'], rating: 4.5, reviews: 54, popularity: 66,
      title: { en: 'Negotiating Public Contracts', ar: 'التفاوض على العقود الحكومية' },
      summary: {
        en: 'Sitting opposite a contractor with better lawyers, on a fixed budget and a published rule book.',
        ar: 'أن تجلس أمام مقاول يفوقك في الخبرة القانونية، بموازنة ثابتة وأنظمة مشتريات منشورة للجميع.'
      },
      highlights: {
        en: ['Negotiating inside procurement rules without breaching them', 'Bargaining a road concession and a power purchase agreement', 'Variation claims: pricing them before the contractor does', 'Documenting the file so the audit does not reopen the deal'],
        ar: ['التفاوض ضمن أنظمة المشتريات دون مخالفتها', 'مساومة على عقد امتياز طريق واتفاقية شراء طاقة', 'مطالبات التغيير: تسعيرها قبل أن يسعّرها المقاول', 'توثيق الملفّ بحيث لا تُعيد المراجعة فتح الاتفاق']
      },
      audience: { en: 'Public procurement officials and contract managers', ar: 'مسؤولو المشتريات الحكومية ومديرو العقود' }
    },
    {
      id: 'c-negotiating-joint-ventures', school: 's-almarsa', subject: 'negotiation', format: 'in-person',
      start: '2026-12-13', days: 5, price: 9000, langs: ['ar', 'en'], rating: 4.7, reviews: 61, popularity: 75,
      title: {
        en: 'Negotiating Joint Ventures and Partnership Agreements',
        ar: 'التفاوض على المشاريع المشتركة واتفاقيات الشراكة'
      },
      summary: {
        en: 'Joint ventures fail on terms agreed in the first week and discovered in the fourth year.',
        ar: 'تفشل المشاريع المشتركة بسبب بنود يُتَّفق عليها في الأسبوع الأول وتُكتشَف في السنة الرابعة.'
      },
      highlights: {
        en: ['Deadlock, exit and drag-along clauses drafted line by line', 'Trading governance rights against capital contribution', "A four-round shareholders' agreement simulation", 'Technology transfer and local-content terms'],
        ar: ['صياغة بنود الجمود والخروج والبيع الإجباري بندًا بندًا', 'المفاضلة بين حقوق الحوكمة وحصص المساهمة في رأس المال', 'محاكاة لاتفاقية مساهمين على أربع جولات', 'شروط نقل التقنية والمحتوى المحلي']
      },
      audience: {
        en: 'Corporate development and legal leads on partnership deals',
        ar: 'قادة تطوير الأعمال والشؤون القانونية المعنيّون بصفقات الشراكة'
      }
    },
    {
      id: 'c-negotiating-with-regulators', school: 's-lantau', subject: 'negotiation', format: 'blended',
      start: '2027-02-22', days: 4, price: 5600, langs: ['en'], rating: 4.6, reviews: 97, popularity: 71,
      title: { en: 'Negotiating with Regulators', ar: 'التفاوض مع الجهات الرقابية' },
      summary: {
        en: 'A regulator is a counterparty you cannot walk away from, which changes every move available to you.',
        ar: 'الجهة الرقابية طرف لا يمكنك الانسحاب من التفاوض معه، وهذا وحده يغيّر كل خيار متاح أمامك.'
      },
      highlights: {
        en: ['Preparing a supervisory meeting as a negotiation, not a briefing', 'Remediation timetables: what can be traded and what cannot', 'Handling an enforcement approach in the first 72 hours', 'Two mock supervisory sessions run from a written examiner brief'],
        ar: ['الاستعداد للاجتماع الرقابي بوصفه تفاوضًا لا مجرّد عرض تقديمي', 'جداول المعالجة: ما يقبل المساومة وما لا يقبلها', 'التعامل مع فتح إجراء تنفيذي خلال الساعات الاثنتين والسبعين الأولى', 'جلستا محاكاة رقابية تُدار وفق ملف مكتوب للجهة الفاحصة']
      },
      audience: {
        en: 'Compliance, legal and public policy heads',
        ar: 'رؤساء الامتثال والشؤون القانونية والسياسات العامة'
      }
    },
    {
      id: 'c-collective-bargaining', school: 's-serraverde', subject: 'negotiation', format: 'in-person',
      start: '2027-07-19', days: 3, price: 3600, langs: ['en', 'es'], rating: 4.4, reviews: 47, popularity: 62,
      title: { en: 'Collective Bargaining and Union Negotiation', ar: 'المفاوضة الجماعية والتفاوض مع النقابات' },
      summary: {
        en: 'The agreement lasts two years; the relationship with the people across the table lasts longer.',
        ar: 'الاتفاقية تدوم سنتين، أمّا العلاقة مع الجالسين على الطرف الآخر فتدوم أطول من ذلك.'
      },
      highlights: {
        en: ['Costing a wage claim precisely before the first session', 'A full bargaining round played to deadline, walkout included', 'Managing the gap between the table and the shop floor', 'Drafting the joint statement both sides can sign'],
        ar: ['تقدير كلفة مطلب الأجور بدقّة قبل الجلسة الأولى', 'جولة تفاوض كاملة حتى الموعد النهائي، بما فيها الانسحاب من الطاولة', 'إدارة الفجوة بين طاولة التفاوض وأرض المصنع', 'صياغة البيان المشترك الذي يمكن للطرفين توقيعه']
      },
      audience: {
        en: 'HR and plant leaders at unionised sites',
        ar: 'قادة الموارد البشرية والمصانع في المواقع ذات التمثيل النقابي'
      }
    },
    {
      id: 'c-negotiating-access-high-risk', school: 's-almultaqa', subject: 'negotiation', format: 'in-person',
      start: '2027-03-21', days: 5, price: 4900, langs: ['ar', 'en'], rating: 4.8, reviews: 38, popularity: 68,
      title: { en: 'Negotiating Access in High-Risk Settings', ar: 'التفاوض على الوصول في البيئات عالية الخطورة' },
      summary: {
        en: 'Negotiating passage for a convoy with people who have no reason to grant it and no contract to honour.',
        ar: 'التفاوض على مرور قافلة مع أطراف لا مصلحة لهم في السماح بها ولا عقد يلزمهم به.'
      },
      highlights: {
        en: ['Checkpoint and access negotiations run under time pressure', 'Setting and holding red lines the organisation agreed in advance', 'Debriefing on the record a negotiation that went badly', 'Duty of care and the decision to withdraw'],
        ar: ['مفاوضات عبور ووصول تُدار تحت ضغط الوقت', 'تحديد الخطوط الحمراء التي أقرّتها المنظّمة سلفًا والتمسّك بها', 'مراجعة موثّقة لمفاوضات انتهت إلى نتيجة سيّئة', 'واجب الرعاية وقرار سحب الفريق']
      },
      audience: { en: 'Country directors and field security leads', ar: 'مديرو المكاتب القُطرية ومسؤولو الأمن الميداني' }
    },
    {
      id: 'c-the-complex-deal', school: 's-northgate', subject: 'negotiation', format: 'blended',
      start: '2027-01-18', days: 14, price: 19600, langs: ['en'], rating: 4.9, reviews: 143, popularity: 89,
      title: { en: 'The Complex Deal: Multi-Party Negotiation', ar: 'الصفقات المركّبة: التفاوض متعدّد الأطراف' },
      summary: {
        en: 'Three modules on the deals where there is no single counterparty and no single deadline.',
        ar: 'ثلاث وحدات دراسية تتناول الصفقات التي لا يوجد فيها طرف مقابل واحد ولا موعد نهائي واحد.'
      },
      highlights: {
        en: ['Coalition building and blocking minorities, played over six rounds', 'Sequencing: which party you settle with first, and why', 'A transaction you are running now, taken apart by the cohort', 'Agents, advisers and the principal who is not in the room'],
        ar: ['بناء التحالفات والأقلّيات المعطِّلة عبر ستّ جولات', 'ترتيب الأولويات: مع أيّ طرف تُبرم الاتفاق أولًا ولماذا', 'صفقة تديرها الآن تُفكَّك أمام المجموعة', 'الوكلاء والمستشارون والأصيل الغائب عن الطاولة']
      },
      audience: { en: 'Senior dealmakers and heads of commercial', ar: 'كبار مسؤولي الصفقات ورؤساء القطاعات التجارية' }
    },
    {
      id: 'c-running-an-agricultural-value-chain', school: 's-rifthighlands', subject: 'operations', format: 'blended',
      start: '2026-09-28', days: 8, price: 5200, langs: ['en'], rating: 4.4, reviews: 58, popularity: 50,
      title: { en: 'Running an Agricultural Value Chain', ar: 'إدارة سلسلة قيمة زراعية' },
      summary: {
        en: "Aggregating from thousands of smallholders and still meeting one buyer's specification.",
        ar: 'التجميع من آلاف صغار المزارعين مع الالتزام بمواصفة مشترٍ واحد.'
      },
      highlights: {
        en: ['Aggregation models and outgrower schemes', 'Grading, traceability and rejection rates', 'Working capital tied up between harvest and payment', 'Two visits to collection centres outside Nairobi'],
        ar: ['نماذج التجميع وبرامج المزارعين المتعاقدين', 'الفرز والتتبّع ونِسَب الرفض', 'رأس المال العامل المحتجز بين الحصاد والسداد', 'زيارتان ميدانيتان لمراكز تجميع خارج نيروبي']
      },
      audience: {
        en: 'Sourcing and operations managers in agri-processing',
        ar: 'مديرو التوريد والعمليات في الصناعات الزراعية'
      }
    },
    {
      id: 'c-multi-island-distribution', school: 's-sundastrait', subject: 'operations', format: 'in-person',
      start: '2026-11-09', days: 3, price: 2700, langs: ['en'], rating: 4.2, reviews: 46, popularity: 42,
      title: { en: 'Multi-Island Distribution and Freight', ar: 'التوزيع والشحن عبر الجزر' },
      summary: {
        en: 'Sea freight, small ports and a delivery promise you still have to keep.',
        ar: 'شحن بحري وموانئ صغيرة ووعد تسليم يظلّ عليك الوفاء به.'
      },
      highlights: {
        en: ['Modal choice between sea, road and air freight', 'Port call scheduling and shipment consolidation', 'Regional stock buffers sized against sailing frequency', 'Third-party logistics contracts and service levels'],
        ar: ['اختيار وسيلة النقل بين البحر والبرّ والجو', 'جدولة مرور السفن وتجميع الشحنات', 'تحديد حجم المخزون الإقليمي وفق تواتر الرحلات البحرية', 'عقود مزوّدي الخدمات اللوجستية ومستويات الخدمة']
      },
      audience: {
        en: 'Logistics and distribution leads in consumer goods',
        ar: 'مسؤولو اللوجستيات والتوزيع في شركات السلع الاستهلاكية'
      }
    },
    {
      id: 'c-capacity-decisions-cross-border', school: 's-altiplano', subject: 'operations', format: 'in-person',
      start: '2026-12-01', days: 4, price: 4400, langs: ['es', 'en'], rating: 4.4, reviews: 61, popularity: 52,
      title: {
        en: 'Capacity Decisions for Cross-Border Plants',
        ar: 'قرارات الطاقة الإنتاجية في المصانع العابرة للحدود'
      },
      summary: {
        en: 'When to add a shift, when to add a line, and when to add a plant on the other side of the border.',
        ar: 'متى تضيف وردية، ومتى تضيف خطّ إنتاج، ومتى تفتح مصنعًا على الجانب الآخر من الحدود.'
      },
      highlights: {
        en: ['Bottleneck analysis on a plant walk', 'Shift patterns costed against overtime and attrition', 'Customs, transit time and inventory held at the border', 'A capacity case defended to a mock investment committee'],
        ar: ['تحليل الاختناقات خلال جولة داخل مصنع', 'تكلفة أنماط الورديات مقارنةً بالعمل الإضافي ودوران العمالة', 'الجمارك وزمن العبور والمخزون المحتجز عند الحدود', 'الدفاع عن دراسة توسعة أمام لجنة استثمار صورية']
      },
      audience: { en: 'Plant managers and industrial engineers', ar: 'مديرو المصانع ومهندسو الإنتاج' }
    },
    {
      id: 'c-building-a-zero-defect-line', school: 's-hanriver', subject: 'operations', format: 'in-person',
      start: '2026-12-07', days: 5, price: 8500, langs: ['en'], rating: 4.7, reviews: 96, popularity: 71,
      title: { en: 'Building a Zero-Defect Line', ar: 'بناء خطّ إنتاج بلا عيوب' },
      summary: {
        en: 'Chasing defects back to the process that made them, not the operator who passed them.',
        ar: 'تتبّع العيوب حتى العملية التي أنتجتها، لا حتى العامل الذي مرّرها.'
      },
      highlights: {
        en: ['Statistical process control on live line data', 'Root-cause practice with the eight-discipline method', 'Two supplier audits on an electronics campus', 'A control plan written for one of your own processes'],
        ar: ['الضبط الإحصائي للعمليات على بيانات خطّ إنتاج حيّ', 'تدريب على تحليل الأسباب الجذرية بمنهجية 8D', 'تدقيقان ميدانيان لدى مورّدَين في مجمّع إلكترونيات', 'إعداد خطة تحكّم لإحدى عملياتك']
      },
      audience: { en: 'Quality and production managers', ar: 'مديرو الجودة والإنتاج' }
    },
    {
      id: 'c-humanitarian-supply-operations', school: 's-almultaqa', subject: 'operations', format: 'in-person',
      start: '2027-02-08', days: 5, price: 3100, langs: ['ar'], rating: 4.6, reviews: 43, popularity: 45,
      title: { en: 'Humanitarian Supply Operations', ar: 'إدارة سلاسل الإمداد الإنسانية' },
      summary: {
        en: 'Moving relief goods when the route, the currency and the border all change weekly.',
        ar: 'إيصال مواد الإغاثة حين يتغيّر المسار والعملة والمعبر أسبوعيًا.'
      },
      highlights: {
        en: ['Pre-positioning and rotation of emergency stock', 'Procurement under donor rules and audit', 'A three-day surge simulation with shifting access', 'Fleet and fuel management in field operations'],
        ar: ['التخزين المسبق ودوران مخزون الطوارئ', 'الشراء وفق شروط المانحين ومتطلبات التدقيق', 'محاكاة استجابة طارئة على مدى ثلاثة أيام مع تغيّر إمكانية الوصول', 'إدارة الأسطول والوقود في العمليات الميدانية']
      },
      audience: {
        en: 'Logistics and programme staff in relief agencies',
        ar: 'كوادر اللوجستيات والبرامج في منظمات الإغاثة'
      }
    },
    {
      id: 'c-industrial-operations-leadership', school: 's-kaiserplatz', subject: 'operations', format: 'blended',
      start: '2027-03-01', days: 16, price: 19200, langs: ['en', 'de'], rating: 4.7, reviews: 58, popularity: 69,
      title: { en: 'Industrial Operations Leadership Programme', ar: 'برنامج قيادة العمليات الصناعية' },
      summary: {
        en: 'Four modules over six months, each one ending with a change made back at your own site.',
        ar: 'أربع وحدات على مدى ستة أشهر، تنتهي كل وحدة بتغيير مطبَّق فعليًا في موقعك.'
      },
      highlights: {
        en: ['Module one: flow, inventory and cycle time', 'Module two: procurement and supplier development', 'Module three: shop-floor systems and data', 'A measured improvement project defended at the final module'],
        ar: ['الوحدة الأولى: التدفّق والمخزون وزمن الدورة', 'الوحدة الثانية: المشتريات وتطوير المورّدين', 'الوحدة الثالثة: أنظمة صالة الإنتاج وبياناتها', 'مشروع تحسين مقيس يُدافَع عنه في الوحدة الختامية']
      },
      audience: { en: 'Heads of operations in industrial firms', ar: 'رؤساء العمليات في الشركات الصناعية' }
    },
    {
      id: 'c-cold-chain-agri-exports', school: 's-boughaz', subject: 'operations', format: 'in-person',
      start: '2027-03-22', days: 4, price: 4000, langs: ['fr', 'ar'], rating: 4.4, reviews: 52, popularity: 48,
      title: { en: 'Cold Chain Logistics for Agri-Exporters', ar: 'لوجستيات سلسلة التبريد لمصدّري المنتجات الزراعية' },
      summary: {
        en: 'Most of the loss happens in the two hours nobody is measuring.',
        ar: 'معظم الفاقد يقع في الساعتين اللتين لا يقيسهما أحد.'
      },
      highlights: {
        en: ['Temperature mapping across a full export lane', 'Packing house and refrigerated depot visit', 'Claims, incoterms and who carries the spoilage', 'A loss model built for one of your own product lines'],
        ar: ['رسم خريطة حرارية لمسار تصدير كامل', 'زيارة ميدانية لمحطة تعبئة ومستودع مبرّد', 'المطالبات وشروط التسليم الدولية (إنكوترمز) ومن يتحمّل تلف البضاعة', 'بناء نموذج لحساب الفاقد في أحد خطوط منتجاتك']
      },
      audience: {
        en: 'Export, logistics and quality managers in agribusiness',
        ar: 'مديرو التصدير واللوجستيات والجودة في قطاع الأعمال الزراعية'
      }
    },
    {
      id: 'c-recovering-a-late-project', school: 's-almarsa', subject: 'operations', format: 'in-person',
      start: '2027-04-19', days: 2, price: 3400, langs: ['ar', 'en'], rating: 4.5, reviews: 39, popularity: 54,
      title: { en: 'Recovering a Late Project', ar: 'إنقاذ مشروع متأخّر' },
      summary: {
        en: 'Two days on the projects that are already nine months behind.',
        ar: 'يومان مخصّصان للمشاريع المتأخّرة أصلًا تسعة أشهر.'
      },
      highlights: {
        en: ['Schedule forensics: finding the real critical path', 'Re-baselining without weakening your contract position', 'A recovery plan drafted against a live case', 'The conversation with the sponsor, rehearsed'],
        ar: ['تحليل الجدول الزمني لاستخراج المسار الحرج الفعلي', 'إعادة ضبط خط الأساس دون إضعاف موقفك التعاقدي', 'صياغة خطة إنقاذ على حالة قائمة', 'تدريب عملي على الحديث مع الجهة الراعية']
      },
      audience: { en: 'Project and work-package managers', ar: 'مديرو المشاريع وحزم الأعمال' }
    },
    {
      id: 'c-demand-planning-and-sop', school: 's-lakeshore', subject: 'operations', format: 'blended',
      start: '2027-05-10', days: 5, price: 5400, langs: ['en'], rating: 4.5, reviews: 132, popularity: 66,
      title: {
        en: 'Demand Planning and Sales & Operations Planning',
        ar: 'تخطيط الطلب والتخطيط المشترك للمبيعات والعمليات'
      },
      summary: {
        en: 'One forecast that the commercial side and the factory side both have to sign.',
        ar: 'توقّع واحد للطلب يوقّع عليه جانب المبيعات وجانب التصنيع معًا.'
      },
      highlights: {
        en: ['Forecast error decomposed on your own data', 'A monthly planning cycle built session by session', 'Rough-cut capacity checks against the volume plan', 'Reconciling the operating plan with the budget'],
        ar: ['تفكيك خطأ التنبؤ على بيانات مؤسستك', 'بناء دورة تخطيط شهرية جلسةً بعد جلسة', 'فحص أوّلي للطاقة الإنتاجية مقابل خطة الأحجام', 'مطابقة الخطة التشغيلية مع الموازنة']
      },
      audience: { en: 'Demand planners and supply chain managers', ar: 'مخطّطو الطلب ومديرو سلاسل الإمداد' }
    },
    {
      id: 'c-designing-a-distribution-network', school: 's-sahyadri', subject: 'operations', format: 'blended',
      start: '2027-06-14', days: 4, price: 3600, langs: ['en'], rating: 4.3, reviews: 84, popularity: 55,
      title: { en: 'Designing a Distribution Network', ar: 'تصميم شبكة التوزيع' },
      summary: {
        en: 'Where to put the warehouses when half your customers order in units of one.',
        ar: 'أين تضع المستودعات حين يطلب نصف عملائك قطعة واحدة في المرّة.'
      },
      highlights: {
        en: ['Centre-of-gravity and cost-to-serve modelling', 'Serving hundreds of thousands of small retail outlets', 'Owned fleet against contracted transport economics', 'A redesign proposal for your current footprint'],
        ar: ['نمذجة مركز الثقل وتكلفة خدمة العميل', 'خدمة مئات الآلاف من منافذ التجزئة الصغيرة', 'اقتصاديات الأسطول المملوك مقابل النقل المتعاقد عليه', 'مقترح لإعادة تصميم شبكتك الحالية']
      },
      audience: { en: 'Supply chain and distribution managers', ar: 'مديرو سلاسل الإمداد والتوزيع' }
    },
    {
      id: 'c-service-operations-queue-design', school: 's-riverbend', subject: 'operations', format: 'online',
      start: '2027-07-19', days: 3, price: 1350, langs: ['en'], rating: 4.4, reviews: 214, popularity: 62,
      title: { en: 'Service Operations and Queue Design', ar: 'عمليات الخدمة وتصميم مسارات الانتظار' },
      summary: {
        en: 'Waiting time is designed, whether or not anyone designed it.',
        ar: 'زمن الانتظار نتيجة تصميم، سواء تعمّده أحد أم لا.'
      },
      highlights: {
        en: ["Little's Law applied to a real backlog", 'Staffing against a variable arrival curve', 'Where to add capacity and where to remove steps', 'Redesign of one process you bring with you'],
        ar: ['تطبيق قانون ليتل على قائمة أعمال متراكمة حقيقية', 'جدولة الكوادر وفق منحنى وصول متغيّر', 'أين تضيف طاقة استيعابية وأين تحذف خطوات', 'إعادة تصميم عملية واحدة تأتي بها معك']
      },
      audience: {
        en: 'Contact centre, branch and service delivery managers',
        ar: 'مديرو مراكز الاتصال والفروع وتقديم الخدمة'
      }
    },
    {
      id: 'c-maintenance-and-asset-reliability', school: 's-voltaridge', subject: 'operations', format: 'in-person',
      start: '2027-08-16', days: 4, price: 3200, langs: ['en'], rating: 4.3, reviews: 37, popularity: 44,
      title: { en: 'Maintenance and Asset Reliability', ar: 'الصيانة وموثوقية الأصول' },
      summary: {
        en: 'A plant that keeps running is worth more than a plant that is repaired quickly.',
        ar: 'المصنع الذي لا يتوقّف أثمن من المصنع الذي يُصلَح بسرعة.'
      },
      highlights: {
        en: ['Criticality ranking across an asset register', 'Reliability-centred maintenance on mining equipment', 'Spare parts holdings costed against downtime', 'A shutdown plan built and challenged in teams'],
        ar: ['تصنيف الأصول في السجلّ حسب أهميتها الحرجة', 'الصيانة المرتكزة على الموثوقية لمعدّات التعدين', 'تكلفة مخزون قطع الغيار مقابل تكلفة التوقّف', 'إعداد خطة توقّف مجدول ومناقشتها ضمن فرق عمل']
      },
      audience: { en: 'Maintenance and operations engineers', ar: 'مهندسو الصيانة والعمليات' }
    },
    {
      id: 'c-people-integration-after-the-deal', school: 's-northgate', subject: 'people', format: 'in-person',
      start: '2026-09-28', days: 3, price: 5400, langs: ['en'], rating: 4.6, reviews: 84, popularity: 64,
      title: { en: 'People Integration After the Deal', ar: 'دمج الفرق بعد إتمام الصفقة' },
      summary: {
        en: 'Whether the acquired leadership team stays is decided in the first fortnight.',
        ar: 'بقاء فريق قيادة الشركة المستحوَذ عليها من عدمه يُحسم في الأسبوعين الأوّلين.'
      },
      highlights: {
        en: ['Mapping the two cultures before day one', 'Retention packages and who actually needs one', 'Selecting the combined leadership team', 'A hundred-day people plan for one live integration'],
        ar: ['رسم خريطة الثقافتين قبل اليوم الأول', 'حزم الاحتفاظ بالكفاءات ومن يحتاج إليها فعلًا', 'اختيار فريق القيادة بعد الدمج', 'خطة مئة يوم للموظفين في عملية دمج قائمة']
      },
      audience: {
        en: 'Integration leads and HR directors in M&A',
        ar: 'قادة الدمج ومديرو الموارد البشرية في صفقات الاستحواذ'
      }
    },
    {
      id: 'c-hybrid-work-by-design', school: 's-kauriridge', subject: 'people', format: 'online',
      start: '2026-12-02', days: 2, price: 890, langs: ['en'], rating: 4.3, reviews: 231, popularity: 67,
      title: { en: 'Hybrid Work by Design', ar: 'تصميم العمل الهجين' },
      summary: {
        en: 'Two days to replace an attendance policy with a working agreement people actually keep.',
        ar: 'يومان لاستبدال سياسة الحضور باتفاق عمل يلتزم به الموظفون فعلًا.'
      },
      highlights: {
        en: ['Deciding which work genuinely needs a room', 'A meeting-load audit of your own calendar', 'Fairness between on-site and remote staff', 'A team working agreement drafted in session'],
        ar: ['تحديد الأعمال التي تستدعي فعلًا الاجتماع في مكان واحد', 'مراجعة عبء الاجتماعات في جدولك أنت', 'الإنصاف بين العاملين في الموقع والعاملين عن بُعد', 'صياغة اتفاق عمل للفريق داخل الجلسة']
      },
      audience: { en: 'Team leaders and HR operations managers', ar: 'قادة الفرق ومديرو عمليات الموارد البشرية' }
    },
    {
      id: 'c-organisation-design-decision-rights', school: 's-lakeshore', subject: 'people', format: 'blended',
      start: '2026-12-07', days: 5, price: 5800, langs: ['en'], rating: 4.6, reviews: 127, popularity: 69,
      title: { en: 'Organisation Design: Structure and Decision Rights', ar: 'تصميم المؤسسة: الهياكل وصلاحيات القرار' },
      summary: {
        en: 'Most reorganisations move boxes; this one starts with who decides what.',
        ar: 'معظم عمليات إعادة الهيكلة تكتفي بتحريك المربّعات، وهذا البرنامج يبدأ من سؤال: من يقرّر ماذا.'
      },
      highlights: {
        en: ['Decision-rights mapping for one live function', 'Spans, layers and the cost of each', 'Designing the interfaces, not only the units', 'A redesign proposal put through peer critique'],
        ar: ['رسم خريطة صلاحيات القرار لوظيفة قائمة فعليًا', 'نطاقات الإشراف وعدد المستويات الإدارية وتكلفة كلٍّ منها', 'تصميم نقاط التقاطع بين الوحدات لا الوحدات وحدها', 'مقترح إعادة تصميم يخضع لنقد الأقران']
      },
      audience: {
        en: 'Function heads and senior HR business partners',
        ar: 'رؤساء الوظائف وكبار شركاء الأعمال في الموارد البشرية'
      }
    },
    {
      id: 'c-talent-strategy-for-scarce-skills', school: 's-hanriver', subject: 'people', format: 'blended',
      start: '2027-01-11', days: 5, price: 5900, langs: ['en'], rating: 4.5, reviews: 96, popularity: 62,
      title: { en: 'Talent Strategy for Scarce Skills', ar: 'استراتيجية المواهب في ظلّ ندرة المهارات' },
      summary: {
        en: 'Build, buy or borrow — decided with numbers rather than instinct.',
        ar: 'البناء أو الاستقطاب أو الاستعانة الخارجية: قرار يُتَّخذ بالأرقام لا بالحدس.'
      },
      highlights: {
        en: ['Build-buy-borrow costing for three critical roles', 'A skills taxonomy you can actually maintain', 'Retention economics of a scarce engineer', 'Supply forecasting against a three-year plan'],
        ar: ['حساب تكلفة البناء والاستقطاب والاستعانة لثلاث وظائف حرجة', 'تصنيف للمهارات قابل للتحديث والصيانة', 'اقتصاديات الاحتفاظ بمهندس نادر التخصّص', 'التنبؤ بالمعروض من المهارات مقابل خطة ثلاثية']
      },
      audience: { en: 'Talent acquisition and workforce planning leads', ar: 'قادة الاستقطاب وتخطيط القوى العاملة' }
    },
    {
      id: 'c-leading-a-workforce-restructuring', school: 's-boughaz', subject: 'people', format: 'in-person',
      start: '2027-02-15', days: 3, price: 3700, langs: ['fr', 'en'], rating: 4.4, reviews: 43, popularity: 46,
      title: { en: 'Leading a Workforce Restructuring', ar: 'قيادة إعادة هيكلة القوى العاملة' },
      summary: {
        en: 'The people who stay are watching how you treat the people who go.',
        ar: 'الباقون في المؤسسة يراقبون كيف تعامل من يغادرونها.'
      },
      highlights: {
        en: ['Selection criteria that stand up to challenge', 'Filmed rehearsal of exit conversations', 'Consultation duties across three jurisdictions', 'A ninety-day plan for the team that remains'],
        ar: ['معايير اختيار تصمد أمام الطعن', 'تدريب مصوَّر على محادثات إنهاء الخدمة', 'واجبات التشاور في ثلاث ولايات قضائية', 'خطة تسعين يومًا للفريق الباقي']
      },
      audience: {
        en: 'HR and operations leaders facing headcount reduction',
        ar: 'قادة الموارد البشرية والعمليات المقبلون على خفض أعداد العاملين'
      }
    },
    {
      id: 'c-chief-people-officer-programme', school: 's-marinabay', subject: 'people', format: 'blended',
      start: '2027-03-01', days: 16, price: 21000, langs: ['en'], rating: 4.8, reviews: 61, popularity: 79,
      title: { en: 'The Chief People Officer Programme', ar: 'برنامج رئيس الموارد البشرية' },
      summary: {
        en: 'Sixteen days for the HR leader who now sits in the room where capital is allocated.',
        ar: 'ستة عشر يومًا لقائد الموارد البشرية الذي صار يجلس حيث تُتَّخذ قرارات تخصيص رأس المال.'
      },
      highlights: {
        en: ['Reading the P&L your workforce cost sits inside', 'Board and remuneration committee simulation', 'Three modules alongside a mentor from the profession', 'A people strategy defended before a panel of CFOs'],
        ar: ['قراءة قائمة الأرباح والخسائر التي تندرج فيها تكلفة القوى العاملة', 'محاكاة لمجلس الإدارة ولجنة المكافآت', 'ثلاث وحدات دراسية بمرافقة مرشد من أهل المهنة', 'استراتيجية موارد بشرية تُدافع عنها أمام لجنة من المديرين الماليين']
      },
      audience: {
        en: 'HR directors moving into the top people role',
        ar: 'مديرو الموارد البشرية المتّجهون إلى المنصب الأعلى في الوظيفة'
      }
    },
    {
      id: 'c-leadership-pipelines-and-succession', school: 's-sahyadri', subject: 'people', format: 'in-person',
      start: '2027-03-22', days: 4, price: 3200, langs: ['en'], rating: 4.4, reviews: 58, popularity: 54,
      title: { en: 'Leadership Pipelines and Succession', ar: 'مسارات إعداد القادة والتعاقب الوظيفي' },
      summary: {
        en: 'Naming a successor is the easy part; the four years before that are the programme.',
        ar: 'تسمية الخلف هي الجزء اليسير، وهذا البرنامج معنيّ بالسنوات الأربع التي تسبقها.'
      },
      highlights: {
        en: ['A talent calibration session run live on real profiles', 'Stretch assignments that develop rather than test', 'Assessing readiness without inflating it', 'A pipeline map for your top forty roles'],
        ar: ['جلسة معايرة حيّة للمواهب على ملفات حقيقية', 'مهام تكليف تطويرية تبني القدرات ولا تكتفي باختبارها', 'تقييم الجاهزية دون مبالغة في تقديرها', 'خريطة تعاقب لأهم أربعين وظيفة لديك']
      },
      audience: { en: 'Talent directors and business unit heads', ar: 'مديرو المواهب ورؤساء وحدات الأعمال' }
    },
    {
      id: 'c-rebuilding-performance-management', school: 's-almultaqa', subject: 'people', format: 'in-person',
      start: '2027-04-19', days: 3, price: 2400, langs: ['ar'], rating: 4.4, reviews: 39, popularity: 45,
      title: { en: 'Rebuilding Performance Management', ar: 'إعادة بناء إدارة الأداء' },
      summary: {
        en: 'The annual rating is not the problem — the conversation nobody holds is.',
        ar: 'التقييم السنوي ليس هو المشكلة، بل المحادثة التي لا يجريها أحد.'
      },
      highlights: {
        en: ['Objectives that survive a year which changes underneath them', 'Running a calibration meeting properly', 'Documenting a poor performer fairly', 'Redesigning your own appraisal cycle end to end'],
        ar: ['أهداف تصمد أمام سنة تتبدّل ظروفها من تحتها', 'إدارة اجتماع معايرة التقييم كما ينبغي', 'توثيق حالات ضعف الأداء بإنصاف', 'إعادة تصميم دورة تقييم الأداء لديك من أوّلها إلى آخرها']
      },
      audience: {
        en: 'HR managers and the line managers they support',
        ar: 'مديرو الموارد البشرية والمديرون المباشرون الذين يدعمونهم'
      }
    },
    {
      id: 'c-designing-executive-reward', school: 's-alpenblick', subject: 'people', format: 'in-person',
      start: '2027-05-17', days: 3, price: 4200, langs: ['en', 'de'], rating: 4.5, reviews: 72, popularity: 57,
      title: { en: 'Designing Executive Reward', ar: 'تصميم مكافآت القيادات التنفيذية' },
      summary: {
        en: 'What actually moves behaviour once base salary has stopped being the point.',
        ar: 'ما الذي يحرّك سلوك القيادات فعلًا حين لا يعود الراتب الأساسي هو العامل الحاسم.'
      },
      highlights: {
        en: ['Long-term incentive plan mechanics, line by line', 'Benchmarking against a peer group you have to justify', 'Drafting malus and clawback clauses', 'A rebuilt pay mix for one role you bring with you'],
        ar: ['آليات خطط الحوافز طويلة الأجل بندًا بندًا', 'المقارنة المرجعية مع مجموعة نظراء عليك تبرير اختيارها', 'صياغة بنود خفض المكافأة واستردادها', 'إعادة بناء مزيج الأجر لوظيفة تحضرها معك']
      },
      audience: {
        en: 'Reward heads and remuneration committee members',
        ar: 'رؤساء إدارات المكافآت وأعضاء لجان الترشيحات والمكافآت'
      }
    },
    {
      id: 'c-reading-and-changing-company-culture', school: 's-lagoonpoint', subject: 'people', format: 'in-person',
      start: '2027-06-14', days: 4, price: 3600, langs: ['en'], rating: 4.5, reviews: 66, popularity: 56,
      title: { en: 'Reading and Changing Company Culture', ar: 'قراءة ثقافة المؤسسة وتغييرها' },
      summary: {
        en: 'Culture is whatever gets tolerated, and this is four days of finding out what yours tolerates.',
        ar: 'الثقافة هي ما تتسامح معه المؤسسة، وهذه أربعة أيام لاكتشاف ما تتسامح معه مؤسستك.'
      },
      highlights: {
        en: ['Diagnosis by observation and interview, not by survey', 'Rewriting the rituals that carry the real message', 'Two company visits with staff interviews', 'A change plan tied to three named behaviours'],
        ar: ['التشخيص بالملاحظة والمقابلة لا بالاستبيان', 'إعادة صياغة الطقوس التي تحمل الرسالة الحقيقية', 'زيارتان لشركتين تتخلّلهما مقابلات مع الموظفين', 'خطة تغيير مرتبطة بثلاثة سلوكيات محدّدة بالاسم']
      },
      audience: {
        en: 'Senior managers accountable for a culture change',
        ar: 'مديرون تنفيذيون مسؤولون عن تغيير ثقافي في مؤسساتهم'
      }
    },
    {
      id: 'c-internal-coaching-capability', school: 's-tablemountain', subject: 'people', format: 'blended',
      start: '2027-07-05', days: 10, price: 8900, langs: ['en'], rating: 4.7, reviews: 49, popularity: 51,
      title: { en: 'Building an Internal Coaching Capability', ar: 'بناء قدرة تدريبية داخلية في المؤسسة' },
      summary: {
        en: 'Ten teaching days to qualify a coach who will still be coaching in two years.',
        ar: 'عشرة أيام تدريسية لتأهيل مدرّب يواصل ممارسة التدريب بعد عامين.'
      },
      highlights: {
        en: ['Sixty logged practice hours with real clients', 'Supervision groups every fortnight for six months', 'Contracting, confidentiality and where coaching stops', 'Assessment against a recorded coaching session'],
        ar: ['ستون ساعة ممارسة موثّقة مع متدرّبين حقيقيين', 'مجموعات إشراف مهني كل أسبوعين على مدى ستة أشهر', 'التعاقد والسرّية وحدود ما لا يعالجه التدريب', 'تقييم قائم على جلسة تدريب مسجّلة']
      },
      audience: {
        en: 'HR professionals becoming internal coaches',
        ar: 'المتخصّصون في الموارد البشرية المتّجهون إلى التدريب الداخلي'
      }
    },
    {
      id: 'c-employee-listening-and-engagement', school: 's-rifthighlands', subject: 'people', format: 'online',
      start: '2027-08-09', days: 4, price: 1320, langs: ['en'], rating: 4.2, reviews: 92, popularity: 43,
      title: { en: 'Employee Listening and Engagement Measurement', ar: 'الإنصات للموظفين وقياس الاندماج الوظيفي' },
      summary: {
        en: 'Fewer surveys, better questions, and something visible that happens afterwards.',
        ar: 'استبيانات أقل وأسئلة أدقّ ونتائج ملموسة يراها الموظفون بعدها.'
      },
      highlights: {
        en: ['Writing questions that do not lead the answer', 'Sampling and honest treatment of response rates', 'Reading thousands of free-text comments', 'A ninety-day action loop published back to staff'],
        ar: ['صياغة أسئلة لا توجّه الإجابة', 'اختيار العيّنة والتعامل بأمانة مع نسب الاستجابة', 'قراءة آلاف التعليقات المفتوحة', 'دورة إجراءات مدّتها تسعون يومًا تُعلَن نتائجها للموظفين']
      },
      audience: { en: 'HR analysts and internal communications leads', ar: 'محلّلو الموارد البشرية وقادة الاتصال الداخلي' }
    },
    {
      id: 'c-platform-and-ecosystem-strategy', school: 's-hanriver', subject: 'strategy', format: 'in-person',
      start: '2027-05-10', days: 4, price: 7200, langs: ['en'], rating: 4.6, reviews: 84, popularity: 71,
      title: { en: 'Platform and Ecosystem Strategy', ar: 'استراتيجية المنصّات والمنظومات' },
      summary: {
        en: 'Most platforms fail on the side of the market they neglected.',
        ar: 'معظم المنصّات تفشل من جهة السوق التي أهملتها.'
      },
      highlights: {
        en: ['Which side of the market to subsidise, and for how long', 'Platform rules, APIs and what to keep off the platform', 'Two-sided pricing simulation played over three rounds', 'Teardowns of four regional platforms that stalled'],
        ar: ['أيّ طرفَي السوق تدعمه، وإلى متى', 'قواعد المنصّة وواجهات البرمجة وما يجب إبقاؤه خارجها', 'محاكاة تسعير ثنائي الجانب على ثلاث جولات', 'تفكيك أربع منصّات إقليمية تعثّر نموّها']
      },
      audience: { en: 'Strategy heads and product leaders', ar: 'رؤساء الاستراتيجية وقادة المنتجات' }
    },
    {
      id: 'c-turnaround-first-hundred-days', school: 's-serraverde', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-12-07', days: 5, price: 6400, langs: ['en', 'es'], rating: 4.7, reviews: 69, popularity: 64,
      title: { en: 'Turnarounds: the First Hundred Days', ar: 'إنقاذ الشركات المتعثّرة: المئة يوم الأولى' },
      summary: {
        en: 'Thirteen weeks of cash before anything else; strategy comes after the company survives.',
        ar: 'ثلاثة عشر أسبوعًا من التدفّق النقدي قبل أي شيء آخر، أمّا الاستراتيجية فتأتي بعد أن تنجو الشركة.'
      },
      highlights: {
        en: ['Building a thirteen-week cash flow from scratch', 'Triage: which contracts, sites and products to stop', 'Negotiating standstills with lenders and suppliers', "A live case debated with the company's former chief executive"],
        ar: ['بناء نموذج تدفّق نقدي لثلاثة عشر أسبوعًا من الصفر', 'الفرز: أيّ العقود والمواقع والمنتجات يجب إيقافها', 'التفاوض على تجميد المطالبات مع المقرضين والموردين', 'مناقشة حالة حيّة بحضور الرئيس التنفيذي السابق للشركة']
      },
      audience: {
        en: 'Restructuring managers and newly appointed CEOs',
        ar: 'مديرو إعادة الهيكلة والرؤساء التنفيذيون المعيّنون حديثًا'
      }
    },
    {
      id: 'c-market-entry-southeast-asia', school: 's-sundastrait', subject: 'strategy', format: 'blended',
      start: '2027-03-22', days: 5, price: 5300, langs: ['en'], rating: 4.4, reviews: 52, popularity: 58,
      title: { en: 'Market Entry in Southeast Asia', ar: 'دخول أسواق جنوب شرق آسيا' },
      summary: {
        en: 'Six markets, six regulatory regimes, and a distributor who will not hand over the customer data.',
        ar: 'ستّة أسواق وستّة أنظمة تنظيمية، وموزّع يرفض تسليم بيانات العملاء.'
      },
      highlights: {
        en: ['Entry-mode choice: distributor, joint venture or own entity', 'Licensing and halal certification timelines, market by market', 'Costing a distribution network spread across an archipelago', 'Two days of meetings with operators already in the market'],
        ar: ['اختيار صيغة الدخول: موزّع أم مشروع مشترك أم كيان مملوك بالكامل', 'مُدد التراخيص وشهادات الحلال في كل سوق على حدة', 'حساب تكلفة شبكة توزيع موزّعة على أرخبيل من الجزر', 'يومان من اللقاءات مع مشغّلين عاملين في السوق فعلًا']
      },
      audience: { en: 'Regional general managers and expansion leads', ar: 'المديرون العامون الإقليميون وقادة التوسّع' }
    },
    {
      id: 'c-building-ventures-inside-corporations', school: 's-almarsa', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-06-07', days: 4, price: 8900, langs: ['ar', 'en'], rating: 4.5, reviews: 38, popularity: 56,
      title: { en: 'Building Ventures Inside a Corporation', ar: 'بناء مشاريع جديدة داخل الشركات القائمة' },
      summary: {
        en: 'The new venture usually dies inside the parent company, not in the market.',
        ar: 'المشروع الجديد يموت عادةً داخل الشركة الأم لا في السوق.'
      },
      highlights: {
        en: ['Funding in stages that do not follow the annual budget', 'Where the venture sits, who it reports to, who may kill it', 'Founder incentives inside a salaried organisation', 'Two ventures pitched to a live investment panel'],
        ar: ['تمويل على مراحل لا تتبع دورة الموازنة السنوية', 'موقع المشروع في الهيكل، ولمن يرفع تقاريره، ومن يملك إيقافه', 'حوافز المؤسّسين داخل شركة يعمل جميع من فيها براتب ثابت', 'عرض مشروعين أمام لجنة استثمار حقيقية']
      },
      audience: {
        en: 'Corporate venturing and new-business leads',
        ar: 'قادة الاستثمار المؤسسي الجريء وتطوير الأعمال الجديدة'
      }
    },
    {
      id: 'c-next-generation-family-business', school: 's-sahyadri', subject: 'strategy', format: 'in-person',
      start: '2027-04-19', days: 12, price: 9600, langs: ['en'], rating: 4.7, reviews: 61, popularity: 67,
      title: { en: 'The Next Generation in the Family Business', ar: 'الجيل التالي في الشركة العائلية' },
      summary: {
        en: 'Twelve days for successors who will be judged on a decision the founder would have made differently.',
        ar: 'اثنا عشر يومًا لخلفاء سيُحاسَبون على قرار كان المؤسّس ليتّخذه على نحو مختلف.'
      },
      highlights: {
        en: ['Three residential modules spread over nine months', 'Reading a group balance sheet you did not build', 'Taking one business unit and rebuilding its plan', 'A mentor from outside the family for the full programme'],
        ar: ['ثلاث وحدات دراسية داخلية موزّعة على تسعة أشهر', 'قراءة الميزانية العمومية لمجموعة لم تبنِها بنفسك', 'أخذ وحدة أعمال واحدة وإعادة بناء خطتها', 'مرشد من خارج العائلة يرافقك طوال البرنامج']
      },
      audience: {
        en: 'Next-generation family shareholders entering management',
        ar: 'الجيل التالي من ملّاك الشركات العائلية المنضمّين إلى الإدارة'
      }
    },
    {
      id: 'c-corporate-development-pipeline', school: 's-lakeshore', subject: 'strategy', format: 'blended',
      start: '2027-07-12', days: 10, price: 16800, langs: ['en'], rating: 4.6, reviews: 47, popularity: 62,
      title: {
        en: 'Corporate Development: Building the Acquisition Pipeline',
        ar: 'تطوير الأعمال: بناء قائمة أهداف الاستحواذ'
      },
      summary: {
        en: 'Companies that buy well buy often, and the pipeline is built long before a banker calls.',
        ar: 'الشركات التي تُحسن الشراء تشتري كثيرًا، وقائمة الأهداف تُبنى قبل أن يتّصل بها أي مصرفي استثماري بوقت طويل.'
      },
      highlights: {
        en: ['Building a target map for one sector of your choice', 'Screening criteria that survive a board challenge', 'Programmatic small acquisitions versus one large bet', 'Two modules ten weeks apart, with a real target list in between'],
        ar: ['بناء خريطة أهداف استحواذ في قطاع تختاره', 'معايير غربلة تصمد أمام مساءلة مجلس الإدارة', 'الاستحواذات الصغيرة المتتابعة مقابل رهان كبير واحد', 'وحدتان تفصل بينهما عشرة أسابيع مع قائمة أهداف حقيقية بينهما']
      },
      audience: {
        en: 'Corporate development directors and heads of strategy',
        ar: 'مديرو تطوير الأعمال ورؤساء الاستراتيجية'
      }
    },
    {
      id: 'c-competitive-war-gaming', school: 's-northgate', subject: 'strategy', format: 'in-person',
      start: '2026-11-10', days: 3, price: 6300, langs: ['en'], rating: 4.8, reviews: 96, popularity: 75,
      title: { en: 'Competitive War-Gaming', ar: 'محاكاة المواجهة التنافسية' },
      summary: {
        en: 'Three days playing your two largest competitors, until their next move stops surprising you.',
        ar: 'ثلاثة أيام تلعب فيها دور أكبر منافسَين لديك، حتى تتوقّف خطوتهما التالية عن مفاجأتك.'
      },
      highlights: {
        en: ['Red team and blue team, three moves deep', 'Reading a rival from its hiring and capital spending', 'Pre-mortem on the strategy you have already announced', 'A written response plan for two scenarios'],
        ar: ['فريق أحمر وفريق أزرق على ثلاث خطوات متتالية', 'قراءة المنافس من خلال توظيفه وإنفاقه الرأسمالي', 'تحليل استباقي لأسباب الفشل المحتملة في الاستراتيجية التي أعلنتها بالفعل', 'خطة استجابة مكتوبة لسيناريوهين']
      },
      audience: { en: 'Strategy teams and business unit heads', ar: 'فرق الاستراتيجية ورؤساء وحدات الأعمال' }
    },
    {
      id: 'c-expanding-beyond-first-market', school: 's-lagoonpoint', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-05-24', days: 4, price: 3200, langs: ['en'], rating: 4.4, reviews: 73, popularity: 54,
      title: { en: 'Expanding Beyond Your First Market', ar: 'التوسّع خارج سوقك الأولى' },
      summary: {
        en: 'The second country costs more than the first and rarely gets the same attention.',
        ar: 'الدولة الثانية أعلى كلفةً من الأولى ونادرًا ما تحظى بالاهتمام نفسه.'
      },
      highlights: {
        en: ['Choosing between depth at home and a second country', 'Currency exposure for a company with no treasury desk', 'Hiring and paying a country manager you cannot supervise daily', 'A panel of founders who did it twice, once badly'],
        ar: ['المفاضلة بين التعمّق في السوق المحلية ودخول دولة ثانية', 'التعرّض لمخاطر العملة في شركة بلا إدارة خزينة', 'تعيين مدير قُطري وتحديد أجره وأنت لا تستطيع الإشراف عليه يوميًا', 'حلقة نقاش مع مؤسّسين خاضوا التجربة مرّتين، فشلت إحداهما']
      },
      audience: {
        en: 'Founders and country managers of growing companies',
        ar: 'المؤسّسون والمديرون القُطريون في الشركات النامية'
      }
    },
    {
      id: 'c-scaling-a-mobile-first-venture', school: 's-rifthighlands', subject: 'entrepreneurship', format: 'blended',
      start: '2027-03-01', days: 5, price: 3400, langs: ['en'], rating: 4.5, reviews: 58, popularity: 57,
      title: { en: 'Scaling a Mobile-First Venture', ar: 'توسيع نطاق مشروع قائم على الهاتف المحمول' },
      summary: {
        en: 'Agent networks, float and fraud are what break a mobile product once it leaves the pilot district.',
        ar: 'شبكات الوكلاء والسيولة والاحتيال هي ما يُسقط أي منتج عبر الهاتف حين يتجاوز منطقته التجريبية.'
      },
      highlights: {
        en: ['Unit economics measured per agent, not per user', 'Float management and cash liquidity in the field', 'Fraud patterns and the controls that actually catch them', "Two days upcountry with an operator's field team"],
        ar: ['اقتصاديات الوحدة مقيسة على مستوى الوكيل لا المستخدم', 'إدارة السيولة النقدية في الميدان', 'أنماط الاحتيال والضوابط التي تكشفها فعلًا', 'يومان خارج العاصمة مع فريق ميداني لأحد المشغّلين']
      },
      audience: {
        en: 'Founders and product leads in mobile money and commerce',
        ar: 'المؤسّسون وقادة المنتجات في المدفوعات والتجارة عبر الهاتف'
      }
    },
    {
      id: 'c-corporate-portfolio-strategy', school: 's-marinabay', subject: 'strategy', format: 'in-person',
      start: '2026-12-14', days: 5, price: 11500, langs: ['en'], rating: 4.7, reviews: 88, popularity: 78,
      title: {
        en: 'Corporate Portfolio Strategy for Diversified Groups',
        ar: 'استراتيجية المحفظة في المجموعات المتنوّعة'
      },
      summary: {
        en: 'A holding company deserves its discount until it can say what it adds to each business it owns.',
        ar: 'الشركة القابضة تستحقّ الخصم في تقييمها إلى أن تُبيّن ما الذي تضيفه إلى كل نشاط تملكه.'
      },
      highlights: {
        en: ['Parenting advantage tested business by business', 'Divestment: choosing what to sell while it still has a buyer', 'Capital allocation across units on different cycles', 'Redrawing the portfolio map of your own group'],
        ar: ['اختبار الميزة التي تضيفها الشركة الأم في كل نشاط على حدة', 'التخارج: اختيار ما تبيعه وهو ما يزال يجد مشتريًا', 'تخصيص رأس المال بين وحدات تعمل بدورات مختلفة', 'إعادة رسم خريطة محفظة مجموعتك أنت']
      },
      audience: {
        en: 'Group executives and holding-company directors',
        ar: 'قيادات المجموعات وأعضاء مجالس الشركات القابضة'
      }
    },
    {
      id: 'c-business-model-redesign', school: 's-kauriridge', subject: 'strategy', format: 'online',
      start: '2027-08-03', days: 6, price: 2300, langs: ['en'], rating: 4.3, reviews: 164, popularity: 60,
      title: { en: 'Business Model Redesign', ar: 'إعادة تصميم نموذج العمل' },
      summary: {
        en: 'Changing how you charge is usually cheaper than changing what you sell.',
        ar: 'تغيير طريقة تسعيرك أقلّ كلفةً في الغالب من تغيير ما تبيعه.'
      },
      highlights: {
        en: ['Mapping where your margin actually comes from', 'Subscription, usage and outcome-based pricing compared', 'The cash flow consequences of each model change', 'Six live sessions, each ending with a rewritten one-page model'],
        ar: ['تحديد المصدر الفعلي لهامش ربحك', 'مقارنة بين التسعير بالاشتراك والاستهلاك والنتيجة', 'أثر كل تغيير في النموذج على التدفّق النقدي', 'ست جلسات مباشرة تنتهي كل منها بنموذج معاد صياغته في صفحة واحدة']
      },
      audience: { en: 'General managers and commercial leads', ar: 'المديرون العامون وقادة الشؤون التجارية' }
    },
    {
      id: 'c-nearshoring-strategy', school: 's-altiplano', subject: 'strategy', format: 'in-person',
      start: '2026-09-28', days: 3, price: 4100, langs: ['es', 'en'], rating: 4.4, reviews: 66, popularity: 63,
      title: {
        en: 'Nearshoring: Choosing the Next Production Base',
        ar: 'نقل التصنيع إلى سوق قريبة: اختيار موقع الإنتاج التالي'
      },
      summary: {
        en: 'Where the plant goes is a strategy decision that finance and logistics will each try to own.',
        ar: 'موقع المصنع قرار استراتيجي ستحاول كلٌّ من الإدارة المالية وإدارة اللوجستيات الاستئثار به.'
      },
      highlights: {
        en: ['Total landed cost against tariff and rules-of-origin exposure', 'Three states compared as sites, with the numbers on the table', 'Depth of the supplier ecosystem, not just the labour rate', 'A visit to a cross-border manufacturing corridor'],
        ar: ['التكلفة الإجمالية حتى التسليم مقابل الرسوم الجمركية وقواعد المنشأ', 'مقارنة رقمية بين ثلاث ولايات مرشّحة لاستضافة المصنع', 'عمق منظومة الموردين لا كلفة العمالة وحدها', 'زيارة ميدانية لممرّ تصنيع عابر للحدود']
      },
      audience: {
        en: 'Manufacturing strategy and footprint decision-makers',
        ar: 'صنّاع قرار استراتيجية التصنيع وتوزيع المواقع'
      }
    },
    {
      id: 'c-franchising-and-licensing-growth', school: 's-boughaz', subject: 'strategy', format: 'in-person',
      start: '2027-04-05', days: 4, price: 4600, langs: ['ar', 'fr', 'en'], rating: 4.3, reviews: 44, popularity: 48,
      title: { en: 'Franchising and Licensing for Regional Growth', ar: 'الامتياز التجاري والترخيص للنمو الإقليمي' },
      summary: {
        en: "Growth on someone else's capital, at the price of controlling how your brand is run.",
        ar: 'نموّ برأس مال غيرك، مقابل التخلّي عن التحكّم في طريقة إدارة علامتك.'
      },
      highlights: {
        en: ['Franchise economics: fees, royalties and the payback period', 'Territory agreements and what to do when a partner underperforms', 'Quality control in markets you do not staff yourself', 'A drafting exercise on a master franchise agreement'],
        ar: ['اقتصاديات الامتياز: الرسوم والإتاوات وفترة استرداد الاستثمار', 'اتفاقيات النطاق الجغرافي والتصرّف عند تراجع أداء الشريك', 'ضبط الجودة في أسواق لا يعمل فيها موظفوك', 'تمرين تطبيقي على صياغة عقد امتياز رئيسي']
      },
      audience: { en: 'Retail and food-service expansion directors', ar: 'مديرو التوسّع في التجزئة وخدمات الأغذية' }
    },
    {
      id: 'c-entrepreneurship-by-acquisition', school: 's-alpenblick', subject: 'entrepreneurship', format: 'blended',
      start: '2027-07-26', days: 5, price: 9400, langs: ['en', 'de'], rating: 4.6, reviews: 41, popularity: 53,
      title: { en: 'Entrepreneurship Through Acquisition', ar: 'ريادة الأعمال عبر شراء شركة قائمة' },
      summary: {
        en: 'Buying a small profitable company is a faster route to running one than founding it, and a harder one to finance.',
        ar: 'شراء شركة صغيرة رابحة طريق إلى إدارتها أسرع من تأسيسها، لكنه أصعب تمويلًا.'
      },
      highlights: {
        en: ['Search economics: what a two-year search costs you', 'Reaching owners who are ready to sell but never listed', 'Debt structures a first-time buyer can realistically raise', 'The first ninety days as the new owner-manager'],
        ar: ['اقتصاديات البحث: كم يكلّفك بحث يمتدّ سنتين', 'الوصول إلى ملّاك مستعدّين للبيع دون طرح معلن', 'هياكل الدَّين التي يستطيع مشترٍ لأول مرة الحصول عليها واقعيًا', 'أول تسعين يومًا بصفتك المالك المدير الجديد']
      },
      audience: { en: 'Prospective owner-managers and their backers', ar: 'الراغبون في تملّك شركة وإدارتها ومموّلوهم' }
    }
  ];

  /* Editorial collections — the "Top 10 lists" idea, kept honest by being
     explicitly editorial rather than pretending to be a ranking. */
  const lists = [
    {
      id: 'l-ai',
      title: { en: 'Best executive courses on AI', ar: 'أفضل البرامج التنفيذية في الذكاء الاصطناعي' },
      blurb: {
        en: 'Programmes that treat AI as an operating decision rather than a technology demo.',
        ar: 'برامج تتعامل مع الذكاء الاصطناعي كقرار تشغيلي لا كعرض تقني.'
      },
      courses: ['c-ai-exec', 'c-ai-arabic', 'c-ai-ops', 'c-data-decisions', 'c-cyber-board', 'c-digital-bank', 'c-ai-governance-and-model-risk', 'c-chief-digital-officer-programme', 'c-first-48-hours-of-a-breach']
    },
    {
      id: 'l-arabic',
      title: { en: 'Executive programmes taught in Arabic', ar: 'برامج تنفيذية تُدرَّس بالعربية' },
      blurb: {
        en: 'Full delivery in Arabic — not a translated slide deck with an interpreter.',
        ar: 'تقديم كامل بالعربية — لا شرائح مترجمة ومترجم فوري.'
      },
      courses: ['c-ai-arabic', 'c-public-leadership', 'c-risk-gov', 'c-hr-transform', 'c-family-gov', 'c-giga', 'c-islamic-finance-sukuk-structuring', 'c-executive-presence', 'c-building-a-data-strategy', 'c-negotiating-joint-ventures']
    },
    {
      id: 'l-week',
      title: { en: 'Serious programmes you can finish in a week', ar: 'برامج جادّة يمكن إنهاؤها في أسبوع' },
      blurb: {
        en: 'Five days or fewer, for people who cannot disappear for a month.',
        ar: 'خمسة أيام أو أقل، لمن لا يستطيع الغياب شهرًا كاملًا.'
      },
      courses: ['c-board-fin', 'c-negotiation', 'c-storytelling', 'c-crisis', 'c-lean-ops', 'c-procurement', 'c-competitive-war-gaming', 'c-executive-presence', 'c-first-48-hours-of-a-breach']
    },
    {
      id: 'l-firsttime',
      title: { en: 'Best courses for first-time leaders', ar: 'أفضل البرامج للقادة الجدد' },
      blurb: {
        en: 'The transition into managing people, taught by people who remember it.',
        ar: 'الانتقال إلى إدارة الأشخاص، على يد من يتذكّرون صعوبة هذا الانتقال.'
      },
      courses: ['c-first-90', 'c-coaching-skills', 'c-change', 'c-women-lead', 'c-storytelling', 'c-expert-to-leader', 'c-managing-managers']
    },
    {
      id: 'l-online',
      title: { en: 'Best online executive courses', ar: 'أفضل البرامج التنفيذية عن بُعد' },
      blurb: {
        en: 'Live cohorts and real feedback, not a video library with a certificate at the end.',
        ar: 'دفعات مباشرة وتغذية راجعة حقيقية، لا مكتبة فيديو تنتهي بشهادة.'
      },
      courses: ['c-data-decisions', 'c-people-analytics', 'c-first-90', 'c-coaching-skills', 'c-digital-bank', 'c-vc', 'c-finance-for-non-financial-managers', 'c-influencing-without-authority', 'c-forecasting-planners-budget-holders']
    },
    {
      id: 'l-finance',
      title: { en: 'Best finance courses for non-financial executives', ar: 'أفضل برامج التمويل للتنفيذيين من غير الماليين' },
      blurb: {
        en: 'Enough finance to challenge the numbers you are handed.',
        ar: 'قدر من المعرفة المالية يكفي لمساءلة الأرقام التي تُقدَّم إليك.'
      },
      courses: ['c-board-fin', 'c-ma', 'c-esg-finance', 'c-commodities', 'c-infra-finance', 'c-risk-gov', 'c-islamic-finance-sukuk-structuring', 'c-running-a-family-office']
    },
    {
      id: 'l-negotiation',
      title: { en: 'Best negotiation programmes', ar: 'أفضل برامج التفاوض' },
      blurb: {
        en: 'Programmes where you negotiate for most of the week, rather than hear about negotiating.',
        ar: 'برامج تتفاوض فيها معظم الوقت، بدل أن تستمع إلى محاضرات عن التفاوض.'
      },
      courses: ['c-the-complex-deal', 'c-negotiation', 'c-negotiating-renewals-price-increases', 'c-influencing-without-authority', 'c-negotiating-across-asian-markets', 'c-mediation-and-dispute-resolution']
    },
    {
      id: 'l-healthcare',
      title: { en: 'For healthcare leaders', ar: 'لقادة قطاع الرعاية الصحية' },
      blurb: {
        en: 'Clinical quality, cost and staffing taught as one problem, by people who have run hospitals.',
        ar: 'جودة الرعاية والتكلفة والكوادر بوصفها مشكلة واحدة، على يد من أداروا مستشفيات فعلًا.'
      },
      courses: ['c-healthcare-ops', 'c-from-clinician-to-manager', 'c-patient-safety-and-clinical-quality', 'c-building-and-opening-a-hospital', 'c-telehealth-beyond-the-pilot', 'c-financing-universal-health-coverage']
    },
    {
      id: 'l-africa',
      title: { en: 'Executive education across Africa', ar: 'التعليم التنفيذي في أفريقيا' },
      blurb: {
        en: 'Taught on the continent, about the continent — not a European syllabus flown in for the week.',
        ar: 'تُدرَّس في القارة وعن القارة — لا منهج أوروبي يُنقل إليها لأسبوع.'
      },
      courses: ['c-growth-africa', 'c-managing-managers', 'c-negotiating-public-contracts', 'c-building-an-analytics-team', 'c-fraud-analytics-in-payments', 'c-infra-finance']
    }
  ];

  const regions = [
    { id: 'mena',     en: 'Middle East & North Africa', ar: 'الشرق الأوسط وشمال أفريقيا' },
    { id: 'europe',   en: 'Europe',                     ar: 'أوروبا' },
    { id: 'americas', en: 'Americas',                   ar: 'الأمريكتان' },
    { id: 'asia',     en: 'Asia',                       ar: 'آسيا' },
    { id: 'africa',   en: 'Africa',                     ar: 'أفريقيا' },
    { id: 'oceania',  en: 'Oceania',                    ar: 'أوقيانوسيا' }
  ];

  return { subjects, formats, languages, schools, courses, lists, regions };
})();
