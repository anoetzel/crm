export function createTableBody(array) {
  for (const client of array) {
    const tr = document.createElement('tr');
    let dateCreated = new Date(Date.parse(client.createdAt));
    let dayCreated = dateCreated.getDate() + '.' + (dateCreated.getMonth() + 1) + '.' + dateCreated.getFullYear();
    let timeCreated = dateCreated.getHours() + ':' + (dateCreated.getMinutes() < 10 ? '0' : '') + dateCreated.getMinutes();

    let dateUpdated = new Date(Date.parse(client.updatedAt));
    let dayUpdated = dateUpdated.getDate() + '.' + (dateUpdated.getMonth() + 1) + '.' + dateUpdated.getFullYear();
    let timeUpdated = dateUpdated.getHours() + ':' + (dateUpdated.getMinutes() < 10 ? '0' : '') + dateUpdated.getMinutes();

    tr.innerHTML = `
      <td class="table__id"><a class="table__id-link" href="#${client.id}">${client.id}</a></td>
      <td class="table__name">${client.surname} ${client.name} ${client.lastName}</td>
      <td>${dayCreated} <span class="client__time">${timeCreated}</span></td>
      <td>${dayUpdated} <span class="client__time">${timeUpdated}</span></td>
    `;

    const td = document.createElement('td');
    const ul = document.createElement('ul');

    for (const contact of client.contacts) {
      const li = document.createElement('li');

      ul.classList.add('contacts');
      li.classList.add('contacts__item');
      li.setAttribute('tabindex', '0');

      if (contact.type === 'Phone') {
        li.classList.add('client-tel');
      }
      if (contact.type === 'Email') {
        li.classList.add('client-mail');
      }
      if (contact.type === 'Facebook') {
        li.classList.add('client-fb');
      }
      if (contact.type === 'Vk') {
        li.classList.add('client-vk');
      }
      if (contact.type === 'Other') {
        li.classList.add('client-other');
      }

      li.setAttribute('data-contact', contact.value);
      li.setAttribute('data-type', contact.type);

      ul.append(li);
    }

    td.append(ul);
    tr.append(td);

    const change = document.createElement('td');
    change.innerHTML = `<td><button class="client__change-btn change modal-btn" data-path="add-client" data-animation="fadeInUp" data-speed="400"><span class="change-icon client__change"></span>Change</button> <button class="client__delete-btn delete modal-btn" data-path="delete-client" data-animation="fade" data-speed="300"><span class="delete-icon client__delete"></span>Delete</button></td>`;
    tr.append(change);

    document.querySelector('.table__body').append(tr);
  }

  moreContactsBtn();
}

function moreContactsBtn() {
  const contacts = document.querySelectorAll('.contacts');

  contacts.forEach(el => {
    const contactItems = el.querySelectorAll('.contacts__item');
    let more = contactItems.length - 4;

    if (contactItems.length > 5) {
      hideItems(contactItems);
      el.insertAdjacentHTML('beforeend', createBtn(more));
    }
  });

  function hideItems(array) {
    for (let i = 4; i <= array.length - 1; i++) {
      array[i].style.display = 'none';
    }
  }

  function createBtn(more) {
    return (
      `
        <li class="contacts__item more-contacts"> + ${more} </li>
        `
    );
  }

  let moreBtns = document.querySelectorAll('.more-contacts');

  moreBtns.forEach(el => {
    el.addEventListener('click', () => {
      let contactsToOpen = el.closest('ul').querySelectorAll('.contacts__item');
      let contactsTd = el.closest('td');

      contactsTd.style.paddingTop = '10px';
      contactsTd.style.paddingBottom = '10px';

      contactsToOpen.forEach(elem => {
        elem.style.display = 'inline-flex';
      });

      el.remove();
    });
  });
}
