let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  if (!name || !price || !stock) return;

  if (editIndex === null) {
    products.push({ name, price, stock });
  } else {
    products[editIndex] = { name, price, stock };
    editIndex = null;
  }

  saveData();
  render();
  clearForm();
}

function editProduct(index) {
  const product = products[index];
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;
  editIndex = index;
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveData();
  render();
}

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";
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
          <td>${product.stock}</td>
          <td>
            <button onclick="editProduct(${index})">編集</button>
            <button onclick="deleteProduct(${index})">削除</button>
          </td>
        </tr>
      `;
    });
}

render();

