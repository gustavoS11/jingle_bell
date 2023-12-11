function Previsao (conexao){
    this._conexao = conexao
}
Previsao.prototype.cadastrar = function(idCidade,temperatura,umidade,sensacao,vento,condicao,data){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`insert into clima values (null,${idCidade},${temperatura},${umidade},${sensacao},${vento},'${condicao}',now()) `,function(error,result){
            console.log(error)
            resolve(result)
              
        })
    })
}

Previsao.prototype.mostrarGrafico = function(idCidade){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`select * from clima where id_cidade = ${idCidade}`,function(error,result){
            console.log(error)
            resolve(result)
        })
    })
}
module.exports = function(){
    return Previsao
}