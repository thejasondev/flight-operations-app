/**
 * Airline Data
 * Base de datos de aerolíneas con códigos IATA
 */

export interface Airline {
  /** Código IATA de 2 letras (estándar de la industria) */
  iataCode: string;
  /** Nombre completo de la aerolínea */
  name: string;
  /** País de origen */
  country: string;
  /** Alias o nombres alternativos */
  aliases?: string[];
}

/**
 * Lista completa de aerolíneas operando en el aeropuerto
 * Ordenadas alfabéticamente por nombre
 */
export const AIRLINES: Airline[] = [
  // Norteamérica - Canadá
  { iataCode: 'AC', name: 'Air Canada', country: 'Canada' },
  { iataCode: 'TS', name: 'Air Transat', country: 'Canada' },
  { iataCode: 'WS', name: 'WestJet', country: 'Canada' },
  { iataCode: 'WG', name: 'Sunwing Airlines', country: 'Canada' },

  // Norteamérica - Estados Unidos
  { iataCode: 'AA', name: 'American Airlines', country: 'United States' },
  { iataCode: 'DL', name: 'Delta Air Lines', country: 'United States' },
  { iataCode: 'UA', name: 'United Airlines', country: 'United States' },

  // Europa - Alemania
  { iataCode: 'LH', name: 'Lufthansa', country: 'Germany' },
  { iataCode: 'DE', name: 'Condor', country: 'Germany' },

  // Europa - España
  { iataCode: 'IB', name: 'Iberia', country: 'Spain' },
  { iataCode: 'UX', name: 'Plus Ultra', country: 'Spain' },

  // Europa - Francia
  { iataCode: 'AF', name: 'Air France', country: 'France' },

  // Europa - Italia
  { iataCode: 'BV', name: 'Blue Panorama Airlines', country: 'Italy' },

  // Europa - Países Bajos
  { iataCode: 'KL', name: 'KLM', country: 'Netherlands' },

  // Europa - Reino Unido
  { iataCode: 'BA', name: 'British Airways', country: 'United Kingdom' },

  // Europa - Turquía
  { iataCode: 'TK', name: 'Turkish Airlines', country: 'Turkey' },

  // Rusia
  { iataCode: 'N4', name: 'Nordwind Airlines', country: 'Russia' },
  { iataCode: 'ZF', name: 'Azur Air', country: 'Russia' },
  { iataCode: 'FV', name: 'Rossiya Airlines', country: 'Russia' },
  { iataCode: 'SU', name: 'Aeroflot', country: 'Russia' },

  // Latinoamérica - Cuba
  { iataCode: 'CU', name: 'Cubana de Aviación', country: 'Cuba' },
  { iataCode: 'HT', name: 'Havanatur', country: 'Cuba', aliases: ['Havanatur S.A.'] },

  // Latinoamérica - Colombia
  { iataCode: 'AV', name: 'Avianca', country: 'Colombia' },

  // Latinoamérica - Chile
  { iataCode: 'LA', name: 'LATAM', country: 'Chile', aliases: ['LATAM Airlines'] },

  // Latinoamérica - Panamá
  { iataCode: 'CM', name: 'Copa Airlines', country: 'Panama' },

  // Latinoamérica - México
  { iataCode: 'AM', name: 'Aeromexico', country: 'Mexico' },

  // Latinoamérica - Venezuela
  { iataCode: 'V0', name: 'Conviasa', country: 'Venezuela' },
  { iataCode: 'RQ', name: 'Rutaca Airlines', country: 'Venezuela' },

  // Medio Oriente
  { iataCode: 'EK', name: 'Emirates', country: 'United Arab Emirates' },
  { iataCode: 'QR', name: 'Qatar Airways', country: 'Qatar' },

  // Otras
  { iataCode: '2W', name: 'World2Fly', country: 'Spain' },
];

/**
 * Obtiene los nombres de aerolíneas para el autocomplete
 * Formato: "Nombre de Aerolínea"
 */
export const getAirlineNames = (): string[] => {
  return AIRLINES.map((airline) => airline.name).sort();
};

/**
 * Obtiene los nombres de aerolíneas con código IATA
 * Formato: "Nombre de Aerolínea (XX)"
 */
export const getAirlineNamesWithCode = (): string[] => {
  return AIRLINES.map((airline) => `${airline.name} (${airline.iataCode})`).sort();
};

/**
 * Busca una aerolínea por código IATA
 */
export const getAirlineByCode = (iataCode: string): Airline | undefined => {
  return AIRLINES.find((airline) => airline.iataCode.toUpperCase() === iataCode.toUpperCase());
};

/**
 * Busca una aerolínea por nombre
 */
export const getAirlineByName = (name: string): Airline | undefined => {
  return AIRLINES.find(
    (airline) =>
      airline.name.toLowerCase() === name.toLowerCase() ||
      airline.aliases?.some((alias) => alias.toLowerCase() === name.toLowerCase())
  );
};

/**
 * Filtra aerolíneas por país
 */
export const getAirlinesByCountry = (country: string): Airline[] => {
  return AIRLINES.filter((airline) => airline.country.toLowerCase() === country.toLowerCase());
};

/**
 * Busca aerolíneas por texto (nombre o código)
 */
export const searchAirlines = (query: string): Airline[] => {
  const searchTerm = query.toLowerCase();
  return AIRLINES.filter(
    (airline) =>
      airline.name.toLowerCase().includes(searchTerm) ||
      airline.iataCode.toLowerCase().includes(searchTerm) ||
      airline.country.toLowerCase().includes(searchTerm)
  );
};
