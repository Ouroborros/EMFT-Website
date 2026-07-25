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
      start: '2026-10-07', days: 4, price: 5600, langs: ['en'], rating: 4.5, reviews: 63, popularity: 61,
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
      start: '2026-09-02', days: 3, price: 1450, langs: ['en'], rating: 4.4, reviews: 528, popularity: 85,
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
      start: '2027-01-11', days: 6, price: 14200, langs: ['en'], rating: 4.8, reviews: 176, popularity: 89,
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
      courses: ['c-ai-exec', 'c-ai-arabic', 'c-ai-ops', 'c-data-decisions', 'c-cyber-board', 'c-digital-bank']
    },
    {
      id: 'l-arabic',
      title: { en: 'Executive programmes taught in Arabic', ar: 'برامج تنفيذية تُدرَّس بالعربية' },
      blurb: {
        en: 'Full delivery in Arabic — not a translated slide deck with an interpreter.',
        ar: 'تقديم كامل بالعربية — لا شرائح مترجمة ومترجم فوري.'
      },
      courses: ['c-ai-arabic', 'c-public-leadership', 'c-risk-gov', 'c-hr-transform', 'c-family-gov', 'c-giga']
    },
    {
      id: 'l-week',
      title: { en: 'Serious programmes you can finish in a week', ar: 'برامج جادّة يمكن إنهاؤها في أسبوع' },
      blurb: {
        en: 'Five days or fewer, for people who cannot disappear for a month.',
        ar: 'خمسة أيام أو أقل، لمن لا يستطيع الغياب شهرًا كاملًا.'
      },
      courses: ['c-board-fin', 'c-negotiation', 'c-storytelling', 'c-crisis', 'c-lean-ops', 'c-procurement']
    },
    {
      id: 'l-firsttime',
      title: { en: 'Best courses for first-time leaders', ar: 'أفضل البرامج للقادة الجدد' },
      blurb: {
        en: 'The transition into managing people, taught by people who remember it.',
        ar: 'الانتقال إلى إدارة الأشخاص، على يد من يتذكّرون صعوبة هذا الانتقال.'
      },
      courses: ['c-first-90', 'c-coaching-skills', 'c-change', 'c-women-lead', 'c-storytelling']
    },
    {
      id: 'l-online',
      title: { en: 'Best online executive courses', ar: 'أفضل البرامج التنفيذية عن بُعد' },
      blurb: {
        en: 'Live cohorts and real feedback, not a video library with a certificate at the end.',
        ar: 'دفعات مباشرة وتغذية راجعة حقيقية، لا مكتبة فيديو تنتهي بشهادة.'
      },
      courses: ['c-data-decisions', 'c-people-analytics', 'c-first-90', 'c-coaching-skills', 'c-digital-bank', 'c-vc']
    },
    {
      id: 'l-finance',
      title: { en: 'Best finance courses for non-financial executives', ar: 'أفضل برامج التمويل للتنفيذيين من غير الماليين' },
      blurb: {
        en: 'Enough finance to challenge the numbers you are handed.',
        ar: 'قدر من المعرفة المالية يكفي لمساءلة الأرقام التي تُقدَّم إليك.'
      },
      courses: ['c-board-fin', 'c-ma', 'c-esg-finance', 'c-commodities', 'c-infra-finance', 'c-risk-gov']
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
