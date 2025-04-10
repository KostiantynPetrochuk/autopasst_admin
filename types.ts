export type Model = {
  id: number;
  modelName: string;
  brandId: number;
};

export type Brand = {
  id: string;
  brandName: string;
  fileName: string;
  models?: Model[];
};

export type Car = {
  id: number;
  vin: string;
  brandId: number;
  modelId: number;
  info: string;
  condition: string;
  bodyType: string;
  firstRegistration: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  maintenance: string;
  ecoClass: string;
  keys: string;
  price: number;
  imageNames: string[];
  modelName: string;
  brandName: string;
  specFilename: string;
  status: string;
  createdAt: string;
  brand?: Brand;
  model?: Model;
};

export type Order = {
  id: number;
  name: string;
  phone: string;
  infoMethod: string;
  contact: string;
  countryOfExploitation: string;
  carID: number;
  status: string;
  createdAt: string;
  cancellationReason?: string;
  car: Car;
};
