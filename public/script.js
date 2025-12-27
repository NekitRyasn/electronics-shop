fetch("/api/products")
  .then(r => r.json())
  .then(data => {
    document.getElementById("catalog").innerHTML = data.map(p => `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>Цена: ${p.price} ₽</p>
        <button onclick="buyProduct('${p.name}')">Купить</button>
      </div>
    `).join("");
  });

function buyProduct(name) {
  alert("Вы выбрали: " + name);
}
