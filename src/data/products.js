const products = [
  { id: 1, name: 'Casque Bluetooth', price: 49.99, stock: 12 },
  { id: 2, name: 'Souris sans fil', price: 24.5, stock: 30 },
  { id: 3, name: 'Clavier mécanique', price: 89.0, stock: 5 },
  { id: 4, name: 'Webcam HD', price: 59.99, stock: 0 },
];

function getProducts() {
  return products;
}

module.exports = { getProducts };
