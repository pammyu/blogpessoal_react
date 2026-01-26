import ListaPostagem from '../../components/postagem/listapostagem/ListaPostagem';
import ModalPostagem from '../../components/postagem/modalpostagem/ModalPostagem';
import BannerHome from './Banner.png'

function Home() {
  return (
    <>
      <main className=" w-full min-h-screen bg-pink-200 flex justify-center">
        <section className="container grid grid-cols-2 text-white">
          <article className=" text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent to-purple-300 flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-center text-5xl font-bold leading-tight">
                
                Seja bem-vindo ao Blog Pink Code!
                </h2>
                
              <p className="text-purple-500 text-xl">
                Onde aprender também faz parte do código 💗
                </p>      

              <ModalPostagem />
          </article>

          <figure className="flex justify-center items-center">
            <img src={BannerHome} alt="Ilustração de uma mulher programando" className="w-4/5"/>
          </figure>

        </section>
      </main>


      <ListaPostagem />
    </>
  );
}
export default Home;