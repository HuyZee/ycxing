function showDeliveryAddressContainer() {
  removeHiddenClassFromAnElement("#delivery-address-details-container");
}

function hideDeliveryAddressContainer() {
  addHiddenClassFromAnElement("#delivery-address-details-container");
}

function showCreditCardInformation() {
  removeHiddenClassFromAnElement("#credit-card-info-container");
}
function hideCreditCardInformation() {
  addHiddenClassFromAnElement("#credit-card-info-container");
}

function removeHiddenClassFromAnElement(elementCSSSelector) {
  document.querySelector(elementCSSSelector).classList.remove("hidden");
}

function addHiddenClassFromAnElement(elementCSSSelector) {
  document.querySelector(elementCSSSelector).classList.add("hidden");
}

function enableSameAsBillingAddressForDeliveryAddress() {
  document.querySelector("#deliveryaddress-address").value =
    document.querySelector("#billingaddress-address").value;
  document.querySelector("#deliveryaddress-country").value =
    document.querySelector("#billingaddress-country").value;
  document.querySelector("#deliveryaddress-postcode").value =
    document.querySelector("#billingaddress-postcode").value;
}
function disableSameAsBillingAddressForDeliveryAddress() {
  document.querySelector("#deliveryaddress-address").value = "";
  document.querySelector("#deliveryaddress-country").value = "";
  document.querySelector("#deliveryaddress-postcode").value = "";
}
var navLinks = document.getElementById("navLinks");
function hideMenu() {
  navLinks.style.right = "-200px";
}
function showMenu() {
  navLinks.style.right = "0";
}

function init() {
  // Nav menu show and hide
  document.getElementById("showMenu").onclick = showMenu;
  document.getElementById("hideMenu").onclick = hideMenu;
  // Order html
  const orderForm = document.querySelector(".orderform");
  //   If order form is not null, we know that we are on order.html which means other null check is unnecessary
  if (orderForm !== null) {
    orderForm.onsubmit = orderFormValidation;
    const deliveryTickbox = document.querySelector("#delivery-tickbox");
    const bycardTickbox = document.querySelector("#by-card-tickbox");
    const sameAsBillingTickbox = document.querySelector(
      "#same-as-billing-address-tickbox"
    );
    orderForm.addEventListener("change", function (event) {
      // Handle whether the DOM should show delivery address container
      if (deliveryTickbox.checked) {
        showDeliveryAddressContainer();
      } else {
        hideDeliveryAddressContainer();
      }
      // Handle whether the DOM should show credit card info container
      if (bycardTickbox.checked) {
        showCreditCardInformation();
      } else {
        hideCreditCardInformation();
      }

      if (sameAsBillingTickbox.checked) {
        enableSameAsBillingAddressForDeliveryAddress();
      } else {
        disableSameAsBillingAddressForDeliveryAddress();
      }
      if (document.getElementById("Visa").checked) {
        document.getElementById("cardNumber").setAttribute("maxlength", 16);
      } else if (document.getElementById("Mastercard").checked) {
        document.getElementById("cardNumber").setAttribute("maxlength", 16);
      } else if (document.getElementById("AmericanExpress").checked) {
        document.getElementById("cardNumber").setAttribute("maxlength", 15);
      }
    });
  }

  //   Register html
  const registerForm = document.querySelector("#registerForm");
  if (registerForm != null) {
    registerForm.onsubmit = registerFormValidation;
  }
}

init();

function registerFormValidation() {
  var result = true;
  var userID = document.getElementById("uid").value;
  var pwd1 = document.getElementById("pwd1").value;
  var pwd2 = document.getElementById("pwd2").value;
  var name = document.getElementById("name").value;
  var isMaleChecked = document.getElementById("isMaleTickbox").checked;
  var isFemaleChecked = document.getElementById("isFemaleTickbox").checked;
  var favoriteTacosTickboxes = Array.from(
    document.getElementsByClassName("favourite-tacos")
  );
  var errMsg = "";
  var onlyLettersRegEx = /^[a-zA-Z ]+$/;
  if (userID == "") {
    errMsg += "User ID cannot be empty.\n";
  }
  if (pwd1 == "") {
    errMsg += "Password cannot be empty.\n";
  }
  if (pwd1.length < 8) {
    errMsg += "Password must be at least 8 characters long";
  }
  if (pwd2 == "") {
    errMsg += "Retype password cannot be empty.\n";
  }
  if (name == "") {
    errMsg += "User name cannot be empty.\n";
  }
  if (!isMaleChecked && !isFemaleChecked) {
    errMsg += "A gender must be selected.\n";
  }

  if (pwd1 != pwd2) {
    errMsg += "Passwords do not match.\n";
  }

  if (!name.match(onlyLettersRegEx) && name != "") {
    errMsg += "User name contains symbols.\n";
  }

  const checkedTacos = favoriteTacosTickboxes.filter(function (el) {
    return el.checked == true;
  });
  if (checkedTacos.length === 0) {
    errMsg += "Please select ur favorite tacos \n";
  }

  if (errMsg != "") {
    alert(errMsg);
    result = false;
  }
  return result;
}

function orderFormValidation() {
  var result = true;
  var errMsg = "";
  const fourDegitRegEx = /\d{4}$/;
  const idsForElementsValueThatIsNeededToCheckForEmpty = [
    "billingaddress-address",
    "billingaddress-country",
    "billingaddress-postcode",
  ];
  if (document.querySelector("#delivery-tickbox").checked) {
    idsForElementsValueThatIsNeededToCheckForEmpty.push(
      ...[
        "deliveryaddress-address",
        "deliveryaddress-country",
        "deliveryaddress-postcode",
      ]
    );
  }
  if (document.querySelector("#by-card-tickbox").checked) {
    idsForElementsValueThatIsNeededToCheckForEmpty.push(
      ...["cardNumber", "CVV-number"]
    );
  }
  idsForElementsValueThatIsNeededToCheckForEmpty.forEach(function (id) {
    const el = document.getElementById(id);
    if (el != null) {
      const value = el.value;
      if (value == "") {
        errMsg += `You need to fill out ${el
          .classList.toString().replace(","," ")
          } \n`;
      }
    }
  });

  if (
    !document
      .querySelector("#billingaddress-postcode")
      .value.match(fourDegitRegEx)
  ) {
    errMsg += "Post code can only be four digits";
  }

  if (errMsg != "") {
    alert(errMsg);
    result = false;
  }
  return result;
}
// feature linking
function showMobileFeature() {
  newWindow = window.open("./features.html", "", "width=100, height=100");
  newWindow.resizeTo(700, 1000); // Resizes the new window
  newWindow.focus(); // Sets focus to the new window


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

}

