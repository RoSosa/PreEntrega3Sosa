let cart = [];
let total = 0;

// Cargar el carrito desde el almacenamiento local si está disponible
const storedCart = localStorage.getItem('cart');
if (storedCart) {
  cart = JSON.parse(storedCart);
  updateCartUI();
  calculateTotal();
}

function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message) {
  const notifications = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.textContent = message;
  notifications.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function addToCart(producto, precio) {
  if (cart.find(item => item.producto === producto)) {
    cart.find(item => item.producto === producto).cantidad++;
  } else {
    cart.push({ producto, precio, cantidad: 1 });
  }
  updateCartUI();
  calculateTotal();
  saveCartToStorage();
  showNotification(`${producto} agregado al carrito.`);
}

function removeFromCart(producto) {
  cart = cart.filter(item => item.producto !== producto);
  updateCartUI();
  calculateTotal();
  saveCartToStorage();
  showNotification(`${producto} eliminado del carrito.`);
}

function updateCartUI() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.producto} - Precio: $${item.precio} - Cantidad: ${item.cantidad} `;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.onclick = () => removeFromCart(item.producto);
    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });
}

function calculateTotal() {
  total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  document.getElementById('total').textContent = total;
}

function clearCart() {
  cart = [];
  updateCartUI();
  calculateTotal();
  saveCartToStorage();
  showNotification('Carrito vaciado.');
}

function checkout() {
  if (cart.length === 0) {
    showNotification('El carrito está vacío. Agrega productos antes de realizar la compra.');
  } else {
    const items = cart.map(item => `${item.cantidad}x ${item.producto}`).join(', ');
    showNotification(`Compra realizada. Productos: ${items}. Total: $${total}`);
    clearCart();
  }
}
