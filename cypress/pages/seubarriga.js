/** 
 * 
 * @param { name } string to be used as the user name
 * @param { email } string to be used as the user email
 * @param { password } string to be used as the user password
*/
const createUser = ({ name, email, password }) => cy.request({
    method: 'POST',
    url: '/cadastrarUsuario',
    form: true,
    body: {
        nome: name,
        email: email,
        senha: password,
    },
});

const login = ({ email, password }) => cy.request({
    method: 'POST',
    url: '/logar',
    form: true,
    body: {
        email: email,
        senha: password,
    },
});

const createAccount = ({ name }) => cy.request({
    method: 'POST',
    url: '/salvarConta',
    form: true,
    body: {
        nome: name,
    },
});

const addAccountMoviment = ({
    tipo,
    dataMovimentacao,
    dataPagamento,
    descricao,
    interessado,
    valor,
    situacao,
    conta
}) => cy.request({
    method: 'POST',
    url: '/salvarMovimentacao',
    form: true,
    body: {
        tipo: tipo.id,
        data_transacao: dataMovimentacao,
        data_pagamento: dataPagamento,
        descricao,
        interessado,
        valor,
        conta,
        status: situacao.id,
    },
});


const movimentacao = {
    tipo: { 
        receita: {
            id: 'REC',
            name: 'Receita',
        },
        despesa: {
            id: 'DESP',
            name: 'Despesa',
        },
    },
    situacao: {
        pendente: {
            id: 0,
            name: 'Pendente',
        },
        pago: {
            id: 1,
            name: 'Pago',
        },
    },
};

const conferirMovimentacaoCadastrada = (movimentacao) => {
    cy.visit('/extrato');
    if(movimentacao.tipo.id === 'DESP') {
        cy.findByText(movimentacao.descricao).should('be.visible')
            .parent()
            .findByText(movimentacao.dataPagamento)
            .parent()
            .findByText(movimentacao.conta)
            .parent()
            .findByText(parseFloat(movimentacao.valor*-1).toFixed(2))
            .parent()
            .findByText(movimentacao.situacao.name);
    } else {
        cy.findByText(movimentacao.descricao).should('be.visible')
            .parent()
            .findByText(movimentacao.dataPagamento)
            .parent()
            .findByText(movimentacao.conta)
            .parent()
            .findByText(parseFloat(movimentacao.valor).toFixed(2))
            .parent()
            .findByText(movimentacao.situacao.name);
    }
};

const monthInPortuguese = (index) => {
    const meses = ['Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];
    return meses[index-1];
};

export { login, createUser, createAccount, addAccountMoviment, conferirMovimentacaoCadastrada, monthInPortuguese, movimentacao };
