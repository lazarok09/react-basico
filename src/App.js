import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    // realizando o bind pra usar um this dentro de uma função ( resolve problema com this)
    // this.handlePClick = this.handlePClick.bind(this);
    // pra resolver o bind, usamos as funções como arrow functions, já que elas não possuem this
    // procuraram nos seus pais, ou seja, é um hackzin pra usar this sem bind.

    // é possível apagar o this abaixo, e o suepr e o construtor, com uma coisa chamada "class fields do react"
    this.state = {
      name: "lazarok09",
      counter: 0,
    };
  }
  // funções

  handleCounter = () => {
    // capiturando o contador do estado
    const { counter } = this.state;
    // inserindo novo valor
    this.setState({ counter: counter + 1 });
  };
  render() {
    const { counter } = this.state;
    return (
      <div className="App">
        {/* evento sintético */}
        <p onClick={this.handleCounter}>
          Contador em componente de classe hehe : {counter}
        </p>
      </div>
    );
  }
}
export default App;
