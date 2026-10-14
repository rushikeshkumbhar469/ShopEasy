function ProductDetails({
  product,
  onAddToCart,
  onBack
}) {
  return (
    <main className="details-container">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Products
      </button>

      <div className="details-card">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-info">

          <span className="product-category">
            {product.category}
          </span>

          <h1>
            {product.name}
          </h1>

          <p className="details-rating">
            ⭐ {product.rating} / 5
          </p>

          <h2 className="details-price">
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p className="details-description">
            {product.description}
          </p>

          <div className="product-features">

            <div>
              🚚 Free Delivery
            </div>

            <div>
              🔄 7 Days Replacement
            </div>

            <div>
              🔒 Secure Payment
            </div>

          </div>

          <button
            className="add-cart-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;