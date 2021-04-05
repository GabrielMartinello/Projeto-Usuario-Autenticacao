const { adicionarCliente } = require('../model/cliente.js');
const Cliente = require('../model/cliente.js');

module.exports = app => {
    //ROTAS CLIENTE;
    app.post('/clientes/add', (req, res) => {
        const cliente = req.body;
        Cliente.salvarCliente(cliente).then(clienteCadastrado => {
            res.status(201).json(clienteCadastrado);
        }).catch(erros => {
            res.status(400).json(erros);
        });
    });


    app.get('/clientes/:id', (req, res) => {
        const id = req.params.id
        Cliente.buscarCliente(id, res);
    });

    app.put('/clientes/upd', (req, res) => {
        const cliente = req.body
        Cliente.salvarCliente(cliente).then(clienteCadastrado => {
            res.status(201).json(clienteCadastrado);
        }).catch(erros => {
            res.status(400).json(erros);
        });
    });

    app.delete('/clientes/:id', (req, res) => {
        const id = req.params.id;
        Cliente.deletarCliente(id).then( () => {
            res.status(201).json('Ok');
        }).catch(erros => {
            res.status(400).json(erros);
        })
    })
}