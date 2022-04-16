export async function loadClientsList() {
  const response = await fetch('http://localhost:3000/api/clients');
  const list = await response.json();
  return list;
}


export function deleteClient(id) {
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
}

export async function getClientPerId(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`);
  return response;
}

export async function createClient(array, name, surname, lastname) {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        name,
        surname,
        lastName: lastname,
        contacts: array
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const newClient = await response.json();
    console.log(newClient);
  } catch (e) {
    console.error(e);
  }
}

export async function patchClient(id, array, surname, name, lastname) {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        surname,
        lastName: lastname,
        contacts: array
      }),
      headers: {
        'Content-Type': 'appication/json',
      }
    });

    return res.status;
}

export async function searchAPI(searchString) {
  const response = await fetch(`http://localhost:3000/api/clients?search=${searchString}`);
  const searchedClients = await response.json();
  return {searchedClients, searchString};
}
