export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
  // Um array com chave posts e photos recebe as promessas resolvidas das requisições
  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
  // posts e photos também são promises por isso precisamos do await na passagem de promise para JSON.

  const postsJson = await posts.json();
  const photosJson = await photos.json();
  //função de zipper pelo menor array

  const postsAndPhotos = postsJson.map((post, index) => {
    /* retorna um array de objetos. Onde cada objeto é um post da requisição com o atributo URL chamado de cover
    aqui acontece o array ziper, onde o menor array é mapeado e do segundo array, é retirado o atributo URL baseado no index do array menor.
    O motivo é que temos mais fotos na requisição do que nas postagens, logo se mapearmos de acordo com o index do array menor, temos só as fotos necessárias.

    */
    return { ...post, cover: photosJson[index].url };
  });
  // retorno da função = um array com vários objetos -> [{},{}...]
  return postsAndPhotos;
};
