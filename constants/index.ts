export const BODY_TYPES = {
  suv: { label: "suv" },
  sedan: { label: "sedan" },
  hatchback: { label: "hatchback" },
  coupe: { lavel: "coupe" },
  convertible: { label: "convertible" },
  van: { label: "van" },
  truck: { label: "truck" },
};

export const FUEL_TYPES = {
  petrol: { label: "бензин" },
  diesel: { label: "дизель" },
  electricity: { label: "електрика" },
};

export const TRANSMISSION = {
  manual: { label: "ручна" },
  automatic: { label: "автоматична" },
};

export const DRIVE_TYPE = {
  frontWheel: { label: "передній" },
  rearWheel: { label: "задній" },
  allWheel: { label: "повний" },
};

export const CONDITION = {
  intact: { label: { en: "intact", ua: "цілий" } },
  damaged: { label: { en: "damaged", ua: "пошкоджений" } },
  insurance: { label: { en: "insurance", ua: "страховий" } },
  rebuilt: { label: { en: "rebuilt", ua: "відновлений" } },
  new: { label: { en: "new", ua: "новий" } },
  used: { label: { en: "used", ua: "вживаний" } },
};

export const LABELS = {
  BodyType: {
    suv: { ua: "позашляховик", en: "suv", de: "suv" },
    sedan: { ua: "седан", en: "sedan" },
    hatchback: { ua: "хетчбек", en: "hatchback" },
    coupe: { ua: "купе", en: "coupe" },
    convertible: { ua: "кабріолет", en: "convertible" },
    van: { ua: "фургон", en: "van" },
    truck: { ua: "вантажівка", en: "truck" },
  },
  Transmission: {
    manual: { ua: "ручна", en: "manual" },
    automatic: { ua: "автоматична", en: "automatic" },
  },
  FuelType: {
    petrol: { en: "petrol", ua: "бензин" },
    diesel: { en: "diesel", ua: "дизель" },
    electricity: { en: "electricity", ua: "електрика" },
  },
  DriveType: {
    frontWheel: { en: "front-wheel", ua: "передній" },
    rearWheel: { en: "rear-wheel", ua: "задній" },
    allWheel: { en: "all-wheel", ua: "повний" },
  },
  Condition: {
    intact: { en: "intact", ua: "цілий" },
    damaged: { en: "damaged", ua: "пошкоджений" },
    insurance: { en: "insurance", ua: "страховий" },
    rebuilt: { en: "rebuilt", ua: "відновлений" },
    new: { en: "new", ua: "новий" },
    used: { en: "used", ua: "вживаний" },
  },
  Color: {
    white: { en: "white", de: "weiß", ua: "білий" },
    black: { en: "black", de: "schwarz", ua: "чорний" },
    gray: { en: "gray", de: "grau", ua: "сірий" },
    silver: { en: "silver", de: "silber", ua: "сріблястий" },
    red: { en: "red", de: "rot", ua: "червоний" },
    blue: { en: "blue", de: "blau", ua: "синій" },
    brown: { en: "brown", de: "braun", ua: "коричневий" },
    green: { en: "green", de: "grün", ua: "зелений" },
    yellow: { en: "yellow", de: "gelb", ua: "жовтий" },
    orange: { en: "orange", de: "orange", ua: "помаранчевий" },
    gold: { en: "gold", de: "gold", ua: "золотий" },
    beige: { en: "beige", de: "beige", ua: "бежевий" },
  },
};
