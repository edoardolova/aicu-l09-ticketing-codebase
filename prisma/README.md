# Prisma / SQLite Draft

Questa cartella e' presente per la lettura guidata L09.

Lo starter non usa ancora Prisma Client a runtime: `schema.prisma` serve a mostrare il data model e il punto in cui, nelle lezioni successive, il backend potra' collegarsi a SQLite.

## File Da Mostrare In L09

- `schema.prisma` - modelli `Operator` e `Ticket`.
- `dev.db` - file SQLite locale previsto dal datasource, non incluso nello starter.

## Campo Derivato Dal Server

Nel modello `Ticket` esiste `responseDueAt`.

In L09 non lo calcoliamo ancora. Lo usiamo per spiegare che alcuni valori non devono arrivare gia' pronti dal client.

Formula didattica:

```txt
priority + area -> responseDueAt
```

## Gap Didattico

Il runtime oggi usa fixture in memoria in `server/data/`.

In L09 questo e' un gap utile da osservare:

```txt
schema presente
-> dati seedati in memoria
-> create incompleto
-> persistenza reale da chiudere piu' avanti
```

Non aggiungere migration o client generato durante L09.
