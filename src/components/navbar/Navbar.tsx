import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
    const navigate = useNavigate()
    const {handleLogout} = useContext(AuthContext)

    function sair() {
        handleLogout()
        alert('O usuário foi desconectado com sucesso.')
        navigate('/')
    }

    return (
        <>
            <div className="w-full flex justify-center py-4 bg-pink-300 text-white">

                <div className="container flex justify-between text-lg mx-8">
                    <Link to="/home" className="text-2x1 font-bold">Blog Pink Code</Link>

                    <div className="flex gap-6">
                        <Link to="/postagens">Postagens</Link>
                        <Link to="/temas">Temas</Link>
                        <Link to="/cadastrar-tema">Cadastrar Tema</Link>
                        <Link to="/perfil">Perfil</Link>
                        <Link to="" onClick={sair} className="hover:text-pink-700">Sair</Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar