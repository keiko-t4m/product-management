let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  if (!name || !price) return;

  products.push({ name, price });
  saveData();
  render();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveData();
  render();
}

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
}

function render() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products
    .filter(p => p.name.toLowerCase().includes(searchValue))
    .forEach((product, index) => {
      list.innerHTML += `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><button onclick="deleteProduct(${index})">削除</button></td>
        </tr>
      `;
    });
}

render();

