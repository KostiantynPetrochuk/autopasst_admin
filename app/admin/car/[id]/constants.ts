import { Car } from "@/types";

type OverviewDataItem = {
  src: string;
  label: string;
  value: keyof Car;
  translate?: boolean;
};

export const overviewData: OverviewDataItem[] = [
  {
    src: "/img/overview_body.svg",
    label: "Тип кузову:",
    value: "BodyType",
    translate: true,
  },
  { src: "/img/overview_mileage.svg", label: "Пробіг:", value: "Mileage" },
  {
    src: "/img/overview_fuel.svg",
    label: "Тип пального:",
    value: "FuelType",
    translate: true,
  },
  { src: "/img/overview_year.svg", label: "Рік:", value: "Year" },
  {
    src: "/img/overview_transmission.svg",
    label: "Коробка передач:",
    value: "Transmission",
    translate: true,
  },
  {
    src: "/img/overview_drive_type.svg",
    label: "Привід:",
    value: "DriveType",
    translate: true,
  },
  {
    src: "/img/overview_condition.svg",
    label: "Стан:",
    value: "Condition",
    translate: true,
  },
  {
    src: "/img/overview_engine.svg",
    label: "Об'єм двигуна:",
    value: "EngineSize",
  },
  {
    src: "/img/overview_door.svg",
    label: "Кількість дверей:",
    value: "DoorCount",
  },
  {
    src: "/img/euro.svg",
    label: "Ціна:",
    value: "Price",
  },
  {
    src: "/img/overview_color.svg",
    label: "Колір:",
    value: "Color",
    translate: true,
  },
  { src: "/img/overview_vin.svg", label: "VIN:", value: "VIN" },
];

export type ComfortTitlesKeys =
  | "interior"
  | "exterior"
  | "safety"
  | "comfort_convenience";
