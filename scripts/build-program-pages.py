#!/usr/bin/env python3
"""Generate the flagship program detail pages, in both languages.

Each entry in PROGRAMS produces program-<slug>.html plus its translation
dictionary js/i18n-program-<slug>.js from the same data, so the two can never
disagree. The HTML ships with the English text (that is what search engines
index) and the dictionary carries both sides for the site-wide toggle.

Run after editing, then re-splice the shared chrome:

    python3 scripts/build-program-pages.py
    python3 scripts/build-chrome.py
"""

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://www.emergingmarketft.com/"

# slug -> content. Every *pair* field is (english, arabic).
PROGRAMS = [
 {
  "slug": "agentic-ai",
  "interest": "AI, Data and Cybersecurity",
  "tag": ("Agentic AI", "الذكاء الاصطناعي الوكيل"),
  "title": ("Agentic AI for Professionals", "الذكاء الاصطناعي الوكيل للمهنيين"),
  "meta": "Hands-on agentic AI training for banks, regulators and corporates — put AI agents to work in real workflows, scoped, supervised and in policy.",
  "lede": ("Move beyond chat prompts. This program teaches professionals to design, supervise and govern AI agents that carry out real work — research, drafting, analysis and multi-step workflows — inside your institution's policies.",
           "تجاوز مرحلة المحادثة مع النماذج. يعلّم هذا البرنامج المهنيين تصميم وكلاء الذكاء الاصطناعي والإشراف عليهم وحوكمتهم لينفّذوا عملاً حقيقياً — بحثاً وصياغة وتحليلاً ومسارات عمل متعددة الخطوات — ضمن سياسات مؤسستك."),
  "duration": ("2–3 days, customized", "يومان إلى ثلاثة أيام، حسب الطلب"),
  "level": ("Intermediate — no coding required", "متوسط — لا يتطلب برمجة"),
  "audience": [
    ("Business and support teams who want AI to take work off their desks", "فرق الأعمال والدعم الراغبة في أن يتولى الذكاء الاصطناعي جزءاً من أعمالها"),
    ("Managers deciding where agents are safe to deploy — and where they are not", "المديرون الذين يقررون أين يكون نشر الوكلاء آمناً — وأين لا يكون"),
    ("Risk, compliance and audit staff who must supervise AI-assisted work", "موظفو المخاطر والامتثال والتدقيق المكلفون بالإشراف على العمل المدعوم بالذكاء الاصطناعي"),
    ("Innovation and transformation teams piloting agentic workflows", "فرق الابتكار والتحول التي تجرّب مسارات عمل وكيلة"),
  ],
  "outcomes": [
    ("Understand what an AI agent is, and how it differs from a chatbot", "فهم ماهية وكيل الذكاء الاصطناعي وكيف يختلف عن روبوت المحادثة"),
    ("Break real tasks from your own desk into agent-ready workflows", "تفكيك مهام حقيقية من عملك اليومي إلى مسارات جاهزة للوكلاء"),
    ("Write instructions, guardrails and checkpoints that keep agents in policy", "كتابة التعليمات والضوابط ونقاط المراجعة التي تُبقي الوكلاء ضمن السياسات"),
    ("Review and quality-check agent output before it reaches a client or a regulator", "مراجعة مخرجات الوكلاء والتحقق من جودتها قبل وصولها إلى عميل أو جهة رقابية"),
    ("Build a business case for your first supervised agent deployment", "بناء دراسة جدوى لأول نشر خاضع للإشراف لوكيل ذكاء اصطناعي"),
  ],
  "modules": [
    ("From prompts to agents", "What changes when AI plans and executes multi-step work, with your institution's examples.",
     "من الأوامر إلى الوكلاء", "ما الذي يتغير حين يخطط الذكاء الاصطناعي وينفّذ عملاً متعدد الخطوات، بأمثلة من مؤسستك."),
    ("Anatomy of a safe workflow", "Scoping, tool access, human checkpoints and escalation paths.",
     "تشريح مسار عمل آمن", "تحديد النطاق، وصلاحيات الأدوات، ونقاط المراجعة البشرية، ومسارات التصعيد."),
    ("Hands-on build", "Participants automate a task from their own role, end to end, under supervision.",
     "تطبيق عملي", "يؤتمت المشاركون مهمة من أدوارهم الفعلية، من البداية إلى النهاية، تحت إشراف."),
    ("Governance and policy", "Model risk, data boundaries, auditability and what your regulator will ask.",
     "الحوكمة والسياسات", "مخاطر النماذج، وحدود البيانات، وقابلية التدقيق، وما ستسأل عنه جهتك الرقابية."),
    ("Failure modes", "Hallucination, drift and over-delegation — how to catch each before it costs you.",
     "أنماط الإخفاق", "الهلوسة والانحراف والتفويض المفرط — وكيف تكتشف كلاً منها قبل أن يكلّفك."),
    ("Your 90-day plan", "Each participant leaves with a scoped, supervised first deployment.",
     "خطتك لتسعين يوماً", "يغادر كل مشارك بخطة نشر أولى محددة النطاق وخاضعة للإشراف."),
  ],
 },
 {
  "slug": "financial-modelling",
  "interest": "Technical Training",
  "tag": ("Technical", "فني"),
  "title": ("Financial Modelling in Excel, VBA & Power BI", "النمذجة المالية في Excel وVBA وPower BI"),
  "meta": "Practitioner-led financial modelling training — build Excel, VBA and Power BI models that survive review and drive decisions. Delivered across the Gulf.",
  "lede": ("Build models that survive review. A hands-on program taking participants from disciplined spreadsheet structure through automation in VBA to decision-ready dashboards in Power BI — on cases from your own market.",
           "ابنِ نماذج تصمد أمام المراجعة. برنامج تطبيقي ينقل المشاركين من البناء المنضبط لجداول البيانات، إلى الأتمتة بلغة VBA، وصولاً إلى لوحات قرار جاهزة في Power BI — على حالات من سوقك أنت."),
  "duration": ("4–5 days, customized", "أربعة إلى خمسة أيام، حسب الطلب"),
  "level": ("Intermediate to advanced", "متوسط إلى متقدم"),
  "audience": [
    ("Financial analysts building valuation, budgeting and forecasting models", "المحللون الماليون الذين يبنون نماذج التقييم والموازنة والتنبؤ"),
    ("Credit and investment teams who must defend their numbers", "فرق الائتمان والاستثمار المطالبة بالدفاع عن أرقامها"),
    ("Finance departments standardizing how models are built and reviewed", "إدارات المالية التي توحّد طريقة بناء النماذج ومراجعتها"),
    ("Anyone inheriting spreadsheets they did not build — and must now trust", "كل من ورث جداول بيانات لم يبنِها — وعليه الآن أن يثق بها"),
  ],
  "outcomes": [
    ("Structure models so an outsider can audit them in minutes, not days", "بناء النماذج بحيث يدقّقها شخص خارجي في دقائق لا أيام"),
    ("Build integrated three-statement, valuation and scenario models", "بناء نماذج متكاملة للقوائم الثلاث والتقييم والسيناريوهات"),
    ("Automate the repetitive work with VBA without creating black boxes", "أتمتة العمل المتكرر بـ VBA دون خلق صناديق سوداء"),
    ("Turn model output into Power BI dashboards management actually reads", "تحويل مخرجات النماذج إلى لوحات Power BI تقرؤها الإدارة فعلاً"),
    ("Find the errors in a model you have never seen before", "اكتشاف الأخطاء في نموذج لم تره من قبل"),
  ],
  "modules": [
    ("Model architecture", "Inputs, engine, outputs — the discipline that makes everything after it possible.",
     "هندسة النموذج", "المدخلات والمحرك والمخرجات — الانضباط الذي يجعل كل ما بعده ممكناً."),
    ("The three-statement core", "A full income statement, balance sheet and cash flow model, built live.",
     "نواة القوائم الثلاث", "نموذج كامل لقائمة الدخل والمركز المالي والتدفقات النقدية، يُبنى مباشرة."),
    ("Valuation and scenarios", "DCF, sensitivities and scenario switches that stay honest under pressure.",
     "التقييم والسيناريوهات", "التدفقات المخصومة والحساسيات ومفاتيح السيناريوهات التي تبقى دقيقة تحت الضغط."),
    ("VBA that earns its place", "Recording, refactoring and writing macros a reviewer can follow.",
     "VBA يستحق مكانه", "تسجيل وحدات الماكرو وتحسينها وكتابتها بحيث يستطيع المراجع تتبعها."),
    ("Power BI for decisions", "From workbook to refreshable dashboard — measures, drill-downs and design.",
     "Power BI للقرارات", "من المصنف إلى لوحة قابلة للتحديث — المقاييس والتفاصيل التدريجية والتصميم."),
    ("Model review clinic", "Participants exchange models and audit each other's work, practitioner-led.",
     "عيادة مراجعة النماذج", "يتبادل المشاركون النماذج ويدقق بعضهم عمل بعض، بقيادة ممارس."),
  ],
 },
 {
  "slug": "cybersecurity",
  "interest": "AI, Data and Cybersecurity",
  "tag": ("Two tracks", "مساران"),
  "title": ("Cybersecurity — Defensive & Offensive Tracks", "الأمن السيبراني — المساران الدفاعي والهجومي"),
  "meta": "Cybersecurity training for financial institutions: blue-team defence to Security+, ISO 27001 and CCD, and penetration testing to eCPPT. Lab-based, practitioner-led.",
  "lede": ("Two lab-based tracks that build job-ready security capability: a defensive track running from security fundamentals to Security+, ISO 27001 and Certified CyberDefender, and an offensive track taking penetration testers to eCPPT.",
           "مساران قائمان على المختبرات يبنيان قدرات أمنية جاهزة للعمل: مسار دفاعي يمتد من أساسيات الأمن إلى شهادات Security+ وISO 27001 وCCD، ومسار هجومي يقود مختبري الاختراق إلى شهادة eCPPT."),
  "duration": ("3–12 months per track, cohort-based", "من ثلاثة إلى اثني عشر شهراً لكل مسار، على شكل دفعات"),
  "level": ("Foundation to certification", "من التأسيس إلى الشهادة"),
  "certs": ("CompTIA Security+ · ISO/IEC 27001 · Certified CyberDefender (CCD) · eCPPT (INE)", "CompTIA Security+ · ISO/IEC 27001 · CCD «المدافع السيبراني المعتمد» · eCPPT من INE"),
  "audience": [
    ("Graduates entering SOC, incident response and security operations roles", "الخريجون الملتحقون بأدوار مراكز العمليات الأمنية والاستجابة للحوادث"),
    ("IT staff moving into dedicated security positions", "موظفو تقنية المعلومات المنتقلون إلى وظائف أمنية متخصصة"),
    ("Institutions building an internal penetration-testing capability", "المؤسسات التي تبني قدرة داخلية لاختبار الاختراق"),
    ("Banks and regulators standing up or upskilling a cyber team", "البنوك والجهات الرقابية التي تؤسس فريقاً سيبرانياً أو ترفع كفاءته"),
  ],
  "outcomes": [
    ("Defend: monitor, detect and respond to incidents in a live lab environment", "الدفاع: المراقبة والكشف والاستجابة للحوادث في بيئة مختبرية حية"),
    ("Attack: run structured penetration tests and report findings professionally", "الهجوم: تنفيذ اختبارات اختراق منهجية وكتابة تقارير احترافية بنتائجها"),
    ("Pass the certification each track targets — our cohorts train to the exam", "اجتياز الشهادة التي يستهدفها كل مسار — فدفعاتنا تتدرب على الامتحان نفسه"),
    ("Apply banking-specific threat scenarios, not generic IT examples", "التعامل مع سيناريوهات تهديد مصرفية محددة، لا أمثلة تقنية عامة"),
    ("Screen and select candidates objectively when building a cohort", "فرز المرشحين واختيارهم بموضوعية عند بناء الدفعة"),
  ],
  "modules": [
    ("Security foundations", "Networks, systems and the attacker's view — the ground both tracks stand on.",
     "أسس الأمن", "الشبكات والأنظمة ومنظور المهاجم — الأرضية التي يقوم عليها المساران."),
    ("Defensive track: SOC operations", "Monitoring, SIEM, triage and incident response, hands-on.",
     "المسار الدفاعي: عمليات مركز الأمن", "المراقبة وإدارة سجلات الأحداث والفرز والاستجابة للحوادث، تطبيقياً."),
    ("Defensive track: standards", "Security+ and ISO/IEC 27001 — controls, audits and the certification exams.",
     "المسار الدفاعي: المعايير", "Security+ وISO/IEC 27001 — الضوابط والتدقيق وامتحانات الشهادتين."),
    ("Offensive track: methodology", "Reconnaissance to reporting — the discipline of a professional engagement.",
     "المسار الهجومي: المنهجية", "من الاستطلاع إلى كتابة التقرير — انضباط المهمة الاحترافية."),
    ("Offensive track: eCPPT labs", "Guided exploitation labs building to the practical certification exam.",
     "المسار الهجومي: مختبرات eCPPT", "مختبرات استغلال موجّهة تتصاعد نحو الامتحان العملي للشهادة."),
    ("Capstone exercise", "Blue and red teams face each other in a closing scenario built on your environment.",
     "التمرين الختامي", "يتواجه الفريقان الأزرق والأحمر في سيناريو ختامي مبني على بيئتك."),
  ],
 },
 {
  "slug": "relationship-management",
  "interest": "Relationship Management",
  "tag": ("Banking", "مصرفي"),
  "title": ("Relationship Management Excellence", "التميّز في إدارة العلاقات"),
  "meta": "Relationship management training for retail and corporate bankers — trusted-advisor conversations, portfolio growth and credit judgement, on your own products.",
  "lede": ("Turn account handlers into trusted advisors. A program for retail and corporate RMs that builds the conversations, the product knowledge and the portfolio discipline that grow wallet share without growing risk.",
           "حوّل مسؤولي الحسابات إلى مستشارين موثوقين. برنامج لمديري العلاقات في قطاعي الأفراد والشركات يبني الحوار والمعرفة بالمنتجات وانضباط المحفظة بما ينمّي حصة البنك من تعاملات العميل دون زيادة المخاطر."),
  "duration": ("3–4 days, customized", "ثلاثة إلى أربعة أيام، حسب الطلب"),
  "level": ("All RM levels — content split by segment", "جميع مستويات مديري العلاقات — بمحتوى مقسّم حسب الشريحة"),
  "audience": [
    ("Retail RMs moving from transactions to advice", "مديرو علاقات الأفراد المنتقلون من المعاملات إلى الاستشارة"),
    ("Corporate and SME RMs managing lending relationships", "مديرو علاقات الشركات والمنشآت الصغيرة والمتوسطة القائمون على علاقات التمويل"),
    ("Team leaders coaching RM performance", "قادة الفرق الذين يوجّهون أداء مديري العلاقات"),
    ("Branch networks in the middle of a sales-and-service transformation", "شبكات الفروع التي تمر بتحول في المبيعات والخدمة"),
  ],
  "outcomes": [
    ("Run a structured client conversation that uncovers needs before products", "إدارة حوار منظّم مع العميل يكشف الاحتياجات قبل عرض المنتجات"),
    ("Read financials well enough to talk credit with a corporate client", "قراءة القوائم المالية بما يكفي لمناقشة الائتمان مع عميل شركات"),
    ("Plan a portfolio: who to grow, who to hold, who to hand over", "تخطيط المحفظة: من تنمّيه، ومن تحافظ عليه، ومن تُحوّله"),
    ("Handle objections and pricing conversations without giving margin away", "معالجة الاعتراضات ومحادثات التسعير دون التفريط في الهامش"),
    ("Protect the relationship through complaints and difficult moments", "حماية العلاقة عبر الشكاوى واللحظات الصعبة"),
  ],
  "modules": [
    ("The trusted-advisor shift", "What separates an order-taker from an advisor, in your clients' own words.",
     "التحول إلى المستشار الموثوق", "ما الذي يفصل متلقي الطلبات عن المستشار، بكلمات عملائك أنفسهم."),
    ("The client conversation", "A repeatable structure for discovery, practiced on your real segments.",
     "الحوار مع العميل", "هيكل قابل للتكرار لاستكشاف الاحتياجات، يُتدرَّب عليه على شرائحك الفعلية."),
    ("Products in context", "Positioning your own product shelf against real client needs.",
     "المنتجات في سياقها", "تقديم منتجاتك أنت في مقابل احتياجات العملاء الحقيقية."),
    ("Credit for RMs", "Reading financials, structuring requests and working with credit teams.",
     "الائتمان لمديري العلاقات", "قراءة القوائم المالية وهيكلة الطلبات والعمل مع فرق الائتمان."),
    ("Portfolio management", "Segmentation, activity planning and growing share of wallet deliberately.",
     "إدارة المحفظة", "التقسيم وتخطيط النشاط وتنمية الحصة من تعاملات العميل عن قصد."),
    ("Live role-plays", "Recorded client meetings with practitioner feedback, on your cases.",
     "تمثيل أدوار حي", "اجتماعات عملاء مسجلة مع ملاحظات من ممارسين، على حالاتك أنت."),
  ],
 },
 {
  "slug": "customer-experience",
  "interest": "Leadership and Professional Skills",
  "tag": ("Customer", "العميل"),
  "title": ("Customer Experience & Journey Design", "تجربة العميل وتصميم رحلته"),
  "meta": "Customer experience and journey mapping training — design the journeys your customers value, fix the moments that lose them, and measure what changed.",
  "lede": ("Design the journey your customers actually value. A practical program that maps real journeys end to end, finds the moments that lose customers, and redesigns them — with the measurement to prove the change worked.",
           "صمّم الرحلة التي يقدّرها عملاؤك فعلاً. برنامج عملي يرسم رحلات حقيقية من البداية إلى النهاية، ويحدد اللحظات التي تخسر فيها العملاء، ويعيد تصميمها — مع القياس الذي يثبت أن التغيير نجح."),
  "duration": ("2–3 days, customized", "يومان إلى ثلاثة أيام، حسب الطلب"),
  "level": ("All levels — mixed teams work best", "جميع المستويات — والفرق المختلطة تحقق أفضل النتائج"),
  "audience": [
    ("CX, service quality and complaints teams", "فرق تجربة العميل وجودة الخدمة والشكاوى"),
    ("Product owners and digital teams redesigning journeys", "مالكو المنتجات والفرق الرقمية التي تعيد تصميم الرحلات"),
    ("Branch and contact-centre leadership", "قيادات الفروع ومراكز الاتصال"),
    ("Any corporate serving customers at scale — not just banks", "أي شركة تخدم عملاء على نطاق واسع — لا البنوك فقط"),
  ],
  "outcomes": [
    ("Map a real customer journey with its moments of truth and pain points", "رسم رحلة عميل حقيقية بلحظات الحقيقة ونقاط الألم فيها"),
    ("Use voice-of-customer data instead of internal assumptions", "استخدام بيانات صوت العميل بدلاً من الافتراضات الداخلية"),
    ("Redesign a broken moment and prototype the fix cheaply", "إعادة تصميم لحظة معطوبة وتجريب الحل بكلفة زهيدة"),
    ("Choose metrics — NPS, CES, CSAT — that match what you are fixing", "اختيار المقاييس — NPS وCES وCSAT — بما يناسب ما تعالجه"),
    ("Build the internal case for journey ownership across silos", "بناء الحجة الداخلية لملكية الرحلة عبر الإدارات المنعزلة"),
  ],
  "modules": [
    ("Journeys, not touchpoints", "Why fixing single interactions fails, and what end-to-end thinking changes.",
     "رحلات لا نقاط تماس", "لماذا يفشل إصلاح التفاعلات المنفردة، وما الذي يغيّره التفكير الشامل."),
    ("Mapping a live journey", "Teams map one of your real journeys, stage by stage, with real data.",
     "رسم رحلة حية", "ترسم الفرق إحدى رحلاتكم الفعلية، مرحلة بمرحلة، ببيانات حقيقية."),
    ("Voice of the customer", "Complaints, surveys and behaviour — reading what customers already told you.",
     "صوت العميل", "الشكاوى والاستبيانات والسلوك — قراءة ما سبق أن أخبرك به العملاء."),
    ("Redesign workshop", "Prioritizing the broken moments and prototyping fixes in the room.",
     "ورشة إعادة التصميم", "ترتيب اللحظات المعطوبة حسب الأولوية وتجريب الحلول داخل القاعة."),
    ("Measurement that matters", "Choosing and instrumenting the metric that will prove the change.",
     "قياس ذو معنى", "اختيار المقياس الذي سيثبت التغيير وتفعيله."),
    ("From map to roadmap", "Turning the workshop output into an owned, sequenced improvement plan.",
     "من الخريطة إلى خطة الطريق", "تحويل مخرجات الورشة إلى خطة تحسين مملوكة ومتسلسلة."),
  ],
 },
 {
  "slug": "data-science",
  "interest": "AI, Data and Cybersecurity",
  "tag": ("Technical", "فني"),
  "title": ("Data Science, Machine Learning & Analytics", "علم البيانات وتعلّم الآلة والتحليلات"),
  "meta": "Data science and machine learning training for financial institutions — from analytics foundations to models in production, taught by practitioners on banking data.",
  "lede": ("Turn raw data into decisions your management acts on. A practitioner-led pathway from analytics foundations through machine learning to models your institution can actually govern and deploy.",
           "حوّل البيانات الخام إلى قرارات تتحرك بها إدارتك. مسار بقيادة ممارسين يمتد من أسس التحليلات إلى تعلّم الآلة، وصولاً إلى نماذج تستطيع مؤسستك حوكمتها ونشرها فعلاً."),
  "duration": ("5 days to 6 months, by depth", "من خمسة أيام إلى ستة أشهر، حسب العمق"),
  "level": ("Foundation to specialist cohorts", "من التأسيس إلى دفعات المتخصصين"),
  "audience": [
    ("Analysts moving from reporting to modelling", "المحللون المنتقلون من إعداد التقارير إلى النمذجة"),
    ("Graduate cohorts entering data and AI roles", "دفعات الخريجين الملتحقين بأدوار البيانات والذكاء الاصطناعي"),
    ("Risk, finance and marketing teams sitting on unused data", "فرق المخاطر والمالية والتسويق التي تملك بيانات غير مستثمرة"),
    ("Managers who must challenge a model's output without building one", "المديرون المطالبون بمساءلة مخرجات النماذج دون أن يبنوها"),
  ],
  "outcomes": [
    ("Frame a business problem as an analytical one — the step most projects skip", "صياغة مشكلة العمل كمسألة تحليلية — الخطوة التي تتجاوزها معظم المشاريع"),
    ("Clean, explore and visualize data in Python with confidence", "تنظيف البيانات واستكشافها وتصويرها في Python بثقة"),
    ("Build, validate and interpret supervised learning models", "بناء نماذج التعلّم الموجَّه والتحقق منها وتفسيرها"),
    ("Know when a model is wrong, biased or drifting — and what to do", "معرفة متى يكون النموذج خاطئاً أو متحيزاً أو منحرفاً — وما العمل حينها"),
    ("Present analytical findings so decision-makers act on them", "عرض النتائج التحليلية بطريقة تدفع صنّاع القرار إلى التحرك"),
  ],
  "modules": [
    ("Thinking in data", "Problem framing, hypotheses and what 'good' looks like before any code.",
     "التفكير بالبيانات", "صياغة المشكلة والفرضيات وشكل النتيجة الجيدة قبل كتابة أي شيفرة."),
    ("Python foundations", "Pandas, visualization and the habits that keep analysis reproducible.",
     "أسس Python", "مكتبة Pandas والتصوير البياني والعادات التي تُبقي التحليل قابلاً للتكرار."),
    ("Machine learning core", "Regression, classification, validation and honest performance measurement.",
     "نواة تعلّم الآلة", "الانحدار والتصنيف والتحقق وقياس الأداء بأمانة."),
    ("Banking applications", "Credit scoring, churn, segmentation and fraud — on domain-realistic data.",
     "تطبيقات مصرفية", "التصنيف الائتماني وفقدان العملاء والتقسيم والاحتيال — على بيانات واقعية للقطاع."),
    ("Model governance", "Explainability, bias, monitoring and what regulators expect of models.",
     "حوكمة النماذج", "قابلية التفسير والتحيز والمراقبة وما تتوقعه الجهات الرقابية من النماذج."),
    ("Capstone project", "Teams take a dataset from question to presented recommendation.",
     "مشروع التخرج", "تنتقل الفرق ببيانات حقيقية من السؤال إلى توصية معروضة."),
  ],
 },
 {
  "slug": "bank-inspection",
  "interest": "Technical Training",
  "tag": ("Regulators", "جهات رقابية"),
  "title": ("Bank Inspection & Supervision", "التفتيش والرقابة المصرفية"),
  "meta": "Bank inspection and supervision training for central banks and regulators — phased, practitioner-led programs grounded in real supervisory casework.",
  "lede": ("Built for the teams that examine everyone else. A phased program for central bank inspectors and supervisors, grounded in real supervisory casework — the same design we delivered for a Gulf central bank's supervision teams.",
           "بُني للفرق التي تفحص الجميع. برنامج على مراحل لمفتشي ومشرفي البنوك المركزية، مبني على حالات رقابية واقعية — وهو التصميم نفسه الذي قدّمناه لفرق الرقابة في أحد البنوك المركزية الخليجية."),
  "duration": ("3 phases over 6–12 months", "ثلاث مراحل على مدى ستة إلى اثني عشر شهراً"),
  "level": ("New inspectors to senior supervisors", "من المفتشين الجدد إلى كبار المشرفين"),
  "audience": [
    ("Newly appointed bank inspectors and examiners", "مفتشو وفاحصو البنوك حديثو التعيين"),
    ("Supervision departments standardizing their methodology", "إدارات الرقابة التي توحّد منهجيتها"),
    ("Off-site analysts moving into on-site examination", "محللو الرقابة المكتبية المنتقلون إلى التفتيش الميداني"),
    ("Regulators extending financial analysis capability across departments", "الجهات الرقابية التي توسّع قدرات التحليل المالي عبر إداراتها"),
  ],
  "outcomes": [
    ("Plan and scope a risk-based examination", "تخطيط فحص قائم على المخاطر وتحديد نطاقه"),
    ("Analyze a bank's financials, asset quality and capital the way an examiner must", "تحليل القوائم المالية للبنك وجودة أصوله ورأس ماله كما يجب على الفاحص"),
    ("Assess governance, controls and risk management on site", "تقييم الحوكمة والضوابط وإدارة المخاطر ميدانياً"),
    ("Write findings that stand up to pushback from a bank's board", "كتابة ملاحظات تصمد أمام اعتراضات مجلس إدارة البنك"),
    ("Escalate proportionately — from observation to enforcement", "التصعيد بتناسب — من الملاحظة إلى الإجراء الرقابي"),
  ],
  "modules": [
    ("The supervisory framework", "Mandates, risk-based supervision and where inspection fits.",
     "الإطار الرقابي", "الصلاحيات والرقابة القائمة على المخاطر وموقع التفتيش منها."),
    ("Financial analysis for examiners", "CAMELS-style analysis on real (anonymized) bank financials.",
     "التحليل المالي للفاحصين", "تحليل على نمط CAMELS لقوائم مالية مصرفية حقيقية مجهولة المصدر."),
    ("On-site examination", "Planning, sampling, interviews and evidence — the fieldwork discipline.",
     "الفحص الميداني", "التخطيط والمعاينة والمقابلات والأدلة — انضباط العمل الميداني."),
    ("Credit and asset quality review", "File reviews, classification and provisioning judgement.",
     "مراجعة الائتمان وجودة الأصول", "مراجعة الملفات والتصنيف وتقدير المخصصات."),
    ("Findings and reporting", "Writing, defending and following up examination reports.",
     "الملاحظات والتقارير", "كتابة تقارير الفحص والدفاع عنها ومتابعتها."),
    ("Supervisory judgement cases", "Senior practitioners walk through real dilemmas phase by phase.",
     "حالات في الحكم الرقابي", "يستعرض ممارسون كبار معضلات حقيقية مرحلةً بمرحلة."),
  ],
 },
 {
  "slug": "credit-analysis",
  "interest": "Technical Training",
  "tag": ("Credit", "ائتمان"),
  "title": ("Corporate Lending & Credit Analysis", "الإقراض المؤسسي والتحليل الائتماني"),
  "meta": "Corporate credit analysis training for banks — cashflow-based lending judgement, structuring and credit writing, taught by practitioners on regional cases.",
  "lede": ("Lend on cashflow, not on collateral comfort. A practitioner-led program that builds the analysis, structuring and writing skills behind sound corporate credit decisions — on cases from your own market.",
           "أقرِض على أساس التدفقات النقدية، لا على طمأنينة الضمانات. برنامج بقيادة ممارسين يبني مهارات التحليل والهيكلة والكتابة التي تقف خلف قرارات الائتمان المؤسسي السليمة — على حالات من سوقك أنت."),
  "duration": ("4–5 days, customized", "أربعة إلى خمسة أيام، حسب الطلب"),
  "level": ("Analysts to credit committee members", "من المحللين إلى أعضاء لجان الائتمان"),
  "audience": [
    ("Credit analysts and corporate RMs preparing applications", "محللو الائتمان ومديرو علاقات الشركات الذين يعدّون الطلبات"),
    ("Credit review and approval teams", "فرق مراجعة الائتمان واعتماده"),
    ("Graduates entering corporate and SME banking", "الخريجون الملتحقون بقطاع الشركات والمنشآت الصغيرة والمتوسطة"),
    ("Regulator staff reviewing banks' credit files", "موظفو الجهات الرقابية الذين يراجعون ملفات الائتمان لدى البنوك"),
  ],
  "outcomes": [
    ("Analyze financial statements the way a lender must — cashflow first", "تحليل القوائم المالية كما يجب على المُقرض — التدفقات النقدية أولاً"),
    ("Build a repayment case: free cash flow, headroom and sensitivities", "بناء حجة السداد: التدفق النقدي الحر وهامش الأمان والحساسيات"),
    ("Structure facilities so covenants and security match the actual risk", "هيكلة التسهيلات بحيث تطابق التعهدات والضمانات المخاطر الفعلية"),
    ("Write a credit application the committee can decide on in one reading", "كتابة طلب ائتماني تستطيع اللجنة البت فيه من قراءة واحدة"),
    ("Spot early-warning signs and act before a file becomes a problem loan", "رصد إشارات الإنذار المبكر والتحرك قبل أن يصبح الملف قرضاً متعثراً"),
  ],
  "modules": [
    ("The lender's lens", "Purpose, repayment source, structure — the questions before the numbers.",
     "منظور المُقرض", "الغرض ومصدر السداد والهيكل — الأسئلة التي تسبق الأرقام."),
    ("Financial statement deep-dive", "Quality of earnings, working capital and what the notes hide.",
     "الغوص في القوائم المالية", "جودة الأرباح ورأس المال العامل وما تخفيه الإيضاحات."),
    ("Cashflow analysis", "From EBITDA comfort to free-cash-flow reality, on regional cases.",
     "تحليل التدفقات النقدية", "من طمأنينة EBITDA إلى واقع التدفق النقدي الحر، على حالات إقليمية."),
    ("Structuring and security", "Tenor, covenants, collateral and inter-creditor basics.",
     "الهيكلة والضمانات", "الآجال والتعهدات والضمانات وأساسيات العلاقات بين الدائنين."),
    ("The credit paper", "Writing and defending an application in a simulated committee.",
     "المذكرة الائتمانية", "كتابة الطلب والدفاع عنه أمام لجنة محاكاة."),
    ("Problem-loan clinic", "Early-warning indicators, restructuring options and file triage.",
     "عيادة القروض المتعثرة", "مؤشرات الإنذار المبكر وخيارات إعادة الهيكلة وفرز الملفات."),
  ],
 },
 {
  "slug": "graduate-development",
  "interest": "Graduate Development",
  "tag": ("Talent", "المواهب"),
  "title": ("Graduate Development Program", "برنامج تطوير الخريجين"),
  "meta": "Graduate development programs for banks and institutions — screening, technical tracks, behavioral skills and certification, designed and delivered end to end.",
  "lede": ("From screening to certification, one partner. We design and run complete graduate journeys — the same model behind a leading Saudi bank's one-year cybersecurity and Data & AI cohorts, screened from 200+ applicants.",
           "من الفرز إلى الشهادة، بشريك واحد. نصمم رحلات خريجين متكاملة وندبرها — وهو النموذج نفسه خلف دفعتي الأمن السيبراني والبيانات والذكاء الاصطناعي لعام كامل لدى أحد البنوك السعودية الرائدة، بعد فرز أكثر من 200 متقدم."),
  "duration": ("6–12 months, cohort-based", "من ستة إلى اثني عشر شهراً، على شكل دفعات"),
  "level": ("Fresh graduates and early-career hires", "الخريجون الجدد والموظفون في بداية مسيرتهم"),
  "audience": [
    ("Banks building specialist technical cohorts from fresh graduates", "البنوك التي تبني دفعات فنية متخصصة من خريجين جدد"),
    ("HR and talent teams running nationalization programs", "فرق الموارد البشرية والمواهب القائمة على برامج التوطين"),
    ("Institutions replacing scattered induction with a designed journey", "المؤسسات التي تستبدل التهيئة المتفرقة برحلة مصممة"),
    ("Government entities developing early-career professional tracks", "الجهات الحكومية التي تطوّر مسارات مهنية لبدايات المسيرة"),
  ],
  "outcomes": [
    ("Screen large applicant pools objectively with technical assessments", "فرز أعداد كبيرة من المتقدمين بموضوعية عبر تقييمات فنية"),
    ("Run specialist tracks — cyber, data, credit, frontline — with labs and certifications", "تشغيل مسارات تخصصية — سيبراني وبيانات وائتمان وخطوط أمامية — بمختبرات وشهادات"),
    ("Blend technical depth with the behavioral skills institutions actually need", "مزج العمق الفني بالمهارات السلوكية التي تحتاجها المؤسسات فعلاً"),
    ("Track each graduate against a personal development plan", "متابعة كل خريج وفق خطة تطوير شخصية"),
    ("Hand managers cohort-level evidence of who is ready for what", "تزويد المديرين بأدلة على مستوى الدفعة عمّن أصبح جاهزاً ولأي دور"),
  ],
  "modules": [
    ("Design the journey", "Tracks, duration, certifications and success measures, set with you.",
     "تصميم الرحلة", "المسارات والمدة والشهادات ومقاييس النجاح، تُحدد معك."),
    ("Screen and select", "Technical and behavioral assessment of the applicant pool.",
     "الفرز والاختيار", "تقييم فني وسلوكي لمجموعة المتقدمين."),
    ("Foundation phase", "Banking, professional and digital fundamentals for the whole cohort.",
     "مرحلة التأسيس", "أساسيات مصرفية ومهنية ورقمية للدفعة كاملة."),
    ("Specialist tracks", "Deep technical phases with labs, projects and certification exams.",
     "المسارات التخصصية", "مراحل فنية معمّقة بمختبرات ومشاريع وامتحانات شهادات."),
    ("Workplace integration", "Rotations, mentoring and manager checkpoints between phases.",
     "الاندماج في بيئة العمل", "التناوب الوظيفي والتوجيه ونقاط مراجعة مع المديرين بين المراحل."),
    ("Certify and hand over", "Final assessment, certification and a development file per graduate.",
     "الشهادة والتسليم", "تقييم ختامي وشهادة وملف تطوير لكل خريج."),
  ],
 },
]

# Fixed page furniture, translated once here (same keys on every page).
CHROME = [
 ("pdAtGlance", "At a glance", "لمحة سريعة"),
 ("pdDuration", "Duration", "المدة"),
 ("pdLevel", "Level", "المستوى"),
 ("pdDelivery", "Delivery", "طريقة التقديم"),
 ("pdDeliveryVal", "In person, virtual or blended", "حضورياً أو افتراضياً أو مدمجاً"),
 ("pdLangs", "Languages", "اللغات"),
 ("pdLangsVal", "English and Arabic", "العربية والإنجليزية"),
 ("pdCerts", "Certifications", "الشهادات"),
 ("pdWho", "Who attends", "من يحضر"),
 ("pdWhoTitle", "Built for the people doing the job", "بُني لمن يمارسون العمل فعلاً"),
 ("pdOutcomes", "What you will achieve", "ما الذي ستحققه"),
 ("pdOutcomesTitle", "Outcomes you can put to work", "نتائج تستطيع توظيفها فوراً"),
 ("pdOutline", "Program outline", "مخطط البرنامج"),
 ("pdOutlineTitle", "Indicative outline — customized before delivery", "مخطط إرشادي — يُخصَّص قبل التقديم"),
 ("pdOutlineNote", "Nothing runs as written here. Content, cases and duration are scoped against your objectives, your products and your market before a single session is delivered.",
  "لا يُقدَّم شيء كما هو مكتوب هنا. فالمحتوى والحالات والمدة تُحدد وفق أهدافك ومنتجاتك وسوقك قبل انعقاد أي جلسة."),
 ("pdCtaTitle", "Ready to scope this for your team?", "مستعد لتكييف هذا البرنامج لفريقك؟"),
 ("pdCtaText", "Tell us the audience, the level and what must be different afterwards — we will come back with a tailored outline.",
  "أخبرنا بالجمهور والمستوى وما الذي يجب أن يتغير بعد البرنامج — وسنعود إليك بمخطط مخصص."),
 ("pdCtaBtn", "Request the Program Outline", "اطلب المنهج التفصيلي"),
 ("pdCatalog", "Browse the full catalog", "تصفّح الدليل الكامل"),
 ("pdEyebrowAll", "Program", "برنامج"),
]


def esc(s):
    return html.escape(s, quote=False)


def js_str(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def build(p):
    slug = p["slug"]
    fname = "program-%s.html" % slug
    url = SITE + fname
    en, ar = {}, {}
    for key, e_, a_ in CHROME:
        en[key], ar[key] = e_, a_
    keys = iter(range(1, 400))

    def pair(field):
        e_, a_ = field
        k = "pd%d" % next(keys)
        en[k], ar[k] = e_, a_
        return k, e_

    tag_k, tag_e = pair(p["tag"])
    title_k, title_e = pair(p["title"])
    lede_k, lede_e = pair(p["lede"])
    dur_k, dur_e = pair(p["duration"])
    lvl_k, lvl_e = pair(p["level"])

    glance = [
        ("pdDuration", "Duration", dur_k, dur_e),
        ("pdLevel", "Level", lvl_k, lvl_e),
        ("pdDelivery", "Delivery", "pdDeliveryVal", "In person, virtual or blended"),
        ("pdLangs", "Languages", "pdLangsVal", "English and Arabic"),
    ]
    if "certs" in p:
        certs_k, certs_e = pair(p["certs"])
        glance.append(("pdCerts", "Certifications", certs_k, certs_e))

    glance_html = "\n".join(
        '          <div class="office">\n'
        '            <h3 data-i18n="%s">%s</h3>\n'
        '            <p data-i18n="%s">%s</p>\n'
        '          </div>' % (lk, esc(le), vk, esc(ve))
        for lk, le, vk, ve in glance)

    aud_html = "\n".join(
        '            <li data-i18n="%s">%s</li>' % (k, esc(e_))
        for k, e_ in (pair(a) for a in p["audience"]))
    out_html = "\n".join(
        '            <li data-i18n="%s">%s</li>' % (k, esc(e_))
        for k, e_ in (pair(o) for o in p["outcomes"]))

    mod_parts = []
    for i, (m_en, d_en, m_ar, d_ar) in enumerate(p["modules"], start=1):
        mk, me = pair((m_en, m_ar))
        dk, de = pair((d_en, d_ar))
        mod_parts.append(
            '          <div class="process-step">\n'
            '            <span class="num" aria-hidden="true">%02d</span>\n'
            '            <div>\n'
            '              <h3 data-i18n="%s">%s</h3>\n'
            '              <p data-i18n="%s">%s</p>\n'
            '            </div>\n'
            '          </div>' % (i, mk, esc(me), dk, esc(de)))
    mod_html = "\n".join(mod_parts)

    ld = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": p["title"][0],
        "description": p["meta"],
        "url": url,
        "inLanguage": ["en", "ar"],
        "provider": {
            "@type": "Organization",
            "name": "Emerging Market Financial Training",
            "url": SITE,
        },
        "availableLanguage": ["English", "Arabic"],
        "educationalLevel": p["level"][0],
        "teaches": [o[0] for o in p["outcomes"]],
        "hasCourseInstance": [{
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online", "Blended"],
            "courseWorkload": "P%s" % ("5D" if "day" in p["duration"][0] else "6M"),
            "location": {"@type": "Place", "name": "Gulf region and worldwide"},
        }],
    }

    contact = "contact.html?interest=%s" % p["interest"].replace(" ", "%20")

    page = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — EMFT</title>
  <meta name="description" content="{meta}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Emerging Market Financial Training">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{title} — EMFT">
  <meta property="og:description" content="{meta}">
  <meta property="og:image" content="{site}assets/img/hero-towers.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <script>document.documentElement.classList.add('js');</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Libre+Franklin:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
{ld}
  </script>
  <link rel="stylesheet" href="css/home.css">
  <link rel="stylesheet" href="css/pages.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <!-- CHROME:HEADER -->
  <!-- /CHROME:HEADER -->

  <main id="main" tabindex="-1">

    <section class="section-pad page-hero" aria-labelledby="page-title">
      <div class="container">
        <span class="eyebrow"><span data-i18n="pdEyebrowAll">Program</span> &middot; <span data-i18n="{tag_k}">{tag}</span></span>
        <h1 id="page-title" data-i18n="{title_k}">{title}</h1>
        <p class="lede" data-i18n="{lede_k}">{lede}</p>
        <div class="hero-actions" style="margin-top: 36px;">
          <a class="btn-solid" href="{contact}" data-i18n="pdCtaBtn">Request the Program Outline</a>
          <a class="link-underline" href="programs.html"><span data-i18n="pdCatalog">Browse the full catalog</span> <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>

    <section class="section-pad band-tight" aria-labelledby="glance-title">
      <div class="container">
        <span class="eyebrow" data-i18n="pdAtGlance" id="glance-title">At a glance</span>
        <div class="office-grid" style="margin-top: 28px;">
{glance}
        </div>
      </div>
    </section>

    <section class="section-pad domains-section band" aria-label="Audience and outcomes">
      <div class="container domains-grid">
        <div class="domain-panel domain-panel--navy">
          <span class="eyebrow" data-i18n="pdWho">Who attends</span>
          <h2 data-i18n="pdWhoTitle">Built for the people doing the job</h2>
          <ul class="domain-list">
{aud}
          </ul>
        </div>
        <div class="domain-panel domain-panel--sand">
          <span class="eyebrow" data-i18n="pdOutcomes">What you will achieve</span>
          <h2 data-i18n="pdOutcomesTitle">Outcomes you can put to work</h2>
          <ul class="domain-list">
{out}
          </ul>
        </div>
      </div>
    </section>

    <section class="section-pad process-section" aria-labelledby="outline-title">
      <div class="container process-grid">
        <div class="process-intro">
          <span class="eyebrow" data-i18n="pdOutline">Program outline</span>
          <h2 id="outline-title" class="display-lg" data-i18n="pdOutlineTitle">Indicative outline &mdash; customized before delivery</h2>
          <p data-i18n="pdOutlineNote">Nothing runs as written here. Content, cases and duration are scoped against your objectives, your products and your market before a single session is delivered.</p>
        </div>
        <div class="process-steps">
{mods}
        </div>
      </div>
    </section>

    <section class="section-pad cta-page" aria-labelledby="cta-title">
      <div class="container">
        <h2 id="cta-title" data-i18n="pdCtaTitle">Ready to scope this for your team?</h2>
        <p data-i18n="pdCtaText">Tell us the audience, the level and what must be different afterwards &mdash; we will come back with a tailored outline.</p>
        <div class="cta-actions">
          <a class="btn-gold" href="{contact}" data-i18n="pdCtaBtn">Request the Program Outline</a>
          <a class="link-underline" href="programs.html"><span data-i18n="pdCatalog">Browse the full catalog</span> <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>

  </main>

  <!-- CHROME:FOOTER -->
  <!-- /CHROME:FOOTER -->

  <script src="js/i18n.js" defer></script>
  <script src="js/i18n-program-{slug}.js" defer></script>
  <script src="js/home.js" defer></script>
  <script src="js/site.js" defer></script>
</body>
</html>
""".format(
        title=esc(title_e), meta=esc(p["meta"]), url=url, site=SITE,
        ld=json.dumps(ld, indent=2, ensure_ascii=False),
        tag_k=tag_k, tag=esc(tag_e), title_k=title_k, lede_k=lede_k,
        lede=esc(lede_e), contact=contact, glance=glance_html,
        aud=aud_html, out=out_html, mods=mod_html, slug=slug,
    )
    (ROOT / fname).write_text(page, encoding="utf-8")

    dict_lines = ["/* EMFT — %s program page, generated by scripts/build-program-pages.py." % slug,
                  "   Edit the data there, not here. */",
                  "(function () {", "  'use strict';",
                  "  if (!window.EMFT_I18N) return;",
                  "  window.EMFT_I18N.register({", "    en: {"]
    for k in en:
        dict_lines.append("      %s: %s," % (k, js_str(en[k])))
    dict_lines += ["    },", "    ar: {"]
    for k in ar:
        dict_lines.append("      %s: %s," % (k, js_str(ar[k])))
    dict_lines += ["    }", "  });", "})();", ""]
    (ROOT / "js" / ("i18n-program-%s.js" % slug)).write_text(
        "\n".join(dict_lines), encoding="utf-8")

    print("built  %-38s %2d audience/outcome/module strings" % (fname, len(en)))


for prog in PROGRAMS:
    build(prog)
print("\n%d program pages" % len(PROGRAMS))
