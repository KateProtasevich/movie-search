/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
function testImage(url) {
  const imgPromise = new Promise(function imgPromise(resolve, reject) {
    const imgElement = new Image();
    imgElement.addEventListener('load', function imgOnLoad() {
      resolve(this);
    });
    imgElement.addEventListener('error', function imgOnError() {
      reject();
    });

    imgElement.src = url;
  });
  return imgPromise;
}
export default testImage;
