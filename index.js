const conexao = require('./src/app/infra/conexao.js');
const customExpress = require('./src/config/customExpress.js');
const Tabelas = require('./src/app/infra/tabelas.js');

conexao.connect(erro => {
    if(erro) {
        console.log(erro);
    }else {
        console.log('Conectado');
        Tabelas.init(conexao);

        const app = customExpress();
        app.listen(3000, () => console.log('rodando'));
    }
});