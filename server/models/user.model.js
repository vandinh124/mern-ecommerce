const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        minlength: [
            2,
            'Please enter a first name of 2 or more characters'
        ]
    },
    lastName: {
        type: String, 
        minlength: [
            2,
            'Please enter a last name of 2 or more characters'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'Please enter your valid email'],
        unique: true,
        validate: [
            val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        minlength: [
            8,
            'Please enter a password of at least 8 characters'
        ]
    }          
  }, {timestamps: true});

    UserSchema.virtual('confirmPassword',{
        get: () => this.confirmPassword,
        set: val => this.confirmPassword = val
    });

    UserSchema.pre('validate', function(next) {
        if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
        }
        next();
    });

    UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hashPw => {
        this.password = hashPw;
        next();
    });
    });


    const User = mongoose.model('User', UserSchema);

    //frontend version: export default city
    module.exports = User;
  