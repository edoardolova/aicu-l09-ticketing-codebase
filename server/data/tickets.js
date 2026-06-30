export const tickets = [
  {
    id: "TCK-1048",
    title: "Errore nel download della fattura",
    description: "Il cliente segnala errore 500 durante il download della fattura.",
    requesterEmail: "mario.rossi@example.com",
    customerName: "Studio Verdi",
    priority: "alta",
    area: "billing",
    sourceChannel: "email",
    status: "open",
    createdByOperatorId: "op-001",
    createdAt: "2026-06-18T13:50:00.000Z",
    updatedAt: "2026-06-18T14:35:00.000Z"
  },
  {
    id: "TCK-1051",
    title: "Richiesta accesso nuovo operatore",
    description: "Il team supporto ha ricevuto richiesta di abilitare un nuovo operatore.",
    requesterEmail: "support@example.com",
    customerName: "Boolean Support",
    priority: "normale",
    area: "auth",
    sourceChannel: "telefono",
    status: "open",
    createdByOperatorId: "op-001",
    createdAt: "2026-06-19T08:55:00.000Z",
    updatedAt: "2026-06-19T09:10:00.000Z"
  },
  {
    id: "TCK-1054",
    title: "Notifica email non ricevuta",
    description: "Il cliente non riceve email di conferma dopo la richiesta.",
    requesterEmail: "helpdesk@deltaservice.example",
    customerName: "Delta Service",
    priority: "bassa",
    area: "prodotto",
    sourceChannel: "chat",
    status: "open",
    createdByOperatorId: "op-001",
    createdAt: "2026-06-19T11:20:00.000Z",
    updatedAt: "2026-06-19T11:42:00.000Z"
  }
];

export const allowedPriorities = ["alta", "normale", "bassa"];

export const allowedAreas = ["auth", "billing", "prodotto"];

export const allowedSourceChannels = ["telefono", "email", "chat"];
