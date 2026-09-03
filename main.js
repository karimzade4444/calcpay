window.onload = () => {
  const button = document.querySelector(".result");

  const get = (id) => {
    return document.getElementById(id);
  };

  // Форматирование денег
  const formatMoney = (value) => {
    return Number(value).toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Анимация изменения числа
  const animateValue = (element, finalValue) => {
    const target = Number(finalValue);

    const duration = 600;

    const start = performance.now();

    const startValue =
      Number(element.value.replace(/\s/g, "").replace(",", ".")) || 0;

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - start) / duration, 1);

      // плавность
      const ease = 1 - Math.pow(1 - progress, 3);

      const current = startValue + (target - startValue) * ease;

      element.value = formatMoney(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.value = formatMoney(target);
      }
    };

    requestAnimationFrame(animate);
  };

  button.onclick = () => {
    // Получаем значения
    const okl = Number(get("okl").value);
    const prem = Number(get("prem").value);

    const payday = Number(get("payday").value);
    const paynight = Number(get("paynight").value);
    const payceleb = Number(get("payceleb").value);

    const payhours = Number(get("payhours").value);

    // Проверка
    if (!okl || !payhours) {
      alert("Заполни оклад и стандартный рабочий час!");

      return;
    }

    if (payhours <= 0) {
      alert("Количество рабочих часов должно быть больше 0!");

      return;
    }

    if (payday < 0 || paynight < 0 || payceleb < 0 || prem < 0 || okl < 0) {
      alert("Значения не могут быть отрицательными!");

      return;
    }

    /*
    ==========================================
    ТВОЯ ФОРМУЛА
    ==========================================
    */

  // 40% оклада
const paypart = okl * 0.4;

// Премия после НДС 14%
const premtax = prem * 0.86;

// Зачисление 15 числа
const pp = paypart + premtax;

// Стоимость одного рабочего часа
const hourspay = okl / payhours;

// Дневные часы
const resday = hourspay * payday;

// Ночные × 1.5
const resnight = hourspay * paynight * 1.5;

// Праздничные × 2
const resceleb = hourspay * payceleb * 2;

// Все часы
const resall = resday + resnight + resceleb;

// 2%
const taxtwo = resall * 0.02;

// 12%
const taxtwelve = (resall - taxtwo - 156) * 0.12;

// Зарплата после налогов
const salaryAfterTax = resall - taxtwo - taxtwelve;

// Премия после НДС
const bonusAfterTax = prem * 0.86;

// ==========================================
// ОБЩЕЕ ЗАЧИСЛЕНИЕ С ПРЕМИЕЙ
// ==========================================

// Общая сумма, которая должна быть зачислена
const resultpay = salaryAfterTax + bonusAfterTax;

// Выплата 1 числа
const rpwopp = resultpay - paypart;

// ==========================================
// ОБЩЕЕ БЕЗ НДС
// ==========================================

// Зарплата + полная премия до вычета НДС
const res = salaryAfterTax + prem;

// НДС с премии
const bonusNds = prem - bonusAfterTax;

// Общий налог/НДС
const restax = resall - salaryAfterTax + bonusNds;

    /*
    ==========================================
    ВЫВОД
    ==========================================
    */

    animateValue(get("partpay"), pp);

    animateValue(get("pay"), rpwopp);

    animateValue(get("fullpay"), resultpay);

    animateValue(get("fullpaytax"), res);

    animateValue(get("tax"), restax);

    // Анимация результата
    const resultItems = document.querySelectorAll(".result-item");

    resultItems.forEach((item, index) => {
      item.style.animation = "none";

      // reflow
      void item.offsetWidth;

      item.style.animation = `fadeUp 0.5s ${index * 0.08}s ease both`;
    });
  };

  /*
  ==========================================
  ENTER = РАССЧИТАТЬ
  ==========================================
  */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const active = document.activeElement;

      if (active.tagName === "INPUT") {
        button.click();
      }
    }
  });
};
