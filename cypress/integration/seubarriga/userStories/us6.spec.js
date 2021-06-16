import faker from 'faker';
import {
    conferirMovimentacaoCadastrada,
    createUser,
    login,
    createAccount,
    addAccountMoviment,
    movimentacao
} from '../../../pages/seubarriga';

describe(`US5:
    Como usuário do sistema
    Gostaria de excluir uma movimentação
    Para manter a listagem de movimentações de acordo com meu desejo`,
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
            }
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

        const movementToRemainOnTheList = movimentacoes[0];
        const movementToRemoveFromTheList = movimentacoes[1];

        cy.log(`Eu removo a movimentação ${movementToRemoveFromTheList.descricao}`);
        cy.findByText(movementToRemoveFromTheList.descricao)
            .parent()
            .find('.glyphicon-remove-circle')
            .click();

        conferirMovimentacaoCadastrada(movementToRemainOnTheList);

        cy.log('Eu não vejo mais a movimentação que foi removida');
        cy.findByText(movementToRemoveFromTheList.descricao).should('not.exist');
    });
});
