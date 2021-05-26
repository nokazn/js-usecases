'use strict';

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

const buildView = (user) => escapeHTML`
<h4>${user.name} (@${user.login})</h4>
<img src="${user.avatar_url}" alt="${user.login}" height="100">
<dl>
  <dt>Location</dt>
  <dd>${user.location}</dd>
  <dt>Repositories</dt>
  <dd>${user.public_repos}</dd>
</dl>
`;

const fetchUser = (userId) => {
  console.log(new Date());
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      console.error(res.status);
    })
    .then((user) => {
      if (user != null) {
        const view = buildView(user);
        const result = document.getElementById('result');
        result.innerHTML = view
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
