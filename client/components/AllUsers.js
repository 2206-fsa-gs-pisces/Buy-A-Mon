import React from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../store/users";
export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    let { users } = this.props;
    // const { isLoggedIn } = this.props;
    return (
      <div>
        {this.props.user.role === "admin" ? (
          <div id="allUsers">
            {users.map((user) => {
              return (
                <div className="allUsers" key={user.id}>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p>{user.email}</p>
                </div>
              );
            })}
          </div>
        ) : (
          "Unauthorized Access"
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    users: state.users,
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchAllUsers()),
    // isLoggedIn: !!state.user.id,
    // user: state.auth,
  };
};

export default connect(mapState, mapDispatch)(AllUsers);

//C: this is one way to check if a user is an admin but certainly not the most secure. gateway authentication is miles better
