import faker from 'faker';
import {
    conferirMovimentacaoCadastrada,
    createUser,
    login,
    createAccount,
    addAccountMoviment,
    monthInPortuguese,
    movimentacao
} from '../../../pages/seubarriga';

describe(`US5:
    Como usuário do sistema
    Gostaria de listar a movimentação
    Para visualizar as movimentações que ocorreram na minha conta`,
{ retries: 2 },
() => {
    
    
    it(`Scenario 1:
    DADO 
        Que estou na pagina home
    QUANDO 
        Clico no botão resumo mensal
    ENTÃO 
        Devo visualizar a pagina de extrato das movimentações`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        
        const account = {
            name: faker.finance.accountName().concat(faker.datatype.number()),
        };

        const movimentacoes = [
            {
                tipo: movimentacao.tipo.despesa,
                dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pago,
            },
            {
                tipo: movimentacao.tipo.receita,
                dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pago,
            },
            {
                tipo: movimentacao.tipo.despesa,
                dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pendente,
            },
            {
                tipo: movimentacao.tipo.despesa,
                dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pendente,
            },
        ];

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name }).then(({body}) => {
            const regex = new RegExp('(<td>)('.concat(account.name).concat('<\\/td>)[( )*(\n)*(\t)*]*(<td><a href="(\\/)editarConta\\?id=)[0123456789]{6}'));            
            const returnedArray = body.match(regex);
            const id = returnedArray[0].slice(-6);
            
            movimentacoes.forEach(movimentacao => {
                addAccountMoviment({ ...movimentacao, conta: id });
            });
        });

        cy.visit('/');

        movimentacoes.forEach(movimentacao => {
            conferirMovimentacaoCadastrada(movimentacao);
        });
    });

    it(`Scenario 2:
    DADO 
        Que possuo movimentações cadastradas
    QUANDO 
        Estou na pagina de extrato das movimentações
    ENTÃO 
        Devo visualizar as movimentações ocorridas de acordo com o filtro`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        
        const account = {
            name: faker.finance.accountName().concat(faker.datatype.number()),
        };

        const movimentacoes = [
            {
                tipo: movimentacao.tipo.receita,
                dataMovimentacao: Cypress.dayjs().add(-1, 'month').format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().add(-1, 'month').format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pago,
            },
            {
                tipo: movimentacao.tipo.receita,
                dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pago,
            },
            {
                tipo: movimentacao.tipo.receita,
                dataMovimentacao: Cypress.dayjs().format('DD/MM/YYYY'),
                dataPagamento: Cypress.dayjs().add(1, 'month').format('DD/MM/YYYY'),
                descricao: faker.finance.transactionDescription(),
                interessado: faker.name.findName(),
                valor: faker.finance.amount(),
                conta: account.name,
                situacao: movimentacao.situacao.pendente,
            },
        ];

        createUser(accountUser);
        login(accountUser);
        createAccount({ name: account.name }).then(({body}) => {
            const regex = new RegExp('(<td>)('.concat(account.name).concat('<\\/td>)[( )*(\n)*(\t)*]*(<td><a href="(\\/)editarConta\\?id=)[0123456789]{6}'));            
            const returnedArray = body.match(regex);
            const id = returnedArray[0].slice(-6);
            
            movimentacoes.forEach(movimentacao => {
                addAccountMoviment({ ...movimentacao, conta: id });
            });
        });

        cy.visit('/extrato');
        const lastMonth = Cypress.dayjs().add(-1, 'month').format('MM');
        const currentMonth = Cypress.dayjs().format('MM');
        const nextMonth = Cypress.dayjs().add(1, 'month').format('MM');
        
        cy.log('Eu seleciono o mês anterior no filtro devo ver a movimentação correta');
        cy.get('#mes').select(monthInPortuguese(lastMonth));
        cy.findByRole('button', { name: 'Buscar' }).click();
        conferirMovimentacaoCadastrada(movimentacoes[0]);
        
        cy.log('Eu seleciono o mês atual no filtro devo ver a movimentação correta');
        cy.get('#mes').select(monthInPortuguese(currentMonth));
        cy.findByRole('button', { name: 'Buscar' }).click();
        conferirMovimentacaoCadastrada(movimentacoes[1]);
        
        cy.log('Eu seleciono o mês seguinte no filtro devo ver a movimentação correta');
        cy.get('#mes').select(monthInPortuguese(nextMonth));
        cy.findByRole('button', { name: 'Buscar' }).click();
        conferirMovimentacaoCadastrada(movimentacoes[2]);
    });
});
