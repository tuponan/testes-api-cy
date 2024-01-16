/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
const { faker } = require('@faker-js/faker');

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('Produtos').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
               body: {
                    "quantidade": 1,
                    "usuarios": [
                         {
                              "nome": "Trantow",
                              "email": "ilhelmine90@gmail.com",
                              "password": "games",
                              "administrador": "true",
                              "_id": "MPzaVfBqZWrtqtJw"
                         }
                    ]
               }
          }).then((response) => {
               expect(response.body).to.property('quantidade')
               expect(response.status).to.equal(200)
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let emailFaker = faker.internet.email()
          let sobrenomeFaker = faker.name.lastName()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": sobrenomeFaker,
                    "email": emailFaker,
                    "password": "games",
                    "administrador": "true"
                  }
          }).then((response) => {
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               expect(response.status).to.equal(201)
               expect(response.duration).to.be.lessThan(20)
          }) 
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
               body: {
                    "quantidade": 1,
                    "usuarios": [
                      {
                        "nome": "Fulano da Silva",
                        "email": "beltrano@qa.com",
                        "password": "teste",
                        "administrador": "true",
                        "_id": "0uxuPY0cbmQhpEz1"
                      }
                    ]
                  }
           })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let emailFaker = faker.internet.email()
          let sobrenomeFaker = faker.name.lastName()
          cy.request({
               method: 'PUT',
               url: 'http://localhost:3000/usuarios/0uxuPY0cbmQhpEz1',    //Aqui não consigui colocar de forma orimizada a url, então optei por colocar o com http
               body: {
                    "nome": sobrenomeFaker,
                    "email": emailFaker,
                    "password": "teste",
                    "administrador": "true"
                  }
           }).then((response) => {
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               expect(response.status).to.equal(201)
               expect(response.duration).to.be.lessThan(20)
          }) 
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let emailFaker = faker.internet.email()
          let sobrenomeFaker = faker.name.lastName()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": sobrenomeFaker,
                    "email": emailFaker,
                    "password": "games",
                    "administrador": "true"
                  }
          })
          .then(response => {
               let id = response.body._id
          cy.request({
               method: 'DELETE',
               url: 'http://localhost:3000/usuarios/0uxuPY0cbmQhpEz1'
          }) 

      })

     });


});
