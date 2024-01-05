"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Livro {
    id: number;
    title: string;
    author: string;
}

export default function Teste2(){
    const [livros, setLivros] = useState<Livro[]>([])
    const [textInput1, setTextInput1] = useState("")
    const [textInput2, setTextInput2] = useState("")
    
    //E outra página para Criar ou Atualizar dados.
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
    

    //Editar elementos na lista de livros
    
    async function atualizarLivro(livroId: number, tituloLivro: string, autorLivro: string){
        const result = livros.map((livro)=> {
            if(livro.id === livroId){
                return{...livro, title: tituloLivro, author: autorLivro}
            }
            return livro;
        });
        setLivros(result);
        try {
            await axios.put(`http://localhost:3333/livros/${livroId}`, {
                title: tituloLivro,
                author: autorLivro,
            });
            alert('Livro atualizado');
        } catch (error) {
            console.log("Error", error);
            
        }
        

    }
    //Inserir elementos na lista de livros
    async function adicionarLivro(){
        const data: Omit<Livro, "id"> = {title: textInput1, author: textInput2}
        try {
            const response = await axios.post("http://localhost:3333/livros", data);
            chamarListaLivros();
            alert("Adicionado com sucesso")
        } catch (error) {
            console.log("Erro...", error)
        }
    }


    return (
        <>
            <h1>Aqui você pode inserir ou atualizar um livro</h1>
            <div>
                <h2>Adicione um livro</h2>
                <div className='formulario'>
                    <input 
                        onChange={(e) => setTextInput1(e.target.value)}
                        placeholder='Digite aqui o título'
                    />
                    <br />
                    <input 
                        onChange={(e) => setTextInput2(e.target.value)}
                        placeholder='Digite aqui o autor'
                    />
                    <br />
                    <button onClick={adicionarLivro}>Enviar</button>
                </div>
                <h2>Edite um livro</h2>
                <ul>
                    {livros.map(livro => (
            
                        <li key={livro.id}>{livro.title} - {livro.author}{""}
                        <button
                            onClick={()=>{
                                const newTitle = prompt("Digite o novo título: ");
                                const newAuthor = prompt("Digite o novo autor: ");
                                if (newTitle!== null && newAuthor!==null){
                                    atualizarLivro(livro.id, newTitle, newAuthor)
                                }
                            }}
                        >Atualizar</button>
                        </li>
                    ))}
                </ul>
            </div>
            
        </>
    )
}