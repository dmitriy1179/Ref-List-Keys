import React from "react";

const generateUniqid = () => `_${Math.random().toString(36).substr(2, 9)}`;

const User = ({ name, id, selected, onSelect, onRemove }) => {
  return (
    <li
      onClick={() => onSelect(id)}
      className={`list-group-item d-flex cursor justify-content-between text-left ${
        selected ? "active" : ""
      }`}
    >
      <span>{name}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        className="btn btn-sm btn-danger"
      >
        Remove
      </button>
    </li>
  );
};

User.defaultProps = {
  selected: false,
  onSelect: () => {}
};

class AddUser extends React.Component {
  state = {
    user: null
  };

  ref = React.createRef();

  onChange = (e) => {
    const userName = e.target.value;

    this.setState({
      user: {
        name: userName
      }
    });
  };

  getUser = () => {
    return Object.assign(this.state.user, { id: generateUniqid() });
  };

  onAddToBottom = (e) => {
    e.preventDefault();

    this.props.onAddUser(this.getUser(), "bottom");
    this.onClear();
  };

  onAddToTop = (e) => {
    e.preventDefault();
    this.props.onAddUser(this.getUser(), "top");
    this.onClear();
  };

  onClear = () => {
    this.ref.current.value = "";
    this.setState({
      user: null
    });
  };

  render() {
    const { user } = this.state;
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group mb-3">
          <input
            ref={this.ref}
            onChange={this.onChange}
            type="text"
            className="form-control"
            placeholder="User name"
          />
          <div className="btn-group mt-3">
            <button
              disabled={user === null}
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.onClear}
            >
              Reset
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              disabled={user === null}
              onClick={this.onAddToTop}
            >
              Add to Top
            </button>
            <button
              disabled={user === null}
              type="button"
              onClick={this.onAddToBottom}
              className="btn btn-outline-success"
            >
              Add to Bottom
            </button>
          </div>
        </div>
      </form>
    );
  }
}
class UserList extends React.Component {
  state = {
    users: this.props.initialUsers,
    selectedUser: null
  };

  onAddUser = (user, direction = "bottom") => {
    const newUsers =
      direction === "top"
        ? this.state.users.concat([user])
        : [user].concat(this.state.users);

    this.setState({
      users: newUsers
    });
  };

  onRemoveUser = (id) => {
    const { users } = this.state;

    this.setState({
      users: users.filter((user) => user.id !== id)
    });
  };

  onSelectUser = (id) => {
    this.setState({
      selectedUser: id
    });
  };

  render() {
    const { users, selectedUser } = this.state;

    return (
      <div className="p-4">
        <AddUser onAddUser={this.onAddUser} />
        <ul className="list-group">
          {users.map((user) => (
            <User
              key={user.id}
              onRemove={this.onRemoveUser}
              onSelect={this.onSelectUser}
              selected={selectedUser === user.id}
              {...user}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
