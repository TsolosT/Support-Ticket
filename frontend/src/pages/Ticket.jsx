import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
            if (isError) {
                toast.error(message);
            }
            dispatch(getTicket(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isError, message, id]
    );

    const onTicketClose = () => {
        dispatch(closeTicket(id));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };


    if (isLoading) {
        return <Spinner/>;
    }
    if (isError) {
        return (
            <>
                <section className="heading">
                    <h1>Something went wrong</h1>
                    <p>Try again in few minutes.</p>
                </section>
            </>
        );
    }
    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleTimeString('el-GR')}
                </h3>
                <h3>Product: {ticket.product} </h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket