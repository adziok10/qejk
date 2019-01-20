import mongoose from 'mongoose';

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

const MemModel = mongoose.model('mem', MemSchema);

export default MemModel;