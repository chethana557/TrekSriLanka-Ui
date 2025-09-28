// Centralized location data and helpers for Sri Lankan tour packages
// Provides a standardized list of display names and approximate coordinates.

export const LOCATION_COORDS = {
  ambalangoda: { lat: 6.2325, lng: 80.0569 },
  ampara: { lat: 7.2919, lng: 81.6744 },
  anuradhapura: { lat: 8.3114, lng: 80.4037 },
  arugambay: { lat: 6.8481, lng: 81.8317 },
  avissawella: { lat: 6.9536, lng: 80.2158 },
  badulla: { lat: 6.9934, lng: 81.055 },
  balangoda: { lat: 6.6536, lng: 80.6936 },
  bandarawela: { lat: 6.8322, lng: 80.9881 },
  batticaloa: { lat: 7.7275, lng: 81.6924 },
  beruwala: { lat: 6.4786, lng: 79.9822 },
  chilaw: { lat: 7.577, lng: 79.7958 },
  colombo: { lat: 6.9271, lng: 79.8612 },
  dambulla: { lat: 7.8742, lng: 80.6511 },
  dehiwalamountlavinia: { lat: 6.8482, lng: 79.8679 },
  dikwella: { lat: 5.9667, lng: 80.6958 },
  ella: { lat: 6.8667, lng: 81.0466 },
  embilipitiya: { lat: 6.4719, lng: 80.8583 },
  galle: { lat: 6.0535, lng: 80.221 },
  gampaha: { lat: 7.0928, lng: 79.9926 },
  gampola: { lat: 7.1642, lng: 80.5694 },
  habarana: { lat: 8.0411, lng: 80.7556 },
  hambantota: { lat: 6.1242, lng: 81.1185 },
  haputale: { lat: 6.7647, lng: 80.9592 },
  hatton: { lat: 6.8925, lng: 80.5986 },
  hikkaduwa: { lat: 6.1389, lng: 80.1039 },
  horana: { lat: 6.7118, lng: 80.0617 },
  jaela: { lat: 7.08, lng: 79.89 },
  jaffna: { lat: 9.6615, lng: 80.0255 },
  kalmunai: { lat: 7.4167, lng: 81.8167 },
  kalpitiya: { lat: 8.2325, lng: 79.7667 },
  kalutara: { lat: 6.5854, lng: 79.9607 },
  kandy: { lat: 7.2906, lng: 80.6337 },
  kataragama: { lat: 6.4167, lng: 81.3333 },
  kegalle: { lat: 7.2519, lng: 80.3464 },
  kelaniya: { lat: 6.953, lng: 79.9212 },
  kilinochchi: { lat: 9.3833, lng: 80.4 },
  kuliyapitiya: { lat: 7.4694, lng: 80.0461 },
  kurunegala: { lat: 7.485, lng: 80.3608 },
  mannar: { lat: 8.9785, lng: 79.9135 },
  matale: { lat: 7.4675, lng: 80.6234 },
  matara: { lat: 5.9481, lng: 80.5353 },
  medawachchiya: { lat: 8.5, lng: 80.5 },
  mirissa: { lat: 5.9452, lng: 80.4578 },
  monaragala: { lat: 6.8833, lng: 81.35 },
  moratuwa: { lat: 6.7733, lng: 79.8817 },
  mullaitivu: { lat: 9.2667, lng: 80.8167 },
  nawalapitiya: { lat: 7.0544, lng: 80.5311 },
  negombo: { lat: 7.2008, lng: 79.8359 },
  nugegoda: { lat: 6.8682, lng: 79.8992 },
  nuwaraeliya: { lat: 6.9497, lng: 80.7891 },
  panadura: { lat: 6.7132, lng: 79.9022 },
  pasikudah: { lat: 7.9231, lng: 81.5647 },
  peradeniya: { lat: 7.2547, lng: 80.5947 },
  pointpedro: { lat: 9.825, lng: 80.2333 },
  polonnaruwa: { lat: 7.9403, lng: 81.0188 },
  pottuvil: { lat: 6.8833, lng: 81.8333 },
  puttalam: { lat: 8.0353, lng: 79.834 },
  ratnapura: { lat: 6.7056, lng: 80.3847 },
  sigiriya: { lat: 7.957, lng: 80.76 },
  srijayawardenepurakotte: { lat: 6.9046, lng: 79.9189 },
  tangalle: { lat: 6.0245, lng: 80.7933 },
  tissamaharama: { lat: 6.2778, lng: 81.2889 },
  trincomalee: { lat: 8.5874, lng: 81.2152 },
  unawatuna: { lat: 6.0108, lng: 80.2458 },
  vavuniya: { lat: 8.7514, lng: 80.4981 },
  wadduwa: { lat: 6.6667, lng: 79.9333 },
  wattala: { lat: 6.9856, lng: 79.8917 },
  weligama: { lat: 5.9748, lng: 80.4227 },
  wellawaya: { lat: 6.7369, lng: 81.1008 },
    bandaranaikeinternationalcolomboairport: { lat: 7.1800, lng: 79.8847 }
};

export const LOCATION_NAMES = [
  'Ambalangoda','Ampara','Anuradhapura','Arugam Bay','Avissawella','Badulla','Balangoda','Bandarawela','Batticaloa','Beruwala',
  'Chilaw','Colombo','Dambulla','Dehiwala-Mount Lavinia','Dikwella','Ella','Embilipitiya','Galle','Gampaha','Gampola',
  'Habarana','Hambantota','Haputale','Hatton','Hikkaduwa','Horana','Ja-Ela','Jaffna','Kalmunai','Kalpitiya','Kalutara','Kandy',
  'Kataragama','Kegalle','Kelaniya','Kilinochchi','Kuliyapitiya','Kurunegala','Mannar','Matale','Matara','Medawachchiya','Mirissa',
  'Monaragala','Moratuwa','Mullaitivu','Nawalapitiya','Negombo','Nugegoda','Nuwara Eliya','Panadura','Pasikudah','Peradeniya',
  'Point Pedro','Polonnaruwa','Pottuvil','Puttalam','Ratnapura','Sigiriya','Sri Jayawardenepura Kotte','Tangalle','Tissamaharama',
  'Trincomalee','Unawatuna','Vavuniya','Wadduwa','Wattala','Weligama','Wellawaya','Bandaranaike International Colombo Airport'
];

export function deriveKey(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function mapLocationsWithCoords(names) {
  return names.map(n => {
    const key = deriveKey(n);
    const c = LOCATION_COORDS[key];
    return { name: n, ...(c || {}) };
  });
}
