/* global describe, before, after, beforeEach, it */
/* global expect, config, server */
import Bills from '../../models/bills.js';

describe('Handler: Bills', () => {
  const bills = [
    { _id: '577c68c99c1c91dd96db5637', name: 'study hard!', done: false },
    { _id: '577c68ff9c1c91dd96db5638', name: 'work soft!', done: false }
  ];

  beforeEach(done => {
    Bills.remove({}, () => Bills.insertMany(bills, done));
  });

  describe('GET /bills', () => {
    describe('status 200', () => {
      it('returns a list of bills', done => {
        server.inject({
          method: 'GET',
          url: '/bills'
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result).to.have.length(2);
          done();
        });
      });
    });
  });

  describe('POST /bills', () => {
    describe('status 200', () => {
      it('creates a new bill', done => {
        server.inject({
          method: 'POST',
          url: '/bills',
          payload: {
            name: 'run fast!',
            priority: 1,
            amount: 1000,
            done: false
          }
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result.name).to.eql('run fast!');
          expect(res.result.name).to.eql('run fast!');
          expect(res.result.priority).to.eql(1);
          expect(res.result.amount).to.eql(1000);
          expect(res.result.done).to.eql(false);
          done();
        });
      });
    });
  });

  describe('GET /bills/:id', () => {
    describe('status 200', () => {
      it('returns one bill', done => {
        server.inject({
          method: 'GET',
          url: `/bills/${bills[0]._id}`
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result._id.toString()).to.eql(bills[0]._id);
          expect(res.result.name).to.eql(bills[0].name);
          expect(res.result.priority).to.eql(bills[0].priority);
          expect(res.result.amount).to.eql(bills[0].amount);
          expect(res.result.done).to.eql(bills[0].done);
          done();
        });
      });
    });
    describe('status 404', () => {
      it('throws error when bill not exist', done => {
        server.inject({
          method: 'GET',
          url: '/bills/id-not-exist'
        }, (res) => {
          expect(res.statusCode).to.eql(404);
          done();
        });
      });
    });
  });

  describe('PUT /bills/:id', () => {
    describe('status 200', () => {
      it('updates a bill', done => {
        server.inject({
          method: 'PUT',
          url: `/bills/${bills[0]._id}`,
          payload: {
            name: 'run fast!',
            priority: 1,
            amount: 1000,
            done: false
          }
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result._id.toString()).to.eql(bills[0]._id);
          expect(res.result.name).to.eql('run fast!');
          expect(res.result.priority).to.eql(1);
          expect(res.result.amount).to.eql(1000);
          expect(res.result.done).to.eql(false);
          done();
        });
      });
    });
  });

  describe('DELETE /bills/:id', () => {
    describe('status 204', () => {
      it('removes a bill', done => {
        server.inject({
          method: 'DELETE',
          url: `/bills/${bills[0]._id}`
        }, (res) => {
          expect(res.statusCode).to.eql(204);
          done();
        });
      });
    });
  });
});
