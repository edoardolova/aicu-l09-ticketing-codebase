async function readJsonResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || fallbackMessage;
    const error = new Error(message);
    error.status = response.status;
    error.code = data?.code;
    error.fieldErrors = data?.fieldErrors;
    throw error;
  }

  return data;
}

export async function fetchCurrentOperator() {
  const response = await fetch("/api/me");
  const data = await readJsonResponse(response, "Impossibile caricare l'operatore corrente.");

  return data.operator;
}

export async function fetchOpenTickets({ empty = false } = {}) {
  const params = new URLSearchParams();

  if (empty) {
    params.set("empty", "true");
  }

  const query = params.toString();
  const response = await fetch(`/api/tickets${query ? `?${query}` : ""}`);

  return readJsonResponse(response, "Impossibile caricare i ticket aperti.");
}

export async function fetchTicketOptions() {
  const response = await fetch("/api/ticket-options");

  return readJsonResponse(response, "Impossibile caricare le opzioni ticket.");
}

export async function createTicket(payload) {
  const response = await fetch("/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return readJsonResponse(response, "Impossibile creare il ticket.");
}
