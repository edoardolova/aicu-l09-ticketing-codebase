# AICU L09 - Ticketing Codebase Starter

Starter repo per la Lezione 09 del Modulo 03.

L'app e' volutamente semi-completa: una API Express espone operatore corrente, ticket aperti, opzioni ticket e uno stub di create; una UI runtime servita da Express mostra dashboard, operatore, form incompleto e lista ticket.

La repo serve a mostrare come entrare in una codebase reale prima di patchare:

```txt
runtime -> file chiave -> dati -> gap -> domanda per L10
```

## Interpretazione Del Task

In L09 non si chiude una feature.

Il task didattico e':

```txt
Leggere la codebase e individuare gap concreti.
```

## Stato Della Repo

Gia' presente:

- `GET /api/me` con operatore seedato;
- `GET /api/tickets` con ticket aperti;
- `GET /api/ticket-options`;
- dashboard con operatore, form create e lista ticket;
- `prisma/schema.prisma` come modello dati didattico.

Volutamente incompleto:

- `POST /api/tickets` risponde `501 NOT_IMPLEMENTED`;
- `responseDueAt` non viene calcolato;
- `urgencyLabel` non viene calcolata;
- il form create non usa ancora `area` e `sourceChannel`;
- Prisma Client non e' ancora collegato al runtime;
- SQLite `dev.db` non e' incluso.

## Campo Derivato Dal Server

Verticale didattica:

```txt
priority + area -> responseDueAt
```

`priority` e `area` sono dati raccolti o presenti nel dominio.

`responseDueAt` non deve essere deciso dal client: il server deve calcolarlo in modo coerente per tutti.

## Stack

- Node.js
- Express
- React file reading
- JavaScript

Non c'e' TypeScript.

Il runtime L09 non dipende da bundler, dev server frontend o configurazioni speciali: Express serve direttamente pagina, CSS, JavaScript runtime e API.

La cartella `prisma/` contiene uno schema didattico per spiegare Prisma/SQLite in L09. Il runtime usa ancora fixture in memoria in `server/data/`.

## Setup

Installa le dipendenze:

```bash
pnpm install
```

Avvia API e frontend runtime:

```bash
pnpm dev
```

Apri:

```txt
http://127.0.0.1:3001/
```

## Stati Da Verificare

Operatore corrente:

```txt
http://127.0.0.1:3001/api/me
```

Lista ticket:

```txt
http://127.0.0.1:3001/api/tickets
```

Opzioni:

```txt
http://127.0.0.1:3001/api/ticket-options
```

Create incompleto:

```txt
POST http://127.0.0.1:3001/api/tickets
```

Lo stub attuale restituisce `501 NOT_IMPLEMENTED`: e' un gap da osservare in L09 e da usare come ponte verso L10-L12.

## File Principali

```txt
server/index.js
server/data/tickets.js
server/data/operators.js
prisma/schema.prisma
src/App.jsx
src/api.js
src/components/CreateTicketPanel.jsx
src/components/TicketList.jsx
src/components/TicketCard.jsx
src/runtime-app.js
src/styles.css
```

Punti da osservare in L09:

```txt
GET /api/me
GET /api/tickets
GET /api/ticket-options
POST /api/tickets -> 501
prisma/schema.prisma
src/components/CreateTicketPanel.jsx
```

## Output L09

Alla fine della lezione devi produrre:

```txt
3 file chiave
2 gap concreti
1 domanda utile per L10
```

Esempio:

```txt
file: src/components/CreateTicketPanel.jsx
perche' e' importante: mostra quali dati la UI raccoglie oggi.

gap: il form non usa ancora area.
evidenza: /api/ticket-options espone areas, ma il form non ha una select area.

domanda: il campo derivato deve essere mostrato nella card o nel dettaglio?
```

## Consegna

Vedi anche `consegna.md`.

Compila una nota personale o usa `template/codebase-reading-notes.md`.

Formato minimo:

```txt
File chiave:
- ...
- ...
- ...

Gap:
- ...
- ...

Domanda per L10:
- ...
```

## Vincoli

- Non implementare durante L09.
- Non modificare API, Prisma o DB.
- Non chiedere all'AI una patch.
- Non aggiungere auth reale, owner avanzato, allegati, notifiche o dashboard.
- Non aggiungere migration, Prisma Client generato o SQLite `dev.db`.
- Non completare la UI di L10 o il backend di L11/L12.
- Non fare refactor generale.
- Non aggiungere bundler o configurazioni frontend extra.

## Build

Per preparare la build statica:

```bash
pnpm run build
```

Per servire la build con Express:

```bash
pnpm start
```
