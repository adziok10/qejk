import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    bcrypt.compareSync(password, user.password)?  true : false;
}

const UserModel = mongoose.model('user', UserSchema);


export default UserModel;