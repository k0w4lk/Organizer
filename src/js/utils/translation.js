const LANG_ATTRIBUTE = 'lang';

const translationNodes = document.querySelectorAll('[data-translate]');

let translationData;

function fillTranslationNodes(data, language) {
  translationNodes.forEach((item) => {
    const key = item.dataset.translate;

    item.innerHTML = data[key][language];
  });
}

export function setTranslations() {
  const initLanguage = document.documentElement.getAttribute(LANG_ATTRIBUTE);

  fetch('../assets/translations.json')
    .then((res) => res.json())
    .then((data) => {
      translationData = data;
      fillTranslationNodes(translationData, initLanguage);
    });
}

export function changeLanguage(language) {
  document.documentElement.setAttribute(LANG_ATTRIBUTE, language);
  fillTranslationNodes(translationData, language);
}
