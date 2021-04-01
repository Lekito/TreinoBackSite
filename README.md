# TreinoBackSite
Repositório criado para base da API 

## Criar o arquivo package
npm init -y

## Instalar o express 
### O express gerencia as requisições, rotas e URLs, entre outra funcionalidades
npm install express

## Instalar nodemon
### nodemon é o módulo para reiniciar o servidor sempre que houver alteração no código fonte
npm install -D nodemon
npx nodemon src/server.js // iniciando o servidor com nodemon

## Instalar sucrase
#### O sucrase produz código JS válido - par import do ES6
#### Com o sucrase não precisamos mas usar o modo antigo do JS de importar.Exemplo: 
// modo antigo -> const express = require("express");
// modo novo -> import express from 'express';
npm install  -D sucrase

## Instalar o MongoDB 
npm install  --save mongodb

## Instalar o Mongoose 
// Mongoose - traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação. 
npm install --save mongoose

## Instalar o yup
#### Validar campo
npm install --save yup

## Instalar bcryptjs
#### Esse é um módulo para criptografar a senha.
npm install --save bcryptjs

## Instalar a dependencia para JWT
npm install --save jsonwebtoken

## Instalar o módulo para paginação com mongoose
npm install --save mongoose-paginate-v2

## Multer é middleware node.js para manipulação multipart/form-data, usado para o upload de arquivos.
npm install --save multer

## Cors permite acesso a API
npm install --save cors

// Obs.: --save serve para incluir no arquivo package.json