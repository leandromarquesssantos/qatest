
## Instalar
    npm install

## para rodar
    npm run cypress:open

### para rodar headless
    npm run test
    
### somente histórias de usuários
    npm run test:us
    
### somente epicos
    npm run test:epic
    
### somente api 
    npm run test:api

## Informações 
Foi utilizado a biblioteca **[Cypress Testing Library](https://testing-library.com/)**
Que proporciona algumas vantagens para os testes. Com a premissa de que o objetivo é testar o uso e não a implementação. Os testes devem se assemelhar a forma como o usuário interage com a UI. Isso é feito, utilizando de métodos que buscam elementos por meio de atributos que são visíveis ao usuário, como uma label, ou um texto do botão. Exatamente como um usuário faria e não por detalhes de implementação como ids ou classes.

Exemplo, se precisar clicar em um botão salvar. 
Ao invés de utilizar:

    cy.get('.button-save').click();

Procura-se por um botão com texto Salvar:

    cy.findByRole('button', { name: 'Salvar'}).click();

Outra vantagem é o desacoplamento entre detalhes de implementação e o script de teste. Mudanças de código como trocar ids, classes, e etc... não fariam o teste parar de funcionar caso a funcionalidade continue a mesma. 

Os testes foram criados de duas formas:
- Histórias de usuário
Cada cenário representa um caso de uso especifico dentro de uma história de usuário e pode ser executado de maneira independente dos outros. Nos casos onde um cenário necessite de dados pré-existentes, os mesmos são criados sempre que possível usando requests, sem utilizar a UI. O que torna esses testes muito uteis já que permitem testar porções especificas do software sem estar atrelado a detalhes de implementação que estejam fora do escopo desse determinado caso de uso.

- Épicos
O teste passa por diversas funcionalidades do software em sequência. Esse tipo de teste trás desvantagens pela demora maior na execução, e caso ocorra uma falha logo no início do teste, ele para a execução o que impede que se descubra rapidamente falhas em funcionalidades que seriam testadas depois.

  
## faker.js
Foi utilizado a biblioteca [faker.js](https://github.com/marak/Faker.js/) para gerar os dados dinamicamente.

## ESLint 

E o [ESLint](https://eslint.org/) para a análise estática do código, com objetivo de manter o estilo e legibilidade do código. 
