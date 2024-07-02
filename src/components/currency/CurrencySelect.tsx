// @ts-ignore
import CurrencyData from "currency-codes/data";
import Select from "react-select";
import { DEFAULT_CURRENCY } from "../constants";
import { CurrencySelectProps } from "../interfaces";

// Component
const CurrencySelect = ({
  value = DEFAULT_CURRENCY,
  onChange,
}: CurrencySelectProps) => {
  // Prepare data
  const data = CurrencyData.map(
    ({ code, currency }: { code: string; currency: string }) => {
      return {
        value: code + " - " + currency,
        label: code + " - " + currency,
      };
    }
  );
  const defaultValue = { value: value, label: value };

  // Render
  return (
    <div>
      <label
        style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
      >
        Currency
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

export default CurrencySelect;
