'use strict';

let translations={};

function applyTranslations(locale) { /* ReqI3 */
 const dictionary = translations[locale];
 if (!dictionary) {
 console.warn(`Translations for "${locale}" not found.`);
 return;
 }
 /* ---- Text content ---- */
 document.querySelectorAll('[data-i18n]').forEach(element => {
 const key = element.dataset.i18n;
 const text = dictionary[key];
 if (text !== undefined) {
    element.innerHTML = text;
 }
 });
 /* ---- ALT attributes ---- */
 document.querySelectorAll('[data-i18n-alt]').forEach(element=> {
 const key = element.dataset.i18nAlt;
 if (dictionary[key]) element.alt = dictionary[key];
 });
 /* ---- TITLE attributes ---- */
 document.querySelectorAll('[data-i18ntitle]').forEach(element => {
 const key = element.dataset.i18nTitle;
 if (dictionary[key]) element.title = dictionary[key];
 });

 document.documentElement.lang = locale;
}


function switchLanguage(locale) { /* ReqI4 */  /* ReqI6 */
 applyTranslations(locale);
 applyDateFormat(locale);
 applyPriceFormat(locale);
 localStorage.setItem('preferredLanguage', locale);
}


(function initI18n() { /* ReqI5 */
    const i18nSelectors = [
        '[data-i18n]',
        '[data-i18n-alt]',
        '[data-i18n-title]',
        '[data-date]',
        '[data-price]',
        '#language-switcher'
    ].join(',');

    if (!document.querySelector(i18nSelectors)) {
        console.debug('i18n: no translatable elements or language control found — initialization skipped.');
        return;
    }   

    //rest of the code runs only if at least one i18n-related element is detected
    console.debug('i18n: translatable elements or language control detected — initializing.');

// Load translation file
fetch(new URL('./JS/i18n/translation.json', document.baseURI))  /* ReqI6 */
    .then(response => response.json())
    .then(data => {

        translations = data;

        // Retrieve saved language or default to English
        const savedLanguage =
            localStorage.getItem('preferredLanguage') || 'en';

        switchLanguage(savedLanguage);
    })
    .catch(error => {
        console.error('Failed to load translations:', error);
    });
    })(); // self-invoking function to run immediately on script load

    // switchLanguage('es'); // Default to Spanish on initial load



 function createDateFormatter(locale) { /* ReqI8 */
 // Map application locale to regional formatting rules
 const dateLocale = locale === 'es' ? 'es-ES' : 'en-GB';
 // Create and return a reusable formatter
 return new Intl.DateTimeFormat(dateLocale, {
 weekday: 'long', // full weekday name
 year: 'numeric', // four-digit year
 month: 'long', // full month name
 day: 'numeric' // day number
 });
}

 function formatDate(date, formatter) { /* ReqI8 */
 return formatter.format(date);
}

function applyDateFormat(locale) { /* ReqI8 */
 // Create formatter once (efficient and reusable)
 const formatter = createDateFormatter(locale);
 // Select all elements declaring a date
 const dateElements = document.querySelectorAll('[data-date]');
 dateElements.forEach(el => {
 // Read and sanitise the date string from HTML
 const dateStr = (el.dataset.date || '').trim();
 if (!dateStr) return;
 // Convert ISO string into a Date object
 const date = new Date(dateStr);
 // Defensive validation
 if (isNaN(date)) {
 console.error('Invalid date in data-date:', dateStr);
 el.textContent = 'Invalid date';
 return;
 }
 // Apply formatting
 el.textContent = formatDate(date, formatter);
 });
}

function createCurrencyFormatter(locale) { /*ReqI9*/

    // Map application locale to regional formatting rules
    const numberLocale = locale === 'es' ? 'es-ES' : 'en-GB';

    // Create and return a reusable currency formatter
    return new Intl.NumberFormat(numberLocale, {
        style: 'currency',
        currency: locale === 'es' ? 'EUR' : 'GBP',

        // Ensures consistent decimal behaviour
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatPrice(price, formatter) { /*ReqI9*/
    return formatter.format(price);
}

function applyPriceFormat(locale) { /*ReqI9*/

    // Create formatter once (efficient and reusable)
    const formatter = createCurrencyFormatter(locale);

    // Select all elements declaring a price
    const priceElements = document.querySelectorAll('[data-price]');

    priceElements.forEach(el => {

        // Read and sanitise the price value from HTML
        const priceStr = (el.dataset.price || '').trim();
        if (!priceStr) return;

        // Convert string into a number
        const price = Number(priceStr);

        // Defensive validation
        if (isNaN(price)) {
            console.error('Invalid price in data-price:', priceStr);
            el.textContent = 'Invalid price';
            return;
        }

        // Apply formatting
        el.textContent = formatPrice(price, formatter);
    });
}
 