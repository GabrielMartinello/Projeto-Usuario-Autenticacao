const conexao = require('../infra/conexao.js')
const query = require('../infra/query.js')
class EnderecoDao {
    salvarEndereco(endereco) {
        const sql = `INSERT INTO ENDERECO(ID, IDCLIENTE, TIPOENDERECO, RUA, BAIRRO, CEP, CIDADE, UF, NUMERO)
        VALUES(${conexao.escape(endereco.id)}, ${conexao.escape(endereco.idCliente)}, ${conexao.escape(endereco.tipoEndereco)},
        ${conexao.escape(endereco.rua)}, ${conexao.escape(endereco.bairro)}, ${conexao.escape(endereco.cep)}, ${conexao.escape(endereco.cidade)},
        ${conexao.escape(endereco.uf)}, ${conexao.escape(endereco.numero)}) AS T
        ON DUPLICATE KEY UPDATE
        IDCLIENTE = T.IDCLIENTE,
        TIPOENDERECO = T.TIPOENDERECO,
        RUA = T.RUA,
        BAIRRO = T.BAIRRO,
        CEP = T.CEP,
        CIDADE = T.CIDADE,
        UF = T.UF,
        NUMERO = T.NUMERO`
        return query(sql, endereco);
    }

    getEnderecoById(idCliente, getResult) { 
        const sql = `SELECT E.ID AS id,
                E.IDCLIENTE AS idCliente,
                E.TIPOENDERECO AS tipoEndereco,
                E.RUA AS rua,
                E.BAIRRO AS bairro,
                E.CEP AS cep,
                E.CIDADE AS cidade,
                E.UF AS uf,
                E.NUMERO AS numero 
          FROM ENDERECO E 
          WHERE E.IDCLIENTE = ${idCliente}`
        conexao.query(sql, (erro, resultados) => {
            getResult(erro, resultados);
        });
    }

    remover( id ) {
        const sql = `DELETE FROM ENDERECO WHERE ID = ${id}`
        return query( sql )
    }

    removerPorCliente(idCliente ) {
        const sql = `DELETE FROM ENDERECO WHERE IDCLIENTE = ${idCliente}`
        return query( sql )
    }   
}

module.exports = new EnderecoDao();