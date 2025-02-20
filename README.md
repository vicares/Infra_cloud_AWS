# Catálogo de Jogos API

## Descrição

Este é um projeto de API para um catálogo de jogos desenvolvido com **Node.js**, **PostgreSQL** e **Docker**. A aplicação permite o cadastro e login de usuários com diferentes papéis (Aluno ou Professor), além de funcionalidades para interação com jogos e comentários.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework para APIs REST
- **PostgreSQL** - Banco de dados relacional
- **Sequelize** - ORM para interação com o banco de dados
- **Docker** - Containerização da aplicação (3 containers: banco de dados, API e pgAdmin4)
- **JWT** - Autenticação segura de usuários
- **Bcrypt.js** - Criptografia de senhas
- **HTML** - Criação do front end
- **CSS** - Estilização do front end

## Estrutura do Banco de Dados

A API possui duas tabelas principais:

### **Tabela Users**

| Campo     | Tipo       | Descrição                          |
| --------- | ---------- | ---------------------------------- |
| id        | UUID (PK)  | Identificador único do usuário     |
| email     | STRING (U) | Email para login                   |
| password  | STRING     | Senha criptografada                |
| username  | STRING (U) | Nome de usuário exclusivo          |
| role      | ENUM       | Papel do usuário (Aluno/Professor) |
| createdAt | TIMESTAMP  | Data de criação                    |
| updatedAt | TIMESTAMP  | Data da última atualização         |

### **Tabela Comments**

| Campo    | Tipo      | Descrição                          |
| -------- | --------- | ---------------------------------- |
| id       | UUID (PK) | Identificador único do comentário  |
| message  | TEXT      | Conteúdo do comentário             |
| id\_user | UUID (FK) | ID do usuário que fez o comentário |

## Funcionalidades

### **Autenticação de Usuários**

- Criar conta (Registro)
- Login com JWT
- Armazenamento seguro de senhas

### **Gerenciamento de Usuários**

- Listar usuários cadastrados (Admin)
- Deletar usuários (Admin)

### **Sistema de Comentários**

- Criar comentários vinculados a um usuário
- Listar comentários com nome de usuário

## Instalação e Execução

### **1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/catalogo-jogos-api.git
cd catalogo-jogos-api
```

### **2. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```env
JWT_SECRET=sua_chave_secreta
```

### **3. Suba os containers com Docker**

```bash
docker-compose up -d
```

### **4. Acesse o terminal do container em execução**

```bash
docker exec -it catalogo_jogos_api /bin/sh
```

### **5. Execute as migrações**

```bash
npx sequelize-cli db:migrate
```

O servidor estará rodando em `http://localhost:3001`.

## Verificando o pgAdmin

### **1. Acesse no navegador**

```bash
http://localhost:5050
```
### **2. Coloque as informações de acesso**

**Login:** `admin@email.com`

**Senha:** `admin`

### **3. Adicionar Novo Servidor**

 1) Vá em Adicionar Novo Servidor
 2) De um nome para o servidor
 3) Vá em conexão e preencha da seguinte forma:
    ```bash
    Host: db
    Port: 5432
    Database: postgres
    Username: postgres
    Senha: postgres
    ```
 4) Salve as alterações
 
### **4. Visualização das tabelas**

Para ver as tabelas e informações do banco de dados siga os seguintes passos:

`Servers -> seu_banco_de_dados -> Bancos de dados -> catalogo_jogos -> Esquemas -> Tabelas -> botão direito na tabela desejada -> Visualizar/Editar dados -> Primeiras 100 linhas`
 
## Rotas da API

### **Usuários**

- `POST /register` - Cria um novo usuário
- `POST /index` - Autentica um usuário
- `GET /users` - Lista todos os usuários (Admin)
- `DELETE /users/:id` - Remove um usuário (Admin)

### **Comentários**

- `POST /comments` - Adiciona um comentário
- `GET /comments` - Lista todos os comentários

## Melhorias Futuras

- Aprimorar o front end para uma melhor estilização
- Implementar upload de imagem de perfil
- Melhorar a interface do usuário
- Criar sistema de likes nos comentários
- Adicionar jogos reais com links e informações
- Criar botão de logout

## Autor

Desenvolvido por [Victor Soares](https://github.com/vicares) 🚀
