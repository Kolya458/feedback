const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const fs = require('fs');
const { mockUser, mockCredentials, mockEmail, mockPassword } = require('./users.mock');
const { IMG_NAME, IMG_PATH, USER_IMG_PATH } = require('./test.config');

const config = require('config');
const app = require('../index');
const mongoose = require("mongoose");

const { signUp, root: usersRoute, login, edit }  = config.get('routes.users');

chai.use(chaiHttp);
chai.should();

describe('users', () => {

    let token =''

    beforeEach((done) => {
        chai.request(app)
            .post(`${usersRoute}${signUp}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(mockUser)
            .end((err, res) => {
                token = res.body.user.token;
                res.should.have.status(200);
                res.body.user.should.be.a('object');
                res.body.should.have.property('user');
                res.body.user.should.be.a('object');
                res.body.user.should.have.property('_id');
                res.body.user.should.have.property('email');
                res.body.user.should.have.property('token');
                res.type.should.equal('application/json');
                done();
           });
});

   it('should login user', (done) => {
        chai.request(app)
            .post(`${usersRoute}${login}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(mockCredentials)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.user.should.be.a('object');
                res.body.should.have.property('user');
                res.body.user.should.have.property('_id');
                res.body.user.should.have.property('email');
                res.body.user.should.have.property('token');
                expect(res.body.user.email).to.equal(mockCredentials.user.email);
                done();
            });
   });

   it('should update user userpic', (done) => {
    chai.request(app)
        .put(`${usersRoute}${edit}`)
        .auth(mockEmail, mockPassword)
        .type('form')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
        .attach('userpic', fs.readFileSync(IMG_PATH), IMG_NAME)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('user');
            res.body.user.should.have.property('_id');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('firstName');
            res.body.user.should.have.property('lastName');
            res.body.user.should.have.property('profession');
            done();
        });
});


    
    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.drop();
        };
    });

    after((done)=> {
        fs.unlink(USER_IMG_PATH, function (err) {
            if (err) throw err;
        }); 
        done();
    });

});