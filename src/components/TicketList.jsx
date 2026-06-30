import TicketCard from "./TicketCard.jsx";

export default function TicketList({ tickets }) {
  return (
    <section className="ticket-section" aria-labelledby="open-tickets-title">
      <div className="section-heading">
        <div>
          <h1 id="open-tickets-title">Ticket aperti</h1>
          <p>Coda supporto attiva, ordinata per priorita' e ultimo aggiornamento.</p>
        </div>
        <span className="ticket-count">
          <strong>{tickets.length}</strong>
          <small>aperti</small>
        </span>
      </div>

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </section>
  );
}
