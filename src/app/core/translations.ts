// Flat translation dictionary: key -> [Arabic, English]
export const TRANSLATIONS: Record<string, [string, string]> = {
  // Brand / shell
  'brand.name': ['الذهب العُماني', 'Oman Gold'],
  'brand.tagline': ['مؤشر الأسعار اليومي', 'Daily Price Index'],
  'header.badge': ['الذهب العُماني اليوم', 'Oman Gold Today'],
  'theme.toLight': ['الوضع الفاتح', 'Light mode'],
  'theme.toDark': ['الوضع الداكن', 'Dark mode'],
  'lang.switchLabel': ['English', 'العربية'],
  'nav.toggle': ['فتح القائمة', 'Toggle menu'],

  // Sidebar / nav
  'nav.home': ['الرئيسية', 'Home'],
  'nav.prices': ['أسعار الذهب', 'Gold Prices'],
  'nav.calculator': ['حاسبة الذهب', 'Gold Calculator'],
  'nav.chart': ['المخططات', 'Charts'],
  'nav.history': ['سجل الأسعار', 'Price History'],
  'nav.alerts': ['التنبيهات', 'Alerts'],
  'nav.settings': ['الإعدادات', 'Settings'],

  // Hero
  'hero.eyebrow': ['تحديثات أسعار الذهب', 'Gold Price Updates'],
  'hero.breadcrumbHome': ['الرئيسية', 'Home'],
  'hero.breadcrumbCurrent': ['أسعار الذهب في عُمان', 'Gold Prices in Oman'],
  'hero.title': ['الذهب لحظة بلحظة، ورؤيتك أوضح.', 'Gold, In Every Moment.'],
  'hero.subtitle': [
    'تابع أسعار الذهب في عُمان، اكتشف اتجاهات السوق، واحسب قيمة ذهبك بكل سهولة.',
    'Track gold prices in Oman, explore market trends, and calculate your gold value with ease.',
  ],
  'hero.ctaPrimary': ['استكشف أسعار الذهب', 'Explore Gold Prices'],
  'hero.ctaSecondary': ['احسب قيمة ذهبك', 'Calculate Gold Value'],
  'hero.liveLabel': ['سعر عيار 24 الآن', '24K Price Now'],
  'hero.perGram': ['لكل جرام', 'per gram'],
  'hero.updated': ['آخر تحديث', 'Last updated'],
  'hero.market': ['السوق', 'Market'],
  'hero.marketValue': ['عُمان', 'Oman'],
  'hero.disclaimer': ['بيانات تجريبية لأغراض العرض فقط', 'Sample data for demonstration purposes only'],

  // Price cards
  'prices.title': ['متوسط أسعار الذهب اليوم في عُمان', "Today's Average Gold Prices in Oman"],
  'prices.subtitle': [
    'أسعار الذهب الحالية لمختلف العيارات بالريال العُماني لكل جرام',
    'Current gold prices across karats in Omani Rial per gram',
  ],
  'prices.error': ['تعذر تحميل الأسعار. تحقق من تشغيل واجهة API.', "Couldn't load prices. Check that the API is running."],
  'prices.avg': ['متوسط السعر', 'Average price'],
  'prices.perGram': ['سعر الجرام', 'Price per gram'],
  'prices.unit': ['ر.ع / جرام', 'OMR / g'],

  // Calculator
  'calculator.title': ['حاسبة الذهب', 'Gold Calculator'],
  'calculator.subtitle': ['اختر العيار والوزن أو المبلغ لتقدير القيمة.', 'Choose a karat and weight or amount to estimate the value.'],
  'calculator.karat': ['عيار الذهب', 'Gold Karat'],
  'calculator.unit': ['الوحدة', 'Unit'],
  'calculator.gram': ['جرام', 'Gram'],
  'calculator.ounce': ['أونصة', 'Ounce'],
  'calculator.modeWeight': ['وزن ← قيمة', 'Weight → Value'],
  'calculator.modeAmount': ['مبلغ ← وزن', 'Amount → Weight'],
  'calculator.weight': ['الوزن', 'Weight'],
  'calculator.amount': ['المبلغ (ر.ع)', 'Amount (OMR)'],
  'calculator.placeholderWeight': ['مثال: 10', 'e.g. 10'],
  'calculator.placeholderAmount': ['مثال: 500', 'e.g. 500'],
  'calculator.calculate': ['احسب القيمة', 'Calculate'],
  'calculator.emptyHint': [
    'اختر العيار والوزن ثم اضغط على احسب لمعرفة القيمة التقديرية.',
    'Choose a karat and weight, then calculate to see the estimated value.',
  ],
  'calculator.error': ['تعذر جلب السعر من واجهة API.', "Couldn't fetch the price from the API."],
  'calculator.resultValue': ['إجمالي القيمة التقديرية', 'Estimated total value'],
  'calculator.resultWeight': ['الوزن التقديري', 'Estimated weight'],

  // Chart
  'chart.title': ['اتجاه أسعار الذهب', 'Gold Price Trend'],
  'chart.subtitle': ['حركة سعر الذهب عبر الفترة المختارة', 'Gold price movement over the selected period'],
  'chart.error': ['تعذر تحميل سجل الأسعار من واجهة API.', "Couldn't load price history from the API."],
  'chart.current': ['السعر الحالي', 'Current Price'],
  'chart.highest': ['أعلى سعر', 'Highest Price'],
  'chart.lowest': ['أقل سعر', 'Lowest Price'],
  'chart.previous': ['السابق', 'Previous'],
  'chart.rise': ['ارتفاع', 'Up'],
  'chart.fall': ['انخفاض', 'Down'],
  'chart.periodDay': ['يوم', 'Day'],
  'chart.periodWeek': ['أسبوع', 'Week'],
  'chart.periodMonth': ['شهر', 'Month'],
  'chart.periodYear': ['سنة', 'Year'],
  'chart.unit': ['ر.ع / جرام', 'OMR / g'],
  'chart.yearNote': ['بيانات موسّعة تقديرية لأغراض العرض فقط', 'Extended estimated data for demonstration only'],
  'chart.currentOf': ['الحالي · عيار', 'Current · Karat'],

  // History table
  'history.title': ['سجل الأسعار', 'Price History'],
  'history.subtitle': [
    'بيانات تجريبية لأسعار الذهب خلال آخر 30 يومًا بالريال العُماني لكل جرام',
    'Sample gold price data for the last 30 days, in Omani Rial per gram',
  ],
  'history.error': ['تعذر تحميل سجل الأسعار من واجهة API.', "Couldn't load price history from the API."],
  'history.date': ['التاريخ', 'Date'],
  'history.change': ['التغير', 'Change'],
  'pagination.prev': ['السابق', 'Previous'],
  'pagination.next': ['التالي', 'Next'],
  'pagination.page': ['صفحة', 'Page'],
  'pagination.of': ['من', 'of'],

  // Alerts
  'alerts.title': ['تنبيهات الأسعار', 'Price Alerts'],
  'alerts.subtitle': [
    'عيّن سعرًا مستهدفًا واحصل على تنبيه عند وصول السعر إليه',
    "Set a target price and get notified when it's reached",
  ],
  'alerts.karat': ['العيار', 'Karat'],
  'alerts.targetPrice': ['السعر المستهدف (ر.ع)', 'Target price (OMR)'],
  'alerts.direction': ['الاتجاه', 'Direction'],
  'alerts.above': ['عند الارتفاع فوق', 'When price rises above'],
  'alerts.below': ['عند الانخفاض تحت', 'When price falls below'],
  'alerts.add': ['إضافة تنبيه', 'Add Alert'],
  'alerts.empty': ['لا توجد تنبيهات بعد. أضف أول تنبيه لك أعلاه.', 'No alerts yet. Add your first alert above.'],
  'alerts.active': ['نشط', 'Active'],
  'alerts.triggered': ['تم الوصول للهدف', 'Target reached'],
  'alerts.delete': ['حذف', 'Delete'],
  'alerts.enableNotif': ['تفعيل إشعارات المتصفح', 'Enable browser notifications'],
  'alerts.notifEnabled': ['الإشعارات مفعّلة', 'Notifications enabled'],
  'alerts.current': ['السعر الحالي', 'Current price'],
  'alerts.placeholderPrice': ['مثال: 32.500', 'e.g. 32.500'],

  // Settings
  'settings.title': ['الإعدادات', 'Settings'],
  'settings.subtitle': ['خصّص المظهر واللغة حسب رغبتك', 'Customize appearance and language to your liking'],
  'settings.appearance': ['المظهر', 'Appearance'],
  'settings.light': ['فاتح', 'Light'],
  'settings.dark': ['داكن', 'Dark'],
  'settings.language': ['اللغة', 'Language'],
  'settings.arabic': ['العربية', 'Arabic'],
  'settings.english': ['English', 'English'],
  'settings.currency': ['العملة', 'Currency'],
  'settings.currencyValue': ['ريال عُماني (ر.ع)', 'Omani Rial (OMR)'],
  'settings.data': ['البيانات', 'Data'],
  'settings.clearAlerts': ['حذف جميع التنبيهات', 'Clear all alerts'],
  'settings.about': ['عن المنصة', 'About'],
  'settings.aboutText': [
    'منصة تجريبية لمتابعة أسعار الذهب في سلطنة عُمان. البيانات المعروضة تجريبية لأغراض العرض وليست أسعارًا حيّة ما لم تُربط المنصة بمصدر بيانات سوقي فعلي.',
    'A demo platform for tracking gold prices in Oman. Displayed data is sample data for demonstration and not live pricing unless connected to a real market-data source.',
  ],

  // Footer
  'footer.rights': ['جميع الحقوق محفوظة', 'All rights reserved'],
  'footer.disclaimer': [
    'بيانات تجريبية لأغراض العرض فقط وليست أسعارًا حيّة.',
    'Sample data for demonstration only — not live pricing.',
  ],

  // Common
  'common.loading': ['جارٍ التحميل...', 'Loading...'],
};
