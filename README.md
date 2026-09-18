# 🛒 Fresh Stock

O **Fresh Stock** é uma aplicação web de gestão de estoque desenvolvida para um pequeno mercado, permitindo o controle de produtos organizados por categoria (Alimentos, Bebidas, Higiene e Limpeza). Este repositório contém o **frontend**, construído em Next.js e integrado a uma API REST desenvolvida em Spring Boot.

> Projeto acadêmico desenvolvido para a disciplina de Engenharia de Software (FAMETRO).

## 🚀 Funcionalidades

- **Listagem de Produtos:** Exibição de todos os produtos cadastrados, com nome, preço, quantidade em estoque e categoria.
- **Filtro por Categoria:** Consulta de produtos filtrando por Alimentos, Bebidas, Higiene ou Limpeza.
- **Cadastro de Produtos:** Formulário para adicionar novos itens ao estoque.
- **Edição de Produtos:** Atualização de dados de um produto já existente.
- **Exclusão de Produtos:** Remoção de itens do estoque.
- **Atualização Automática de Dados:** Revalidação e cache de requisições via SWR, mantendo a interface sincronizada com o backend.

## 🛠️ Tecnologias Utilizadas

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **SWR** (Data fetching e cache no client-side)

## 🔗 Projeto Relacionado

Este frontend consome a API REST disponível no repositório do backend: [fresh-stock-backend](#) *(link a ajustar quando o repositório for criado)*

Backend desenvolvido em **Java** com **Spring Boot**, **Spring Data JPA** e banco de dados **MySQL** rodando em **Docker**, com documentação de API via **Swagger**.