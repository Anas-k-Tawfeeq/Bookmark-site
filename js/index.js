const bookmarkNameInput = document.getElementById("bookmarkName");
const bookmarkURLInput = document.getElementById("bookmarkURL");
const addbtn=document.getElementById("addbtn")
var bookmarkList = [];
var productindex=0;
var searchitem=document.getElementById("searchbar")
var searchterm




if (localStorage.getItem("Bookmarks") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("Bookmarks"));
  displayBookmarks(bookmarkList);
}

function addupdateBookmark() {
  let bookmark = {
    siteName: bookmarkNameInput.value,
    siteURL: bookmarkURLInput.value,
  };
  
  if (isBookmarkNameUnique(bookmark.siteName)) {
    if (isValidName(bookmark.siteName) && isValidURL(bookmark.siteURL)) {
      if(addbtn.innerHTML=="Add bookmark"){
       bookmarkList.push(bookmark);}
      else{bookmarkList.splice(productindex,1,bookmark)
  
        addbtn.innerHTML="Add bookmark"
      }
      localStorage.setItem("Bookmarks", JSON.stringify(bookmarkList));
      displayBookmarks(bookmarkList);
      clearForm();
      
    } else {
      swal({
        title: "Name or URL is not valid!",
        text: `Please follow the rules below:
                > Site name must contain at least 3 characters
                > The URL must start with either http or https followed by :// 
                  it must contain www. followed by subdomain of length(2, 256)
                  last part contains top level domain like .com, .org etc.`,
      });
    }
  } else {
    swal({
      title: "Bookmark name already exists!",
      text: "Please enter a unique bookmark name.",
    });
  }
}

function isBookmarkNameUnique(name) {
  return !bookmarkList.some((bookmark) => bookmark.siteName === name);
}

function isValidName(name) {
  const validName = /^\w{3,}(\s+\w+)*$/;
  return validName.test(name);
}

function isValidURL(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))" + // domain name or IP address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url);
}

function validNameInput() {
  if (isValidName(bookmarkNameInput.value)) {
    bookmarkNameInput.classList.remove("is-invalid");
    bookmarkNameInput.classList.add("is-valid");
  } else {
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkNameInput.classList.add("is-invalid");
  }
}

function validURLInput() {
  if (isValidURL(bookmarkURLInput.value)) {
    bookmarkURLInput.classList.remove("is-invalid");
    bookmarkURLInput.classList.add("is-valid");
  } else {
    bookmarkURLInput.classList.remove("is-valid");
    bookmarkURLInput.classList.add("is-invalid");
  }
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}

function displayBookmarks() {
  searchterm=searchitem.value
  // console.log(searchterm)
  console.log(bookmarkList)
  let tableContent = ``;
  for (let i = 0; i < bookmarkList.length; i++) {

    if(bookmarkList[i].siteName.toLowerCase().includes(searchterm.toLowerCase())){
    tableContent += `
    <tr>
      <td>${i + 1}</td>
      <td>${bookmarkList[i].siteName}</td>
      <td><button class="btn btn-info" onclick="visitWebsite(${i});"> Visit</button></td>
      <td><button class="btn btn-info" onclick="updateBookmark(${i});"></i>Update</button></td>

      <td><button class="btn btn-info" onclick="deleteBookmark(${i});"></i>Delete</button></td>
    </tr>
        `;
  }}

  document.getElementById("bookmarkContent").innerHTML = tableContent;
}

function visitWebsite(i) {
  const httpRegEx = /^https?:\/\//;
  if (httpRegEx.test(bookmarkList[i].siteURL)) {
    window.open(bookmarkList[i].siteURL);
  } else {
    window.open(`https://${bookmarkList[i].siteURL}`);
  }
}

function deleteBookmark(i) {
  bookmarkList.splice(i, 1);
  localStorage.setItem("Bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks(bookmarkList);
}

function updateBookmark(i){
  productindex=i
  bookmarkNameInput.value =bookmarkList[i].siteName ;
  bookmarkURLInput.value = bookmarkList[i].siteURL;
  bookmarkList[i].siteName="temp for uniqueness check"
  addbtn.innerHTML="Update button"
  
}
// function search(){
//   searchitem=getElementById(searchbar)
//   searchterm=searchitem.value
//   for(var i=0, i<)
// }