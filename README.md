Estrutura base do projeto:

* Front-end: React, Redux(toolkit)
* Back-end: Node.js com express, banco dados MongoDB com Mongoose

* O app possui validações de autenticação e login.

* É possivel criar e editar um perfil, postar fotos, editar postagem, comentar e curtir e buscar publicações.

* Vamos começar pelo backend.

### Backend: 

* Pacotes: 

    * bcryptjs: manipular senhas
    * cors: receber requisições da mesma origem
    * dotenv: variaveis de ambiente
    * Express: framework backend para criar API's
    * Express-validator: Como se fosse um middleware, valida os dados entre as requisições, tirando um pouco a logica de validação dos controllers.
    * jsonwebtoken: gera e verifica tokens para o usuário
    * mongoose: ODM do banco de dados n~sao relacional (mongoDB)
    * multer: pacote para trabalhar com upload de imagens

    * nodemon (dependencia de desenvolvimento): simula o servidor localmente

1 - Criar configs e inicializar o app em _app.js_
2 - Criar script para executar o projeto (nodemon)
