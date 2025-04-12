import { Car } from "@/types";

type OverviewDataItem = {
  label: string;
  value: keyof Car;
  translate?: boolean;
};

export const overviewData: OverviewDataItem[] = [
  { label: "VIN:", value: "vin" },
  {
    label: "Стан:",
    value: "condition",
    translate: true,
  },
  {
    label: "Тип кузову:",
    value: "bodyType",
    translate: true,
  },
  {
    label: "Перша реєстр:",
    value: "firstRegistration",
  },
  { label: "Пробіг:", value: "mileage" },
  {
    label: "Тип пального:",
    value: "fuelType",
    translate: true,
  },
  {
    label: "КПП:",
    value: "transmission",
    translate: true,
  },
  {
    label: "Техогляд до:",
    value: "maintenance",
  },
  {
    label: "Еко клас:",
    value: "ecoClass",
  },
  {
    label: "Ключі:",
    value: "keys",
  },
  {
    label: "Ціна:",
    value: "price",
  },
];
