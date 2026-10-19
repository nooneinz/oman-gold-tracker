# GoldOMR — متتبع أسعار الذهب في عُمان

مشروع من جزأين يعملان معًا:

| الجزء | التقنية | المجلد | المنفذ |
| --- | --- | --- | --- |
| **Gold Price API** | ASP.NET Core Web API (.NET 10) + Swagger | [`GoldPriceApi/`](GoldPriceApi) | `http://localhost:5000` |
| **واجهة المستخدم** | Angular 16 + Tailwind CSS | [`src/`](src) | `http://localhost:4200` |

كل الأسعار المعروضة في الواجهة تأتي من الـ API عبر `HttpClient`، ولا توجد أي أرقام أسعار ثابتة داخل كود Angular. بيانات الأسعار نفسها تجريبية ومخزّنة في قائمة داخل الخادم (بدون قاعدة بيانات).

---

## 1. المتطلبات

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org) (نسخة LTS) مع npm
- متصفح حديث (ويُفضَّل Chrome لتشغيل الاختبارات)

## 2. طريقة التشغيل

افتح **نافذتين** للطرفية من مجلد المشروع.

### النافذة الأولى — الـ API

```powershell
dotnet run --project .\GoldPriceApi\GoldPriceApi.csproj --urls http://localhost:5000
```

- الـ API: `http://localhost:5000/api/goldprices`
- Swagger: `http://localhost:5000/swagger`

### النافذة الثانية — Angular

```powershell
npm install
npm start
```

ثم افتح `http://localhost:4200`.

> الواجهة تتصل بالعنوان `http://localhost:5000/api/goldprices` (معرَّف في [`gold-data.service.ts`](src/app/services/gold-data.service.ts))، وإعداد CORS في الـ API يسمح بالطلبات من `http://localhost:4200` فقط. شغّل الـ API أولًا؛ إن لم يكن يعمل ستظهر في الواجهة رسالة «تعذر تحميل الأسعار».

---

## 3. مسارات الـ API (Endpoints)

الأسعار بالريال العُماني (OMR) لكل جرام. كل الردود بصيغة JSON.

| Method | المسار | الوصف | الحالات |
| --- | --- | --- | --- |
| `GET` | `/api/goldprices` | أسعار جميع العيارات (24 و22 و21 و18) | `200 OK` |
| `GET` | `/api/goldprices/{karat}` | سعر عيار محدد، مثل `/api/goldprices/22` | `200 OK` / `404 Not Found` |
| `GET` | `/api/goldprices?karat=22` | نفس النتيجة عبر Query Parameter (يعيد مصفوفة بعنصر واحد) | `200 OK` / `404 Not Found` |
| `GET` | `/api/goldprices/history` | سجل تجريبي لآخر 30 يومًا لكل العيارات | `200 OK` |

أي Method غير `GET` يعيد `405 Method Not Allowed`.

### أمثلة

```http
GET /api/goldprices
```
```json
[
  { "karat": 24, "pricePerGram": 53.840, "currency": "OMR" },
  { "karat": 22, "pricePerGram": 49.310, "currency": "OMR" },
  { "karat": 21, "pricePerGram": 47.100, "currency": "OMR" },
  { "karat": 18, "pricePerGram": 40.380, "currency": "OMR" }
]
```

```http
GET /api/goldprices/22
```
```json
{ "karat": 22, "pricePerGram": 49.310, "currency": "OMR" }
```

```http
GET /api/goldprices/99        → 404 Not Found
GET /api/goldprices?karat=5   → 404 Not Found
```

```http
GET /api/goldprices/history
```
```json
[
  { "date": "2026-09-20", "k18": 40.380, "k21": 47.100, "k22": 49.310, "k24": 53.840 }
]
```

### تجربة الـ API عبر curl

```bash
curl http://localhost:5000/api/goldprices
curl http://localhost:5000/api/goldprices/24
curl "http://localhost:5000/api/goldprices?karat=21"
curl -i http://localhost:5000/api/goldprices/99     # 404
```

### تجربة الـ API عبر Swagger

1. شغّل الـ API وافتح `http://localhost:5000/swagger`.
2. افتح المسار المطلوب واضغط **Try it out**.
3. أدخل قيمة `karat` (مثل `22`) واضغط **Execute** لترى الرد ورمز الحالة.

---

## 4. هيكل المشروع

```
oman-gold-tracker/
├── GoldPriceApi/                    ← ASP.NET Core Web API
│   ├── Controllers/
│   │   └── GoldPricesController.cs  ← الـ Endpoints وأكواد الحالة (200 / 404)
│   ├── Models/
│   │   └── GoldPrice.cs             ← GoldPrice و HistoricalGoldPrice
│   ├── Services/
│   │   └── GoldPriceService.cs      ← قائمة الأسعار داخل الذاكرة + منطق البحث
│   ├── Program.cs                   ← الإعداد: Controllers, Swagger, CORS, DI
│   └── GoldPriceApi.csproj
├── src/                             ← مشروع Angular
│   ├── app/
│   │   ├── services/gold-data.service.ts   ← الاتصال بالـ API عبر HttpClient
│   │   ├── components/
│   │   │   ├── header/ hero/ price-cards/ price-card/
│   │   │   ├── calculator/ chart/ history-table/
│   │   │   └── footer/ logo/ bottom-nav/
│   │   └── core/theme.service.ts           ← الوضع الفاتح/الداكن
│   ├── assets/images/               ← صور الخلفيات (ذهب سائل)
│   └── styles.css                   ← متغيرات الألوان والخطوط
├── tailwind.config.js
└── README.md
```

### كيف يعمل الـ API (باختصار)

- **`GoldPrice`** (نموذج): `Karat` و`PricePerGram` و`Currency`.
- **`GoldPriceService`**: يحتفظ بالأسعار في `List<GoldPrice>` ويوفّر `GetAllPrices()` و`GetPriceByKarat(int)` و`GetHistory()`. مسجَّل كـ `Singleton` في حاوية الاعتماديات (Dependency Injection) ويُحقن في الـ Controller عبر الـ constructor.
- **`GoldPricesController`**: يستقبل الطلبات ويُرجع `Ok(...)` عند وجود البيانات و`NotFound()` عند عدم وجود العيار.
- **`GetHistory()`**: يولّد 30 يومًا تجريبيًا بتقلب بسيط حول السعر الأساسي (دالة جيب) — بيانات للعرض فقط.

---

## 5. واجهة المستخدم (Angular)

تصميم عربي RTL بهوية ذهبية دافئة، مع وضع فاتح وداكن (زر التبديل في الهيدر، ويُحفظ الاختيار في المتصفح).

| القسم | ما يعرضه | مصدر البيانات |
| --- | --- | --- |
| **الهيرو** | عنوان الصفحة وخلفية ذهب سائل بعرض الشاشة كاملة | — |
| **أسعار الذهب اليوم** | بطاقة لكل عيار: السعر ونسبة التغير اليومي | `GET /api/goldprices` + `/history` |
| **حاسبة الذهب** | حساب قيمة الذهب من الوزن (جرام/أونصة)، أو الوزن من المبلغ | `GET /api/goldprices` |
| **حركة أسعار الذهب** | رسم بياني مساحي (7 / 14 / 30 يومًا) وأعلى سعر والتغير اليومي | `GET /api/goldprices/history` |
| **سجل الأسعار** | جدول مرتب مع فلترة العيار والفترة وترقيم الصفحات | `GET /api/goldprices/history` |

على الجوال يظهر شريط تنقل سفلي وتتحول بطاقات الأسعار إلى شريط أفقي قابل للتمرير.

---

## 6. البناء والاختبارات

```powershell
dotnet build .\GoldPriceApi\GoldPriceApi.csproj     # بناء الـ API
npm run build                                       # بناء Angular (الناتج في dist/)
npm test -- --watch=false --browsers=ChromeHeadless # اختبارات Angular (19 اختبارًا)
```

## 7. قائمة التحقق من متطلبات التسليم

- [x] ASP.NET Core Web API باستخدام **Controllers**
- [x] عرض أسعار **جميع العيارات** — `GET /api/goldprices`
- [x] عرض سعر **عيار محدد** — `GET /api/goldprices/{karat}` أو `?karat=`
- [x] الأسعار في **قائمة داخل التطبيق** بدون قاعدة بيانات
- [x] **HTTP Methods** مناسبة (`GET`) و**Status Codes** (`200` و`404`)
- [x] **Swagger** على `/swagger`
- [x] كود منظَّم في مجلدات (Controllers / Models / Services) وبرمجة كائنية (OOP)
- [x] **ربط Angular بالـ API** — كل الأسعار تُجلب من الـ API
- [x] README يشرح التشغيل والـ Endpoints

---

> ملاحظة: الأسعار تجريبية للعرض فقط وليست أسعارًا حيّة من السوق.
