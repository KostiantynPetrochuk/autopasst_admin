export type Model = {
  id: number;
  modelName: string;
  brandId: number;
};

export type Brand = {
  id: string;
  brandName: string;
  fileName: string;
  models: Model[];
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
};

export type Order = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  carID: number;
  createdAt: string;
  car: Car;
};
