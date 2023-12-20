let btnInput = document.getElementById("add");
let siteNameInput = document.getElementById("siteName");
let urlInput = document.getElementById("url");
let regexName = /^[a-zA-Z0-9_ ]*$/;
let regexUrl =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
let sites = [];

if (localStorage.getItem("links") != null) {
  sites = JSON.parse(localStorage.getItem("links"));
  displaySites(sites);
}

siteNameInput.addEventListener("keyup", () => {
  validateForSiteName();
});

urlInput.addEventListener("keyup", () => {
  validateForUrl();
});

btnInput.addEventListener("click", (e) => {
  validateInputs();
  if (validateInputs()) {
    addSite();
  }
});

function validateInputs() {
  validateForSiteName();
  validateForUrl();
  if (validateForSiteName() && validateForUrl()) {
    return true;
  }
  return false;
}
function validateForSiteName() {
  let siteNameValue = siteNameInput.value;
  let sitNa = false;
  if (siteNameValue === "") {
    setErrorFor(siteNameInput, `Site Name Can't Be Empty`);
    document.getElementById("img").src = "imgs/2.gif";
  } else if (siteNameValue.length < 3) {
    setErrorFor(siteNameInput, `Site Name Must Be More 3 Chars`);
    document.getElementById("img").src = "imgs/2.gif";
  } else if (
    siteNameValue.charAt(0) == " " ||
    siteNameValue.charAt(siteNameValue.length - 1) == " "
  ) {
    setErrorFor(siteNameInput, `Site Name Shouldn't Start Or End With Spaces`);
    document.getElementById("img").src = "imgs/2.gif";
  } else if (!regexName.test(siteNameValue)) { 
    setErrorFor(siteNameInput, `Site Name Shouldn't Have Speacial Chars`);
    document.getElementById("img").src = "imgs/2.gif";
  }
  else {
    setSuccessFor(siteNameInput);
    document.getElementById("img").src = "imgs/1.gif";
    sitNa = true;
  }
  return sitNa;
}

function validateForUrl() {
  let urlValue = urlInput.value;
  let url = false;
  if (urlValue === "") {
    setErrorFor(urlInput, `Url Can't Be Empty`);
    document.getElementById("img").src = "imgs/2.gif";
  } else if (!regexUrl.test(urlValue)) {
    setErrorFor(urlInput, `Pleaze Enter a Valid Url`);
    document.getElementById("img").src = "imgs/2.gif";
  } else {
    setSuccessFor(urlInput);
    document.getElementById("img").src = "imgs/1.gif";
    url = true;
  }
  return url;
}

function setErrorFor(input, message) {
  let formControl = input.parentElement;
  let small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
}

function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
}

function addSite() {
  let site = {
    siteName: siteNameInput.value,
    url: urlInput.value,
  };
  sites.push(site);
  localStorage.setItem("links", JSON.stringify(sites));
  displaySites(sites);
}

function displaySites(sites) {
  let sitesData = "";
  for (let i = 0; i < sites.length; i++) {
    sitesData += `
        <div>
        <img src="imgs/3.PNG" alt="Imogi">
        <div class='site-name'>${sites[i].siteName}</div>
        <a class="visit" target="_blank"  href="${sites[i].url}"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        <a class="del" data-index=${i} ><i class="fa-solid fa-trash-can"></i>Delete</a>
        </div>
    `;
  }
  document.getElementById("Valid-url").innerHTML = sitesData;
  addDeletBtn();
}

function addDeletBtn() {
  for (let i = 0; i < sites.length; i++) {
    let del = document
      .querySelectorAll(".del")
      [i].addEventListener("click", (e) => {
        e.preventDefault();
        let index = document
          .querySelectorAll(".del")
          [i].getAttribute("data-index");
        deleteSite(index);
      });
  }
}

function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(sites));
  displaySites(sites);
}

function ClearForm() {
  siteNameInput.value = "";
  urlInput.value = "";
}

document.getElementById('clear').addEventListener('click', () => {
  ClearForm();
})
