import { ControlProps, components } from "react-select";

export const CountrySelectControl = (props: ControlProps<any>) => {
  const currentValue = props.getValue()?.[0];
  const countryName = currentValue?.value?.name;
  const countryCode = currentValue?.value?.code;
  return (
    <components.Control {...props}>
      <div
        style={{
          marginLeft: "0.5rem",
        }}
      >
        <img
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryCode}.svg`}
          alt={`${countryName} flag`}
          height={12}
        />
      </div>
      {props.children}
    </components.Control>
  );
};
