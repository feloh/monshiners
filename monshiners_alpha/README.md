# Monshiners Alpha – Vue 3

Vue-3-Migration der Monshiners-Website. Die bestehende Struktur wurde weitgehend beibehalten, die App-Initialisierung, Router-, Store-, i18n-, Vuetify- und Contentful-Anbindung wurden auf Vue-3-kompatible APIs umgestellt.

## Setup

```bash
npm install
```

## Environment-Variablen

Lege lokal eine `.env.local` an. Zugangsdaten dürfen nicht ins Repository committed werden.

```bash
VUE_APP_CONTENTFUL_SPACE_ID=your_space_id
VUE_APP_CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
VUE_APP_CONTENTFUL_ENVIRONMENT=master
```

Siehe auch `.env.example`.

## Lokale Entwicklung

```bash
npm run serve
```

## Build

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Contentful-Anbindung

Die zentrale Contentful-Konfiguration befindet sich in `src/utils/api.js`. Der Client liest Space-ID, Delivery-API-Token und Environment aus `VUE_APP_CONTENTFUL_*` Variablen. Zusätzlich stellt die Datei `fetchEntries()` und `fetchEntry()` bereit, um zukünftige Datenabfragen mit einheitlicher Fehlerbehandlung zu bündeln.

## Migration

Details zur Vue-3-Migration, geänderten Dependencies, nicht direkt migrierbaren Bibliotheken und empfohlenen manuellen Prüfungen stehen in `MIGRATION_NOTES.md`.
