# Comunidade-Pergunta Frontend

A aplicação Comunidade-Pergunta tem como objetivo facilitar a comunicação entre o presidente da associação de moradores e os moradores da comunidade.
Através da criação de salas virtuais, o presidente (admin) pode criar um espaço onde os moradores podem fazer perguntas e obter respostas de maneira
organizada e eficiente.

Este é o frontend do projeto **Comunidade-Pergunta**, construído com React, TypeScript e Firebase.

## Sumário

- [Comunidade-Pergunta Frontend](#comunidade-pergunta-frontend)
  - [Sumário](#sumário)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Regras de Autenticação com Firebase](#regras-de-autenticação-com-firebase)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/en/download/) (recomendado a versão LTS)
- [npm](https://www.npmjs.com/get-npm)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/Luciahelenasantos/Comunidade-Pergunta.git
   cd Comunidade-Pergunta

2. Instale as dependências:

   ```sh
   npm install

3. Para iniciar o projeto localmente, execute:
  
  ```sh
   npm run dev
   

## Regras de Autenticação com Firebase

[x] Apenas usuários autenticados podem ler dados de salas e perguntas

[x] Apenas usuários autenticados podem criar novas salas

[x] Apenas usuários autenticados podem enviar novas perguntas

[x] Apenas usuários autenticados podem curtir uma pergunta

[x] O usuário pode remover uma curtida de pergunta se for o proprietário

[x] Usuários não podem atualizar ou excluir perguntas se não forem proprietários da sala

[x] Apenas o proprietário da sala pode atualizar o destaque e os dados de respondido de uma pergunta

[x] Apenas o proprietário da sala pode fechar a sala

[ ] Não permitir curtidas duplicadas do mesmo autor

[ ] Não permitir que o usuário curta as próprias perguntas
