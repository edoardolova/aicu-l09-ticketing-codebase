# Codebase Reading Notes - L09

## Comportamento Osservato

- Operatore corrente: l’endpoint GET /api/me restituisce un operatore seedato
- Lista ticket: l’endpoint GET /api/tickets mostra ticket aperti con priorità, area, canale e stato
- Creazione ticket: l’endpoint POST /api/tickets è ancora uno stub e restituisce 501 NOT_IMPLEMENTED

## File Chiave

| File                                 | Perché è importante                                                     | Evidenza                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| server/index.js                      | Definisce gli endpoint principali e il flusso backend dell’app          | Qui sono presenti GET /api/me, GET /api/tickets e POST /api/tickets        |
| src/components/CreateTicketPanel.jsx | Contiene il form di creazione e mostra quali dati vengono raccolti oggi | Il form espone solo parte dei campi necessari rispetto ai dati del dominio |
| prisma/schema.prisma                 | Rappresenta il modello dati di riferimento per i ticket                 | Lo schema descrive campi come priority, area, sourceChannel e status       |

## Gap Osservati

| Area           | Gap                                                                        | Evidenza                                                 |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| Backend        | POST /api/tickets non è ancora implementato                                | L’endpoint restituisce 501 NOT_IMPLEMENTED               |
| Form           | Il form non raccoglie tutti i dati necessari per creare un ticket completo | area e sourceChannel non sono presenti nel form          |
| Campo derivato | responseDueAt e urgencyLabel non vengono calcolati dal server              | Il README segnala che questi valori sono ancora mancanti |

## Domanda per L10

- Come deve essere gestito il campo derivato responseDueAt: deve essere calcolato dal server e poi mostrato in UI, oppure lasciato solo al backend?
- Il campo sourceChannel deve essere inserito manualmente dall’utente o può essere derivato automaticamente?
- In che modo la UI dovrebbe mostrare i campi derivati come urgencyLabel o responseDueAt?
