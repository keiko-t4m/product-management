const addBtn = document.getElementById("addBtn");
const productList = document.getElementById("productList");

let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>
  <button class="editBtn" data-index="${index}">編集</button>
  <button class="deleteBtn" data-index="${index}">削除</button>
</td>

    `;

    productList.appendChild(newRow);
  });
}

addBtn.addEventListener("click", function() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  if (name === "" || price === "" || stock === "") {
    alert("すべて入力してください");
    return;
  }

  products.push({ name, price, stock });

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";
});

productList.addEventListener("click", function(event) {
  if (event.target.classList.contains("deleteBtn")) {
    const index = event.target.dataset.index;

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();
  }
});
productList.addEventListener("click", function(event) {
  if (event.target.classList.contains("editBtn")) {
    const index = event.target.dataset.index;

    const product = products[index];

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();
  }
});

renderProducts();
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
  const keyword = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(keyword)
  );

  productList.innerHTML = "";

  filteredProducts.forEach((product, index) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <button class="editBtn" data-index="${index}">編集</button>
        <button class="deleteBtn" data-index="${index}">削除</button>
      </td>
    `;

    productList.appendChild(newRow);
  });
});
