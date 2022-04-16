import { showClient } from "./show-client.js";
import { createModalDelete } from "./delete-client.js";

export function changeClient() {
  document.querySelector('.table__body').addEventListener('click', (e) => {
    const changeClient = e.target.closest('button');
    if (!changeClient) return;

    const client = e.target.closest('tr');
    const clientId = client.querySelector('.table__id').textContent;
    let btnChange = changeClient.classList.contains('change');
    let btnDelete = changeClient.classList.contains('delete');

    if (btnChange) {
      const spinner = changeClient.querySelector('.change-icon');
      showClient(clientId, spinner);
    }

    if (btnDelete) {
      const spinner = changeClient.querySelector('.delete-icon');
      createModalDelete(clientId, spinner);
    }
  });
}
