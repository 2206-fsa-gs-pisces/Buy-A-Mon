import axios from "axios";

let initialState = [];

let SET_CART = "SET_CART";
let DELETE_CART = "DELETE_CART";
let UPDATE_CART = "UPDATE_CART";
let CLEAR_CART = "CLEAR_CART";
let ADD_CART = "ADD_CART";

//ACTION CREATOR: SET ALL CART
export const setCart = (CART) => {
  return {
    type: SET_CART,
    CART,
  };
};
//THUNK: GRAB ALL CART
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/users/:id/cart');
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};



//UPDATE CART WITH ADDING/REMOVING ITEMS
export const reformCart = (CART) => {
  return {
    type: UPDATE_CART,
    CART,
  };
};
//THUNK: PUT REQUEST FOR ADDING/REMVING ITEMS
export const updateCart = (CART) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${CART.id}/cart`, CART);
    dispatch(reformCart(data));
  };
};

//UPDATE CART WITH CLEARING CART
export const emptyCart = (CART) => {
    return {
      type: CLEAR_CART,
      CART,
    };
  };
  //THUNK: PUT REQUEST FOR ADDING/REMOVING ITEMS
  export const clearCart = (CART) => {
    //add in an empty object to update the row as empty
    let empty = {}
    return async (dispatch) => {
      const { data } = await axios.put(`/api/users/${CART.id}/cart`, empty);
      dispatch(reformCart(data));
    };
  };
  


//REDUCER
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.CART;
    // case ADD_CART:
    //   return [...state, action.CART];
    case UPDATE_CART:
      return state.map((CART) =>
        CART.id === action.CART.id ? action.CART : CART);
    case CLEAR_CART:
        return state.map((CART) =>
            CART.id === action.CART.id ? action.CART : CART);
    // case DELETE_CART:
    //   return state.filter((CART) => CART.id !== action.id);
    default:
      return state;
  }
}


// //ADD TO CART 
// export const addCART = (CART) => {
//     return {
//       type: ADD_CART,
//       CART,
//     };
//   };
//   //THUNK ADD CART 
//   export const createCART = (CART) => {
//     return async (dispatch) => {
//       try {
//         const { data } = await axios.post(`/api/CART/:id/create/`, CART);
//         dispatch(addCART(data));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };

// //ACTION CREATOR: REMOVE A CART
// export const removeCART = (id) => {
//     return {
//       type: DELETE_CART,
//       id,
//     };
//   };
//   //THUNK: DELETE REQUEST
//   export const deleteCART = (id) => {
//     return async (dispatch) => {
//       try {
//         await axios.delete(`/api/CART/${id}/`);
//         dispatch(removeCART(id));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };