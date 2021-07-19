import "./App.css";
import { Component } from "react";
import { PostCard } from "./components/PostCard";

class App extends Component {
  state = {
    // temos uma chave, que contém um array com objetos
    posts: [],
  };
  // componente foi montado em seguida há uma fetch API
  componentDidMount() {
    this.loadPosts();
  }
  // função que busca postagens
  loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();
    //função de zipper pelo menor array

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            photo={post.cover}
            body={post.body}
            id={post.id}
          />
        ))}
      </div>
    );
  }
}
export default App;
