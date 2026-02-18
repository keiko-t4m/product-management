// -----------------------------
// 初期データ読み込み
// -----------------------------
let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;
let nextId = parseInt(localStorage.getItem("nextId")) || 1;

// -----------------------------
// ID生成
// -----------------------------
function generateId() {
  const id = nextId;
  nextId++;
  localStorage.setItem("nextId", nextId);
  return id;
}

// -----------------------------
// 保存
// -----------------------------
function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
}

// -----------------------------
// フォーム初期化
// -----------------------------
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";
  editId = null;
}

// -----------------------------
// 追加・更新
// -----------------------------
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
    if (index !== -1) {
      products[index] = { id: editId, name, price, stock };
    }
  }

  saveData();
  render();
  clearForm();
}

// -----------------------------
// 編集
// -----------------------------
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;

  editId = id;
}

// -----------------------------
// 削除
// -----------------------------
function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveData();
  render();
}

// -----------------------------
// 全削除
// -----------------------------
function resetData() {
  if (confirm("本当に全データを削除しますか？")) {
    localStorage.removeItem("products");
    localStorage.removeItem("nextId");
    products = [];
    nextId = 1;
    render();
  }
}

// -----------------------------
// 再描画（XSS対策済み）
// -----------------------------
function render() {
  const searchValue = document
    .getElementById("search")
    .value.toLowerCase();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products
    .filter(p => p.name.toLowerCase().includes(searchValue))
    .forEach(product => {

      const tr = document.createElement("tr");

      const idTd = document.createElement("td");
      idTd.textContent = String(product.id).padStart(5, "0");

      const nameTd = document.createElement("td");
      nameTd.textContent = product.name;

      const priceTd = document.createElement("td");
      priceTd.textContent = product.price;

      const stockTd = document.createElement("td");
      stockTd.textContent = product.stock;

      const actionTd = document.createElement("td");

      const editBtn = document.createElement("button");
      editBtn.textContent = "編集";
      editBtn.addEventListener("click", () => editProduct(product.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "削除";
      deleteBtn.addEventListener("click", () => deleteProduct(product.id));

      actionTd.appendChild(editBtn);
      actionTd.appendChild(deleteBtn);

      tr.appendChild(idTd);
      tr.appendChild(nameTd);
      tr.appendChild(priceTd);
      tr.appendChild(stockTd);
      tr.appendChild(actionTd);

      list.appendChild(tr);
    });
}

// -----------------------------
// 初期化
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

  document
    .getElementById("productForm")
    .addEventListener("submit", e => {
      e.preventDefault();
      addProduct();
    });

  document
    .getElementById("search")
    .addEventListener("keyup", render);

  document
    .getElementById("resetBtn")
    .addEventListener("click", resetData);

  render();
});
