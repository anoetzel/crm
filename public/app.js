import {
  loadClientsList
} from './js/api.js';
import {
  createTableBody
} from './js/create-table.js';
import {
  sortTable
} from './js/sort-table.js';
import {
  makeClientPage
} from './js/client-page.js';
import {
  changeClient
} from './js/change-client.js';
import {
  searchClient
} from './js/search.js';
import {
  saveClient
} from './js/save-client.js';
import {
  createNewContact
} from './js/create-delete-contacts.js';
import {
  Modal
} from './js/modal.js';

const addContactBtn = document.querySelector('.js-add-contact');
const inputs = document.querySelectorAll('.form__input');
const errorField = document.querySelector('.form__error');
const saveBtn = document.querySelector('.form__save');
const cancelBtn = document.querySelector('.form__cancel');
const table = document.querySelector('.table');

let tooltipElem,
  thTitle;

  // Modal window
const modalWin = new Modal({
  isOpen: () => {},
  isClose: () => {}
});

async function showClientsList() {
  const list = await loadClientsList();

  createTableBody(list);

  document.querySelector('.preloader').style.display = 'none';
  document.querySelector('.btn').style.display = 'flex';

  if (location.hash) {
    let clientId = location.hash.slice(1);
    makeClientPage(clientId);
    document.body.classList.add('disable-scroll');
    document.querySelector('.modal').classList.add('is-open');

    setTimeout(() => {
      document.querySelector('.show-client-page').classList.add('modal-opened');
    }, 400);
  }

  focusContacts();
}
showClientsList();

sortTable();

changeClient();

searchClient();


window.addEventListener('hashchange', () => {
  let clientId = location.hash.slice(1);
  makeClientPage(clientId);

  if (location.hash) {
    let clientId = location.hash.slice(1);
    makeClientPage(clientId);
    document.body.classList.add('disable-scroll');
    document.querySelector('.modal').classList.add('is-open');

    setTimeout(() => {
      document.querySelector('.show-client-page').classList.add('modal-opened');
    }, 400);
  }
});

// Tooltip by contacts
table.addEventListener('pointerover', e => {
  let target = e.target;
  let tooltipHtml = target.dataset.contact;
  let contactType = target.dataset.type;

  if (!tooltipHtml) return;

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip-top';
  tooltipElem.innerHTML = `<span class="contacts__type">${contactType}:</span> ${tooltipHtml}`;
  document.body.append(tooltipElem);

  let coords = target.getBoundingClientRect();
  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  let top = coords.top - tooltipElem.offsetHeight - 12;

  if (left < 0) left = 5;
  if (top < 0) {
    top = coords.top + target.offsetHeight + 12;
    tooltipElem.classList.add('tooltip-bottom');
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
});

table.addEventListener('pointerout', e => {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
});

// Focus on buttons of contacts
function focusContacts() {
  const contactItemsTooltips = document.querySelectorAll('.contacts__item');
  contactItemsTooltips.forEach(el => {
    el.addEventListener('focus', () => {
      let tooltipHtml = el.dataset.contact;
      let contactType = el.dataset.type;

      if (!tooltipHtml) return;

      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip-top';
      tooltipElem.innerHTML = `<span class="contacts__type">${contactType}:</span> ${tooltipHtml}`;
      document.body.append(tooltipElem);

      let coords = el.getBoundingClientRect();
      let left = coords.left + (el.offsetWidth - tooltipElem.offsetWidth) / 2;
      let top = coords.top - tooltipElem.offsetHeight - 12;

      if (left < 0) left = 5;
      if (top < 0) {
        top = coords.top + el.offsetHeight + 12;
        tooltipElem.classList.add('tooltip-bottom');
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    });

    el.addEventListener('blur', () => {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    });
  });
}

// Tooltip by table sort
document.querySelector('.table__thead').addEventListener('pointerover', e => {
  if (e.target.tagName != 'BUTTON') return;

  let tooltipHtml,
    btn = e.target;

  if (btn.classList.contains('arrow-up')) {
    tooltipHtml = 'Sort descending';
  } else {
    tooltipHtml = 'Sort ascending';
  }

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip-top';
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  let coords = btn.getBoundingClientRect();
  let left = coords.left + (btn.offsetWidth - tooltipElem.offsetWidth) / 2;
  let top = coords.top - tooltipElem.offsetHeight - 12;

  if (left < 0) left = 5;
  if (top < 0) {
    top = coords.top + btn.offsetHeight + 12;
    tooltipElem.classList.add('tooltip-bottom');
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  thTitle = btn.closest('th').querySelector('span');
  thTitle.style.color = '#333';
});

document.querySelector('.table__thead').addEventListener('pointerout', () => {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
    thTitle.style.color = '';
  }
});

saveBtn.addEventListener('click', saveClient);

addContactBtn.addEventListener('click', createNewContact);

cancelBtn.addEventListener('click', () => {
  modalWin.close();
});

inputs.forEach(el => {
  el.addEventListener('input', deleteError);
});


function deleteError() {
  this.classList.remove('is-error');
  errorField.innerHTML = '';
  document.querySelector('.form__contacts').style.marginBottom = '';
  errorField.style.marginBottom = '';
}

function isInputEmpty() {
  inputs.forEach(el => {
    el.addEventListener('input', () => {
      if (el.value.trim() != 0) {
        el.nextElementSibling.classList.add('form__placeholder--not-empty');
      } else {
        el.nextElementSibling.classList.remove('form__placeholder--not-empty');
      }
    })
  })
}
isInputEmpty();
