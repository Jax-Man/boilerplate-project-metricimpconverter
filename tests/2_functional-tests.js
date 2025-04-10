const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("Routing functionality tests:", () => {
        suite('full GET request with inputs good - bad', () => {
            test('Convert 45/6mI to km', (done) => {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "45/6mI" })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 7.5);
                        assert.equal(res.body.initUnit, 'mi');
                        assert.equal(res.body.returnUnit, 'km');
                        assert.approximately(res.body.returnNum, 12.07005, 0.00001);
                        done();
                    })
            });

            test('Convert 45/6mIl to km', (done) => {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "45/6mil" })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.error, 'invalid unit');
                        done();
                    })
            });

            test('Convert 45/6/3mI to km', (done) => {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "45/6/3mI" })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.error, 'invalid number');
                        done();
                    });
            });

            test('Convert 45/6/3myles to km', (done) => {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "45/6/3myles" })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.error, 'invalid number and unit');
                        done();
                    });
            });

            test('Convert mI to km', (done) => {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "mI" })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 1);
                        assert.equal(res.body.initUnit, 'mi');
                        assert.equal(res.body.returnUnit, 'km');
                        assert.approximately(res.body.returnNum, 1.60934, 0.00001);
                        done();
                    })
            });

        });
    });
});
