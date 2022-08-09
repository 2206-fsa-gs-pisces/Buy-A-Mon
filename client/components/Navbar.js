import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Pokemon Cards</h1>

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/allitems">All Items</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/createItem">
            <button className="creatItemButton">Add new Item</button>
          </Link>
          <Link to="/users">
            <button className="allUsers">All Users</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/allitems">All Items</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/signupform">Sign Up</Link>

          {/* <Link to="/editItem">
            <button className="creatItemButton">Edit Item</button>
          </Link> */}
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

//C: navbar has two sign up links
