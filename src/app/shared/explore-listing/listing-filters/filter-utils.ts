export type InitialStateType = {
  search: string;
  for_sale: string;
  pricing: string;
  price: number[] | string;
  bed_and_baths: string[] | string;
  home_type: string[] | string;
  maxHoA: string;
  listing_type: string;
  property_status: string[] | string;
  parking_spots: string;
  garages: string;
  square_feet_min: string;
  square_feet_max: string;
  lot_size_min: string;
  lot_size_max: string;
  built_year_min: string;
  built_year_max: string;
  basement: string;
  number_of_stories: string;
  senior_living: string;
  other_amenities: string;
  view: string;
  sold_in_last: string;
  keywords: string;
  tour_status: string[] | string;
};

export const initialState: InitialStateType = {
  search: '',
  for_sale: '',
  pricing: '',
  price: [0, 0],
  bed_and_baths: [],
  home_type: [],
  maxHoA: '',
  listing_type: '',
  property_status: [],
  parking_spots: '',
  garages: '',
  square_feet_min: '',
  square_feet_max: '',
  lot_size_min: '',
  lot_size_max: '',
  built_year_min: '',
  built_year_max: '',
  basement: '',
  number_of_stories: '',
  senior_living: '',
  other_amenities: '',
  view: '',
  sold_in_last: '',
  keywords: '',
  tour_status: [],
};

// Options
export const homeTypes = [
  {
    id: 1,
    name: 'Houses',
    value: 'houses',
    selected: false,
  },
  {
    id: 2,
    name: 'Townhomes',
    value: 'townhomes',
    selected: false,
  },
  {
    id: 3,
    name: 'Multi-Family',
    value: 'multi-family',
    selected: false,
  },
  {
    id: 4,
    name: 'Condor/Co-ops',
    value: 'condor-coOps',
    selected: false,
  },
  {
    id: 5,
    name: 'Lots/Lands',
    value: 'lots-lands',
    selected: false,
  },
  {
    id: 6,
    name: 'Apartments',
    value: 'apartments',
    selected: false,
  },
  {
    id: 7,
    name: 'Manufactured',
    value: 'manufactured',
    selected: false,
  },
];

export const forsaleData = [
  {
    id: 1,
    label: 'For Sale',
    value: 'for-sale',
  },
  {
    id: 2,
    label: 'For Rent',
    value: 'for-rent',
  },
  {
    id: 3,
    label: 'Sold',
    value: 'sold',
  },
];

export const maxHOAOptions = [
  { label: 'Any', value: 'any' },
  { label: 'No HOA Fee', value: '0' },
  { label: '$50/Month', value: '50' },
  { label: '$100/Month', value: '100' },
  { label: '$200/Month', value: '200' },
  { label: '$500/Month', value: '500' },
];

export const propertyStatusOptions = [
  {
    name: 'Coming Soon',
    value: 'coming_soon',
  },
  {
    name: 'Accepting Backup Offer',
    value: 'accepting_backup_offer',
  },
  {
    name: 'Pending & Under Contract',
    value: 'pending_under_contract',
  },
];

export const amenitiesOptions = [
  {
    name: 'Must Have AC',
    value: 'must-have-ac',
  },
  {
    name: 'Must Have Pool',
    value: 'must-have-pool',
  },
  {
    name: 'Warfront',
    value: 'warfront',
  },
];

export const viewOptions = [
  {
    name: 'City',
    value: 'city',
  },
  {
    name: 'Mountain',
    value: 'mountain',
  },
  {
    name: 'Park',
    value: 'park',
  },
  {
    name: 'Water',
    value: 'water',
  },
];

export const tourOptions = [
  {
    name: 'Must Have Open House',
    value: 'have_open_house',
  },
  {
    name: 'Must Have 3D Tour',
    value: 'have_3d_tour',
  },
];

export const parkingSpotsData = [
  { label: 'Any', value: 'any' },
  { label: '1+', value: '1+' },
  { label: '2+', value: '2+' },
  { label: '3+', value: '3+' },
  { label: '4+', value: '4+' },
  { label: '5+', value: '5+' },
];

export const squareFeetOptions = [
  { label: '500 Sqft', value: '500' },
  { label: '750 Sqft', value: '750' },
  { label: '1000 Sqft', value: '1000' },
  { label: '1250 Sqft', value: '1250' },
  { label: '1500 Sqft', value: '1500' },
  { label: '1750 Sqft', value: '1750' },
  { label: '2000 Sqft', value: '2000' },
  { label: '2250 Sqft', value: '2250' },
];

export const lotSizeOptions = [
  { label: '500 Sqft', value: '500' },
  { label: '750 Sqft', value: '750' },
  { label: '1000 Sqft', value: '1000' },
  { label: '1250 Sqft', value: '1250' },
  { label: '1500 Sqft', value: '1500' },
  { label: '1750 Sqft', value: '1750' },
  { label: '2000 Sqft', value: '2000' },
  { label: '2250 Sqft', value: '2250' },
];

export const soldInLastOptions = [
  { label: 'Any', value: 'any' },
  { label: '1 day', value: '1_day' },
  { label: '7 days', value: '7_days' },
  { label: '14 days', value: '14_days' },
  { label: '30 days', value: '30_days' },
  { label: '90 days', value: '90_days' },
  { label: '6 months', value: '6 months' },
  { label: '1 year', value: '1 year' },
];

export const noMinimumData = [
  { label: '$0', value: 0 },
  { label: '$10000', value: 10000 },
  { label: '$20000', value: 20000 },
  { label: '$30000', value: 30000 },
  { label: '$40000', value: 40000 },
  { label: '$50000', value: 50000 },
];

export const noMaximumData = [
  { label: '$0', value: 0 },
  { label: '$100000', value: 100000 },
  { label: '$200000', value: 200000 },
  { label: '$300000', value: 300000 },
  { label: '$400000', value: 400000 },
  { label: '$500000', value: 500000 },
];
