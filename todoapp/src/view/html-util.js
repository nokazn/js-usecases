/**
 * @param {string} str
 * @returns {string}
 */
export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * @param {string} html
 * @return {Element}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * @param {string[]} strings
 * @param  {...any} values
 * @returns {Element}
 */
export function element(strings, ...values) {
  const htmlString = strings.reduce((accumulator, str, i) => {
    const value = values[i - 1];
    return typeof value === 'string'
      ? accumulator + escapeSpecialChars(value) + str
      : accumulator + String(value) + str;
  });
  return htmlToElement(htmlString);
}

/**
 * コンテナの要素の中身を bodyElement で上書きする
 * @param {Element} bodyElement - コンテナ要素の中身となる要素
 * @param {Element} containerElement - コンテナ要素
 */
export function render(bodyElement, containerElement) {
  containerElement.innerHTML = '';
  containerElement.appendChild(bodyElement);
}
