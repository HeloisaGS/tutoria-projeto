"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Repositorio{
  id: number;
  name: string;
  html_url: string;
}

export default function Home(){
  const [dados, setDados] = useState<Repositorio[]>([]);

  async function chamarAPI(){
      //3. requisição http usando metodo get
      // usar use state e método .get() da biblioteca axios
      try {
        const response = await axios.get('https://api.github.com/users/HeloisaGS/repos')
        setDados(response.data);
      //4. tratar a resposta da requisição
      } catch (error) {
        console.log('Erro...', error);
      }
    };

    useEffect(() => {
      chamarAPI();
    },[])
    

    return(
      <main>
        <h1>Meus repositórios</h1>
        <br />
        <ul>
          {dados.map(dado =>(
            <li key={dado.id}>
              <a href={dado.html_url} target='_blank'>
                {dado.name}
                </a>
            </li>
          ))}
        </ul>
        
      </main>
    )
  }
