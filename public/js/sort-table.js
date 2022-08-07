import { createTableBody } from "./create-table.js";
import { loadClientsList } from "./api.js";

export function sortTable() {
  document.querySelector('.table__thead').addEventListener('click', function (e) {
    if (e.target.tagName != 'BUTTON') return;

    let btn = e.target;
    let btnName = btn.dataset.type;

    loadList()

    async function loadList() {
      let listToSort = await loadClientsList();

      function sortByField(fieldName) {
        if (btn.classList.contains('arrow-up')) {
          listToSort.sort(byFieldUp(fieldName));
        } else {
          listToSort.sort(byFieldDown(fieldName));
        }
      }

      if (btnName == 'id') {
        sortByField('id');
      }
      if (btnName == 'fullname') {
        sortByField('surname');
      }
      if (btnName == 'date') {
        sortByField('createdAt');
      }
      if (btnName == 'last-change') {
        sortByField('updatedAt');
      }

      btn.classList.toggle('arrow-up');

      const tableBody = document.querySelector('.table__body');

      tableBody.querySelectorAll('tr').forEach(e => {
        e.remove();
      });

      createTableBody(listToSort);

      function byFieldDown(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
      }

      function byFieldUp(field) {
        return (a, b) => a[field] < b[field] ? 1 : -1;
      }
    }
  });
}
