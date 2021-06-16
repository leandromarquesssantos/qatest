import faker from 'faker';
import {
    createUser,
    login,
    createAccount,
    conferirMovimentacaoCadastrada,
    movimentacao
} from '../../../pages/seubarriga';

describe(`US4:
    Como usuário do sistema
    Gostaria de cadastrar movimentações na minha conta
    Para manter salvo o histórico de movimentações da minha conta`,
{ retries: 2 },
() => {

    const cadastrarMovimentacao = (movimentacao) => {
        cy.visit('/movimentacao');

        cy.findByLabelText('Tipo da Movimentação').select(movimentacao.tipo.name);
        cy.findByLabelText('Data da Movimentação').type(movimentacao.dataMovimentacao);
        cy.findByLabelText('Data do Pagamento').type(movimentacao.dataPagamento);
        cy.findByLabelText('Descrição').type(movimentacao.descricao);
        cy.findByLabelText('Interessado').type(movimentacao.interessado);
        cy.findByLabelText('Valor').type(movimentacao.valor);
        cy.findByLabelText('Conta').select(movimentacao.conta);
        cy.findByLabelText(movimentacao.situacao.name).check();
        cy.findByRole('button', { name: 'Salvar' }).click();

        cy.checkAlertMessage('Movimentação adicionada com sucesso!');
    };

    it(`Scenario 1:
    DADO 
        Que estou na pagina home
    QUANDO 
        Clico no botão criar movimentação
    ENTÃO 
        Devo ver a pagina de cadastro de movimentação`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const account = {
            name: faker.finance.accountName(),
        };

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name });

        cy.visit('/');

        cy.findByText('Criar Movimentação')
            .click();

        cy.findByText('Tipo da Movimentação').should('be.visible');
        cy.findByText('Descrição').should('be.visible');
        cy.findByRole('button', { name: 'Salvar' }).should('be.visible');

    });

    it(`Scenario 2:
    DADO 
        Que estou na pagina de criar movimentação
    QUANDO 
        Incluo os dados necessários para uma movimentação do tipo receita com situação pendente
    ENTÃO 
        Devo ver a movimentação cadastrada na lista com as informações corretas`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const account = {
            name: faker.finance.accountName(),
        };

        const novaMovimentacao = {
            tipo: movimentacao.tipo.receita,
            dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
            dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
            descricao: faker.finance.transactionDescription(),
            interessado: faker.name.findName(),
            valor: faker.finance.amount(),
            conta: account.name,
            situacao: movimentacao.situacao.pendente,
        };

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name });

        cadastrarMovimentacao(novaMovimentacao);
        conferirMovimentacaoCadastrada(novaMovimentacao);

    });

    it(`Scenario 3:
    DADO 
        Que estou na pagina de criar movimentação
    QUANDO 
        Incluo os dados necessários para uma movimentação do tipo receita com situação pago
    ENTÃO 
        Devo ver a movimentação cadastrada na lista com as informações corretas`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const account = {
            name: faker.finance.accountName(),
        };

        const novaMovimentacao = {
            tipo: movimentacao.tipo.receita,
            dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
            dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
            descricao: faker.finance.transactionDescription(),
            interessado: faker.name.findName(),
            valor: faker.finance.amount(),
            conta: account.name,
            situacao: movimentacao.situacao.pago,
        };

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name });

        cadastrarMovimentacao(novaMovimentacao);
        conferirMovimentacaoCadastrada(novaMovimentacao);
    });

    it(`Scenario 4:
    DADO 
        Que estou na pagina de criar movimentação
    QUANDO 
        Incluo os dados necessários para uma movimentação do tipo despesa com situação pendente
    ENTÃO 
        Devo ver a movimentação cadastrada na lista com as informações corretas`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const account = {
            name: faker.finance.accountName(),
        };

        const novaMovimentacao = {
            tipo: movimentacao.tipo.despesa,
            dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
            dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
            descricao: faker.finance.transactionDescription(),
            interessado: faker.name.findName(),
            valor: faker.finance.amount(),
            conta: account.name,
            situacao: movimentacao.situacao.pendente,
        };

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name });

        cadastrarMovimentacao(novaMovimentacao);
        conferirMovimentacaoCadastrada(novaMovimentacao);
    });

    it(`Scenario 5:
    DADO 
        Que estou na pagina de criar movimentação
    QUANDO 
        Incluo os dados necessários para uma movimentação do tipo despesa com situação pago
    ENTÃO 
        Devo ver a movimentação cadastrada na lista com as informações corretas`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const account = {
            name: faker.finance.accountName(),
        };

        const novaMovimentacao = {
            tipo: movimentacao.tipo.despesa,
            dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
            dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
            descricao: faker.finance.transactionDescription(),
            interessado: faker.name.findName(),
            valor: faker.finance.amount(),
            conta: account.name,
            situacao: movimentacao.situacao.pago,
        };

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name });

        cadastrarMovimentacao(novaMovimentacao);
        conferirMovimentacaoCadastrada(novaMovimentacao);
    });
});
