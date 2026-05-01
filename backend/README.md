# Backend Nest.js:lla

Minimaalinen NestJS-backend, joka voidaan kytkea paikalliseen MongoDB-konttiin.

## Setup

1. `npm install`
2. `Copy-Item .env.example .env`
3. `docker compose up -d`
4. `npm run start:dev`

## MongoDB

Projektissa on mukana `docker-compose.yml`, joka kaynnistaa paikallisen MongoDB-palvelun porttiin `27017`.

Sovellus lukee yhteysosoitteen muuttujasta `MONGO_URL`. Esimerkkiasetus loytyy tiedostosta `.env.example`.

Jos kaytat salasanan palautusta, tayta myos `MAIL_*`-muuttujat `.env`-tiedostoon.

Kontin tilan voit tarkistaa komennolla `docker compose ps`.
