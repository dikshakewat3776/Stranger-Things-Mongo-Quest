// Locations in the Stranger Things universe
export const locations = [
  {
    _id: 'loc_001',
    name: 'Wheeler House',
    type: 'residence',
    dimension: 'normal',
    address: '2864 Cornwallis Road, Hawkins, Indiana',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1581, 39.7684]
    },
    danger_level: 2,
    description: 'The Wheeler family home, frequent meeting place for the party.',
    features: ['basement', 'phone', 'garage'],
    portal_nearby: false,
    current_occupants: ['char_002', 'char_005'],
    events_count: 15,
    last_incident: new Date('2024-03-10'),
    accessibility: 'public'
  },
  {
    _id: 'loc_002',
    name: 'Starcourt Mall',
    type: 'commercial',
    dimension: 'normal',
    address: '4851 Highway 5, Hawkins, Indiana',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1234, 39.7456]
    },
    danger_level: 8,
    description: 'Shopping mall built over a secret Russian base.',
    features: ['scoops ahoy', 'arcade', 'secret elevator', 'russian base'],
    portal_nearby: true,
    current_occupants: [],
    events_count: 45,
    last_incident: new Date('2024-03-15'),
    accessibility: 'restricted'
  },
  {
    _id: 'loc_003',
    name: 'Hawkins High School',
    type: 'education',
    dimension: 'normal',
    address: '1500 Hawkins School Road',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1456, 39.7234]
    },
    danger_level: 4,
    description: 'Local high school where several characters attend.',
    features: ['gym', 'darkroom', 'basketball court', 'library'],
    portal_nearby: false,
    current_occupants: ['char_005', 'char_007'],
    events_count: 12,
    last_incident: new Date('2024-02-28'),
    accessibility: 'public'
  },
  {
    _id: 'loc_004',
    name: 'Byers House',
    type: 'residence',
    dimension: 'normal',
    address: '628 Maple Street, Hawkins, Indiana',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1678, 39.7890]
    },
    danger_level: 6,
    description: 'The Byers family home, site of Will\'s disappearance.',
    features: ['christmas lights alphabet', 'shed', 'phone'],
    portal_nearby: true,
    current_occupants: ['char_009'],
    events_count: 28,
    last_incident: new Date('2024-03-12'),
    accessibility: 'private'
  },
  {
    _id: 'loc_005',
    name: 'Castle Byers',
    type: 'hideout',
    dimension: 'both',
    address: 'Woods behind Byers House',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1690, 39.7895]
    },
    danger_level: 7,
    description: 'Will\'s childhood fort, exists in both dimensions.',
    features: ['hidden entrance', 'drawings', 'radio'],
    portal_nearby: true,
    current_occupants: [],
    events_count: 8,
    last_incident: new Date('2024-03-08'),
    accessibility: 'hidden'
  },
  {
    _id: 'loc_006',
    name: 'Hawkins National Laboratory',
    type: 'facility',
    dimension: 'normal',
    address: 'Classified, Hawkins, Indiana',
    coordinates: {
      type: 'Point',
      coordinates: [-86.2000, 39.8100]
    },
    danger_level: 10,
    description: 'DOE facility where experiments created the gate to Upside Down.',
    features: ['sensory deprivation tank', 'gate room', 'holding cells', 'morgue'],
    portal_nearby: true,
    current_occupants: ['char_013'],
    events_count: 67,
    last_incident: new Date('2024-03-18'),
    accessibility: 'classified'
  },
  {
    _id: 'loc_007',
    name: 'Creel House',
    type: 'residence',
    dimension: 'both',
    address: '1509 Victor Creel Road, Hawkins',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1789, 39.7567]
    },
    danger_level: 10,
    description: 'Abandoned mansion with a dark history, portal location.',
    features: ['grandfather clock', 'attic', 'portal', 'vecna connection'],
    portal_nearby: true,
    current_occupants: [],
    events_count: 34,
    last_incident: new Date('2024-03-19'),
    accessibility: 'dangerous'
  },
  {
    _id: 'loc_008',
    name: 'Russian Prison - Kamchatka',
    type: 'facility',
    dimension: 'normal',
    address: 'Kamchatka Peninsula, Russia',
    coordinates: {
      type: 'Point',
      coordinates: [159.9333, 53.0167]
    },
    danger_level: 9,
    description: 'Soviet prison where Hopper was held captive.',
    features: ['demogorgon pit', 'cells', 'guard towers'],
    portal_nearby: true,
    current_occupants: ['char_012'],
    events_count: 23,
    last_incident: new Date('2024-03-01'),
    accessibility: 'classified'
  },
  {
    _id: 'loc_009',
    name: 'Hawkins Community Pool',
    type: 'recreation',
    dimension: 'normal',
    address: '500 Pool Drive, Hawkins',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1400, 39.7600]
    },
    danger_level: 5,
    description: 'Public pool where Billy worked as a lifeguard.',
    features: ['pool', 'locker rooms', 'snack bar'],
    portal_nearby: false,
    current_occupants: [],
    events_count: 8,
    last_incident: new Date('2024-02-20'),
    accessibility: 'public'
  },
  {
    _id: 'loc_010',
    name: 'Murray\'s Bunker',
    type: 'hideout',
    dimension: 'normal',
    address: 'Unknown Location, Illinois',
    coordinates: {
      type: 'Point',
      coordinates: [-89.6501, 39.7817]
    },
    danger_level: 1,
    description: 'Murray Bauman\'s fortified underground bunker.',
    features: ['surveillance room', 'weapons cache', 'living quarters'],
    portal_nearby: false,
    current_occupants: ['char_015'],
    events_count: 6,
    last_incident: new Date('2024-02-15'),
    accessibility: 'secret'
  },
  {
    _id: 'loc_011',
    name: 'The Upside Down - Hawkins Mirror',
    type: 'dimension',
    dimension: 'upside_down',
    address: 'Parallel to Hawkins',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1581, 39.7684]
    },
    danger_level: 10,
    description: 'Dark mirror dimension of Hawkins, home to creatures.',
    features: ['vines', 'particles', 'decay', 'creatures'],
    portal_nearby: true,
    current_occupants: [],
    events_count: 156,
    last_incident: new Date('2024-03-20'),
    accessibility: 'interdimensional'
  },
  {
    _id: 'loc_012',
    name: 'Skull Rock',
    type: 'landmark',
    dimension: 'both',
    address: 'Hawkins Woods',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1850, 39.7750]
    },
    danger_level: 6,
    description: 'Rock formation in the woods, meeting point and portal site.',
    features: ['rock formation', 'clearing', 'campsite'],
    portal_nearby: true,
    current_occupants: [],
    events_count: 12,
    last_incident: new Date('2024-03-16'),
    accessibility: 'public'
  },
  {
    _id: 'loc_013',
    name: 'Lovers Lake',
    type: 'landmark',
    dimension: 'both',
    address: 'Outside Hawkins',
    coordinates: {
      type: 'Point',
      coordinates: [-86.2100, 39.7900]
    },
    danger_level: 8,
    description: 'Lake with an underwater gate to the Upside Down.',
    features: ['lake', 'underwater portal', 'boat dock'],
    portal_nearby: true,
    current_occupants: [],
    events_count: 15,
    last_incident: new Date('2024-03-17'),
    accessibility: 'public'
  },
  {
    _id: 'loc_014',
    name: 'Hawkins Police Station',
    type: 'government',
    dimension: 'normal',
    address: '200 Main Street, Hawkins',
    coordinates: {
      type: 'Point',
      coordinates: [-86.1500, 39.7700]
    },
    danger_level: 3,
    description: 'Local police department headquarters.',
    features: ['cells', 'radio room', 'evidence locker', 'hopper office'],
    portal_nearby: false,
    current_occupants: [],
    events_count: 22,
    last_incident: new Date('2024-03-05'),
    accessibility: 'public'
  },
  {
    _id: 'loc_015',
    name: 'The Void',
    type: 'dimension',
    dimension: 'psychic',
    address: 'Mental/Psychic Plane',
    coordinates: null,
    danger_level: 7,
    description: 'Dark sensory space Eleven accesses through her powers.',
    features: ['water floor', 'darkness', 'echoes', 'visions'],
    portal_nearby: false,
    current_occupants: [],
    events_count: 45,
    last_incident: new Date('2024-03-19'),
    accessibility: 'psychic'
  }
];

export default locations;
