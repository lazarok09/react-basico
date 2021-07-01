import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    name: " lazarok09",
    // temos uma chave, que contém um array com objetos
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
  };
  render() {
    const { name } = this.state;
    const { posts } = this.state;
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
          </div>
        ))}
      </div>
    );
  }
}
export default App;
