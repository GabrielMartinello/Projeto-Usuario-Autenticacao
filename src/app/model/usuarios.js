const conexao = require('../infra/conexao.js');
const dao = require('../dao/usuariosDao.js');
const { findUserById } = require('../dao/usuariosDao.js');

class Usuario {
    constructor() {
        this.nomeEhValido = (tamanho) => {return tamanho >= 5};
        this.senhaEhValida = (tamanho) => {return tamanho >= 5};

        this.filtroValidacoes = [
            {
                fieldJson: 'nome',
                valido: this.nomeEhValido,
                mensagem: 'o usuario precisa de mais de 5 caracteres!'
            },

            {
                fieldJson: 'senha',
                valido: this.senhaEhValida,
                mensagem: 'senha precisa ter mais de 5 caracteres!'
            }
        ]

        //parametros
        this.valida = usuarioJson =>
            this.filtroValidacoes.filter(validacao => {
                //Pega o atributo nome dentro do objeto validacao
                const { fieldJson } = validacao
                const nomeJson = usuarioJson[fieldJson];      
                //Convertido tipo any do json para uma string pra poder usar a funcao lenght  
                if (!validacao.valido(String(nomeJson).length)) {
                   return validacao;
                }
            });
    }

    salvarUsuario(usuario) {    
        const erros = this.valida(usuario);
        const existemErros = erros.length;

        if (existemErros) {
            return new Promise((reject, resolve) => reject(erros));
        } else {
            return dao.salvarUsuario(usuario).then(resultados => {
                const id = resultados.insertId
                return { usuario, id }
            });
        }
    }

    buscarUsuario(id, res) {    
        dao.findUserById(id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }else {
                console.log(resultados[0])            
                const usuario = resultados[0];
                
                res.status(200).json(usuario);
            }
        });
    }

    delete(id, res) {
        dao.deletarUsuario(id,(erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else {
                res.status(200).json({id});
            }
        });
    }

    autenticarUsuario( usuario ) {
        

        return new Promise( (reject, resolve) => {
            dao.findUserById(usuario.idUsuario).then( resultado => {
                const usuarioLocal = resultado[0];
                if (!usuarioLocal) {
                    reject( 'Usuário inválido' )
                }
                else if (usuarioLocal.senha === usuario.senha) {
                    resolve('Autenticado!')
                } else {
                    reject( 'Senha inválida' )
                }
            }).catch( err => {
                reject( err )
            })
        })
    }
}
module.exports = new Usuario()  