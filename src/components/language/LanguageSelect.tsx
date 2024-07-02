import ISO_6391_Languages from "iso-639-1";

import Select from "react-select";
import { DEFAULT_LANGUAGE } from "../constants";
import { LanguageSelectProps } from "../interfaces";

// Component
const LanguageSelect = ({
  language = DEFAULT_LANGUAGE,
  onChange,
}: LanguageSelectProps) => {
  // Prepare data
  const data = ISO_6391_Languages.getLanguages([
    "en",
    "de",
    "pl",
    "fr",
    "it",
    "es",
  ]).map(({ name, nativeName }) => {
    return {
      value: name + " - " + nativeName,
      label: name + " - " + nativeName,
    };
  });
  const defaultValue = { value: language, label: language };

  // Render
  return (
    <div>
      <label
        style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
      >
        Language
        <Select
          options={data}
          defaultValue={defaultValue}
          onChange={(newValue) => {
            onChange(newValue?.value || "");
          }}
        />
      </label>
    </div>
  );
};

export default LanguageSelect;
