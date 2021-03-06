const Usuario = require('../model/usuarios.js')

module.exports = app => {
     app.post('/usuarios/add', (req,res) => {
        const usuario = req.body;
        Usuario.salvarUsuario(usuario).then(usuarioCadastrado => {
            res.status(201).json(usuarioCadastrado);
        }).catch(erros => {
            res.status(400).json(erros)
        });
     });

     app.get('/usuarios/:idUsuario',(req, res) => {
         const idUsuario = req.params.idUsuario;
         Usuario.buscarUsuario(idUsuario, res);
     });

     app.put('/usuarios/upd',(req, res) => {
        const usuario = req.body;
        console.log(usuario);
        Usuario.salvarUsuario(usuario).then(usuarioCadastrado => {
            res.status(201).json(usuarioCadastrado);
        }).catch(erros => {
            res.status(400).json(erros)
        });
     });
     
     app.delete('/usuarios/:idUsuario', (req,res) => {
         const idUsuario = req.params.idUsuario;
         Usuario.delete(idUsuario, res);
     });

     app.post('/usuarios/login', (req, res) => {
        const usuario = req.body; 
        Usuario.autenticarUsuario( usuario ).then( resultado => {
            res.status(201).json(resultado);
        }).catch( erro => {
            res.status(400).json(erro)
        });
     });
}