import { useContext } from 'react';
import { format } from 'fecha';

// Import contexts
import {
  AutoCompleteContext,
  FetchDisruptionsContext,
  ModeContext,
  WhenContext
} from 'globalState';

const useFilterLogic = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of disruptionsApi from fetchDisruptionsState
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext); // Get the state of whenButtons from WhenContext
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext

  let filteredData = fetchDisruptionsState.data;

  // When filtering
  if (whenState.when) {
    const today = format(new Date(), 'YYYY-MM-DD'); // Set today
    let tomorrow = new Date(today);
    tomorrow = format(tomorrow.setDate(tomorrow.getDate() + 1), 'YYYY-MM-DD'); // set tomorrow

    let fromDate;
    let toDate;
    // Switch on when
    switch (whenState.when) {
      case 'now':
        fromDate = today;
        toDate = today;
        break;

      case 'tomorrow':
        fromDate = tomorrow;
        toDate = tomorrow;
        break;

      case 'customDate':
        fromDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
        toDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
        break;

      default:
        fromDate = today;
        toDate = today;
    }

    // Filter results on date range
    filteredData = filteredData.filter(disrItem => {
      let returnitem;
      if (disrItem.mode === 'bus') {
        // 2020-02-05T15:30:00Z
        const disrStartDate = format(new Date(disrItem.disruptionTimeWindow.start), 'YYYY-MM-DD');
        const disrEndDate = format(new Date(disrItem.disruptionTimeWindow.end), 'YYYY-MM-DD');

        if (
          (disrStartDate >= fromDate && disrStartDate <= toDate) ||
          (disrEndDate >= fromDate && disrStartDate <= toDate)
        ) {
          returnitem = disrItem;
        }
      }
      return returnitem;
    });
    // End when filtering

    // Mode filtering
    if (modeState.mode) {
      filteredData = filteredData.filter(disrItem => disrItem.mode === modeState.mode);
    }

    // ID filtering
    if (autoCompleteState.selectedService.id) {
      // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
      filteredData = filteredData.filter(
        disrItem =>
          disrItem.mode === 'bus' &&
          disrItem.servicesAffected.some(el => el.id === autoCompleteState.selectedService.id)
      );
    }
  }

  return filteredData;
};

export default useFilterLogic;
