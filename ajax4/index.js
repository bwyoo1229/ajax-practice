document.getElementById('button').addEventListener('click', loadUser);

function loadUser() {
  const xhr = new XMLHttpRequest();
  const loginValue = document.getElementById('login').value;

  xhr.open('GET', 'https://api.github.com/users', true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const users = JSON.parse(xhr.responseText);

      const filteredUsers = users.filter(user => user.login === loginValue);

      const output =
        filteredUsers.reduce((acc, user) => {
          const output = `
                <div class="user">
                  <img alt=${user.id} src=${user.avatar_url} width="70" height="70" />
                  <ul>
                    <li>${user.login}</li>
                    <li>${user.url}</li>
                  <ul>
                <div>
              `;

          return acc + output;
        }, '') || '<strong>No Matched Search Results</strong>';

      document.getElementById('users').innerHTML = output;
    } else if (xhr.status === 404) {
      document.querySelector('body').innerHTML = '<h1>404 ERROR</h1>';
      throw new Error('404 error occured');
    }
  };

  xhr.onerror = () => {
    throw new Error('Error occured during transaction');
  };

  document.getElementById('login').value = null;
  xhr.send();
}
