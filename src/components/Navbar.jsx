function Navbar({ setPage, cartCount }) {
  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => setPage("home")}
      >
        ShopEasy
      </div>

      <div className="nav-links">
        <button onClick={() => setPage("home")}>
          Home
        </button>

        <button onClick={() => setPage("products")}>
          Products
        </button>

        <button
          className="cart-button"
          onClick={() => setPage("cart")}
        >
          🛒 Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
