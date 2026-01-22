import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar("/temas", setTemas, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();

        if (id !== undefined) {
            buscarPostagemPorId(id);
        }
    }, [id]);

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate("/postagens");
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar("/postagens", postagem, setPostagem, {
                    headers: { Authorization: token }
                });
                alert("Postagem atualizada com sucesso!");
            } else {
                await cadastrar("/postagens", postagem, setPostagem, {
                    headers: { Authorization: token }
                });
                alert("Postagem cadastrada com sucesso!");
            }
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                alert("Erro ao salvar a postagem");
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-purple-500 text-center mb-6">
                    {id ? "Editar Postagem" : "Cadastrar Postagem"}
                </h1>

                <form onSubmit={gerarNovaPostagem} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-purple-500 font-semibold">
                            Título da Postagem
                        </label>
                        <input
                            type="text"
                            name="titulo"
                            value={postagem.titulo || ""}
                            onChange={atualizarEstado}
                            required
                            className="border-2 border-purple-200 rounded-lg p-2
                                       focus:ring-2 focus:ring-pink-300 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-purple-500 font-semibold">
                            Texto da Postagem
                        </label>
                        <input
                            type="text"
                            name="texto"
                            value={postagem.texto || ""}
                            onChange={atualizarEstado}
                            required
                            className="border-2 border-purple-200 rounded-lg p-2
                                       focus:ring-2 focus:ring-pink-300 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-purple-500 font-semibold">
                            Tema da Postagem
                        </label>

                        <select
                            required
                            className="border-2 border-purple-200 rounded-lg p-2
                                       focus:ring-2 focus:ring-pink-300 outline-none"
                            onChange={(e) =>
                                setTema(temas.find(t => t.id === Number(e.target.value))!)
                            }
                        >
                            <option value="">Selecione um tema</option>
                            {temas.map((tema) => (
                                <option key={tema.id} value={tema.id}>
                                    {tema.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-pink-400 to-purple-400
                                   text-white font-bold py-2 rounded-xl mt-4
                                   hover:from-pink-500 hover:to-purple-500
                                   transition-all duration-300 shadow-md
                                   flex justify-center"
                    >
                        {isLoading ? (
                            <ClipLoader color="#fff" size={24} />
                        ) : (
                            <span>{id ? "Atualizar" : "Cadastrar"}</span>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default FormPostagem;
