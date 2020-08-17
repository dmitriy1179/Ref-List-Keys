import React from "react";

class AutoFocus extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }

  setFocus = () => {
    this.ref.current.focus();
  };

  setBlur = () => {
    this.ref.current.blur();
  };

  render() {
    return (
      <div className="d-flex flex-column col-5 my-2">
        <div className="input-group mb-3">
          <input className="form-control" ref={this.ref} type="text" />
        </div>

        <div className="btn-group btn-group-sm">
          <button onClick={this.setFocus} className="btn btn-primary">
            Focus
          </button>
          <button onClick={this.setBlur} className="btn btn-danger">
            Blur
          </button>
        </div>
      </div>
    );
  }
}

export default AutoFocus;
