/* eslint-disable consistent-return */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  quote: String,
  password: String,
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      delete ret.password;
      return ret;
    },
  },
});

UserSchema.virtual('fullName').get(function fullName() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre('save', function beforeModelSave(next) {
  const user = this;

  if (!user.isModified('password')) return next();
  else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);
          else {
            user.password = hash;
            return next();
          }
        });
      }
    });
  }
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (err, res) => {
    if (err) return callback(err);
    else {
      return callback(null, res);
    }
  });
};

const User = mongoose.model('User', UserSchema);

export default User;
