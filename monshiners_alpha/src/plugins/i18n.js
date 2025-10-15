import { createI18n } from 'vue-i18n'

const messages = {
    de:{
        lng: {
            language: 'Sprache',
            de: 'Deutsch',
            plt: 'Platt'
        },
        ageConfirmation: {
            o18: 'Ich bin über 18 Jahre alt.',
            u18: 'Ich bin unter 18 Jahre alt.'
        },
        consent: {
            text: 'Mit dem Fortsetzen des Besuchs dieser Website akzeptierst du die Verwendung von Cookies. Für mehr Informationen , ließ  bitte die Datenschutzerklärung. Du kannst erst scrollen, wenn du zugestimmt hast.'
        },
        redirect: {
            text: 'Du bist leider noch nicht alt genug, um unser Produkt genießen zu dürfen. Aber keine Sorge, bald gibt es von Onkel Gerd leckeren Apfelsaft und Produkte ohne Alkohol. Warum Alkohol an sich eh nicht so doll ist, erfährst du über den Link weiter unten.',
            link: 'Erfahre hier mehr'
        },
        catch: {
            text: 'Ohje, das ist was schief gegangen.',
            btn: 'Auf den Schreck erstmal einen Schnaps.'
        },
        contact: {
            title: 'Kontakt'
        },
        home:{

            btn: 'Jetzt einkaufen',
            year: 'Unser Jahr',
            quote: 'Drenk ne klore Schabau, dä hält op Johre!   ',
            imprint: 'Impressum',
            social: 'Kannst\'e nicht genug von uns bekommen? Folg uns hier:',
            privacy: 'Datenschutz',
            contact: 'Kontakt',
            about_subtitle: 'Hä wer?',
            about: 'Die schnellsten Treckerfahrer der Stadt. Geistreiche Trinker und  Obstbauern aus Leidenschaft. Wir zeigen euch, was die Monheimer Natur zu bieten hat und warum man sie auf jeden Fall schützen und pflegen sollte. Ehrlich und grade soll unser Werk sein, vom Baumschnitt bis zum Abfüllen versuchen wir alles selber zu machen. Wenn es nicht anders geht, dann lassen wir die Profis ran. Das ist erst der Anfang...',
            aboutUs: 'Über uns',
            shop: 'Shop',
            products: 'Unser Zeug'
        },
    },
    pl:{
        lng: {
            language: 'Sproch',
            de: 'Huhdeutsch',
            plt: 'Muttersproch'
        },
        ageConfirmation: {
            o18: 'Ich bin över 18 Johr.',
            u18: 'Ich bin keine 18 Johr ald.'
        },
        consent: {
            text: 'Mit dem Fortsetzen des Besuchs dieser Website akzeptierst du die Verwendung von Cookies. Für mehr Informationen , ließ  bitte die Datenschutzerklärung. Du kannst erst scrollen, wenn du zugestimmt hast.'
        },
        redirect: {
            text: 'Du bes leider noch nit ald genog, öm uns Gedöns geneeße ze dörfe. Ävver maat dir keen Kopp, baal gitt et vum Ohm Gerd lecker Appelsaff un mih. Warum do den Alkohol an för sich eh us dem Kopp lasse sollts, erfährst do üvver den Link wigger unge.',
            link: 'Erfahr\' hier mih'
        },
        catch: {
            text: 'Wat ne Driss, dö hätt jet nit jeklappt.',
            btn: 'För de Schreck eens eine Schabau.'
        },
        contact: {
            title: 'Kontakt'
        },
        home:{
            btn: 'Jetz enkaufe',
            year: 'Ons Johr',
            quote: 'Drenk ne klore Schabau, dä hält op Johre!   ',
            social: 'Häste noch nit genog? Folg\' uns hee:',
            imprint: 'Impressum',
            privacy: 'Datenschutz',
            contact: 'Kontakt',
            about_subtitle: 'Wä is dat dann?',
            about: 'Die pflücksten Treckerfahrer dä Stadt. Gewetze Suffpatrone un  Obsbuure us Leidenschaft. Mir zeige üch, wat de Monhemer Natur usmät un woröm mer se op jeden Fall schötze un fläge soll. Ihrlich un grad soll uns Werk sin, vum Bäumschnigge bes zum Affölle verzöke mir selvs  ze maache. Wenn et nit anders geiht, dann lasse mir die Profis ran. Dat is eets dä Aanfang...'
        },
    }
}


const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'de',
    messages
})

export default i18n
