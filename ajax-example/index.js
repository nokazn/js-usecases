'use strict';

const getUsername = () => {
  const input = document.getElementById('input');
  return input.value;
};

const displayView = (view) => {
  const result = document.getElementById('result');
  result.innerHTML = view;
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

const fetchUser = async (userId) => {
  return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`).then((res) => {
    return res.ok ? res.json() : Promise.reject(new Error(`${res.status}`));
  });
};

const main = () => {
  const userId = getUsername();
  if (!userId) {
    alert('Please input user ID');
    return;
  }

  fetchUser(userId)
    .then((user) => viewer(user))
    .then((view) => displayView(view))
    .catch((err) => {
      console.error(err);
      if (err.message === '404') {
        displayView(`<h4>Not Found</h4>`);
      } else {
        displayView(`<h4>${err}</h4>`);
      }
    });
};
