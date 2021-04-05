const query = require('../infra/query.js');
const conexao = require('../infra/conexao');
const EnderecoDao = require('../dao/enderecoDao.js');

class ClientesDao {
    salvarCliente(cliente) {
        const enderecos = cliente.endereco;

        return new Promise((resolve, reject) => {
            conexao.beginTransaction(erro => {
                if (erro) {
                    reject(erro)
                } else {
                    const sql = `INSERT INTO CLIENTE (ID, NOME, CNPJF, TELEFONE, TIPOPESSOA) VALUES (${conexao.escape(cliente.id)},  ${conexao.escape(cliente.nome)}, 
                    ${conexao.escape(cliente.cnpjf)}, ${conexao.escape(cliente.telefone)}, ${conexao.escape(cliente.tipoPessoa)}) AS T
                    ON DUPLICATE KEY UPDATE
                    NOME = T.NOME,
                    CNPJF = T.CNPJF,
                    TELEFONE = T.TELEFONE,
                    TIPOPESSOA = T.TIPOPESSOA`;
                    const resultSql = query(sql, cliente);

                    resultSql.then( resultado => {
    
                        if (!cliente.id){
                            cliente.id = resultado.insertId
                        }
                        
                        enderecos.forEach( (endereco, index) => {
                            endereco.idCliente = cliente.id;                      
                            EnderecoDao.salvarEndereco(endereco).then( resultadoEnd => {
                                if (!endereco.id){
                                    endereco.id =  resultadoEnd.insertId
                                }
                                
                                if ((index + 1) === enderecos.length) {
                                    conexao.commit( err => {
                                        if (err) {
                                            conexao.rollback( () => {
                                                reject(err)
                                            })
                                        } else {
                                            resolve(cliente);
                                        }
                                    })
                                }
                            }).catch( err => {
                                conexao.rollback( () => {
                                    reject(err)  
                                })
                            })
                        })
                    }).catch( err => {
                        conexao.rollback( () => {
                            reject(err);
                        })
                    })
                }
            })
        })
    }

    findClientById(id, getResult) {
        const sql = `SELECT C.ID as id,
                            C.NOME AS nome,
                            C.CNPJF as cnpjf,
                            C.TELEFONE as telefone,
                            C.TIPOPESSOA as tipoPessoa
                       FROM CLIENTE C 
                      WHERE C.ID = ${id}`;
        conexao.query(sql, (erro, resultados) => {
            getResult(erro, resultados);
        }); 
    }

    remove (idCliente ) {
        return new Promise((resolve, reject) => {
            conexao.beginTransaction(erro => {
                if (erro){
                    reject(erro)
                } else {
                    EnderecoDao.removerPorCliente( idCliente ).then( () => {
                        const sql = `DELETE FROM CLIENTE WHERE ID = ${idCliente}`
                        const resultSql = query(sql)
                        resultSql.then( () => {
                            conexao.commit( err => {
                                if (err) {
                                    conexao.rollback( () => {
                                        reject(err)  
                                    })
                                } else {
                                    resolve( idCliente )
                                }
                            })
                        }).catch( err => {
                            conexao.rollback( () => {
                                reject(err)  
                            })
                        })
                    }).catch( err => {
                        conexao.rollback( () => {
                            reject(err)  
                        })
                    })
                }
            })
        })
    }
}

module.exports = new ClientesDao();