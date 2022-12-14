import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleItem } from "../store/singleItem";
import { addItemToCart } from "../store/cart";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";
import { deleteItem } from "../store/items";
// import { updateItem } from "../store/items";
import EditItem from "./EditItem";

class SingleItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    event.preventDefault();

    const user = await this.props.getUser();
    if (!user) {
      let alreadyInCart = false;
      if (!window.localStorage.getItem("cart")) {
        window.localStorage.setItem("cart", JSON.stringify([]));
      }
      let guestCart = JSON.parse(window.localStorage.getItem("cart"));
      for (let i = 0; i < guestCart.length; i++) {
        if (guestCart[i].id === this.props.item.id && guestCart[i].qty) {
          guestCart[i].qty++;
          alreadyInCart = true;
        }
      }
      if (!alreadyInCart) {
        let temp = this.props.item;
        temp.qty = 1;
        guestCart.push(temp);
      }

      window.localStorage.setItem("cart", JSON.stringify(guestCart));
      alert("added to cart");
    } else {
      const id = user.auth.id;

      const newItemOrder = {
        id: this.props.item.id,
        name: this.props.item.name,
        price: this.props.item.price,
        imageUrl: this.props.item.imageUrl,
        description: this.props.item.description,
        qty: 1,
      };
      this.props.addItem(newItemOrder, id);
      alert("added to cart");
    }
  }

  async componentDidMount() {
    const user = await this.props.getUser();
    if (user) {
      const id = user.auth.id;
      this.props.singleItem(this.props.match.params.id);
      this.props.getCart(id);
    } else {
      this.props.singleItem(this.props.match.params.id);
    }
  }
  render() {
    const name = this.props.item.name;
    const imageUrl = this.props.item.imageUrl;
    const description = this.props.item.description;
    const price = this.props.item.price;
    return (
      <div>
        {this.props.user.role === "admin" ? (
          <div>
            <img width="400vh" height="400vh" src={imageUrl} />
            <h1>{name}</h1>
            <h4>${price / 100}</h4>
            <h4>{description}</h4>
            <button onClick={this.handleClick} type="submit">
              Add To Cart
            </button>
            <button
              onClick={async () => {
                await this.props.deleteItem(this.props.item.id);
                this.props.history.push("/home");
              }}
            >
              Delete Item
            </button>
            <EditItem item={this.props.item} />
          </div>
        ) : (
          <div>
            <img width="400vh" height="400vh" src={imageUrl} />
            <h1>{name}</h1>
            <h4>${price / 100}</h4>
            <h4>{description}</h4>
            <button onClick={this.handleClick} type="submit">
              Add To Cart
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    item: state.singleItem,
    user: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  singleItem: (id) => dispatch(fetchSingleItem(id)),
  addItem: (item, userId) => dispatch(addItemToCart(item, userId)),
  getCart: (id) => dispatch(fetchCart(id)),
  getUser: () => dispatch(me()),
  deleteItem: (id) => dispatch(deleteItem(id)),
});

export default connect(mapState, mapDispatch)(SingleItem);
