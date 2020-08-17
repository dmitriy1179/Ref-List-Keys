import React from "react";

//https://api.adviceslip.com/advice

class RandomAdvice extends React.Component {
  state = {
    data: null
  };
  async componentDidMount() {
    const response = await fetch("https://api.adviceslip.com/advice");

    const { slip } = await response.json();

    this.setState({
      data: slip
    });
  }

  render() {
    const { data } = this.state;
    if (data === null) {
      return <div>Loading</div>;
    }

    return (
      <section className="border py-5">
        <h1 className="lead">Advice</h1>
        <blockquote className="blockquote text-right">
          <p className="mb-0">{data.advice}</p>
        </blockquote>
      </section>
    );
  }
}

export default RandomAdvice;
