import React from "react";
import RandomAdvice from "./RandomAdvice"

class ParentRandomAdvice extends React.Component {
  state = {
    count : 0
  }
  buttonOnClick = () => {
    this.setState((state) => ({
      count : state.count + 1
    }))
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.buttonOnClick}>Refresh Advice</button>  
        <RandomAdvice key={this.state.count}/>
      </div>
    )
  }
}

export default ParentRandomAdvice
