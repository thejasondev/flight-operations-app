/**
 * Aviation Data - Central Export
 *
 * Este módulo centraliza todos los datos de la aviación (aerolíneas y aeropuertos)
 * para facilitar la importación en otros componentes.
 *
 * @example
 * ```typescript
 * import { AIRLINES, AIRPORTS, getAirlineNames, getDestinationList } from '@/data';
 * ```
 */

// Re-export everything from airlines
export {
  type Airline,
  AIRLINES,
  getAirlineNames,
  getAirlineNamesWithCode,
  getAirlineByCode,
  getAirlineByName,
  getAirlinesByCountry,
  searchAirlines,
} from './airlines';

// Re-export everything from airports
export {
  type Airport,
  AIRPORTS,
  getDestinationList,
  getDestinationListWithCountry,
  getAirportByCode,
  getAirportsByCity,
  getAirportsByCountry,
  getAirportsByRegion,
  searchAirports,
  extractIATACode,
  extractCityName,
  formatAirportDisplay,
  formatAirportDisplayFull,
} from './airports';
