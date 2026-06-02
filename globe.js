const canvas = document.querySelector("#globe");
const ctx = canvas.getContext("2d");
const destinationSelect = document.querySelector("#destination");
const statusText = document.querySelector("#statusText");
const distanceText = document.querySelector("#distanceText");
const arrivalDialog = document.querySelector("#arrivalDialog");
const arrivalTitle = document.querySelector("#arrivalTitle");
const arrivalDate = document.querySelector("#arrivalDate");
const visitedButton = document.querySelector("#visitedButton");
const arrivalDescription = document.querySelector("#arrivalDescription");
const arrivalImage = document.querySelector("#arrivalImage");
const arrivalSlideshow = document.querySelector("#arrivalSlideshow");
const previousSlideButton = document.querySelector(".slide-button.previous");
const nextSlideButton = document.querySelector(".slide-button.next");
const slideCount = document.querySelector("#slideCount");
const closeDialogButton = document.querySelector(".dialog-close");
const questButton = document.querySelector("#questButton");
const questDialog = document.querySelector("#questDialog");
const questCloseButton = document.querySelector(".quest-close");
const travelTypeSelect = document.querySelector("#travelType");
const continentChoiceSelect = document.querySelector("#continentChoice");
const flightHoursSelect = document.querySelector("#flightHours");
const fauneSelect = document.querySelector("#FAUNE");
const questValidateButton = document.querySelector("#questValidate");
const questOkButton = document.querySelector("#questOk");
const questMessage = document.querySelector("#questMessage");
const honeymoonOption = destinationSelect.querySelector('option[value="voyagenoce"]');
const resetVotesButton = document.querySelector("#resetVotesButton");

const VOTE_STORAGE_KEY = "ae-airlines-destination-votes";
const VISITED_STORAGE_KEY = "ae-airlines-visited-destinations";
const ROUTE_MIDPOINT_ZOOM = 1.85;


const SUPABASE_URL = "https://ikymbjpsbtnvyptdgakp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlreW1ianBzYnRudnlwdGRnYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNzM3ODAsImV4cCI6MjA5NTY0OTc4MH0.30C5SkKcbvenWnJn4NGA7VDObX_yxCIszq2dYeQHSo0";
const voteClient = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_ANON_KEY) || null;


const errorDialog = document.querySelector("#errorDialog");
const errorMessage = document.querySelector("#errorMessage");
const errorCloseButton = document.querySelector(".error-close");

let countryBoundaryLines = null;
let countryBoundaryStatus = "loading";
let countryBoundarySource = null;



const places = {
  anzy: {
    name: "Anzy-le-Duc",
    lat: 46.3186,
    lon: 4.0639,
  },
  arequipa: {
    name: "Arequipa",
    date: "03/09/2025",
    lat: -16.409,
    lon: -71.5375,
    photos: [
      "GALERIE/AR1.jpg",
      "GALERIE/AR2.jpg",
      "GALERIE/AR3.jpg",
      "GALERIE/AR4.jpg",
      "GALERIE/AR5.jpg",
      "GALERIE/AR6.jpg",
    ],
    imageAlt: "Photo d'Arequipa",
    description:
      "Arequipa est la première étape des hauts plateaux, nous ayant permis de nous acclimater à l'altitude pour profiter des Salinas à 5 000 mètres d'altitude.",
  },
  cuzco: {
    name: "Cuzco",
    date: "11/09/2025",
    lat: -13.5319,
    lon: -71.9675,
    photos: [
    "GALERIE/CU1.jpg",
	"GALERIE/CU2.jpg",
    "GALERIE/CU3.jpg",
	"GALERIE/CU4.jpg",
    ],
    imageAlt: "Photo de Cuzco",
    description:
      "Cuzco est une ville agréable et la porte d'entrée vers la valée sacrée , et notre point de départ pour le trek du Salkantay.",
  },
  rome: {
    name: "Rome",
    date: "28/04/2024",
    lat: 41.9028,
    lon: 12.4964,
    photos: [
    "GALERIE/RO1.jpg",
	"GALERIE/RO2.jpg",
	"GALERIE/RO3.jpg",
	"GALERIE/RO4.jpg",
    ],
    imageAlt: "Photo de Rome",
    description:
      "Premier grand voyage à deux dans cette magnifique ville qu'est Rome. Le Forum, la basilique Saint-Pierre… nous avons pris le temps de tout voir.",
  },
lima: {
    name: "lima",
    date: "30/08/2025",
    lat: -12.0464,
    lon: -77.0428,
    photos: [
    "GALERIE/LI1.jpg",
	"GALERIE/LI2.jpg",
    "GALERIE/LI3.jpg",
    ],
    imageAlt: "Photo de Lima",
    description:
      "Capitale du Pérou et point d'arrivée depuis Lyon, la ville vaut le coup pour son histoire, mais surtout pour sa gastronomie..",
  },

copenhague: {
  name: "Copenhague",
  date: "29/11/2024",
  lat: 55.6761,
  lon: 12.5683,
     photos: [
    "GALERIE/COP1.jpg",
	"GALERIE/COP2.jpg",
    "GALERIE/COP3.jpg",
	"GALERIE/COP4.jpg",
    ],
  imageAlt: "Photo de Copenhague",
  description:
    "Copenhague en un week-end, ça se fait bien et cela vaut vraiment le coup pendant les fêtes de fin d'année.",
},

goteborg: {
  name: "Gotéberg",
  date: "25/08/2024",
  lat: 57.7089,
  lon: 11.9746,
    photos: [
    "GALERIE/GOTEBE1.jpg",
	"GALERIE/GOTEBE2.jpg",
    "GALERIE/GOTEBE3.jpg",
    ],
  imageAlt: "Photo de Gotéberg",
  description:
    "Göteborg est une grande ville portuaire et notre point d'arrivée depuis Lyon. Les îles autour de la ville sont vraiment typiques de la Suède.",
},

gotland: {
  name: "Gotland",
  date: "Aout 2024",
  lat: 57.4684,
  lon: 18.4867,
    photos: [
    "GALERIE/GOTLA1.jpg",
	"GALERIE/GOTLA2.jpg",
    "GALERIE/GOTLA3.jpg",
    ],
  imageAlt: "Photo de Gotland",
  description:
    "Gotland est une île suédoise connue pour ses paysages naturels et ses villages médiévaux, et surtout connue pour ses moulins. ",
},

ileMaurice: {
  name: "Ile Maurice",
  date: "23/11/2014",
  lat: -20.3484,
  lon: 57.5522,
    photos: [
    "GALERIE/IL1.jpg",
	"GALERIE/IL2jpg",
    "GALERIE/IL3.jpg",
    ],
  imageAlt: "Photo de Ile Maurice",
  description:
    "L’île Maurice est une destination tropicale célèbre pour ses plages et ses lagons.",
},

kilimandjaro: {
  name: "kilimandjaro",
  date: "14/07/2018",
  lat: -3.0674,
  lon: 37.3556,
    photos: [
    "GALERIE/KI1.jpg",
	"GALERIE/KI2.jpg",
    "GALERIE/KI3.jpg",
    ],
  imageAlt: "Photo de kilimandjaro",
  description:
    "Le Kilimandjaro, un vrai défi pour Alice. Édouard tentera peut-être l'ascension un jour. ",
},

laSoufriere: {
  name: "La soufrière",
  date: "25/05/2025",
  lat: 16.0444,
  lon: -61.6644,
    photos: [
    "GALERIE/SO1.jpg",
	"GALERIE/SO2.jpg",
    "GALERIE/SO3.jpg",
    ],
  imageAlt: "Photo de La soufrière",
  description:
    "En Guadeloupe, on peut passer d’un soleil de plomb à des pluies diluviennes. Nous n’avons même pas pu voir le cratère.",
},

laponie: {
  name: "Laponie",
  date: "01/01/2022",
  lat: 67.9222,
  lon: 26.5046,
    photos: [
    "GALERIE/LAP1.jpg",
    ],
  imageAlt: "Photo de Laponie",
  description:
    "Alice est partie seule voir les rennes.",
},

leCap: {
  name: "Le cap",
  date: "27/11/2015",
  lat: -33.9249,
  lon: 18.4241,
    photos: [
    "GALERIE/CAP1.jpg",
	"GALERIE/CAP2.jpg",
    "GALERIE/CAP3.jpg",
    ],
  imageAlt: "Photo de Le cap",
  description:
    "Le Cap est une ville d’Afrique du Sud réputée pour sa montagne et son littoral.",
},

machuPicchu: {
  name: "Machu Picchu",
  date: "15/09/2025",
  lat: -13.1631,
  lon: -72.5450,
  photos: [
    "GALERIE/MA1.jpg",
    "GALERIE/MA2.jpg",
    "GALERIE/MA3.jpg",
  ],
  imageAlt: "Photo de Machu Picchu",
  description:
    "Le Machu Picchu bien mérité après 4 jours de trek dans les montagnes péruviennes.",
},
malmo: {
  name: "Malmö",
  date: "19/08/2024",
  lat: 55.6050,
  lon: 13.0038,
    photos: [
    "GALERIE/MALM1.jpg",
	"GALERIE/MALM2.jpg",
    "GALERIE/MALM3.jpg",
	"GALERIE/MALM4.jpg",
    ],
  imageAlt: "Photo de Malmö",
  description:
    "Malmö, petite ville suédoise du sud.",
},

montreal: {
  name: "Montréal",
  date: "09/10/2012",
  lat: 45.5019,
  lon: -73.5674,
    photos: [
    "GALERIE/MON1.jpg",
	"GALERIE/MON2.jpg",
    "GALERIE/MON3.jpg",
    ],
  imageAlt: "Photo de Montréal",
  description:
    "Une belle année d'étude",
},

pitonFournaise: {
  name: "Piton de la fournaise",
  date: "24/12/2014",
  lat: -21.2446,
  lon: 55.7081,
    photos: [
    "GALERIE/PI1.jpg",
	"GALERIE/PI2.jpg",
    "GALERIE/PI3.jpg",
    ],
  imageAlt: "Photo de Piton de la fournaise",
  description:
    "Le Piton de la Fournaise, gravi maintes fois par Alice et les LZLL.",
},

porto: {
  name: "Porto",
  date: "14/04/2025",
  lat: 41.1579,
  lon: -8.6291,
    photos: [
    "GALERIE/PO1.jpg",
	"GALERIE/PO2.jpg",
    "GALERIE/PO3.jpg",
	"GALERIE/PO4.jpg",
    ],
  imageAlt: "Photo de Porto",
  description:
    " le 14/04/2025, weekend de la demande en mariage ! au bord de la mer par un temps radieu. ",
},

puno: {
  name: "Puno",
  date: "11/09/2025",
  lat: -15.8402,
  lon: -70.0219,
    photos: [
    "GALERIE/PUN1.jpg",

    ],
  imageAlt: "Photo de Puno",
  description:
    "Puno est situé près du lac Titicaca.",
},

reserveCousteau: {
  name: "Réserve Cousteau",
  date: "29/05/2025",
  lat: 16.1775,
  lon: -61.7750,
    photos: [
    "GALERIE/COU1.JPG",
    "GALERIE/COU2.JPG",
    "GALERIE/COU3.JPG",
    "GALERIE/COU4.JPG",	
    ],
  imageAlt: "Photo de Réserve Cousteau",
  description:
    "Plongée magnifique dans l'eau turquoise et chaude des Caraïbes.",
},

salkantay: {
  name: "Salkantay",
  date: "13/09/2025",
  lat: -13.3402,
  lon: -72.5449,
    photos: [
    "GALERIE/SAL1.jpg",
	"GALERIE/SAL2.jpg",
    "GALERIE/SAL3.jpg",
	"GALERIE/SAL4.jpg",
    ],
  imageAlt: "Photo de Salkantay",
  description:
    "Trek de 4 jours jusqu'au Machu Picchu.",
},

seychelles: {
  name: "Seychelles",
  date: "02/07/2015",
  lat: -4.6796,
  lon: 55.4920,
    photos: [
    "GALERIE/SEY1.jpg",
	"GALERIE/SEY2.jpg",
    "GALERIE/SEY3.jpg",
    ],
  imageAlt: "Photo de Seychelles",
  description:
    "Aux Seychelles la vie est belle !!! et encore plus en Cata"
},

sligo: {
  name: "Sligo",
  date: "10/10/2010",
  lat: 54.2766,
  lon: -8.4761,
    photos: [
    "GALERIE/SLI1.jpg",
	"GALERIE/SLI2.jpg",
    "GALERIE/SLI3.jpg",
    ],
  imageAlt: "Photo de Sligo",
  description:
    "Une belle année , riche en apprentissage ... des Pubs ",
},

titiKaka: {
  name: "Titi Kaka",
  date: "A definir",
  lat: -15.7650,
  lon: -69.4175,
    photos: [
    "GALERIE/TIK1.jpg",
	"GALERIE/TIK2.jpg",
    "GALERIE/TIK3.jpg",
    ],
  imageAlt: "Photo de Titi Kaka",
  description:
    "Le lac Titicaca est l’un des plus hauts lacs navigables du monde.",
},

zanzibar: {
  name: "Zanzibar",
  date: "A definir",
  lat: -6.1659,
  lon: 39.2026,
    photos: [
    "GALERIE/ZAN1.jpg",
    ],
  imageAlt: "Photo de Zanzibar",
  description:
    "Zanzibar est une île tanzanienne célèbre pour ses plages et ses eaux turquoise.",
},


voyagenoce: {
  name: "Polynesie Francaise ",
  date: "08/06/2026 ... ",
  lat: -17.6509,
  lon: -149.4260,
    photos: [
    "GALERIE/BOR1.jpg",
    ],
  imageAlt: "Photo de Tahiti",
  description:
    "TAHITI !!!  Un petit voyage de noces bien mérité, l'occasion de se détendre après ce magnifique mariage. Merci d'avoir été là aujourd'hui pour nous entourer. ",
},

};

const destinationPlaces = Object.values(places).filter((place) => place.lat && place.lon);
const destinationEntries = Object.entries(places).filter(([, place]) => place.lat && place.lon);

destinationEntries.forEach(([key, place]) => {
  place.key = key;
});

const landMasses = [
  [
    [-168, 72],
    [-150, 71],
    [-139, 60],
    [-128, 54],
    [-124, 48],
    [-117, 35],
    [-108, 28],
    [-99, 23],
    [-91, 18],
    [-83, 19],
    [-80, 26],
    [-75, 35],
    [-67, 44],
    [-57, 48],
    [-53, 57],
    [-60, 68],
    [-78, 74],
    [-101, 78],
    [-124, 74],
    [-150, 75],
  ],
  [
    [-83, 12],
    [-76, 7],
    [-80, -2],
    [-77, -12],
    [-72, -21],
    [-70, -34],
    [-74, -46],
    [-70, -55],
    [-58, -56],
    [-49, -44],
    [-41, -24],
    [-35, -8],
    [-44, 0],
    [-52, 5],
    [-60, 7],
    [-66, 10],
    [-74, 12],
  ],
  [
    [-10, 36],
    [-5, 43],
    [2, 50],
    [10, 55],
    [20, 59],
    [31, 56],
    [37, 47],
    [30, 41],
    [23, 38],
    [15, 39],
    [10, 44],
    [3, 43],
    [-2, 38],
  ],
  [
    [-17, 32],
    [-7, 35],
    [5, 37],
    [18, 35],
    [29, 31],
    [35, 22],
    [43, 12],
    [51, 3],
    [42, -12],
    [35, -27],
    [26, -34],
    [15, -35],
    [5, -30],
    [-5, -20],
    [-12, -5],
    [-16, 11],
  ],
  [
    [30, 71],
    [52, 72],
    [74, 68],
    [96, 62],
    [119, 58],
    [143, 52],
    [161, 43],
    [166, 29],
    [153, 18],
    [139, 9],
    [122, 2],
    [108, -6],
    [95, 6],
    [82, 8],
    [70, 20],
    [58, 24],
    [48, 31],
    [39, 36],
    [33, 45],
  ],
  [
    [69, 24],
    [78, 28],
    [88, 26],
    [98, 20],
    [106, 12],
    [109, 1],
    [115, -7],
    [105, -15],
    [93, -9],
    [82, 6],
    [74, 14],
  ],
  [
    [111, -11],
    [122, -11],
    [135, -13],
    [148, -19],
    [154, -29],
    [148, -40],
    [134, -44],
    [121, -38],
    [113, -26],
  ],
  [
    [-52, 60],
    [-43, 64],
    [-34, 70],
    [-23, 77],
    [-36, 82],
    [-52, 81],
    [-65, 74],
    [-72, 67],
  ],
  [
    [-180, -70],
    [-135, -67],
    [-90, -72],
    [-45, -69],
    [0, -68],
    [45, -72],
    [90, -69],
    [135, -67],
    [180, -70],
    [180, -88],
    [-180, -88],
  ],
];

const countryLines = [
  [
    [-141, 60],
    [-124, 49],
    [-95, 49],
    [-67, 46],
  ],
  [
    [-117, 32],
    [-108, 31],
    [-100, 29],
    [-97, 26],
  ],
  [
    [-101, 21],
    [-92, 17],
    [-88, 16],
    [-84, 10],
    [-79, 8],
  ],
  [
    [-78, 0],
    [-72, -5],
    [-70, -12],
    [-66, -18],
    [-64, -25],
  ],
  [
    [-69, -18],
    [-69, -31],
    [-71, -43],
    [-68, -52],
  ],
  [
    [-58, -34],
    [-54, -25],
    [-57, -16],
    [-50, -6],
    [-47, -1],
  ],
  [
    [-8, 43],
    [-2, 43],
    [3, 43],
    [8, 45],
    [13, 43],
    [18, 45],
  ],
  [
    [2, 51],
    [7, 49],
    [12, 48],
    [15, 52],
    [19, 52],
    [24, 50],
  ],
  [
    [-5, 36],
    [1, 32],
    [10, 31],
    [23, 31],
    [32, 30],
  ],
  [
    [10, 37],
    [15, 41],
    [20, 40],
    [23, 38],
    [29, 41],
  ],
  [
    [-17, 14],
    [-5, 16],
    [8, 13],
    [20, 12],
    [33, 11],
    [41, 12],
  ],
  [
    [12, -5],
    [20, -10],
    [27, -17],
    [31, -26],
  ],
  [
    [30, 54],
    [38, 48],
    [46, 42],
    [54, 37],
    [64, 35],
  ],
  [
    [68, 24],
    [75, 31],
    [83, 28],
    [92, 25],
    [100, 22],
  ],
  [
    [103, 22],
    [108, 16],
    [106, 10],
    [101, 6],
  ],
  [
    [73, 8],
    [80, 12],
    [88, 21],
    [91, 25],
  ],
  [
    [98, 57],
    [106, 48],
    [115, 43],
    [124, 40],
    [132, 44],
  ],
  [
    [116, -32],
    [130, -25],
    [144, -28],
    [153, -35],
  ],
  [
    [44, 12],
    [48, 20],
    [52, 25],
    [56, 27],
  ],
  [
    [28, -1],
    [33, -4],
    [36, -11],
    [34, -18],
    [31, -25],
  ],
];

const islands = [
  { lat: 54, lon: -3, radius: 8 },
  { lat: 53, lon: -8, radius: 5 },
  { lat: 64, lon: -19, radius: 6 },
  { lat: 42.5, lon: 12.5, radius: 5 },
  { lat: 40, lon: 9, radius: 4 },
  { lat: 35, lon: 24, radius: 4 },
  { lat: 35.8, lon: 139.5, radius: 7 },
  { lat: 23.5, lon: 121, radius: 4 },
  { lat: -6, lon: 107, radius: 8 },
  { lat: 7, lon: 81, radius: 5 },
  { lat: -20, lon: 47, radius: 7 },
  { lat: -41, lon: 174, radius: 8 },
  { lat: 21, lon: -77, radius: 7 },
  { lat: 19, lon: -70, radius: 4 },
  { lat: -51, lon: -59, radius: 5 },
];

const mapLabels = [

];

let view = {
  lat: places.anzy.lat,
  lon: places.anzy.lon,
  zoom: 1,
};

let targetView = { ...view };
let route = null;
let drag = null;
let lastTime = performance.now();
let currentSlides = [];
let currentSlideIndex = 0;
let slideshowTimer = null;
let honeymoonUnlocked = false;
let voteCounts = readStoredJson(VOTE_STORAGE_KEY, {});
let visitedDestinations = readStoredJson(VISITED_STORAGE_KEY, {});
let activeArrivalPlace = null;
let gesture = null;

if (honeymoonOption) {
  honeymoonOption.hidden = true;
}


function showErrorDialog(message) {

  errorMessage.textContent = message;

  if (typeof errorDialog.showModal === "function") {
    errorDialog.showModal();
  } else {
    errorDialog.setAttribute("open", "");
  }
}



function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;

  return Math.hypot(dx, dy);
}

function readStoredJson(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Les votes continuent a fonctionner en memoire si le stockage local est bloque.
  }
}




async function loadVotes() {
  if (!voteClient) {
    console.warn("Supabase n'est pas charge, utilisation des votes locaux.");
    return;
  }

  try {
    const { data, error } = await voteClient.rpc("get_vote_counts");
    if (error) {
      throw error;
    }

    voteCounts = Object.fromEntries((data || []).map((row) => [row.destination, row.count]));
    writeStoredJson(VOTE_STORAGE_KEY, voteCounts);
  } catch (error) {
    console.warn("Compteurs Supabase indisponibles, utilisation du stockage local.", error);
  }
}

async function saveVote(destinationKey) {

  console.log("saveVote()", destinationKey);

  visitedDestinations[destinationKey] = 1;
  writeStoredJson(VISITED_STORAGE_KEY, visitedDestinations);

  if (!voteClient) {
    console.warn("Pas de client Supabase");
    return;
  }

  try {

    console.log("Envoi RPC vote_destination");

    const { data, error } = await voteClient.rpc(
      "vote_destination",
      {
        p_destination: destinationKey,
      }
    );

    console.log("RPC DATA =", data);
    console.log("RPC ERROR =", error);

    if (error) {
      throw error;
    }

  } catch (error) {

    console.error(
      "Erreur vote_destination :",
      error
    );
  }
  loadVotes();
}

async function resetVotes() {
  const code = window.prompt("Code de réinitialisation");
  if (!code) return;

  const { error } = await voteClient.rpc("reset_vote_counts", {
    p_code: code,
  });

if (error) {

  console.error(
    "Reset votes  dd error:",
    error
  );

  showErrorDialog(
    error.message || "Erreur inconnue"
  );

  return;
}

  // recharge propre depuis la DB
  const { data } = await voteClient.rpc("get_vote_counts");

  voteCounts = Object.fromEntries(
    (data ?? []).map((row) => [row.destination, row.count])
  );

  visitedDestinations = {};
  writeStoredJson(VISITED_STORAGE_KEY, visitedDestinations);
  writeStoredJson(VOTE_STORAGE_KEY, voteCounts);
  updateVisitedButton(activeArrivalPlace);
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function toDeg(value) {
  return (value * 180) / Math.PI;
}

function normalizeLon(value) {
  return ((((value + 180) % 360) + 360) % 360) - 180;
}

function coordinateRingToPoints(ring) {
  return ring
    .map((coordinate) => ({
      lon: Number(coordinate[0]),
      lat: Number(coordinate[1]),
    }))
    .filter((point) => Number.isFinite(point.lon) && Number.isFinite(point.lat));
}

function collectGeometryLines(geometry, lines) {
  if (!geometry) {
    return;
  }

  if (geometry.type === "Polygon") {
    geometry.coordinates.forEach((ring) => {
      const points = coordinateRingToPoints(ring);
      if (points.length > 1) {
        lines.push(points);
      }
    });
    return;
  }

  if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        const points = coordinateRingToPoints(ring);
        if (points.length > 1) {
          lines.push(points);
        }
      });
    });
    return;
  }

  if (geometry.type === "GeometryCollection") {
    geometry.geometries.forEach((childGeometry) => collectGeometryLines(childGeometry, lines));
  }
}

function extractCountryBoundaryLines(geoJson) {
  const lines = [];

  if (geoJson.type === "FeatureCollection") {
    geoJson.features.forEach((feature) => collectGeometryLines(feature.geometry, lines));
    return lines;
  }

  if (geoJson.type === "Feature") {
    collectGeometryLines(geoJson.geometry, lines);
    return lines;
  }

  collectGeometryLines(geoJson, lines);
  return lines;
}

async function loadCountryBoundaries() {
  const sources = [
    "countries.geojson",
    "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/main/countries.geojson",
    "https://datahub.io/core/geo-boundaries-world-110m/_r/-/countries.geojson",
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "force-cache" });

      if (!response.ok) {
        throw new Error(`GeoJSON unavailable: ${response.status}`);
      }

      const geoJson = await response.json();
      const lines = extractCountryBoundaryLines(geoJson);

      if (!lines.length) {
        throw new Error("GeoJSON contains no polygon boundaries");
      }

      countryBoundaryLines = lines;
      countryBoundaryStatus = "loaded";
      countryBoundarySource = source;
      window.globeCountryBoundaries = {
        status: countryBoundaryStatus,
        source: countryBoundarySource,
        lineCount: countryBoundaryLines.length,
      };
      if (!destinationSelect.value) {
        statusText.textContent = "OK.";
      }
      return;
    } catch (error) {
      window.globeCountryBoundaries = {
        status: "retrying",
        source,
        message: error.message,
      };
    }
  }

  countryBoundaryLines = null;
  countryBoundaryStatus = "fallback";
  countryBoundarySource = "manual fallback";
  window.globeCountryBoundaries = {
    status: countryBoundaryStatus,
    source: countryBoundarySource,
    lineCount: countryLines.length,
  };
  if (!destinationSelect.value) {
    statusText.textContent = "Carte simplifiee chargee, fichier GeoJSON indisponible.";
  }
}

function mercatorValue(lat) {
  const clampedLat = Math.max(-85.0511, Math.min(85.0511, lat));
  return Math.log(Math.tan(Math.PI / 4 + toRad(clampedLat) / 2));
}

function inverseMercator(value) {
  return toDeg(2 * Math.atan(Math.exp(value)) - Math.PI / 2);
}

function mercatorLatitudeLimit(width, height) {
  const aspectRatio = width / height;
  return inverseMercator(Math.PI / aspectRatio);
}

function project(lat, lon, radius) {
  const phi = toRad(lat);
  const lambda = toRad(lon);
  const phi0 = toRad(view.lat);
  const lambda0 = toRad(view.lon);
  const delta = lambda - lambda0;
  const cosPhi = Math.cos(phi);
  const z = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * cosPhi * Math.cos(delta);

  return {
    x: canvas.width / 2 + radius * cosPhi * Math.sin(delta),
    y:
      canvas.height / 2 -
      radius * (Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * cosPhi * Math.cos(delta)),
    z,
    visible: z > -0.02,
  };
}

function distanceKm(from, to) {
  const earthRadius = 6371;
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return Math.round(earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function latLonToVector(point) {
  const lat = toRad(point.lat);
  const lon = toRad(point.lon);

  return {
    x: Math.cos(lat) * Math.cos(lon),
    y: Math.cos(lat) * Math.sin(lon),
    z: Math.sin(lat),
  };
}

function vectorToLatLon(vector) {
  const hyp = Math.hypot(vector.x, vector.y);

  return {
    lat: toDeg(Math.atan2(vector.z, hyp)),
    lon: normalizeLon(toDeg(Math.atan2(vector.y, vector.x))),
  };
}

function greatCircle(from, to, steps = 130) {
  const start = latLonToVector(from);
  const end = latLonToVector(to);
  const dot = Math.max(-1, Math.min(1, start.x * end.x + start.y * end.y + start.z * end.z));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);
  const points = [];

  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const a = Math.sin((1 - t) * omega) / sinOmega;
    const b = Math.sin(t * omega) / sinOmega;
    points.push(
      vectorToLatLon({
        x: a * start.x + b * end.x,
        y: a * start.y + b * end.y,
        z: a * start.z + b * end.z,
      }),
    );
  }

  return points;
}

function getGlobeRadius() {
  const baseRadius = canvas.width * 0.42;
  return baseRadius * view.zoom;
}

function drawSphere(radius) {
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.38,
    canvas.height * 0.3,
    radius * 0.05,
    canvas.width / 2,
    canvas.height / 2,
    radius,
  );
  gradient.addColorStop(0, "#cfe6eb");
  gradient.addColorStop(0.54, "#87b5c1");
  gradient.addColorStop(1, "#527f90");

  ctx.save();
  const atmosphere = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    radius * 0.76,
    canvas.width / 2,
    canvas.height / 2,
    radius * 1.12,
  );
  atmosphere.addColorStop(0, "rgba(113, 170, 186, 0)");
  atmosphere.addColorStop(0.72, "rgba(113, 170, 186, 0.22)");
  atmosphere.addColorStop(1, "rgba(113, 170, 186, 0)");
  ctx.fillStyle = atmosphere;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius * 1.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.clip();

  drawGraticule(radius);
  drawCountryLines(radius);
  drawMapLabels(radius);
  drawRoute(radius);
  drawMarkers(radius);

  ctx.restore();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.82)";
  ctx.stroke();

  const shine = ctx.createRadialGradient(
    canvas.width * 0.33,
    canvas.height * 0.24,
    0,
    canvas.width * 0.33,
    canvas.height * 0.24,
    radius * 0.7,
  );
  shine.addColorStop(0, "rgba(255,255,255,0.24)");
  shine.addColorStop(0.32, "rgba(255,255,255,0.08)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fill();

  const limbShadow = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    radius * 0.38,
    canvas.width / 2,
    canvas.height / 2,
    radius,
  );
  limbShadow.addColorStop(0, "rgba(0,0,0,0)");
  limbShadow.addColorStop(0.72, "rgba(0,0,0,0.08)");
  limbShadow.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = limbShadow;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawGraticule(radius) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";

  for (let lat = -60; lat <= 60; lat += 30) {
    drawGeoLine(
      Array.from({ length: 145 }, (_, index) => ({
        lat,
        lon: -180 + index * 2.5,
      })),
      radius,
    );
  }

  for (let lon = -180; lon < 180; lon += 30) {
    drawGeoLine(
      Array.from({ length: 73 }, (_, index) => ({
        lat: -90 + index * 2.5,
        lon,
      })),
      radius,
    );
  }
}

function drawGeoLine(points, radius) {
  let drawing = false;
  let previousPoint = null;

  ctx.beginPath();
  points.forEach((point) => {
    const projected = project(point.lat, point.lon, radius);
    if (!projected.visible) {
      drawing = false;
      previousPoint = point;
      return;
    }

    const crossesDateLine =
      previousPoint && Math.abs(point.lon - previousPoint.lon) > 180;

    if (!drawing || crossesDateLine) {
      ctx.moveTo(projected.x, projected.y);
      drawing = true;
    } else {
      ctx.lineTo(projected.x, projected.y);
    }

    previousPoint = point;
  });
  ctx.stroke();
}

function drawGeoPolygon(points, radius) {
  let hasVisiblePoint = false;
  let drawing = false;
  let previousPoint = null;

  ctx.beginPath();
  points.forEach((point) => {
    const projected = project(point.lat, point.lon, radius);
    hasVisiblePoint ||= projected.visible;

    if (!projected.visible) {
      drawing = false;
      previousPoint = point;
      return;
    }

    const crossesDateLine = previousPoint && Math.abs(point.lon - previousPoint.lon) > 180;

    if (!drawing || crossesDateLine) {
      ctx.moveTo(projected.x, projected.y);
      drawing = true;
    } else {
      ctx.lineTo(projected.x, projected.y);
    }

    previousPoint = point;
  });

  if (hasVisiblePoint) {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function drawLand(radius) {
  landMasses.forEach((polygon) => {
    let hasVisiblePoint = false;

    ctx.beginPath();
    polygon.forEach(([lon, lat], index) => {
      const point = project(lat, lon, radius);
      hasVisiblePoint ||= point.visible;
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();

    if (hasVisiblePoint) {
      const landGradient = ctx.createLinearGradient(
        canvas.width * 0.22,
        canvas.height * 0.2,
        canvas.width * 0.82,
        canvas.height * 0.88,
      );
      landGradient.addColorStop(0, "rgba(238, 247, 222, 0.98)");
      landGradient.addColorStop(0.52, "rgba(184, 216, 174, 0.95)");
      landGradient.addColorStop(1, "rgba(96, 144, 118, 0.9)");
      ctx.fillStyle = landGradient;
      ctx.fill();
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = "rgba(10, 39, 48, 0.58)";
      ctx.stroke();

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.stroke();
    }
  });
}

function drawCountryLines(radius) {
  ctx.save();

  if (countryBoundaryStatus === "loaded" && countryBoundaryLines?.length) {
    ctx.fillStyle = "rgba(144, 180, 154, 0.76)";
    ctx.strokeStyle = "rgba(144, 180, 154, 0.5)";
    countryBoundaryLines.forEach((line) => drawGeoPolygon(line, radius));

    ctx.lineWidth = 1.15;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.58)";
    countryBoundaryLines.forEach((line) => drawGeoLine(line, radius));
    ctx.lineWidth = 0.65;
    ctx.strokeStyle = "rgba(56, 88, 70, 0.68)";
    countryBoundaryLines.forEach((line) => drawGeoLine(line, radius));
  } else {
    ctx.lineWidth = 1.35;
    ctx.strokeStyle = "rgba(10, 36, 44, 0.44)";
    countryLines.forEach((line) => {
      drawGeoLine(
        line.map(([lon, lat]) => ({
          lat,
          lon,
        })),
        radius,
      );
    });
  }

  ctx.restore();
}

function drawIslands(radius) {
  islands.forEach((island) => {
    const point = project(island.lat, island.lon, radius);
    if (!point.visible) {
      return;
    }

    ctx.beginPath();
    ctx.arc(point.x, point.y, island.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(218, 237, 204, 0.95)";
    ctx.fill();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "rgba(10, 39, 48, 0.52)";
    ctx.stroke();
  });
}

function drawMapLabels(radius) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  mapLabels.forEach((label) => {
    const point = project(label.lat, label.lon, radius);
    const minimumDepth = label.type === "continent" ? 0.18 : 0.48;

    if (!point.visible || point.z < minimumDepth) {
      return;
    }

    const depth = Math.min(1, Math.max(0, point.z));
    const fontSize = label.type === "continent" ? 21 + depth * 7 : 13 + depth * 4;
    const alpha = label.type === "continent" ? 0.46 + depth * 0.28 : 0.36 + depth * 0.28;

    ctx.font =
      label.type === "continent"
        ? `800 ${fontSize}px Segoe UI, Arial, sans-serif`
        : `700 ${fontSize}px Segoe UI, Arial, sans-serif`;
    ctx.lineWidth = label.type === "continent" ? 7 : 5;
    ctx.strokeStyle = `rgba(3, 17, 28, ${alpha * 0.9})`;
    ctx.fillStyle =
      label.type === "continent"
        ? `rgba(255, 244, 200, ${alpha})`
        : `rgba(237, 247, 255, ${alpha})`;
    ctx.strokeText(label.name, point.x, point.y);
    ctx.fillText(label.name, point.x, point.y);
  });

  ctx.restore();
}

function drawRoute(radius) {
  if (!route) {
    return;
  }

  ctx.save();
  ctx.shadowColor = "rgba(255, 194, 95, 0.72)";
  ctx.shadowBlur = 18;
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(154, 190, 160, 0.42)";
  drawGeoLine(route.points, radius);

  ctx.shadowBlur = 9;
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "rgba(205, 226, 209, 0.96)";
  drawGeoLine(route.points, radius);

  ctx.shadowBlur = 0;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([9, 12]);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.78)";
  drawGeoLine(route.points, radius);
  ctx.setLineDash([]);
  ctx.restore();

  const planeIndex = Math.min(route.points.length - 1, Math.floor(route.progress * (route.points.length - 1)));
  const planePoint = route.points[planeIndex];
  const nextPoint = route.points[Math.min(route.points.length - 1, planeIndex + 1)];
  const current = project(planePoint.lat, planePoint.lon, radius);
  const next = project(nextPoint.lat, nextPoint.lon, radius);

  if (current.visible) {
    const angle = Math.atan2(next.y - current.y, next.x - current.x);
    drawPlane(current.x, current.y, angle);
  }
}

function drawPlane(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.shadowColor = "rgba(154, 190, 160, 0.78)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(6, 20, 32, 0.34)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(21, 0);
  ctx.lineTo(-15, -10);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-15, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#9abea0";
  ctx.beginPath();
  ctx.arc(-1, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMarkers(radius) {
  const placedLabels = [];
  const topVoteCount = Math.max(0, ...Object.values(voteCounts).map((value) => Number(value) || 0));
  const markerData = destinationPlaces
    .filter((place) => place !== places.voyagenoce || honeymoonUnlocked)
    .map((place) => ({
      place,
      point: project(place.lat, place.lon, radius),
    }))
    .filter(({ point }) => point.visible && point.z > 0.03)
    .sort((a, b) => b.point.z - a.point.z);

  markerData.forEach(({ place, point }) => {
    const isOrigin = place === places.anzy;
    drawMarkerPoint(point, isOrigin);
  });

  markerData.forEach(({ place, point }) => {
    const isOrigin = place === places.anzy;
    const voteCount = voteCounts[place.key] || 0;
    const label = `${place.name.trim()}${voteCount > 0 ? ` : +${voteCount}` : ""}`;
    const isTopVoted = voteCount > 0 && voteCount === topVoteCount;
    const fontSize = isOrigin ? 22 : Math.max(13, Math.min(20, 14 + point.z * 7));
    const placement = findLabelPlacement(label, point, fontSize, placedLabels, radius);

    if (!placement) {
      return;
    }

    placedLabels.push(placement.rect);
    drawMarkerLabel(label, placement.x, placement.y, fontSize, isOrigin, placement.align, isTopVoted);
  });
}

function drawMarkerPoint(point, isOrigin) {
  ctx.save();
  ctx.shadowColor = isOrigin ? "rgba(154, 190, 160, 0.82)" : "rgba(99, 205, 255, 0.72)";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(point.x, point.y, isOrigin ? 17 : 14, 0, Math.PI * 2);
  ctx.fillStyle = isOrigin ? "rgba(154, 190, 160, 0.22)" : "rgba(99, 205, 255, 0.16)";
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(point.x, point.y, isOrigin ? 8 : 6, 0, Math.PI * 2);
  ctx.fillStyle = isOrigin ? "#9abea0" : "#ffffff";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(3, 16, 28, 0.58)";
  ctx.stroke();
}

function findLabelPlacement(label, point, fontSize, placedLabels, radius) {
  ctx.font = `700 ${fontSize}px Segoe UI, Arial, sans-serif`;
  const width = ctx.measureText(label).width;
  const height = fontSize + 8;
  const candidates = [];
  const angles = [-35, 35, -145, 145, -90, 90, 0, 180, -65, 65, -115, 115];

  [24, 42, 62, 84, 108].forEach((distance) => {
    angles.forEach((angle) => {
      const radians = toRad(angle);
      const dx = Math.cos(radians) * distance;
      const dy = Math.sin(radians) * distance;
      const align = Math.abs(dx) < 12 ? "center" : dx < 0 ? "right" : "left";
      candidates.push({ dx, dy, align });
    });
  });

  for (const candidate of candidates) {
    const x = point.x + candidate.dx;
    const y = point.y + candidate.dy;
    const left =
      candidate.align === "right" ? x - width : candidate.align === "center" ? x - width / 2 : x;
    const rect = {
      left: left - 6,
      top: y - height / 2 - 4,
      right: left + width + 6,
      bottom: y + height / 2 + 4,
    };

    const insideGlobe =
      Math.hypot(rect.left - canvas.width / 2, rect.top - canvas.height / 2) < radius * 0.98 &&
      Math.hypot(rect.right - canvas.width / 2, rect.bottom - canvas.height / 2) < radius * 0.98;

    if (insideGlobe && !placedLabels.some((placed) => rectanglesOverlap(rect, placed))) {
      return { x, y, align: candidate.align, rect };
    }
  }

  return null;
}

function rectanglesOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function drawMarkerLabel(label, x, y, fontSize, isOrigin, align, isTopVoted) {
  ctx.save();
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.font = `700 ${fontSize}px Segoe UI, Arial, sans-serif`;
  ctx.fillStyle = isTopVoted ? "#d2a447" : "#ffffff";
  ctx.strokeStyle = "rgba(3, 16, 28, 0.86)";
  ctx.lineWidth = isOrigin ? 5 : 4;
  ctx.strokeText(label, x, y);
  ctx.fillText(label, x, y);
  ctx.restore();
}

function animate(timestamp) {
  const delta = Math.min(48, timestamp - lastTime);
  lastTime = timestamp;

  if (!drag) {
    view.lat += (targetView.lat - view.lat) * 0.05;
    view.lon = normalizeLon(view.lon + normalizeLon(targetView.lon - view.lon) * 0.05);
    view.zoom += ((targetView.zoom ?? view.zoom) - view.zoom) * 0.05;
  }

  if (route) {

  route.progress = Math.min(
    1,
    route.progress + delta / route.duration
  );

  const followPoint =
    route.points[
      Math.floor(
        route.progress * (route.points.length - 1)
      )
    ];

  // centrage de la caméra
  targetView.lat = followPoint.lat;
  targetView.lon = followPoint.lon;

  // zoom automatique UNE SEULE FOIS à mi-course
  if (
    route.progress >= 0.5 &&
    !route.midZoomDone
  ) {
    route.midZoomDone = true;
    targetView.zoom = ROUTE_MIDPOINT_ZOOM;
  }

  if (route.progress >= 1) {
    statusText.textContent = `Arrivée à ${route.to.name}.`;

    if (!route.completed) {
      route.completed = true;
      window.setTimeout(() => showArrival(route.to), 420);
    }
  }
}

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawSphere(getGlobeRadius());
  requestAnimationFrame(animate);
}

function showArrival(place) {
  activeArrivalPlace = place;
  arrivalTitle.textContent = place.name;
  arrivalDate.textContent = place.date ? place.date : "";
  arrivalDescription.textContent = place.description;
  updateVisitedButton(place);
  startSlideshow(place);

  if (arrivalDialog.open) {
    return;
  }

  if (typeof arrivalDialog.showModal === "function") {
    arrivalDialog.showModal();
  } else {
    arrivalDialog.setAttribute("open", "");
  }
}

function updateVisitedButton(place) {
  if (!visitedButton || !place?.key) {
    return;
  }

  const hasVisited = visitedDestinations[place.key] === 1;
  visitedButton.classList.toggle("visited", hasVisited);
  visitedButton.disabled = hasVisited;
  visitedButton.textContent = hasVisited ? "Lieu visité" : "J'ai visité ce lieu";
}

async function voteForActiveDestination() {

  console.log("activeArrivalPlace =", activeArrivalPlace);

  if (!activeArrivalPlace?.key || visitedDestinations[activeArrivalPlace.key] === 1) {
    console.warn("Aucune destination active");
    return;
  }

  console.log("Vote pour :", activeArrivalPlace.key);

  await saveVote(activeArrivalPlace.key);

  updateVisitedButton(activeArrivalPlace);
}
function startSlideshow(place) {
  stopSlideshow();
  currentSlides = Array.isArray(place.photos)
    ? place.photos.filter((photo) => /\.(jpe?g|png|webp|gif)$/i.test(photo))
    : [];
  currentSlideIndex = 0;

  if (!currentSlides.length) {
    arrivalSlideshow.hidden = true;
    arrivalImage.removeAttribute("src");
    arrivalImage.alt = "";
    slideCount.textContent = "";
    return;
  }

  arrivalSlideshow.hidden = false;
  renderSlide(place);

  if (currentSlides.length > 1) {
    slideshowTimer = window.setInterval(() => {
      moveSlide(1, place);
    }, 2000);
  }
}

function stopSlideshow() {
  if (slideshowTimer) {
    window.clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
}

function renderSlide(place) {
  const slide = currentSlides[currentSlideIndex];
  arrivalImage.src = slide;
  arrivalImage.alt = `${place.imageAlt} ${currentSlideIndex + 1}`;
  slideCount.textContent = `${currentSlideIndex + 1} / ${currentSlides.length}`;
  previousSlideButton.hidden = currentSlides.length <= 1;
  nextSlideButton.hidden = currentSlides.length <= 1;
}

function moveSlide(step, place = route?.to) {
  if (!currentSlides.length || !place) {
    return;
  }

  currentSlideIndex = (currentSlideIndex + step + currentSlides.length) % currentSlides.length;
  renderSlide(place);
}

function moveSlideManually(step) {
  const place = route?.to;
  if (!place) {
    return;
  }

  stopSlideshow();
  moveSlide(step, place);

  if (currentSlides.length > 1) {
    slideshowTimer = window.setInterval(() => {
      moveSlide(1, place);
    }, 2000);
  }
}

function openQuestDialog() {
  travelTypeSelect.value = "";
  continentChoiceSelect.value = "";
  flightHoursSelect.value = "";
  questMessage.textContent = "";
  questOkButton.hidden = true;
  questValidateButton.hidden = false;
  
const gif = document.getElementById("questGif");
gif.style.display = "none";
gif.src = "";

  if (typeof questDialog.showModal === "function") {
    questDialog.showModal();
  } else {
    questDialog.setAttribute("open", "");
  }
}

function closeQuestDialog() {
  questDialog.close();
}

function validateQuest() {
  const isCorrect =
    travelTypeSelect.value === "detente" &&
    continentChoiceSelect.value === "oceanie" &&
    flightHoursSelect.value === "15plus" &&
    fauneSelect.value === "REQUINS";
	
	
// 👉 CAS : champs non remplis
if (
  travelTypeSelect.value === "" ||
  continentChoiceSelect.value === "" ||
  flightHoursSelect.value === "" ||
  fauneSelect.value === ""
) {
  const gif = document.getElementById("questGif");

  questMessage.textContent = "HE HO !  Il en manque là , non ?? 😉";
  gif.src = "GALERIE/Z_manque.gif";
  gif.style.display = "block";

  questValidateButton.hidden = true;
  questOkButton.hidden = false;

  return; // ⛔ IMPORTANT : on stoppe ici
}	

  if (isCorrect) {
    honeymoonUnlocked = true;
    if (honeymoonOption) {
      honeymoonOption.hidden = false;
    }
    questDialog.close();
    destinationSelect.value = "voyagenoce";
    startTrip("voyagenoce");
    return;
  }

// 👉 CAS FAUX
const gif = document.getElementById("questGif");

// reset
gif.style.display = "none";
gif.src = "";

// 🎯 Gestion des erreurs personnalisées


if (fauneSelect.value === "MACHU") {
  questMessage.textContent = "Déjà fait c'était OUF !! ";
  gif.src = "GALERIE/Z_PICCU.gif";
}


else if  (travelTypeSelect.value === "sportif") {
  questMessage.textContent = "Ca va, on a tout l'été pour courir 😅";
  gif.src = "GALERIE/Z_souffrir.gif";
}

else if (travelTypeSelect.value === "geek") {
  questMessage.textContent = "Désolé, on va trouver une activité pour les deux 🤓";
  gif.src = "GALERIE/Z_drone.gif";
}

else if (travelTypeSelect.value === "Remise en forme") {
  questMessage.textContent = "une prochaine fois peut etre 😅 ";
  gif.src = "GALERIE/Z_SPA.gif";
}


else {
  questMessage.textContent =
    "Désolé ce n'est pas dans les plans des mariés 😅";
  gif.src = "GALERIE/Z_cestnon.gif";
}

// afficher le GIF si défini
if (gif.src) {
  gif.style.display = "block";
}

questValidateButton.hidden = true;
questOkButton.hidden = false;
}

function drawStars() {
  const wash = ctx.createRadialGradient(
    canvas.width * 0.54,
    canvas.height * 0.48,
    canvas.width * 0.12,
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width * 0.72,
  );
  wash.addColorStop(0, "rgba(255, 255, 255, 0.46)");
  wash.addColorStop(0.58, "rgba(232, 244, 239, 0.28)");
  wash.addColorStop(1, "rgba(242, 226, 206, 0.18)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 46; index += 1) {
    const x = (index * 167) % canvas.width;
    const y = (index * 251) % canvas.height;
    const size = 1 + (index % 4) * 0.52;
    ctx.fillStyle = `rgba(99, 206, 161, ${0.1 + (index % 5) * 0.035})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function startTrip(key) {
  if (arrivalDialog.open) {
    arrivalDialog.close();
  }
  stopSlideshow();

  if (key === "voyagenoce" && !honeymoonUnlocked) {
    destinationSelect.value = "";
    route = null;
    statusText.textContent = "Trouvez d'abord la destination des mariés.";
    distanceText.textContent = "En attente";
    return;
  }

  if (!key) {
    route = null;
    targetView = { lat: places.anzy.lat, lon: places.anzy.lon, zoom: 1 };
    statusText.textContent = "Globe centré sur Anzy-le-Duc.";
    distanceText.textContent = "En attente";
    return;
  }

  const destination = places[key];
  if (!destination) {
    return;
  }
  const km = distanceKm(places.anzy, destination);
  route = {
    from: places.anzy,
    to: destination,
    points: greatCircle(places.anzy, destination),
    progress: 0,
    duration: key === "rome" ? 5200 : 7600,
    completed: false,
    startZoom: view.zoom,
  };
  targetView = { lat: places.anzy.lat, lon: places.anzy.lon, zoom: view.zoom };
  statusText.textContent = `Décollage vers ${destination.name}.`;
  distanceText.textContent = `${km.toLocaleString("fr-FR")} km environ`;
}

destinationSelect.addEventListener("change", (event) => {
  startTrip(event.target.value);
  if (event.target.value && window.matchMedia("(max-width: 900px)").matches) {
    canvas.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

canvas.addEventListener("pointerdown", (event) => {
  drag = {
    x: event.clientX,
    y: event.clientY,
    lat: view.lat,
    lon: view.lon,
  };
  route = null;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  if (!drag) {
    return;
  }

  const dx = event.clientX - drag.x;
  const dy = event.clientY - drag.y;
  view.lon = normalizeLon(drag.lon - dx * 0.24);
  view.lat = Math.max(-82, Math.min(82, drag.lat + dy * 0.18));
  targetView = { ...view };
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();

  const zoomSpeed = 0.0015;

  view.zoom -= event.deltaY * zoomSpeed;

  // limites mini / maxi
  view.zoom = Math.max(0.6, Math.min(3, view.zoom));
});

canvas.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length === 2) {
      gesture = {
        distance: getTouchDistance(event.touches),
        zoom: view.zoom,
      };
      drag = null;
    }
  },
  { passive: false },
);

canvas.addEventListener(
  "touchmove",
  (event) => {
    if (event.touches.length === 2 && gesture) {
      event.preventDefault();
      const nextDistance = getTouchDistance(event.touches);
      view.zoom = Math.max(0.6, Math.min(3, gesture.zoom * (nextDistance / gesture.distance)));
      targetView = { ...targetView, zoom: view.zoom };
    }
  },
  { passive: false },
);

canvas.addEventListener("touchend", (event) => {
  if (event.touches.length < 2) {
    gesture = null;
  }
});

canvas.addEventListener("pointerup", () => {
  drag = null;
});

canvas.addEventListener("pointercancel", () => {
  drag = null;
});

closeDialogButton.addEventListener("click", () => {
  stopSlideshow();
  arrivalDialog.close();
  
});

arrivalDialog.addEventListener("click", (event) => {
  if (event.target === arrivalDialog) {
    stopSlideshow();
    arrivalDialog.close();
	
  }
  
});

arrivalDialog.addEventListener("close", () => {
  stopSlideshow();

  destinationSelect.value = "";
  route = null;

  targetView = {
    lat: places.anzy.lat,
    lon: places.anzy.lon,
    zoom: 1,
  };

  statusText.textContent = "Globe centré sur Anzy-le-Duc.";
  distanceText.textContent = "En attente";
});

previousSlideButton.addEventListener("click", () => {
  moveSlideManually(-1);
});

nextSlideButton.addEventListener("click", () => {
  moveSlideManually(1);
});

visitedButton.addEventListener("click", () => {
  voteForActiveDestination();
});


resetVotesButton.addEventListener("click", () => {
  resetVotes();
});

questButton.addEventListener("click", () => {
  openQuestDialog();
});

questCloseButton.addEventListener("click", () => {

  closeQuestDialog();

  destinationSelect.value = "";
  route = null;

  targetView = {
    lat: places.anzy.lat,
    lon: places.anzy.lon,
    zoom: 1,
  };

  statusText.textContent = "Globe centré sur Anzy-le-Duc.";
  distanceText.textContent = "En attente";
});

questValidateButton.addEventListener("click", () => {
  validateQuest();
});

questOkButton.addEventListener("click", () => {
  closeQuestDialog();
  
  destinationSelect.value = "";
  route = null;

  targetView = {
    lat: places.anzy.lat,
    lon: places.anzy.lon,
    zoom: 1,
  };

  statusText.textContent = "Globe centré sur Anzy-le-Duc.";
  distanceText.textContent = "En attente";
});

questDialog.addEventListener("click", (event) => {
  if (event.target === questDialog) {
    closeQuestDialog();
  }
});


errorCloseButton.addEventListener("click", () => {
  errorDialog.close();
});

loadVotes();
loadCountryBoundaries();
requestAnimationFrame(animate);
