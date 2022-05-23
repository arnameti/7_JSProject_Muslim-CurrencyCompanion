'use strict';

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

// Build Bookmarks DOM
const buildBookmarks = function () {
  // Build Items
  bookmarks.forEach(bookmark => {
    const { name, url } = bookmark;
    const item = document.createElement('div');
    console.log(name, url);
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks Container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
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
        url: 'https://jacinto.design',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
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
