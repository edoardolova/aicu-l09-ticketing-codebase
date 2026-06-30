export default function TicketCard({ ticket }) {
  const updatedAt = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ticket.updatedAt));
  const priority = ticket.priority.toLowerCase();

  return (
    <article className={`ticket-card ticket-card--${priority}`}>
      <div className="ticket-card__header">
        <span className="ticket-card__id">{ticket.id}</span>
        <span className={`ticket-card__priority ticket-card__priority--${priority}`}>{ticket.priority}</span>
      </div>

      <h2 className="ticket-card__title">{ticket.title}</h2>
      <p className="ticket-card__description">{ticket.description}</p>

      <div className="ticket-card__meta">
        <span>{ticket.customerName}</span>
        <span>Aggiornato {updatedAt}</span>
      </div>

      <dl className="ticket-card__details">
        <div>
          <dt>Area</dt>
          <dd>{ticket.area}</dd>
        </div>
        <div>
          <dt>Canale</dt>
          <dd>{ticket.sourceChannel}</dd>
        </div>
        <div>
          <dt>Campo derivato</dt>
          <dd className="ticket-card__missing">non ancora calcolato</dd>
        </div>
      </dl>
    </article>
  );
}
