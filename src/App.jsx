import { useState } from "react";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

import products from "./data/product";

import "./App.css";


function App() {

  // Current page
  const [page, setPage] = useState("home");


  // Search text
  const [search, setSearch] = useState("");


  // Selected category
  const [category, setCategory] = useState("All");


  // Selected product
  const [selectedProduct, setSelectedProduct] =
    useState(null);


  // Shopping cart
  const [cart, setCart] = useState([]);


  // Order status
  const [orderPlaced, setOrderPlaced] =
    useState(false);


  // Categories
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Accessories"
  ];


  // Filter products
  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesCategory =
        category === "All" ||
        product.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );


  // Open product details
  function handleViewProduct(product) {

    setSelectedProduct(product);

    setPage("details");
  }


  // Add product to cart
  function handleAddToCart(product) {

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });

    alert("Product added to cart!");
  }


  // Increase quantity
  function increaseQuantity(id) {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  }


  // Decrease quantity
  function decreaseQuantity(id) {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }


  // Remove product
  function removeFromCart(id) {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  }


  // Place order
  function handlePlaceOrder(details) {

    console.log("Order Details:", details);

    setCart([]);

    setOrderPlaced(true);

    setPage("success");
  }


  // Total items in cart
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (
    <div className="app">

      <Navbar
        setPage={setPage}
        cartCount={cartCount}
      />


      {/* ======================
          HOME PAGE
      ====================== */}

      {page === "home" && (

        <main className="home-page">

          <section className="hero">

            <div className="hero-content">

              <p className="hero-small">
                Welcome to ShopEasy
              </p>

              <h1>
                Everything You Need,
                <span> In One Place.</span>
              </h1>

              <p className="hero-description">
                Discover quality products at
                affordable prices.
              </p>


              <div className="hero-search">

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

                <button
                  onClick={() =>
                    setPage("products")
                  }
                >
                  Search
                </button>

              </div>

            </div>

          </section>


          {/* Categories */}

          <section className="home-section">

            <h2>
              Shop by Category
            </h2>

            <p className="section-description">
              Find what you're looking for.
            </p>


            <div className="category-cards">

              <div
                className="category-card"
                onClick={() => {
                  setCategory("Electronics");
                  setPage("products");
                }}
              >
                <div>
                  🎧
                </div>

                <h3>
                  Electronics
                </h3>

                <p>
                  Gadgets & Devices
                </p>
              </div>


              <div
                className="category-card"
                onClick={() => {
                  setCategory("Clothing");
                  setPage("products");
                }}
              >
                <div>
                  👕
                </div>

                <h3>
                  Clothing
                </h3>

                <p>
                  Fashion & Style
                </p>
              </div>


              <div
                className="category-card"
                onClick={() => {
                  setCategory("Accessories");
                  setPage("products");
                }}
              >
                <div>
                  🎒
                </div>

                <h3>
                  Accessories
                </h3>

                <p>
                  Everyday Essentials
                </p>
              </div>

            </div>

          </section>


          {/* Featured Products */}

          <section className="home-section">

            <div className="section-header">

              <div>

                <h2>
                  Featured Products
                </h2>

                <p className="section-description">
                  Popular products you might like.
                </p>

              </div>

              <button
                className="view-all-button"
                onClick={() =>
                  setPage("products")
                }
              >
                View All
              </button>

            </div>


            <div className="products-grid">

              {products
                .slice(0, 4)
                .map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={handleViewProduct}
                  />

                ))}

            </div>

          </section>

        </main>
      )}


      {/* ======================
          PRODUCTS PAGE
      ====================== */}

      {page === "products" && (

        <main className="container">

          <div className="page-heading">

            <div>

              <h1>
                All Products
              </h1>

              <p>
                Browse our collection.
              </p>

            </div>

          </div>


          {/* Search */}

          <div className="product-search">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          {/* Category filters */}

          <div className="filters">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "filter active"
                    : "filter"
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>

            ))}

          </div>


          {/* Products */}

          <div className="products-grid">

            {filteredProducts.length > 0 ? (

              filteredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={handleViewProduct}
                  />

                )
              )

            ) : (

              <div className="no-products">

                <h2>
                  No products found
                </h2>

                <p>
                  Try another search or category.
                </p>

              </div>

            )}

          </div>

        </main>
      )}


      {/* ======================
          PRODUCT DETAILS
      ====================== */}

      {page === "details" &&
        selectedProduct && (

          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() =>
              setPage("products")
            }
          />

        )}


      {/* ======================
          CART
      ====================== */}

      {page === "cart" && (

        <Cart
          cart={cart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
          onCheckout={() =>
            setPage("checkout")
          }
          onContinueShopping={() =>
            setPage("products")
          }
        />

      )}


      {/* ======================
          CHECKOUT
      ====================== */}

      {page === "checkout" && (

        <Checkout
          cart={cart}
          onPlaceOrder={handlePlaceOrder}
          onBack={() =>
            setPage("cart")
          }
        />

      )}


      {/* ======================
          ORDER SUCCESS
      ====================== */}

      {page === "success" && orderPlaced && (

        <main className="success-page">

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Order Placed Successfully!
            </h1>

            <p>
              Thank you for shopping with
              ShopEasy.
            </p>

            <p>
              Your order will be processed
              shortly.
            </p>

            <button
              onClick={() =>
                setPage("products")
              }
            >
              Continue Shopping
            </button>

          </div>

        </main>
      )}

    </div>
  );
}

export default App;