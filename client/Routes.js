import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllItems from "./components/AllItems";
import CheckOut from "./components/CheckOut";
import SingleItem from "./components/SingleItem";
import Cart from "./components/Cart";
import AllUsers from "./components/AllUsers";
import createItem from "./components/createItem";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/" exact component={AllItems} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/allitems" component={AllItems} />
          <Route path="/items/:id" component={SingleItem} />
          <Route path="/cart" component={Cart} />
          <Route path="/users" component={AllUsers} />
          <Route path="/createItem" component={createItem} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/* {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
        ) : ( */

//C: should see some routes here for logged in users and different routes for logged out users. could even have some admin routes at some point
