# TasteBit – Food Ordering Website

**TasteBit** is a simple food ordering website built with **HTML**, **CSS**, and **JavaScript**, connected to a **local JSON server API**.  
Users can browse meals, filter by category, add items to a cart, and leave reviews — all in a smooth, interactive experience.

---

## Features

**Dynamic Menu Display**  
Fetch meals from a local API and display them with pagination and categories.

**Shopping Cart System**  
Add meals to cart, view cart items, remove them, and see total cost dynamically.

**Review System**  
Fetch and display user reviews. Users can submit new reviews via a form.

**Smooth Navigation**  
Transparent left sidebar for quick access to all sections.

**Modern UI Design**  
Includes slideshow backgrounds, parallax sections, and smooth animations.

---

## Project Structure

TasteBit/
│
├── index.html # Main HTML file
├── style.css # Styling and layout
├── script.js # Main JavaScript logic
├── db.json # Local API data (meals + reviews)
└── README.md # Project documentation

## ⚙️ Setup Instructions

Follow these steps to run **TasteBit** locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/tastebit.git
cd tastebit
2️⃣ Install JSON Server
If you don’t have it yet:

npm install -g json-server

3️⃣ Start the server
json-server --watch db.json
This runs the API at http://localhost:3000

4️⃣ Open the project
Open index.html in your browser.

🔗 API Endpoints
Endpoint	Description
/meals	List of all available meals
/reviews	List of user reviews


```
