import "./styles.css";

import { Component } from "react";

import { loadPosts } from "../../utils/load-posts";

import { Posts } from "../../Posts";
import { Button } from "../../Button";

class Home extends Component {
  state = {
    // temos uma chave, que contém um array com objetos
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  };

  // renderiza o componente, por ter promise usa async await
  async componentDidMount() {
    await this.loadPosts();
  }
  // desestruturando a página e posts por página do estado
  
  // função que busca postagens
  loadPosts = async () => {
    const{ page, postsPerPage} = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos 
    
    });
  };

  loadMorePosts = () => {
  const {page, postsPerPage, allPosts, posts} = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    // manda pro posts os próximos
    posts.push(...nextPosts);
    // manda o posts agora com 4 no total; e a página recebe o valor que tá em nextPage no caso 4 na primeira execução.

    this.setState({posts, page : nextPage});
}

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    // se a página que estou querendo ir for maior ou igual ao tamanho de todos os posts
    const noMorePosts = page + postsPerPage >= allPosts.length; 

    return (
      <section id="posts-container">
        <Button onClick={this.loadMorePosts} text={"Mais Posts"} disabled={noMorePosts}/>
        <Posts posts={posts} />
      </section>
    );
  }
}
export default Home;
