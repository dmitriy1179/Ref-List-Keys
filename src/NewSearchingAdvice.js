import React from "react";

class Search extends React.Component {
  state = {
    advices : null,
    errors : null,
    isReset : false
  }
  async fetch() {
    try {
      const advicesJson = await fetch(`https://api.adviceslip.com/advice/search/${this.props.query}`);
      if (!advicesJson.ok) {
        throw new Error(advicesJson.statusText)
      }
      const advicesData = await advicesJson.json();
      this.setState({
        advices : advicesData,
      });
    }
    catch(error) {
      console.log(error)
      this.setState({
        errors: error
      });
    }
  }
  componentDidUpdate (nextProps) {
    if (nextProps.reset !== this.props.reset) {
      this.setState({
        isReset : true,
        errors : null,
      }); 
      return false  
    }
    else if (nextProps.query !== this.props.query) {
      this.setState({
        advices : true,
        isReset : false,
        errors : null,
      }); 
      this.fetch()
      return false
    }
    return true
  }
  render() {
    if (this.state.isReset) {
      return null
    }
    if (this.state.errors !== null) {
      return <div>{this.state.errors.toString()}</div>
    }
    if (this.state.advices === null) {
      return null
    }
    if (this.state.advices === true) {
        return <div>Loading</div>;
    }
    if (this.state.advices.message) {
      return <div>No results</div>
    }
    return (
        <div>
          <ul>
            {this.state.advices.slips.map((advice, index) => (
              <li key={advice.id}>
                <span style={{margin:"10px", fontSize:"20px"}}>{index+1 + "."} {advice.advice}</span>
              </li>
            ))}
        </ul>
    </div>  
    )  
  }
}

class NewSearchingAdvice extends React.Component {
  state = {
    value : null,
    clear : false
  }
  inputRef = React.createRef();
  clearInput = () => {
      this.inputRef.current.value = "";
      this.setState({
        clear : !this.state.clear,
        value : null
      })
  }
  buttonOnClick = () => {
    this.setState({
      value : this.inputRef.current.value,
    })
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.clearInput}>Clear</button>
        <input ref={this.inputRef} style={{margin:"10px"}} type="text" placeholder="Enter advice"/>
        <button type="button" onClick={this.buttonOnClick}>Search advices</button>
        <Search query={this.state.value} reset={this.state.clear}/>
      </div>
    )
  }
}

export default NewSearchingAdvice
