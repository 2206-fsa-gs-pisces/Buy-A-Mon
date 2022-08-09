import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleItem } from "../store/singleItem";
import { addItemToCart } from "../store/cart";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";
import { deleteItem } from "../store/items";

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
      console.log(window.localStorage.cart);
    } else {
      const id = user.auth.id;
      let addQty = parseInt(event.target);

      if (!addQty) {
        addQty = 1;
      }

      const newItemOrder = {
        id: this.props.item.id,
        name: this.props.item.name,
        price: this.props.item.price,
        imageUrl: this.props.item.imageUrl,
        description: this.props.item.description,
        qty: addQty,
      };
      this.props.addItem(newItemOrder, id);
    }
  }
  // componentDidMount() {
  //   this.props.singleItem(this.props.match.params.id);
  // }
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
  // async componentDidMount() {
  //   const user = await this.props.getUser();
  //   const id = user.auth.id;
  //   this.props.singleItem(this.props.match.params.id);
  //   this.props.getCart(id);
  // }
  render() {
    const name = this.props.item.name;
    const imageUrl = this.props.item.imageUrl;
    const description = this.props.item.description;
    const price = this.props.item.price;
    return (
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
            console.log(item.id);
            await this.props.deleteItem(item);
          }}
        >
          Delete Item
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    item: state.singleItem,
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

// {this.props.user.role === "admin" ? (
//     <div>
//       <img width="400vh" height="400vh" src={imageUrl} />
//       <h1>{name}</h1>
//       <h4>${price / 100}</h4>
//       <h4>{description}</h4>
//       <Link to="/pokemon/addToCart"> Add to Cart</Link>
//       <Button className="create" onClick={() => this.props.createItem(item.id)}>
//         Add Item
//       </Button>
//       <Button className="delete" onClick={() => this.props.deleteItem(item.id)}>
//         Delete Item
//       </Button>
//       <Button className="edit" onClick={() => this.props.editItem(item.id)}>
//         Edit Item
//       </Button>
//     </div>
//   ) : (
//     <div>
//       <img width="400vh" height="400vh" src={imageUrl} />
//       <h1>{name}</h1>
//       <h4>${price / 100}</h4>
//       <h4>{description}</h4>
//       <Link to="/pokemon/addToCart"> Add to Cart</Link>
//     </div>
//   );
// }

//C: there are two componentDidMounts in this component. Pretty sure this is not desired since the second one is breaking the code!
//C: you are trying to push an object into another object in your local cart on line 35. you need to access the array in side of the object
