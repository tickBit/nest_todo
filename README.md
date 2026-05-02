# Yksinkertainen TODO app Nest.js backendillä

Ajatuksena ollut testata tehdä Nest.js:llä backend ja jonkinlainen frontend sille.

Tässä ei ole "oikeaa" tietokantaa, in-memory tietokanta vain.

## Asennus ja käynnistys

Tarvitaan riittävän uusi Node.js versio. Varminta on asentaa uusin.

NestJS pitää olla globaalisti asennettuna [https://docs.nestjs.com/].

### Backend

Asenna ja käynnistä ensin backend.

- mene backend hakemistoon

`npm install`

1. `npm install`
2. `npm run start:dev`

Nämä on myös periaattessa tarkoitettu tehtävän.

3. `cd ..`
4. `git config core.hooksPath .husky`

Tämän jälkeen aina ennen commit'ia ajetaan testit.

Tuo .husky-juttu siis ajetaan ihan projektin juuresta.

### Frontend

- mene frontend-hakemistoon

1. `npm install`
2. `npm run dev`

![todo](https://github.com/user-attachments/assets/8b792371-b6ba-47ff-ae2b-c86fca52b3a1)

