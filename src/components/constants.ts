import { SettingsData } from "./interfaces";

export const DEFAULT_COUNTRY = {
  code: "US",
  name: "United States of America",
};
export const DEFAULT_LANGUAGE = "English - English";
export const DEFAULT_CURRENCY = "USD - US Dollar";

export const DEFAULT_STATE: SettingsData = {
  country: DEFAULT_COUNTRY,
  currency: DEFAULT_CURRENCY,
  language: DEFAULT_LANGUAGE,
};
