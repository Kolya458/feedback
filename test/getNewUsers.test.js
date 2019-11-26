const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const getNewUsers = require('../src/common/utils').newUsers;
const users = require('./users.mock');
const config = require('config');

const newUsersRoute = config.get('routes.reports.newUsers');
const reportsRoute = config.get('routes.reports.root')
const testuser = require('./test.config').test_user;
const testpassword =  require('./test.config').test_password;

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
        const result = getNewUsers(users);
        expect(result).to.eql(expectedResult);
    });

    describe("GET /", () => {
        it("should get all new users record", (done) => {
             chai.request(`http://localhost:3000${reportsRoute}`)
                 .get(newUsersRoute)
                 .auth(testuser, testpassword)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                });
        });
    });
})

    