import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const loginForm = (
    <form onSubmit={handleSubmit} name={name}>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />
      </div>
      <div>
        <button type="submit">{displayName}</button>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </form>
  );
  const signupForm = (
    <form onSubmit={handleSubmit} name={name}>
      <div>
        <label htmlFor="firstName">
          <small>First Name</small>
        </label>
        <input name="firstName" type="text" />
      </div>

      <div>
        <label htmlFor="lastName">
          <small>Last Name</small>
        </label>
        <input name="lastName" type="text" />
      </div>

      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
      </div>

      <div>
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />
      </div>

      <div>
        <button type="submit">{displayName}</button>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </form>
  );
  return <div>{name === "signup" ? signupForm : loginForm}</div>;
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      let firstName = null;
      let lastName = null;
      let regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$%!^%()*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      let emailRegex = /(\w|!|#|\$|%|&|\*|\.)*@(\w|!|#|\$|%|&|\*|\.)*.com/;
      evt.target.firstName
        ? (firstName = evt.target.firstName.value)
        : firstName;
      evt.target.lastName ? (lastName = evt.target.lastName.value) : lastName;
      if (
        formName === "signup" &&
        (firstName.length < 1 || lastName.length < 1)
      ) {
        alert(`name fields cannot be empty`);
        return;
      }
      if (formName === "signup" && !regex.test(password)) {
        alert(
          `password must be between 8 and 20 characters.
          Password must contain:
          -one uppercase letter
          -one lowercase letter
          -one number
          -one symbol '()!@#$%^&*'`
        );
        return;
      }
      if (formName === "signup" && !emailRegex.test(email)) {
        alert(`email must be valid format`);
        return;
      }
      dispatch(authenticate(email, password, formName, firstName, lastName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

//C: regex... impressive
