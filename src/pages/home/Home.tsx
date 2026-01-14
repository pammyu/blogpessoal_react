function Home() {
  return (
    <>
      <main className="bg-pink-300 flex justify-center">
        <section className="container grid grid-cols-2 text-white">
          <article className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-center text-5xl font-bold leading-tight">
                Seja bem-vindo ao Blog Pam.devlog!
                </h2>
                
              <p className="text-xl">
                Criando, testando e aprendendo em público.
                </p>

                <button className="flex justify-around gap-4 rounded text-white border-white border-solid border-2 py-2 px-4">
                  Nova Postagem
                </button>

          </article>

          <figure className="flex justify-center">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/female-web-developer-working-on-project-illustration-svg-download-png-4759502.png" alt="Imagem Página Home" className="w-2/3"/>
          </figure>

        </section>
      </main>
    </>
  );
}
export default Home;