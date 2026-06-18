# Vue-3-Migrationsnotizen

## Migrationsübersicht

- Vue 2 wurde auf Vue 3 migriert; die App startet über `createApp()`.
- Vue Router 3 wurde auf Vue Router 4 migriert und die History-/Catch-all-Routen wurden angepasst.
- Vuex 3 wurde auf Vuex 4 migriert, um das bestehende Options-API-Pattern risikoarm beizubehalten.
- Vue I18n 8 wurde auf Vue I18n 9 im Legacy-Modus migriert, damit `$t()` und die vorhandenen Übersetzungen erhalten bleiben.
- Vuetify 2 wurde auf Vuetify 3 aktualisiert. Die bestehende Template-Struktur wurde möglichst unverändert übernommen.
- Contentful-Credentials wurden aus dem Quellcode entfernt und in Environment-Variablen verlagert.

## Geänderte Dependencies

- `vue` -> 3.x
- `vue-router` -> 4.x
- `vuex` -> 4.x
- `vue-i18n` -> 9.x
- `vuetify` -> 3.x
- `@vue/cli-service` und Vue-CLI-Plugins -> 5.x
- `@vue/compiler-sfc` hinzugefügt
- `mitt` hinzugefügt als Vue-3-kompatibler Event-Bus-Ersatz

## Nicht direkt migrierbare Elemente

- `vue-kinesis` ist nicht Vue-3-kompatibel. Es wurde eine robuste Passthrough-Komponente als Ersatz registriert, damit Inhalte weiter gerendert werden. Empfehlung: später durch eine Vue-3-kompatible Motion-/Parallax-Bibliothek ersetzen.
- `vue-meta` ist für Vue 3 nicht direkt kompatibel. Eine kleine lokale Meta-Bridge setzt aktuell Dokumenttitel und HTML-Attribute aus `metaInfo`. Empfehlung: bei größerem SEO-Bedarf `@vueuse/head` integrieren.
- Vuetify-2-spezifische Props/Klassen werden von Vuetify 3 teilweise nur kompatibel oder gar nicht interpretiert. Die wichtigsten Legacy-Textfarben wurden als CSS-Fallback ergänzt. Manuelle UI-Prüfung empfohlen.

## Contentful

- Zentrale Service-Schicht: `src/utils/api.js`
- Benötigte Variablen: `VUE_APP_CONTENTFUL_SPACE_ID`, `VUE_APP_CONTENTFUL_ACCESS_TOKEN`, optional `VUE_APP_CONTENTFUL_ENVIRONMENT`
- Fetch-Fehler werden zentral geloggt und weitergeworfen, damit Komponenten/Stores sie künftig gezielt als Loading-/Error-State behandeln können.

## Empfohlene manuelle Prüfungen

- Age-Gate und Cookie-Weiterleitung
- Homepage-Rendering mit echten Contentful-Credentials
- Sprachumschaltung und erneuter Contentful-Abruf
- Store/Odoo-Produkte mit echter API-Konfiguration
- Responsive Layouts nach Vuetify-3-Upgrade
