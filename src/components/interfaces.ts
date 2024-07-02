export interface CountryData {
  code: string;
  name: string;
}

export interface CountryValue {
  value: CountryData;
  label: string;
}

export interface SettingsData {
  country: CountryData;
  currency: string;
  language: string;
}

export interface CountrySelectProps {
  value?: CountryData;
  onChange?: (value: CountryData) => void;
}

export interface CurrencySelectProps {
  value?: string;
  onChange: (currency: string) => void;
}

export interface LanguageSelectProps {
  language?: string;
  onChange: (language: string) => void;
}
