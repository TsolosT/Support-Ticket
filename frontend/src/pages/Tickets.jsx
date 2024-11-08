import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

function Tickets() {
    const { tickets } = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    if (!tickets) {
        return <Spinner/>
    }

    return (
        <>
            <BackButton url="/"/>
            <section className="heading">
                <h1>Tickets</h1>
                <p>View your ticket issues.</p>
            </section>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                </div>
                {tickets.map((ticket) => (<TicketItem key={ticket._id} ticket={ticket}/>))}
            </div>
        </>
    )
}

export default Tickets;