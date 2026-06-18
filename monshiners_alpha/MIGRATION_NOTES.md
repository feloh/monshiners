# Vue 3 Migration Notes

## Überblick

Dieses Projekt wurde von Vue 2 auf Vue 3 migriert. Die bestehende Ordnerstruktur und die Options-API-Komponenten wurden bewusst weitgehend beibehalten, um die funktionale Migration risikoarm zu halten.

## Geänderte Kern-Dependencies

- `vue` 2 -> 3
- `vue-router` 3 -> 4
- `vuex` 3 -> 4
- `vue-i18n` 8 -> 9 im Legacy-Modus
- `vuetify` 2 -> 3
- `contentful` 8 -> 10

## Vue-2-zu-Vue-3-Anpassungen

- `new Vue()` wurde durch `createApp()` ersetzt.
- Globale Properties werden über `app.config.globalProperties` registriert.
- Der globale Event-Bus wurde auf `mitt` umgestellt und mit `$on`, `$off` und `$emit` kompatibel gekapselt.
- Vue Router nutzt `createRouter()` und `createWebHistory()`.
- Catch-all-Routen wurden auf die Vue-Router-4-Syntax `/:pathMatch(.*)*` migriert.
- Vuex nutzt `createStore()`.
- Vue I18n nutzt `createI18n({ legacy: true })`, damit bestehende `$t`-Aufrufe weiter funktionieren.
- Contentful-Zugangsdaten wurden aus dem Quellcode entfernt und auf `VUE_APP_CONTENTFUL_*` Environment-Variablen umgestellt.

## Contentful

Die Contentful-Client-Erzeugung liegt zentral in `src/utils/api.js`. Zusätzlich stehen wiederverwendbare Wrapper für `fetchEntries()` und `fetchEntry()` mit einheitlicher Fehlerprotokollierung bereit. Bestehende Model-Funktionen können den Default-Client weiterverwenden und liefern dadurch dieselben Datenstrukturen wie bisher.

## Nicht direkt 1:1 migrierbare Elemente

- `vue-kinesis` ist Vue-2-orientiert. Als robuste Übergangslösung werden `KinesisContainer` und `KinesisElement` global als transparente Wrapper registriert, damit Inhalte erhalten bleiben. Empfehlung: Bei Bedarf auf eine Vue-3-kompatible Motion-/Parallax-Lösung umstellen.
- `@ecwid/sdk` konnte in dieser Umgebung nicht installiert werden. Die Warenkorb-Integration nutzt jetzt defensiv das globale `window.Ecwid`, falls das Ecwid-Script im Browser geladen ist. Empfehlung: Die produktive Ecwid-Einbindung im Browser manuell prüfen.
- `vue-meta` wurde entfernt. Die bisherigen `metaInfo`-Optionen werden von Vue 3 nicht automatisch ausgewertet. Empfehlung: bei Bedarf `@unhead/vue` oder eine ähnliche Vue-3-kompatible Head-Lösung ergänzen.
- Vuetify 3 enthält Breaking Changes gegenüber Vuetify 2. Es wurde die Plugin-Initialisierung migriert und ein `$vuetify.breakpoint`-Kompatibilitäts-Shim ergänzt. Einzelne visuelle Abweichungen müssen im Browser geprüft werden.

## Empfohlene manuelle Prüfungen

1. Homepage mit gesetzten Contentful-Environment-Variablen laden.
2. Altersabfrage und Weiterleitungen prüfen.
3. Navigation zu `/`, `/wersdas`, `/wasmachndie`, `/store`, `/impressum` und unbekannten URLs prüfen.
4. Contentful-Texte und Bilder mit dem Vue-2-Stand vergleichen.
5. Ecwid-Warenkorb und Checkout im Browser prüfen.
6. Responsive Layouts wegen Vuetify-3-Migration visuell prüfen.
