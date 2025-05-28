console.log('Website loaded successfully!');

const conversionRate = 82; // 1 USD = 82 INR

const products = [
  {
    id: 1,
    name: "FACEWASH",
    priceUSD: 3.91,
    images: ["images/p11.jpg", "images/p12.jpg"]
  },
  {
    id: 2,
    name: "FACE SCRUB",
    priceUSD: 3.91,
    images: ["images/p21.jpg", "images/p22.jpg", "images/p23.jpg"]
  },
  {
    id: 3,
    name: "SUN SCREEN LOTION",
    priceUSD: 3.91,
    images: ["images/p31.jpg", "images/p32.jpg", "images/p33.jpg", "images/p34.jpg","images/p35.jpeg"]
  },
  {
    id: 4,
    name: "BODY MIST",
    priceUSD: 5.50,
    images: ["images/p41.jpg", "images/p42.jpg", "images/p43.jpg", "images/p44.jpg", "images/p45.jpg", "images/p46.jpg", "images/p47.jpg", "images/p48.jpg"]
  }
];

let cart = [];

function addToCart(productId) {
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  updateCartButton();
}

function updateCartButton() {
  const cartButton = document.getElementById('cart-button');
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartButton.textContent = `Cart (${totalQuantity})`;
}

function calculateDiscount(totalQuantity) {
  if (totalQuantity < 3) return 0;
  const slabsPassed = Math.floor((totalQuantity - 3) / 2);
  return 50 + (slabsPassed * 50);
}

function showCartModal() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'block';

  const cartItemsDiv = document.getElementById('cart-items');
  const discountInfo = document.getElementById('discount-info');
  const totalPrice = document.getElementById('total-price');

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    discountInfo.textContent = "";
    totalPrice.textContent = "";
    return;
  }

  let totalQuantity = 0;
  let html = "<ul>";
  cart.forEach(({ productId, quantity }) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    totalQuantity += quantity;
    html += `<li>${product.name} - Quantity: ${quantity}</li>`;
  });
  html += "</ul>";
  cartItemsDiv.innerHTML = html;

  totalPrice.textContent = "";
  const discount = calculateDiscount(totalQuantity);
  discountInfo.textContent = discount > 0
    ? `You are eligible for a discount of ₹${discount} when you order! Contact us to claim it.`
    : "Add more products to get exciting discounts!";
}

function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

function showModal() {
  document.getElementById('contact-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('contact-modal').style.display = 'none';
}

function orderNow(productId) {
  closeCartModal();
  showModal();
  const product = products.find(p => p.id === productId);
  if (product) {
    alert(`You want to order ${product.name}. Please contact us using the details.`);
  } else {
    alert(`You want to order products. Please contact us using the details.`);
  }
}

function showGalleryModal(productId) {
  const galleryModal = document.getElementById('gallery-modal');
  const galleryImagesDiv = document.getElementById('gallery-images');

  const product = products.find(p => p.id === productId);
  if (!product) return;

  galleryImagesDiv.innerHTML = '';
  product.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = product.name;
    galleryImagesDiv.appendChild(img);
  });

  galleryModal.style.display = 'block';
}

function closeGalleryModal() {
  document.getElementById('gallery-modal').style.display = 'none';
}

window.onclick = function (event) {
  const cartModal = document.getElementById('cart-modal');
  const contactModal = document.getElementById('contact-modal');
  const galleryModal = document.getElementById('gallery-modal');

  if (event.target === cartModal) cartModal.style.display = 'none';
  if (event.target === contactModal) contactModal.style.display = 'none';
  if (event.target === galleryModal) galleryModal.style.display = 'none';
};

document.getElementById('cart-button').addEventListener('click', showCartModal);

function generateCartMessage() {
  if (cart.length === 0) return "Hello, I would like to inquire about your products.";

  let message = "Hello, I would like to order the following items:\n\n";
  cart.forEach(({ productId, quantity }) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      message += `• ${product.name} - Quantity: ${quantity}\n`;
    }
  });

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discount = calculateDiscount(totalQuantity);
  if (discount > 0) {
    message += `\nDiscount Eligible: ₹${discount}`;
  }

  return encodeURIComponent(message);
}

// PLATFORM CONTACT FUNCTIONS

function sendMessageViaWhatsApp() {
  closeModal();
  const phoneNumber = "918273984482"; 
  const message = generateCartMessage();
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

function sendMessageViaInstagram() {
  closeModal();
  const igUsername = "glow_with_renatus"; 
  const message = generateCartMessage();
  const url = `https://ig.me/m/glow_with_renatus`;
  window.open(url, "_blank");
}