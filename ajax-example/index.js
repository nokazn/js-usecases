'use strict';

const getUsername = () => {
  const input = document.getElementById('input');
  return input.value;
};

const escapeSpecialChars = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const escapeHTML = (strings, ...values) => {
  return strings.reduce((accumulator, str, i) => {
    const value = values[i - 1];
    return typeof value === 'string'
      ? accumulator + escapeSpecialChars(value) + str
      : accumulator + String(value) + str;
  });
};

const viewer = (user) => escapeHTML`
<h4>${user.name} (@${user.login})</h4>
<img src="${user.avatar_url}" alt="${user.login}" height="100">
<dl>
  <dt>Location: </dt>
  <dd>${user.location}</dd>
  <dt>Repositories: </dt>
  <dd>${user.public_repos}</dd>
</dl>
`;

const fetchUser = async () => {
  const userId = getUsername();
  if (!userId) {
    alert('Please input user ID');
    return;
  }

  const result = document.getElementById('result');
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 404) {
        result.innerHTML = '<h4>Not Found</h4>';
      } else {
        result.innerHTML = '<h4>An error occurred</h4>';
      }
    })
    .then((user) => {
      if (user != null) {
        result.innerHTML = viewer(user);
      }
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

const main = () => {
  fetchUser();
};
