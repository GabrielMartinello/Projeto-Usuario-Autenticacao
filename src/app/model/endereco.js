const dao = require('../dao/enderecoDao.js');

class Endereco {
    constructor() {
        this.tipoEnderecoEhValido = (tamanho) => {return tamanho === 1};
        this.ruaEhValida = (tamanho) => {return tamanho >= 5};
        this.bairroEhValido = (tamanho) => {return tamanho >= 5};
        this.cepEhValido = (tamanho) => {return tamanho === 8};
        this.cidadeEhValida = (tamanho) => {return tamanho >= 5};
        this.ufEhValida = (tamanho) => {return tamanho == 2};
        this.numeroEhValido = (tamanho => {return tamanho >= 3});

        this.filtroValidacoes = [
            {
                fieldJson: 'tipoEndereco',
                valido: this.tipoEnderecoEhValido,
                mensagem: 'O campo Tipo de Endereco está inválido!'
            },
            {
                fieldJson: 'rua',
                valido: this.ruaEhValida,
                mensagem: 'O campo Rua está inválida!'
            },
            {
                fieldJson: 'bairro',
                valido: this.bairroEhValido,
                mensagem: 'O campo Bairro está inválido!'
            },
            {
                fieldJson: 'cep',
                valido: this.cepEhValido,
                mensagem: 'O campo CEP está inválido!'
            },
            {
                fieldJson: 'cidade',
                valido: this.cidadeEhValida,
                mensagem: 'O campo Cidade está inválido!'
            },
            {
                fieldJson: 'uf',
                valido: this.ufEhValida,
                mensagem: 'O campo UF está inválido!'
            },
            {
                fieldJson: 'numero',
                valido: this.numeroEhValido,
                mensagem: 'O campo Numero está inválido!'
            }
        ]

        this.valida = enderecoJson => 
        this.filtroValidacoes.filter(validacao => {
            const {fieldJson} = validacao;
            const nomeJson = enderecoJson[fieldJson];
            if(!validacao.valido(String(nomeJson).length)) {
                return validacao;
            };
        });
    }

    salvarEndereco(endereco) {
        const erros = this.valida(endereco);
        const existemErros = erros.length;

        if(existemErros) {
            return new Promise((reject, resolve) => reject(erros))
        }else {
            return dao.salvarEndereco(endereco).then(resultado => {
                const id = resultado.id;
                return {endereco, id};
            });
        }
    }

    buscar(id, res) {
        console.log(res);
           // return dao.getEnderecoById(idCliente, res).then(resultado => {
        //     console.log(res);
        //     console.log('asdfasdfasdfasdf', resultado);
        // });
        dao.getEnderecoById(id, (erro, resultados) => {
            console.log(res);
            console.log('sdasdsadsa ', resultados);
            if(erro) {
                res.status(400).json(erro)
            }else {
                const endereco = resultados[0]
                res.status(200).json(endereco);
            }
        });
    }

    removerEndereco(id, res) {
        dao.remover(id, (erro, resultados) => {
            if(erro) {
                res.status(404).json(erro)
            }else {
                res.status(200).json({id});
            }
        })
    }

    removerEnderecoPorCliente(idCliente, res) {
        dao.removerPorCliente(idCliente, (erro, resultados) => {
            if(erro) {
                res.status(404).json(erro)
            }else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Endereco();