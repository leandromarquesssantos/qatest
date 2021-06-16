import faker from 'faker';
import { createUser, login } from '../../../pages/seubarriga';

describe(`US2:
    Como usuário do sistema
    Gostaria de cadastrar uma conta
    Para realizar movimentações`,
{ retries: 2 },
() => {
    it(`Scenario 1:
    DADO 
        Que estou logado no sistema na pagina home
    QUANDO 
        Clico em adicionar conta
    ENTÃO
        devo ver a pagina de cadastro de conta`,
    () => {
        const accountUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        createUser(accountUser);
        login(accountUser);
        cy.visit('/');

        cy.findByRole('button', { name: 'Contas' })
            .click();
        cy.findByText('Adicionar')
            .click();

        cy.findByText('Nome').should('be.visible');
        cy.findByRole('button', { name: 'Salvar' }).should('be.visible');
    });

    it(`Scenario 2:
    DADO 
        Que estou na pagina de cadastro de conta
    QUANDO 
        Preencho as informações necessárias
        E salvo o cadastro
    ENTÃO 
        Devo ver a conta que foi cadastrada`,
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
        cy.visit('/addConta');
        cy.findByLabelText('Nome')
            .type(account.name);
        cy.findByRole('button', { name: 'Salvar' })
            .click();

        cy.checkAlertMessage('Conta adicionada com sucesso!');
    });
});
