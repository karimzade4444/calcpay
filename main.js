let okl = Number(document.getElementById("okl").value);
let prem = Number(document.getElementById("prem").value);
let payday = Number(document.getElementById("payday").value);
let paynight = Number(document.getElementById("paynight").value);
let payceleb = Number(document.getElementById("payceleb").value);
let payhours = Number(document.getElementById("payhours").value);

let partpay = Number(document.getElementById("partpay").value);
let pay = Number(document.getElementById("pay").value);
let fullpay = Number(document.getElementById("fullpay").value);
let fullpaytax = Number(document.getElementById("fullpaytax").value);
let tax = Number(document.getElementById("tax").value);
let result = document.querySelector(".result");

let index = 78;
let phys = 0.12;
let social = 0.02;

let paypart = okl * 0.4;
let premtax = prem * 0.86;

let pp = paypart + premtax;

let hourspay = okl / payhours;
let res = hourspay * payday * paynight * payceleb;
let resultpay = res - res * social - (res - index * 2) * phys;

let rpwopp = resultpay - paypart;

let restax = res - resultpay;

result.onclick = () => {
  partpay.value = paypart;
  pay.value = rpwopp;
  fullpay.value = resultpay;
  fullpaytax.value = res;
  tax.value = restax;
};
