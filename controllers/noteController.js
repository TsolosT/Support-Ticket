const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:id/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const notes = await Note.find({ ticket: req.params.id });

    res.status(200).json(notes);
})

// @desc    Create ticket note
// @route   POST /api/tickets/:id/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.id,
        user: req.user.id,
    });

    res.status(200).json(note);
})

module.exports = {
    getNotes,
    addNote,
};