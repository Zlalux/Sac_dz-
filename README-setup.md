# دليل التشغيل — صفحة Sac

## 1. هيكل الملفات
```
sac-landing/
├── index.html
├── style.css
├── script.js
├── Code.gs              (يُستعمل داخل Google Apps Script، وليس في GitHub)
└── images/
    ├── product-1.jpg    (الصورة الرئيسية)
    ├── product-2.jpg
    ├── product-3.jpg
    └── product-4.jpg
```
تأكدي أن مجلد `images/` يحتوي بالضبط على هذه الأسماء الأربعة (تم توليدها من الصور التي أرسلتيها).

## 2. النشر على GitHub Pages
1. أنشئي مستودع (repository) جديد على GitHub.
2. ارفعي `index.html`، `style.css`، `script.js`، ومجلد `images/` كاملاً (لا ترفعي `Code.gs` هنا).
3. من إعدادات المستودع: **Settings > Pages**.
4. في **Source** اختاري الفرع `main` والمجلد `/root`، ثم احفظي.
5. بعد دقيقة أو دقيقتين، رابط الصفحة يكون:
   `https://username.github.io/repo-name/`

## 3. ربط Google Sheets (استقبال الطلبات)
1. افتحي [sheets.google.com](https://sheets.google.com) وأنشئي جدول جديد.
2. من القائمة: **Extensions > Apps Script**.
3. احذفي الكود الافتراضي، وألصقي محتوى ملف `Code.gs` كاملاً.
4. اضغطي **Deploy > New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. اضغطي **Deploy** ووافقي على الأذونات المطلوبة.
6. انسخي رابط **Web app URL**.
7. افتحي `script.js` وضعي الرابط في:
   ```js
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXX/exec";
   ```

## 4. ربط Meta Pixel (فيسبوك/إنستغرام)
1. من Meta Events Manager انسخي معرف الـ Pixel الخاص بك (رقم).
2. افتحي `index.html` وضعي الرقم في أول سطر داخل `<script>` بالـ head:
   ```js
   const META_PIXEL_ID = "1234567890123456";
   ```
3. الأحداث المُتتبَّعة تلقائيًا: `PageView` عند فتح الصفحة، `ViewContent` عند التحميل، و`Lead` عند إرسال الطلب.

## 5. تحديث أسعار التوصيل (مهم جدًا)
أسعار كل ولاية موجودة في `script.js` داخل المصفوفة `WILAYAS`، وهي حاليًا **أسعار تقديرية** تحتاج للتحقق والتحديث حسب التسعيرة الرسمية الحالية لشركة **DHD Livraison** قبل تفعيل الصفحة فعليًا. لتحديث أي ولاية، عدّلي القيم `home` (توصيل للمنزل) و`office` (استلام من المكتب):
```js
{ code: "16", name: "الجزائر", home: 450, office: 350 },
```
ضعي `null` بدل الرقم لتعطيل طريقة توصيل معينة في ولاية معينة (كما هو مطبق حاليًا على الولايات 50 و52 و56 بالكامل، و54 و57 بدون استلام من المكتب).

## 6. تجربة الصفحة محليًا قبل النشر
يكفي فتح `index.html` مباشرة بأي متصفح لمعاينة الشكل والتفاعل (النموذج، الحاسبة، اللايتبوكس). فقط تذكّري أن إرسال Google Sheets وMeta Pixel يحتاجان الرابط الحقيقي للعمل.
