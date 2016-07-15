import Boom from 'boom';
import Bills from '../models/bills.js';

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/bills',
    handler(req, reply) {
      Bills.find({}, (err, bills) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply(bills);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/bills/{billId}',
    handler(req, reply) {
      const { billId } = req.params;
      Bills.findById(billId, (err, bill) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        if (bill) {
          return reply(bill);
        }
        return reply().code(404);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/bills',
    handler(req, reply) {
      const bill = req.payload;
      Bills.create(bill, (err, newBill) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply(newBill);
      });
    }
  });

  server.route({
    method: 'PUT',
    path: '/bills/{billId}',
    handler(req, reply) {
      const { billId } = req.params;
      const bill = req.payload;
      Bills.update({ _id: billId }, { $set: bill }, (err) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        Bills.findById(billId, (findErr, newBill) => {
          if (findErr) {
            return reply(Boom.wrap(findErr));
          }
          return reply(newBill);
        });
        return true;
      });
    }
  });

  server.route({
    method: 'DELETE',
    path: '/bills/{billId}',
    handler(req, reply) {
      const { billId } = req.params;
      Bills.findByIdAndRemove(billId, (err) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply().code(204);
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'bills-handler',
  version: '1.0.0'
};
