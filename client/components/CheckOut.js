// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchAllItems } from "../store/items";

// // import { cart, delete, add,  } from "../store/cart";

// class Checkout extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       //cart: {}
//     };
//     // this.handlesubmit = this.handlesubmit().bind(this);
//     // // this.handleChange = this.handleChange.bind(this);
//   }

//   handle() {
//     this.props.checkout(this.state.email);
//   }
//   handleSubmit(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }
//   render() {
//     let subtotal = 0;
//     let totalItems = 0;
//     return (
//       <div>

//         <h1>Checkout -My Cart- </h1>

//         {this.props.orders.item && this.props.orders.item.length !== 0 ? (
//           <div>
//             {items.map((item) => {
//               return (
//                 <div>
//                   <Link to={`/items/${item.id}`} key={item.id}>
//                     {item.name}
//                     <img height="400vh" width="400vh" src={item.imageUrl} />
//                     <h5>Price: ${item.price}</h5>
//                   </Link>

//                   <button
//                     onClick={() => {
//                       this.props.deleteCart(orders.item.id);
//                     }}
//                   >
//                     Remove item from Cart
//                   </button>

//                   <button
//                     onClick={() => {
//                       this.props.addCart(orders.item.id, item.quantity + 1);
//                     }}
//                   >
//                     Add One
//                   </button>

//                   <button
//                     onClick={() => {
//                       this.props.subtract(orders.item.id, item.quantity - 1);
//                     }}
//                   >
//                     Subtract One
//                   </button>
//                 </div>
//               );
//             })}
//             <button onSubmit={() => this.handlesubmit()} type="submit">
//               "CHECKOUT"
//             </button>
//             ({totalItems} += {orders.item.quantity}); ({subtotal} +={" "}
//             {item.price} *{item.quantity});
//             <h1>Total Items: {totalItems}</h1>
//             <h1>Subtotal: ${(subtotal / 100).toFixed(2)}</h1>
//           </div>
//         ) : (
//           <h1>No items in Cart </h1>
//         )}
//       </div>
//     );
//   }
// }

// const mapState = (state) => ({
//   //user: state.auth ?
//   cart: state.cart,
//   item: state.items,
// });

// const mapDispatch = (dispatch) => {
//   return {
//     getCart: () => dispatch(fetchCart()),
//     addCart: () => dispatch(updateCart()),
//     subtract: () => dispatch(subtractCart()),
//     deleteCart: () => dispatch(deleteCart()),
//   };
// };

// export default connect(mapState, mapDispatch)(Checkout);

//C: im assuming that this entire component is going to get scratched???
