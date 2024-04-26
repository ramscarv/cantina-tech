"use client";

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
    // const { username, lastname, password, email, cpf, role } = req.body;
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/api/register', { username, password, role: 'admin'});
        console.log(response.data); // Aqui você pode manipular a resposta, por exemplo, redirecionar o usuário para uma nova página, armazenar o token de autenticação, etc.
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    

    return (
        <section>
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <h1 className="text-5xl font-bold text-center text-gray-800">
                    Welcome to the Home Page
                </h1>
                {/* inputs for Register */}
                <div>
                    <h1>Register</h1>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="mb-2"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Sobrenome"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Home;