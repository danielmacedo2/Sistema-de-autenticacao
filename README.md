# API Rest De Autenticação JWT construido em Node.js, Express, MongoDB Atlas
Sistema de autenticação utilizando JWT(JSON WEB TOKEN)

## Instalação

Instale o **nodemon** globalmente

```
npm install -g nodemon
```

Fazer o clone do repositório

```
git clone https://github.com/danielmacedo2/Sistema-de-autenticacao
```

Instalar os pacotes

```
npm install -y
```

Rodar o servidor

```
nodemon app.js
```

## Registrando usuário

Para criar um usuário, crie e utilize a rota http://localhost:4000/auth/register com método POST, utilizando no body da requisição name, email, password, confirmPassword (confirmação de senha).

```
{
    "name": "João",
    "emai": "joao@teste.com",
    "password": "joao123",
    "confirmPassword": "joao123"
}
```
## Autenticando usuário

Para autenticar usuário, crie e utilize a rota http://localhost:4000/auth/login com método POST, especificando email e password.
Após a autenticação será gerado um token, que pode ser utilizado para acessar a rota privada.

```
{
    "email": "joao@teste.com",
    "password": "joao123"
}
```
## Rota privada
Para acessar a rota privada, crie e utilize a rota http://localhost:4000/user/:id com método GET, passando o id do usuário em (:id) e utilizando o token de segurança para ter acesso aos dados do usuário.
