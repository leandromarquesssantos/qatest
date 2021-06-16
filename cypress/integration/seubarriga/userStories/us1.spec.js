import faker from 'faker';
import { createUser, login } from '../../../pages/seubarriga';

describe(`US1:
    Como um usuário
    gostaria de me cadastrar no sistema
    para fazer login e utilizar o sistema`,
{ retries: 2 },
() => {
    it(`scenario 1:
    DADO 
        Que eu esteja na pagina de cadastro de usuário
    QUANDO 
        Preencho as informações necessárias
    ENTÃO 
        O usuário deve ser cadastro
        E devo conseguir realizar login com esse usuário`,
    () => {
        const newUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        cy.log('Eu estou na pagina de cadastro');
        cy.visit('/cadastro');
        
        cy.log('Eu preencho o nome, email e password e clico em cadastrar');
        cy.findByPlaceholderText('Nome')
            .type(newUser.name);
        cy.findByPlaceholderText('Email')
            .type(newUser.email);
        cy.findByPlaceholderText(/Password/i)
            .type(newUser.password);
        cy.findByRole('button', { name: 'Cadastrar' })
            .click();
        
        cy.log('Eu vejo que o cadastro foi realizado com sucesso');
        cy.checkAlertMessage('Usuário inserido com sucesso');

        cy.log('Eu realizo login com o usuário cadastrado');
        cy.visit('/login');
        cy.findByPlaceholderText('Email')
            .type(newUser.email);
        cy.findByPlaceholderText(/Password/i)
            .type(newUser.password);
        cy.findByRole('button', { name: 'Entrar' })
            .click();
        cy.checkAlertMessage(`Bem vindo, ${newUser.name}!`);
    });

    it(`scenario 2:
    DADO 
        Que eu possua um usuário cadastrado
        E eu esteja na pagina de login
    QUANDO 
        Preencho as informações corretas de login
    ENTÃO 
        Devo ver a pagina home`,
    () => {
        const existingUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        createUser(existingUser);
        
        cy.visit('/login');
        cy.findByPlaceholderText('Email')
            .type(existingUser.email);
        
        cy.findByPlaceholderText(/Password/i)
            .type(existingUser.password);

        cy.findByRole('button', { name: 'Entrar' })
            .click();
        
        cy.checkAlertMessage(`Bem vindo, ${existingUser.name}!`);
    
    });

    it(`Scenario 3:
    DADO 
        Que estou logado no sistema
    QUANDO 
        Clico no botão sair
    ENTÃO
        devo ver a pagina de login
        E nao devo conseguir navegar por outras paginas do sistema`,
    () => {
        const existingUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        createUser(existingUser);
        login(existingUser);
        
        cy.log('Eu estou logado no sistema');
        cy.visit('/');
        cy.findByText('Home').should('be.visible');
        cy.findByText('Contas').should('be.visible');
        cy.findByText('Criar Movimentação').should('be.visible');
        cy.findByText('Resumo Mensal').should('be.visible');
        
        cy.log('Eu clico em sair do sistema');
        cy.findByText('Sair').should('be.visible').click();

        cy.log('Eu não vejo os elemento da home');
        cy.visit('/');
        cy.findByText('Home').should('not.exist');
        cy.findByText('Contas').should('not.exist');
        cy.findByText('Criar Movimentação').should('not.exist');
        cy.findByText('Resumo Mensal').should('not.exist');
        
        cy.log('Eu vejo a pagina de cadastro');
        cy.findByText('Login').should('be.visible');
        cy.findByText('Novo usuário?').should('be.visible');
        cy.findByRole('button', { name: 'Entrar' }).should('be.visible');
    });
});