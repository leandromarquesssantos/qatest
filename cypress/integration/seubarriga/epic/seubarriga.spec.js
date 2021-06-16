import faker from 'faker';

const systemUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

describe('Eu cadastro um usuário, e faço login no sistema',
    () => {
        it('Eu cadastro o usuário', () => {
            cy.visit('/cadastro');
            cy.findByPlaceholderText('Nome')
                .type(systemUser.name);
            cy.findByPlaceholderText('Email')
                .type(systemUser.email);
            cy.findByPlaceholderText(/Password/i)
                .type(systemUser.password);
            cy.findByRole('button', { name: 'Cadastrar' })
                .click();
            cy.checkAlertMessage('Usuário inserido com sucesso');
        });
        it('Eu faço login', () => {
            cy.visit('/login');
            cy.findByPlaceholderText('Email')
                .type(systemUser.email);
            cy.findByPlaceholderText(/Password/i)
                .type(systemUser.password);
            cy.findByRole('button', { name: 'Entrar' })
                .click();
            cy.checkAlertMessage(`Bem vindo, ${systemUser.name}!`);
        });
    });
    
const accountOne = {
    name: faker.finance.accountName().concat('1'),
};
const accountToBeEdited = {
    name: faker.finance.accountName().concat('2'),
};
const accountEdited = {
    name: faker.finance.accountName().concat('3'),
};
const accountToBeRemoved = {
    name: faker.finance.accountName().concat('4'),
};

describe('Realizo cadastros das minhas contas',
    () => {
        beforeEach(() => {
            cy.visit('/login');
            cy.findByPlaceholderText('Email')
                .type(systemUser.email);
            cy.findByPlaceholderText(/Password/i)
                .type(systemUser.password);
            cy.findByRole('button', { name: 'Entrar' })
                .click();
        });

        it('Eu cadastro minhas contas', () => {
            cy.visit('/addConta');
            cy.findByLabelText('Nome')
                .type(accountOne.name);
            cy.findByRole('button', { name: 'Salvar' })
                .click();
            cy.checkAlertMessage('Conta adicionada com sucesso!');
            
            cy.visit('/addConta');
            cy.findByLabelText('Nome')
                .type(accountToBeEdited.name);
            cy.findByRole('button', { name: 'Salvar' })
                .click();
            cy.checkAlertMessage('Conta adicionada com sucesso!');
            
            cy.visit('/addConta');
            cy.findByLabelText('Nome')
                .type(accountToBeRemoved.name);
            cy.findByRole('button', { name: 'Salvar' })
                .click();
            cy.checkAlertMessage('Conta adicionada com sucesso!');
        });
        it('Vejo que as contas na lista', () => {
            cy.visit('/contas');
            cy.findByText(accountOne.name).should('be.visible');
            cy.findByText(accountToBeEdited.name).should('be.visible');
            cy.findByText(accountToBeRemoved.name).should('be.visible');
        });
        it('Eu edito uma conta', () => {
            cy.visit('/contas');
            cy.findByText(accountToBeEdited.name).should('be.visible');
            cy.findByText(accountToBeEdited.name)
                .parent()
                .find('.glyphicon-edit')
                .click();
            
            cy.findByLabelText('Nome')
                .clear()
                .type(accountEdited.name);
            cy.findByRole('button', { name: 'Salvar' })
                .click();
            cy.checkAlertMessage('Conta alterada com sucesso!');
            cy.findByText(accountToBeEdited.name).should('not.exist');
            cy.findByText(accountEdited.name).should('be.visible');
        });
        it('Eu removo uma conta', () => {
            cy.visit('/contas');
            cy.findByText(accountToBeRemoved.name).should('be.visible');
            cy.findByText(accountToBeRemoved.name)
                .parent()
                .find('.glyphicon-remove-circle')
                .click();
            
            cy.checkAlertMessage('Conta removida com sucesso!');
            cy.findByText(accountToBeRemoved.name).should('not.exist');
        });
    });

const receitaPendente = {
    tipo: 'Receita',
    dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
    dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
    descricao: faker.finance.transactionDescription(),
    interessado: faker.name.findName(),
    valor: faker.finance.amount(),
    conta: accountOne.name,
    situacao: 'Pendente',
};
const receitaPaga = {
    tipo: 'Receita',
    dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
    dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
    descricao: faker.finance.transactionDescription(),
    interessado: faker.name.findName(),
    valor: faker.finance.amount(),
    conta: accountOne.name,
    situacao: 'Pago',
};
const despesaPendente = {
    tipo: 'Despesa',
    dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
    dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
    descricao: faker.finance.transactionDescription(),
    interessado: faker.name.findName(),
    valor: faker.finance.amount(),
    conta: accountOne.name,
    situacao: 'Pendente',
};
const despesaPaga = {
    tipo: 'Despesa',
    dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
    dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
    descricao: faker.finance.transactionDescription(),
    interessado: faker.name.findName(),
    valor: faker.finance.amount(),
    conta: accountOne.name,
    situacao: 'Pago',
};

describe('Eu realizo movimentações, para não esquecer de pagar o aluguel ao Seu Barriga',
    () => {
        beforeEach(() => {
            cy.visit('/login');
            cy.findByPlaceholderText('Email')
                .type(systemUser.email);
            cy.findByPlaceholderText(/Password/i)
                .type(systemUser.password);
            cy.findByRole('button', { name: 'Entrar' })
                .click();
        });
        it('Eu cadastro uma receita pendente', () => {
            cy.visit('/movimentacao');
            cy.findByLabelText('Tipo da Movimentação').select(receitaPendente.tipo);
            cy.findByLabelText('Data da Movimentação').type(receitaPendente.dataMovimentacao);
            cy.findByLabelText('Data do Pagamento').type(receitaPendente.dataPagamento);
            cy.findByLabelText('Descrição').type(receitaPendente.descricao);
            cy.findByLabelText('Interessado').type(receitaPendente.interessado);
            cy.findByLabelText('Valor').type(receitaPendente.valor);
            cy.findByLabelText('Conta').select(receitaPendente.conta);
            cy.findByLabelText(receitaPendente.situacao).check();
            cy.findByRole('button', { name: 'Salvar' }).click();
            cy.checkAlertMessage('Movimentação adicionada com sucesso!');
        });
        it('Eu cadastro uma receita paga', () => {
            cy.visit('/movimentacao');
            cy.findByLabelText('Tipo da Movimentação').select(receitaPaga.tipo);
            cy.findByLabelText('Data da Movimentação').type(receitaPaga.dataMovimentacao);
            cy.findByLabelText('Data do Pagamento').type(receitaPaga.dataPagamento);
            cy.findByLabelText('Descrição').type(receitaPaga.descricao);
            cy.findByLabelText('Interessado').type(receitaPaga.interessado);
            cy.findByLabelText('Valor').type(receitaPaga.valor);
            cy.findByLabelText('Conta').select(receitaPaga.conta);
            cy.findByLabelText(receitaPaga.situacao).check();
            cy.findByRole('button', { name: 'Salvar' }).click();
            cy.checkAlertMessage('Movimentação adicionada com sucesso!');
        });
        it('Eu cadastro uma despesa pendente', () => {
            cy.visit('/movimentacao');
            cy.findByLabelText('Tipo da Movimentação').select(despesaPendente.tipo);
            cy.findByLabelText('Data da Movimentação').type(despesaPendente.dataMovimentacao);
            cy.findByLabelText('Data do Pagamento').type(despesaPendente.dataPagamento);
            cy.findByLabelText('Descrição').type(despesaPendente.descricao);
            cy.findByLabelText('Interessado').type(despesaPendente.interessado);
            cy.findByLabelText('Valor').type(despesaPendente.valor);
            cy.findByLabelText('Conta').select(despesaPendente.conta);
            cy.findByLabelText(despesaPendente.situacao).check();
            cy.findByRole('button', { name: 'Salvar' }).click();
            cy.checkAlertMessage('Movimentação adicionada com sucesso!');
        });
        it('Eu cadastro uma despesa paga', () => {
            cy.visit('/movimentacao');
            cy.findByLabelText('Tipo da Movimentação').select(despesaPaga.tipo);
            cy.findByLabelText('Data da Movimentação').type(despesaPaga.dataMovimentacao);
            cy.findByLabelText('Data do Pagamento').type(despesaPaga.dataPagamento);
            cy.findByLabelText('Descrição').type(despesaPaga.descricao);
            cy.findByLabelText('Interessado').type(despesaPaga.interessado);
            cy.findByLabelText('Valor').type(despesaPaga.valor);
            cy.findByLabelText('Conta').select(despesaPaga.conta);
            cy.findByLabelText(despesaPaga.situacao).check();
            cy.findByRole('button', { name: 'Salvar' }).click();
            cy.checkAlertMessage('Movimentação adicionada com sucesso!');
        });
    });
describe('Eu vejo as movimentações realizadas no extrato e o saldo da conta',
    () => {
        beforeEach(() => {
            cy.visit('/login');
            cy.findByPlaceholderText('Email')
                .type(systemUser.email);
            cy.findByPlaceholderText(/Password/i)
                .type(systemUser.password);
            cy.findByRole('button', { name: 'Entrar' })
                .click();
        });
        it('Eu vejo as movimentações no extrato', () => {
            cy.visit('/extrato');
            cy.findByText(receitaPendente.descricao).should('be.visible')
                .parent()
                .findByText(receitaPendente.dataPagamento)
                .parent()
                .findByText(receitaPendente.conta)
                .parent()
                .findByText(parseFloat(receitaPendente.valor).toFixed(2))
                .parent()
                .findByText(receitaPendente.situacao);
            cy.findByText(receitaPaga.descricao).should('be.visible')
                .parent()
                .findByText(receitaPaga.dataPagamento)
                .parent()
                .findByText(receitaPaga.conta)
                .parent()
                .findByText(parseFloat(receitaPaga.valor).toFixed(2))
                .parent()
                .findByText(receitaPaga.situacao);
            cy.findByText(despesaPendente.descricao).should('be.visible')
                .parent()
                .findByText(despesaPendente.dataPagamento)
                .parent()
                .findByText(despesaPendente.conta)
                .parent()
                .findByText(parseFloat(despesaPendente.valor*-1).toFixed(2))
                .parent()
                .findByText(despesaPendente.situacao);
            cy.findByText(despesaPaga.descricao).should('be.visible')
                .parent()
                .findByText(despesaPaga.dataPagamento)
                .parent()
                .findByText(despesaPaga.conta)
                .parent()
                .findByText(parseFloat(despesaPaga.valor*-1).toFixed(2))
                .parent()
                .findByText(despesaPaga.situacao);
        });
        it('Eu vejo na home o saldo da conta principal', () => {
            cy.visit('/');
            const saldoConta = parseFloat(parseFloat(receitaPaga.valor).toFixed(2)-parseFloat((despesaPaga.valor)).toFixed(2)).toFixed(2);
            cy.log(saldoConta, '=', receitaPaga.valor, '-', despesaPaga.valor);
            cy.findByText(accountOne.name).should('be.visible')
                .parent()
                .findByText(saldoConta).should('be.visible');
        });
    });
