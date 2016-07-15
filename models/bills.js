import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  priority: { type: Number },
  amount: { type: Number },
  done: { type: Boolean }
});

export default mongoose.model('bills', schema);
