import { useState } from "react";

function Checkout({
  cart,
  onPlaceOrder,
  onBack
}) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [pincode, setPincode] = useState("");


  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  function handleSubmit(event) {

    event.preventDefault();

    if (
      !name ||
      !email ||
      !address ||
      !city ||
      !pincode
    ) {
      alert("Please fill all the fields.");
      return;
    }

    onPlaceOrder({
      name,
      email,
      address,
      city,
      pincode
    });
  }


  return (
    <main className="checkout-container">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Cart
      </button>


      <div className="checkout-layout">

        <div className="checkout-card">

          <h1>
            Checkout
          </h1>

          <p className="checkout-subtitle">
            Enter your delivery details.
          </p>


          <form onSubmit={handleSubmit}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />


            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />


            <label>
              Address
            </label>

            <textarea
              placeholder="Enter your complete address"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
            />


            <div className="form-row">

              <div>

                <label>
                  City
                </label>

                <input
                  type="text"
                  placeholder="Mumbai"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                />

              </div>


              <div>

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  placeholder="400001"
                  value={pincode}
                  onChange={(event) =>
                    setPincode(event.target.value)
                  }
                />

              </div>

            </div>


            <button
              type="submit"
              className="place-order-button"
            >
              Place Order
            </button>

          </form>

        </div>


        <div className="checkout-summary">

          <h2>
            Your Order
          </h2>

          {cart.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹{(
                  item.price * item.quantity
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          ))}


          <hr />

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Checkout;