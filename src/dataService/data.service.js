let data = [];
/*

fetch("https://world.openfoodfacts.org/api/v0/product/04963406")
    .then(res => res.json())
    .then((result) => {
        data({
            name: result.product.images[1].uploader,
            is_allergen: false
        });
    })
*/

function _getElements() {
  return new Promise((resolve, reject) => {
    resolve(data);
    console.log(data);
  });
}

function _createElement(Element) {
  return new Promise((resolve, reject) => {
    Element.id = Date.now();
    data.push(Element);
    resolve(data);
  });
}

function _updateElement(Element) {
  return new Promise((resolve, reject) => {
    data = [...data.map(e => (e.id === Element.id ? Element : e))];
    resolve(data);
  });
}

function _deleteElement(elementId) {
  return new Promise((resolve, reject) => {
    data = [...data.filter(e => e.id !== elementId)];
    resolve(data);
  });
}

export { _getElements, _createElement, _updateElement, _deleteElement };
