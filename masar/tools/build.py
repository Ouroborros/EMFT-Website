#!/usr/bin/env python3
"""Render Masar's HTML pages for both locales from one source.

The site itself has no build step — it is plain HTML/CSS/JS that runs from
file:// — but the English and Arabic shells must stay structurally identical,
and hand-maintaining eighteen files guarantees drift. So the page shells and
their translated copy live here, and this script writes them out:

    python3 tools/build.py          # from the masar/ directory

English pages land in ./, Arabic in ./ar/. Course, school and collection
content is not here: that comes from assets/js/data.js at runtime, in both
languages, from a single record per course.
"""

import os
import re

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LOCALES = ("en", "ar")

NAV = [
    ("courses.html", "Courses", "البرامج"),
    ("schools.html", "Schools", "الكليات"),
    ("lists.html", "Collections", "المجموعات"),
    ("about.html", "About", "عن مسار"),
    ("contact.html", "Contact", "تواصل معنا"),
]

FONTS = {
    "en": (
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
        'family=Manrope:wght@400;500;600;700;800&'
        'family=Newsreader:opsz,wght@6..72,400;6..72,600;6..72,700&display=swap">'
    ),
    "ar": (
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
        'family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">'
    ),
}

BRAND_MARK = (
    '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">'
    '<circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".28"/>'
    '<path d="M7 22.5 16 6l9 16.5" fill="none" stroke="currentColor" stroke-width="2.4" '
    'stroke-linejoin="round" stroke-linecap="round"/>'
    '<path d="M11.5 22.5 16 14l4.5 8.5" fill="none" stroke="currentColor" stroke-width="1.6" '
    'stroke-linejoin="round" stroke-linecap="round" opacity=".5"/>'
    '</svg>'
)

SUN_MOON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" '
    'stroke-linecap="round" aria-hidden="true">'
    '<path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z"/></svg>'
)

BOOKMARK = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" '
    'stroke-linejoin="round" aria-hidden="true">'
    '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1Z"/></svg>'
)

T = {
    "tagline": {"en": "Executive Courses", "ar": "دليل البرامج التنفيذية"},
    "skip": {"en": "Skip to content", "ar": "تخطَّ إلى المحتوى"},
    "menu": {"en": "Menu", "ar": "القائمة"},
    "theme": {"en": "Switch theme", "ar": "تبديل مظهر الموقع"},
    "shortlist": {"en": "Shortlist", "ar": "قائمتي"},
    "shortlist_title": {"en": "Your shortlist", "ar": "قائمتك المختارة"},
    "shortlist_clear": {"en": "Clear shortlist", "ar": "إفراغ القائمة"},
    "close": {"en": "Close", "ar": "إغلاق"},
    "home": {"en": "Home", "ar": "الرئيسية"},
    "lang_other": {"en": "العربية", "ar": "English"},
    "lang_a11y": {"en": "اقرأ هذه الصفحة بالعربية", "ar": "Read this page in English"},
    "f_browse": {"en": "Browse", "ar": "تصفّح"},
    "f_subjects": {"en": "Popular subjects", "ar": "تخصّصات مطلوبة"},
    "f_site": {"en": "Masar", "ar": "مسار"},
    "f_blurb": {
        "en": "An independent index of executive education — searchable in English and Arabic, "
              "free to use, and honest about what it does not know.",
        "ar": "دليل مستقل للتعليم التنفيذي — قابل للبحث بالعربية والإنجليزية، "
              "مجاني الاستخدام، وصريح بشأن ما لا يعرفه.",
    },
    "f_demo": {
        "en": "Portfolio project · the schools and listings below are fictional sample data",
        "ar": "مشروع شخصي · الكليات والبرامج المعروضة بيانات تجريبية غير حقيقية",
    },
}

FOOTER_SUBJECTS = [
    ("leadership", "Leadership", "القيادة"),
    ("finance", "Finance", "التمويل"),
    ("digital", "AI & digital", "الذكاء الاصطناعي"),
    ("strategy", "Strategy", "الاستراتيجية"),
]


def shell(lang, page, title, description, body, extra_head=""):
    """Assemble one page. `page` is the file name shared by both locales."""
    is_ar = lang == "ar"
    a = "../assets/" if is_ar else "assets/"
    other = ("../" if is_ar else "ar/") + page
    root = "../" if is_ar else ""

    nav = "\n".join(
        '          <li><a href="{href}"{cur}>{label}</a></li>'.format(
            href=href,
            label=(ar if is_ar else en),
            cur=' aria-current="page"' if href == page else "",
        )
        for href, en, ar in NAV
    )

    footer_subjects = "\n".join(
        '            <li><a href="courses.html?subject={sid}">{label}</a></li>'.format(
            sid=sid, label=(ar if is_ar else en)
        )
        for sid, en, ar in FOOTER_SUBJECTS
    )

    return """<!DOCTYPE html>
<html lang="{lang}" dir="{dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="icon" href="{a}img/favicon.svg" type="image/svg+xml">
  <link rel="alternate" hreflang="en" href="{root}{page}">
  <link rel="alternate" hreflang="ar" href="{root}ar/{page}">
  <link rel="alternate" hreflang="x-default" href="{root}{page}">
  <script>
    /* Set the theme before first paint so the page never flashes light. */
    (function () {{
      try {{
        var saved = localStorage.getItem('masar:theme');
        if (!saved) saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', saved);
      }} catch (e) {{}}
    }})();
  </script>
  {fonts}
  <link rel="stylesheet" href="{a}css/site.css">{extra_head}
</head>
<body>
  <a class="skip-link" href="#main">{skip}</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html">
        {mark}
        <span class="brand-name">{brandname}<small>{tagline}</small></span>
      </a>

      <nav id="main-nav" class="main-nav" aria-label="{navlabel}">
        <ul>
{nav}
        </ul>
      </nav>

      <div class="header-tools">
        <a class="lang-switch" href="{other}" data-lang-switch hreflang="{otherlang}" lang="{otherlang}"
           aria-label="{lang_a11y}">{lang_other}</a>
        <button class="icon-btn shortlist-btn" type="button" data-drawer-open aria-label="{shortlist}">
          {bookmark}<span class="shortlist-count" data-shortlist-count>0</span>
        </button>
        <button class="icon-btn" type="button" data-theme-toggle aria-label="{theme}">{sunmoon}</button>
        <button class="icon-btn nav-toggle" type="button" data-nav-toggle aria-expanded="false"
                aria-controls="main-nav" aria-label="{menu}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <main id="main">
{body}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">{mark}<span class="brand-name">{brandname}</span></a>
          <p class="footer-blurb">{f_blurb}</p>
        </div>
        <div>
          <h3>{f_browse}</h3>
          <ul>
            <li><a href="courses.html">{n_courses}</a></li>
            <li><a href="schools.html">{n_schools}</a></li>
            <li><a href="lists.html">{n_lists}</a></li>
          </ul>
        </div>
        <div>
          <h3>{f_subjects}</h3>
          <ul>
{footer_subjects}
          </ul>
        </div>
        <div>
          <h3>{f_site}</h3>
          <ul>
            <li><a href="about.html">{n_about}</a></li>
            <li><a href="contact.html">{n_contact}</a></li>
            <li><a href="{other}" data-lang-switch>{lang_other}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> {brandname}</span>
        <span>{f_demo}</span>
      </div>
    </div>
  </footer>

  <div class="drawer-backdrop" data-drawer-backdrop></div>
  <aside class="drawer" data-drawer aria-label="{shortlist_title}" aria-hidden="true">
    <div class="drawer__head">
      <h2 class="h3">{shortlist_title}</h2>
      <button class="icon-btn" type="button" data-drawer-close aria-label="{close}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18"/>
        </svg>
      </button>
    </div>
    <div class="drawer__body" data-drawer-body></div>
    <div class="drawer__foot">
      <button class="btn btn--ghost btn--block" type="button" data-shortlist-clear>{shortlist_clear}</button>
    </div>
  </aside>

  <script src="{a}js/data.js"></script>
  <script src="{a}js/i18n.js"></script>
  <script src="{a}js/app.js"></script>
</body>
</html>
""".format(
        lang=lang,
        dir="rtl" if is_ar else "ltr",
        title=title,
        description=description,
        a=a,
        root=root,
        page=page,
        fonts=FONTS[lang],
        extra_head=extra_head,
        skip=T["skip"][lang],
        mark=BRAND_MARK,
        brandname="مسار" if is_ar else "Masar",
        tagline=T["tagline"][lang],
        navlabel="التنقّل الرئيسي" if is_ar else "Primary",
        nav=nav,
        other=other,
        otherlang="ar" if lang == "en" else "en",
        lang_other=T["lang_other"][lang],
        lang_a11y=T["lang_a11y"][lang],
        shortlist=T["shortlist"][lang],
        shortlist_title=T["shortlist_title"][lang],
        shortlist_clear=T["shortlist_clear"][lang],
        close=T["close"][lang],
        theme=T["theme"][lang],
        menu=T["menu"][lang],
        bookmark=BOOKMARK,
        sunmoon=SUN_MOON,
        body=body,
        f_blurb=T["f_blurb"][lang],
        f_browse=T["f_browse"][lang],
        f_subjects=T["f_subjects"][lang],
        f_site=T["f_site"][lang],
        f_demo=T["f_demo"][lang],
        footer_subjects=footer_subjects,
        n_courses="البرامج" if is_ar else "Courses",
        n_schools="الكليات" if is_ar else "Schools",
        n_lists="المجموعات" if is_ar else "Collections",
        n_about="عن مسار" if is_ar else "About",
        n_contact="تواصل معنا" if is_ar else "Contact",
    )


# ---------------------------------------------------------------------------
# Page bodies
# ---------------------------------------------------------------------------

HOME = {}

HOME["en"] = """
    <section class="hero">
      <div class="container hero-inner">
        <p class="eyebrow">Executive education, worldwide</p>
        <h1>Find the course that is actually worth the week away.</h1>
        <p class="lede">Masar indexes executive programmes from business schools around the world —
          filter by subject, region, format, language and fee, then talk to the school directly.
          No account, no lead-selling, no fake rankings.</p>

        <form class="hero-search" action="courses.html" method="get" role="search">
          <div class="field">
            <label for="q">Search</label>
            <input id="q" name="q" type="search" placeholder="Course, subject or school" autocomplete="off">
          </div>
          <div class="field">
            <label for="subject">Subject</label>
            <select id="subject" name="subject" data-hero-subject></select>
          </div>
          <div class="field">
            <label for="region">Region</label>
            <select id="region" name="region" data-hero-region></select>
          </div>
          <button class="btn btn--primary" type="submit">Search courses</button>
        </form>

        <div class="hero-stats">
          <div class="hero-stat"><div class="n" data-stat="courses">—</div><div class="l">Courses indexed</div></div>
          <div class="hero-stat"><div class="n" data-stat="schools">—</div><div class="l">Business schools</div></div>
          <div class="hero-stat"><div class="n" data-stat="countries">—</div><div class="l">Countries</div></div>
          <div class="hero-stat"><div class="n" data-stat="subjects">—</div><div class="l">Subject areas</div></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Featured</span>
            <h2 class="h2">Programmes worth a second look</h2>
            <p>Chosen by our editors for depth and teaching quality — never for a placement fee.</p>
          </div>
          <a class="link-arrow" href="courses.html">All courses <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-featured></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">By subject</span>
            <h2 class="h2">Start from what you need to learn</h2>
          </div>
        </div>
        <div class="subject-grid" data-home-subjects></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Starting soon</span>
            <h2 class="h2">The next intakes</h2>
            <p>Sorted by start date, so you can see what you can still get on.</p>
          </div>
          <a class="link-arrow" href="courses.html?sort=date">See the calendar <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-upcoming></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Collections</span>
            <h2 class="h2">Editors' shortlists</h2>
            <p>Grouped by the question people actually arrive with, not by alphabet.</p>
          </div>
          <a class="link-arrow" href="lists.html">All collections <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-lists></div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow">How Masar works</span>
          <h2 class="h2">A directory that does not sell you.</h2>
          <p class="lede" style="margin-block-start:14px">Most course directories are lead-generation
            businesses wearing an editorial coat. This one is built the other way round.</p>
          <blockquote class="quote" style="margin-block-start:26px">
            If a listing is here, it is because it belongs in the index — not because someone paid
            for the position.
            <footer>— The editorial policy, in one sentence</footer>
          </blockquote>
        </div>
        <ol class="step-list">
          <li>
            <div>
              <h3>Search without an account</h3>
              <p>Every filter, every listing and every fee is visible without signing up for anything.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>Compare on what matters</h3>
              <p>Fee, teaching days, format, language of instruction and start date — on every card,
                 in the same place, so comparison takes seconds.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>Save a shortlist</h3>
              <p>Keep candidates in one list as you browse. It stays in your own browser; we never see it.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>Go straight to the school</h3>
              <p>Enquiries go to the institution running the programme. Your details are not resold.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Institutions</span>
            <h2 class="h2">Schools in the index</h2>
          </div>
          <a class="link-arrow" href="schools.html">All schools <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="subject-grid" data-home-schools></div>
      </div>
    </section>
"""

HOME["ar"] = """
    <section class="hero">
      <div class="container hero-inner">
        <p class="eyebrow">التعليم التنفيذي حول العالم</p>
        <h1>اعثر على البرنامج الذي يستحق أسبوعًا من وقتك.</h1>
        <p class="lede">يفهرس «مسار» البرامج التنفيذية من كليات إدارة الأعمال حول العالم —
          صفِّ النتائج حسب التخصّص والمنطقة ونمط الدراسة ولغة التدريس والرسوم، ثم تواصل مع الكلية مباشرة.
          بلا حساب، وبلا بيع لبياناتك، وبلا تصنيفات مصطنعة.</p>

        <form class="hero-search" action="courses.html" method="get" role="search">
          <div class="field">
            <label for="q">البحث</label>
            <input id="q" name="q" type="search" placeholder="برنامج أو تخصّص أو كلية" autocomplete="off">
          </div>
          <div class="field">
            <label for="subject">التخصّص</label>
            <select id="subject" name="subject" data-hero-subject></select>
          </div>
          <div class="field">
            <label for="region">المنطقة</label>
            <select id="region" name="region" data-hero-region></select>
          </div>
          <button class="btn btn--primary" type="submit">ابحث عن البرامج</button>
        </form>

        <div class="hero-stats">
          <div class="hero-stat"><div class="n" data-stat="courses">—</div><div class="l">برنامجًا مفهرسًا</div></div>
          <div class="hero-stat"><div class="n" data-stat="schools">—</div><div class="l">كلية أعمال</div></div>
          <div class="hero-stat"><div class="n" data-stat="countries">—</div><div class="l">دولة</div></div>
          <div class="hero-stat"><div class="n" data-stat="subjects">—</div><div class="l">مجالًا تخصّصيًا</div></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">مختارات</span>
            <h2 class="h2">برامج تستحق نظرة ثانية</h2>
            <p>اختارها فريق التحرير لعمق محتواها وجودة تدريسها — لا مقابل رسوم إدراج.</p>
          </div>
          <a class="link-arrow" href="courses.html">كل البرامج <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-featured></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">حسب التخصّص</span>
            <h2 class="h2">ابدأ ممّا تحتاج إلى تعلّمه</h2>
          </div>
        </div>
        <div class="subject-grid" data-home-subjects></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">تبدأ قريبًا</span>
            <h2 class="h2">أقرب الدفعات</h2>
            <p>مرتّبة حسب تاريخ البدء، لتعرف ما الذي ما زال بإمكانك اللحاق به.</p>
          </div>
          <a class="link-arrow" href="courses.html?sort=date">استعرض المواعيد <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-upcoming></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">مجموعات</span>
            <h2 class="h2">اختيارات فريق التحرير</h2>
            <p>مجمّعة حسب السؤال الذي يأتي به الزائر فعلًا، لا حسب الترتيب الأبجدي.</p>
          </div>
          <a class="link-arrow" href="lists.html">كل المجموعات <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-lists></div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow">كيف يعمل «مسار»</span>
          <h2 class="h2">دليل لا يبيعك لأحد.</h2>
          <p class="lede" style="margin-block-start:14px">معظم أدلّة البرامج التدريبية هي في حقيقتها
            شركات لجمع بيانات العملاء المحتملين ترتدي ثوبًا تحريريًا. هذا الموقع بُني على العكس تمامًا.</p>
          <blockquote class="quote" style="margin-block-start:26px">
            وجود أي برنامج هنا سببه أنه يستحق مكانه في الدليل — لا أن أحدًا دفع مقابل هذا الموضع.
            <footer>— سياسة التحرير في جملة واحدة</footer>
          </blockquote>
        </div>
        <ol class="step-list">
          <li>
            <div>
              <h3>ابحث بلا حساب</h3>
              <p>كل أدوات التصفية وكل البرامج وكل الرسوم ظاهرة دون تسجيل أي بيانات.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>قارن بما يهمّ فعلًا</h3>
              <p>الرسوم وعدد الأيام ونمط الدراسة ولغة التدريس وتاريخ البدء — في كل بطاقة،
                 وفي الموضع نفسه، لتصبح المقارنة مسألة ثوانٍ.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>احفظ قائمتك المختارة</h3>
              <p>اجمع ما يعجبك في قائمة واحدة أثناء التصفّح. تبقى القائمة في متصفّحك وحده، ولا نطّلع عليها.</p>
            </div>
          </li>
          <li>
            <div>
              <h3>تواصل مع الكلية مباشرة</h3>
              <p>تذهب استفساراتك إلى الجهة التي تقدّم البرنامج، ولا يُعاد بيع بياناتك لأي طرف.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">المؤسسات</span>
            <h2 class="h2">الكليات المدرجة في الدليل</h2>
          </div>
          <a class="link-arrow" href="schools.html">كل الكليات <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="subject-grid" data-home-schools></div>
      </div>
    </section>
"""

COURSES = {}

COURSES["en"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">The index</span>
        <h1 class="h2" style="margin-block:10px 12px">Executive courses</h1>
        <p class="lede">Every programme in the index, with the fee, the number of teaching days and the
          language of instruction on the card. Filters update the address bar, so a filtered view is a
          link you can send to someone.</p>

        <form role="search" style="margin-block-start:24px;max-width:560px">
          <label class="sr-only" for="cat-q">Search courses</label>
          <input id="cat-q" type="search" data-catalogue-search placeholder="Course, subject or school"
                 style="width:100%;padding:14px 18px;border-radius:999px;border:1px solid var(--line-firm);background:var(--surface)">
        </form>
      </div>
    </section>

    <section class="section--tight" style="padding-block-start:8px">
      <div class="container catalogue">
        <aside class="filters" data-filters aria-label="Filters">
          <div class="filters__head">
            <h2>Refine</h2>
            <button class="btn btn--sm btn--ghost" type="button" data-filters-close>Done</button>
          </div>
          <div data-filter-body></div>
          <button class="btn btn--primary btn--block filters__done" type="button" data-filters-close>Show results</button>
        </aside>

        <div>
          <div class="results-bar">
            <p class="results-count" data-results-count aria-live="polite">—</p>
            <div class="results-tools">
              <button class="btn btn--ghost btn--sm filters-toggle" type="button" data-filters-open>Filters</button>
              <label class="sr-only" for="sort">Sort by</label>
              <select class="select" id="sort" data-sort>
                <option value="date">Starting soonest</option>
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="priceAsc">Fee: low to high</option>
                <option value="priceDesc">Fee: high to low</option>
              </select>
            </div>
          </div>
          <div class="active-filters" data-active-filters></div>
          <div class="card-grid" data-results></div>
        </div>
      </div>
    </section>
"""

COURSES["ar"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">الدليل</span>
        <h1 class="h2" style="margin-block:10px 12px">البرامج التنفيذية</h1>
        <p class="lede">كل برنامج في الدليل، وأمامه الرسوم وعدد أيام التدريس ولغة التدريس على البطاقة نفسها.
          تُحدِّث أدوات التصفية عنوان الصفحة، فتصبح أي نتيجة مصفّاة رابطًا يمكنك إرساله إلى غيرك.</p>

        <form role="search" style="margin-block-start:24px;max-width:560px">
          <label class="sr-only" for="cat-q">ابحث في البرامج</label>
          <input id="cat-q" type="search" data-catalogue-search placeholder="برنامج أو تخصّص أو كلية"
                 style="width:100%;padding:14px 18px;border-radius:999px;border:1px solid var(--line-firm);background:var(--surface)">
        </form>
      </div>
    </section>

    <section class="section--tight" style="padding-block-start:8px">
      <div class="container catalogue">
        <aside class="filters" data-filters aria-label="أدوات التصفية">
          <div class="filters__head">
            <h2>تصفية النتائج</h2>
            <button class="btn btn--sm btn--ghost" type="button" data-filters-close>تم</button>
          </div>
          <div data-filter-body></div>
          <button class="btn btn--primary btn--block filters__done" type="button" data-filters-close>اعرض النتائج</button>
        </aside>

        <div>
          <div class="results-bar">
            <p class="results-count" data-results-count aria-live="polite">—</p>
            <div class="results-tools">
              <button class="btn btn--ghost btn--sm filters-toggle" type="button" data-filters-open>التصفية</button>
              <label class="sr-only" for="sort">ترتيب النتائج</label>
              <select class="select" id="sort" data-sort>
                <option value="date">الأقرب بدءًا</option>
                <option value="popular">الأكثر رواجًا</option>
                <option value="rating">الأعلى تقييمًا</option>
                <option value="priceAsc">الرسوم: من الأقل</option>
                <option value="priceDesc">الرسوم: من الأعلى</option>
              </select>
            </div>
          </div>
          <div class="active-filters" data-active-filters></div>
          <div class="card-grid" data-results></div>
        </div>
      </div>
    </section>
"""

COURSE = {}

COURSE["en"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="courses.html">Courses</a></li>
          <li aria-current="page" data-course-crumb>Course</li>
        </ol>
      </nav>
    </div>

    <div class="container" data-course-detail></div>

    <section class="section">
      <div class="container">
        <div class="section-head"><h2 class="h2">Similar programmes</h2></div>
        <div class="card-grid" data-similar></div>
      </div>
    </section>
"""

COURSE["ar"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="مسار التنقّل">
        <ol>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="courses.html">البرامج</a></li>
          <li aria-current="page" data-course-crumb>البرنامج</li>
        </ol>
      </nav>
    </div>

    <div class="container" data-course-detail></div>

    <section class="section">
      <div class="container">
        <div class="section-head"><h2 class="h2">برامج مشابهة</h2></div>
        <div class="card-grid" data-similar></div>
      </div>
    </section>
"""

SCHOOLS = {}

SCHOOLS["en"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">Institutions</span>
        <h1 class="h2" style="margin-block:10px 12px">Business schools</h1>
        <p class="lede">Every school with programmes in the index, with what it is actually known for —
          not a paragraph of marketing copy.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-block-start:22px" data-region-filter></div>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-schools></div>
      </div>
    </section>
"""

SCHOOLS["ar"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">المؤسسات</span>
        <h1 class="h2" style="margin-block:10px 12px">كليات إدارة الأعمال</h1>
        <p class="lede">كل كلية لها برامج في الدليل، ومعها ما تشتهر به فعلًا — لا فقرة من العبارات التسويقية.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-block-start:22px" data-region-filter></div>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-schools></div>
      </div>
    </section>
"""

SCHOOL = {}

SCHOOL["en"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="schools.html">Schools</a></li>
          <li aria-current="page" data-school-crumb>School</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-school-detail></div>
    </section>
"""

SCHOOL["ar"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="مسار التنقّل">
        <ol>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="schools.html">الكليات</a></li>
          <li aria-current="page" data-school-crumb>الكلية</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-school-detail></div>
    </section>
"""

LISTS = {}

LISTS["en"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">Collections</span>
        <h1 class="h2" style="margin-block:10px 12px">Editors' shortlists</h1>
        <p class="lede">Six questions people arrive with, each answered with a handful of programmes.
          These are editorial selections, not a ranking — nobody scored anything out of a hundred.</p>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-lists></div>
      </div>
    </section>
"""

LISTS["ar"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">مجموعات</span>
        <h1 class="h2" style="margin-block:10px 12px">اختيارات فريق التحرير</h1>
        <p class="lede">ستة أسئلة يأتي بها الزوّار عادةً، يجيب عن كلٍّ منها عدد محدود من البرامج.
          هذه اختيارات تحريرية لا تصنيفات — لم يُمنح أي برنامج درجة من مئة.</p>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-lists></div>
      </div>
    </section>
"""

LIST = {}

LIST["en"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="lists.html">Collections</a></li>
          <li aria-current="page" data-list-crumb>Collection</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-list-detail></div>
    </section>
"""

LIST["ar"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="مسار التنقّل">
        <ol>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="lists.html">المجموعات</a></li>
          <li aria-current="page" data-list-crumb>المجموعة</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-list-detail></div>
    </section>
"""

ABOUT = {}

ABOUT["en"] = """
    <section class="section">
      <div class="container" style="max-width:760px">
        <span class="eyebrow">About</span>
        <h1 class="display" style="margin-block:12px 18px">A course directory built the honest way round.</h1>
        <p class="lede">Masar started from a simple annoyance: searching for an executive programme means
          wading through directories that rank whoever paid the most, hide the fee until you hand over a
          phone number, and have no Arabic version worth the name.</p>

        <div class="prose" style="margin-block-start:32px">
          <h2 class="h3" style="margin-block:28px 10px">What this site does</h2>
          <p class="muted">It indexes executive programmes and lets you filter them on the things that
            decide the choice: subject, region, format, language of instruction, length and fee. Everything
            is visible without an account, and a filtered result is a shareable link.</p>

          <h2 class="h3" style="margin-block:28px 10px">How listings are chosen</h2>
          <p class="muted">Editorially. Position in a list or a collection is never for sale, and there is
            no paid placement tier. The collections are labelled as editorial selections rather than
            rankings, because assigning a score out of a hundred to a four-day negotiation course would be
            an invention.</p>

          <h2 class="h3" style="margin-block:28px 10px">Arabic, properly</h2>
          <p class="muted">The Arabic site is not the English site run through a translation API. It is
            written copy, a right-to-left layout built from the same stylesheet, Arabic plural forms for
            counts, and localised dates and numbers. Both languages read from one catalogue, so a course
            can never exist in one language and quietly disappear in the other.</p>

          <h2 class="h3" style="margin-block:28px 10px">Privacy</h2>
          <p class="muted">There is no tracking script on this site and no analytics. Your shortlist is
            stored in your own browser's local storage and never leaves the device. Enquiries go to the
            school running the programme.</p>

          <div class="notice" style="margin-block-start:32px">
            <div>
              <strong>This is a portfolio project.</strong>
              The schools, programmes, dates, fees and reviews on this site are invented sample data,
              written to demonstrate the interface. No real institution is described here, and nothing on
              the site should be treated as a real course offering.
            </div>
          </div>
        </div>

        <div style="margin-block-start:34px;display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn btn--primary" href="courses.html">Browse the index</a>
          <a class="btn btn--ghost" href="contact.html">Get in touch</a>
        </div>
      </div>
    </section>
"""

ABOUT["ar"] = """
    <section class="section">
      <div class="container" style="max-width:760px">
        <span class="eyebrow">عن مسار</span>
        <h1 class="display" style="margin-block:12px 18px">دليل برامج مبني بالطريقة الصادقة.</h1>
        <p class="lede">بدأ «مسار» من انزعاج بسيط: البحث عن برنامج تنفيذي يعني التنقّل بين أدلّة تُصدِّر
          من يدفع أكثر، وتُخفي الرسوم حتى تترك رقم هاتفك، وليس لها نسخة عربية تستحق هذا الاسم.</p>

        <div class="prose" style="margin-block-start:32px">
          <h2 class="h3" style="margin-block:28px 10px">ماذا يفعل هذا الموقع</h2>
          <p class="muted">يفهرس البرامج التنفيذية ويتيح تصفيتها وفق ما يحسم القرار فعلًا: التخصّص والمنطقة
            ونمط الدراسة ولغة التدريس والمدّة والرسوم. كل شيء ظاهر دون حساب، وأي نتيجة مصفّاة رابط قابل للمشاركة.</p>

          <h2 class="h3" style="margin-block:28px 10px">كيف تُختار البرامج</h2>
          <p class="muted">تحريريًا. الموضع في أي قائمة أو مجموعة غير معروض للبيع، ولا توجد فئة إدراج مدفوعة.
            وقد وُصفت المجموعات بأنها اختيارات تحريرية لا تصنيفات، لأن منح برنامج تفاوض مدّته أربعة أيام درجةً
            من مئة سيكون محض اختلاق.</p>

          <h2 class="h3" style="margin-block:28px 10px">العربية كما ينبغي</h2>
          <p class="muted">النسخة العربية ليست ترجمة آلية للنسخة الإنجليزية. هي نصوص مكتوبة، وتخطيط من اليمين
            إلى اليسار مبني من ملف التنسيق نفسه، وصيغ جمع عربية صحيحة للأعداد، وتواريخ وأرقام موطّنة.
            وتقرأ اللغتان من دليل واحد، فلا يمكن أن يوجد برنامج بلغة ويختفي بهدوء في الأخرى.</p>

          <h2 class="h3" style="margin-block:28px 10px">الخصوصية</h2>
          <p class="muted">لا يوجد في هذا الموقع أي برنامج تتبّع أو تحليلات. تُحفظ قائمتك المختارة في التخزين
            المحلي لمتصفّحك ولا تغادر جهازك. وتذهب الاستفسارات إلى الكلية التي تقدّم البرنامج.</p>

          <div class="notice" style="margin-block-start:32px">
            <div>
              <strong>هذا مشروع شخصي لعرض العمل.</strong>
              الكليات والبرامج والتواريخ والرسوم والتقييمات في هذا الموقع بيانات تجريبية مُختلقة،
              كُتبت لعرض الواجهة فحسب. لا يصف الموقع أي مؤسسة حقيقية، ولا ينبغي التعامل مع أي محتوى فيه
              على أنه عرض تدريبي فعلي.
            </div>
          </div>
        </div>

        <div style="margin-block-start:34px;display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn btn--primary" href="courses.html">تصفّح الدليل</a>
          <a class="btn btn--ghost" href="contact.html">تواصل معنا</a>
        </div>
      </div>
    </section>
"""

CONTACT = {}

CONTACT["en"] = """
    <section class="section">
      <div class="container split" style="align-items:start">
        <div>
          <span class="eyebrow">Contact</span>
          <h1 class="h2" style="margin-block:12px 16px">Ask about a programme</h1>
          <p class="lede">Tell us which course you are considering and what you need to know. Enquiries are
            passed to the school running the programme — your details are not sold to anyone else.</p>

          <div class="notice" style="margin-block-start:26px">
            <div>
              <strong>Demo form.</strong>
              This is a portfolio project with no backend attached, so nothing is transmitted or stored
              when you submit. Wire it to a form endpoint before using it for real.
            </div>
          </div>

          <h2 class="h3" style="margin-block:34px 12px">Listing a course</h2>
          <p class="muted">Schools can suggest a programme for the index at no cost. Inclusion is an
            editorial decision and position is never for sale.</p>
        </div>

        <form class="form-grid" data-contact-form novalidate
              style="background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:26px">
          <div class="field-block">
            <label for="name">Your name</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field-block">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field-block field-block--wide">
            <label for="course">Course you are asking about</label>
            <select id="course" name="course" data-course-select></select>
          </div>
          <div class="field-block field-block--wide">
            <label for="message">Your question</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <div class="field-block field-block--wide">
            <button class="btn btn--primary" type="submit">Send enquiry</button>
            <p class="form-note" style="margin-block-start:10px">We reply within two working days.</p>
            <p class="notice" data-form-status tabindex="-1" hidden style="margin-block-start:14px">
              <span><strong>Thank you — in a live version this would now be with the school.</strong>
              This demo does not transmit anything.</span>
            </p>
          </div>
        </form>
      </div>
    </section>
"""

CONTACT["ar"] = """
    <section class="section">
      <div class="container split" style="align-items:start">
        <div>
          <span class="eyebrow">تواصل معنا</span>
          <h1 class="h2" style="margin-block:12px 16px">اسأل عن برنامج</h1>
          <p class="lede">أخبرنا بالبرنامج الذي تفكّر فيه وبما تريد معرفته. تُحال الاستفسارات إلى الكلية
            التي تقدّم البرنامج — ولا تُباع بياناتك لأي جهة أخرى.</p>

          <div class="notice" style="margin-block-start:26px">
            <div>
              <strong>نموذج تجريبي.</strong>
              هذا مشروع شخصي بلا خادم متصل، فلا يُرسَل أو يُحفَظ أي شيء عند الإرسال.
              اربطه بخدمة استقبال نماذج قبل استخدامه فعليًا.
            </div>
          </div>

          <h2 class="h3" style="margin-block:34px 12px">إدراج برنامج</h2>
          <p class="muted">يمكن للكليات اقتراح برنامج لإدراجه في الدليل مجانًا. الإدراج قرار تحريري،
            والموضع غير معروض للبيع.</p>
        </div>

        <form class="form-grid" data-contact-form novalidate
              style="background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:26px">
          <div class="field-block">
            <label for="name">الاسم</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field-block">
            <label for="email">البريد الإلكتروني</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field-block field-block--wide">
            <label for="course">البرنامج محلّ الاستفسار</label>
            <select id="course" name="course" data-course-select></select>
          </div>
          <div class="field-block field-block--wide">
            <label for="message">سؤالك</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <div class="field-block field-block--wide">
            <button class="btn btn--primary" type="submit">أرسل الاستفسار</button>
            <p class="form-note" style="margin-block-start:10px">نردّ خلال يومَي عمل.</p>
            <p class="notice" data-form-status tabindex="-1" hidden style="margin-block-start:14px">
              <span><strong>شكرًا لك — في النسخة الفعلية كان استفسارك سيصل الآن إلى الكلية.</strong>
              هذه النسخة التجريبية لا ترسل أي بيانات.</span>
            </p>
          </div>
        </form>
      </div>
    </section>
"""

PAGES = [
    {
        "file": "index.html", "body": HOME,
        "title": {"en": "Masar — find executive courses worldwide",
                  "ar": "مسار — دليل البرامج التنفيذية حول العالم"},
        "desc": {"en": "Search executive education programmes from business schools worldwide by subject, "
                       "region, format, language and fee. Free, bilingual and free of paid placement.",
                 "ar": "ابحث في برامج التعليم التنفيذي من كليات إدارة الأعمال حول العالم حسب التخصّص "
                       "والمنطقة ونمط الدراسة واللغة والرسوم. مجاني وثنائي اللغة وبلا إدراج مدفوع."},
    },
    {
        "file": "courses.html", "body": COURSES,
        "title": {"en": "Executive courses | Masar", "ar": "البرامج التنفيذية | مسار"},
        "desc": {"en": "Filter executive programmes by subject, region, format, language of instruction, "
                       "duration and fee.",
                 "ar": "صفِّ البرامج التنفيذية حسب التخصّص والمنطقة ونمط الدراسة ولغة التدريس والمدّة والرسوم."},
    },
    {
        "file": "course.html", "body": COURSE,
        "title": {"en": "Course | Masar", "ar": "البرنامج | مسار"},
        "desc": {"en": "Programme details, fee, dates and the school behind it.",
                 "ar": "تفاصيل البرنامج والرسوم والمواعيد والكلية التي تقدّمه."},
    },
    {
        "file": "schools.html", "body": SCHOOLS,
        "title": {"en": "Business schools | Masar", "ar": "كليات إدارة الأعمال | مسار"},
        "desc": {"en": "The business schools with executive programmes in the Masar index.",
                 "ar": "كليات إدارة الأعمال التي لها برامج تنفيذية في دليل مسار."},
    },
    {
        "file": "school.html", "body": SCHOOL,
        "title": {"en": "School | Masar", "ar": "الكلية | مسار"},
        "desc": {"en": "School profile and every programme it offers in the index.",
                 "ar": "ملف الكلية وكل برامجها المدرجة في الدليل."},
    },
    {
        "file": "lists.html", "body": LISTS,
        "title": {"en": "Collections | Masar", "ar": "المجموعات | مسار"},
        "desc": {"en": "Editorial shortlists of executive programmes, grouped by what people are actually asking.",
                 "ar": "اختيارات تحريرية للبرامج التنفيذية، مجمّعة حسب ما يبحث عنه الناس فعلًا."},
    },
    {
        "file": "list.html", "body": LIST,
        "title": {"en": "Collection | Masar", "ar": "المجموعة | مسار"},
        "desc": {"en": "An editorial shortlist of executive programmes.",
                 "ar": "قائمة تحريرية مختارة من البرامج التنفيذية."},
    },
    {
        "file": "about.html", "body": ABOUT,
        "title": {"en": "About Masar", "ar": "عن مسار"},
        "desc": {"en": "Why Masar exists, how listings are chosen, and what the Arabic site actually is.",
                 "ar": "لماذا وُجد «مسار»، وكيف تُختار البرامج، وما هي النسخة العربية فعلًا."},
    },
    {
        "file": "contact.html", "body": CONTACT,
        "title": {"en": "Contact | Masar", "ar": "تواصل معنا | مسار"},
        "desc": {"en": "Ask about a programme or suggest a course for the index.",
                 "ar": "اسأل عن برنامج أو اقترح إضافة برنامج إلى الدليل."},
    },
]


def main():
    os.makedirs(os.path.join(HERE, "ar"), exist_ok=True)
    written = []
    for page in PAGES:
        for lang in LOCALES:
            html = shell(
                lang=lang,
                page=page["file"],
                title=page["title"][lang],
                description=page["desc"][lang],
                body=page["body"][lang].rstrip("\n"),
            )
            out = os.path.join(HERE, page["file"]) if lang == "en" \
                else os.path.join(HERE, "ar", page["file"])
            with open(out, "w", encoding="utf-8") as fh:
                fh.write(html)
            written.append(os.path.relpath(out, HERE))
    print("Wrote {} pages:".format(len(written)))
    for path in written:
        print("  " + path)


if __name__ == "__main__":
    main()
