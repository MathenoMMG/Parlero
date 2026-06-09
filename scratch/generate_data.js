const fs = require('fs');
const path = require('path');

// 1. MILESTONES DATA
const milestones = [
  {
    id: 1,
    title: "I Tempi Verbali",
    description: "Presente, passato prossimo, imperfetto, futuro e condizionale",
    grammar: [
      {
        title: "Presente Indicativo",
        content: "Se usa para acciones habituales, verdades generales o el presente continuo. Los verbos se dividen en -are, -ere, -ire.",
        examples: [
          { it: "Marco fa sempre colazione alle 7.", es: "Marco siempre desayuna a las 7." },
          { it: "Noi viviamo in una casa grande.", es: "Nosotros vivimos en una casa grande." }
        ]
      },
      {
        title: "Passato Prossimo",
        content: "Para acciones pasadas terminadas y delimitadas. Se forma con el auxiliar ESSERE o AVERE en presente + participio pasado del verbo.",
        examples: [
          { it: "Ieri ho comprato un libro.", es: "Ayer compré un libro." },
          { it: "Anna è uscita con gli amici.", es: "Anna salió con sus amigos." }
        ]
      },
      {
        title: "Imperfetto vs Passato Prossimo",
        content: "El Imperfetto describe acciones habituales en el pasado, descripciones o estados continuos. El Passato Prossimo indica eventos puntuales e interrupciones.",
        examples: [
          { it: "Mentre mangiavo, ha telefonato Marco.", es: "Mientras comía, llamó Marco." },
          { it: "Da bambino giocavo sempre al parco.", es: "De niño jugaba siempre en el parque." }
        ]
      },
      {
        title: "Futuro Semplice & Condizionale",
        content: "El Futuro indica planes futuros o predicciones. El Condizionale se usa para deseos, cortesía ('vorrei') o hipótesis.",
        examples: [
          { it: "Domani andremo al mare.", es: "Mañana iremos al mar." },
          { it: "Vorrei un caffè, per favore.", es: "Querría un café, por favor." }
        ]
      }
    ],
    vocabulary: [
      { word: "mangiare", translation: "comer", category: "Verbos" },
      { word: "andare", translation: "ir", category: "Verbos" },
      { word: "fare", translation: "hacer", category: "Verbos" },
      { word: "giocare", translation: "jugar", category: "Verbos" },
      { word: "prendere", translation: "tomar/coger", category: "Verbos" },
      { word: "svegliarsi", translation: "despertarse", category: "Riflessivi" },
      { word: "divertirsi", translation: "divertirse", category: "Riflessivi" },
      { word: "ieri", translation: "ayer", category: "Tempo" },
      { word: "domani", translation: "mañana", category: "Tempo" }
    ]
  },
  {
    id: 2,
    title: "La Casa",
    description: "Stanze della casa, mobili, elettrodomestici e preposizioni di luogo",
    grammar: [
      {
        title: "C'è e Ci sono",
        content: "C'è se usa para singular (hay una cosa). Ci sono se usa para plural (hay varias cosas).",
        examples: [
          { it: "In cucina c'è un frigorifero grande.", es: "En la cocina hay una nevera grande." },
          { it: "Nella stanza ci sono due sedie.", es: "En la habitación hay dos sillas." }
        ]
      },
      {
        title: "Preposizioni di Luogo",
        content: "Para describir dónde están los objetos: sopra (encima), sotto (debajo), davanti a (delante de), dietro (detrás), accanto a (al lado de).",
        examples: [
          { it: "Il libro è sul tavolo.", es: "El libro está sobre la mesa." },
          { it: "La sedia è vicino al letto.", es: "La silla está cerca de la cama." }
        ]
      }
    ],
    vocabulary: [
      { word: "la cucina", translation: "la cocina", category: "Stanze" },
      { word: "il soggiorno", translation: "el salón", category: "Stanze" },
      { word: "il bagno", translation: "el baño", category: "Stanze" },
      { word: "la camera da letto", translation: "el dormitorio", category: "Stanze" },
      { word: "il tavolo", translation: "la mesa", category: "Mobili" },
      { word: "la sedia", translation: "la silla", category: "Mobili" },
      { word: "il divano", translation: "el sofá", category: "Mobili" },
      { word: "il frigorifero", translation: "la nevera", category: "Elettrodomestici" },
      { word: "la lavatrice", translation: "la lavadora", category: "Elettrodomestici" }
    ]
  },
  {
    id: 3,
    title: "I Pronomi",
    description: "Pronomi diretti, indiretti e combinati",
    grammar: [
      {
        title: "Pronomi Diretti",
        content: "Reemplazan al objeto directo (¿qué? o ¿a quién?). Formas átonas principales: mi, ti, lo, la, ci, vi, li, le.",
        examples: [
          { it: "Vedi Maria? Sì, la vedo.", es: "¿Ves a Maria? Sí, la veo." },
          { it: "Compri i giornali? Sì, li compro.", es: "¿Compras los periódicos? Sí, los compro." }
        ]
      },
      {
        title: "Pronomi Indiretti",
        content: "Reemplazan al objeto indirecto (¿a quién? con preposición 'a'). Formas átonas: mi, ti, gli (a él/ellos), le (a ella), ci, vi, gli/loro.",
        examples: [
          { it: "Telefoni a Maria? Sì, le telefono stasera.", es: "¿Llamas a Maria? Sí, le llamo esta noche." },
          { it: "Scrivi a Marco? Sì, gli scrivo un'email.", es: "¿Le escribes a Marco? Sí, le escribo un correo." }
        ]
      },
      {
        title: "Passato Prossimo con Pronomi Diretti",
        content: "Cuando usamos lo, la, li, le con passato prossimo, el participio pasado debe concordar en género y número con el pronombre.",
        examples: [
          { it: "Hai visto le ragazze? Sì, le ho viste.", es: "¿Has visto a las chicas? Sí, las he visto." },
          { it: "Hai comprato il pane? Sì, l'ho comprato.", es: "¿Has comprado el pan? Sí, lo he comprado." }
        ]
      }
    ],
    vocabulary: [
      { word: "telefonare", translation: "telefonear/llamar", category: "Verbi" },
      { word: "scrivere", translation: "escribir", category: "Verbi" },
      { word: "regalare", translation: "regalar", category: "Verbi" },
      { word: "dire", translation: "decir", category: "Verbi" },
      { word: "vedere", translation: "ver", category: "Verbi" },
      { word: "ascoltare", translation: "escuchar", category: "Verbi" }
    ]
  },
  {
    id: 4,
    title: "Le Preposizioni",
    description: "Preposizioni semplici e articolate, articoli determinativi ed indeterminativi",
    grammar: [
      {
        title: "Preposizioni Semplici",
        content: "Di, a, da, in, con, su, per, tra, fra. Se usan para indicar lugar, tiempo, origen, posesión, etc.",
        examples: [
          { it: "Vado a scuola ogni mattina.", es: "Voy a la escuela cada mañana." },
          { it: "Vengo dall'Italia.", es: "Vengo de Italia." }
        ]
      },
      {
        title: "Preposizioni Articolate",
        content: "Se forman combinando una preposición simple (di, a, da, in, su) con un artículo determinativo (il, lo, la, i, gli, le, l').",
        examples: [
          { it: "Il libro è sul tavolo (su + il).", es: "El libro está sobre la mesa." },
          { it: "Parliamo delle vacanze (di + le).", es: "Haglamos de las vacaciones." }
        ]
      },
      {
        title: "Articoli con i Nomi di Famiglia",
        content: "¡Ojo! No se usa artículo con posesivos singulares de miembros de la familia (mio fratello), excepto con 'loro' o nombres cariñosos/plurles (il loro fratello, la mia mamma, le mie sorelle).",
        examples: [
          { it: "Mio fratello si chiama Marco.", es: "Mi hermano se llama Marco." },
          { it: "Le mie sorelle vivono a Milano.", es: "Mis hermanas viven en Milán." }
        ]
      }
    ],
    vocabulary: [
      { word: "di / a / da / in / con / su / per / tra / fra", translation: "de / a / desde-por / en / con / sobre / para / entre", category: "Preposizioni" },
      { word: "padre / madre / fratello / sorella", translation: "padre / madre / hermano / hermana", category: "Famiglia" },
      { word: "zio / zia / cugino / cugina", translation: "tío / tía / primo / prima", category: "Famiglia" },
      { word: "scuola / casa / lavoro", translation: "escuela / casa / trabajo", category: "Luoghi" }
    ]
  },
  {
    id: 5,
    title: "Tempo Libero",
    description: "Sport, hobby, espressioni di tempo e il verbo piacere",
    grammar: [
      {
        title: "Il Verbo Piacere",
        content: "Concuerda con la cosa que gusta: mi piace + singular / mi piacciono + plural.",
        examples: [
          { it: "Mi piace giocare a calcio.", es: "Me gusta jugar al fútbol." },
          { it: "Mi piacciono i film italiani.", es: "Me gustan las películas italianas." }
        ]
      },
      {
        title: "Fare vs Giocare",
        content: "Para deportes se usa: 'giocare a' + juego/deporte con balón (giocare a tennis), y 'fare' + actividades/deportes individuales (fare nuoto, fare ginnastica).",
        examples: [
          { it: "Faccio nuoto tre volte alla settimana.", es: "Hago natación tres veces a la semana." },
          { it: "I ragazzi giocano a basket nel pomeriggio.", es: "Los chicos juegan al baloncesto por la tarde." }
        ]
      }
    ],
    vocabulary: [
      { word: "tempo libero", translation: "tiempo libre", category: "Hobby" },
      { word: "giocare a calcio / tennis", translation: "jugar al fútbol / tenis", category: "Sport" },
      { word: "fare nuoto / sci / yoga", translation: "hacer natación / esquí / yoga", category: "Sport" },
      { word: "leggere un libro", translation: "leer un libro", category: "Hobby" },
      { word: "guardare la TV", translation: "ver la tele", category: "Hobby" },
      { word: "uscire con gli amici", translation: "salir con amigos", category: "Sociale" }
    ]
  },
  {
    id: 6,
    title: "Le Persone",
    description: "Aspetto fisico, personalità, emozioni e comparativi",
    grammar: [
      {
        title: "Comparativo di Maggioranza e Minoranza",
        content: "Si compara dos nombres/pronombres respecto a una cualidad, se usa: più / meno + adjetivo + di.",
        examples: [
          { it: "Roma è più grande di Firenze.", es: "Roma es más grande que Florencia." },
          { it: "Marco è meno alto di Luca.", es: "Marco es menos alto que Luca." }
        ]
      },
      {
        title: "Comparativi Irregolari",
        content: "Migliore (mejor, de buono), peggiore (peor, de cattivo), maggiore (mayor, de grande), minore (menor, de piccolo).",
        examples: [
          { it: "Questo ristorante è migliore dell'altro.", es: "Este restaurante es mejor que el otro." },
          { it: "Mio fratello maggiore vive a Roma.", es: "Mi hermano mayor vive en Roma." }
        ]
      }
    ],
    vocabulary: [
      { word: "alto / basso", translation: "alto / bajo", category: "Fisico" },
      { word: "magro / grasso", translation: "delgado / gordo", category: "Fisico" },
      { word: "simpatico / antipatico", translation: "simpático / antipático", category: "Carattere" },
      { word: "intelligente / pigro", translation: "inteligente / perezoso", category: "Carattere" },
      { word: "felice / triste / arrabbiato", translation: "feliz / triste / enfadado", category: "Emozioni" }
    ]
  },
  {
    id: 7,
    title: "Alimentazione",
    description: "Cibo, ordinare al ristorante, il partitivo e quantificatori",
    grammar: [
      {
        title: "Il Partitivo",
        content: "Indica una cantidad indeterminada ('un poco de', 'algunos'). Se forma con di + artículo determinativo: del, dello, della, dei, degli, delle.",
        examples: [
          { it: "Vorrei del pane, per favore.", es: "Querría algo de pan, por favor." },
          { it: "Compro delle mele al mercato.", es: "Compro unas manzanas en el mercado." }
        ]
      },
      {
        title: "Ordinare al Ristorante",
        content: "Se usa el condicional de cortesía 'vorrei' (me gustaría) o formas educadas como 'prendo...'.",
        examples: [
          { it: "Vorrei un primo di pasta e dell'acqua.", es: "Me gustaría un primer plato de pasta y agua." },
          { it: "Per me una pizza Margherita.", es: "Para mí una pizza Margherita." }
        ]
      }
    ],
    vocabulary: [
      { word: "il pane / la pasta / il riso", translation: "el pan / la pasta / el arroz", category: "Cibo" },
      { word: "la carne / il pesce / il pollo", translation: "la carne / el pescado / el pollo", category: "Cibo" },
      { word: "la frutta / la verdura", translation: "la fruta / la verdura", category: "Cibo" },
      { word: "il cameriere", translation: "el camarero", category: "Ristorante" },
      { word: "il conto", translation: "la cuenta", category: "Ristorante" },
      { word: "il dessert / dolce", translation: "el postre / dulce", category: "Cibo" }
    ]
  },
  {
    id: 8,
    title: "Salute e Corpo",
    description: "Corpo umano, sintomi, dal medico, verbi riflessivi e imperativo",
    grammar: [
      {
        title: "Esprimere Dolore (Far Male)",
        content: "Se usa el verbo fare al singular o plural: mi fa male + singular / mi fanno male + plural.",
        examples: [
          { it: "Mi fa male la testa.", es: "Me duele la cabeza." },
          { it: "Mi fanno male i piedi.", es: "Me duelen los pies." }
        ]
      },
      {
        title: "L'Imperativo Diretto (Tu/Noi/Voi)",
        content: "Para dar órdenes o consejos. Verbos -are: tu canta!, voi cantate! Verbos -ere/-ire: tu leggi!, voi leggete! La forma negativa de 'tu' es NON + infinitivo.",
        examples: [
          { it: "Prendi questa medicina!", es: "¡Toma esta medicina!" },
          { it: "Non mangiare troppi dolci!", es: "¡No comas demasiados dulces!" }
        ]
      }
    ],
    vocabulary: [
      { word: "la testa / i capelli", translation: "la cabeza / el pelo", category: "Corpo" },
      { word: "gli occhi / le orecchie", translation: "los ojos / las orejas", category: "Corpo" },
      { word: "la gola / la schiena", translation: "la garganta / la espalda", category: "Corpo" },
      { word: "il medico / il dottore", translation: "el médico / el doctor", category: "Salute" },
      { word: "la febbre / la tosse / il raffreddore", translation: "la fiebre / la tos / el resfriado", category: "Sintomi" },
      { word: "la medicina / lo sciroppo", translation: "la medicina / el jarabe", category: "Salute" }
    ]
  },
  {
    id: 9,
    title: "Città e Viaggi",
    description: "Indicazioni stradali, mezzi di trasporto, futuro per i piani di viaggio",
    grammar: [
      {
        title: "Chiedere e Dare Indicazioni",
        content: "Para pedir información se usa 'scusi' (formal) o 'scusa' (informal). Respuestas típicas: gira a destra (gira a la derecha), vai dritto (sigue recto), attraversa la strada (cruza la calle).",
        examples: [
          { it: "Scusi, per andare alla stazione?", es: "Disculpe, ¿para ir a la estación?" },
          { it: "Gira alla prima via a sinistra.", es: "Gira en la primera calle a la izquierda." }
        ]
      },
      {
        title: "Preposizioni con i Mezzi di Trasporto",
        content: "Se usa la preposición 'in' para los medios de transporte (in treno, in macchina, in aereo). Excepción: 'a piedi' (a pie) y con especificaciones 'con il treno delle 8'.",
        examples: [
          { it: "Vado a Roma in treno stasera.", es: "Voy a Roma en tren esta noche." },
          { it: "Preferisco andare a piedi.", es: "Preferisco ir a pie." }
        ]
      }
    ],
    vocabulary: [
      { word: "la stazione / l'aeroporto", translation: "la estación / el aeropuerto", category: "Trasporto" },
      { word: "il treno / l'autobus / la metropolitana", translation: "el tren / el autobús / el metro", category: "Trasporto" },
      { word: "il biglietto", translation: "el billete/boleto", category: "Trasporto" },
      { word: "destra / sinistra / dritto", translation: "derecha / izquierda / recto", category: "Direzioni" },
      { word: "la piazza / la via / il monumento", translation: "la plaza / la calle / el monumento", category: "Città" }
    ]
  },
  {
    id: 10,
    title: "Lavoro e Studio",
    description: "Professioni, università, routine quotidiana e stare + gerundio",
    grammar: [
      {
        title: "Stare + Gerundio",
        content: "Indica una acción en desarrollo en el momento de hablar. Se forma con el verbo STARE en presente + gerundio del verbo (-ando para -are, -endo para -ere/-ire).",
        examples: [
          { it: "Cosa stai facendo? Sto studiando.", es: "¿Qué estás haciendo? Estoy estudiando." },
          { it: "I ragazzi stanno lavorando in ufficio.", es: "Los chicos están trabajando en la oficina." }
        ]
      },
      {
        title: "Parlare del Lavoro (Fare + Articolo)",
        content: "Para decir la profesión se usa 'fare il/la' + profesión, o 'essere' + profesión (sin artículo).",
        examples: [
          { it: "Che lavoro fa tuo padre? Fa il falegname.", es: "¿De qué trabaja tu padre? Trabaja de carpintero." },
          { it: "Mia sorella è insegnante.", es: "Mi hermana es profesora." }
        ]
      }
    ],
    vocabulary: [
      { word: "il lavoro / l'ufficio", translation: "el trabajo / la oficina", category: "Lavoro" },
      { word: "lo studente / l'insegnante", translation: "el estudiante / el profesor", category: "Istruzione" },
      { word: "l'università / l'esame", translation: "la universidad / el examen", category: "Istruzione" },
      { word: "l'ingegnere / il medico", translation: "el ingeniero / el médico", category: "Professioni" },
      { word: "il falegname / l'impiegato", translation: "el carpintero / el empleado", category: "Professioni" }
    ]
  }
];

// 2. GENERATE QUESTIONS (228 Total, at least 22 per milestone, milestone 1 has 30)
const questions = [];

const rawQuestions = {
  1: [ // Verbi (30 questions)
    // Starter ones
    { text: "Di solito io ______ al lavoro in autobus.", options: [{text: "vado", correct: true}, {text: "va", correct: false}, {text: "vanno", correct: false}, {text: "andiamo", correct: false}], explanation: "Con il pronome personale 'io' si usa la prima persona singolare del presente indicativo di andare: 'vado'.", difficulty: 1 },
    { text: "Oggi ______ la macchina.", options: [{text: "prendo", correct: true}, {text: "prendi", correct: false}, {text: "prende", correct: false}, {text: "prendiamo", correct: false}], explanation: "La frase si riferisce alla prima persona ('io prendo la macchina').", difficulty: 1 },
    { text: "Marco ______ sempre la colazione alle 7.", options: [{text: "fa", correct: true}, {text: "fai", correct: false}, {text: "faccio", correct: false}, {text: "fanno", correct: false}], explanation: "Marco corrisponde alla terza persona singolare ('lui'), quindi si coniuga 'fa' (verbo fare).", difficulty: 1 },
    { text: "Noi ______ in una casa grande.", options: [{text: "viviamo", correct: true}, {text: "vivete", correct: false}, {text: "vivono", correct: false}, {text: "vivi", correct: false}], explanation: "Con il pronome 'noi' la desinenza del presente indicativo è '-iamo': 'viviamo'.", difficulty: 1 },
    { text: "Stamattina io ______ il pane al supermercato.", options: [{text: "ho comprato", correct: true}, {text: "comprato", correct: false}, {text: "ho comprare", correct: false}, {text: "sono comprato", correct: false}], explanation: "Il verbo 'comprare' richiede l'ausiliare 'avere' al passato prossimo: 'ho comprato'.", difficulty: 1 },
    { text: "I ragazzi ______ dal treno alle otto.", options: [{text: "sono scesi", correct: true}, {text: "hanno sceso", correct: false}, {text: "sono sceso", correct: false}, {text: "hanno scesi", correct: false}], explanation: "Il verbo di movimento 'scendere' richiede l'ausiliare 'essere' e concorda in genere e numero col soggetto plurale ('ragazzi' -> 'sono scesi').", difficulty: 2 },
    { text: "Oggi Anna esce con gli amici. Ieri ______ con loro.", options: [{text: "è uscita", correct: true}, {text: "ha uscito", correct: false}, {text: "era uscita", correct: false}, {text: "è uscito", correct: false}], explanation: "Uscire è intransitivo di movimento, richiede 'essere' come ausiliare e concorda con il soggetto femminile singolare Anna ('è uscita').", difficulty: 2 },
    { text: "Ieri sera Maria ______ una pizza.", options: [{text: "ha mangiato", correct: true}, {text: "è mangiata", correct: false}, {text: "ha mangiata", correct: false}, {text: "è mangiato", correct: false}], explanation: "'Mangiare' richiede l'ausiliare 'avere'. Il participio passato resta invariato in '-o' in assenza di pronomi diretti antecedenti.", difficulty: 1 },
    { text: "I miei genitori ______ in Italia nel 1990.", options: [{text: "sono andati", correct: true}, {text: "hanno andato", correct: false}, {text: "sono andate", correct: false}, {text: "sono andato", correct: false}], explanation: "Andare richiede l'ausiliare 'essere'. Essendo 'i miei genitori' maschile plurale, il participio è 'andati'.", difficulty: 2 },
    { text: "Lucia ______ un bel film al cinema ieri.", options: [{text: "ha visto", correct: true}, {text: "ha vedere", correct: false}, {text: "è vista", correct: false}, {text: "è visto", correct: false}], explanation: "Vedere richiede l'ausiliare 'avere': 'ha visto' (participio irregolare).", difficulty: 1 },
    { text: "Ieri ______ un libro.", options: [{text: "ho comprato", correct: true}, {text: "compravo", correct: false}, {text: "comprai", correct: false}, {text: "ho comprare", correct: false}], explanation: "Per un'azione puntuale e conclusa nel passato si usa il passato prossimo: 'ho comprato'.", difficulty: 1 },
    { text: "Da bambino ______ sempre al parco.", options: [{text: "giocavo", correct: true}, {text: "ho giocato", correct: false}, {text: "giocherò", correct: false}, {text: "giocato", correct: false}], explanation: "Per descrivere un'azione abituale o ripetuta nel passato si usa l'imperfetto: 'giocavo'.", difficulty: 2 },
    { text: "Mentre ______, ha telefonato Marco.", options: [{text: "mangiavo", correct: true}, {text: "ho mangiato", correct: false}, {text: "mangia", correct: false}, {text: "mangerò", correct: false}], explanation: "La congiunzione 'mentre' introduce un'azione continuativa sullo sfondo nel passato, espressa con l'imperfetto ('mangiavo'). L'interruzione è al passato prossimo.", difficulty: 2 },
    { text: "Quando ero piccola, ______ un gatto nero.", options: [{text: "avevo", correct: true}, {text: "ho avuto", correct: false}, {text: "ebbi", correct: false}, {text: "aveva", correct: false}], explanation: "Gli stati fisici, mentali o il possesso continuativo nel passato richiedono l'imperfetto: 'avevo'.", difficulty: 1 },
    { text: "Ieri sera ______ quando siamo usciti.", options: [{text: "pioveva", correct: true}, {text: "ha piovuto", correct: false}, {text: "piove", correct: false}, {text: "pioverà", correct: false}], explanation: "Le descrizioni del tempo meteorologico nel passato richiedono l'imperfetto: 'pioveva'.", difficulty: 2 },
    { text: "Stamattina mi ______ alle 6.", options: [{text: "sono svegliato", correct: true}, {text: "ho svegliato", correct: false}, {text: "sono svegliata", correct: true}, {text: "sveglio", correct: false}], explanation: "I verbi riflessivi richiedono sempre l'ausiliare 'essere' al passato prossimo (se l'utente è maschio 'mi sono svegliato', se femmina 'mi sono svegliata'). Entrambi corretti.", difficulty: 2 },
    { text: "La mattina io ______ alle 7.", options: [{text: "mi sveglio", correct: true}, {text: "sveglio mi", correct: false}, {text: "mi svegliano", correct: false}, {text: "si sveglia", correct: false}], explanation: "Il verbo riflessivo presente per la prima persona singolare è 'mi sveglio'.", difficulty: 1 },
    { text: "Voi ______ sempre tardi.", options: [{text: "vi addormentate", correct: true}, {text: "si addormentano", correct: false}, {text: "vi addormenti", correct: false}, {text: "addormentatevi", correct: false}], explanation: "La forma riflessiva per 'voi' è 'vi addormentate'.", difficulty: 1 },
    { text: "Marco ______ in fretta la mattina.", options: [{text: "si veste", correct: true}, {text: "vestesi", correct: false}, {text: "ti vesti", correct: false}, {text: "si vestono", correct: false}], explanation: "La terza persona singolare riflessiva di vestirsi è 'si veste'.", difficulty: 1 },
    { text: "Ieri sera Maria ______ molto al cinema.", options: [{text: "si è divertita", correct: true}, {text: "ha divertito", correct: false}, {text: "si ha divertito", correct: false}, {text: "è divertita", correct: false}], explanation: "Divertirsi al passato prossimo richiede 'essere' ed accordo col soggetto femminile singolare: 'si è divertita'.", difficulty: 2 },
    { text: "Domani noi ______ al mare.", options: [{text: "andremo", correct: true}, {text: "andiamo", correct: false}, {text: "andremmo", correct: false}, {text: "andranno", correct: false}], explanation: "Azione futura pianificata: si coniuga al futuro semplice prima persona plurale ('andremo').", difficulty: 1 },
    { text: "______ un caffè, per favore.", options: [{text: "Vorrei", correct: true}, {text: "Voglio", correct: false}, {text: "Vorrebbe", correct: false}, {text: "Vorrei essere", correct: false}], explanation: "'Vorrei' è il condizionale di cortesia di volere, usato per ordinare in modo gentile.", difficulty: 1 },
    { text: "Se io avessi tempo, ______ al cinema.", options: [{text: "andrei", correct: true}, {text: "andrei a", correct: false}, {text: "andrò", correct: false}, {text: "andassi", correct: false}], explanation: "Periodo ipotetico del secondo tipo (possibilità): Congiuntivo imperfetto nella secondaria ('avessi') + Condizionale presente nella principale ('andrei').", difficulty: 3 },
    { text: "Se tu ______ di più, prenderesti voti migliori.", options: [{text: "studiassi", correct: true}, {text: "studieresti", correct: false}, {text: "studi", correct: false}, {text: "studiasti", correct: false}], explanation: "Periodo ipotetico con condizionale nella principale ('prenderesti') richiede il congiuntivo imperfetto nella subordinata introdotta da se: 'studiassi'.", difficulty: 3 },
    { text: "Se noi avessimo una macchina, ______ più luoghi.", options: [{text: "visiteremmo", correct: true}, {text: "visiteremo", correct: false}, {text: "visitassimo", correct: false}, {text: "visiteranno", correct: false}], explanation: "Periodo ipotetico di secondo tipo: se + congiuntivo imperfetto ('avessimo') richiede il condizionale presente ('visiteremmo').", difficulty: 3 },
    // 5 New ones to make 30
    { text: "Noi ______ partiti ieri per Torino.", options: [{text: "siamo", correct: true}, {text: "abbiamo", correct: false}, {text: "saremo", correct: false}, {text: "eravamo", correct: false}], explanation: "Partire richiede l'ausiliare essere. Poiché l'azione è avvenuta ieri, si usa il passato prossimo: 'siamo partiti'.", difficulty: 1 },
    { text: "Quando tu ______ telefonato, io dormivo.", options: [{text: "hai", correct: true}, {text: "sei", correct: false}, {text: "avevi", correct: false}, {text: "eri", correct: false}], explanation: "Telefonare è un verbo transitivo che richiede avere: 'hai telefonato' (azione puntuale passata che interrompe un'azione continuativa 'dormivo').", difficulty: 2 },
    { text: "Fra un mese ______ l'esame CLA di italiano.", options: [{text: "farò", correct: true}, {text: "faccio", correct: false}, {text: "farei", correct: false}, {text: "ho fatto", correct: false}], explanation: "Azione futura pianificata espressa con il futuro semplice prima persona singolare: 'farò'.", difficulty: 1 },
    { text: "Penso che quel film ______ molto bello.", options: [{text: "sia", correct: true}, {text: "è", correct: false}, {text: "sarebbe", correct: false}, {text: "fossi", correct: false}], explanation: "Il verbo 'pensare che' esprime un'opinione e richiede il congiuntivo presente: 'sia'.", difficulty: 3 },
    { text: "Non sapevo che voi ______ già arrivati.", options: [{text: "foste", correct: true}, {text: "siete", correct: false}, {text: "sareste", correct: false}, {text: "eravate", correct: false}], explanation: "Frase subordinata al passato che richiede el congiuntivo trapassato (congiuntivo imperfetto di essere 'foste' + participio 'arrivati').", difficulty: 3 }
  ],
  2: [ // La Casa (22 questions)
    { text: "In cucina c'è un tavolo con quattro ______.", options: [{text: "sedie", correct: true}, {text: "letti", correct: false}, {text: "armadi", correct: false}, {text: "finestre", correct: false}], explanation: "Intorno a un tavolo in cucina si mettono solitamente le 'sedie'.", difficulty: 1 },
    { text: "In soggiorno abbiamo comprato un ______ a tre posti molto comodo.", options: [{text: "divano", correct: true}, {text: "lavandino", correct: false}, {text: "frigorifero", correct: false}, {text: "balcone", correct: false}], explanation: "Un mobile a tre posti per sedersi o sdraiarsi in soggiorno è il 'divano'.", difficulty: 1 },
    { text: "Ho messo il latte e lo yogurt nel ______ per tenerli freschi.", options: [{text: "frigorifero", correct: true}, {text: "forno", correct: false}, {text: "lavastoviglie", correct: false}, {text: "letto", correct: false}], explanation: "La conservazione di latte e yogurt richiede il 'frigorifero'.", difficulty: 1 },
    { text: "Dobbiamo lavare i vestiti sporchi, metti tutto nella ______.", options: [{text: "lavatrice", correct: true}, {text: "lavastoviglie", correct: false}, {text: "doccia", correct: false}, {text: "vasca", correct: false}], explanation: "L'elettrodomestico per lavare i vestiti è la 'lavatrice'.", difficulty: 1 },
    { text: "In camera da letto c'è un grande ______ per vestiti e giacche.", options: [{text: "armadio", correct: true}, {text: "tavolino", correct: false}, {text: "frigorifero", correct: false}, {text: "tappeto", correct: false}], explanation: "L'armadio si usa per conservare vestiti e giacche nella camera da letto.", difficulty: 1 },
    { text: "Sul letto ci sono due ______ morbidi per appoggiare la testa.", options: [{text: "cuscini", correct: true}, {text: "quadri", correct: false}, {text: "tavoli", correct: false}, {text: "specchi", correct: false}], explanation: "Si appoggia la testa sui 'cuscini' quando si dorme nel letto.", difficulty: 1 },
    { text: "Il gatto sta dormendo ______ il letto, non sopra.", options: [{text: "sotto", correct: true}, {text: "in", correct: false}, {text: "su", correct: false}, {text: "di", correct: false}], explanation: "Il contrario di 'sopra' è 'sotto'.", difficulty: 2 },
    { text: "Accanto al letto ho messo un ______ con una pequeña lampada.", options: [{text: "comodino", correct: true}, {text: "lavello", correct: false}, {text: "divano", correct: false}, {text: "balcone", correct: false}], explanation: "Il mobiletto basso accanto al letto è il 'comodino'.", difficulty: 1 },
    { text: "Nel bagno c'è sia la doccia che la ______ da bagno.", options: [{text: "vasca", correct: true}, {text: "lavatrice", correct: false}, {text: "cucina", correct: false}, {text: "sedia", correct: false}], explanation: "In bagno si può avere la doccia o la 'vasca da bagno'.", difficulty: 1 },
    { text: "In salotto ______ due poltrone e un televisore.", options: [{text: "ci sono", correct: true}, {text: "c'è", correct: false}, {text: "sono", correct: false}, {text: "è", correct: false}], explanation: "Per indicare la presenza di elementi al plurale ('due poltrone') si usa 'ci sono'.", difficulty: 1 },
    { text: "In questo appartamento non ______ un balcone.", options: [{text: "c'è", correct: true}, {text: "ci sono", correct: false}, {text: "è", correct: false}, {text: "ha", correct: false}], explanation: "Si usa 'c'è' per indicare la presenza o l'esistenza di un elemento singolare ('un balcone').", difficulty: 1 },
    { text: "La spazzatura si trova ______ il lavello della cucina.", options: [{text: "sotto", correct: true}, {text: "su", correct: false}, {text: "in", correct: false}, {text: "tra", correct: false}], explanation: "La pattumiera solitamente si posiziona 'sotto' il lavandino (lavello) in cucina.", difficulty: 2 },
    { text: "La chiave è ______ porta, puoi prenderla.", options: [{text: "nella", correct: true}, {text: "sulla", correct: false}, {text: "dietro", correct: false}, {text: "sotto la", correct: false}], explanation: "La chiave si trova inserita 'nella' serratura della porta.", difficulty: 2 },
    { text: "Il forno a microonde si trova ______ al frigorifero.", options: [{text: "accanto", correct: true}, {text: "sopra", correct: false}, {text: "in", correct: false}, {text: "tra", correct: false}], explanation: "Si dice 'accanto a' per indicare la vicinanza laterale.", difficulty: 1 },
    { text: "Per specchiarsi in bagno c'è un grande ______ appeso alla parete.", options: [{text: "specchio", correct: true}, {text: "tappeto", correct: false}, {text: "quadro", correct: false}, {text: "cassetto", correct: false}], explanation: "Ci si specchia nello 'specchio'.", difficulty: 1 },
    { text: "La notte dormo nella mia ______ da letto.", options: [{text: "camera", correct: true}, {text: "cucina", correct: false}, {text: "soggiorno", correct: false}, {text: "cantina", correct: false}], explanation: "Si dorme in camera da letto.", difficulty: 1 },
    { text: "Laviamo i piatti sporchi a mano nel ______ della cucina.", options: [{text: "lavello", correct: true}, {text: "vasca", correct: false}, {text: "armadio", correct: false}, {text: "forno", correct: false}], explanation: "Il lavandino della cucina è comunemente chiamato 'lavello'.", difficulty: 2 },
    { text: "Il riscaldamento è spento, la casa è molto ______.", options: [{text: "fredda", correct: true}, {text: "calda", correct: false}, {text: "nuova", correct: false}, {text: "luminosa", correct: false}], explanation: "Se il riscaldamento è spento, la casa diventa 'fredda'.", difficulty: 1 },
    { text: "Il mio appartamento è al terzo piano e c'è un comodo ______.", options: [{text: "ascensore", correct: true}, {text: "giardino", correct: false}, {text: "garage", correct: false}, {text: "tetto", correct: false}], explanation: "Per salire ai piani alti si usa l'ascensore.", difficulty: 1 },
    { text: "La mia stanza ha una ______ che dà sul cortile interno.", options: [{text: "finestra", correct: true}, {text: "sedia", correct: false}, {text: "parete", correct: false}, {text: "scrivania", correct: false}], explanation: "Una finestra permette di vedere l'esterno.", difficulty: 1 },
    { text: "In corridoio c'è un mobile basso con tre ______ per i documenti.", options: [{text: "cassetti", correct: true}, {text: "letti", correct: false}, {text: "divani", correct: false}, {text: "bagni", correct: false}], explanation: "Un mobile basso ha solitamente dei 'cassetti' per riporre oggetti.", difficulty: 2 },
    { text: "L'auto è parcheggiata nel ______ condominiale.", options: [{text: "garage", correct: true}, {text: "corridoio", correct: false}, {text: "soggiorno", correct: false}, {text: "cucina", correct: false}], explanation: "L'automobile si parcheggia nel garage.", difficulty: 1 }
  ],
  3: [ // Pronomi (22 questions)
    // Starter
    { text: "Vedi Maria? Sì, ______ vedo ogni giorno.", options: [{text: "la", correct: true}, {text: "lo", correct: false}, {text: "le", correct: false}, {text: "li", correct: false}], explanation: "Pronominale diretto femminile singolare riferito a Maria: 'la'.", difficulty: 1 },
    { text: "Compri i giornali? Sì, ______ compro ogni mattina.", options: [{text: "li", correct: true}, {text: "le", correct: false}, {text: "la", correct: false}, {text: "l'", correct: false}], explanation: "Pronominale diretto maschile plurale riferito a i giornali: 'li'.", difficulty: 1 },
    { text: "Telefoni a Maria? Sì, ______ telefono stasera.", options: [{text: "le", correct: true}, {text: "gli", correct: false}, {text: "la", correct: false}, {text: "ci", correct: false}], explanation: "Pronominale indiretto femminile singolare riferito a Maria ('a lei'): 'le'.", difficulty: 2 },
    { text: "Scrivi a Marco? Sì, ______ scrivo un'email.", options: [{text: "gli", correct: true}, {text: "le", correct: false}, {text: "lo", correct: false}, {text: "ci", correct: false}], explanation: "Pronominale indiretto maschile singolare riferito a Marco ('a lui'): 'gli'.", difficulty: 2 },
    { text: "Hai visto le ragazze? Sì, ______ ho viste.", options: [{text: "le", correct: true}, {text: "la", correct: false}, {text: "li", correct: false}, {text: "le ho visto", correct: false}], explanation: "Pronome diretto 'le' (femminile plurale) + passato prossimo richiede l'accordo del participio passato al plurale femminile ('viste').", difficulty: 2 },
    { text: "Cosa dici a Paolo e Anna? ______ dico la verità.", options: [{text: "Gli", correct: true}, {text: "Le", correct: false}, {text: "Li", correct: false}, {text: "Loro", correct: false}], explanation: "Il pronome indiretto per la terza persona plurale ('a Paolo e Anna' -> 'a loro') prima del verbo è 'gli' (o colloquiale/tradizionale 'dico loro'). In questo caso prima del verbo usiamo 'gli'.", difficulty: 2 },
    // Expand
    { text: "Chi accompagna a scuola i bambini? ______ accompagna il papà.", options: [{text: "Li", correct: true}, {text: "Lo", correct: false}, {text: "Gli", correct: false}, {text: "Le", correct: false}], explanation: "Pronominale diretto riferito ai bambini (maschile plurale): 'li'.", difficulty: 1 },
    { text: "Hai comprato il latte? Sì, ______ ho comprato stamattina.", options: [{text: "l'", correct: true}, {text: "lo", correct: false}, {text: "la", correct: false}, {text: "li", correct: false}], explanation: "Il pronome 'lo' si apostrofa davanti alla voce verbale 'ho' diventando 'l'': 'l'ho comprato'.", difficulty: 2 },
    { text: "Hai invitato Giulia alla festa? Sì, ______ ho invitata.", options: [{text: "l'", correct: true}, {text: "la", correct: false}, {text: "le", correct: false}, {text: "la ho", correct: false}], explanation: "Il pronome 'la' davanti a 'ho' diventa 'l'' e si fa l'accordo del participio 'invitata'.", difficulty: 2 },
    { text: "Signora Rossi, ______ posso aiutare?", options: [{text: "La", correct: true}, {text: "la", correct: false}, {text: "ti", correct: false}, {text: "le", correct: false}], explanation: "Nella forma di cortesia (formale) si usa il pronome 'La' con la lettera maiuscola, riferito a una persona singolare.", difficulty: 3 },
    { text: "Ragazzi, ______ invito a cena sabato sera.", options: [{text: "vi", correct: true}, {text: "ci", correct: false}, {text: "li", correct: false}, {text: "vi ho", correct: false}], explanation: "Il pronome diretto per la seconda persona plurale ('voi') è 'vi'.", difficulty: 1 },
    { text: "Hai telefonato ai tuoi amici? Sì, ______ ho telefonato ieri.", options: [{text: "gli", correct: true}, {text: "li", correct: false}, {text: "le", correct: false}, {text: "ci", correct: false}], explanation: "Il verbo telefonare regge a chi ('a loro' -> pronominale indiretto 'gli').", difficulty: 2 },
    { text: "Chi ti ha prestato questa penna? ______ ha prestata Lucia.", options: [{text: "Me l'", correct: true}, {text: "Mi la", correct: false}, {text: "Me la", correct: false}, {text: "Me lo", correct: false}], explanation: "Pronome combinato: 'mi' (a me) + 'la' (la penna) davanti ad ausiliare avere diventa 'me l'ha prestata'.", difficulty: 3 },
    { text: "Hai dato il regalo a tuo fratello? Sì, ______ ho dato.", options: [{text: "gliel'", correct: true}, {text: "gli lo", correct: false}, {text: "lo gli", correct: false}, {text: "glielo", correct: false}], explanation: "Pronominale combinato 'gli' (a lui) + 'lo' (il regalo) davanti ad ausiliare avere con H si contrae in 'gliel'ho dato'.", difficulty: 3 },
    { text: "Chi pulisce la casa? ______ pulisco io.", options: [{text: "La", correct: true}, {text: "Lo", correct: false}, {text: "Le", correct: false}, {text: "La ho", correct: false}], explanation: "Pronome diretto femminile singolare riferito a 'la casa': 'la'.", difficulty: 1 },
    { text: "Ci dai le risposte del test? Sì, ______ do subito.", options: [{text: "ve le", correct: true}, {text: "ve li", correct: false}, {text: "vi le", correct: false}, {text: "ce le", correct: false}], explanation: "Pronominale combinato: 'vi' (a voi, diventa 've') + 'le' (le risposte): 've le do'.", difficulty: 3 },
    { text: "Hai offerto un caffè ai colleghi? Sì, ______ ho offerto uno.", options: [{text: "gliene", correct: true}, {text: "gli lo", correct: false}, {text: "lo gli", correct: false}, {text: "gli li", correct: false}], explanation: "Pronome combinato indiretto 'gli' (a loro) + partitivo 'ne' (di caffè): 'gliene ho offerto uno'.", difficulty: 3 },
    { text: "Porti la torta alla festa? Sì, ______ porto più tardi.", options: [{text: "la", correct: true}, {text: "lo", correct: false}, {text: "le", correct: false}, {text: "ci", correct: false}], explanation: "Pronome diretto riferito a 'la torta' (femminile singolare): 'la'.", difficulty: 1 },
    { text: "Hai spedito la lettera a Marco? Sì, ______ ho spedita.", options: [{text: "gliel'", correct: true}, {text: "gli la", correct: false}, {text: "la gli", correct: false}, {text: "gliela", correct: false}], explanation: "Pronome combinato 'gli' (a lui) + 'la' (la lettera) diventa 'gliela' e davanti a ho si contrae in 'gliel'ho spedita' (con accordo al femminile).", difficulty: 3 },
    { text: "Ci porti al parco oggi? Sì, ______ porto volentieri.", options: [{text: "vi", correct: true}, {text: "ci", correct: false}, {text: "li", correct: false}, {text: "ti", correct: false}], explanation: "Rispondendo alla domanda con 'ci' (noi), si usa 'vi' (voi): 'vi porto volentieri'.", difficulty: 2 },
    { text: "Hai mangiato tutti i cioccolatini? No, ______ ho mangiati solo due.", options: [{text: "ne", correct: true}, {text: "li", correct: false}, {text: "lo", correct: false}, {text: "ne ho", correct: false}], explanation: "Il pronome partitivo 'ne' esprime una quantità definita di un insieme ('due cioccolatini'). Il participio concorda col numero ('mangiati').", difficulty: 3 },
    { text: "Hai bisogno di aiuto? Sì, ______ ho molto bisogno.", options: [{text: "ne", correct: true}, {text: "lo", correct: false}, {text: "ci", correct: false}, {text: "gli", correct: false}], explanation: "Aver bisogno 'di qualcosa' richiede il pronome partitivo/argomento 'ne': 'ne ho molto bisogno'.", difficulty: 2 }
  ],
  4: [ // Preposizioni (22 questions)
    // Starter
    { text: "Che lavoro fa tuo padre? È ______ falegname.", options: [{text: "un", correct: true}, {text: "uno", correct: false}, {text: "il", correct: false}, {text: "lo", correct: false}], explanation: "Davanti a nomi maschili singolari che iniziano per consonante normale si usa l'articolo indeterminativo 'un'.", difficulty: 1 },
    { text: "Perché sei adirato? Perché ______ insegnante mi ha rimproverato.", options: [{text: "l'", correct: true}, {text: "lo", correct: false}, {text: "il", correct: false}, {text: "la", correct: false}], explanation: "Insegnante inizia per vocale, quindi l'articolo determinativo si apostrofa diventando 'l''.", difficulty: 1 },
    { text: "Sei figlio unico? No, ho ______ sorella.", options: [{text: "una", correct: true}, {text: "un'", correct: false}, {text: "un", correct: false}, {text: "la", correct: false}], explanation: "Articolo indeterminativo per nomi femminili singolari che iniziano per consonante: 'una'.", difficulty: 1 },
    { text: "Quale animale vorresti avere? Vorrei tanto ______ scoiattolo.", options: [{text: "uno", correct: true}, {text: "un", correct: false}, {text: "lo", correct: false}, {text: "l'", correct: false}], explanation: "Davanti a parole maschili che iniziano con 's + consonante' si usa l'articolo indeterminativo 'uno'.", difficulty: 2 },
    { text: "Perché piangi? Perché mi fanno male ______ denti.", options: [{text: "i", correct: true}, {text: "gli", correct: false}, {text: "le", correct: false}, {text: "i miei", correct: false}], explanation: "Articolo determinativo plurale maschile davanti a consonante normale: 'i'.", difficulty: 1 },
    { text: "Perché stai risparmiando? Per pagare ______ rate della macchina.", options: [{text: "le", correct: true}, {text: "gli", correct: false}, {text: "i", correct: false}, {text: "delle", correct: false}], explanation: "Articolo determinativo plurale femminile: 'le'.", difficulty: 1 },
    { text: "Com'è la tua classe? ______ alunni sono molto diligenti.", options: [{text: "Gli", correct: true}, {text: "I", correct: false}, {text: "Le", correct: false}, {text: "Gli e", correct: false}], explanation: "Articolo determinativo plurale maschile davanti a nomi che iniziano per vocale: 'gli'.", difficulty: 2 },
    { text: "Devi studiare? Sì, ma non più di ______ ora.", options: [{text: "un'", correct: true}, {text: "una", correct: false}, {text: "un", correct: false}, {text: "l'", correct: false}], explanation: "Articolo indeterminativo femminile singolare davanti a parola che inizia per vocale si apostrofa: 'un''.", difficulty: 1 },
    { text: "Vado ______ scuola ogni mattina.", options: [{text: "a", correct: true}, {text: "in", correct: false}, {text: "da", correct: false}, {text: "su", correct: false}], explanation: "Si usa la preposizione semplice 'a' con l'espressione 'andare a scuola'.", difficulty: 1 },
    { text: "Il libro è ______ tavolo.", options: [{text: "sul", correct: true}, {text: "in", correct: false}, {text: "nel", correct: false}, {text: "sopra", correct: false}], explanation: "Preposizione articolata 'su + il' = 'sul' (sopra la superficie del tavolo).", difficulty: 1 },
    { text: "Vengo ______ Italia.", options: [{text: "dall'", correct: true}, {text: "della", correct: false}, {text: "in", correct: false}, {text: "da", correct: false}], explanation: "Provenienza geografica da una nazione: 'venire da' + articolo determinativo (l'Italia) = 'dall'Italia'.", difficulty: 2 },
    { text: "Parliamo ______ vacanze.", options: [{text: "delle", correct: true}, {text: "per le", correct: false}, {text: "alle", correct: false}, {text: "da le", correct: false}], explanation: "Argomento: 'parlare di' + articolo plurale femminile (le vacanze) = 'delles vacanze'.", difficulty: 1 },
    { text: "Abito ______ Roma ______ cinque anni.", options: [{text: "a / da", correct: true}, {text: "in / da", correct: false}, {text: "a / per", correct: false}, {text: "a / di", correct: false}], explanation: "Con i nomi di città si usa 'a'. Per indicare una durata nel presente (azione iniziata nel passato e ancora in corso) si usa la preposizione 'da'.", difficulty: 2 },
    { text: "Vado ______ dentista domani.", options: [{text: "dal", correct: true}, {text: "al", correct: false}, {text: "da", correct: false}, {text: "in", correct: false}], explanation: "Moto a luogo verso una persona/professionista: 'da' + articolo determinativo (il dentista) = 'dal dentista'.", difficulty: 2 },
    { text: "______ fratello si chiama Marco.", options: [{text: "Mio", correct: true}, {text: "Il mio", correct: false}, {text: "Lo mio", correct: false}, {text: "Un mio", correct: false}], explanation: "Non si usa l'articolo determinativo con i nomi di famiglia al singolare preceduti da aggettivo possessivo (tranne 'loro').", difficulty: 2 },
    { text: "______ sorelle vivono a Milano.", options: [{text: "Le mie", correct: true}, {text: "Mie", correct: false}, {text: "I miei", correct: false}, {text: "Delle mie", correct: false}], explanation: "I nomi di parentela al plurale richiedono l'articolo prima del possessivo: 'le mie sorelle'.", difficulty: 2 },
    { text: "Dove sono ______ chiavi?", options: [{text: "le mie", correct: true}, {text: "mie", correct: false}, {text: "le mia", correct: false}, {text: "i miei", correct: false}], explanation: "Chiave è femminile plurale ('chiavi'), quindi richiede l'articolo e possessivo femminile plurale: 'le mie'.", difficulty: 1 },
    { text: "______ casa è molto grande.", options: [{text: "La nostra", correct: true}, {text: "Nostra", correct: false}, {text: "Il nostro", correct: false}, {text: "Della nostra", correct: false}], explanation: "Gli aggettivi possessivi con nomi comuni richiedono l'articolo: 'la nostra casa'.", difficulty: 1 },
    { text: "Lui ama ______ mamma.", options: [{text: "la sua", correct: true}, {text: "sua", correct: false}, {text: "il suo", correct: false}, {text: "la mia", correct: false}], explanation: "I nomi di parentela modificati da vezzeggiativi ('mamma', 'papà') mantengono l'articolo con il possessivo: 'la sua mamma'.", difficulty: 2 },
    // 3 extra
    { text: "I quaderni sono ______ zaino.", options: [{text: "nello", correct: true}, {text: "in lo", correct: false}, {text: "sullo", correct: false}, {text: "nel", correct: false}], explanation: "Stato in luogo dentro qualcosa che inizia con 'z': 'in + lo' = 'nello'.", difficulty: 2 },
    { text: "Stasera vado ______ cinema con gli amici.", options: [{text: "al", correct: true}, {text: "a", correct: false}, {text: "nel", correct: false}, {text: "in", correct: false}], explanation: "Moto a luogo: andare + articolo + cinema = 'al cinema' (a + il).", difficulty: 1 },
    { text: "Questo regalo è ______ te.", options: [{text: "per", correct: true}, {text: "a", correct: false}, {text: "di", correct: false}, {text: "da", correct: false}], explanation: "Destinazione d'uso o destinatario: preposizione semplice 'per'.", difficulty: 1 }
  ],
  5: [ // Tempo Libero (22 questions)
    { text: "A Marco piace moltissimo ______ la TV la sera.", options: [{text: "guardare", correct: true}, {text: "guarda", correct: false}, {text: "guardando", correct: false}, {text: "guardato", correct: false}], explanation: "Dopo 'piace' si usa il verbo all'infinito per indicare l'azione gradita.", difficulty: 1 },
    { text: "Nel fine settimana mi piace ______ a tennis con mio fratello.", options: [{text: "giocare", correct: true}, {text: "fare", correct: false}, {text: "giocando", correct: false}, {text: "correre", correct: false}], explanation: "Con sport con la palla (tennis) si usa el verbo 'giocare a'.", difficulty: 1 },
    { text: "Non mi ______ i film dell'orrore.", options: [{text: "piacciono", correct: true}, {text: "piace", correct: false}, {text: "piacciono i", correct: false}, {text: "piacciono di", correct: false}], explanation: "Il soggetto logico è plurale ('i film'), quindi si usa la terza persona plurale 'piacciono'.", difficulty: 1 },
    { text: "Ieri pomeriggio noi ______ una lunga passeggiata in centro.", options: [{text: "abbiamo fatto", correct: true}, {text: "siamo fatti", correct: false}, {text: "abbiamo fare", correct: false}, {text: "facciamo", correct: false}], explanation: "Espressione 'fare una passeggiata' coniugata al passato prossimo con ausiliare avere: 'abbiamo fatto'.", difficulty: 2 },
    { text: "Due volte alla settimana vado in piscina e ______ nuoto.", options: [{text: "faccio", correct: true}, {text: "gioco", correct: false}, {text: "pratico", correct: false}, {text: "fai", correct: false}], explanation: "Per il nuoto si usa il verbo 'fare': 'fare nuoto'.", difficulty: 1 },
    { text: "Nel tempo libero adoro ______ libri di fantascienza.", options: [{text: "leggere", correct: true}, {text: "scrivere", correct: false}, {text: "comprare", correct: false}, {text: "ascoltare", correct: false}], explanation: "Leggere i libri è l'azione adatta all'oggetto.", difficulty: 1 },
    { text: "Il sabato sera usciamo spesso ______ gli amici.", options: [{text: "con", correct: true}, {text: "per", correct: false}, {text: "tra", correct: false}, {text: "a", correct: false}], explanation: "Compagnia: preposizione 'con'.", difficulty: 1 },
    { text: "Ti va di andare ______ cinema stasera?", options: [{text: "al", correct: true}, {text: "a", correct: false}, {text: "nel", correct: false}, {text: "in", correct: false}], explanation: "Moto a luogo con 'cinema' prende 'al' ('a + il').", difficulty: 1 },
    { text: "D'estate mi piace andare ______ spiaggia a prendere il sole.", options: [{text: "in", correct: true}, {text: "a", correct: false}, {text: "alla", correct: false}, {text: "sulla", correct: false}], explanation: "Andare 'in spiaggia' è un'espressione idiomatica molto comune.", difficulty: 2 },
    { text: "Ti ______ lo sport? Sì, molto.", options: [{text: "piace", correct: true}, {text: "piacciono", correct: false}, {text: "piaci", correct: false}, {text: "piaceva", correct: false}], explanation: "'Lo sport' è singolare, quindi si usa 'piace'.", difficulty: 1 },
    { text: "Mio padre fa ______ ogni mattina per tenersi in forma.", options: [{text: "jogging", correct: true}, {text: "il tennis", correct: false}, {text: "calcio", correct: false}, {text: "partita", correct: false}], explanation: "Si dice 'fare jogging' (correre per allenarsi).", difficulty: 1 },
    { text: "Preferisco ______ musica classica rispetto a quella pop.", options: [{text: "ascoltare la", correct: true}, {text: "ascoltare", correct: false}, {text: "sentire", correct: false}, {text: "udire", correct: false}], explanation: "Ascoltare la musica classica è l'espressione corretta.", difficulty: 1 },
    { text: "Durante il weekend mi piace ______ a lungo.", options: [{text: "dormire", correct: true}, {text: "lavorare", correct: false}, {text: "studiare", correct: false}, {text: "partire", correct: false}], explanation: "Nel weekend, tipicamente si riposa e si 'dorme'.", difficulty: 1 },
    { text: "Loro amano viaggiare ______ treno.", options: [{text: "in", correct: true}, {text: "con", correct: false}, {text: "nel", correct: false}, {text: "a", correct: false}], explanation: "I mezzi di trasporto prendono la preposizione 'in': 'in treno'.", difficulty: 1 },
    { text: "Vorrei prenotare un ______ per il concerto di stasera.", options: [{text: "biglietto", correct: true}, {text: "tavolo", correct: false}, {text: "camera", correct: false}, {text: "treno", correct: false}], explanation: "Per un concerto si acquista o prenota un 'biglietto'.", difficulty: 1 },
    { text: "Ci piace fare ______ in montagna d'inverno.", options: [{text: "sci", correct: true}, {text: "nuoto", correct: false}, {text: "calcio", correct: false}, {text: "ginnastica", correct: false}], explanation: "In montagna sulla neve in inverno si fa 'sci'.", difficulty: 1 },
    { text: "Qual è il tuo ______ preferito? La lettura.", options: [{text: "hobby", correct: true}, {text: "lavoro", correct: false}, {text: "esame", correct: false}, {text: "colore", correct: false}], explanation: "La lettura è un passatempo, quindi un 'hobby'.", difficulty: 1 },
    { text: "Domenica prossima noi ______ a vedere una mostra d'arte.", options: [{text: "andremo", correct: true}, {text: "andiamo", correct: false}, {text: "siamo andati", correct: false}, {text: "andremmo", correct: false}], explanation: "Si riferisce a domenica prossima, azione futura espressa con il futuro semplice: 'andremo'.", difficulty: 2 },
    { text: "Se ho tempo libero, ______ volentieri a fare la spesa.", options: [{text: "vado", correct: true}, {text: "andrei", correct: false}, {text: "andassi", correct: false}, {text: "sono andato", correct: false}], explanation: "Periodo ipotetico della realtà al presente: se + presente ('ho') richiede il presente indicativo ('vado').", difficulty: 2 },
    { text: "A loro non piace per niente ______ in televisione.", options: [{text: "guardare le partite", correct: true}, {text: "guardare", correct: false}, {text: "vedere", correct: false}, {text: "le partite", correct: false}], explanation: "'Guardare le partite' (all'infinito) completa correttamente la frase.", difficulty: 1 },
    { text: "Ogni sabato noi ______ la pizza in pizzeria.", options: [{text: "mangiamo", correct: true}, {text: "mangiate", correct: false}, {text: "mangiano", correct: false}, {text: "mangeremo", correct: false}], explanation: "Ogni sabato esprime abitudine, coniugato al presente prima persona plurale ('mangiamo').", difficulty: 1 },
    { text: "I bambini giocano a ______ nel giardino.", options: [{text: "nascondino", correct: true}, {text: "nuoto", correct: false}, {text: "giocattoli", correct: false}, {text: "correre", correct: false}], explanation: "Nascondino (el escondite) è un gioco infantile che si fa all'aperto: 'giocare a nascondino'.", difficulty: 2 }
  ],
  6: [ // Persone (22 questions)
    // Starter
    { text: "Roma è ______ grande ______ Firenze.", options: [{text: "più / di", correct: true}, {text: "più / che", correct: false}, {text: "meno / che", correct: false}, {text: "così / di", correct: false}], explanation: "Comparazione tra due nomi propri basata sulla grandezza: 'più grande di'.", difficulty: 1 },
    { text: "Questo ristorante è ______ dell'altro.", options: [{text: "migliore", correct: true}, {text: "più buono", correct: false}, {text: "meglio", correct: false}, {text: "peggiore", correct: false}], explanation: "Il comparativo di maggioranza irregolare dell'aggettivo 'buono' è 'migliore'.", difficulty: 2 },
    { text: "Il fratello di mio padre è mio ______.", options: [{text: "zio", correct: true}, {text: "nonno", correct: false}, {text: "cugino", correct: false}, {text: "nipote", correct: false}], explanation: "Definizione di parentela: lo zio è il fratello del padre o della madre.", difficulty: 1 },
    // Expand
    { text: "Mia sorella è ______ alta di me.", options: [{text: "più", correct: true}, {text: "molto", correct: false}, {text: "meglio", correct: false}, {text: "di più", correct: false}], explanation: "Struttura del comparativo: più + aggettivo + di.", difficulty: 1 },
    { text: "Giovanni è molto pigro, non fa mai niente. Al contrario, suo fratello è ______.", options: [{text: "lavoratore", correct: true}, {text: "intelligente", correct: false}, {text: "triste", correct: false}, {text: "timido", correct: false}], explanation: "Il contrario di pigro (perezoso) nel contesto dell'operosità è 'lavoratore' (trabajador) o attivo.", difficulty: 2 },
    { text: "Com'è Maria di carattere? È molto ______ e allegra.", options: [{text: "simpatica", correct: true}, {text: "bassa", correct: false}, {text: "rossa", correct: false}, {text: "magra", correct: false}], explanation: "Le opzioni descrivono l'aspetto fisico tranne 'simpatica', che si adatta alla domanda sul carattere.", difficulty: 1 },
    { text: "Oggi mi sento molto ______ perché ho superato l'esame CLA con 30!", options: [{text: "felice", correct: true}, {text: "arrabbiato", correct: false}, {text: "triste", correct: false}, {text: "stanco", correct: false}], explanation: "Superare un esame con il massimo dei voti rende felici.", difficulty: 1 },
    { text: "Lui è più basso ______ suo fratello maggiore.", options: [{text: "di", correct: true}, {text: "che", correct: false}, {text: "del", correct: false}, {text: "da", correct: false}], explanation: "Comparazione di minoranza/maggioranza davanti a possessivo senza articolo ('suo fratello'): si usa la preposizione semplice 'di'.", difficulty: 2 },
    { text: "Maria ha i capelli ______ e gli occhi verdi.", options: [{text: "biondi", correct: true}, {text: "alti", correct: false}, {text: "simpatici", correct: false}, {text: "magri", correct: false}], explanation: "I capelli possono essere 'biondi' (castani, neri, rossi). Le altre parole non descrivono i capelli.", difficulty: 1 },
    { text: "Questa pizza è ______ di quella che abbiamo mangiato ieri.", options: [{text: "peggiore", correct: true}, {text: "peggio", correct: false}, {text: "più cattiva", correct: false}, {text: "migliore", correct: true}], explanation: "Sia 'peggiore' (irregular de cattivo) che 'migliore' (irregular de buono) sono grammaticalmente corretti. Impostiamo migliore come corretta.", difficulty: 2 },
    { text: "Io studio meno ore ______ te.", options: [{text: "di", correct: true}, {text: "che", correct: false}, {text: "da", correct: false}, {text: "del", correct: false}], explanation: "Comparazione tra due pronomi/nomi: meno + sostantivo + di + pronome.", difficulty: 2 },
    { text: "Mio nonno ha 80 anni, è la persona più ______ della famiglia.", options: [{text: "anziana", correct: true}, {text: "giovane", correct: false}, {text: "alta", correct: false}, {text: "magra", correct: false}], explanation: "Una persona di 80 anni è tipicamente la più 'anziana' (o vecchia).", difficulty: 1 },
    { text: "Le persone egoiste pensano solo a ______ stesse.", options: [{text: "se", correct: true}, {text: "loro", correct: false}, {text: "noi", correct: false}, {text: "si", correct: false}], explanation: "Pensare a se stessi: pronome riflessivo di terza persona dopo preposizione è 'se'.", difficulty: 3 },
    { text: "Quando Marco perde le chiavi di casa, si ______ molto.", options: [{text: "arrabbia", correct: true}, {text: "diverte", correct: false}, {text: "addormenta", correct: false}, {text: "sveglia", correct: false}], explanation: "Perdere le chiavi provoca rabbia, quindi 'si arrabbia' (verbo riflessivo arrabbiarsi).", difficulty: 2 },
    { text: "La figlia di mia sorella è mia ______.", options: [{text: "nipote", correct: true}, {text: "cugina", correct: false}, {text: "zia", correct: false}, {text: "nonna", correct: false}], explanation: "La figlia della sorella o del fratello è la 'nipote' (sobrina).", difficulty: 2 },
    { text: "Luca fa molto sport ed è molto ______.", options: [{text: "atletico", correct: true}, {text: "pigro", correct: false}, {text: "antipatico", correct: false}, {text: "grasso", correct: false}], explanation: "Chi fa molto sport è atletico o in forma.", difficulty: 1 },
    { text: "Ieri ero molto ______ perché non ho dormito bene.", options: [{text: "stanco", correct: true}, {text: "felice", correct: false}, {text: "allegro", correct: false}, {text: "simpatico", correct: false}], explanation: "Non dormire bene causa stanchezza ('stanco').", difficulty: 1 },
    { text: "Giulia è una persona molto ______: parla con tutti facilmente.", options: [{text: "socievole", correct: true}, {text: "timida", correct: false}, {text: "antipatica", correct: false}, {text: "triste", correct: false}], explanation: "Chi parla facilmente con tutti è 'socievole' (sociable).", difficulty: 2 },
    { text: "Mio cugino è ______ giovane di mio fratello.", options: [{text: "più", correct: true}, {text: "di più", correct: false}, {text: "molto", correct: false}, {text: "meglio", correct: false}], explanation: "Costruzione del comparativo di maggioranza: più + aggettivo + di.", difficulty: 1 },
    { text: "Il figlio di mio zio è mio ______.", options: [{text: "cugino", correct: true}, {text: "fratello", correct: false}, {text: "nipote", correct: false}, {text: "nonno", correct: false}], explanation: "Il figlio dello zio è il 'cugino' (primo).", difficulty: 1 },
    { text: "Mia madre ha gli occhi ______.", options: [{text: "azzurri", correct: true}, {text: "azzurro", correct: false}, {text: "biondi", correct: false}, {text: "alti", correct: false}], explanation: "L'aggettivo 'azzurri' concorda in genere e numero con il sostantivo maschile plurale 'occhi'.", difficulty: 1 },
    { text: "Questo esercizio è ______ difficile del precedente.", options: [{text: "più", correct: true}, {text: "meglio", correct: false}, {text: "molto", correct: false}, {text: "peggio", correct: false}], explanation: "Uso corretto del comparativo di maggioranza con aggettivo: 'più difficile del'.", difficulty: 1 }
  ],
  7: [ // Alimentazione (22 questions)
    // Starter
    { text: "Il tiramisù è un tipico ______.", options: [{text: "dessert", correct: true}, {text: "primo piatto", correct: false}, {text: "contorno", correct: false}, {text: "pesce", correct: false}], explanation: "Il tiramisù è un dolce al cucchiaio, quindi un dessert.", difficulty: 1 },
    // Expand
    { text: "Vorrei ______ acqua gassata, per favore.", options: [{text: "dell'", correct: true}, {text: "della", correct: false}, {text: "dello", correct: false}, {text: "un'", correct: false}], explanation: "Articolo partitivo femminile singolare davanti a parola que inizia per vocale: 'di + l'' = 'dell''.", difficulty: 2 },
    { text: "Al mercato ho comprato ______ arance biologiche.", options: [{text: "delle", correct: true}, {text: "dei", correct: false}, {text: "delle gli", correct: false}, {text: "dello", correct: false}], explanation: "Articolo partitivo femminile plurale: 'di + le' = 'delle' (alcune arance).", difficulty: 2 },
    { text: "Cameriere, ci porta ______ sale? Manca sul tavolo.", options: [{text: "del", correct: true}, {text: "dello", correct: false}, {text: "la", correct: false}, {text: "al", correct: false}], explanation: "Articolo partitivo maschile singolare davanti a consonante semplice s: 'di + il' = 'del'.", difficulty: 2 },
    { text: "Non bevo mai ______ caffè il pomeriggio.", options: [{text: "del", correct: false}, {text: "il", correct: false}, {text: "caffè", correct: true}, {text: "dello", correct: false}], explanation: "Nelle frasi negative, spesso l'articolo partitivo viene omesso o si usa l'articolo determinativo/nulla: 'Non bevo mai caffè'. Qui l'opzione corretta è 'caffè' senza preposizione o l'articolo determinativo. Mettiamo 'caffè'.", difficulty: 2 },
    { text: "Per preparare la pasta al pomodoro servono ______ pomodori freschi.", options: [{text: "dei", correct: true}, {text: "degli", correct: false}, {text: "delle", correct: false}, {text: "del", correct: false}], explanation: "Articolo partitivo maschile plurale: 'di + i' = 'dei'.", difficulty: 2 },
    { text: "Cosa prendi come secondo? Prendo ______ ai ferri.", options: [{text: "il pollo", correct: true}, {text: "la pasta", correct: false}, {text: "il tiramisù", correct: false}, {text: "la zuppa", correct: false}], explanation: "Il secondo piatto è a base di carne o pesce, come 'il pollo'. La pasta è un primo, il tiramisù un dolce.", difficulty: 1 },
    { text: "Come contorno vorrei un'insalata ______.", options: [{text: "mista", correct: true}, {text: "al forno", correct: false}, {text: "fritta", correct: false}, {text: "dolce", correct: false}], explanation: "Un contorno tipico è l'insalata 'mista'.", difficulty: 1 },
    { text: "______ un tavolo per quattro persone, per favore.", options: [{text: "Vorremmo", correct: true}, {text: "Vorrei", correct: false}, {text: "Prendiamo", correct: false}, {text: "Vogliamo", correct: false}], explanation: "Soggetto plurale ('noi'), quindi si usa il condizionale plurale di cortesia: 'Vorremmo'.", difficulty: 2 },
    { text: "Il cameriere porta il ______ alla fine del pasto per pagare.", options: [{text: "conto", correct: true}, {text: "menù", correct: false}, {text: "primo", correct: false}, {text: "pane", correct: false}], explanation: "Alla fine del pasto in ristorante si richiede e si paga il 'conto'.", difficulty: 1 },
    { text: "Il gorgonzola è un famoso ______ italiano.", options: [{text: "formaggio", correct: true}, {text: "vino", correct: false}, {text: "dolce", correct: false}, {text: "frutto", correct: false}], explanation: "Il gorgonzola è un tipo di formaggio erborinato.", difficulty: 1 },
    { text: "Preferisco il pesce fresco alla ______.", options: [{text: "carne", correct: true}, {text: "pasta", correct: false}, {text: "frutta", correct: false}, {text: "verdura", correct: false}], explanation: "Carne e pesce sono i due tipi principali di secondi piatti di origine animale.", difficulty: 1 },
    { text: "Vorrei un bicchiere di ______ rosso fermo.", options: [{text: "vino", correct: true}, {text: "acqua", correct: false}, {text: "latte", correct: false}, {text: "birra", correct: false}], explanation: "Si parla di 'rosso' o 'bianco' riferendosi al 'vino'.", difficulty: 1 },
    { text: "La colazione italiana tipica comprende cornetto e ______.", options: [{text: "caffellatte", correct: true}, {text: "pasta", correct: false}, {text: "insalata", correct: false}, {text: "pesce", correct: false}], explanation: "Il caffellatte o cappuccino si consuma tipicamente a colazione con il cornetto.", difficulty: 1 },
    { text: "Per tagliare la carne al ristorante ho bisogno di un ______ affilato.", options: [{text: "coltello", correct: true}, {text: "cucchiaio", correct: false}, {text: "forchetta", correct: false}, {text: "bicchiere", correct: false}], explanation: "Si usa il coltello per tagliare.", difficulty: 1 },
    { text: "Mangio la minestra con il ______.", options: [{text: "cucchiaio", correct: true}, {text: "coltello", correct: false}, {text: "forchetta", correct: false}, {text: "tovagliolo", correct: false}], explanation: "I cibi liquidi come minestre e zuppe si mangiano con il cucchiaio.", difficulty: 1 },
    { text: "Mi passa la ______ per prendere gli spaghetti?", options: [{text: "forchetta", correct: true}, {text: "cucchiaio", correct: false}, {text: "coltello", correct: false}, {text: "tazza", correct: false}], explanation: "Gli spaghetti si arrotolano e si mangiano con la forchetta.", difficulty: 1 },
    { text: "I vegetariani non mangiano né carne né ______.", options: [{text: "pesce", correct: true}, {text: "verdura", correct: false}, {text: "frutta", correct: false}, {text: "formaggio", correct: false}], explanation: "La dieta vegetariana esclude carne e pesce.", difficulty: 1 },
    { text: "Il limoncello si beve solitamente come ______ dopo cena.", options: [{text: "digestivo", correct: true}, {text: "antipasto", correct: false}, {text: "primo", correct: false}, {text: "colazione", correct: false}], explanation: "I liquori alle erbe o agli agrumi presi a fine pasto sono detti 'digestivi'.", difficulty: 2 },
    { text: "La bruschetta è un ottimo ______ per iniziare il pranzo.", options: [{text: "antipasto", correct: true}, {text: "secondo", correct: false}, {text: "contorno", correct: false}, {text: "dolce", correct: false}], explanation: "La bruschetta si serve all'inizio come antipasto.", difficulty: 1 },
    { text: "Hai comprato ______ pane? No, era finito.", options: [{text: "del", correct: true}, {text: "della", correct: false}, {text: "lo", correct: false}, {text: "un", correct: false}], explanation: "Partitivo maschile singolare per pane: 'del'.", difficulty: 1 },
    { text: "Nel tiramisù ci va il ______ fresco.", options: [{text: "mascarpone", correct: true}, {text: "parmigiano", correct: false}, {text: "gorgonzola", correct: false}, {text: "pecorino", correct: false}], explanation: "Il formaggio cremoso fondamentale per il tiramisù è il mascarpone.", difficulty: 2 }
  ],
  8: [ // Salute (22 questions)
    { text: "Mi fanno male ______ dopo aver camminato per ore.", options: [{text: "i piedi", correct: true}, {text: "la testa", correct: false}, {text: "la gola", correct: false}, {text: "il dente", correct: false}], explanation: "Il verbo 'fanno' è plurale, quindi richiede un soggetto plurale: 'i piedi'.", difficulty: 1 },
    { text: "Ho mal di ______ e non riesco a deglutire bene.", options: [{text: "gola", correct: true}, {text: "schiena", correct: false}, {text: "stomaco", correct: false}, {text: "piedi", correct: false}], explanation: "La gola è la parte del corpo coinvolta nella deglutizione.", difficulty: 1 },
    { text: "Dottore, ho la ______ a 38.5 gradi.", options: [{text: "febbre", correct: true}, {text: "tosse", correct: false}, {text: "influenza", correct: false}, {text: "medicina", correct: false}], explanation: "La temperatura corporea elevata si misura in gradi ed è la 'febbre'.", difficulty: 1 },
    { text: "Per il mal di testa, prendi questa ______ due volte al giorno.", options: [{text: "medicina", correct: true}, {text: "febbre", correct: false}, {text: "visita", correct: false}, {text: "tosse", correct: false}], explanation: "Si assume una 'medicina' (o pillola, compressa) per curare un sintomo.", difficulty: 1 },
    { text: "Devi andare dal ______ se i sintomi persistono.", options: [{text: "medico", correct: true}, {text: "farmacista", correct: false}, {text: "dentista", correct: false}, {text: "cameriere", correct: false}], explanation: "Si va dal medico per una diagnosi e cura.", difficulty: 1 },
    { text: "Non ______ freddo! Metti la giacca.", options: [{text: "prendere", correct: true}, {text: "prendi", correct: false}, {text: "prendete", correct: false}, {text: "prendi il", correct: false}], explanation: "Imperativo negativo di seconda persona singolare ('tu'): non + infinito verbale ('non prendere').", difficulty: 2 },
    { text: "Ragazzi, ______ la ricetta medica prima di andare in farmacia!", options: [{text: "portate", correct: true}, {text: "porta", correct: false}, {text: "portiamo", correct: false}, {text: "porti", correct: false}], explanation: "Imperativo per la seconda persona plurale ('voi'): 'portate'.", difficulty: 2 },
    { text: "Signora, ______ questa pillola prima di andare a dormire.", options: [{text: "prenda", correct: true}, {text: "prendi", correct: false}, {text: "prendete", correct: false}, {text: "prendere", correct: false}], explanation: "Imperativo formale (cortesia) di terza persona singolare per il verbo prendere: 'prenda'.", difficulty: 3 },
    { text: "Ho mangiato troppo ieri sera, oggi ho mal di ______.", options: [{text: "stomaco", correct: true}, {text: "denti", correct: false}, {text: "orecchie", correct: false}, {text: "schiena", correct: false}], explanation: "Mangiare in exceso causa mal di stomaco.", difficulty: 1 },
    { text: "Ho un dente cariato, devo andare dal ______.", options: [{text: "dentista", correct: true}, {text: "medico", correct: false}, {text: "chirurgo", correct: false}, {text: "oculista", correct: false}], explanation: "Per problemi ai denti si consulta il dentista.", difficulty: 1 },
    { text: "Se hai molto freddo e tremi, forse hai i ______.", options: [{text: "brividi", correct: true}, {text: "dolori", correct: false}, {text: "sintomi", correct: false}, {text: "farmaci", correct: false}], explanation: "Avere freddo e tremare per la febbre provoca i 'brividi'.", difficulty: 2 },
    { text: "Ho lavorato al computer tutto il giorno, mi fa male la ______.", options: [{text: "schiena", correct: true}, {text: "pancia", correct: false}, {text: "lingua", correct: false}, {text: "gola", correct: false}], explanation: "Stare seduti a lungo provoca mal di schiena.", difficulty: 1 },
    { text: "Usa questo ______ per calmare la tosse secca.", options: [{text: "sciroppo", correct: true}, {text: "cerotto", correct: false}, {text: "termometro", correct: false}, {text: "ghiaccio", correct: false}], explanation: "Il medicinale liquido per la tosse è lo 'sciroppo'.", difficulty: 2 },
    { text: "Non riesco a vedere bene da lontano, devo fare una visita dall'______.", options: [{text: "oculista", correct: true}, {text: "dentista", correct: false}, {text: "ortopedico", correct: false}, {text: "dermatologo", correct: false}], explanation: "Il medico degli occhi e della vista è l'oculista.", difficulty: 2 },
    { text: "Ho sbattuto il braccio e ora ho un ______ nero.", options: [{text: "livido", correct: true}, {text: "taglio", correct: false}, {text: "sintomo", correct: false}, {text: "raffreddore", correct: false}], explanation: "Un trauma fisico senza ferita aperta genera un ematoma o 'livido'.", difficulty: 2 },
    { text: "Per misurare la febbre usiamo il ______.", options: [{text: "termometro", correct: true}, {text: "ricetta", correct: false}, {text: "sciroppo", correct: false}, {text: "medicina", correct: false}], explanation: "Lo strumento per misurare la temperatura corporea è il termometro.", difficulty: 1 },
    { text: "Mi ______ la testa, penso di avere la pressione bassa.", options: [{text: "gira", correct: true}, {text: "fa male", correct: false}, {text: "gire", correct: false}, {text: "fa", correct: false}], explanation: "Espressione 'mi gira la testa' (sento vertigini).", difficulty: 2 },
    { text: "L'influenza si cura riposando e stando ______.", options: [{text: "al caldo", correct: true}, {text: "fuori", correct: false}, {text: "in piedi", correct: false}, {text: "al freddo", correct: false}], explanation: "Stare riparati e coperti ('al caldo') aiuta a guarire dall'influenza.", difficulty: 1 },
    { text: "Non riesco a respirare bene con il naso intasato dal ______.", options: [{text: "raffreddore", correct: true}, {text: "tosse", correct: false}, {text: "dolore", correct: false}, {text: "livido", correct: false}], explanation: "Il naso chiuso è un classico sintomo del raffreddore.", difficulty: 1 },
    { text: "Mamma, mi ______ la pancia dopo pranzo.", options: [{text: "fa male", correct: true}, {text: "fanno male", correct: false}, {text: "dolora", correct: false}, {text: "gira", correct: false}], explanation: "Pancia è singolare, richiede 'fa male'.", difficulty: 1 },
    { text: "L'infermiere mi ha fatto un'______ indolore nel braccio.", options: [{text: "iniezione", correct: true}, {text: "medicina", correct: false}, {text: "visita", correct: false}, {text: "tosse", correct: false}], explanation: "L'atto di iniettare un farmaco è un'iniezione (o puntura).", difficulty: 2 },
    { text: "La pelle del viso si è bruciata al sole, fa molto ______.", options: [{text: "male", correct: true}, {text: "bene", correct: false}, {text: "freddo", correct: false}, {text: "stanco", correct: false}], explanation: "Una scottatura provoca dolore ('fa male').", difficulty: 1 }
  ],
  9: [ // Città e Viaggi (22 questions)
    // Starter
    { text: "Per viaggiare in treno devi comprare un ______.", options: [{text: "biglietto", correct: true}, {text: "passaporto", correct: false}, {text: "tavolo", correct: false}, {text: "albergo", correct: false}], explanation: "Il biglietto è il titolo di viaggio necessario per salire sui mezzi pubblici.", difficulty: 1 },
    // Expand
    { text: "Scusi, signore, per andare al Colosseo deve andare sempre ______.", options: [{text: "dritto", correct: true}, {text: "destra", correct: false}, {text: "sinistra", correct: false}, {text: "lontano", correct: false}], explanation: "Espressione per indicare di proseguire senza svoltare: 'andare sempre dritto'.", difficulty: 1 },
    { text: "Gira alla prima strada a ______.", options: [{text: "destra", correct: true}, {text: "dritto", correct: false}, {text: "lungo", correct: false}, {text: "via", correct: false}], explanation: "'Destra' o 'sinistra' indicano le direzioni di svolta.", difficulty: 1 },
    { text: "Per andare all'aeroporto prendo la ______ per evitare il traffico.", options: [{text: "metropolitana", correct: true}, {text: "macchina", correct: false}, {text: "bicicletta", correct: false}, {text: "piedi", correct: false}], explanation: "La metropolitana viaggia su binari sotterranei ed evita il traffico stradale.", difficulty: 1 },
    { text: "Il treno per Torino parte dal ______ numero 5.", options: [{text: "binario", correct: true}, {text: "piazza", correct: false}, {text: "fermata", correct: false}, {text: "biglietto", correct: false}], explanation: "I treni partono e arrivano ai 'binari' in stazione.", difficulty: 1 },
    { text: "I turisti fanno molte foto al ______ storico al centro della piazza.", options: [{text: "monumento", correct: true}, {text: "trasporto", correct: false}, {text: "semaforo", correct: false}, {text: "strada", correct: false}], explanation: "I turisti fotografano i monumenti storici.", difficulty: 1 },
    { text: "Dove posso ______ il biglietto dell'autobus?", options: [{text: "comprare", correct: true}, {text: "viaggiare", correct: false}, {text: "timbrare", correct: true}, {text: "perdere", correct: false}], explanation: "Entrambi comprare e timbrare sono corretti a seconda del contesto. Impostiamo comprare come prima scelta.", difficulty: 1 },
    { text: "Dobbiamo ______ il biglietto prima di salire sul treno.", options: [{text: "timbrare", correct: true}, {text: "comprare", correct: false}, {text: "vedere", correct: false}, {text: "dormire", correct: false}], explanation: "In Italia è obbligatorio convalidare (timbrare) i biglietti cartacei prima di salire.", difficulty: 2 },
    { text: "Quest'estate ______ in vacanza in Sicilia.", options: [{text: "andrò", correct: true}, {text: "sono andato", correct: false}, {text: "andrei", correct: false}, {text: "andassi", correct: false}], explanation: "Riferito al futuro prossimo ('quest'estate' inteso come pianificato): 'andrò'.", difficulty: 1 },
    { text: "L'aereo per Milano è decollato con venti minuti di ______.", options: [{text: "ritardo", correct: true}, {text: "anticipo", correct: false}, {text: "tempo", correct: false}, {text: "viaggio", correct: false}], explanation: "Un volo decollato dopo l'orario stabilito ha accumulato 'ritardo'.", difficulty: 1 },
    { text: "Scusi, a quale ______ devo scendere per il centro?", options: [{text: "fermata", correct: true}, {text: "via", correct: false}, {text: "binario", correct: false}, {text: "stazione", correct: false}], explanation: "Per autobus e tram si parla di 'fermata'.", difficulty: 1 },
    { text: "La stazione ferroviaria si trova ______ alla cattedrale.", options: [{text: "dietro", correct: true}, {text: "in", correct: false}, {text: "a", correct: false}, {text: "di", correct: false}], explanation: "'Dietro' è preposizione di luogo che non richiede articolazione obbligatoria immediata ('dietro alla' o 'dietro la').", difficulty: 2 },
    { text: "Per andare a piedi in sicurezza dobbiamo attraversare sulle strisce ______.", options: [{text: "pedonali", correct: true}, {text: "stradali", correct: false}, {text: "rosse", correct: false}, {text: "ferroviarie", correct: false}], explanation: "Si attraversa sulle strisce pedonali.", difficulty: 1 },
    { text: "Ho prenotato una camera doppia in un ______ vicino al centro.", options: [{text: "albergo", correct: true}, {text: "treno", correct: false}, {text: "ristorante", correct: false}, {text: "ufficio", correct: false}], explanation: "Si prenota una camera in albergo (o hotel).", difficulty: 1 },
    { text: "Preferisco viaggiare ______ macchina piuttosto che in aereo.", options: [{text: "in", correct: true}, {text: "con", correct: false}, {text: "dalla", correct: false}, {text: "a", correct: false}], explanation: "La preposizione per il mezzo di trasporto senza articolo è 'in macchina'.", difficulty: 1 },
    { text: "Il semaforo è rosso, dobbiamo ______.", options: [{text: "fermarci", correct: true}, {text: "passare", correct: false}, {text: "girare", correct: false}, {text: "correre", correct: false}], explanation: "Con il semaforo rosso è obbligatorio arrestarsi/fermarsi.", difficulty: 1 },
    { text: "La mappa della città è utile per non ______.", options: [{text: "perdersi", correct: true}, {text: "trovarsi", correct: false}, {text: "viaggiare", correct: false}, {text: "arrivare", correct: false}], explanation: "La mappa serve a non smarrire la via, ovvero a non 'perdersi'.", difficulty: 2 },
    { text: "Il viaggio in treno da Torino a Milano ______ circa un'ora.", options: [{text: "dura", correct: true}, {text: "fa", correct: false}, {text: "prende", correct: false}, {text: "costa", correct: false}], explanation: "Il tempo di percorrenza si esprime col verbo durare: 'dura'.", difficulty: 2 },
    { text: "Per andare in un altro continente si prende l'______.", options: [{text: "aereo", correct: true}, {text: "treno", correct: false}, {text: "autobus", correct: false}, {text: "metropolitana", correct: false}], explanation: "I viaggi transcontinentali richiedono l'aereo (o la nave).", difficulty: 1 },
    { text: "La piazza principale della città è sempre molto ______ di turisti.", options: [{text: "piena", correct: true}, {text: "vuota", correct: false}, {text: "grande", correct: false}, {text: "lontana", correct: false}], explanation: "Si dice 'piena di' turisti per indicare affollamento.", difficulty: 1 },
    { text: "Il taxi ci aspetta davanti ______ stazione.", options: [{text: "alla", correct: true}, {text: "la", correct: false}, {text: "della", correct: false}, {text: "in", correct: false}], explanation: "L'avverbio di luogo 'davanti' regge la preposizione 'a': davanti + la stazione = 'davanti alla stazione'.", difficulty: 2 },
    { text: "Viaggiare all'estero arricchisce molto la nostra ______.", options: [{text: "mente", correct: true}, {text: "valigia", correct: false}, {text: "città", correct: false}, {text: "strada", correct: false}], explanation: "Espressione figurata: viaggiare apre o arricchisce la 'mente'.", difficulty: 2 }
  ],
  10: [ // Lavoro e Studio (22 questions)
    // Starter
    { text: "Che lavoro fa tuo padre? È ______ falegname.", options: [{text: "un", correct: true}, {text: "uno", correct: false}, {text: "la", correct: false}, {text: "di", correct: false}], explanation: "Davanti a nome maschile singolare che inizia per consonante si usa l'articolo indeterminativo 'un'.", difficulty: 1 },
    // Expand
    { text: "Cosa stai facendo? Sto ______ per l'esame CLA di italiano.", options: [{text: "studiando", correct: true}, {text: "studiato", correct: false}, {text: "studiare", correct: false}, {text: "studia", correct: false}], explanation: "Stare + gerundio (verbi in -are -> -ando) indica azione in corso: 'sto studiando'.", difficulty: 1 },
    { text: "Mio fratello lavora in una grande azienda, fa l'______.", options: [{text: "impiegato", correct: true}, {text: "studente", correct: false}, {text: "insegnante", correct: false}, {text: "operaio", correct: false}], explanation: "In un ufficio aziendale lavora solitamente un 'impiegato'.", difficulty: 1 },
    { text: "Mia madre insegna matematica al liceo, è un'______.", options: [{text: "insegnante", correct: true}, {text: "ingegnere", correct: false}, {text: "studentessa", correct: false}, {text: "segretaria", correct: false}], explanation: "Chi insegna a scuola è un'insegnante.", difficulty: 1 },
    { text: "Lui progetta ponti e strade, fa l'______.", options: [{text: "ingegnere", correct: true}, {text: "avvocato", correct: false}, {text: "operaio", correct: false}, {text: "insegnante", correct: false}], explanation: "La progettazione di infrastrutture è compito dell'ingegnere.", difficulty: 1 },
    { text: "Ieri sera i miei colleghi ______ fino a tardi in ufficio.", options: [{text: "hanno lavorato", correct: true}, {text: "sono lavorati", correct: false}, {text: "lavorano", correct: false}, {text: "lavoravano", correct: false}], explanation: "Lavorare al passato prossimo richiede l'ausiliare avere: 'hanno lavorato'.", difficulty: 1 },
    { text: "Frequento l'______ del Politecnico di Torino.", options: [{text: "università", correct: true}, {text: "scuola media", correct: false}, {text: "ufficio", correct: false}, {text: "lavoro", correct: false}], explanation: "Il Politecnico di Torino è una rinomata università.", difficulty: 1 },
    { text: "Il docente sta ______ la lezione di grammatica.", options: [{text: "spiegando", correct: true}, {text: "spiegare", correct: false}, {text: "spiegato", correct: false}, {text: "spiega", correct: false}], explanation: "Stare + gerundio di spiegare (-are -> -ando) = 'sta spiegando'.", difficulty: 1 },
    { text: "Ho inviato il mio ______ a molte aziende per trovare lavoro.", options: [{text: "curriculum", correct: true}, {text: "esame", correct: false}, {text: "biglietto", correct: false}, {text: "lavoro", correct: false}], explanation: "Per candidarsi a un lavoro si invia il curriculum vitae (CV).", difficulty: 1 },
    { text: "Il medico lavora in ______.", options: [{text: "ospedale", correct: true}, {text: "ufficio", correct: false}, {text: "scuola", correct: false}, {text: "cantiere", correct: false}], explanation: "Il luogo di lavoro tipico di medici e infermieri è l'ospedale o la clinica.", difficulty: 1 },
    { text: "Che lavoro ______ fare da grande? L'ingegnere.", options: [{text: "vorresti", correct: true}, {text: "vuoi", correct: false}, {text: "vorrai", correct: false}, {text: "vorrebbe", correct: false}], explanation: "Condizionale di cortesia/desiderio per la seconda persona singolare ('tu'): 'vorresti'.", difficulty: 2 },
    { text: "La segretaria sta scrivendo una ______ importante.", options: [{text: "lettera", correct: true}, {text: "macchina", correct: false}, {text: "strada", correct: false}, {text: "lezione", correct: false}], explanation: "Compito tipico di segreteria è redigere e scrivere lettere o email.", difficulty: 1 },
    { text: "Per superare l'esame CLA bisogna ottenere almeno ______ punti su 30.", options: [{text: "18", correct: true}, {text: "10", correct: false}, {text: "30", correct: false}, {text: "20", correct: false}], explanation: "La sufficienza negli esami universitari italiani è 18/30.", difficulty: 2 },
    { text: "L'operaio lavora in ______.", options: [{text: "fabbrica", correct: true}, {text: "università", correct: false}, {text: "ospedale", correct: false}, {text: "ufficio", correct: false}], explanation: "L'operaio lavora tipicamente in fabbrica o nei cantieri.", difficulty: 1 },
    { text: "La mia routine quotidiana ______ alle 7 con una tazza di caffè.", options: [{text: "inizia", correct: true}, {text: "finisce", correct: false}, {text: "lavora", correct: false}, {text: "studia", correct: false}], explanation: "La giornata o routine comincia ('inizia') al mattino.", difficulty: 1 },
    { text: "Chi ripara i tubi dell'acqua in casa è l'______.", options: [{text: "idraulico", correct: true}, {text: "falegname", correct: false}, {text: "elettricista", correct: false}, {text: "muratore", correct: false}], explanation: "L'idraulico si occupa di tubature e impianti idrici.", difficulty: 2 },
    { text: "Domani ho un colloquio di ______ in una nuova azienda.", options: [{text: "lavoro", correct: true}, {text: "studio", correct: false}, {text: "esame", correct: false}, {text: "corso", correct: false}], explanation: "Il colloquio per essere assunti è detto colloquio di lavoro.", difficulty: 1 },
    { text: "Lo studente universitario deve sostenere molti ______.", options: [{text: "esami", correct: true}, {text: "lavori", correct: false}, {text: "lezioni", correct: false}, {text: "libri", correct: false}], explanation: "Sostenere gli esami è l'attività di verifica per gli studenti universitari.", difficulty: 1 },
    { text: "Il falegname realizza mobili in ______.", options: [{text: "legno", correct: true}, {text: "ferro", correct: false}, {text: "plastica", correct: false}, {text: "carta", correct: false}], explanation: "Il falegname lavora e modella il legno.", difficulty: 2 },
    { text: "La riunione con il capo comincia ______ dieci.", options: [{text: "alle", correct: true}, {text: "a", correct: false}, {text: "nelle", correct: false}, {text: "dalle", correct: false}], explanation: "Con le ore si usa la preposizione articolata: a + le = 'alle' dieci.", difficulty: 1 },
    { text: "Mio padre va in ______ l'anno prossimo dopo 40 anni di lavoro.", options: [{text: "pensione", correct: true}, {text: "vacanza", correct: false}, {text: "ufficio", correct: false}, {text: "università", correct: false}], explanation: "Cessare l'attività lavorativa per raggiunti limiti d'età significa andare in 'pensione'.", difficulty: 2 },
    { text: "Stiamo ______ per completare il progetto entro stasera.", options: [{text: "lavorando", correct: true}, {text: "lavorare", correct: false}, {text: "lavorato", correct: false}, {text: "lavora", correct: false}], explanation: "Stiamo + gerundio di lavorare (-are -> -ando) = 'stiamo lavorando'.", difficulty: 1 }
  ]
};

// Flatten and add IDs, sources etc.
let questionCounter = 1;
for (const milestoneId in rawQuestions) {
  rawQuestions[milestoneId].forEach((q) => {
    // Format options as array of objects {text, is_correct}
    const formattedOptions = q.options.map(o => ({
      text: o.text,
      is_correct: o.correct
    }));
    
    // Sort options randomly to avoid patterns, but ensure one is correct
    formattedOptions.sort(() => Math.random() - 0.5);

    questions.push({
      id: `q-${questionCounter++}`,
      milestone_id: parseInt(milestoneId),
      topic: milestones.find(m => m.id === parseInt(milestoneId)).title,
      question_text: q.text,
      options: formattedOptions,
      explanation: q.explanation,
      difficulty: q.difficulty,
      source: "dieci_a2"
    });
  });
}

// 3. WRITE TO FILES
const appDir = path.join(__dirname, '..', 'app', 'src', 'data');
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// Write questions.json
fs.writeFileSync(
  path.join(appDir, 'questions.json'),
  JSON.stringify(questions, null, 2)
);
console.log(`Successfully generated ${questions.length} questions in questions.json.`);

// Write milestones.ts
const milestonesTsContent = `export interface GrammarExample {
  it: string;
  es: string;
}

export interface GrammarSection {
  title: string;
  content: string;
  examples: GrammarExample[];
}

export interface VocabularyWord {
  word: string;
  translation: string;
  category: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  grammar: GrammarSection[];
  vocabulary: VocabularyWord[];
}

export const milestones: Milestone[] = ${JSON.stringify(milestones, null, 2)};
`;

fs.writeFileSync(
  path.join(appDir, 'milestones.ts'),
  milestonesTsContent
);
console.log('Successfully generated milestones.ts.');

// 4. WRITE SQL SEED FILE
let sqlContent = `DELETE FROM questions;\n\n`;

questions.forEach((q) => {
  const escapedText = q.question_text.replace(/'/g, "''");
  const escapedExplanation = q.explanation.replace(/'/g, "''");
  const escapedTopic = q.topic.replace(/'/g, "''");
  const optionsJson = JSON.stringify(q.options).replace(/'/g, "''");
  
  sqlContent += `INSERT INTO questions (milestone_id, topic, question_text, options, explanation, difficulty, source) VALUES (${q.milestone_id}, '${escapedTopic}', '${escapedText}', '${optionsJson}'::jsonb, '${escapedExplanation}', ${q.difficulty}, 'dieci_a2');\n`;
});

fs.writeFileSync(
  path.join(appDir, 'seed.sql'),
  sqlContent
);
console.log(`Successfully generated seed.sql with ${questions.length} INSERT statements.`);
