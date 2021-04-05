const query = require('../infra/query.js');
const conexao = require('../infra/conexao.js')

class UsuariosDao {
    //aprendi isso com o Gabriel Leite;
    salvarUsuario(usuarios) {
        const sql = `INSERT INTO USUARIO(IDUSUARIO, NOME, SENHA) VALUES(${conexao.escape(usuarios.idUsuario)}, 
        ${conexao.escape(usuarios.nome)}, ${conexao.escape(usuarios.senha)}) AS T
        ON DUPLICATE KEY UPDATE
        IDUSUARIO = T.IDUSUARIO,
        NOME = T.NOME,
        SENHA = T.SENHA`
        return query(sql, usuarios);    
    }

    findUserById(id, getResult) {
        const sql = `SELECT 
            U.IDUSUARIO AS idUsuario,
            U.NOME AS nome,
            U.SENHA AS senha 
        FROM USUARIO U 
        WHERE U.IDUSUARIO = ${id}`;
        conexao.query(sql, (erro, resultados) => {            
            getResult(erro, resultados);
        });
    }

    // alterarUsuario(id, valores,getResult) {
    //     const sql = `UPDATE USUARIO SET NOME = ${conexao.escape(valores.NOME)}, 
    //     SENHA = ${conexao.escape(valores.SENHA)}  WHERE IDUSUARIO = ${id}`
        
    //     ;
    //     conexao.query(sql, (erro, resultados) => {
    //         console.log(sql);
    //       getResult(erro, resultados)
    //     });
    // }

    deletarUsuario(id, getResult) {
        const sql = `DELETE FROM USUARIO WHERE IDUSUARIO = ${conexao.escape(id)}`;
        conexao.query(sql, id, (erro, resultados) => {
            getResult(erro,resultados);
        });
    }   
}

module.exports = new UsuariosDao()