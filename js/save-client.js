import { createClient } from "./api.js";

const surnameInput = document.querySelector('.form__surname');
const firstnameInput = document.querySelector('.form__name');
const lastnameInput = document.querySelector('.form__lastname');
const errorField = document.querySelector('.form__error');

export function saveClient() {
  let errorSurname = '';
  let errorFirstname = '';
  let errorContact = '';
  let allContacts;
  const contactInputs = document.querySelectorAll('.form__input-contact');

  if (surnameInput.value.trim() == 0) {
    errorSurname = 'Enter your surname' + '<br>';
    surnameInput.classList.add('is-error');
  }
  if (firstnameInput.value.trim() == 0) {
    errorFirstname = 'Enter your name' + '<br>';
    firstnameInput.classList.add('is-error');
  }
  if (!document.querySelector('.form__input-contact')) {
    errorContact = 'Enter your contact';
  }
  contactInputs.forEach(el => {
    if (el.value.trim() == 0) {
      errorContact = 'Enter your contact';
      el.classList.add('is-error');
    } else {
      allContacts = true;
    }
  })

  errorField.innerHTML = errorSurname + errorFirstname + errorContact;
  document.querySelector('.form__contacts').style.marginBottom = '5px';
  errorField.style.marginBottom = '5px';

  clearContactInput();

  if (surnameInput.value.trim() != 0 &&
    firstnameInput.value.trim() != 0 &&
    allContacts == true) {
    let clientContacts = document.querySelectorAll('.form__contact-item');
    let arrayContacts = [];

    for (let i = 0; i < clientContacts.length; i++) {
      console.log(clientContacts);
      const select = clientContacts[i].querySelector('.form__select').value;
      const input = clientContacts[i].querySelector('.form__input-contact').value;
      arrayContacts.push({
        type: select,
        value: input
      });
    }

    createClient(arrayContacts, surnameInput.value.trim(), firstnameInput.value.trim(), lastnameInput.value.trim());

    location.reload();
  }
}

function clearContactInput() {
  document.querySelectorAll('.form__input-contact').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('is-error');
    })
  })
}
