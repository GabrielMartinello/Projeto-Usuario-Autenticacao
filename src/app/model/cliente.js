const dao = require('../dao/clientesDao.js');
const enderecoDao = require('../dao/enderecoDao.js')
const { connection } = require('../infra/tabelas.js');

class Cliente {
    constructor() {
        this.nomeEhValido = (tamanho) => {return tamanho >= 5 };
        this.cnpjEhValido = (tamanho) => {return tamanho === 14 || tamanho === 11};
        this.telefoneEhValido = (tamanho) => {return (tamanho >= 9) && (tamanho <= 11)}; 
        this.tipoPessoaEhValido = (tamanho) => {return tamanho === 1};   

        this.filtroValidacoes = [
            {
                fieldJson: 'nome',
                valido: this.nomeEhValido,
                mensagem: 'o nome do Cliente precisa ter mais de 5 caracteres!'
            },
            {
                fieldJson: 'cnpjf',
                valido: this.cnpjEhValido,
                mensagem: 'o CNPJ precisa ter um tamanho igual a 14 digitos!'
            },
            {
                fieldJson: 'telefone',
                valido: this.telefoneEhValido,
                mensagem: 'campo inválido'
            },
            {
                fieldJson: 'tipoPessoa',
                valido: this.tipoPessoaEhValido,
                mensagem: 'O tipo pessoa pode somente ter 1 caracter!'
            }
        ]

        this.valida = clienteJson => 
            this.filtroValidacoes.filter(validacao => {
                const {fieldJson} = validacao;     
                const nomeJson = clienteJson[fieldJson];
                if(!validacao.valido(String(nomeJson).length)) {
                    return validacao;
                }
            });
        
    }
  
    salvarCliente(cliente) {    
        const erros = this.valida(cliente);
        const errosValidacaoCampos = erros.length;

        if (errosValidacaoCampos) {
            return new Promise((reject, resolve) => reject(erros));
        } else {
            return dao.salvarCliente(cliente).then(resultado => {
                const id = resultado.id
                return { cliente, id }
            });
        }

    }

    buscarCliente(id, res) {
        dao.findClientById(id, (erro, resultados) => {
            
            if(erro) {
                res.status(400).json(erro)
            }else {
                const cliente = resultados[0]
                enderecoDao.getEnderecoById(id, (erro, resultados) => {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        cliente.endereco = resultados;
                        res.status(200).json(cliente);
                    }
                })
                
            }
        });
    }

    // editarCliente(id,valores, res) {
    //     dao.update(id, valores, (erro, resultados) => {
    //         if(erro) {
    //             res.status(400).json(erro)
    //         }else {
    //             res.status(200).json({valores, id})
    //         }
    //     });
    // }

    deletarCliente( idCliente ) {
        return dao.remove( idCliente )
    }
}

module.exports = new Cliente();