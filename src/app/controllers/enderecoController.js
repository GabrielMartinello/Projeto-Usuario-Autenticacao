const Endereco = require('../model/endereco.js')

module.exports = app => {
    app.post('/endereco/add', (req, res) => {
        const endereco = req.body;
        Endereco.salvarEndereco(endereco).then(resultados => {
            res.status(201).json(resultados)
        }).catch(erros => {
            res.status(400).json(erros);
        });
    });

    app.put('/endereco/upd', (req,res) => {
        const endereco = req.body;
        Endereco.salvarEndereco(endereco).then(resultados => {
            res.status(201).json(resultados)
        }).catch(erros => {
            res.status(400).json(erros);
        });
    });

    app.get('/endereco/:id', (req,res) => {
        const id = req.params.id;
        Endereco.buscar(id, res);
    });

    app.delete('/endereco/:id', (req,res) => {
        const id = req.params.id;
        Endereco.removerEndereco(id, res)
    });
}