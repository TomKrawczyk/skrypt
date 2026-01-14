// Dane slajdów
const slidesData = {
    totalSlides: 8,
    slides: [
        {
            number: 1,
            title: "Powitanie"
        },
        {
            number: 2,
            title: "Przedstawienie Celu"
        },
        {
            number: 3,
            title: "Wprowadzenie Tematu"
        },
        {
            number: 4,
            title: "Reakcja na Odpowiedź"
        },
        {
            number: 5,
            title: "Propozycja Wartości"
        },
        {
            number: 6,
            title: "Umówienie Spotkania"
        },
        {
            number: 7,
            title: "Weryfikacja Danych"
        },
        {
            number: 8,
            title: "Zakończenie"
        }
    ]
};

// Eksport danych
if (typeof module !== 'undefined' && module.exports) {
    module.exports = slidesData;
}