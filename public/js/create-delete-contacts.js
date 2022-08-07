
const contactsList = document.querySelector('.form__list');
const addContactBtn = document.querySelector('.js-add-contact');

export function createNewContact() {
  if (contactsList.childNodes.length <= 10) {
    const newContact = document.createElement('li');
    const select = document.createElement('select');
    const optionsArray = ['Phone', 'Email', 'Facebook', 'Vk', 'Other'];
    const input = document.createElement('input');
    const deleteContact = document.createElement('span');
    const deleteContactBtn = document.createElement('button');

    input.setAttribute('placeholder', 'Enter contact details');
    select.setAttribute('id', 'select');

    contactsList.classList.add('js-contacts-list');
    newContact.classList.add('form__contact-item');
    select.classList.add('form__select');
    input.classList.add('form__input-contact');
    deleteContact.classList.add('form__delete-contact');
    deleteContactBtn.classList.add('form__delete-btn');
    addContactBtn.style.marginBottom = '25px';

    contactsList.append(newContact);
    newContact.append(select);
    newContact.append(input);
    deleteContact.append(deleteContactBtn);
    newContact.append(deleteContact);

    if (input.value.trim() == 0) {
      deleteContact.style.display = 'none';
      input.style.width = '68%';
    }

    for (let i = 0; i < optionsArray.length; i++) {
      const option = document.createElement('option');
      option.value = optionsArray[i];
      option.label = optionsArray[i];

      select.append(option);
    }
  }
  if (contactsList.childNodes.length == 10) {
    addContactBtn.style.display = 'none';
  }

  customizeSelect();
  deleteContact();
}

export function deleteContact() {
  const contactInputs = document.querySelectorAll('.form__input-contact');
  const contacts = document.querySelectorAll('.form__delete-contact');
  const deleteContactBtns = document.querySelectorAll('.form__delete-btn');

  contactInputs.forEach(elInput => {
    elInput.addEventListener('input', () => {
      contacts.forEach(elContact => {
        if (elInput.value.trim()) {
          elContact.style.display = '';
          elInput.style.width = '';
          elInput.style.borderRight = 'none';
        } else {
          elContact.style.display = 'none';
          elInput.style.width = '68%';
          elInput.style.borderRight = '';
        }
      });
    });
  });

  deleteContactBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      console.log(el.closest('.form__contact-item'));
      e.stopPropagation();
      el.closest('.form__contact-item').remove();
      isAnyContact();
    })
  });
}

export function deleteAllContacts() {
  const contactItems = document.querySelectorAll('.form__contact-item');
  contactItems.forEach(el => {
    el.remove();
  })
}

function isAnyContact() {
  const contactItems = document.querySelectorAll('.form__contact-item');
  if (contactItems.length == 0) {
    contactsList.classList.remove('js-contacts-list');
    addContactBtn.style.marginBottom = '';
  }
  if (contactItems.length < 10) {
    addContactBtn.style.display = 'block';
  }
}

function customizeSelect() {
  const elements = document.querySelectorAll('.form__select');
  elements.forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      placeholder: false,
      itemSelectText: '',
      shouldSort: false,
      classNames: {
        containerOuter: 'choices select',
      },
    });
  })
}
