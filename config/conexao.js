const conexao = function(){
    const mysql = require('mysql')

        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'jingle_bell'
        })

    }

module.exports = conexao