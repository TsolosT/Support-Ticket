const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    ticket: {
        type: String,
        require: true,
        ref: 'Ticket'
    },
    text: {
        type: String,
        require: [true, 'Please a some text']
    },
    isStaff: {
        type: Boolean,
        require: false
    },
    staffId: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Note', noteSchema);