// Base de datos de aviones comerciales por aerolínea
// Enfocado en las aerolíneas que operan en el Aeropuerto Internacional Juan Gualberto Gómez (Varadero)

export interface AircraftModel {
  model: string;
  manufacturer: string;
  capacity: string;
  type: 'narrow-body' | 'wide-body' | 'regional';
}

export const AIRCRAFT_BY_AIRLINE: Record<string, AircraftModel[]> = {
  // Aerolíneas Canadienses
  'Air Canada': [
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '160-189', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '162-210', type: 'narrow-body' },
    { model: 'Airbus A220-300', manufacturer: 'Airbus', capacity: '130-160', type: 'narrow-body' },
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '120-156', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '150-180', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '185-220', type: 'narrow-body' },
    { model: 'Boeing 777-200LR', manufacturer: 'Boeing', capacity: '300-400', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '210-250', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '250-290', type: 'wide-body' }
  ],

  'Air Transat': [
    { model: 'Airbus A321-200', manufacturer: 'Airbus', capacity: '199', type: 'narrow-body' },
    { model: 'Airbus A321neo', manufacturer: 'Airbus', capacity: '199', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '332', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '345', type: 'wide-body' }
  ],

  'WestJet': [
    { model: 'Boeing 737-600', manufacturer: 'Boeing', capacity: '119', type: 'narrow-body' },
    { model: 'Boeing 737-700', manufacturer: 'Boeing', capacity: '136', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '162-189', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '162-210', type: 'narrow-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '320', type: 'wide-body' }
  ],

  'Sunwing Airlines': [
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '189', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '189', type: 'narrow-body' }
  ],

  // Aerolíneas Rusas
  'Nordwind Airlines': [
    { model: 'Airbus A321-200', manufacturer: 'Airbus', capacity: '220', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '302', type: 'wide-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '189', type: 'narrow-body' },
    { model: 'Boeing 777-200ER', manufacturer: 'Boeing', capacity: '375', type: 'wide-body' }
  ],

  'Azur Air': [
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '189', type: 'narrow-body' },
    { model: 'Boeing 757-200', manufacturer: 'Boeing', capacity: '235', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '336', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '472', type: 'wide-body' }
  ],

  'Rossiya Airlines': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '128', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '158', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '170', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '168', type: 'narrow-body' },
    { model: 'Boeing 747-400', manufacturer: 'Boeing', capacity: '522', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '402', type: 'wide-body' }
  ],

  'Aeroflot': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '128', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '158', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '183', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '222', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '296', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '316', type: 'wide-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '158', type: 'narrow-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '402', type: 'wide-body' }
  ],

  // Aerolíneas Cubanas
  'Cubana de Aviación': [
    { model: 'Ilyushin Il-96-300', manufacturer: 'Ilyushin', capacity: '262', type: 'wide-body' },
    { model: 'Tupolev Tu-204-100E', manufacturer: 'Tupolev', capacity: '210', type: 'narrow-body' },
    { model: 'Antonov An-158', manufacturer: 'Antonov', capacity: '99', type: 'regional' },
    { model: 'ATR 42-500', manufacturer: 'ATR', capacity: '48', type: 'regional' }
  ],

  'Havanatur': [
    { model: 'Boeing 737-500', manufacturer: 'Boeing', capacity: '132', type: 'narrow-body' },
    { model: 'Yakovlev Yak-42D', manufacturer: 'Yakovlev', capacity: '120', type: 'regional' }
  ],

  // Aerolíneas Europeas
  'Blue Panorama Airlines': [
    { model: 'Boeing 737-400', manufacturer: 'Boeing', capacity: '144', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '189', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '269', type: 'wide-body' }
  ],

  'Condor': [
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '180', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '220', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '290', type: 'wide-body' },
    { model: 'Boeing 757-300', manufacturer: 'Boeing', capacity: '275', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '259', type: 'wide-body' }
  ],

  // Aerolíneas Latinoamericanas
  'Avianca': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '120', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '150', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '185', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '253', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '250', type: 'wide-body' }
  ],

  'LATAM': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '144', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '174', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '220', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '221', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '313', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '330', type: 'wide-body' }
  ],

  'Copa Airlines': [
    { model: 'Boeing 737-700', manufacturer: 'Boeing', capacity: '124', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '160', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '166', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 9', manufacturer: 'Boeing', capacity: '172', type: 'narrow-body' }
  ],

  // Aerolíneas Norteamericanas
  'American Airlines': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '128', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '150', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '187-199', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '172', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '172', type: 'narrow-body' },
    { model: 'Boeing 757-200', manufacturer: 'Boeing', capacity: '176-190', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '209-226', type: 'wide-body' },
    { model: 'Boeing 777-200ER', manufacturer: 'Boeing', capacity: '273', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '304', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '234', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '285', type: 'wide-body' }
  ],

  'Delta Air Lines': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '126', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '147-150', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '187-199', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '234', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '293', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '306', type: 'wide-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '160', type: 'narrow-body' },
    { model: 'Boeing 737-900ER', manufacturer: 'Boeing', capacity: '180', type: 'narrow-body' },
    { model: 'Boeing 757-200', manufacturer: 'Boeing', capacity: '199', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '226', type: 'wide-body' },
    { model: 'Boeing 767-400ER', manufacturer: 'Boeing', capacity: '238', type: 'wide-body' }
  ],

  'United Airlines': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '128', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '138', type: 'narrow-body' },
    { model: 'Boeing 737-700', manufacturer: 'Boeing', capacity: '118', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '166', type: 'narrow-body' },
    { model: 'Boeing 737-900', manufacturer: 'Boeing', capacity: '179', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '166', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 9', manufacturer: 'Boeing', capacity: '179', type: 'narrow-body' },
    { model: 'Boeing 757-200', manufacturer: 'Boeing', capacity: '169', type: 'narrow-body' },
    { model: 'Boeing 767-300ER', manufacturer: 'Boeing', capacity: '214', type: 'wide-body' },
    { model: 'Boeing 777-200ER', manufacturer: 'Boeing', capacity: '276', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '348', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '219', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '252', type: 'wide-body' },
    { model: 'Boeing 787-10', manufacturer: 'Boeing', capacity: '318', type: 'wide-body' }
  ],

  // Aerolíneas Europeas Adicionales
  'Air France': [
    { model: 'Airbus A318', manufacturer: 'Airbus', capacity: '131', type: 'narrow-body' },
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '142', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '174', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '212', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '224', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '324', type: 'wide-body' },
    { model: 'Boeing 777-200ER', manufacturer: 'Boeing', capacity: '309', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '396', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '276', type: 'wide-body' }
  ],

  'Lufthansa': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '138', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '168', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '200', type: 'narrow-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '255', type: 'wide-body' },
    { model: 'Airbus A340-300', manufacturer: 'Airbus', capacity: '279', type: 'wide-body' },
    { model: 'Airbus A340-600', manufacturer: 'Airbus', capacity: '297', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '293', type: 'wide-body' },
    { model: 'Boeing 747-400', manufacturer: 'Boeing', capacity: '371', type: 'wide-body' },
    { model: 'Boeing 747-8I', manufacturer: 'Boeing', capacity: '364', type: 'wide-body' }
  ],

  'British Airways': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '132', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '168', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '205', type: 'narrow-body' },
    { model: 'Airbus A350-1000', manufacturer: 'Airbus', capacity: '331', type: 'wide-body' },
    { model: 'Boeing 777-200ER', manufacturer: 'Boeing', capacity: '275', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '299', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '214', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '216', type: 'wide-body' }
  ],

  'Iberia': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '138', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '168', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '200', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '288', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '342', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '348', type: 'wide-body' }
  ],

  'KLM': [
    { model: 'Boeing 737-700', manufacturer: 'Boeing', capacity: '126', type: 'narrow-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '186', type: 'narrow-body' },
    { model: 'Boeing 737-900', manufacturer: 'Boeing', capacity: '189', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '243', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '292', type: 'wide-body' },
    { model: 'Boeing 777-200ER', manufacturer: 'Boeing', capacity: '318', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '425', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '294', type: 'wide-body' },
    { model: 'Boeing 787-10', manufacturer: 'Boeing', capacity: '344', type: 'wide-body' }
  ],

  // Aerolíneas del Medio Oriente
  'Emirates': [
    { model: 'Airbus A380-800', manufacturer: 'Airbus', capacity: '489-615', type: 'wide-body' },
    { model: 'Boeing 777-200LR', manufacturer: 'Boeing', capacity: '266', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '354-427', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '304', type: 'wide-body' }
  ],

  'Qatar Airways': [
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '144', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '182', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '260', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '295', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '283', type: 'wide-body' },
    { model: 'Airbus A350-1000', manufacturer: 'Airbus', capacity: '327', type: 'wide-body' },
    { model: 'Airbus A380-800', manufacturer: 'Airbus', capacity: '517', type: 'wide-body' },
    { model: 'Boeing 777-200LR', manufacturer: 'Boeing', capacity: '259', type: 'wide-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '358', type: 'wide-body' },
    { model: 'Boeing 787-8', manufacturer: 'Boeing', capacity: '254', type: 'wide-body' }
  ],

  'Turkish Airlines': [
    { model: 'Airbus A319', manufacturer: 'Airbus', capacity: '135', type: 'narrow-body' },
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '162', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '188', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '267', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '289', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '316', type: 'wide-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '151', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '162', type: 'narrow-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '349', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '270', type: 'wide-body' }
  ],

  'Plus Ultra': [
    { model: 'Airbus A320', manufacturer: 'Airbus', capacity: '162', type: 'narrow-body' },
    { model: 'Airbus A321', manufacturer: 'Airbus', capacity: '188', type: 'narrow-body' },
    { model: 'Airbus A330-200', manufacturer: 'Airbus', capacity: '267', type: 'wide-body' },
    { model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: '289', type: 'wide-body' },
    { model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: '316', type: 'wide-body' },
    { model: 'Boeing 737-800', manufacturer: 'Boeing', capacity: '151', type: 'narrow-body' },
    { model: 'Boeing 737 MAX 8', manufacturer: 'Boeing', capacity: '162', type: 'narrow-body' },
    { model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: '349', type: 'wide-body' },
    { model: 'Boeing 787-9', manufacturer: 'Boeing', capacity: '270', type: 'wide-body' }
  ]
};

// Función para obtener todos los modelos de avión únicos
export const getAllAircraftModels = (): string[] => {
  const allModels = new Set<string>();
  
  Object.values(AIRCRAFT_BY_AIRLINE).forEach(aircraftList => {
    aircraftList.forEach(aircraft => {
      allModels.add(aircraft.model);
    });
  });
  
  return Array.from(allModels).sort();
};

// Función para obtener modelos de avión por aerolínea
export const getAircraftByAirline = (airline: string): string[] => {
  const aircraftList = AIRCRAFT_BY_AIRLINE[airline];
  if (!aircraftList) return [];
  
  return aircraftList.map(aircraft => aircraft.model).sort();
};

// Función para buscar modelos de avión por texto
export const searchAircraftModels = (query: string, airline?: string): string[] => {
  let modelsToSearch: string[] = [];
  
  if (airline && AIRCRAFT_BY_AIRLINE[airline]) {
    modelsToSearch = getAircraftByAirline(airline);
  } else {
    modelsToSearch = getAllAircraftModels();
  }
  
  return modelsToSearch.filter(model =>
    model.toLowerCase().includes(query.toLowerCase())
  );
};

// Función para obtener información detallada de un avión
export const getAircraftDetails = (model: string): AircraftModel | null => {
  for (const aircraftList of Object.values(AIRCRAFT_BY_AIRLINE)) {
    const aircraft = aircraftList.find(a => a.model === model);
    if (aircraft) return aircraft;
  }
  return null;
};
