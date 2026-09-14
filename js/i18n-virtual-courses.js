/* EMFT — virtual courses page, English/Arabic strings.
   Registered with the site-wide translator in js/i18n.js.
   The vc19–vc29 labels are also read by js/virtual-courses.js, which builds
   the schedule rows, so a key removed here breaks a row there. */
(function () {
  'use strict';
  if (!window.EMFT_I18N) return;
  window.EMFT_I18N.register({
    en: {
      vc1: 'Virtual Courses',
      vc2: 'Open courses, run live online.',
      vc3: 'Scheduled sessions you can join as an individual or a small team, taught live by the same practitioners who deliver our in-house programs, in English or Arabic. Dates appear here as they are confirmed.',

      vc4: 'How a virtual course runs',
      vc5: 'Live, not recorded',
      vc6: 'Every session is taught in real time, so you can ask questions and work through cases with the trainer rather than watch a video.',
      vc7: 'Practitioner-led',
      vc8: 'The same trainers who deliver our programs inside banks, central banks, sovereign wealth funds and regulators.',
      vc9: 'Short daily windows',
      vc10: 'Sessions run in half-day blocks, so a course fits around the working week instead of replacing it.',
      vc11: 'Materials and certificate',
      vc12: 'Slides, references and exercises come through the Learning Portal, with a certificate of completion at the end.',

      vc13: 'What is coming up',
      vc14: 'Scheduled sessions.',
      vc15: 'Places on each session are limited, so the group stays small enough to work through cases properly.',
      vc16: 'No open sessions are scheduled right now.',
      vc17: 'New dates are published here as soon as they are confirmed. Tell us which course you need and we will let you know when it next runs, or schedule it privately for your team on dates that suit you.',
      vc18: 'Ask about dates',

      vc19: 'Dates',
      vc20: 'Daily',
      vc21: 'Fee',
      vc22: 'Fee on request',
      vc23: 'Register and pay',
      vc24: 'Request a place',
      vc25: 'Places open',
      vc26: 'Filling up',
      vc27: 'Waitlist only',
      vc28: 'Fully booked',
      vc29: 'per participant',

      vc30: 'Not on the list?',
      vc31: 'Any program in the catalog can run virtually.',
      vc32: 'Every program we offer is delivered in person, virtually or blended, in English or Arabic. If the course you need has no open date, we will schedule it privately for your team.',
      vc33: 'Browse the catalog',
      vc34: 'Discuss Your Requirements',
      vc35: 'Payment is handled by Stripe. Card details are entered on Stripe’s own secure page and never reach this website.',

      vc36: 'Which course does your team need next?',
      vc37: 'Tell us the topic and who it is for, and we will come back with dates, a fee and an outline.',
      vc38: 'Contact Us',

      vc39: 'Session schedule'
    },
    ar: {
      vc1: 'الدورات الافتراضية',
      vc2: 'دورات مفتوحة تُقدَّم مباشرةً عبر الإنترنت.',
      vc3: 'جلسات مجدولة يمكنك الانضمام إليها فرداً أو ضمن فريق صغير، يقدّمها المدرّبون الممارسون أنفسهم الذين ينفّذون برامجنا داخل المؤسسات، بالإنجليزية أو العربية. وتظهر المواعيد هنا فور تأكيدها.',

      vc4: 'كيف تُقدَّم الدورة الافتراضية',
      vc5: 'مباشرة لا مسجّلة',
      vc6: 'تُقدَّم كل جلسة في وقتها الحقيقي، فتطرح أسئلتك وتعمل على الحالات مع المدرّب بدل أن تشاهد تسجيلاً.',
      vc7: 'يقودها ممارسون',
      vc8: 'المدرّبون أنفسهم الذين ينفّذون برامجنا داخل البنوك والبنوك المركزية وصناديق الثروة السيادية والجهات الرقابية.',
      vc9: 'فترات يومية قصيرة',
      vc10: 'تُقدَّم الجلسات في فترات نصف يومية، فتتلاءم الدورة مع أسبوع العمل بدل أن تحلّ محله.',
      vc11: 'مواد وشهادة',
      vc12: 'تصلك الشرائح والمراجع والتمارين عبر منصة التعلّم، مع شهادة إتمام في نهاية الدورة.',

      vc13: 'ما هو قادم',
      vc14: 'الجلسات المجدولة.',
      vc15: 'عدد المقاعد في كل جلسة محدود، ليبقى عدد المشاركين صغيراً بما يكفي للعمل على الحالات كما ينبغي.',
      vc16: 'لا توجد جلسات مفتوحة مجدولة حالياً.',
      vc17: 'تُنشر المواعيد الجديدة هنا فور تأكيدها. أخبرنا بالدورة التي تحتاجها وسنُعلمك بموعدها القادم، أو نجدولها خصيصاً لفريقك في المواعيد التي تناسبك.',
      vc18: 'اسأل عن المواعيد',

      vc19: 'المواعيد',
      vc20: 'يومياً',
      vc21: 'الرسوم',
      vc22: 'الرسوم عند الطلب',
      vc23: 'سجّل وادفع',
      vc24: 'اطلب مقعداً',
      vc25: 'مقاعد متاحة',
      vc26: 'المقاعد تُحجز سريعاً',
      vc27: 'قائمة انتظار فقط',
      vc28: 'اكتمل العدد',
      vc29: 'للمشارك الواحد',

      vc30: 'لم تجد ما تبحث عنه؟',
      vc31: 'كل برنامج في الدليل يمكن تقديمه افتراضياً.',
      vc32: 'تُقدَّم جميع برامجنا حضورياً أو افتراضياً أو بشكل مدمج، بالإنجليزية أو العربية. وإن لم يكن للدورة التي تحتاجها موعد مفتوح، جدولناها خصيصاً لفريقك.',
      vc33: 'تصفّح الدليل',
      vc34: 'ناقش متطلباتك',
      vc35: 'تتم المدفوعات عبر Stripe. وتُدخَل بيانات البطاقة في صفحة Stripe الآمنة ولا تصل إلى هذا الموقع إطلاقاً.',

      vc36: 'ما الدورة التي يحتاجها فريقك بعد ذلك؟',
      vc37: 'أخبرنا بالموضوع وبمن هي موجَّهة إليه، وسنعود إليك بالمواعيد والرسوم والمخطط.',
      vc38: 'تواصل معنا',

      vc39: 'جدول الجلسات'
    }
  });
})();
