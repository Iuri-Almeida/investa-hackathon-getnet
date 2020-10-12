// Javascript responsável pela criação do Bando de Dados do registro das empresas.

// Importa a dependência do SQLite 3.
const sqlite3 = require("sqlite3").verbose()

// Cria um objeto do Bando de Dados.
const db_micro_empresa = new sqlite3.Database("./src/database/micro-empresas.db")

module.exports = db_micro_empresa

db_micro_empresa.serialize(() => {

    // Cria uma tabela, caso ela ainda exista. 
    db_micro_empresa.run(`
        CREATE TABLE IF NOT EXISTS empresas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_empresa TEXT,
            localizacao TEXT,
            descricao TEXT,
            servicos TEXT,
            numero TEXT,
            email TEXT,
            url_empresa TEXT,
            nome_dono TEXT,
            url_dono TEXT,
            senha TEXT
                        
        );
    `)

    // Cria uma tabela, caso ela ainda exista. 
    db_micro_empresa.run(`
    CREATE TABLE IF NOT EXISTS investidores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        endereco TEXT,
        numero TEXT,
        email TEXT,
        url_perfil TEXT,
        senha TEXT
        
    );
`)

})