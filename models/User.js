const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  toWatch: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe'
  }
});

// pre('save') means before saving in db
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) { // if password isn't modyfied (!signup)
    return next();
  };

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    })
  })
});

module.exports = mongoose.model('User', UserSchema);