// navigation bar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// aside cart

let cartCount = document.querySelector(".cart-count");
let asideBar = document.querySelector("aside");
let closeIcon = document.querySelector(".fa-x");

cartCount.onclick = () => {
  asideBar.classList.toggle("open");
};
closeIcon.onclick = () => {
  asideBar.classList.toggle("open");
};

// array of items
const items = [
  {
    id: 0,
    title: "t-shirts",
    price: 78,
    img: "/img/products/f1.jpg",
    amount: 1,
  },
  {
    id: 1,
    title: "t-shirts",
    price: 90,
    img: "/img/products/f2.jpg",
    amount: 1,
  },
  {
    id: 2,
    title: "t-shirts",
    price: 80,
    img: "/img/products/f3.jpg",
    amount: 1,
  },
  {
    id: 3,
    title: "t-shirts",
    price: 78,
    img: "/img/products/f4.jpg",
    amount: 1,
  },
  {
    id: 4,
    title: "t-shirts",
    price: 88,
    img: "/img/products/f5.jpg",
    amount: 1,
  },
  {
    id: 5,
    title: "shirt",
    price: 60,
    img: "/img/products/f6.jpg",
    amount: 1,
  },
  {
    id: 6,
    title: "jeans",
    price: 78,
    img: "/img/products/f7.jpg",
    amount: 1,
  },
  {
    id: 7,
    title: "t-shirts",
    price: 78,
    img: "/img/products/f8.jpg",
    amount: 1,
  },
  {
    id: 8,
    title: "shirt",
    price: 100,
    img: "/img/products/n1.jpg",
    amount: 1,
  },
  {
    id: 9,
    title: "shirt",
    price: 78,
    img: "/img/products/n2.jpg",
    amount: 1,
  },
  {
    id: 10,
    title: "shirt",
    price: 77,
    img: "/img/products/n3.jpg",
    amount: 1,
  },
  {
    id: 11,
    title: "t-shirts",
    price: 46,
    img: "/img/products/n4.jpg",
    amount: 1,
  },
  {
    id: 12,
    title: "t-shirts",
    price: 55,
    img: "/img/products/n5.jpg",
    amount: 1,
  },
  {
    id: 13,
    title: "jeans",
    price: 78,
    img: "/img/products/n6.jpg",
    amount: 1,
  },
  {
    id: 14,
    title: "t-shirts",
    price: 80,
    img: "/img/products/n7.jpg",
    amount: 1,
  },
  {
    id: 15,
    title: "t-shirts",
    price: 78,
    img: "/img/products/n8.jpg",
    amount: 1,
  },
];

let parentBoxs = document.querySelector(".parent-boxs");
let currentItem = "";

function rednerItems() {
  items.forEach((item) => {
    currentItem += `
        <div class="pro">
              <img src="${item.img}" alt="">
            <div class="des">
                <span>adidas</span>
                <h5>Cartoon AStronaut ${item.title}</h5>
                <div class="star">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              <h4>$${item.price}.00</h4>
            </div>
            <div class="cart" data-id="${item.id}">
              <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
            </div>
        </div>
    `;
    parentBoxs.innerHTML = currentItem;
  });
}
rednerItems();

// render cartItems
let cartItems = [];
let parentCartBoxs = document.querySelector("tbody");
let currentCartItems = "";

function renderCartItems() {
  currentCartItems = "";
  cartItems.forEach((item) => {
    currentCartItems += `
    <tr>
        <td class="none">${item.id}</td>
        <td><img src="${item.img}" alt="" srcset=""></td>
        <td class="none">${item.title}</td>
        <td class="none">
        <span class="btn" onclick="updateCartItem('increase','${
          item.id
        }')">+</span>
        <span class="amount">${item.amount}</span>
        <span class="btn"  onclick="updateCartItem('decrease','${
          item.id
        }')">-</span>
        </td>
        <td>${item.price}.00$</td>
        <td class="all-price none">${item.price * item.amount}.00$</td>
        <td> <button onclick="delteCartItem(${
          item.id
        })" > Delete </button> </td>
    </tr>
        
        `;
  });
  parentCartBoxs.innerHTML = currentCartItems;
  document.querySelector(".cart-count span").innerHTML = cartItems.length;
}
renderCartItems();

// add to cart
let btnsAdd = document.querySelectorAll(".cart");
btnsAdd.forEach((btn) => {
  btn.addEventListener("click", () => {
    let id = btn.dataset.id;
    items.find((item) => {
      if (item.id == id) {
        if (cartItems.some((cartItem) => cartItem.id == id)) {
          alert("product already exist");
        } else {
          cartItems.push(item);
        }
      }
    });
    renderCartItems();
  });
});

// update cart
function updateCartItem(action, id) {
  cartItems.find((item) => {
    if (item.id == id) {
      if (action == "increase") {
        item.amount += 1;
      } else {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          alert("Amount Must Be 1 and more than it");
        }
      }
    }
    renderCartItems();
  });
}
// delete
function delteCartItem(id) {
  cartItems = cartItems.filter((item) => item.id != id);
  renderCartItems();
}
// deleteAll
function deleteAll() {
  cartItems = [];
  renderCartItems();
}

// add event listener to search button

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchItem);

function searchItem() {
  let searchInput = document.getElementById("search-input").value.toLowerCase();

  let filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchInput)
  );

  let template = "";
  filteredItems.forEach((item) => {
    template += `
      <div class="pro">
        <img src="${item.img}" alt="">
        <div class="des">
          <span>adidas</span>
          <h5>Cartoon AStronaut ${item.title}</h5>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>$${item.price}.00</h4>
        </div>
        <div class="cart" data-id="${item.id}">
          <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
      </div>
    `;
  });

  parentBoxs.innerHTML = template;
}


// valiadation form & emai.js
function validateForm(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  if (name == "" || email == "" || subject == "" || message == "") {
    alert("Please fill in all fields");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email");
    return;
  }

  const serviceID = "service_02o249q";
  const templateID = "template_bhcpyry";

  var params = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your Message Sent Successfully");
    })
    .catch((err) => console.log(err));
}


