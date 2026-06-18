# Monshiners Vue 3

Migrierter Vue-3-Stand der Monshiners-Webanwendung. Die bestehende Struktur (`src/views`, `src/components`, `src/store`, `src/models`) wurde weitgehend beibehalten.

## Setup

```bash
npm install
```

## Environment-Variablen

Lege lokal eine `.env.local` an. Contentful-Zugangsdaten werden nicht mehr hart codiert.

```bash
VUE_APP_CONTENTFUL_SPACE_ID=<space-id>
VUE_APP_CONTENTFUL_ACCESS_TOKEN=<delivery-token>
VUE_APP_CONTENTFUL_ENVIRONMENT=master
VUE_APP_ODOO_API_URL=<optional-shop-api-url>
VUE_APP_ODOO_API_TOKEN=<optional-shop-api-token>
```

## Kommandos

```bash
npm run serve
npm run build
npm run lint
```

## Contentful-Anbindung

Die zentrale Contentful-Service-Schicht liegt in `src/utils/api.js`. Alle Models nutzen weiterhin die vorhandenen Fetch-Methoden, erhalten aber eine gemeinsame Konfiguration, Fehlerbehandlung und Environment-basierte Credentials.
