# Project Work finale - PROGETTO CODE

**Progetto di realizzazione di un e-commerce in Node.js**

realizzato da: [Fabio Vallacqua](https://github.com/Gowater20), [Valeria Imbrogio Ponaro](https://github.com/IPVale) e [Dylan La Ferrera](https://github.com/Yomir00)

## Tecnologie utilizzate
 - `Javascript ` è stato utilizzato come linguaggio principale per lo sviluppo dell'e-commerce
 - `Typescript ` offre una maggiore manutenibilità del codice poiché implementa la tipizzazione statica consentendo di catturare errori di tipo
 - `Express.js ` è un framework web per Node.js che semplifica lo sviluppo di applicazioni web e API attraverso il suo sistema di routing
    middleware e gestione degli errori
 - `MongoDB ` è un database NoSQL flessibile e scalabile, orientato ai documenti, che offre una struttura dati dinamica e potenti capacità di
    query

La combinazione JavaScript, TypeScript, Express.js e MongoDB offre una soluzione completa;
consente di avere un'applicazione performante, scalabile e facile da modificare

## Funzionalita' implementate
### UTENTI
Creazione e registrazione profilo utente
Campi richiesti: nome, cognome, email e password

*APIautenticazione (authApi)* viene assegnato un "role" per la gestione delle autorizzazioni
del profilo, utilizziamo un sistema di autenticazione per garantire gli utenti
registrati possano accedere ad alcune funzionalità.

### PRODOTTI
Poter aggiungere, modificare, eliminare un prodotto
Campi richiesti: nome, marchio, prezzo

*APIprodotto (productApi)* è possibile visualizzare tutti i prodotti con un GETALL, gli utenti admin
possono aggiungere, modificare le informazioni ed eliminare un nuovo prodotto

### ORDINI
Per la creazione, aggiornamento, eliminazione di un ordine
Campi richiesti: dati utente (nome, cognome, email, password)

*APIordini (orderApi)*
funzionalità utenti admin: aggiornamento dello stato dell'ordine esistente e cancellare l'ordine
funzionalità utenti: visualizzare lo storico ordini, creazione di un nuovo ordine

### CARRELLO
Consente di aggiungere, rimuove, svuotare il carrello

*APIcarrello (cartApi)* restituisce i dettagli di ogni prodotto acquistato, si può aggiungere, modificare ed eliminare un prodotto

# FRUIBILITA'
- Il file .env per gestire le variabili d'ambiente utilizzate in questo progetto;
- La cartella Test Api consente di effettuare un test delle *rotte*, sopra elencate, presenti nel progetto

# Funzionalità mancanti all'ultima modifica
- Gestione utenti
    - [ ] Registrazione admin
    - [ ] Gestione utente loggato
- Gestione carrello
    - [ ] Recuperare id utente dal JWT token in tutte le rotte
- Gestioni ordini
    - [ ] Creazione dell'ordine
    - [ ] Recupero di un ordine tramite id
    - [ ] Aggiornamento dello stato dell'ordine
