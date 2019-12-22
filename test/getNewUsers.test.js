const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const getNewUsers = require('../src/common/utils').newUsers;
const { mockUser, mockUsers } = require('./users.mock');

const config = require('config');
const app = require('../index');
const mongoose = require("mongoose");

const { newUsers: newUsersRoute, root: reportsRoute } = config.get('routes.reports');
const { testUser, testPassword } = require('./test.config');
const { signUp, root: usersRoute, deleteUser }  = config.get('routes.users');

chai.use(chaiHttp);
chai.should();

const expectedResult = [
    {
        "name": "Petr",
        "lastName": "Ivanov",
        "join_date": "28-Sep-11"
    },
    {
        "name": "Petr",
        "lastName": "McKenzie",
        "join_date": "25-Jan-01"
    },
    {
        "name": "Sandra",
        "lastName": "McKenzie",
        "join_date": "25-Dec-95"
    }
];

describe('NewUsers', function () {
    
    it('should return true if newusers result valid', function(){
        const result = getNewUsers(mockUsers);
        expect(result).to.eql(expectedResult);
    });

    describe("GET /", () => {
        it("should get all new users record", (done) => {
             chai.request(app)
                 .get(`${reportsRoute}${newUsersRoute}`)
                 .auth(testUser, testPassword)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                });
        });
    });
});

describe('users', () => {
    it("should create new user", (done) => {
        chai.request(app)
            .post(`${usersRoute}${signUp}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(mockUser)
            .end((err, res) => {
                console.log(res)
                res.should.have.status(200);
                res.body.user.should.be.a('object');
                done();
           });
   });
    
    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.drop();
        };
    });

})