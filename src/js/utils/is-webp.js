export function isWebp() {
  function testWebP(callback) {
    const webP = new Image();
    const onEvent = () => {
      callback(webP.height === 2);
    };
    webP.onload = onEvent;
    webP.onerror = onEvent;
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP((support) => {
    const className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}
