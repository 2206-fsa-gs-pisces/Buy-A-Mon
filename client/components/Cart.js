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
    };
  }
  async componentDidMount() {
    const user = await this.props.getUser();
    if (user) {
      const userId = user.auth.id;
      this.setState({ id: userId });
      this.props.getCart(userId);
    }
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    // console.log(guestCart);
    if (guestCart) {
      this.setState({ guestCart: guestCart });
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
                <Link to={`/items/${item.id}`}>
                  {item.name}
                  <img height="100vh" width="100vh" src={item.imageUrl} />
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
                  <span />
                )}
                <button
                  onClick={(evt) => {
                    let guestCart = JSON.parse(
                      window.localStorage.getItem("cart")
                    );
                    for (let i = 0; i < guestCart.length; i++) {
                      if (guestCart[i].id === item.id) {
                        guestCart.splice(i, 1);
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
          <span />
        )}
      </div>
    );
    let userJSX = (
      <div>
        <h1>Cart</h1>
        {cart.length === 0 ? <h2>Your Cart is empty</h2> : <span />}
        <div id="cartItems">
          {cart.map((item) => {
            //console.log(item);
            return (
              <div className="cartItems" key={item.id}>
                <Link to={`/items/${item.id}`}>
                  {item.name}
                  <img height="100vh" width="100vh" src={item.imageUrl} />
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
                      }}
                    >
                      Minus 1
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={(evt) => {
                      this.props.delete(item.id, this.state.id);
                    }}
                  >
                    Remove Pokemon
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {cart.length !== 0 ? (
          <button
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

//C: there are two maps that use the same key in this component. this is throwing you an error. simple fix here is to use an index for one of them. not the best solution but good enough for this
//C: your component doesnt know what this.state.guestCart is at first so you need to use a short circuit check so that you will not throw an error
