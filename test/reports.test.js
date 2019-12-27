const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const app = require('../index');
const { newUsers: newUsersRoute, root: reportsRoute, highestSalaries: highestSalariesRoute} = config.get('routes.reports');
const { newUsers: getNewUsers, getSortedSalaries } = require('../src/common/utils');
const { mockUsers, expectedNewUsersResult, mockEmail, mockPassword, expectedSortedSalariesResult} = require('./reports.mock');
chai.use(chaiHttp);
chai.should();


describe('NewUsers', function () {
    
    it('should return true if newusers result valid', function(){
        const result = getNewUsers(mockUsers);
        expect(result).to.eql(expectedNewUsersResult);
    });

    describe("GET /", () => {
        it("should get all new users record", (done) => {
             chai.request(app)
                 .get(`${reportsRoute}${newUsersRoute}`)
                 .auth(mockEmail, mockPassword)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                });
        });
    });
});

describe('highestSalaries', function () {
    
    it('should return true if newusers result valid', function(){
        const result = getSortedSalaries(mockUsers);
        expect(result).to.eql(expectedSortedSalariesResult);
    });

    describe("GET /", () => {
        it("should get all higest salaries record", (done) => {
             chai.request(app)
                 .get(`${reportsRoute}${highestSalariesRoute}`)
                 .auth(mockEmail, mockPassword)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                });
        });
    });
});