/* eslint-disable jest/valid-expect */
import faker from 'faker';

describe(`test create, read, update and delete 
from api jsonplaceholder `, () => {

    it('get a list of posts', () => {
        cy.request('https://jsonplaceholder.typicode.com/posts').its('body').then((body) => {
            //cy.log(body);
            expect(body.length).to.be.greaterThan(0);
        });
    });

    it('create a new post', () => {   
        
        const post = {
            title: faker.lorem.word(),
            body: faker.lorem.sentence(),
            userId: 2,
        };

        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: {
                post
            },
        }).its('body').then((body) => {
            expect(body.id).to.exist;
        });
    });
    it('Edit a post', () => {   
        
        const post = {
            title: faker.lorem.word(),
            body: faker.lorem.sentence(),
            id: 2,
        };

        cy.request({
            method: 'PUT',
            url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
            body: {
                post
            },
        }).its('body').then((body) => {
            expect(body.id).to.exist;
        });
    });
    it('Delete a post', () => {   
        
        const post = {
            id: 2,
        };

        cy.request({
            method: 'DELETE',
            url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
            body: {
                post
            },
        }).its('status').should('be.eq', 200);
    });
});
