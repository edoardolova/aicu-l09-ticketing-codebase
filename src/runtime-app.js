const root = document.querySelector("#root");

function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = options.text;
  }

  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      element.setAttribute(name, value);
    }
  }

  return element;
}

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

async function fetchCurrentOperator() {
  const response = await fetch("/api/me");
  const data = await readJsonResponse(response, "Impossibile caricare l'operatore corrente.");

  return data.operator;
}

async function fetchOpenTickets() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("empty") === "true" ? "?empty=true" : "";
  const response = await fetch(`/api/tickets${query}`);

  return readJsonResponse(response, "Impossibile caricare i ticket aperti.");
}

async function fetchTicketOptions() {
  const response = await fetch("/api/ticket-options");

  return readJsonResponse(response, "Impossibile caricare le opzioni ticket.");
}

async function createTicket(payload) {
  const response = await fetch("/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return readJsonResponse(response, "Impossibile creare il ticket.");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function renderShell(operator, options, tickets) {
  root.replaceChildren();

  const main = createElement("main", { className: "app-shell" });
  const header = createElement("header", { className: "app-header" });
  const headerCopy = createElement("div");
  const eyebrow = createElement("p", { className: "eyebrow", text: "Support Ops" });
  const title = createElement("h1", { text: "Dashboard ticket" });
  const operatorSummary = createElement("p", { className: "operator-summary" });
  operatorSummary.append("Operatore: ");
  operatorSummary.append(createElement("strong", { text: operator?.name || "non trovato" }));
  const badge = createElement("span", { className: "environment-badge", text: "Modulo 03 - L09" });

  headerCopy.append(eyebrow, title, operatorSummary);
  header.append(headerCopy, badge);

  const grid = createElement("div", { className: "dashboard-grid" });
  grid.append(renderCreatePanel(options), renderTicketList(tickets));

  main.append(header, grid);
  root.append(main);
}

function renderCreatePanel(options) {
  const section = createElement("section", {
    className: "create-panel",
    attrs: { "aria-labelledby": "create-ticket-title" }
  });
  const heading = createElement("div", { className: "section-heading" });
  const headingCopy = createElement("div");
  headingCopy.append(
    createElement("p", { className: "eyebrow", text: "Flusso incompleto" }),
    createElement("h1", { attrs: { id: "create-ticket-title" }, text: "Nuovo ticket" }),
    createElement("p", {
      text: "La UI raccoglie i primi dati. Area, canale e regola SLA restano il gap da osservare."
    })
  );
  heading.append(headingCopy);

  const form = createElement("form", { className: "ticket-form" });
  form.append(
    renderTextInput("Titolo", "title", "Es. Login Safari"),
    renderTextInput("Email richiedente", "requesterEmail", "cliente@example.com", "email"),
    renderSelect("Priorita'", "priority", options?.priorities || ["alta", "normale", "bassa"]),
    renderTextarea("Descrizione", "description", "Descrivi la richiesta..."),
    createElement("button", { attrs: { type: "submit" }, text: "Salva ticket" })
  );

  const message = createElement("p", { className: "form-message" });
  message.hidden = true;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button");
    submitButton.disabled = true;
    submitButton.textContent = "Invio...";
    message.hidden = true;
    message.className = "form-message";

    try {
      const formData = new FormData(form);
      await createTicket(Object.fromEntries(formData.entries()));
      message.textContent = "Ticket creato.";
      message.classList.add("form-message--success");
      form.reset();
    } catch (error) {
      message.textContent = `${error.status || "Errore"} ${error.code || ""} - ${error.message}`.trim();
      message.classList.add("form-message--error");
    } finally {
      message.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = "Salva ticket";
    }
  });

  section.append(heading, form, message);

  return section;
}

function renderTextInput(labelText, name, placeholder, type = "text") {
  const label = createElement("label", { text: labelText });
  label.append(
    createElement("input", {
      attrs: {
        name,
        placeholder,
        type,
        value: name === "priority" ? "normale" : ""
      }
    })
  );

  return label;
}

function renderSelect(labelText, name, values) {
  const label = createElement("label", { text: labelText });
  const select = createElement("select", { attrs: { name } });

  for (const value of values) {
    select.append(createElement("option", { attrs: { value }, text: value }));
  }

  select.value = "normale";
  label.append(select);

  return label;
}

function renderTextarea(labelText, name, placeholder) {
  const label = createElement("label", { text: labelText });
  label.append(createElement("textarea", { attrs: { name, placeholder, rows: "4" } }));

  return label;
}

function renderTicketList(tickets) {
  const section = createElement("section", {
    className: "ticket-section",
    attrs: { "aria-labelledby": "open-tickets-title" }
  });
  const heading = createElement("div", { className: "section-heading" });
  const headingCopy = createElement("div");
  headingCopy.append(
    createElement("h1", { attrs: { id: "open-tickets-title" }, text: "Ticket aperti" }),
    createElement("p", { text: "Coda supporto attiva, ordinata per priorita' e ultimo aggiornamento." })
  );
  const count = createElement("span", { className: "ticket-count" });
  count.append(createElement("strong", { text: String(tickets.length) }), createElement("small", { text: "aperti" }));
  heading.append(headingCopy, count);

  const list = createElement("div", { className: "ticket-list" });
  for (const ticket of tickets) {
    list.append(renderTicketCard(ticket));
  }

  section.append(heading, list);

  return section;
}

function renderTicketCard(ticket) {
  const priority = ticket.priority.toLowerCase();
  const article = createElement("article", { className: `ticket-card ticket-card--${priority}` });
  const header = createElement("div", { className: "ticket-card__header" });
  header.append(
    createElement("span", { className: "ticket-card__id", text: ticket.id }),
    createElement("span", {
      className: `ticket-card__priority ticket-card__priority--${priority}`,
      text: ticket.priority
    })
  );

  const meta = createElement("div", { className: "ticket-card__meta" });
  meta.append(createElement("span", { text: ticket.customerName }), createElement("span", { text: `Aggiornato ${formatDate(ticket.updatedAt)}` }));

  const details = createElement("dl", { className: "ticket-card__details" });
  details.append(
    renderDetail("Area", ticket.area),
    renderDetail("Canale", ticket.sourceChannel),
    renderDetail("Campo derivato", "non ancora calcolato", "ticket-card__missing")
  );

  article.append(
    header,
    createElement("h2", { className: "ticket-card__title", text: ticket.title }),
    createElement("p", { className: "ticket-card__description", text: ticket.description }),
    meta,
    details
  );

  return article;
}

function renderDetail(term, value, valueClassName) {
  const wrapper = createElement("div");
  wrapper.append(createElement("dt", { text: term }), createElement("dd", { className: valueClassName, text: value }));

  return wrapper;
}

function renderState(message, className = "") {
  root.replaceChildren(createElement("p", { className: `state-message ${className}`.trim(), text: message }));
}

async function boot() {
  renderState("Caricamento ticket...");

  try {
    const [operator, options, tickets] = await Promise.all([
      fetchCurrentOperator(),
      fetchTicketOptions(),
      fetchOpenTickets()
    ]);
    renderShell(operator, options, tickets);
  } catch (error) {
    renderState(error.message, "state-message--error");
  }
}

boot();
