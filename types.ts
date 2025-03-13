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
  bodyType: string;
  brandId: number;
  color: string;
  condition: string;
  price: number;
  doorCount: number;
  driveType: string;
  engineSize: string;
  fuelType: string;
  imageNames: string[];
  mileage: number;
  transmission: string;
  vin: string;
  year: number;
  modelName: string;
  brandName: string;
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
