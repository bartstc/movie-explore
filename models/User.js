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
  date: {
    type: Date,
    default: Date.now
  },
  recommendations: {
    type: [Schema.Types.ObjectId],
    ref: 'Movie'
  },
  liked: {
    type: [Schema.Types.ObjectId],
    ref: 'Movie'
  },
  watched: {
    type: [Schema.Types.ObjectId],
    ref: 'Movie'
  },
  toWatch: {
    type: [Schema.Types.ObjectId],
    ref: 'Movie'
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  invitations: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
});

UserSchema.index({
  username: 'text'
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