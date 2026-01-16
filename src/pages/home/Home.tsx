import BannerHome from './Banner.png'

function Home() {
  return (
    <>
      <main className=" w-full min-h-screen bg-pink-200 flex justify-center">
        <section className="container grid grid-cols-2 text-white">
          <article className="text-pink-600 flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-center text-5xl font-bold leading-tight">
                Seja bem-vindo ao Blog Código em Processo!
                </h2>
                
              <p className="text-pink-600 text-xl">
                Criando, testando e aprendendo em público.
                </p>

                <button className="flex justify-around gap-4 roundedtext-pink-600 border-pink-600 border-solid border-2 py-2 px-4">
                  Nova Postagem
                </button>

          </article>

          <figure className="flex justify-center items-center">
            <img src={BannerHome} alt="Ilustração de uma mulher programando" className="w-4/5"/>
          </figure>

        </section>
      </main>
    </>
  );
}
export default Home;