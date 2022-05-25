export let canvaApi = null;

(function (document, url) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = function () {
    (async function () {
      if (window.Canva && window.Canva.DesignButton) {
        canvaApi = await window.Canva.DesignButton.initialize({
          apiKey: '1cXlRfKSEDQWMd7w_2LOVrBb',
        });
      }
    })();
  };
  document.body.appendChild(script);
})(document, 'https://sdk.canva.com/designbutton/v2/api.js');
