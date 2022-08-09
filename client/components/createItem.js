import React from "react";
import { connect } from "react-redux";
import { createItem } from "../store/items";

class CreateItem extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      imageUrl:
        "https://ecdn.teacherspayteachers.com/thumbitem/Pokemon-Theme-Amazing-Work-Coming-Soon-Signs-7112257-1628095729/original-7112257-1.jpg",
      description: "",
      error: "validation error",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.fetchCreateItem(this.state);
    this.props.history.push("/AllItems");
  }
  //&& this.props.user.role === 'admin

  render() {
    return (
      <div>
        {this.props.isLoggedIn && this.props.user.role === "admin" ? (
          <form id="add-item" onSubmit={this.handleSubmit}>
            <label htmlFor="taskName">Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>

            <label htmlFor="address">Price:</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            ></input>

            <label htmlFor="address">imageUrl:</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            ></input>

            <label htmlFor="address">Description:</label>
            <input
              type="text"
              name="price"
              value={this.state.description}
              onChange={this.handleChange}
            ></input>
            <button type="submit">Add Item</button>
          </form>
        ) : (
          "Unauthorized access"
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  fetchCreateItem: (item) => dispatch(createItem(item)),
});

export default connect(mapState, mapDispatch)(CreateItem);

//C: same as before. this is one way to check to see if a user is an admin but not the most secure. gateway authentication is better
