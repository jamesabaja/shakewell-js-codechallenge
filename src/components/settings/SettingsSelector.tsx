import React, { useMemo, useRef } from "react";
import Modal from "react-modal";
import CountrySelect from "../country/CountrySelect";
import LanguageSelect from "../language/LanguageSelect";
import CurrencySelect from "../currency/CurrencySelect";
import { CountryData, SettingsData } from "../interfaces";
import { DEFAULT_STATE } from "../constants";

/* --- [TASK] ---
✅ Changes on modal are only applied on SAVE

CURRENT SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- Changes to any of the select inputs are immediately effective.
- The modal is dismissed using the **[Close]** button

DESIRED SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- There is a **[Save]** and a **[Cancel]** button, both serving to dismiss the modal.
- Changes are taking effect only on **[Save]**

FURTHER DETAILS
- Positioning of the buttons within the modal is not in the scope of this task
--- [TASK] --- */

/* --- [TASK] ---
✅ Reduced number of unnecessary re-renders

CURRENT SCENARIO
- The `SettingsSelector`-Button re-renders too often
- It re-renders every time the modal is opened, closed, or on changing the select inputs

DESIRED SCENARIO
- The `SettingsSelector`-Button only re-renders when relevant data changes (Country, Language, Currency)

FURTHER DETAILS
- The `SettingsSelector`-Button has a render counter that will log to the console (do not remove)
- Be aware that #1 changes some relevant behaviour for this task
--- [TASK] --- */

/* --- [TASK] ---
✅ Improved layout and styling of modal dialog (CSS)

CURRENT SCENARIO
- The modal dialog lacks intentional layout (spacings, dimensions).
- On smaller devices, the available space is not utilized effectively.

DESIRED SCENARIO
- Ensure consistent spacing, padding, and dimensions.
- Implement responsive or adaptive behavior for the modal, especially on smaller devices.

FURTHER DETAILS
- Focus on injecting and structuring CSS, using selectors and properties effectively.
- Feel free to apply your preferred spacing and dimensions; the provided designs mereley serve as examples. Just make sure it is consistent.
- Bonus points awarded for aesthetically appealing re-design of elements.
--- [TASK] --- */

/* --- [TASK] ---
✅ Improved use of TypeScript

CURRENT SCENARIO
- In `SettingsSelector`, there are individual `useState()` calls for `Country`, `Language`, and `Currency`.
- Throughout the entire project, there are several instances of type `any`.
    Example: 
    ```typescript
    ... = React.useState<any>(DEFAULT_COUNTRY);
    ```
- Default values are constants that are exported by each component. 
    Example:
    ```typescript
    .... { DEFAULT_COUNTRY } from "../country/CountrySelect";
    ```

DESIRED SCENARIO
- Consolidate `Country`, `Language`, and `Currency` into a single "state".
- Extract default values from the components and make them configurable from a central point.
- Eliminate any remaining instances of type `any`.

OPTIONAL BONUS
- Replace `any` in the `*.stories.tsx`  files with appropriate types.
--- [TASK] --- */

/* --- [TASK] ---
✅ ReactDOM.render is no longer supported

CURRENT SCENARIO
- There is an error logging in the console
    `Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot`

DESIRED SCENARIO
- The error log does not appear
- The cause of the the warning is fixed

FURTHER DETAILS
- Downgrading to React 17 is not an option 😉
--- [TASK] --- */

// Component
const SettingsSelector = (): JSX.Element => {
  // States
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [selectedData, setSelectedData] =
    React.useState<SettingsData>(DEFAULT_STATE);
  const [currentData, setCurrentData] =
    React.useState<SettingsData>(DEFAULT_STATE);
  const {
    country: selectedCountry,
    language: selectedLanguage,
    currency: selectedCurrency,
  } = selectedData;

  const setCountry = (country: CountryData) => {
    setSelectedData((previousData) => ({ ...previousData, country }));
  };
  const setCurrency = (currency: string) => {
    setSelectedData((previousData) => ({ ...previousData, currency }));
  };
  const setLanguage = (language: string) => {
    setSelectedData((previousData) => ({ ...previousData, language }));
  };

  // Render Counter
  const counter = useRef(0);

  // Actions
  const handleOpen = () => {
    setSelectedData(currentData);
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  const handleSave = () => {
    setCurrentData(selectedData);
    handleClose();
  };

  const button = useMemo(() => {
    // Increase render count.
    counter.current++;

    // Log current render count.
    console.log("Render count of button is: " + counter.current);

    /* Button */
    return (
      <button onClick={handleOpen} className="button">
        <img
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${currentData.country.code}.svg`}
          alt={`${currentData.country.name} flag`}
          height={12}
        />{" "}
        {currentData.country.name} - ({currentData.currency} -{" "}
        {currentData.language})
      </button>
    );
  }, [currentData]);

  // Render
  return (
    <div>
      {button}

      {/* Modal */}
      <Modal isOpen={modalIsOpen}>
        <div className="modal">
          <div className="content">
            <div>
              {/* Header */}
              <h2>Select your region, currency and language.</h2>
              <hr className="hr" />
            </div>

            {/* Country */}
            <CountrySelect value={selectedCountry} onChange={setCountry} />

            {/* Currency */}
            <CurrencySelect value={selectedCurrency} onChange={setCurrency} />

            {/* Language */}
            <LanguageSelect
              language={selectedLanguage}
              onChange={setLanguage}
            />
          </div>

          <div className="footer">
            {/* Close button */}
            <button className="button" onClick={handleClose}>
              Close
            </button>
            <button className="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsSelector;
