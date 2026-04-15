window.onload = () => {
  let result = document.querySelector(".result");

  result.onclick = () => {

    let okl = Number(document.getElementById("okl").value);
    let prem = Number(document.getElementById("prem").value);
    let payday = Number(document.getElementById("payday").value);
    let paynight = Number(document.getElementById("paynight").value);
    let payceleb = Number(document.getElementById("payceleb").value);
    let payhours = Number(document.getElementById("payhours").value);

    let partpay = document.getElementById("partpay");
    let pay = document.getElementById("pay");
    let fullpay = document.getElementById("fullpay");
    let fullpaytax = document.getElementById("fullpaytax");
    let tax = document.getElementById("tax");

    // проверка В САМОМ НАЧАЛЕ
    if (!okl || !payhours) {
      alert("Заполни обязательные поля!");
      return;
    }


let paypart = okl*0.4;
let premtax = prem *0.86;
let pp = paypart+premtax;
let hourspay = okl / payhours;
let resday = hourspay * payday;
let resnight = hourspay*paynight;
let resceleb = hourspay*payceleb;
let resall = resday+resnight+resceleb;
let taxtwo = resall*0.02;
let taxtwelve = ((resall-taxtwo)-156)*0.12;
let resultpay =resall-taxtwo-taxtwelve;
let rpwopp = resultpay-paypart
let restax = resall-resultpay
let res = resall



    partpay.value=pp.toFixed(2);
    pay.value=rpwopp.toFixed(2);
    fullpay.value=resultpay.toFixed(2);
    fullpaytax.value=res.toFixed(2);
    tax.value=restax.toFixed(2);
  
}}