const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true
    }
});

UserSchema.pre('save', async function (next) {

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

UserSchema.methods.isValidPassword = function (password) {
    const user = this;
    if (bcrypt.compareSync(password, user.password)) {
        return true;
    } else {
        return false;
    }
}

const UserModel = mongoose.model('user', UserSchema);


module.exports = UserModel;