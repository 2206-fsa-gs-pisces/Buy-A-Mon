import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, updateCart, clearItem, closeCart } from "../store/cart";
import { me } from "../store/auth";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      guestCart: [],
      subtotal: 0,
    };
  }
  async componentDidMount() {
    const user = await this.props.getUser();
    if (user) {
      const userId = user.auth.id;
      this.setState({ id: userId });
      await this.props.getCart(userId);
    }
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    if (guestCart && !this.state.id) {
      for (let i = 0; i < guestCart.length; i++) {
        this.state.subtotal += guestCart[i].price * guestCart[i].qty;
      }
      this.setState({ guestCart: guestCart });
      window.localStorage.setItem("cart", JSON.stringify(guestCart));
    } else {
      let temp = 0;
      for (let i = 0; i < this.props.cart.length; i++) {
        temp += this.props.cart[i].totalPriceAtSaleTime;
      }
      this.setState({ subtotal: temp });
    }
  }

  render() {
    let { cart } = this.props || {};
    let guestJSX = (
      <div>
        <h1>Guest Cart</h1>
        {this.state.guestCart.length === 0 ? (
          <h2>Your Cart is empty</h2>
        ) : (
          <span />
        )}
        <div id="cartItems">
          {this.state.guestCart.map((item) => {
            return (
              <div className="cartItems" key={item.id}>
                <div id="itemname"> {item.name}</div>
                <Link to={`/items/${item.id}`}>
                  <img class="card-image" src={item.imageUrl} />
                </Link>
                <div>
                  <h3>Total Price: ${(item.price * item.qty) / 100}</h3>
                  <h3>Quantity: {item.qty}</h3>
                </div>
                <button
                  onClick={(evt) => {
                    let guestCart = JSON.parse(
                      window.localStorage.getItem("cart")
                    );
                    for (let i = 0; i < guestCart.length; i++) {
                      if (guestCart[i].id === item.id) {
                        guestCart[i].qty++;
                        this.state.subtotal += item.price;
                      }
                    }
                    window.localStorage.setItem(
                      "cart",
                      JSON.stringify(guestCart)
                    );
                    this.setState({ guestCart: guestCart });
                  }}
                >
                  Add 1
                </button>
                {item.qty > 1 ? (
                  <button
                    onClick={(evt) => {
                      let guestCart = JSON.parse(
                        window.localStorage.getItem("cart")
                      );
                      for (let i = 0; i < guestCart.length; i++) {
                        if (guestCart[i].id === item.id) {
                          guestCart[i].qty--;
                          this.state.subtotal -= item.price;
                        }
                      }
                      window.localStorage.setItem(
                        "cart",
                        JSON.stringify(guestCart)
                      );
                      this.setState({ guestCart: guestCart });
                    }}
                  >
                    Minus 1
                  </button>
                ) : (
                  ""
                )}
                <button
                  onClick={(evt) => {
                    let guestCart = JSON.parse(
                      window.localStorage.getItem("cart")
                    );
                    for (let i = 0; i < guestCart.length; i++) {
                      if (guestCart[i].id === item.id) {
                        guestCart.splice(i, 1);
                        this.state.subtotal -= item.price * item.qty;
                        break;
                      }
                    }
                    window.localStorage.setItem(
                      "cart",
                      JSON.stringify(guestCart)
                    );
                    this.setState({ guestCart: guestCart });
                  }}
                >
                  Remove Pokemon
                </button>
              </div>
            );
          })}
        </div>
        <h3>Subtotal: ${this.state.subtotal / 100}</h3>
        {this.state.guestCart.length !== 0 ? (
          <button
            onClick={() => {
              this.setState({ guestCart: [] });
              window.localStorage.removeItem("cart");
            }}
          >
            <Link to="/checkout">CHECKOUT</Link>
          </button>
        ) : (
          ""
        )}
      </div>
    );
    let userJSX = (
      <div>
        <h1>Cart</h1>
        {cart.length === 0 ? <h2>Your Cart is empty</h2> : <span />}
        <div id="cartItems">
          {cart.map((item) => {
            return (
              <div className="cartItems" key={item.id}>
                <div id="itemname">{item.name}</div>
                <Link to={`/items/${item.id}`}>
                  <img class="card-image" src={item.imageUrl} />
                </Link>
                <div>
                  <h3>Total Price: ${item.totalPriceAtSaleTime / 100}</h3>
                  <h3>Quantity: {item.qty}</h3>

                  <button
                    onClick={(evt) => {
                      this.props.update(
                        { qty: ++item.qty, id: item.id, add: true, ...item },
                        this.state.id
                      );
                      this.state.subtotal += item.price;
                    }}
                  >
                    Add 1
                  </button>
                  {item.qty > 1 ? (
                    <button
                      onClick={(evt) => {
                        this.props.update(
                          { qty: --item.qty, id: item.id, add: false, ...item },
                          this.state.id
                        );
                        this.state.subtotal -= item.price;
                      }}
                    >
                      Minus 1
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={(evt) => {
                      this.props.delete(item.id, this.state.id);
                      this.state.subtotal -= item.totalPriceAtSaleTime;
                    }}
                  >
                    Remove Pokemon
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h3>Subtotal: ${this.state.subtotal / 100}</h3>
        {cart.length !== 0 ? (
          <button
            id="checkout"
            onClick={() => {
              this.props.closeCart(this.state.id);
            }}
          >
            <Link to="/checkout">CHECKOUT</Link>
          </button>
        ) : (
          <span />
        )}
      </div>
    );
    return this.state.id ? userJSX : guestJSX;
  }
}
const mapState = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(fetchCart(id)),
    getUser: () => dispatch(me()),
    //UPDATE CART
    update: (thingToUpdate, userId) =>
      dispatch(updateCart(thingToUpdate, userId)),
    delete: (itemId, userId) => dispatch(clearItem(itemId, userId)),
    closeCart: (id) => dispatch(closeCart(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
