# TopStream

### Link para o Deploy: [https://topstream-site.onrender.com](https://www.google.com/url?sa=E&source=gmail&q=https://topstream-site.onrender.com)

## 📖 Sobre o Projeto

TopStream é uma aplicação web completa e robusta, projetada para ser a sua central de entretenimento. A plataforma permite que os usuários descubram, pesquisem e salvem seus filmes, séries e animes favoritos de forma intuitiva e eficiente. Com uma interface moderna e responsiva, o projeto utiliza um backend poderoso para agregar dados de múltiplas fontes e um assistente com IA para recomendações personalizadas.

O grande diferencial é a capacidade de encontrar conteúdo mesmo quando o usuário não sabe o nome, bastando descrever uma cena, um ator ou uma característica marcante.

-----

## ✨ Funcionalidades Principais

  * **Navegação Unificada**: Explore catálogos de filmes, séries e animes em um só lugar.
  * **Busca Avançada**: Pesquise por título ou navegue por dezenas de categorias e gêneros pré-definidos.
  * **Assistente com IA**: Não lembra o nome do filme? Descreva o que você lembra ("aquele filme com o cara que fala 'eu voltarei'") e nossa IA encontrará para você.
  * **Detalhes Completos**: Acesse informações detalhadas como sinopse, ano de lançamento, avaliação e gênero de cada título.
  * **Lista de Favoritos**: Salve seus títulos preferidos em uma lista pessoal para assistir mais tarde.
  * **Interface Responsiva**: Experiência de uso otimizada para desktops, tablets e smartphones.
  * **Cache Inteligente**: O backend utiliza um sistema de cache para entregar os dados mais populares de forma rápida e eficiente, diminuindo o tempo de carregamento.

-----

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com tecnologias modernas, separando as responsabilidades entre o frontend (interface do usuário) e o backend (servidor e lógica de negócios).

### Frontend (Interface-TopStream)

  * **Framework**: [React.js](https://react.dev/) (v19)
  * **Roteamento**: [React Router DOM](https://reactrouter.com/) (v7) para navegação entre páginas (SPA).
  * **Estilização**: [Tailwind CSS](https://tailwindcss.com/) para uma estilização moderna e responsiva.
  * **Requisições HTTP**: [Axios](https://axios-http.com/) para se comunicar de forma assíncrona com o backend.
  * **Build Tool**: [Vite](https://vitejs.dev/) para um desenvolvimento rápido e otimizado.

### Backend (API)

  * **Framework**: [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/) para criar a API REST.
  * **Variáveis de Ambiente**: [Dotenv](https://www.npmjs.com/package/dotenv) para gerenciar chaves de API e configurações de ambiente de forma segura.
  * **CORS**: Middleware [CORS](https://www.npmjs.com/package/cors) para permitir a comunicação segura entre o frontend e o backend.
  * **Comunicação com APIs Externas**: [Axios](https://axios-http.com/) para consumir os dados das APIs de terceiros.

### APIs Externas e Serviços

  * **[The Movie Database (TMDB)](https://www.themoviedb.org/)**: Fonte de dados principal para filmes e séries, incluindo populares, gêneros e detalhes.
  * **[AniList](https://anilist.co/)**: Fonte de dados para o catálogo de animes, utilizando sua API GraphQL.
  * **[OpenRouter](https://openrouter.ai/)**: Serviço que fornece o modelo de IA (`deepseek/deepseek-r1:free`) para a funcionalidade do assistente de busca inteligente.
  * **[Google Translate API (não oficial)](https://translate.google.com/)**: Utilizada para traduzir sinopses de animes para português de forma automática.

-----

## 🚀 Como Executar o Projeto Localmente

Para rodar o projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos

  * [Node.js](https://nodejs.org/en) (versão 18 ou superior)
  * [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### 1\. Clonar o Repositório

```bash
git clone https://github.com/Rafaasj07/TopStream.git
cd TopStream
```

### 2\. Configurar o Backend

1.  Navegue até a pasta da API:
    ```bash
    cd API
    ```
2.  Crie um arquivo `.env` e adicione suas chaves de API:
    ```env
    TMDB_API_KEY=SUA_CHAVE_TMDB_AQUI
    OPENROUTER_API_KEY=SUA_CHAVE_OPENROUTER_AQUI
    FRONTEND_URL=http://localhost:5173
    ```
3.  Instale as dependências e inicie o servidor:
    ```bash
    npm install
    npm run dev
    ```
    O backend estará rodando em `http://localhost:3001`.

### 3\. Configurar o Frontend

1.  Abra um novo terminal e navegue até a pasta da interface:
    ```bash
    cd Interface-TopStream
    ```
2.  Crie um arquivo `.env` na raiz da pasta e configure a URL da API:
    ```env
    VITE_API_URL=http://localhost:3001/api/
    ```
3.  Instale as dependências e inicie a aplicação:
    ```bash
    npm install
    npm run dev
    ```
    O frontend estará acessível em `http://localhost:5173`.

-----

Agradeço por conferir o projeto\!
