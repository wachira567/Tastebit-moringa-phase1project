const baseUrl = "http://localhost:3000";
const mealsURL = `${baseUrl}/meals`;
const reviewsURL = `${baseUrl}/reviews`;

// Pagination + category setup for menu section
let mealsPerPage = 6;
let currentPage = 1;
let currentCategory = "Staple"; // default
let mealsData = [];
let cart = [];

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.querySelector(".mealList");
  const categoryButtons = document.querySelectorAll(".categories button");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  const cartButton = document.getElementById("cartButton");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsList = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const closeCartButton = document.getElementById("closeCart");

  const reviewForm = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviewsContainer");

  // Fetch meals
  fetch(mealsURL)
    .then((res) => res.json())
    .then((meals) => {
      mealsData = meals;
      showPage();
    })
    .catch((err) => {
      console.error("Error loading meals:", err);
      menuContainer.innerHTML = "<p>Could not load menu. Try again later.</p>";
    });

  // Show meals per page on the menu section
  function showPage() {
    menuContainer.innerHTML = "";
    const filteredMeals = mealsData.filter(
      (meal) => meal.category === currentCategory
    );
    const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);
    const start = (currentPage - 1) * mealsPerPage;
    const pageMeals = filteredMeals.slice(start, start + mealsPerPage);

    pageMeals.forEach((meal) => {
      const mealCard = document.createElement("div");
      mealCard.classList.add("meal-card");
      mealCard.innerHTML = `
        <img src="${meal.image}" alt="${meal.name}">
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
        <p>Ksh ${meal.price}</p>
        <button class="order-btn">Order Now</button>
      `;
      mealCard.querySelector(".order-btn").addEventListener("click", () => {
        cart.push(meal);
        updateCart();
      });
      menuContainer.appendChild(mealCard);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
  }

  // Category buttons for menu section
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category;
      currentPage = 1;
      showPage();
    });
  });

  // Pagination for my menu section
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage();
    }
  });
  nextBtn.addEventListener("click", () => {
    const filteredMeals = mealsData.filter(
      (m) => m.category === currentCategory
    );
    const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage();
    }
  });

  // Cart
  cartButton.addEventListener("click", () => cartSidebar.classList.add("open"));
  closeCartButton.addEventListener("click", () =>
    cartSidebar.classList.remove("open")
  );

  function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    cart.forEach((meal, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${meal.name} - Ksh ${meal.price}
        <button class="remove-btn" data-index="${index}">X</button>
      `;
      cartItemsList.appendChild(li);
      total += meal.price;
    });
    cartTotal.textContent = `Total: Ksh ${total}`;

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        cart.splice(idx, 1);
        updateCart();
      });
    });
  }

  // Reviews for the about us section
  function loadReviews() {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((reviews) => {
        const reviewsContainer = document.getElementById("reviewsContainer");
        reviewsContainer.innerHTML = "";

        reviews.forEach((review) => {
          const card = document.createElement("div");
          card.classList.add("review-card");
          card.innerHTML = `
            <h4>${review.name}</h4>
            <p>${review.text}</p>
          `;
          reviewsContainer.appendChild(card);
        });
      })
      .catch((err) => console.error("Error loading reviews:", err));
  }

  // Contact Form Submit (prevent refresh and save to JSON)
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const text = document.getElementById("review").value.trim();

    if (!name || !text) {
      alert("Please fill in all fields");
      return;
    }

    fetch(reviewsURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        const card = document.createElement("div");
        card.classList.add("review-card");
        card.innerHTML = `
          <h4>${newReview.name}</h4>
          <p>${newReview.text}</p>
        `;
        reviewsContainer.appendChild(card);
        reviewForm.reset();
      })
      .catch((err) => console.error("Error saving review:", err));
  });

  loadReviews();
});
