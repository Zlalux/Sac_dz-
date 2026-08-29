// =====================================================================
// SAC — Landing Page Logic
// =====================================================================

/* ---------------------- CONFIG (EDIT THESE) ---------------------- */
const GOOGLE_SCRIPT_URL = ""; // ضع هنا رابط Google Apps Script Web App بعد النشر
const PRODUCT_NAME = "Sac";
const PRODUCT_PRICE = 1650;

/* ---------------------- WILAYAS DATA (58) ---------------------- 
   home / office = delivery fee in DA
   null = the delivery method is NOT available for this wilaya
   Rates below are placeholders — verify and update them with DHD Livraison's
   current official rate sheet before going live.
------------------------------------------------------------------- */
const WILAYAS = [
  { code: "01", name: "أدرار", home: 1400, office: 900 },
  { code: "02", name: "الشلف", home: 600, office: 400 },
  { code: "03", name: "الأغواط", home: 800, office: 550 },
  { code: "04", name: "أم البواقي", home: 650, office: 450 },
  { code: "05", name: "باتنة", home: 650, office: 450 },
  { code: "06", name: "بجاية", home: 600, office: 400 },
  { code: "07", name: "بسكرة", home: 750, office: 500 },
  { code: "08", name: "بشار", home: 1300, office: 850 },
  { code: "09", name: "البليدة", home: 500, office: 350 },
  { code: "10", name: "البويرة", home: 600, office: 400 },
  { code: "11", name: "تمنراست", home: 1700, office: 1100 },
  { code: "12", name: "تبسة", home: 750, office: 500 },
  { code: "13", name: "تلمسان", home: 700, office: 450 },
  { code: "14", name: "تيارت", home: 700, office: 450 },
  { code: "15", name: "تيزي وزو", home: 600, office: 400 },
  { code: "16", name: "الجزائر", home: 450, office: 350 },
  { code: "17", name: "الجلفة", home: 800, office: 550 },
  { code: "18", name: "جيجل", home: 650, office: 450 },
  { code: "19", name: "سطيف", home: 650, office: 450 },
  { code: "20", name: "سعيدة", home: 750, office: 500 },
  { code: "21", name: "سكيكدة", home: 650, office: 450 },
  { code: "22", name: "سيدي بلعباس", home: 700, office: 450 },
  { code: "23", name: "عنابة", home: 650, office: 450 },
  { code: "24", name: "قالمة", home: 650, office: 450 },
  { code: "25", name: "قسنطينة", home: 600, office: 400 },
  { code: "26", name: "المدية", home: 600, office: 400 },
  { code: "27", name: "مستغانم", home: 650, office: 450 },
  { code: "28", name: "المسيلة", home: 700, office: 480 },
  { code: "29", name: "معسكر", home: 700, office: 450 },
  { code: "30", name: "ورقلة", home: 900, office: 600 },
  { code: "31", name: "وهران", home: 550, office: 380 },
  { code: "32", name: "البيض", home: 900, office: 600 },
  { code: "33", name: "إليزي", home: 1600, office: 1050 },
  { code: "34", name: "برج بوعريريج", home: 600, office: 400 },
  { code: "35", name: "بومرداس", home: 500, office: 350 },
  { code: "36", name: "الطارف", home: 700, office: 480 },
  { code: "37", name: "تندوف", home: 1700, office: 1100 },
  { code: "38", name: "تيسمسيلت", home: 700, office: 450 },
  { code: "39", name: "الوادي", home: 900, office: 600 },
  { code: "40", name: "خنشلة", home: 750, office: 500 },
  { code: "41", name: "سوق أهراس", home: 700, office: 480 },
  { code: "42", name: "تيبازة", home: 500, office: 350 },
  { code: "43", name: "ميلة", home: 650, office: 450 },
  { code: "44", name: "عين الدفلى", home: 600, office: 400 },
  { code: "45", name: "النعامة", home: 950, office: 650 },
  { code: "46", name: "عين تموشنت", home: 700, office: 450 },
  { code: "47", name: "غرداية", home: 900, office: 600 },
  { code: "48", name: "غليزان", home: 650, office: 450 },
  { code: "49", name: "تيميمون", home: 1500, office: 950 },
  { code: "50", name: "برج باجي مختار", home: null, office: null },
  { code: "51", name: "أولاد جلال", home: 900, office: 600 },
  { code: "52", name: "بني عباس", home: null, office: null },
  { code: "53", name: "عين صالح", home: 1600, office: 1000 },
  { code: "54", name: "عين قزام", home: 1700, office: null },
  { code: "55", name: "تقرت", home: 900, office: 600 },
  { code: "56", name: "جانت", home: null, office: null },
  { code: "57", name: "المغير", home: 850, office: null },
  { code: "58", name: "المنيعة", home: 950, office: 600 }
];

/* ---------------------- STATE ---------------------- */
let currentImageIndex = 0;
const galleryImages = [
  "images/product-1.jpg",
  "images/product-2.jpg",
  "images/product-3.jpg",
  "images/product-4.jpg"
];

/* =====================================================================
   INIT
===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  populateWilayas();
  initGallery();
  initLightbox();
  initQtyStepper();
  initDeliveryOptions();
  initStickyCta();
  initForm();
  updateSummary();
  trackViewContent();
});

/* =====================================================================
   META PIXEL HELPERS
===================================================================== */
function safeFbq(...args) {
  try {
    if (typeof META_PIXEL_ID !== "undefined" && META_PIXEL_ID && typeof fbq === "function") {
      fbq(...args);
    }
  } catch (e) {
    console.warn("Meta Pixel event skipped:", e);
  }
}

function trackViewContent() {
  safeFbq("track", "ViewContent", {
    content_name: PRODUCT_NAME,
    value: PRODUCT_PRICE,
    currency: "DZD"
  });
}

/* =====================================================================
   WILAYA SELECT
===================================================================== */
function populateWilayas() {
  const select = document.getElementById("wilaya");
  WILAYAS.forEach((w) => {
    const opt = document.createElement("option");
    opt.value = w.code;
    opt.textContent = `${w.code} — ${w.name}`;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => {
    updateDeliveryPricesForWilaya();
    updateSummary();
  });
}

function getSelectedWilaya() {
  const code = document.getElementById("wilaya").value;
  return WILAYAS.find((w) => w.code === code) || null;
}

/* =====================================================================
   GALLERY
===================================================================== */
function initGallery() {
  const mainImg = document.getElementById("galleryMain");
  const thumbs = document.querySelectorAll(".gallery__thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-src");
      const index = parseInt(thumb.getAttribute("data-index"), 10);
      mainImg.src = src;
      mainImg.setAttribute("data-index", index);
      currentImageIndex = index;
      thumbs.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });

  mainImg.addEventListener("click", () => {
    openLightbox(parseInt(mainImg.getAttribute("data-index"), 10));
  });
}

/* =====================================================================
   LIGHTBOX
===================================================================== */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  closeBtn.addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  prevBtn.addEventListener("click", () => navigateLightbox(-1));
  nextBtn.addEventListener("click", () => navigateLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(1); // RTL: left = next visually reversed
    if (e.key === "ArrowRight") navigateLightbox(-1);
  });

  function navigateLightbox(dir) {
    currentImageIndex = (currentImageIndex + dir + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
    syncMainImage();
  }
}

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  lightboxImg.src = galleryImages[index];
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function syncMainImage() {
  const mainImg = document.getElementById("galleryMain");
  const thumbs = document.querySelectorAll(".gallery__thumb");
  mainImg.src = galleryImages[currentImageIndex];
  mainImg.setAttribute("data-index", currentImageIndex);
  thumbs.forEach((t) => {
    t.classList.toggle("is-active", parseInt(t.getAttribute("data-index"), 10) === currentImageIndex);
  });
}

/* =====================================================================
   QUANTITY STEPPER
===================================================================== */
function initQtyStepper() {
  const qtyInput = document.getElementById("quantity");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    const val = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
    qtyInput.value = val;
    updateSummary();
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    const val = Math.max(1, parseInt(qtyInput.value || "1", 10) + 1);
    qtyInput.value = val;
    updateSummary();
  });
  qtyInput.addEventListener("input", () => {
    if (parseInt(qtyInput.value, 10) < 1 || isNaN(parseInt(qtyInput.value, 10))) {
      qtyInput.value = 1;
    }
    updateSummary();
  });
}

/* =====================================================================
   DELIVERY OPTIONS
===================================================================== */
function initDeliveryOptions() {
  const radios = document.querySelectorAll('input[name="delivery_method"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      toggleAddressField();
      updateSummary();
    });
  });
  toggleAddressField();
}

function toggleAddressField() {
  const method = document.querySelector('input[name="delivery_method"]:checked').value;
  const addressField = document.getElementById("addressField");
  const addressInput = document.getElementById("address");
  if (method === "home") {
    addressField.style.display = "block";
    addressInput.setAttribute("required", "required");
  } else {
    addressField.style.display = "none";
    addressInput.removeAttribute("required");
  }
}

function updateDeliveryPricesForWilaya() {
  const wilaya = getSelectedWilaya();
  const priceHomeEl = document.getElementById("priceHome");
  const priceOfficeEl = document.getElementById("priceOffice");
  const cardHome = document.getElementById("cardHome");
  const cardOffice = document.getElementById("cardOffice");
  const warning = document.getElementById("deliveryWarning");
  const homeRadio = cardHome.querySelector('input[type="radio"]');
  const officeRadio = cardOffice.querySelector('input[type="radio"]');

  if (!wilaya) {
    priceHomeEl.textContent = "— دج";
    priceOfficeEl.textContent = "— دج";
    cardHome.classList.remove("is-disabled");
    cardOffice.classList.remove("is-disabled");
    warning.hidden = true;
    return;
  }

  const homeAvailable = wilaya.home !== null;
  const officeAvailable = wilaya.office !== null;

  priceHomeEl.textContent = homeAvailable ? `${wilaya.home} دج` : "غير متوفر";
  priceOfficeEl.textContent = officeAvailable ? `${wilaya.office} دج` : "غير متوفر";

  cardHome.classList.toggle("is-disabled", !homeAvailable);
  cardOffice.classList.toggle("is-disabled", !officeAvailable);
  homeRadio.disabled = !homeAvailable;
  officeRadio.disabled = !officeAvailable;

  const checkedRadio = document.querySelector('input[name="delivery_method"]:checked');
  let showWarning = false;

  if (checkedRadio.value === "home" && !homeAvailable) showWarning = true;
  if (checkedRadio.value === "office" && !officeAvailable) showWarning = true;

  // auto-switch to an available method if current selection becomes invalid
  if (showWarning) {
    if (checkedRadio.value === "home" && officeAvailable) {
      officeRadio.checked = true;
      toggleAddressField();
      showWarning = false;
    } else if (checkedRadio.value === "office" && homeAvailable) {
      homeRadio.checked = true;
      toggleAddressField();
      showWarning = false;
    }
  }

  if (!homeAvailable && !officeAvailable) {
    showWarning = true;
  }

  warning.hidden = !showWarning;
  document.getElementById("submitBtn").disabled = showWarning;
}

/* =====================================================================
   ORDER SUMMARY
===================================================================== */
function getDeliveryFee() {
  const wilaya = getSelectedWilaya();
  if (!wilaya) return 0;
  const method = document.querySelector('input[name="delivery_method"]:checked').value;
  const fee = method === "home" ? wilaya.home : wilaya.office;
  return fee === null || fee === undefined ? 0 : fee;
}

function updateSummary() {
  const qty = Math.max(1, parseInt(document.getElementById("quantity").value || "1", 10));
  const wilaya = getSelectedWilaya();
  const method = document.querySelector('input[name="delivery_method"]:checked').value;
  const deliveryFee = getDeliveryFee();
  const subtotal = PRODUCT_PRICE * qty;
  const total = subtotal + deliveryFee;

  document.getElementById("sumQty").textContent = qty;
  document.getElementById("sumSubtotal").textContent = `${subtotal} دج`;
  document.getElementById("sumWilaya").textContent = wilaya ? `${wilaya.code} — ${wilaya.name}` : "—";
  document.getElementById("sumMethod").textContent = method === "home" ? "توصيل للمنزل" : "استلام من المكتب";
  document.getElementById("sumDelivery").textContent = wilaya ? `${deliveryFee} دج` : "— دج";
  document.getElementById("sumTotal").textContent = wilaya ? `${total} دج` : "— دج";
}

/* =====================================================================
   STICKY CTA (mobile) — hide near footer
===================================================================== */
function initStickyCta() {
  const stickyCta = document.getElementById("stickyCta");
  const footer = document.getElementById("footer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        stickyCta.classList.toggle("is-hidden", entry.isIntersecting);
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(footer);

  const orderSection = document.getElementById("order");
  const orderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) stickyCta.classList.add("is-hidden");
      });
    },
    { threshold: 0.6 }
  );
  orderObserver.observe(orderSection);
}

/* =====================================================================
   FORM VALIDATION + SUBMISSION
===================================================================== */
function initForm() {
  const form = document.getElementById("orderForm");
  form.addEventListener("submit", handleSubmit);

  ["fullName", "phone", "commune", "address"].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("input", () => clearError(id));
  });
  document.getElementById("wilaya").addEventListener("change", () => clearError("wilaya"));
}

function clearError(fieldId) {
  const errEl = document.getElementById(`err-${fieldId}`);
  if (errEl) errEl.textContent = "";
  const inputEl = document.getElementById(fieldId);
  if (inputEl) inputEl.style.borderColor = "";
}

function setError(fieldId, message) {
  const errEl = document.getElementById(`err-${fieldId}`);
  const inputEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = message;
  if (inputEl) inputEl.style.borderColor = "#B3453D";
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\s+/g, "");
  return /^0[567][0-9]{8}$/.test(cleaned);
}

function validateForm() {
  let isValid = true;

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const wilaya = document.getElementById("wilaya").value;
  const commune = document.getElementById("commune").value.trim();
  const method = document.querySelector('input[name="delivery_method"]:checked').value;
  const address = document.getElementById("address").value.trim();

  if (fullName.length < 3) {
    setError("fullName", "الرجاء إدخال الاسم الكامل");
    isValid = false;
  }

  if (!validatePhone(phone)) {
    setError("phone", "رقم غير صحيح، يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام");
    isValid = false;
  }

  if (!wilaya) {
    setError("wilaya", "الرجاء اختيار الولاية");
    isValid = false;
  }

  if (commune.length < 2) {
    setError("commune", "الرجاء إدخال اسم البلدية");
    isValid = false;
  }

  if (method === "home" && address.length < 5) {
    setError("address", "الرجاء إدخال عنوان كامل للتوصيل للمنزل");
    isValid = false;
  }

  const wilayaData = getSelectedWilaya();
  if (wilayaData) {
    const fee = method === "home" ? wilayaData.home : wilayaData.office;
    if (fee === null || fee === undefined) {
      isValid = false;
    }
  }

  return isValid;
}

function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DHD-${y}${m}${d}-${rand}`;
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    const firstError = document.querySelector(".field__error:not(:empty)");
    if (firstError) firstError.closest(".field").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "جاري الإرسال...";

  const wilaya = getSelectedWilaya();
  const method = document.querySelector('input[name="delivery_method"]:checked').value;
  const qty = Math.max(1, parseInt(document.getElementById("quantity").value || "1", 10));
  const deliveryFee = getDeliveryFee();
  const subtotal = PRODUCT_PRICE * qty;
  const total = subtotal + deliveryFee;
  const orderId = generateOrderId();

  const payload = {
    date: new Date().toISOString(),
    orderId: orderId,
    customerName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    wilaya: `${wilaya.code} - ${wilaya.name}`,
    commune: document.getElementById("commune").value.trim(),
    address: method === "home" ? document.getElementById("address").value.trim() : "استلام من المكتب",
    deliveryMethod: method === "home" ? "توصيل للمنزل" : "استلام من المكتب",
    quantity: qty,
    productPrice: PRODUCT_PRICE,
    productsTotal: subtotal,
    deliveryPrice: deliveryFee,
    totalPrice: total
  };

  try {
    if (GOOGLE_SCRIPT_URL) {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
  } catch (err) {
    console.warn("Google Sheets submission skipped/failed:", err);
  }

  safeFbq("track", "Lead", {
    content_name: PRODUCT_NAME,
    value: total,
    currency: "DZD"
  });

  showSuccessModal(orderId);

  submitBtn.disabled = false;
  submitBtn.textContent = originalText;
  document.getElementById("orderForm").reset();
  document.getElementById("quantity").value = 1;
  toggleAddressField();
  updateDeliveryPricesForWilaya();
  updateSummary();
}

/* =====================================================================
   SUCCESS MODAL
===================================================================== */
function showSuccessModal(orderId) {
  const modal = document.getElementById("successModal");
  document.getElementById("modalOrderId").textContent = `رقم الطلب: ${orderId}`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("modalCloseBtn")?.addEventListener("click", closeSuccessModal);
document.getElementById("modalBackdrop")?.addEventListener("click", closeSuccessModal);
