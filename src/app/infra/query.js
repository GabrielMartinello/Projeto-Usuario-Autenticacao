const conexao = require('./conexao.js');
//para casos de parametros que nao tenham valor
//colocamos os parametros como '' para casos
//o valor default do parametro é uma string vaiza
//para evitar problemas mais pra frente
const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (erros, resultados, campos) => {     
            if(erros) {
                reject(erros);
            }else {
                resolve(resultados);
            }
        });
    });
}

module.exports = executaQuery;