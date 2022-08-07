import { searchAPI } from "./api.js";

const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');

export function searchClient() {
  let timeoutID,
    searchedObj;

  searchInput.addEventListener('input', () => {
    deleteAllLists();

    if (!searchInput.value.trim()) return;

    if (searchInput.value == 0) {
      deleteAllLists();
    }

    const markedNames = document.querySelectorAll('.table__name');
    const selectedNames = document.querySelectorAll('.strong-text');

    markedNames.forEach(el => {
      el.classList.remove('marked');
    });

    if (selectedNames) {
      selectedNames.forEach(el => {
        const elem = el.closest('td');
        elem.innerHTML = elem.textContent;
      });
    }

    timeoutID = setTimeout(searchRequest, 300);

    async function searchRequest() {
      clearTimeout(timeoutID);
      searchedObj = await searchAPI(searchInput.value);

      const searchedText = searchedObj.searchedClients;
      const searchedString = searchedObj.searchString;

      autocomplete(searchedText, searchedString);
    }
  });

  function autocomplete(array, string) {
    deleteAllLists();

    const searchList = document.createElement('ul');
    searchList.classList.add('autocomplete');

    if (array.length == 0) {
      searchList.innerHTML = `
        <li class="autocomplete__item">Nothing is found</li>
      `;
    }

    for (const item of array) {

      const searchItem = document.createElement('li');
      searchItem.classList.add('autocomplete__item');
      searchItem.setAttribute('id', item.id);
      searchItem.setAttribute('tabindex', 0);

      searchItem.innerHTML = `${item.surname} ${item.name} ${item.lastName}`;
      searchItem.innerHTML = searchItem.innerHTML.replace(string, `<strong>${string}</strong>`);

      searchList.append(searchItem);
    }

    searchForm.append(searchList);

    document.body.querySelector('.autocomplete').addEventListener('click', event => {
      event._isClickWithinSearchedList = true;
      console.log( event._isClickWithinSearchedList);
    });

    document.body.addEventListener('click', (event) => {
      if (event._isClickWithinSearchedList) return;
      console.log(event._isClickWithinSearchedList);
      deleteAllLists();
    });

    const items = document.querySelectorAll('.autocomplete__item');

    items.forEach(el => {
      el.addEventListener('click', () => {
        chooseItem(el, string);
        searchInput.value = '';
      });
    });
  }

  function deleteAllLists() {
    const list = document.querySelector('.autocomplete');

    if (!list) return;
    list.remove();
  }

  function chooseItem(item, text) {
    const itemSearchId = item.getAttribute('id');
    const tableItem = document.querySelectorAll('.table__id-link');

    deleteAllLists()

    tableItem.forEach(el => {
      const tableItemId = el.textContent;
      const itemNames = el.closest('tr').querySelector('.table__name');

      itemNames.innerHTML = itemNames.innerHTML.replace(text, `<strong class="strong-text">${text}</strong>`);

      if (tableItemId === itemSearchId) {
        let link = el.closest('td');
        link.scrollIntoView();
        const selectedName = link.closest('tr').querySelector('.table__name');

        selectedName.classList.add('marked');
      }
    });
  }

  let currentFocus = -1;

  searchInput.addEventListener("keydown", e => {
    const list = document.querySelector('.autocomplete');
    let item;

    if (list) {
      item = list.getElementsByTagName('li');
    }

    if (e.keyCode == 40) {
      currentFocus++;
      addActive(item);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(item);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (item) item[currentFocus].click();
      }
    }
  });

  function addActive(item) {
    if (!item) return false;

    removeActive(item);

    if (currentFocus >= item.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (item.length - 1);
    item[currentFocus].classList.add('marked');
  }

  function removeActive(item) {
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove('marked');
    }
  }
}
