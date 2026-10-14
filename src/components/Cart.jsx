function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  onContinueShopping
}) {

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <main className="container">

      <div className="page-heading">

        <div>
          <h1>
            Shopping Cart
          </h1>

          <p>
            Review your selected products.
          </p>
        </div>

      </div>


      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some products to your cart.
          </p>

          <button
            onClick={onContinueShopping}
          >
            Start Shopping
          </button>

        </div>

      ) : (

        <div className="cart-layout">

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.category}
                  </p>

                  <strong>
                    ₹{item.price.toLocaleString("en-IN")}
                  </strong>

                </div>


                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      onDecrease(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      onIncrease(item.id)
                    }
                  >
                    +
                  </button>

                </div>


                <div className="cart-item-total">

                  <strong>
                    ₹{(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      onRemove(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {cart.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹{total.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span className="free">
                FREE
              </span>

            </div>

            <hr />

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>

            <button
              className="checkout-button"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      )}

    </main>
  );
}

export default Cart;