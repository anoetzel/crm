import { getClientPerId, deleteClient, patchClient } from "./api.js";
import { createNewContact, deleteContact } from "./create-delete-contacts.js";
import { saveClient } from "./save-client.js";
import { Modal } from './modal.js';

const saveBtn = document.querySelector('.form__save');
const surnameInput = document.querySelector('.form__surname');
const firstnameInput = document.querySelector('.form__name');
const lastnameInput = document.querySelector('.form__lastname');

const modalWin = new Modal({
  isOpen: () => {},
  isClose: () => {}
});

export async function showClient(id, btn) {
  try {
    btn.classList.add('client__change--load');

    const response = await getClientPerId(id);

    if (response.status === 200 || response.status === 201) {
      const clientInfo = await response.json();

      modalWin.open();
      document.querySelector('.form__legend').innerHTML = `Change the data <span class="form__id">ID: ${id}</span>`

      surnameInput.value = clientInfo.surname;
      firstnameInput.value = clientInfo.name;
      lastnameInput.value = clientInfo.lastName;

      document.querySelectorAll('.form__input').forEach(el => {
        if (el.value.trim() != 0) {
          el.nextElementSibling.classList.add('form__placeholder--not-empty');
          deleteContact();
        }
      });

      const contacts = clientInfo.contacts;

      for (let i = 0; i < contacts.length; i++) {
        createNewContact();
      }

      const contactInputs = document.querySelectorAll('.form__input-contact');
      const contactDelete = document.querySelectorAll('.form__delete-contact');
      const selects = document.querySelectorAll('.choices');

      for (let i = 0; i < contacts.length; i++) {
        for (let j = 0; j < contactInputs.length; j++) {
          if (j === i) {
            contactInputs[j].value = contacts[i].value;
          }
        }

        for (let j = 0; j < selects.length; j++) {
          const choices = selects[j].querySelectorAll('.choices__list--single .choices__item--selectable');

          if (j === i) {
            choices.forEach(el => {
              el.setAttribute('data-value', contacts[i].type);
              el.textContent = contacts[i].type;
            });
          }
        }
      }

      contactInputs.forEach(elInput => {
        if (elInput.value) {
          contactDelete.forEach(elContact => {
            if (elInput.value.trim() != 0) {
              elContact.style.display = '';
              elInput.style.width = '';
              elInput.style.borderRight = 'none';
            } else {
              elContact.style.display = 'none';
              elInput.style.width = '68%';
              elInput.style.borderRight = '';
            }
          });
        }
      });

      const deleteClientBtn = document.querySelector('.form__cancel');
      deleteClientBtn.classList.add('delete-btn');
      deleteClientBtn.textContent = 'Delete client';

      btn.classList.remove('client__change--load');

      deleteClientBtn.addEventListener('click', () => {
        deleteClient(id);
        console.log('I delete');
      });

      saveBtn.removeEventListener('click', saveClient);

      saveBtn.addEventListener('click', async () => {
        let clientContacts = document.querySelectorAll('.form__contact-item');
        const selects = document.querySelectorAll('.choices');

        let arrayContacts = [];

        for (let i = 0; i < clientContacts.length; i++) {
          for (let j = 0; j < selects.length; j++) {
            const choices = selects[j].querySelectorAll('.choices__list--single .choices__item--selectable');

            if (j === i) {
              choices.forEach(el => {
                let select = el.getAttribute('data-value');
                const input = clientContacts[i].querySelector('.form__input-contact').value;
                arrayContacts.push({
                  type: select,
                  value: input
                });
              });
            }
          }
        }

        try {
          const disabledWindow = document.createElement('div');
          disabledWindow.classList.add('disabled');
          document.body.append(disabledWindow);

          const response = await patchClient(id, arrayContacts, surnameInput.value.trim(), firstnameInput.value.trim(), lastnameInput.value.trim());
          if (response === 200 || response === 201) {
            disabledWindow.remove();
            modalWin.close();
          } else {
            errorField.innerHTML = `Something went wrong <br><br>`;
          }
        } catch (error) {
          console.log(error);
        }
      });
    }

  } catch (err) {
    btn.classList.add('client__change--load');
    console.log(err);
  }
}
