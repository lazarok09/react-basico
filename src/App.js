import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    name: " lazarok09",
    // temos uma chave, que contém um array com objetos
    posts: [],
    cronometro: 0,
  };
  // funções
  handleStartCronometro = () => {
    const { cronometro } = this.state;
    this.setState({ cronometro: cronometro + 0 });
  };
  timeoutUpdate = null;
  handleTimeOut = () => {
    const { cronometro } = this.state;

    this.timeoutUpdate = setTimeout(() => {
      this.setState({ cronometro: cronometro + 1 });
    }, 1000);
  };
  componentDidUpdate() {
    this.handleTimeOut();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }
  // ao carregar o componente ele "busca" numa "API" os itens
  componentDidMount() {
    this.setState(
      {
        posts: [
          {
            id: 1,
            title: "futebool",
            description: "o melhor esporte do Brasil",
          },
          {
            id: 2,
            title: "Handeibol",
            description: "Esporte que joga com as mãos",
          },
          {
            id: 3,
            title: "Natação",
            description: "Esporte em que tem contato com a água",
          },
        ],
      },
      console.log("loading completo")
    );
  }
  render() {
    const { name } = this.state;
    const { posts } = this.state;
    const { cronometro } = this.state;
    return (
      <div className="App">
        {/* evento sintético */}
        {/*  iterando sobre os posts */}
        <p>User : {name}</p>
        {posts.map((post) => (
          // o key ajuda o react a identificar rapidamente os elementos para fins de otimização
          <div key={post.id}>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <button onClick={this.handleStartCronometro}>
              Clique para startar o cronometro
            </button>
            <h3>{cronometro}</h3>
          </div>
        ))}
      </div>
    );
  }
}
export default App;
