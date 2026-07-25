/* ==========================================================================
   Masar — locale runtime
   The page shells carry their own translated markup; this file covers every
   string that JavaScript renders (cards, filters, result counts, detail
   pages). Locale is read from <html lang>, so nothing here needs configuring
   per page.
   ========================================================================== */

window.MASAR_I18N = (function () {
  const LANG = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const IS_RTL = LANG === 'ar';

  const strings = {
    en: {
      'search.keyword': 'Course, subject or school',
      'search.subject': 'All subjects',
      'search.location': 'Anywhere',
      'search.submit': 'Search courses',

      'filters.title': 'Refine',
      'filters.subject': 'Subject',
      'filters.format': 'Format',
      'filters.region': 'Region',
      'filters.language': 'Taught in',
      'filters.duration': 'Duration',
      'filters.price': 'Maximum price',
      'filters.school': 'School',
      'filters.clear': 'Clear all',
      'filters.show': 'Filters',
      'filters.hide': 'Done',
      'filters.any': 'Any',
      'filters.upTo': 'Up to {n}',
      'filters.noMax': 'No limit',

      'duration.short': '1–3 days',
      'duration.mid': '4–7 days',
      'duration.long': '8 days or more',

      'sort.label': 'Sort by',
      'sort.date': 'Starting soonest',
      'sort.popular': 'Most popular',
      'sort.rating': 'Highest rated',
      'sort.priceAsc': 'Price: low to high',
      'sort.priceDesc': 'Price: high to low',

      'results.none.title': 'No courses match those filters',
      'results.none.body': 'Try widening the region or removing the price limit.',
      'results.reset': 'Clear all filters',
      'results.showing': 'Showing {n}',

      'card.from': 'from',
      'card.days': '{n} days',
      'card.day': '1 day',
      'card.starts': 'Starts {date}',
      'card.reviews': '{n} reviews',
      'card.save': 'Save',
      'card.saved': 'Saved',
      'card.saveA11y': 'Save {title} to your shortlist',

      'course.about': 'About this programme',
      'course.blurb': '{school} runs this programme over {days} — {format} delivery, {place} — '
        + 'with instruction in {langs}. The next cohort starts on {date}.',
      'course.highlights': 'What you will do',
      'course.audience': 'Who it is for',
      'course.facts': 'At a glance',
      'course.format': 'Format',
      'course.duration': 'Duration',
      'course.start': 'Next start',
      'course.price': 'Fee',
      'course.language': 'Taught in',
      'course.subject': 'Subject',
      'course.location': 'Location',
      'course.request': 'Request information',
      'course.brochure': 'Download brochure',
      'course.school': 'Offered by',
      'course.schoolLink': 'All courses from this school',
      'course.similar': 'Similar programmes',
      'course.notFound': 'That course could not be found.',
      'course.back': 'Browse all courses',

      'school.founded': 'Founded',
      'school.accreditation': 'Accreditation',
      'school.location': 'Location',
      'school.courses': 'Courses from this school',
      'school.count': '{n} courses',
      'school.notFound': 'That school could not be found.',
      'school.back': 'Browse all schools',
      'school.view': 'View school',

      'list.notFound': 'That collection could not be found.',
      'list.back': 'All collections',
      'list.count': '{n} courses',

      'shortlist.title': 'Your shortlist',
      'shortlist.empty': 'Nothing saved yet. Use the Save button on any course to keep it here.',
      'shortlist.clear': 'Clear shortlist',
      'shortlist.open': 'Shortlist',
      'shortlist.remove': 'Remove',

      'a11y.close': 'Close',
      'misc.free': 'On request',
      'misc.online': 'Online',
      'misc.viewAll': 'View all'
    },

    ar: {
      'search.keyword': 'برنامج أو تخصّص أو كلية',
      'search.subject': 'كل التخصّصات',
      'search.location': 'كل المواقع',
      'search.submit': 'ابحث عن البرامج',

      'filters.title': 'تصفية النتائج',
      'filters.subject': 'التخصّص',
      'filters.format': 'نمط الدراسة',
      'filters.region': 'المنطقة',
      'filters.language': 'لغة التدريس',
      'filters.duration': 'المدّة',
      'filters.price': 'الحدّ الأعلى للرسوم',
      'filters.school': 'الكلية',
      'filters.clear': 'مسح الكل',
      'filters.show': 'التصفية',
      'filters.hide': 'تم',
      'filters.any': 'الكل',
      'filters.upTo': 'حتى {n}',
      'filters.noMax': 'بلا حدّ',

      'duration.short': '1–3 أيام',
      'duration.mid': '4–7 أيام',
      'duration.long': '8 أيام فأكثر',

      'sort.label': 'الترتيب',
      'sort.date': 'الأقرب بدءًا',
      'sort.popular': 'الأكثر رواجًا',
      'sort.rating': 'الأعلى تقييمًا',
      'sort.priceAsc': 'الرسوم: من الأقل',
      'sort.priceDesc': 'الرسوم: من الأعلى',

      'results.none.title': 'لا توجد برامج مطابقة لهذه المعايير',
      'results.none.body': 'جرّب توسيع نطاق المنطقة أو رفع الحدّ الأعلى للرسوم.',
      'results.reset': 'مسح كل عوامل التصفية',
      'results.showing': 'عرض {n}',

      'card.from': 'تبدأ من',
      'card.days': '{n} أيام',
      'card.day': 'يوم واحد',
      'card.starts': 'يبدأ في {date}',
      'card.reviews': '{n} تقييمًا',
      'card.save': 'حفظ',
      'card.saved': 'محفوظ',
      'card.saveA11y': 'حفظ {title} في قائمتك',

      'course.about': 'عن البرنامج',
      'course.blurb': 'يُقدَّم هذا البرنامج من {school} على مدى {days} — {format}، {place} — '
        + 'ولغة التدريس: {langs}. تبدأ الدفعة القادمة في {date}.',
      'course.highlights': 'ماذا ستفعل خلال البرنامج',
      'course.audience': 'لمن هذا البرنامج',
      'course.facts': 'نظرة سريعة',
      'course.format': 'نمط الدراسة',
      'course.duration': 'المدّة',
      'course.start': 'أقرب موعد',
      'course.price': 'الرسوم',
      'course.language': 'لغة التدريس',
      'course.subject': 'التخصّص',
      'course.location': 'الموقع',
      'course.request': 'اطلب معلومات',
      'course.brochure': 'حمّل الكتيّب',
      'course.school': 'تقدّمه',
      'course.schoolLink': 'كل برامج هذه الكلية',
      'course.similar': 'برامج مشابهة',
      'course.notFound': 'تعذّر العثور على هذا البرنامج.',
      'course.back': 'تصفّح كل البرامج',

      'school.founded': 'سنة التأسيس',
      'school.accreditation': 'الاعتمادات',
      'school.location': 'الموقع',
      'school.courses': 'برامج هذه الكلية',
      'school.count': '{n}',
      'school.notFound': 'تعذّر العثور على هذه الكلية.',
      'school.back': 'تصفّح كل الكليات',
      'school.view': 'عرض الكلية',

      'list.notFound': 'تعذّر العثور على هذه المجموعة.',
      'list.back': 'كل المجموعات',
      'list.count': '{n}',

      'shortlist.title': 'قائمتك المختارة',
      'shortlist.empty': 'لم تحفظ أي برنامج بعد. استخدم زر «حفظ» في أي برنامج ليظهر هنا.',
      'shortlist.clear': 'إفراغ القائمة',
      'shortlist.open': 'قائمتي',
      'shortlist.remove': 'إزالة',

      'a11y.close': 'إغلاق',
      'misc.free': 'عند الطلب',
      'misc.online': 'عن بُعد',
      'misc.viewAll': 'عرض الكل'
    }
  };

  function t(key, vars) {
    let out = (strings[LANG] && strings[LANG][key]) || strings.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        out = out.replace('{' + k + '}', vars[k]);
      });
    }
    return out;
  }

  /* Pick the localised half of a { en, ar } pair. */
  function pick(pair) {
    if (pair == null) return '';
    if (typeof pair === 'string') return pair;
    return pair[LANG] != null ? pair[LANG] : pair.en;
  }

  /* Arabic counts genuinely need six forms — doing this properly is the
     difference between a translated site and a localised one. */
  function courseCount(n) {
    if (LANG !== 'ar') return n === 1 ? '1 course' : n.toLocaleString('en') + ' courses';
    if (n === 0) return 'لا توجد برامج';
    if (n === 1) return 'برنامج واحد';
    if (n === 2) return 'برنامجان';
    if (n <= 10) return n + ' برامج';
    return n + ' برنامجًا';
  }

  function dayCount(n) {
    if (LANG !== 'ar') return n === 1 ? '1 day' : n + ' days';
    if (n === 1) return 'يوم واحد';
    if (n === 2) return 'يومان';
    if (n <= 10) return n + ' أيام';
    return n + ' يومًا';
  }

  const numLocale = LANG === 'ar' ? 'ar-u-nu-latn' : 'en';

  function money(value) {
    try {
      return new Intl.NumberFormat(numLocale, {
        style: 'currency', currency: 'USD',
        currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0
      }).format(value);
    } catch (e) {
      return '$' + value.toLocaleString('en');
    }
  }

  function shortDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    try {
      return new Intl.DateTimeFormat(numLocale, {
        day: 'numeric', month: 'short', year: 'numeric'
      }).format(d);
    } catch (e) {
      return iso;
    }
  }

  function monthLabel(iso) {
    const d = new Date(iso + 'T00:00:00');
    try {
      return new Intl.DateTimeFormat(numLocale, { month: 'long', year: 'numeric' }).format(d);
    } catch (e) {
      return iso.slice(0, 7);
    }
  }

  function num(n) {
    try { return new Intl.NumberFormat(numLocale).format(n); } catch (e) { return String(n); }
  }

  return { LANG, IS_RTL, t, pick, courseCount, dayCount, money, shortDate, monthLabel, num };
})();
