{
  "name": "library",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "set DEBUG= app & node app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "0.18.0",
    "body-parser": "1.18.3", //utilizado em post, inclui objetos serverside dentro de um objeto res.body
    "bootstrap": "4.1.3", //framework css
    "chalk": "2.4.1", //deixa o terminal colorido
    "cookie-parser": "1.4.3", //utilizado em conjunto do passport pra guardar o usuário logado.
    "debug": "4.1.0", //adiciona mensagens de debug
    "ejs": "2.6.1", //como se fosse o asp/php do node, para interagir objetos server no html.
    "express": "^4.16.2", //servidor web para node
    "express-session": "1.15.6", //utilizado em conjunto com passport para guardar usuario logado.
    "jquery": "3.3.1", //framework js
    "mongodb": "3.1.10", //drive banco nosql
    "morgan": "1.9.1", //intercepta e loga chamadas http.
    "mssql": "4.2.3", //drive banco sql
    "nodemon": "1.18.6" //reinicia a aplicação automaticamente de acordo com os parametros
    "passport": "0.4.0", //realiza a autenticação de usuário
    "passport-local": "1.0.0", //tipo de autenticação como local, poderia ser facebook, microsoft, gooogle.
    "popper.js": "^1.14.3", //componente js de página, devido a dependencia do template bootstrapzero
    "pug": "2.0.3", //concorrente do ejs, para incluir objetos no html
    "xml2js": "0.4.19"
  },
  "devDependencies": {
    "eslint": "5.9.0", /*verifica a qualidade do código com esse comando: [.\node_modules\.bin\eslint app.js] ou criar um script e iniciar com [npm run lint]*/
    "eslint-config-airbnb-base": "13.1.0",
    "eslint-plugin-import": "2.14.0"
  }
}
