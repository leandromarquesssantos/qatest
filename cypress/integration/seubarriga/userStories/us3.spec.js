import faker from 'faker';
import { createUser, login, createAccount } from '../../../pages/seubarriga';

describe(`US3:
    Como usuário do sistema
    Gostaria de visualizar as contas cadastras
    Para ver as contas que estão cadastradas
    E manter seus cadastros atualizados`,
{ retries: 2 },
() => {
    it(`Scenario 1:
    DADO 
        Que estou na pagina de contas
    QUANDO 
        Clico no botão editar de uma conta
        E altero o nome dessa conta
    ENTÃO 
        Devo ver a conta com o nome atualizado na lista`,
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

        cy.visit('/contas');

        cy.log(`Eu clico no botão editar da conta ${account.name}`);
        cy.findByText(account.name).should('be.visible');
        cy.findByText(account.name)
            .parent()
            .find('.glyphicon-edit')
            .click();

        const editedAccountName = `${account.name} edited`;
        
        cy.log(`Eu altero o nome da conta para ${editedAccountName}`);
        cy.findByLabelText('Nome')
            .clear()
            .type(editedAccountName);
        cy.findByRole('button', { name: 'Salvar' })
            .click();
        
        cy.checkAlertMessage('Conta alterada com sucesso!');

        cy.log('Eu vejo o novo nome da conta na lista');
        cy.findByText(account.name).should('not.exist');
        cy.findByText(editedAccountName).should('be.visible');
    });

    it(`Scenario 2:
    DADO 
        Que estou na pagina de contas
    QUANDO 
        Clico no botão excluir dessa conta
    ENTÃO 
        Não devo ver a conta que foi excluída na lista`,
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

        cy.visit('/contas');

        cy.log(`Eu clico no botão excluir da conta ${account.name}`);
        cy.findByText(account.name).should('be.visible');
        cy.findByText(account.name)
            .parent()
            .find('.glyphicon-remove-circle')
            .click();
        
        cy.checkAlertMessage('Conta removida com sucesso!');

        cy.log('Eu não vejo a conta na lista');
        cy.findByText(account.name).should('not.exist');
    });
});
