import { useEffect, useMemo, useState } from "react";
import { fetchCurrentOperator, fetchOpenTickets, fetchTicketOptions } from "./api.js";
import CreateTicketPanel from "./components/CreateTicketPanel.jsx";
import TicketList from "./components/TicketList.jsx";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [operator, setOperator] = useState(null);
  const [options, setOptions] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const forceEmpty = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("empty") === "true";
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      try {
        setStatus("loading");
        const [operatorData, optionsData, ticketData] = await Promise.all([
          fetchCurrentOperator(),
          fetchTicketOptions(),
          fetchOpenTickets({ empty: forceEmpty })
        ]);

        if (!ignore) {
          setOperator(operatorData);
          setOptions(optionsData);
          setTickets(ticketData);
          setStatus("ready");
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message);
          setStatus("error");
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [forceEmpty]);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Support Ops</p>
          <h1>Dashboard ticket</h1>
          {operator && (
            <p className="operator-summary">
              Operatore: <strong>{operator.name}</strong>
            </p>
          )}
        </div>
        <span className="environment-badge">Modulo 03 - L09</span>
      </header>

      {status === "loading" && <p className="state-message">Caricamento ticket...</p>}
      {status === "error" && <p className="state-message state-message--error">{error}</p>}
      {status === "ready" && (
        <div className="dashboard-grid">
          <CreateTicketPanel options={options} />
          <TicketList tickets={tickets} />
        </div>
      )}
    </main>
  );
}
