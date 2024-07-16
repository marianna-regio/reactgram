Estrutura base do projeto:

* Front-end: React, Redux(toolkit)
* Back-end: Node.js com express, banco dados MongoDB com Mongoose

* O app possui validações de autenticação e login.

* É possivel criar e editar um perfil, postar fotos, editar postagem, comentar e curtir e buscar publicações.

* Vamos começar pelo backend.

* Senha mongoadb: bd6RS0k1wibVKTLt

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


#### Setup
    1 - Criar configs e inicializar o app em _app.js_

    2 - Criar script para executar o projeto (nodemon), e executar a cada salvamento

#### Configurando o dotenv
 
* Em app.js chamamos o ```require("dotenv").config()```
* Cria o arquivo .env no mesmo nivel de app.js e declara as chaves e valores
* Voltando pra app.js acessa esse valor com ```process.env.<variavel>```

#### Conexão com o banco

* Criar usuário em https://www.mongodb.com/products/platform/atlas-database
* Copiar URL gerada, substituir dados pelas variaveis de ambiente
* Fazer uma chamada assincrona para essa URL, com o metodo connect do mongoose
```
./backend/config/db.js

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.rqtstec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('Conectou ao banco!')
  } catch (error) {
    console.log(error)
  }
};

```

### Criação dos models

* É como se fosse a collection do nosso banco
* Criamos dentro da pasta models, um schema e depois atribuimos o schema a esse model
* Temos no projeto User e Images

### Controller do usuario (autenticação)

* Quando usamos jwt(json web tokens) precisamos de um _secret_ para outras pessoas que usam jwt mao hackearem nosso sistema
* Definimos aqui o valor em ```.env: JWT_SECRET ``` e é usado na hora de criar e descriptografar o token;
* Usamos o jwt para criar uma função de gerar token, que recebe um id;
* Criamos a função de registrar o usuário, e atribuimos ela ao método post de uma rota, usando express em ```/routes/UserRoutes.js```

### Middleware - validações

* Vamos validar os dados da requisição com o validate do express
* Verificamos se os erros estão vazios com o metodo isEmpty do validate, se sim significa que não temos erro, entao prosseguimos;
* Caso haja erros, salvamos num array e retornamos com status e resposta de erro;
* Usamos essa validação nas rotas. 

### Validações de usuário (middleware)

* Criamos validações usando express-validator em ```/middlewares/userValidations.js```
* ```userCreateValidation()``` valida os campos com metodos do [validator.js](https://github.com/validatorjs/validator.js)
* Importamos a função em ```UserRoutes``` e passamos na declaração da rota _/register_ antes do middeware _validate_ (é importamente chamar a função ())
* _userCreateValidation()_ cria os erros, e _validate_ resgata e devolve. 

### Registro do usuário (controller)

* Voltando a função _register_ em ```/controllers/UserController.js``` extraimos os campos que iremos validar da requisição ```req.body ```
* Verificamos se o email esta cadastrado em ```User``` (mongoDb) com o metodo: 

> const user = await User.findOne({email})

* Em seguida, geramos o hash para salvamento da senha no banco de dados. Nunca salvamos a senha do usuário, sempre um hash. 
* Fazemos isso usando o **bcrypt** gerando um salt(numero aleatório) e passando junto com a senha para o método **_hash_**
``` 
const salt = await bcript.genSalt()
const passwordHash = await bcript.hash(password, salt) 
```
* Feito isso criamos o usuário com o método do mongoDB ```User.create```
