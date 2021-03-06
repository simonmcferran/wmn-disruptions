import React, { useContext } from 'react';

// Import contexts
import { ModeContext } from 'globalState/ModeContext';

// Import components
import BusAutoComplete from './Bus/BusAutoComplete';

const AutoComplete = () => {
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = text => {
      return (
        <div className="wmnds-col-1">
          <h4>{text}</h4>
        </div>
      );
    };

    switch (modeState.mode) {
      case 'bus':
        return (
          <div className="wmnds-grid">
            {autoCompleteTitle('Search for a service')}
            <BusAutoComplete />
          </div>
        );

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

export default AutoComplete;
