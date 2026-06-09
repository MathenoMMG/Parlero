export interface GrammarExample {
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

export const milestones: Milestone[] = [
  {
    "id": 1,
    "title": "I Tempi Verbali",
    "description": "Presente, passato prossimo, imperfetto, futuro e condizionale",
    "grammar": [
      {
        "title": "Presente Indicativo",
        "content": "Se usa para acciones habituales, verdades generales o el presente continuo. Los verbos se dividen en -are, -ere, -ire.",
        "examples": [
          {
            "it": "Marco fa sempre colazione alle 7.",
            "es": "Marco siempre desayuna a las 7."
          },
          {
            "it": "Noi viviamo in una casa grande.",
            "es": "Nosotros vivimos en una casa grande."
          }
        ]
      },
      {
        "title": "Passato Prossimo",
        "content": "Para acciones pasadas terminadas y delimitadas. Se forma con el auxiliar ESSERE o AVERE en presente + participio pasado del verbo.",
        "examples": [
          {
            "it": "Ieri ho comprato un libro.",
            "es": "Ayer compré un libro."
          },
          {
            "it": "Anna è uscita con gli amici.",
            "es": "Anna salió con sus amigos."
          }
        ]
      },
      {
        "title": "Imperfetto vs Passato Prossimo",
        "content": "El Imperfetto describe acciones habituales en el pasado, descripciones o estados continuos. El Passato Prossimo indica eventos puntuales e interrupciones.",
        "examples": [
          {
            "it": "Mentre mangiavo, ha telefonato Marco.",
            "es": "Mientras comía, llamó Marco."
          },
          {
            "it": "Da bambino giocavo sempre al parco.",
            "es": "De niño jugaba siempre en el parque."
          }
        ]
      },
      {
        "title": "Futuro Semplice & Condizionale",
        "content": "El Futuro indica planes futuros o predicciones. El Condizionale se usa para deseos, cortesía ('vorrei') o hipótesis.",
        "examples": [
          {
            "it": "Domani andremo al mare.",
            "es": "Mañana iremos al mar."
          },
          {
            "it": "Vorrei un caffè, per favore.",
            "es": "Querría un café, por favor."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "mangiare",
        "translation": "comer",
        "category": "Verbos"
      },
      {
        "word": "andare",
        "translation": "ir",
        "category": "Verbos"
      },
      {
        "word": "fare",
        "translation": "hacer",
        "category": "Verbos"
      },
      {
        "word": "giocare",
        "translation": "jugar",
        "category": "Verbos"
      },
      {
        "word": "prendere",
        "translation": "tomar/coger",
        "category": "Verbos"
      },
      {
        "word": "svegliarsi",
        "translation": "despertarse",
        "category": "Riflessivi"
      },
      {
        "word": "divertirsi",
        "translation": "divertirse",
        "category": "Riflessivi"
      },
      {
        "word": "ieri",
        "translation": "ayer",
        "category": "Tempo"
      },
      {
        "word": "domani",
        "translation": "mañana",
        "category": "Tempo"
      }
    ]
  },
  {
    "id": 2,
    "title": "La Casa",
    "description": "Stanze della casa, mobili, elettrodomestici e preposizioni di luogo",
    "grammar": [
      {
        "title": "C'è e Ci sono",
        "content": "C'è se usa para singular (hay una cosa). Ci sono se usa para plural (hay varias cosas).",
        "examples": [
          {
            "it": "In cucina c'è un frigorifero grande.",
            "es": "En la cocina hay una nevera grande."
          },
          {
            "it": "Nella stanza ci sono due sedie.",
            "es": "En la habitación hay dos sillas."
          }
        ]
      },
      {
        "title": "Preposizioni di Luogo",
        "content": "Para describir dónde están los objetos: sopra (encima), sotto (debajo), davanti a (delante de), dietro (detrás), accanto a (al lado de).",
        "examples": [
          {
            "it": "Il libro è sul tavolo.",
            "es": "El libro está sobre la mesa."
          },
          {
            "it": "La sedia è vicino al letto.",
            "es": "La silla está cerca de la cama."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "la cucina",
        "translation": "la cocina",
        "category": "Stanze"
      },
      {
        "word": "il soggiorno",
        "translation": "el salón",
        "category": "Stanze"
      },
      {
        "word": "il bagno",
        "translation": "el baño",
        "category": "Stanze"
      },
      {
        "word": "la camera da letto",
        "translation": "el dormitorio",
        "category": "Stanze"
      },
      {
        "word": "il tavolo",
        "translation": "la mesa",
        "category": "Mobili"
      },
      {
        "word": "la sedia",
        "translation": "la silla",
        "category": "Mobili"
      },
      {
        "word": "il divano",
        "translation": "el sofá",
        "category": "Mobili"
      },
      {
        "word": "il frigorifero",
        "translation": "la nevera",
        "category": "Elettrodomestici"
      },
      {
        "word": "la lavatrice",
        "translation": "la lavadora",
        "category": "Elettrodomestici"
      }
    ]
  },
  {
    "id": 3,
    "title": "I Pronomi",
    "description": "Pronomi diretti, indiretti e combinati",
    "grammar": [
      {
        "title": "Pronomi Diretti",
        "content": "Reemplazan al objeto directo (¿qué? o ¿a quién?). Formas átonas principales: mi, ti, lo, la, ci, vi, li, le.",
        "examples": [
          {
            "it": "Vedi Maria? Sì, la vedo.",
            "es": "¿Ves a Maria? Sí, la veo."
          },
          {
            "it": "Compri i giornali? Sì, li compro.",
            "es": "¿Compras los periódicos? Sí, los compro."
          }
        ]
      },
      {
        "title": "Pronomi Indiretti",
        "content": "Reemplazan al objeto indirecto (¿a quién? con preposición 'a'). Formas átonas: mi, ti, gli (a él/ellos), le (a ella), ci, vi, gli/loro.",
        "examples": [
          {
            "it": "Telefoni a Maria? Sì, le telefono stasera.",
            "es": "¿Llamas a Maria? Sí, le llamo esta noche."
          },
          {
            "it": "Scrivi a Marco? Sì, gli scrivo un'email.",
            "es": "¿Le escribes a Marco? Sí, le escribo un correo."
          }
        ]
      },
      {
        "title": "Passato Prossimo con Pronomi Diretti",
        "content": "Cuando usamos lo, la, li, le con passato prossimo, el participio pasado debe concordar en género y número con el pronombre.",
        "examples": [
          {
            "it": "Hai visto le ragazze? Sì, le ho viste.",
            "es": "¿Has visto a las chicas? Sí, las he visto."
          },
          {
            "it": "Hai comprato il pane? Sì, l'ho comprato.",
            "es": "¿Has comprado el pan? Sí, lo he comprado."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "telefonare",
        "translation": "telefonear/llamar",
        "category": "Verbi"
      },
      {
        "word": "scrivere",
        "translation": "escribir",
        "category": "Verbi"
      },
      {
        "word": "regalare",
        "translation": "regalar",
        "category": "Verbi"
      },
      {
        "word": "dire",
        "translation": "decir",
        "category": "Verbi"
      },
      {
        "word": "vedere",
        "translation": "ver",
        "category": "Verbi"
      },
      {
        "word": "ascoltare",
        "translation": "escuchar",
        "category": "Verbi"
      }
    ]
  },
  {
    "id": 4,
    "title": "Le Preposizioni",
    "description": "Preposizioni semplici e articolate, articoli determinativi ed indeterminativi",
    "grammar": [
      {
        "title": "Preposizioni Semplici",
        "content": "Di, a, da, in, con, su, per, tra, fra. Se usan para indicar lugar, tiempo, origen, posesión, etc.",
        "examples": [
          {
            "it": "Vado a scuola ogni mattina.",
            "es": "Voy a la escuela cada mañana."
          },
          {
            "it": "Vengo dall'Italia.",
            "es": "Vengo de Italia."
          }
        ]
      },
      {
        "title": "Preposizioni Articolate",
        "content": "Se forman combinando una preposición simple (di, a, da, in, su) con un artículo determinativo (il, lo, la, i, gli, le, l').",
        "examples": [
          {
            "it": "Il libro è sul tavolo (su + il).",
            "es": "El libro está sobre la mesa."
          },
          {
            "it": "Parliamo delle vacanze (di + le).",
            "es": "Haglamos de las vacaciones."
          }
        ]
      },
      {
        "title": "Articoli con i Nomi di Famiglia",
        "content": "¡Ojo! No se usa artículo con posesivos singulares de miembros de la familia (mio fratello), excepto con 'loro' o nombres cariñosos/plurles (il loro fratello, la mia mamma, le mie sorelle).",
        "examples": [
          {
            "it": "Mio fratello si chiama Marco.",
            "es": "Mi hermano se llama Marco."
          },
          {
            "it": "Le mie sorelle vivono a Milano.",
            "es": "Mis hermanas viven en Milán."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "di / a / da / in / con / su / per / tra / fra",
        "translation": "de / a / desde-por / en / con / sobre / para / entre",
        "category": "Preposizioni"
      },
      {
        "word": "padre / madre / fratello / sorella",
        "translation": "padre / madre / hermano / hermana",
        "category": "Famiglia"
      },
      {
        "word": "zio / zia / cugino / cugina",
        "translation": "tío / tía / primo / prima",
        "category": "Famiglia"
      },
      {
        "word": "scuola / casa / lavoro",
        "translation": "escuela / casa / trabajo",
        "category": "Luoghi"
      }
    ]
  },
  {
    "id": 5,
    "title": "Tempo Libero",
    "description": "Sport, hobby, espressioni di tempo e il verbo piacere",
    "grammar": [
      {
        "title": "Il Verbo Piacere",
        "content": "Concuerda con la cosa que gusta: mi piace + singular / mi piacciono + plural.",
        "examples": [
          {
            "it": "Mi piace giocare a calcio.",
            "es": "Me gusta jugar al fútbol."
          },
          {
            "it": "Mi piacciono i film italiani.",
            "es": "Me gustan las películas italianas."
          }
        ]
      },
      {
        "title": "Fare vs Giocare",
        "content": "Para deportes se usa: 'giocare a' + juego/deporte con balón (giocare a tennis), y 'fare' + actividades/deportes individuales (fare nuoto, fare ginnastica).",
        "examples": [
          {
            "it": "Faccio nuoto tre volte alla settimana.",
            "es": "Hago natación tres veces a la semana."
          },
          {
            "it": "I ragazzi giocano a basket nel pomeriggio.",
            "es": "Los chicos juegan al baloncesto por la tarde."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "tempo libero",
        "translation": "tiempo libre",
        "category": "Hobby"
      },
      {
        "word": "giocare a calcio / tennis",
        "translation": "jugar al fútbol / tenis",
        "category": "Sport"
      },
      {
        "word": "fare nuoto / sci / yoga",
        "translation": "hacer natación / esquí / yoga",
        "category": "Sport"
      },
      {
        "word": "leggere un libro",
        "translation": "leer un libro",
        "category": "Hobby"
      },
      {
        "word": "guardare la TV",
        "translation": "ver la tele",
        "category": "Hobby"
      },
      {
        "word": "uscire con gli amici",
        "translation": "salir con amigos",
        "category": "Sociale"
      }
    ]
  },
  {
    "id": 6,
    "title": "Le Persone",
    "description": "Aspetto fisico, personalità, emozioni e comparativi",
    "grammar": [
      {
        "title": "Comparativo di Maggioranza e Minoranza",
        "content": "Si compara dos nombres/pronombres respecto a una cualidad, se usa: più / meno + adjetivo + di.",
        "examples": [
          {
            "it": "Roma è più grande di Firenze.",
            "es": "Roma es más grande que Florencia."
          },
          {
            "it": "Marco è meno alto di Luca.",
            "es": "Marco es menos alto que Luca."
          }
        ]
      },
      {
        "title": "Comparativi Irregolari",
        "content": "Migliore (mejor, de buono), peggiore (peor, de cattivo), maggiore (mayor, de grande), minore (menor, de piccolo).",
        "examples": [
          {
            "it": "Questo ristorante è migliore dell'altro.",
            "es": "Este restaurante es mejor que el otro."
          },
          {
            "it": "Mio fratello maggiore vive a Roma.",
            "es": "Mi hermano mayor vive en Roma."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "alto / basso",
        "translation": "alto / bajo",
        "category": "Fisico"
      },
      {
        "word": "magro / grasso",
        "translation": "delgado / gordo",
        "category": "Fisico"
      },
      {
        "word": "simpatico / antipatico",
        "translation": "simpático / antipático",
        "category": "Carattere"
      },
      {
        "word": "intelligente / pigro",
        "translation": "inteligente / perezoso",
        "category": "Carattere"
      },
      {
        "word": "felice / triste / arrabbiato",
        "translation": "feliz / triste / enfadado",
        "category": "Emozioni"
      }
    ]
  },
  {
    "id": 7,
    "title": "Alimentazione",
    "description": "Cibo, ordinare al ristorante, il partitivo e quantificatori",
    "grammar": [
      {
        "title": "Il Partitivo",
        "content": "Indica una cantidad indeterminada ('un poco de', 'algunos'). Se forma con di + artículo determinativo: del, dello, della, dei, degli, delle.",
        "examples": [
          {
            "it": "Vorrei del pane, per favore.",
            "es": "Querría algo de pan, por favor."
          },
          {
            "it": "Compro delle mele al mercato.",
            "es": "Compro unas manzanas en el mercado."
          }
        ]
      },
      {
        "title": "Ordinare al Ristorante",
        "content": "Se usa el condicional de cortesía 'vorrei' (me gustaría) o formas educadas como 'prendo...'.",
        "examples": [
          {
            "it": "Vorrei un primo di pasta e dell'acqua.",
            "es": "Me gustaría un primer plato de pasta y agua."
          },
          {
            "it": "Per me una pizza Margherita.",
            "es": "Para mí una pizza Margherita."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "il pane / la pasta / il riso",
        "translation": "el pan / la pasta / el arroz",
        "category": "Cibo"
      },
      {
        "word": "la carne / il pesce / il pollo",
        "translation": "la carne / el pescado / el pollo",
        "category": "Cibo"
      },
      {
        "word": "la frutta / la verdura",
        "translation": "la fruta / la verdura",
        "category": "Cibo"
      },
      {
        "word": "il cameriere",
        "translation": "el camarero",
        "category": "Ristorante"
      },
      {
        "word": "il conto",
        "translation": "la cuenta",
        "category": "Ristorante"
      },
      {
        "word": "il dessert / dolce",
        "translation": "el postre / dulce",
        "category": "Cibo"
      }
    ]
  },
  {
    "id": 8,
    "title": "Salute e Corpo",
    "description": "Corpo umano, sintomi, dal medico, verbi riflessivi e imperativo",
    "grammar": [
      {
        "title": "Esprimere Dolore (Far Male)",
        "content": "Se usa el verbo fare al singular o plural: mi fa male + singular / mi fanno male + plural.",
        "examples": [
          {
            "it": "Mi fa male la testa.",
            "es": "Me duele la cabeza."
          },
          {
            "it": "Mi fanno male i piedi.",
            "es": "Me duelen los pies."
          }
        ]
      },
      {
        "title": "L'Imperativo Diretto (Tu/Noi/Voi)",
        "content": "Para dar órdenes o consejos. Verbos -are: tu canta!, voi cantate! Verbos -ere/-ire: tu leggi!, voi leggete! La forma negativa de 'tu' es NON + infinitivo.",
        "examples": [
          {
            "it": "Prendi questa medicina!",
            "es": "¡Toma esta medicina!"
          },
          {
            "it": "Non mangiare troppi dolci!",
            "es": "¡No comas demasiados dulces!"
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "la testa / i capelli",
        "translation": "la cabeza / el pelo",
        "category": "Corpo"
      },
      {
        "word": "gli occhi / le orecchie",
        "translation": "los ojos / las orejas",
        "category": "Corpo"
      },
      {
        "word": "la gola / la schiena",
        "translation": "la garganta / la espalda",
        "category": "Corpo"
      },
      {
        "word": "il medico / il dottore",
        "translation": "el médico / el doctor",
        "category": "Salute"
      },
      {
        "word": "la febbre / la tosse / il raffreddore",
        "translation": "la fiebre / la tos / el resfriado",
        "category": "Sintomi"
      },
      {
        "word": "la medicina / lo sciroppo",
        "translation": "la medicina / el jarabe",
        "category": "Salute"
      }
    ]
  },
  {
    "id": 9,
    "title": "Città e Viaggi",
    "description": "Indicazioni stradali, mezzi di trasporto, futuro per i piani di viaggio",
    "grammar": [
      {
        "title": "Chiedere e Dare Indicazioni",
        "content": "Para pedir información se usa 'scusi' (formal) o 'scusa' (informal). Respuestas típicas: gira a destra (gira a la derecha), vai dritto (sigue recto), attraversa la strada (cruza la calle).",
        "examples": [
          {
            "it": "Scusi, per andare alla stazione?",
            "es": "Disculpe, ¿para ir a la estación?"
          },
          {
            "it": "Gira alla prima via a sinistra.",
            "es": "Gira en la primera calle a la izquierda."
          }
        ]
      },
      {
        "title": "Preposizioni con i Mezzi di Trasporto",
        "content": "Se usa la preposición 'in' para los medios de transporte (in treno, in macchina, in aereo). Excepción: 'a piedi' (a pie) y con especificaciones 'con il treno delle 8'.",
        "examples": [
          {
            "it": "Vado a Roma in treno stasera.",
            "es": "Voy a Roma en tren esta noche."
          },
          {
            "it": "Preferisco andare a piedi.",
            "es": "Preferisco ir a pie."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "la stazione / l'aeroporto",
        "translation": "la estación / el aeropuerto",
        "category": "Trasporto"
      },
      {
        "word": "il treno / l'autobus / la metropolitana",
        "translation": "el tren / el autobús / el metro",
        "category": "Trasporto"
      },
      {
        "word": "il biglietto",
        "translation": "el billete/boleto",
        "category": "Trasporto"
      },
      {
        "word": "destra / sinistra / dritto",
        "translation": "derecha / izquierda / recto",
        "category": "Direzioni"
      },
      {
        "word": "la piazza / la via / il monumento",
        "translation": "la plaza / la calle / el monumento",
        "category": "Città"
      }
    ]
  },
  {
    "id": 10,
    "title": "Lavoro e Studio",
    "description": "Professioni, università, routine quotidiana e stare + gerundio",
    "grammar": [
      {
        "title": "Stare + Gerundio",
        "content": "Indica una acción en desarrollo en el momento de hablar. Se forma con el verbo STARE en presente + gerundio del verbo (-ando para -are, -endo para -ere/-ire).",
        "examples": [
          {
            "it": "Cosa stai facendo? Sto studiando.",
            "es": "¿Qué estás haciendo? Estoy estudiando."
          },
          {
            "it": "I ragazzi stanno lavorando in ufficio.",
            "es": "Los chicos están trabajando en la oficina."
          }
        ]
      },
      {
        "title": "Parlare del Lavoro (Fare + Articolo)",
        "content": "Para decir la profesión se usa 'fare il/la' + profesión, o 'essere' + profesión (sin artículo).",
        "examples": [
          {
            "it": "Che lavoro fa tuo padre? Fa il falegname.",
            "es": "¿De qué trabaja tu padre? Trabaja de carpintero."
          },
          {
            "it": "Mia sorella è insegnante.",
            "es": "Mi hermana es profesora."
          }
        ]
      }
    ],
    "vocabulary": [
      {
        "word": "il lavoro / l'ufficio",
        "translation": "el trabajo / la oficina",
        "category": "Lavoro"
      },
      {
        "word": "lo studente / l'insegnante",
        "translation": "el estudiante / el profesor",
        "category": "Istruzione"
      },
      {
        "word": "l'università / l'esame",
        "translation": "la universidad / el examen",
        "category": "Istruzione"
      },
      {
        "word": "l'ingegnere / il medico",
        "translation": "el ingeniero / el médico",
        "category": "Professioni"
      },
      {
        "word": "il falegname / l'impiegato",
        "translation": "el carpintero / el empleado",
        "category": "Professioni"
      }
    ]
  }
];
