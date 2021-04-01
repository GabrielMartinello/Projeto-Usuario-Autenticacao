class Tabelas {
    init(connection) {
        this.connection = connection;
        this.criarusuario();
    }

    criarusuario() {
        const sql = `
        CREATE TABLE IF NOT EXISTS USUARIO(ID INT NOT NULL AUTO_INCREMENT,
            NOME VARCHAR(255) NOT NULL,
            CPF VARCHAR(11) NOT NULL,
            EMAIL VARCHAR(100) NOT NULL,
            EMPRESA VARCHAR(255),    
            PRIMARY KEY (ID));
        `
        this.connection.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }else {
                console.log('Tabela Usuario criada com sucesso!');
            }
        });
    }
}

module.exports = new Tabelas;