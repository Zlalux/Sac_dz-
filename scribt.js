const wilayaPrices = {
  "أدرار": 1000,
  "الشلف": 700,
  "الأغواط": 650,
  "أم البواقي": 900,
  "باتنة": 800,
  "بجاية": 800,
  "بسكرة": 900,
  "بشار": 1300,
  "البليدة": 500,
  "البويرة": 600,
  "تمنراست": 1300,
  "تبسة": 1000,
  "تلمسان": 800,
  "تيارت": 400,
  "تيزي وزو": 700,
  "الجزائر": 500,
  "الجلفة": 900,
  "جيجل": 800,
  "سطيف": 800,
  "سعيدة": 800,
  "سكيكدة": 800,
  "سيدي بلعباس": 700,
  "عنابة": 800,
  "قالمة": 900,
  "قسنطينة": 900,
  "المدية": 600,
  "مستغانم": 700,
  "المسيلة": 800,
  "معسكر": 700,
  "ورقلة": 900,
  "وهران": 700,
  "البيض": 800,
  "إليزي": 1300,
  "برج بوعريريج": 800,
  "بومرداس": 700,
  "الطارف": 900,
  "تندوف": 1300,
  "تسمسيلت": 500,
  "الوادي": 900,
  "خنشلة": 900,
  "سوق أهراس": 900,
  "تيبازة": 700,
  "ميلة": 800,
  "عين الدفلى": 600,
  "النعامة": 800,
  "عين تموشنت": 700,
  "غرداية": 800,
  "غليزان": 600,
  "تيميمون": 1300,
  "أولاد جلال": 900,
  "إن صالح": 1300,
  "إن قزام": 1300,
  "تقرت": 900,
  "المغير": 900,
  "المنيعة": 900
};

const wilayaSelect = document.querySelector('select');
const totalButton = document.querySelector('button[type="submit"]');
const basePrice = 1650;

if (wilayaSelect && totalButton) {
  wilayaSelect.addEventListener('change', function() {
    const selectedWilaya = this.value;
    const shipping = wilayaPrices[selectedWilaya] || 0;
    const total = basePrice + shipping;
    
    if (shipping > 0) {
      totalButton.textContent = `تأكيد الطلب — ${total} دج (شامل التوصيل ${shipping} دج)`;
    } else {
      totalButton.textContent = `تأكيد الطلب — ${basePrice} دج`;
    }
  });
}
