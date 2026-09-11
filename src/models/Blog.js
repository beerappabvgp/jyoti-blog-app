import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },    
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});

export const BlogModel = mongoose.model('blogs', BlogSchema);