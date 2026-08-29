// بيانات بوت تليجرام الخاصة بكِ
const TELEGRAM_BOT_TOKEN = "8984731117:AAF5CNVmSi8SBXXmXWPJR4TQ62RuML79qKo"; 
const TELEGRAM_CHAT_ID = "7164007969"; 

const wilayaPrices = {
  "أدرار": { home: 1000, desk: 600 },
  "الشلف": { home: 700, desk: 400 },
  "الأغواط": { home: 650, desk: 500 },
  "أم البواقي": { home: 900, desk: 400 },
  "باتنة": { home: 800, desk: 400 },
  "بجاية": { home: 800, desk: 400 },
  "بسكرة": { home: 900, desk: 500 },
  "بشار": { home: 1300, desk: 600 },
  "البليدة": { home: 500, desk: 350 },
  "البويرة": { home: 600, desk: 400 },
  "تمنراست": { home: 1300, desk: 600 },
  "تبسة": { home: 1000, desk: 400 },
  "تلمسان": { home: 800, desk: 400 },
  "تيارت": { home: 400, desk: 400 },
  "تيزي وزو": { home: 700, desk: 400 },
  "الجزائر": { home: 500, desk: 400 },
  "الجلفة": { home: 900, desk: 500 },
  "جيجل": { home: 800, desk: 400 },
  "سطيف": { home: 800, desk: 400 },
  "سعيدة": { home: 800, desk: 400 },
  "سكيكدة": { home: 800, desk: 400 },
  "سيدي بلعباس": { home: 700, desk: 400 },
  "عنابة": { home: 800, desk: 400 },
  "قالمة": { home: 900, desk: 400 },
  "قسنطينة": { home: 900, desk: 400 },
  "المدية": { home: 600, desk: 400 },
  "مستغانم": { home: 700, desk: 400 },
  "المسيلة": { home: 800, desk: 500 },
  "معسكر": { home: 700, desk: 400 },
  "ورقلة": { home: 900, desk: 500 },
  "وهران": { home: 700, desk: 400 },
  "البيض": { home: 800, desk: 500 },
  "إليزي": { home: 1300, desk: 600 },
  "برج بوعريريج": { home: 800, desk: 400 },
  "بومرداس": { home: 700, desk: 400 },
  "الطارف": { home: 900, desk: 400 },
  "تندوف": { home: 1300, desk: 600 },
  "تسمسيلت": { home: 500, desk: 300 },
  "الوادي": { home: 900, desk: 500 },
  "خنشلة": { home: 900, desk: 500 },
  "سوق أهراس": { home: 900, desk: 500 },
  "تيبازة": { home: 700, desk: 400 },
  "ميلة": { home: 800, desk: 400 },
  "عين الدفلى": { home: 600, desk: 400 },
  "النعامة": { home: 800, desk: 500 },
  "عين تموشنت": { home: 700, desk: 400 },
  "غرداية": { home: 800, desk: 500 },
  "غليزان": { home: 600, desk: 400 },
  "تيميمون": { home: 1300, desk: 600 },
  "أولاد جلال": { home: 900, desk: 500 },
  "إن صالح": { home: 1300, desk: 600 },
  "إن قزام": { home: 1300, desk: 1300 },
  "تقرت": { home: 900, desk: 500 },
  "المغير": { home: 900, desk: 900 },
  "المنيعة": { home: 900, desk: 500 }
};

document.addEventListener("DOMContentLoaded", function () {
  const wilayaSelect = document.querySelector('select[name="wilaya"]');
  const deliveryTypeSelect = document.getElementById('delivery-type');
  const totalButton = document.querySelector('button[type="submit"]');
  const form = document.querySelector("form");
  const basePrice = 1650;

  function updatePrice() {
    if (!wilayaSelect || !totalButton) return;

    const selectedWilaya = wilayaSelect.value.trim();
    const deliveryType = deliveryTypeSelect ? deliveryTypeSelect.value : 'home';

    if (wilayaPrices[selectedWilaya]) {
      const shipping = wilayaPrices[selectedWilaya][deliveryType] || 0;
      const total = basePrice + shipping;
      const typeText = deliveryType === 'home' ? 'للمنزل' : 'للمكتب';
      totalButton.textContent = `تأكيد الطلب — ${total} دج (توصيل ${typeText}: ${shipping} دج)`;
    } else {
      totalButton.textContent = `تأكيد الطلب — ${basePrice} دج`;
    }
  }

  if (wilayaSelect) wilayaSelect.addEventListener('change', updatePrice);
  if (deliveryTypeSelect) deliveryTypeSelect.addEventListener('change', updatePrice);

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      totalButton.textContent = "جاري إرسال الطلب...";
      totalButton.disabled = true;

      const name = form.querySelector('input[name="name"]').value;
      const phone = form.querySelector('input[name="phone"]').value;
      const wilaya = wilayaSelect ? wilayaSelect.value.trim() : '';
      const deliveryKey = deliveryTypeSelect ? deliveryTypeSelect.value : 'home';
      const deliveryText = deliveryKey === 'desk' ? 'توصيل للمكتب 🏢' : 'توصيل للمنزل 🏠';
      const address = form.querySelector('textarea[name="address"]').value || 'غير محدد';

      const shipping = (wilayaPrices[wilaya] && wilayaPrices[wilaya][deliveryKey]) || 0;
      const total = basePrice + shipping;

      const message = `🛍️ *طلب جديد - SAC*%0A%0A` +
        `👤 *الاسم:* ${name}%0A` +
        `📞 *الهاتف:* ${phone}%0A` +
        `📍 *الولاية:* ${wilaya}%0A` +
        `🚚 *نوع التوصيل:* ${deliveryText}%0A` +
        `🏠 *العنوان:* ${address}%0A%0A` +
        `💰 *المجموع الإجمالي:* ${total} دج`;

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=Markdown`;

      fetch(telegramUrl)
        .then(() => {
          window.location.href = "thankyou.html";
        })
        .catch(() => {
          window.location.href = "thankyou.html";
        });
    });
  }
});
  
