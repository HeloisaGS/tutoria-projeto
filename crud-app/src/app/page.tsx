"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
interface Livro {
    id: number;
    title: string;
    author: string;
}

export default function Teste(){
    const [livros, setLivros] = useState<Livro[]>([])
    
    //Será uma Página para Listar e Deletar todos os dados da API
    //Chamar a lista de livros - Método GET
    async function chamarListaLivros(){
        try {
            const response = await axios.get("http://localhost:3333/livros")
            setLivros(response.data)
        } catch (error) {
            console.log("Erro...", error)
        }
    };
    useEffect(() =>{
        chamarListaLivros();
    },[])
    
    //Deletar elementos na lista de livros - Método DELETE
    async function deletarLivro(livroId: number){
        try {
            await axios.delete(`http://localhost:3333/livros/${livroId}`);

            const livrosFiltrados = livros.filter((livro) => livro.id !== livroId);
            setLivros(livrosFiltrados)
        } catch (error) {
            console.log("Erro...", error);
        }
    }
    //Inserir elementos na lista de livros
    
    //Editar elementos na lista de livros  
    
    //E outra página para Criar ou Atualizar dados.


    return (
        <>
            <h1>Aqui você pode deletar um livro</h1>
            <div>
                <h2>Catálogo de livros</h2>
                <ul>
                    {livros.map(livro => (
                        <li key={livro.id}>{livro.title} - {livro.author}
                        <button onClick={() => deletarLivro(livro.id)}>Deletar</button>
                        </li>
                    ))}
                </ul>
            </div>
            
        </>
    )
}