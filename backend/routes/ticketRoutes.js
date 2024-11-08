const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTickets, createTicket, getTicket, updateTicket, deleteTicket} =  require('../controllers/ticketController');

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:id/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTicket);
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router;