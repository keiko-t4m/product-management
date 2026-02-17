

// -----------------------------
// 初期データ読み込み
// -----------------------------

let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

let nextId = parseInt(localStorage.getItem("nextId")) || 1;

// -----------------------------
// ユニークID生成
// -----------------------------

function generateId() {
  const id = nextId;
  nextId++;
  localStorage.setItem("nextId", nextId);
  return id;
}

// -----------------------------
// 商品追加・更新
// -----------------------------
function addProduct() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const stockInput = document.getElementById("stock");

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const stock = stockInput.value.trim();

  const numberRegex = /^[0-9]+$/;

  if (!name || !numberRegex.test(price) || !numberRegex.test(stock)) {
    alert("価格と数量は半角数字で入力してください");
    return;
  }

  if (editId === null) {
    // 新規登録
    products.push({
      id: generateId(),
      name,
      price,
      stock
    });
  } else {
    // 更新
    const index = products.findIndex(p => p.id === editId);
    if (index !== -1) {
      products[index] = { id: editId, name, price, stock };
    }
    editId = null;
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
}

// -----------------------------
// 再描画
// -----------------------------
function render() {
  if (!Array.isArray(products)) {
    products = [];
  }

  const searchInput = document.getElementById("search");
  const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products
    .filter(p => p.name && p.name.toLowerCase().includes(searchValue))
    .forEach(product => {
      list.innerHTML += `
<tr>
 <td>${String(product.id).padStart(5, "0")}</td>
 <td>${product.name}</td>
 <td>${product.price}</td>
 <td>${product.stock}</td>
 <td>
    <button onclick="editProduct(${product.id})">編集</button>
    <button onclick="deleteProduct(${product.id})">削除</button>
  </td>
</tr>
`;
    });
}

// -----------------------------
// 初期化
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addProduct();
  });

  render();
});
