import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

UserSchema.virtual('fullName').get(function fullName() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', UserSchema);

export default User;
