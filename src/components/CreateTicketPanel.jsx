import { useState } from "react";
import { createTicket } from "../api.js";

const initialForm = {
  title: "",
  description: "",
  requesterEmail: "",
  priority: "normale"
};

export default function CreateTicketPanel({ options }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      await createTicket(form);
      setStatus("success");
      setMessage("Ticket creato.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(`${error.status || "Errore"} ${error.code || ""} - ${error.message}`.trim());
    }
  }

  return (
    <section className="create-panel" aria-labelledby="create-ticket-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Flusso incompleto</p>
          <h1 id="create-ticket-title">Nuovo ticket</h1>
          <p>La UI raccoglie i primi dati. Area, canale e regola SLA restano il gap da osservare.</p>
        </div>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>
          Titolo
          <input name="title" value={form.title} onChange={updateField} placeholder="Es. Login Safari" />
        </label>

        <label>
          Email richiedente
          <input
            name="requesterEmail"
            type="email"
            value={form.requesterEmail}
            onChange={updateField}
            placeholder="cliente@example.com"
          />
        </label>

        <label>
          Priorita'
          <select name="priority" value={form.priority} onChange={updateField}>
            {(options?.priorities || ["alta", "normale", "bassa"]).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label>
          Descrizione
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            rows="4"
            placeholder="Descrivi la richiesta..."
          />
        </label>

        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Invio..." : "Salva ticket"}
        </button>
      </form>

      {message && (
        <p className={`form-message form-message--${status === "error" ? "error" : "success"}`}>{message}</p>
      )}
    </section>
  );
}
