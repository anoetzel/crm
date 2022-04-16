import { deleteClient } from "./api.js";

export function createModalDelete(id, btn) {
  btn.classList.add('client__delete--load');

  const delWin = document.createElement('div');
  delWin.classList.add('modal__container', 'modal__delete-overlay');
  delWin.setAttribute('data-target', 'delete-client');

  delWin.innerHTML = `
  <button class="modal-close delete-close"></button>
  <div class="modal__delete-content">
    <strong class="modal__name">Delete client</strong>
    <p class="modal__descr">Are you sure you want to delete this client?</p>
    <button class="delete-btn">Delete</button>
    <button class="form__cancel cancel-btn">Cancel</button>
  </div>
  `;

  document.querySelector('.modal').append(delWin);

  document.body.append(modal);

  const modalDelete = document.querySelector('.modal');
  const modalDeleteContainer = document.querySelector('.modal__delete-overlay');

  btn.classList.remove('client__delete--load');

  modalDeleteContainer.addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  modalDelete.addEventListener('click', event => {
    if (event._isClickWithinModal) return;
    modalDeleteContainer.remove();
    document.body.classList.remove('disable-scroll');
  });

  document.querySelector('.delete-close').addEventListener('click', () => {
    modalDeleteContainer.remove();
    document.body.classList.remove('disable-scroll');
  });

  document.querySelector('.cancel-btn').addEventListener('click', () => {
    modalDeleteContainer.remove();
    modalDelete.classList.remove('is-open');
    document.body.classList.remove('disable-scroll');
  });

  document.querySelector('.delete-btn').addEventListener('click', () => {
    deleteClient(id);
    modalDeleteContainer.remove();
    document.body.classList.remove('disable-scroll');
    modalDelete.classList.remove('is-open');
    document.querySelector('.form').reset();
    //location.reload();
  });
}
