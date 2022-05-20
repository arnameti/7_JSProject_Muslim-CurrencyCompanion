'use strict';

/*
// Old Version
if (!urlValue.includes('http://', 'https://')) {     
    urlValue = `https://${urlValue}`; 
} 
 
// New Version
if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
     urlValue = `https://${urlValue}`; 
}
*/

const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEL = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal, Focus on Input
const showModal = function () {
  modal.classList.add('show-modal');
  websiteNameEL.focus();
};

//  Modal Event Listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);
window.addEventListener('click', e =>
  e.target === modal ? modal.classList.remove('show-modal') : false
);

const showMessage = function (message) {
  alert(message);
};

const nameAndUrlAreValid = function (nameValue, urlValue) {
  return !(!nameValue || !urlValue);
};

const urlIsValid = function (urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  return urlValue.match(regex);
};

// Validate Form
const validate = function (nameValue, urlValue) {
  if (!nameAndUrlAreValid(nameValue, urlValue)) {
    showMessage('Please submit values for both fields');
  }

  if (!urlIsValid(urlValue)) showMessage('Please provide a valid web address');

  return nameAndUrlAreValid(nameValue, urlValue) && urlIsValid(urlValue);
};

// Fetch Bookmarks

const fetchBookmarks = function () {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create a bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Jacinto Design',
        url: 'https://jacinto.desing',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
};

// Handle Data from Form
const storeBookmark = function (e) {
  e.preventDefault();
  const nameValue = websiteNameEL.value;
  let urlValue = websiteUrlEl.value;

  if (!urlValue.includes('https://') && !urlValue.includes('http://'))
    urlValue = `https://${urlValue}`;

  if (!validate(nameValue, urlValue)) return;

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEL.focus();
};

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
