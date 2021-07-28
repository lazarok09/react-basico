import { useCallback, useEffect, useState } from "react";

import "./styles.css";

/* utilis ( functions ) */
import { loadPosts } from "../../utils/load-posts";
/* components */
import { Posts } from "../../Posts";
import { Button } from "../../Button";
import { TextInput } from "../../TextInput";
import { NoPostsCard } from "../../NoPostsCard";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  // função que busca postagens
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  useEffect(() => {
    console.log(new Date().toLocaleString("pt-BR"));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;
  // se a página que estou querendo ir for maior ou igual ao tamanho de todos os posts
  const noMorePosts = page + postsPerPage >= allPosts.length;
  // noMorePosts é uma boolean por conta do uso de duas comparações (>=);
  return (
    <>
      <header id="header">
        <TextInput searchValue={searchValue} handleChange={handleChange} />
        <div id="button-more-posts">
          {
            // Se searchValue não tem nada faça ->
            !searchValue && (
              <Button
                onClick={loadMorePosts}
                text={"Mais Posts"}
                value={searchValue}
                disabled={noMorePosts}
              />
            )
          }
        </div>
      </header>
      <section id="posts-container">
        {
          // se nos posts filtrados encontramos algo renderize
          filteredPosts.length > 0 && <Posts posts={filteredPosts} />
        }
        {
          // caso não exista post filtrado retorna um parágrafo
          allPosts.length > 0 && filteredPosts.length === 0 && <NoPostsCard />
        }
      </section>
      <footer>
        {
          // Se searchValue não tem nada faça ->
          !searchValue && (
            <a href="#header">
              <Button
                onClick={() => {}}
                text={"Voltar para cima"}
                disabled={noMorePosts}
              />
            </a>
          )
        }
      </footer>
    </>
  );
};
export default Home;
