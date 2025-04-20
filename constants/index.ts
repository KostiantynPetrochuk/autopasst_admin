export const BODY_TYPES = {
  suv: { label: "SUV" },
  sedan: { label: "седан" },
  hatchback: { label: "хетчбек" },
  coupe: { label: "купе" },
  convertible: { label: "кабріолет" },
  van: { label: "фургон" },
  truck: { label: "вантажівка" },
  trailer: { label: "причіп" },
  special: { label: "спецтехніка" },
  moto: { label: "мото" },
  other: { label: "інше" },
};

export const FUEL_TYPES = {
  petrol: { label: "бензин" },
  diesel: { label: "дизель" },
  electricity: { label: "електрика" },
  hybrid: { label: "гібрид" },
};

export const TRANSMISSION = {
  manual: { label: "ручна" },
  automatic: { label: "автоматична" },
};

export const KEYS = {
  "1": { label: "1" },
  "2": { label: "2" },
  "3": { label: "3" },
};

export const ECO_CLASS = {
  eu_1: { label: "Euro 1" },
  eu_2: { label: "Euro 2" },
  eu_3: { label: "Euro 3" },
  eu_4: { label: "Euro 4" },
  eu_5: { label: "Euro 5" },
  eu_6: { label: "Euro 6" },
  eu_7: { label: "Euro 7" },
};

export const CONDITION = {
  intact: { label: { en: "excellent condition", ua: "відмінний стан" } },
  damaged: { label: { en: "damaged", ua: "пошкоджений" } },
};

export const LABELS = {
  bodyType: {
    suv: { ua: "позашляховик", en: "suv", de: "suv" },
    sedan: { ua: "седан", en: "sedan" },
    hatchback: { ua: "хетчбек", en: "hatchback" },
    coupe: { ua: "купе", en: "coupe" },
    convertible: { ua: "кабріолет", en: "convertible" },
    van: { ua: "фургон", en: "van" },
    truck: { ua: "вантажівка", en: "truck" },
    trailer: { ua: "причіп", en: "trailer" },
  },
  transmission: {
    manual: { ua: "ручна", en: "manual" },
    automatic: { ua: "автоматична", en: "automatic" },
  },
  fuelType: {
    petrol: { en: "petrol", ua: "бензин" },
    diesel: { en: "diesel", ua: "дизель" },
    electricity: { en: "electricity", ua: "електрика" },
  },
  condition: {
    intact: { en: "intact", ua: "цілий" },
    damaged: { en: "damaged", ua: "пошкоджений" },
  },
};

export const ORDER_STATUSES = {
  new: "Нове замовлення",
  canceled: "Скасовано",
  confirmed: "Підтверджено",
  completed: "Виконано",
};

export const CAR_SELECTION_STATUSES = {
  new: "Нова заявка",
  processed: "Опрацьована",
};
