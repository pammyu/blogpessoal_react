import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado!");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate("/temas");
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { Authorization: token }
                });
                alert("O Tema foi atualizado com sucesso!");
            } else {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { Authorization: token }
                });
                alert("O Tema foi cadastrado com sucesso!");
            }
        } catch (error: any) {
            if (error.toString().includes("401") || error.toString().includes("403")) {
                handleLogout();
            } else {
                alert("Erro ao salvar o tema.");
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                
                <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
                    {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
                </h1>

                <form 
                    className="w-full flex flex-col gap-6"
                    onSubmit={gerarNovoTema}
                >
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="descricao"
                            className="text-sm font-semibold text-purple-500 text-center"
                        >
                            Descrição do Tema
                        </label>

                        <input
                            type="text"
                            placeholder="Descreva aqui seu tema"
                            name="descricao"
                            className="
                                border-2 border-pink-300 rounded-xl
                                px-4 py-3
                                focus:outline-none focus:ring-2 focus:ring-pink-300
                                transition
                            "
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            w-full rounded-xl px-6 py-3
                            bg-gradient-to-r from-pink-400 to-purple-400
                            text-white font-bold
                            hover:from-pink-500 hover:to-purple-500
                            transition-all duration-300
                            shadow-md
                            flex items-center justify-center
                        "
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormTema;
