const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: [true, 'user must have a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'user must have a password'],
    minLength: 8,
    select: false,
  },
  firstName: {
    type: String,
    required: [true, 'user must have firstName'],
    match: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
  },
  lastName: {
    type: String,
    required: [true, 'user must have lastName'],
    match: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
  },
  phone: {
    type: String,
    required: [true, 'user must have valid phone number'],
    match: /^[+][0-9]{1,3}[0-9]{3}[0-9]{3}[0-9]{4}$/
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
