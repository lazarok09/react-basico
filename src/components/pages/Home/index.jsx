import { Component } from "react";

import "./styles.css";

/* utilis ( functions ) */
import { loadPosts } from "../../utils/load-posts";
/* components */
import { Posts } from "../../Posts";
import { Button } from "../../Button";
import { TextInput } from "../../TextInput";

class Home extends Component {
  state = {
    // State é um objeto com chaves. Chaves podem qualquer coisa
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    // criação de estado pra salvar o value do input
    searchValue: ''
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

  handleInput = (event) => {
    const { value } = event.target
    this.setState({ searchValue: value})
    const { searchValue} = this.state
    console.log(searchValue)
  }
  
  render() {
    // recuperando variáveis do estado
    const { posts, page, postsPerPage, allPosts, searchValue} = this.state;
    // criando atribuição de posts à filteredPosts

    /* Se searchValue contém alguma coisa faça em todos os posts um filtro.
    Para cada post em seu título minúsculo
    Verifique se ele inclui o valorProcurado (searchValue) em minúsculo
    Se contém, é retornado o post que contém aquele título se não, é retornado apenas a variável posts que vai ter 2 posts
    O interessante do código é que searchValue só é true se alguém estiver pesquisando algo.*/
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase()
        .includes(searchValue.toLowerCase());
      })
    : posts;
    // se a página que estou querendo ir for maior ou igual ao tamanho de todos os posts
    const noMorePosts = page + postsPerPage >= allPosts.length;
    // noMorePosts é uma boolean por conta do uso de duas comparações (>=);
    return (
      <section id="posts-container">
       {  // se searchValue tem algo faça ->
          !!searchValue && (
            <h1>Search : {searchValue}</h1>
          )
        }
          <TextInput searchValue={searchValue}
          handleInput={this.handleInput} />
            {
            // Se searchValue não tem nada faça ->
          !searchValue && (
            <Button
              onClick={this.loadMorePosts}
              text={"Mais Posts"}
              value={searchValue}
              disabled={noMorePosts}
            />
          )
        }
      
       
      
         {
          // se nos posts filtrados encontramos algo renderize
          filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )
        }
         {
           // caso não exista post filtrado retorna um parágrafo
          filteredPosts.length === 0 && (
            <p>Não possuímos posts com esse título :(</p>
          )
        }
        
    
      </section>
    );
  }
}
export default Home;
