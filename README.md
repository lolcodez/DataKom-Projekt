# DataKom

## Projektidé

Vi har valt att göra en system som hanterar bordsbokningar på Södermanland-Nerikes nation. Idag finns det ett bristfälligt system där allting sker manuellt, vi vill effektivisera detta med ett system. Gästerna kommer att lämna en bokning med special kost, antal och annan information i en formulär som är tänkt att integreras i www.snerikes.se. Därefter kommer detta sammanställas i en UI för heltidarna som placerar ut dessa genom drag and drop. När det kommit in x antal bokningar så att borden är slut för en tid ska det komma upp info om det. Det finns totalt 21 bord och en bokning får inte överlappa.
Saker som behöver testas är:
* Överlappande bokningar
* När bokningarna är fyllda
* Samtidiga bokningar
* När servern är nere och bokningarna ska återtas
* avbryta bokningar

Det som kommer demonstreras är en fungerande bordsbokning utan UI och detaljer. Den ska klara av att stoppa överlappande bokningar, samtidiga bokningar, avbryta bokningar och omstart av server.

### Bordsboknning

Formulär på hemsidan

Info om att samtliga måste ha nationskort, menyn.

Innehåll: Datum, tid (18:00, 18:30, 19:00, 19:30), namn, e-post, antal, ev. specialkost eller dyl. (kommentar).

Vid bokning, email till gästen med bekräftelse, om fullt skicka info om det.

Om bokning på mer än 8 pers måste maten förbokas (något snitsigt sätt) och bokningen måste bekräftas manuellt.

Sammanställ bokningar i en lista och därifrån enkelt kunna göra bordskartan (drag and drop eller lista typ)

Bordkartans innehåll: Tid, namn och antal personer. 21 st bord, + möjlighet för bryggan

### Filstruktur

```
project
├── build/
│       // Här hamnar kompilerade filer.
├── public/
│   │   // Innehåller (public & static) filer.
│   └── index.html
├── src/
│   │   // Innehåller (public) filer som kompileras med webpack/babel,
│   │   // kompilerade filer hamnar i `build/`.
│   ├── app.js
│   └── components/
│       │   // Innehåller filer som inkluderas från `src/`.
│       └── test.js
├── server.js // Huvudfilen, startar serven.
├── package.json // Innehåller meta-data och dependancies.
├── gulpfile.js // Gulp skript
├── .gitignore // Exkluderar filer från git.
├── .babelrc // Konfiguration för babel.
└── README.md
```

### Kommandon

Installera dependancies:  
`npm install`  
Kompilera projektet:  
`npm run build` eller `npm run devbuild`  
Starta servern:  
`npm start`  
Rensa kompilerade filer:  
`npm run clean`