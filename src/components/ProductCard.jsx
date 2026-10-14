  function ProductCard({ product, onView }) {
    return (
      <div className="product-card">

        <div className="product-image-container">

          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />

        </div>

        <div className="product-info">

          <span className="product-category">
            {product.category}
          </span>

          <h3>
            {product.name}
          </h3>

          <p className="rating">
            ⭐ {product.rating}
          </p>

          <p className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <button
            className="view-product-button"
            onClick={() => onView(product)}
          >
            View Product
          </button>

        </div>

      </div>
    );
  }

  export default ProductCard;