const scriptFlow = {
    start: {
        id: 'start',
        type: 'speech',
        path: 'Początek rozmowy',
        title: '1. Powitanie',
        content: `Dzień dobry Panie Kazimierzu, z tej strony <strong>[TWOJE IMIĘ]</strong>...`,
        pause: 'Czekasz na odpowiedź klienta...',
        next: 'check_answer'
    },

    check_answer: {
        id: 'check_answer',
        type: 'choice',
        path: 'Początek rozmowy → Reakcja klienta',
        title: 'Klient odpowiada?',
        question: 'Czy klient odpowiedział na powitanie?',
        choices: [
            {
                id: 'yes',
                label: '✅ TAK - Odpowiedział',
                description: 'Klient się odezwał i reaguje',
                next: 'introduce_purpose'
            },
            {
                id: 'no',
                label: '❌ NIE - Cisza',
                description: 'Brak reakcji, trzeba ponowić próbę',
                next: 'no_answer_retry'
            }
        ]
    },

    no_answer_retry: {
        id: 'no_answer_retry',
        type: 'speech',
        path: 'Początek rozmowy → Brak odpowiedzi → Ponowna próba',
        title: 'Ponowna próba kontaktu',
        content: `Halo, słyszymy się? Halo jest tam kto?`,
        info: {
            type: 'warning',
            title: '⚠️ Wskazówka',
            text: 'Jeśli nadal brak odpowiedzi, rozważ pozostawienie wiadomości lub próbę w innym terminie.'
        },
        next: 'introduce_purpose'
    },

    introduce_purpose: {
        id: 'introduce_purpose',
        type: 'speech',
        path: 'Przedstawienie celu',
        title: '2. Wprowadzenie',
        content: `Numer mam z naszej bazy danych, mieliśmy już kiedyś kontakt. Czy znajdziemy <strong>TERAZ 2-3 minuty</strong> na rozmowę i od razu mówię z czym dzwonię.`,
        pause: 'Krótka pauza, pozwól klientowi się wypowiedzieć...',
        additionalContent: `Mamy akcję informacyjną na województwo <strong>[WOJEWÓDZTWO]</strong> i umawiam darmową konsultację z doradcą technicznym.`,
        next: 'client_has_time'
    },

    client_has_time: {
        id: 'client_has_time',
        type: 'choice',
        path: 'Przedstawienie celu → Dostępność klienta',
        title: 'Czy klient ma czas?',
        question: 'Jak zareagował klient na propozycję rozmowy?',
        choices: [
            {
                id: 'has_time',
                label: '✅ Ma czas teraz',
                description: 'Klient chce rozmawiać, kontynuuj',
                next: 'introduce_topic'
            },
            {
                id: 'no_time',
                label: '⏰ Nie ma czasu',
                description: 'Klient jest zajęty',
                next: 'schedule_callback'
            },
            {
                id: 'not_interested',
                label: '❌ Nie jest zainteresowany',
                description: 'Klient nie wyraża zainteresowania',
                next: 'handle_objection'
            }
        ]
    },

    schedule_callback: {
        id: 'schedule_callback',
        type: 'input',
        path: 'Brak czasu → Ustalenie terminu zwrotnego',
        title: 'Umówienie rozmowy zwrotnej',
        content: `Rozumiem, że teraz nie jest najlepszy moment. Kiedy mogę oddzwonić?`,
        inputs: [
            {
                id: 'callback_date',
                label: 'Data oddzwonienia',
                type: 'date'
            },
            {
                id: 'callback_time',
                label: 'Preferowana godzina',
                type: 'time'
            }
        ],
        next: 'end_callback'
    },

    end_callback: {
        id: 'end_callback',
        type: 'final',
        path: 'Zakończenie - oddzwonienie',
        title: 'Potwierdzenie terminu',
        content: `Świetnie! Oddzwonię <strong>[DATA]</strong> o godzinie <strong>[GODZINA]</strong>. Dziękuję i do usłyszenia!`,
        summary: 'Zaplanowano rozmowę zwrotną'
    },

    handle_objection: {
        id: 'handle_objection',
        type: 'speech',
        path: 'Brak zainteresowania → Obsługa obiekcji',
        title: 'Reagowanie na brak zainteresowania',
        content: `Rozumiem. Chciałbym tylko wspomnieć, że to dotyczy nadchodzących zmian w taryfach energetycznych, które mogą wpłynąć na Pana rachunki. To tylko 2 minuty informacji.`,
        next: 'second_chance'
    },

    second_chance: {
        id: 'second_chance',
        type: 'choice',
        path: 'Obsługa obiekcji → Druga szansa',
        title: 'Reakcja po obiekcji',
        question: 'Czy klient zmienił zdanie?',
        choices: [
            {
                id: 'yes_continue',
                label: '✅ Zgadza się wysłuchać',
                description: 'Klient jest otwarty na kontynuację',
                next: 'introduce_topic'
            },
            {
                id: 'still_no',
                label: '❌ Nadal nie jest zainteresowany',
                description: 'Klient odmawia',
                next: 'polite_end'
            }
        ]
    },

    polite_end: {
        id: 'polite_end',
        type: 'final',
        path: 'Zakończenie - odmowa',
        title: 'Grzeczne zakończenie',
        content: `Rozumiem. Gdyby zmienił Pan zdanie, zapraszam do kontaktu. Życzę miłego dnia!`,
        summary: 'Rozmowa zakończona - klient nie zainteresowany'
    },

    introduce_topic: {
        id: 'introduce_topic',
        type: 'speech',
        path: 'Temat główny → Taryfy dynamiczne',
        title: '3. Wprowadzenie tematu',
        content: `O skaczących cenach prądu nie muszę wspominać, bo wszyscy o tym wiedzą, ale zagrożeniem mogą się okazać <strong>taryfy dynamiczne</strong>, o których otwarcie mówi nasz minister energetyki Miłosz Motyka.`,
        additionalContent: `Tauron i PGE już wysyłają listy informacyjne.`,
        next: 'ask_about_letter'
    },

    ask_about_letter: {
        id: 'ask_about_letter',
        type: 'choice',
        path: 'Taryfy dynamiczne → Listy informacyjne',
        title: 'Pytanie o pismo',
        question: 'Czy Pan/Pani dostał takie pismo od dostawcy energii?',
        choices: [
            {
                id: 'got_letter',
                label: '✅ TAK - Dostałem pismo',
                description: 'Klient otrzymał informację od dostawcy',
                next: 'discuss_letter'
            },
            {
                id: 'no_letter',
                label: '❌ NIE - Nie dostałem',
                description: 'Klient nie otrzymał jeszcze pisma',
                next: 'explain_why_calling'
            }
        ]
    },

    discuss_letter: {
        id: 'discuss_letter',
        type: 'speech',
        path: 'Otrzymał pismo → Dyskusja',
        title: 'Rozmowa o piśmie',
        content: `Co o tym piśmie Pan myśli?`,
        pause: 'Wysłuchaj opinii klienta...',
        info: {
            type: 'info',
            title: '💡 Wskazówka',
            text: 'Niezależnie od odpowiedzi, podkreśl wagę tematu i przejdź do propozycji wartości.'
        },
        next: 'explain_protection'
    },

    explain_why_calling: {
        id: 'explain_why_calling',
        type: 'speech',
        path: 'Nie otrzymał pisma → Wyjaśnienie',
        title: 'Wyjaśnienie powodu kontaktu',
        content: `No właśnie dlatego do Pana dzwonimy, bo dla wszystkich to jest nowość. Część osób już się zabezpiecza, a część w ogóle się tym nie interesuje, co może skutkować niespodziankami przy rachunkach.`,
        next: 'explain_protection'
    },

    explain_protection: {
        id: 'explain_protection',
        type: 'speech',
        path: 'Propozycja wartości',
        title: '4. Korzyści ze spotkania',
        content: `W Pana przypadku nie musi tak być, ponieważ z ramienia <strong>Ecofundacji</strong> proponuję spotkanie informacyjne z doradcą, który:`,
        benefits: [
            'Wytłumaczy nadchodzące zmiany w taryfach',
            'Zerknie do licznika i sprawdzi jego poprawność',
            'Sprawdzi instalację fotowoltaiczną (jeżeli jest)',
            'Udzieli przydatnych informacji o użytkowaniu sprzętu domowego',
            'Pomoże zoptymalizować zużycie energii'
        ],
        additionalContent: `Ja umawiając kolejne spotkanie wypełniam założenia akcji o poinformowaniu największej liczby osób.`,
        next: 'ask_for_meeting'
    },

    ask_for_meeting: {
        id: 'ask_for_meeting',
        type: 'choice',
        path: 'Propozycja → Umówienie spotkania',
        title: '5. Propozycja spotkania',
        question: 'Zatem czy w dniu jutrzejszym znajdzie Pan około 30-40 minut na spotkanie?',
        choices: [
            {
                id: 'yes_tomorrow',
                label: '✅ TAK - Jutro pasuje',
                description: 'Klient zgadza się na spotkanie jutro',
                next: 'schedule_meeting'
            },
            {
                id: 'not_tomorrow',
                label: '📅 Inny termin',
                description: 'Klient proponuje inną datę',
                next: 'alternative_date'
            },
            {
                id: 'no_meeting',
                label: '❌ Nie chcę spotkania',
                description: 'Klient odmawia spotkania',
                next: 'offer_callback'
            }
        ]
    },

    schedule_meeting: {
        id: 'schedule_meeting',
        type: 'input',
        path: 'Umówienie → Jutro',
        title: 'Ustalenie szczegółów spotkania',
        content: `Świetnie! Zapisuję spotkanie na jutro.`,
        inputs: [
            {
                id: 'meeting_time',
                label: 'Godzina spotkania',
                type: 'time'
            }
        ],
        next: 'verify_address'
    },

    alternative_date: {
        id: 'alternative_date',
        type: 'input',
        path: 'Umówienie → Inny termin',
        title: 'Alternatywny termin',
        content: `Rozumiem. Kiedy byłby Pan dostępny?`,
        inputs: [
            {
                id: 'meeting_date',
                label: 'Data spotkania',
                type: 'date'
            },
            {
                id: 'meeting_time',
                label: 'Godzina spotkania',
                type: 'time'
            }
        ],
        next: 'verify_address'
    },

    offer_callback: {
        id: 'offer_callback',
        type: 'choice',
        path: 'Odmowa spotkania → Kontakt doradcy',
        title: 'Alternatywna opcja',
        question: 'Ok, rozumiem. W takim razie czy mam zielone światło do przekazania kontaktu do doradcy, żeby zadzwonił do Pana/Pani i porozmawiał?',
        choices: [
            {
                id: 'yes_callback',
                label: '✅ TAK - Niech zadzwoni doradca',
                description: 'Zgoda na kontakt od doradcy',
                next: 'verify_address'
            },
            {
                id: 'no_contact',
                label: '❌ NIE - Nie chcę kontaktu',
                description: 'Całkowita odmowa',
                next: 'polite_end'
            }
        ]
    },

    verify_address: {
        id: 'verify_address',
        type: 'input',
        path: 'Weryfikacja danych',
        title: '6. Potwierdzenie adresu',
        content: `Potrzebuję jeszcze potwierdzić adres, żeby przypisać do Pana/Pani odpowiedniego doradcę, oraz muszę uszczegółowić parę informacji dla doradcy.`,
        inputs: [
            {
                id: 'street',
                label: 'Ulica i numer',
                type: 'text',
                placeholder: 'np. Kwiatowa 15'
            },
            {
                id: 'city',
                label: 'Miasto',
                type: 'text',
                placeholder: 'np. Warszawa'
            },
            {
                id: 'postal',
                label: 'Kod pocztowy',
                type: 'text',
                placeholder: 'np. 00-001'
            }
        ],
        next: 'additional_questions'
    },

    additional_questions: {
        id: 'additional_questions',
        type: 'input',
        path: 'Dodatkowe informacje',
        title: '7. Dodatkowe pytania',
        content: `Jeszcze kilka pytań dla doradcy:`,
        inputs: [
            {
                id: 'has_solar',
                label: 'Czy posiada Pan instalację fotowoltaiczną?',
                type: 'select',
                options: ['Tak', 'Nie', 'Planuję']
            },
            {
                id: 'energy_provider',
                label: 'Obecny dostawca energii',
                type: 'select',
                options: ['Tauron', 'PGE', 'Enea', 'Energa', 'Inny']
            },
            {
                id: 'phone',
                label: 'Numer telefonu kontaktowego',
                type: 'tel',
                placeholder: '+48 123 456 789'
            }
        ],
        next: 'final_confirmation'
    },

    final_confirmation: {
        id: 'final_confirmation',
        type: 'final',
        path: 'Zakończenie - sukces',
        title: '8. Potwierdzenie i pożegnanie',
        content: `Dziękuję bardzo za rozmowę. Wszystkie informacje zostały zapisane. Do usłyszenia i miłego dnia!`,
        summary: 'Rozmowa zakończona sukcesem - spotkanie umówione / kontakt przekazany',
        successMessage: '🎉
