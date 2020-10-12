// Servidor do projeto.

// TERMINAL $ npm start -> Inicia o servidor. 
// http://localhost:3000/

const express = require("express")

// Cria o servidor.
const server = express()

// Pega o Banco de Dados.
const db_empresas = require("./database/db.js")

// Configura pasta pública.
server.use(express.static("public"))

// Habilita o uso do request.body
server.use(express.urlencoded({extended: true}))

// Template Engine.
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {

    express: server,

    noCache: true

})

server.get("/", (request, answer) => {

    // Pega os dados do Banco de Dados.
    db_empresas.all(`SELECT * FROM empresas`, function(err, rows){

        if (err) {

            return console.log(err)

        }


        total = rows.length;
  
        // Exibir dados do Banco de Dados no HTML.
        return answer.render("index.html", {empresas: rows, total})

    })
    
})

server.get("/empresa-selecionada", (request, answer) => {

    return answer.render("empresa-selecionada.html")

})

server.get("/empresas", (request, answer) => {
    
     // Pega os dados do Banco de Dados.
    db_empresas.all(`SELECT * FROM empresas`, function(err, rows){

        if (err) {

            return console.log(err)

        }

        total = rows.length;

        // Exibir dados do Banco de Dados no HTML.
        return answer.render("empresas.html", {empresas: rows, total})

    })


})

server.get("/cadastro-empresas", (request, answer) => {

    return answer.render("cadastro-empresas.html")

})

server.get("/cadastro-investidores", (request, answer) => {

    return answer.render("cadastro-investidores.html")

})

// Página . 
server.get("/login-investidor", (request, answer) => {

    return answer.render("login-investidor.html")

})

// Página . 
server.get("/login-empresa", (request, answer) => {

    return answer.render("login-empresa.html")

})

server.get("/perfil-investidor", (request, answer) => {

    // Pega os dados do Banco de Dados.
    db_empresas.all(`SELECT * FROM empresas`, function(err, rows){

        if (err) {

            return console.log(err)

        }

        total = rows.length;

        // Exibir dados do Banco de Dados no HTML.
        return answer.render("perfil-investidor.html", {empresas: rows, total})

    })

})

server.get("/perfil-empresa", (request, answer) => {

    // Pega os dados do Banco de Dados.
    db_empresas.all(`SELECT * FROM investidores`, function(err, rows){

        if (err) {

            return console.log(err)

        }

        total = rows.length;

        // Exibir dados do Banco de Dados no HTML.
        return answer.render("perfil-empresa.html", {investidores: rows, total})

    })

})

server.post("/save-empresa", (request, answer) => {

     function afterInsertData(err) {

        if (err) {

            return answer.render("estado-cadastro.html", {notSaved: true})


        }

        return answer.render("estado-cadastro.html", {saved: true})

    }

    // Dados da tabela.
    const query = `
    
        INSERT INTO empresas (
            nome_empresa,
            localizacao,
            descricao,
            servicos,
            numero,
            email,
            url_empresa,
            nome_dono,
            url_dono,
            senha
            
        ) VALUES (?,?,?,?,?,?,?,?,?,?);
    `

    const values = [

        request.body.nome_empresa,
        request.body.localizacao,
        request.body.descricao,
        request.body.servicos,
        request.body.numero,
        request.body.email,
        request.body.url_empresa,
        request.body.nome_dono,
        request.body.url_dono,
        request.body.senha

    ]

    db_empresas.run(query, values, afterInsertData)

})

server.post("/save-investidor", (request, answer) => {

    function afterInsertData(err) {

        if (err) {

            return answer.render("estado-cadastro.html", {notSaved: true})


        }

        return answer.render("estado-cadastro.html", {saved: true})

    }

    // Dados da tabela.
    const query = `
    
        INSERT INTO investidores (
            nome,
            endereco,
            numero,
            email,
            url_perfil,
            senha

        ) VALUES (?,?,?,?,?,?);
    `

    const values = [

        request.body.nome,
        request.body.endereco,
        request.body.numero,
        request.body.email,
        request.body.url_perfil,
        request.body.senha
     
    ]

    db_empresas.run(query, values, afterInsertData)

})

// Liga o Servidor.
server.listen(3000) // Porta 3000.
