"use client";
//Passo 7 : No seu App.tsx faça a implementação do código, usando os Hooks UseState e UseEffect para fazer chamadas a sua API usando o método HTTP GET e também para inserir novos dados na API utilizando o método HTTP POST
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

interface Fruta {
    id: number;
    nome: string;
}

export default function Teste(){
    const [dados, setDados] = useState<Fruta[]>([]);
    const [textInput, setTextInput] = useState("");
    //fazer chamadas a sua API usando o método HTTP GET
    async function chamarJSON(){
        try {
            const response = await axios.get('http://localhost:3333/frutas')
            setDados(response.data)
        } catch (error) {
            console.log('Erro...', error)
        }
    };
    useEffect(() => {
        chamarJSON();
    },[])

    //inserir novos dados na API utilizando o método HTTP POST
    async function inserirItem(){
        const data: Omit<Fruta, 'id'> = {nome: textInput}

        try {
            const response = await axios.post('http://localhost:3333/frutas', data)
            console.log("Cadastrado com sucesso...", response)
        } catch (error) {
            console.log("Erro...", error)
        }
    }

    //retorno
    return(
        <>
            <h2>Envie um  item para a lista</h2>
            <div>
                <Input
                    onChange={(e) => setTextInput(e.target.value)} placeholder='Adicione um item...'
                />
                <Button onClick={inserirItem}>Enviar</Button>
            </div>
            
            <h2>Aqui está a lista</h2>
            <ul>{dados.map(dado =>(
                <li key={dado.id}>{dado.nome}</li>
            ))}</ul>
            <Button onClick={chamarJSON}>Atualizar</Button>
        </>
    )
}