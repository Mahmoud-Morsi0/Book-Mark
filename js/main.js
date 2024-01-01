var siteName = document.getElementsByTagName("input")[0];
var siteUrl = document.getElementsByTagName("input")[1];
var btnAdd = document.getElementsByTagName("button")[0];
var btnClear = document.getElementsByTagName("button")[1];
var table = document.getElementsByTagName("table")[0];
var tableBody = document.getElementsByTagName("tbody")[0];
var searchInput = document.getElementsByTagName("input")[2];
var allSites = [];
var mainIndex = 0;

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
function visableTable() {
  table.style.visibility = "visible";
}
function addNewSite() {
  var siteNameValue = siteName.value;
  var siteUrlValue = siteUrl.value;

  console.log({ siteNameValue, siteUrlValue });
  if (siteNameValue && siteUrlValue) {
    console.log("enter");
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    allSites.push(site);
  }
}

function displayNewRows() {
  var box = "";

  if (btnAdd.innerHTML == "Update") {
    btnAdd.innerHTML = "Add";

    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    allSites.splice(mainIndex, 1, site);
  } else {
    addNewSite();
  }
  for (var i = 0; i < allSites.length; i++) {
    box += `<tr>
        <td>${i + 1}</td>
        <td>${allSites[i].name}</td>
        <td><button class="btn bg-info"><a href="${allSites[i].url}">Visit</a></button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
        </tr>`;
  }

  console.log(allSites);
  tableBody.innerHTML = box;
  localStorage.setItem("allSites", JSON.stringify(allSites));
  visableTable();
  clear();
}

function deleteRow(index) {
  allSites.splice(index, 1);
  displayNewRows();
  localStorage.setItem("allSites", JSON.stringify(allSites));
}
function update(index) {
  siteName.value = allSites[index].name;
  siteUrl.value = allSites[index].url;
  btnAdd.innerHTML = "Update";
  mainIndex = index;
}

var temp = "";

function search(temp) {
  var newSits = [];
  var newbox = "";
  console.log(temp);
  var newSites = allSites.filter(function (element) {
    return element.name.includes(temp);
  });
  newSits.push(newSites);
  console.log(newSits);
  for (var i = 0; i < newSits.length; i++) {
    for (var j = 0; j < newSites.length; j++) {
      newbox += `<tr>
        <td>${j+1}</td>
        <td>${newSits[i][j].name}</td>
        <td><button class="btn bg-info"><a href="${newSits[i][j].url}">Visit</a></button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
        </tr>`;
    }
    if (temp === "") {
      displayNewRows();
    }
  }
  tableBody.innerHTML = newbox;
  console.log(newbox);
}

var userValidation = /^[A-Za-z_]{1,}$/;
function isaNameValid() {
  if (userValidation.test(siteName.value)) {
    return true;
  } else {
    return false;
  }
}
var urlValidation = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3,}$/;
function isUrlValid() {
  if (urlValidation.test(siteUrl.value)) {
    return true;
  } else {
    return false;
  }
}

siteName.onkeyup = function () {
  if (isaNameValid() && isUrlValid()) {
    btnAdd.removeAttribute("disabled");
  } else {
    btnAdd.disabled = true;
  }
};

siteUrl.onkeyup = function () {
  if (isaNameValid() && isUrlValid()) {
    btnAdd.removeAttribute("disabled");
  } else {
    btnAdd.disabled = true;
  }
};

console.log(isaNameValid());
console.log(isUrlValid());
btnAdd.addEventListener("click", displayNewRows);
btnClear.addEventListener("click", clear);
searchInput.addEventListener("keyup", function () {
  search(this.value);
});
