let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

// ユニークID生成（簡易版）
function generateId() {
  return Date.now(); // 現在時刻をIDにする
}

function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const stock = document.getElementById("stock").value.trim();

  const numberRegex = /^[0-9]+$/;

  if (!name || !numberRegex.test(price) || !numberRegex.test(stock)) {
    alert("価格と数量は半角数字で入力してください");
    return;
  }

  if (editId === null) {
    products.push({
      id: generateId(),
      name,
      price,
      stock
    });
  } else {
    const index = products.findIndex(p => p.id === editId);
    products[index] = { id: editId, name, price, stock };
    editId = null;
  }

  saveData();
  render();
  clearForm();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;

  editId = id;
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
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
    .forEach(product => {
     
        list.innerHTML += `
  <tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td>
      <button onclick="editProduct(${product.id})">編集</button>
      <button onclick="deleteProduct(${product.id})">削除</button>
    </td>
  </tr>
`;

      `;
    });
}

render();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addProduct();
  });
});
