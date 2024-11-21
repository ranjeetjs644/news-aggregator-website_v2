import mongoose, { mongo } from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }],
}, { timestamps: true });

const User = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
