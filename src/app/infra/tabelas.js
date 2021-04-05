class Tabelas {
    init(connection) {
        this.connection = connection;
        this.criarusuario();
        this.criarCliente();
        this.criarEndereco();
    }

    criarusuario() {
        const sql = `
        CREATE TABLE IF NOT EXISTS  USUARIO (
            IDUSUARIO VARCHAR(50) NOT NULL PRIMARY KEY,
            NOME VARCHAR(150),
            SENHA VARCHAR(300));
            `

        this.connection.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }else {
                console.log('Tabela Usuario criada com sucesso!');
            }
        });
    }

    criarCliente() {
        const sql = `
        CREATE TABLE IF NOT EXISTS  CLIENTE (
            ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
            NOME VARCHAR(150),
            CNPJF VARCHAR(14),
            TELEFONE VARCHAR(14),
            TIPOPESSOA VARCHAR(1));        
        `

        this.connection.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }else {
                console.log('Tabela Clientes criada com sucesso');
            }
        });
    }

    criarEndereco() {
        const sql = `
        CREATE TABLE IF NOT EXISTS  ENDERECO (
            ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
            IDCLIENTE INTEGER NOT NULL,
            TIPOENDERECO VARCHAR(1) NOT NULL,
            RUA VARCHAR(150),
            BAIRRO VARCHAR(150),
            CEP VARCHAR(8),
            CIDADE VARCHAR(150) NOT NULL,
            UF VARCHAR(2) NOT NULL,
            NUMERO VARCHAR(20),
            CONSTRAINT FK_CLIENTE FOREIGN KEY (IDCLIENTE) REFERENCES CLIENTE(ID));
        `
        this.connection.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }else {
                console.log('Tabela Endereco criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;