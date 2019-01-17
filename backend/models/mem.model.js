const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true
    }
});
MemSchema.pre('save', function() {
    console.log(this)
});

const MemModel = mongoose.model('mem', MemSchema);


module.exports = MemModel;