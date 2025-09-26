const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  // Find the mealList container
  const menuContainer = document.querySelector(".mealList");

  // Correct fetch syntax using backticks and no extra spaces
  fetch(`${baseUrl}/meals`)
    .then((response) => response.json())
    .then((meals) => {
      meals.forEach((meal) => {
        // card for each meal
        const mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `
          <img src="${meal.image}" alt="${meal.name}" class="meal-image">
          <h3 class="meal-name">${meal.name}</h3>
          <p class="meal-description">${meal.description}</p>
          <p class="meal-price">Ksh ${meal.price}</p>
          <button class="order-btn">Order Now</button>
        `;

        menuContainer.appendChild(mealCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching meals:", error);
      menuContainer.innerHTML =
        "<p>Failed to load menu. Please try again later.</p>";
    });
});
