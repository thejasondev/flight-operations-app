/**
 * Airport Destinations Data
 * Base de datos de aeropuertos con códigos IATA
 */

export interface Airport {
  /** Código IATA de 3 letras (estándar de la industria) */
  iataCode: string;
  /** Nombre de la ciudad */
  city: string;
  /** País */
  country: string;
  /** Nombre del aeropuerto */
  airportName?: string;
  /** Región o provincia */
  region?: string;
}

/**
 * Lista completa de destinos del aeropuerto
 * Organizados por región geográfica
 */
export const AIRPORTS: Airport[] = [
  // CUBA
  {
    iataCode: 'VRA',
    city: 'Varadero',
    country: 'Cuba',
    airportName: 'Juan Gualberto Gómez Airport',
    region: 'Matanzas',
  },
  {
    iataCode: 'HAV',
    city: 'La Habana',
    country: 'Cuba',
    airportName: 'José Martí International Airport',
    region: 'La Habana',
  },
  {
    iataCode: 'SCU',
    city: 'Santiago de Cuba',
    country: 'Cuba',
    airportName: 'Antonio Maceo Airport',
    region: 'Santiago de Cuba',
  },
  {
    iataCode: 'HOG',
    city: 'Holguín',
    country: 'Cuba',
    airportName: 'Frank País Airport',
    region: 'Holguín',
  },
  {
    iataCode: 'CCC',
    city: 'Cayo Coco',
    country: 'Cuba',
    airportName: 'Jardines del Rey Airport',
    region: 'Ciego de Ávila',
  },
  {
    iataCode: 'CMW',
    city: 'Camagüey',
    country: 'Cuba',
    airportName: 'Ignacio Agramonte Airport',
    region: 'Camagüey',
  },
  {
    iataCode: 'CFG',
    city: 'Cienfuegos',
    country: 'Cuba',
    airportName: 'Jaime González Airport',
    region: 'Cienfuegos',
  },

  // CANADÁ
  {
    iataCode: 'YYZ',
    city: 'Toronto',
    country: 'Canada',
    airportName: 'Toronto Pearson International Airport',
    region: 'Ontario',
  },
  {
    iataCode: 'YUL',
    city: 'Montreal',
    country: 'Canada',
    airportName: 'Montréal-Pierre Elliott Trudeau International Airport',
    region: 'Quebec',
  },
  {
    iataCode: 'YVR',
    city: 'Vancouver',
    country: 'Canada',
    airportName: 'Vancouver International Airport',
    region: 'British Columbia',
  },
  {
    iataCode: 'YYC',
    city: 'Calgary',
    country: 'Canada',
    airportName: 'Calgary International Airport',
    region: 'Alberta',
  },
  {
    iataCode: 'YOW',
    city: 'Ottawa',
    country: 'Canada',
    airportName: 'Ottawa Macdonald-Cartier International Airport',
    region: 'Ontario',
  },
  {
    iataCode: 'YEG',
    city: 'Edmonton',
    country: 'Canada',
    airportName: 'Edmonton International Airport',
    region: 'Alberta',
  },
  {
    iataCode: 'YWG',
    city: 'Winnipeg',
    country: 'Canada',
    airportName: 'Winnipeg Richardson International Airport',
    region: 'Manitoba',
  },
  {
    iataCode: 'YHZ',
    city: 'Halifax',
    country: 'Canada',
    airportName: 'Halifax Stanfield International Airport',
    region: 'Nova Scotia',
  },
  {
    iataCode: 'YQB',
    city: 'Quebec City',
    country: 'Canada',
    airportName: 'Québec City Jean Lesage International Airport',
    region: 'Quebec',
  },
  {
    iataCode: 'YXE',
    city: 'Saskatoon',
    country: 'Canada',
    airportName: 'Saskatoon John G. Diefenbaker International Airport',
    region: 'Saskatchewan',
  },

  // RUSIA
  {
    iataCode: 'SVO',
    city: 'Moscú',
    country: 'Russia',
    airportName: 'Sheremetyevo International Airport',
    region: 'Moscow',
  },
  {
    iataCode: 'LED',
    city: 'San Petersburgo',
    country: 'Russia',
    airportName: 'Pulkovo Airport',
    region: 'Saint Petersburg',
  },
  {
    iataCode: 'SVX',
    city: 'Ekaterimburgo',
    country: 'Russia',
    airportName: 'Koltsovo Airport',
    region: 'Sverdlovsk',
  },
  {
    iataCode: 'OVB',
    city: 'Novosibirsk',
    country: 'Russia',
    airportName: 'Tolmachevo Airport',
    region: 'Novosibirsk',
  },
  {
    iataCode: 'KZN',
    city: 'Kazan',
    country: 'Russia',
    airportName: 'Kazan International Airport',
    region: 'Tatarstan',
  },
  {
    iataCode: 'AER',
    city: 'Sochi',
    country: 'Russia',
    airportName: 'Sochi International Airport',
    region: 'Krasnodar',
  },
  {
    iataCode: 'ROV',
    city: 'Rostov del Don',
    country: 'Russia',
    airportName: 'Platov International Airport',
    region: 'Rostov',
  },
  {
    iataCode: 'KUF',
    city: 'Samara',
    country: 'Russia',
    airportName: 'Kurumoch International Airport',
    region: 'Samara',
  },

  // EUROPA OCCIDENTAL
  {
    iataCode: 'MAD',
    city: 'Madrid',
    country: 'Spain',
    airportName: 'Adolfo Suárez Madrid-Barajas Airport',
    region: 'Madrid',
  },
  {
    iataCode: 'BCN',
    city: 'Barcelona',
    country: 'Spain',
    airportName: 'Barcelona-El Prat Airport',
    region: 'Catalonia',
  },
  {
    iataCode: 'CDG',
    city: 'París',
    country: 'France',
    airportName: 'Charles de Gaulle Airport',
    region: 'Île-de-France',
  },
  {
    iataCode: 'LHR',
    city: 'Londres',
    country: 'United Kingdom',
    airportName: 'Heathrow Airport',
    region: 'Greater London',
  },
  {
    iataCode: 'FCO',
    city: 'Roma',
    country: 'Italy',
    airportName: 'Leonardo da Vinci-Fiumicino Airport',
    region: 'Lazio',
  },
  {
    iataCode: 'MXP',
    city: 'Milán',
    country: 'Italy',
    airportName: 'Milan Malpensa Airport',
    region: 'Lombardy',
  },
  {
    iataCode: 'FRA',
    city: 'Frankfurt',
    country: 'Germany',
    airportName: 'Frankfurt Airport',
    region: 'Hesse',
  },
  {
    iataCode: 'MUC',
    city: 'Múnich',
    country: 'Germany',
    airportName: 'Munich Airport',
    region: 'Bavaria',
  },
  {
    iataCode: 'AMS',
    city: 'Amsterdam',
    country: 'Netherlands',
    airportName: 'Amsterdam Airport Schiphol',
    region: 'North Holland',
  },
  {
    iataCode: 'ZRH',
    city: 'Zurich',
    country: 'Switzerland',
    airportName: 'Zurich Airport',
    region: 'Zurich',
  },
  {
    iataCode: 'BER',
    city: 'Berlín',
    country: 'Germany',
    airportName: 'Berlin Brandenburg Airport',
    region: 'Brandenburg',
  },
  {
    iataCode: 'VIE',
    city: 'Viena',
    country: 'Austria',
    airportName: 'Vienna International Airport',
    region: 'Vienna',
  },
  {
    iataCode: 'PRG',
    city: 'Praga',
    country: 'Czech Republic',
    airportName: 'Václav Havel Airport Prague',
    region: 'Prague',
  },
  {
    iataCode: 'LIS',
    city: 'Lisboa',
    country: 'Portugal',
    airportName: 'Lisbon Portela Airport',
    region: 'Lisbon',
  },
  {
    iataCode: 'KTW',
    city: 'Katowice',
    country: 'Poland',
    airportName: 'Katowice Airport',
    region: 'Silesia',
  },

  // LATINOAMÉRICA
  {
    iataCode: 'BOG',
    city: 'Bogotá',
    country: 'Colombia',
    airportName: 'El Dorado International Airport',
    region: 'Cundinamarca',
  },
  {
    iataCode: 'MEX',
    city: 'México DF',
    country: 'Mexico',
    airportName: 'Mexico City International Airport',
    region: 'Mexico City',
  },
  {
    iataCode: 'LIM',
    city: 'Lima',
    country: 'Peru',
    airportName: 'Jorge Chávez International Airport',
    region: 'Lima',
  },
  {
    iataCode: 'GRU',
    city: 'São Paulo',
    country: 'Brazil',
    airportName: 'São Paulo/Guarulhos International Airport',
    region: 'São Paulo',
  },
  {
    iataCode: 'EZE',
    city: 'Buenos Aires',
    country: 'Argentina',
    airportName: 'Ministro Pistarini International Airport',
    region: 'Buenos Aires',
  },
  {
    iataCode: 'SCL',
    city: 'Santiago',
    country: 'Chile',
    airportName: 'Arturo Merino Benítez International Airport',
    region: 'Santiago Metropolitan',
  },
  {
    iataCode: 'CCS',
    city: 'Caracas',
    country: 'Venezuela',
    airportName: 'Simón Bolívar International Airport',
    region: 'Vargas',
  },
  {
    iataCode: 'PTY',
    city: 'Panamá',
    country: 'Panama',
    airportName: 'Tocumen International Airport',
    region: 'Panama',
  },
  {
    iataCode: 'CUN',
    city: 'Cancún',
    country: 'Mexico',
    airportName: 'Cancún International Airport',
    region: 'Quintana Roo',
  },

  // CARIBE
  {
    iataCode: 'PUJ',
    city: 'Punta Cana',
    country: 'Dominican Republic',
    airportName: 'Punta Cana International Airport',
    region: 'La Altagracia',
  },
  {
    iataCode: 'KIN',
    city: 'Kingston',
    country: 'Jamaica',
    airportName: 'Norman Manley International Airport',
    region: 'Kingston',
  },
  {
    iataCode: 'NAS',
    city: 'Nassau',
    country: 'Bahamas',
    airportName: 'Lynden Pindling International Airport',
    region: 'New Providence',
  },

  // ESTADOS UNIDOS
  {
    iataCode: 'MIA',
    city: 'Miami',
    country: 'United States',
    airportName: 'Miami International Airport',
    region: 'Florida',
  },
  {
    iataCode: 'JFK',
    city: 'Nueva York',
    country: 'United States',
    airportName: 'John F. Kennedy International Airport',
    region: 'New York',
  },
  {
    iataCode: 'LAX',
    city: 'Los Ángeles',
    country: 'United States',
    airportName: 'Los Angeles International Airport',
    region: 'California',
  },
  {
    iataCode: 'ORD',
    city: 'Chicago',
    country: 'United States',
    airportName: "O'Hare International Airport",
    region: 'Illinois',
  },
  {
    iataCode: 'ATL',
    city: 'Atlanta',
    country: 'United States',
    airportName: 'Hartsfield-Jackson Atlanta International Airport',
    region: 'Georgia',
  },
  {
    iataCode: 'DFW',
    city: 'Dallas',
    country: 'United States',
    airportName: 'Dallas/Fort Worth International Airport',
    region: 'Texas',
  },
  {
    iataCode: 'BOS',
    city: 'Boston',
    country: 'United States',
    airportName: 'Logan International Airport',
    region: 'Massachusetts',
  },
  {
    iataCode: 'DCA',
    city: 'Washington',
    country: 'United States',
    airportName: 'Ronald Reagan Washington National Airport',
    region: 'District of Columbia',
  },
];

/**
 * Obtiene los destinos formateados para el autocomplete
 * Formato: "Ciudad (IATA)"
 */
export const getDestinationList = (): string[] => {
  return AIRPORTS.map((airport) => `${airport.city} (${airport.iataCode})`).sort();
};

/**
 * Obtiene los destinos formateados con información completa
 * Formato: "Ciudad, País (IATA)"
 */
export const getDestinationListWithCountry = (): string[] => {
  return AIRPORTS.map(
    (airport) => `${airport.city}, ${airport.country} (${airport.iataCode})`
  ).sort();
};

/**
 * Busca un aeropuerto por código IATA
 */
export const getAirportByCode = (iataCode: string): Airport | undefined => {
  return AIRPORTS.find((airport) => airport.iataCode.toUpperCase() === iataCode.toUpperCase());
};

/**
 * Busca aeropuertos por ciudad
 */
export const getAirportsByCity = (city: string): Airport[] => {
  return AIRPORTS.filter((airport) => airport.city.toLowerCase().includes(city.toLowerCase()));
};

/**
 * Filtra aeropuertos por país
 */
export const getAirportsByCountry = (country: string): Airport[] => {
  return AIRPORTS.filter((airport) => airport.country.toLowerCase() === country.toLowerCase());
};

/**
 * Filtra aeropuertos por región
 */
export const getAirportsByRegion = (region: string): Airport[] => {
  return AIRPORTS.filter((airport) => airport.region?.toLowerCase().includes(region.toLowerCase()));
};

/**
 * Busca aeropuertos por texto (código, ciudad, país o aeropuerto)
 */
export const searchAirports = (query: string): Airport[] => {
  const searchTerm = query.toLowerCase();
  return AIRPORTS.filter(
    (airport) =>
      airport.iataCode.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm) ||
      airport.airportName?.toLowerCase().includes(searchTerm)
  );
};

/**
 * Extrae el código IATA de un string formateado
 * Ejemplo: "Ciudad (XYZ)" => "XYZ"
 */
export const extractIATACode = (formattedString: string): string | null => {
  const match = formattedString.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : null;
};

/**
 * Extrae la ciudad de un string formateado
 * Ejemplo: "Ciudad (XYZ)" => "Ciudad"
 */
export const extractCityName = (formattedString: string): string => {
  return formattedString.replace(/\s*\([A-Z]{3}\).*$/, '').trim();
};

/**
 * Formatea un string para mostrar: Ciudad (IATA)
 */
export const formatAirportDisplay = (airport: Airport): string => {
  return `${airport.city} (${airport.iataCode})`;
};

/**
 * Formatea un string para mostrar: Ciudad, País (IATA)
 */
export const formatAirportDisplayFull = (airport: Airport): string => {
  return `${airport.city}, ${airport.country} (${airport.iataCode})`;
};
