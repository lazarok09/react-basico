import { Component } from "react";

import "./styles.css";

/* utilis ( functions ) */
import { loadPosts } from "../../utils/load-posts";
/* components */
import { Posts } from "../../Posts";
import { Button } from "../../Button";

class Home extends Component {
  state = {
    // State é um objeto com chaves. Chaves podem qualquer coisa
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
  };

  // renderiza o componente, por ter promise usa async await
  async componentDidMount() {
    await this.loadPosts();
    // faz referência a função criada na raiz do código e não na importada
  }

  // função que busca postagens
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    /* await loadPosts(); temos uma 'utils' que faz uma fetch API.
       Ela, a requisição, nos retorna um array de 100 posições.
       Cada posição no array contém objetos, que são respostas das requisições */

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
    /* posts recebe um corte. Na primeira execução recebe 0 em page e 2 em postsPerPage,
      colocando em posts apenas dois objetos
     allPosts recebe o array inteiro de 100 posições.
    */
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    /* nextPage() -> seguindo a lógica ele pega 0 + 2 e salva.
     Na próxima vai ser 2 + 2. 4 + 2 em diante.
    */
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    /* nextPosts -> valor de nextPosts no primeiro corte (slice) é a chave 2 e 4,
     tendo em vista que o último valor não conta no slice,
     ficaremos com o 2º e o 3º índex. 2 e 3 - São posição de index que contém objetos do array allPosts
    */

    posts.push(...nextPosts);
    /* posts.push() -> na primeira execução o nosso array posts têm apenas duas chaves, 0 e 1 com objetos das postagens.
     quando damos um push com nextPosts, estamos enviando + 2 postagens. */
    this.setState({ posts, page: nextPage });
    // Ao final do estado setado, page que era 0 agora receberá a próxima página.
  };

  render() {
    // recuperando variáveis do estado
    const { posts, page, postsPerPage, allPosts } = this.state;

    // se a página que estou querendo ir for maior ou igual ao tamanho de todos os posts
    const noMorePosts = page + postsPerPage >= allPosts.length;
    // noMorePosts é uma boolean por conta do uso de duas comparações (>=);
    return (
      <section id="posts-container">
        <Button
          onClick={this.loadMorePosts}
          text={"Mais Posts"}
          disabled={noMorePosts}
        />
        <Posts posts={posts} />
      </section>
    );
  }
}
export default Home;
