import { getClientPerId } from "./api.js";

export async function makeClientPage(id) {
  const response = await getClientPerId(id);
  const clientInfo = await response.json();

  const contacts = clientInfo.contacts;

  let clientWindow = document.createElement('div');
  clientWindow.classList.add('modal__container', 'show-client-page');
  clientWindow.setAttribute('data-target', 'show-client-page')

  clientWindow.innerHTML = `
    <div class="form form-page">
      <span class="form__legend">Client: ${id}</span>
      <span class="form__title">Surname:</span>
      <span class="form__info">${clientInfo.surname}</span>
      <span class="form__title">Name:</span>
      <span class="form__info">${clientInfo.name}</span>
      <span class="form__title">Second name:</span>
      <span class="form__info">${clientInfo.lastName}</span>
      <ul class="form__contacts-list">
        <span class="form__title">Contacts:</span>
      </ul>
      <a class="btn index-page" href="index.html">Home</a>
    </div>
  `;
  /*const btnStartPage = document.createElement('a');
  btnStartPage.classList.add('btn', 'index-page');
  btnStartPage.textContent = 'Home';
  btnStartPage.style.display = 'block';
  btnStartPage.setAttribute('href', 'index.html');

  formPage.append(btnStartPage);*/

  /*let modalOverlayPage = document.createElement('div');
  let formPage = document.createElement('div');

  modalOverlayPage.classList.add('modal__container');
  formPage.classList.add('form', 'form-page');*/

  document.querySelector('.modal').append(clientWindow);
  //modalWindowPage.append(modalOverlayPage);
  //modalOverlayPage.append(formPage);

  /*formPage.innerHTML = `
        <span class="form__legend">Client: ${id}</span>
        <span class="form__title">Surname:</span>
        <span class="form__info">${clientInfo.surname}</span>
        <span class="form__title">Name:</span>
        <span class="form__info">${clientInfo.name}</span>
        <span class="form__title">Second name:</span>
        <span class="form__info">${clientInfo.lastName}</span>
  `;*/

  const clientContactsPage = document.querySelector('.form__contacts-list');
  //clientContactsPage.classList.add('form__contacts-list');
  //clientContactsPage.innerHTML = `<span class="form__title">Contacts:</span>`;

  for (let i = 0; i < contacts.length; i++) {
    const li = document.createElement('li');
    const type = document.createElement('span');
    const value = document.createElement('span');

    li.classList.add('form__contacts-item');

    type.innerHTML = `${contacts[i].type}: `;
    value.innerHTML = `<span class="form__info">${contacts[i].value}</span>`;

    li.append(type);
    li.append(value);
    clientContactsPage.append(li);
  }

  //formPage.append(clientContactsPage);



  //modalWindowPage.style.display = 'flex';
  //document.body.classList.add('disable-scroll');

  /*btnStartPage.addEventListener('click', () => {
    modalWindowPage.remove();
    location.hash = '';
    history.replaceState(null, null, ' ');
    body.classList.remove('noscroll');
    location.reload();
  });*/
}
