let btnsForOrder = document.querySelectorAll(".goods__button");
let btnSubmit = document.querySelector(".form__button");
let orderForm = document.querySelector(".form");

for (let btnForOrder of btnsForOrder) {
  btnForOrder.addEventListener("click", function () {
    let goodName = btnForOrder.parentElement.querySelector(".goods__header").textContent;
    let goods = document.querySelectorAll("option");

    for (let good of goods) {
      if (good.value === goodName) {
        good.setAttribute("selected", "selected");
        console.log(good);
      }
    }
  }); //function click
}

orderForm.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  let errorCounter = FormValidate(orderForm);
  let formData = new FormData(orderForm);

  if (errorCounter === 0) {
    orderForm.classList.add("_sending");

    let response = await fetch("/sendmail.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let result = await response.json;
      alert(result.message);
      orderForm.reset();
      orderForm.classList.remove("_sending");
    } else {
      alert("что-то пошло не так");
    }
  } else {
    alert("заполните обязательные поля");
    orderForm.classList.remove("_sending");
  }
}

function FormValidate(orderForm) {
  let errorCounter = 0;
  let formReq = document.querySelectorAll("._rec");

  for (let i = 0; i < formReq.length; i++) {
    const input = formReq[i];
    formRemoveError(input);

    if (input.type === "tel") {
      if (telTest(input)) {
        formAddError(input);
        errorCounter++;
      }
    } else {
      if (input.value === "") {
        formAddError(input);
        errorCounter++;
      }
    }
  }
  return errorCounter;
}

function formAddError(input) {
  input.classList.add("_error");
}

function formRemoveError(input) {
  input.classList.remove("_error");
}

function telTest(input) {
  return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
}
