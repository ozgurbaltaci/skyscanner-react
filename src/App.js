{
  /**
   *@author: Ozgur Baltaci
   *@since: 29.07.23
   */
}
import React, { useState, useEffect } from "react";
import BpkButton from "@skyscanner/backpack-web/bpk-component-button";
import BpkText from "@skyscanner/backpack-web/bpk-component-text";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from "@skyscanner/backpack-web/bpk-component-calendar";

import STYLES from "./App.scss";

import BpkInput, {
  INPUT_TYPES,
} from "@skyscanner/backpack-web/bpk-component-input";
import format from "date-fns/format";
import BpkSelectableChip from "@skyscanner/backpack-web/bpk-component-chip";
import BpkCard from "@skyscanner/backpack-web/bpk-component-card";

const getClassName = cssModules(STYLES);

const formatDateFull = (date) => format(date, "EEEE, do MMMM yyyy");
const formatMonth = (date) => format(date, "MMMM yyyy");
const daysOfWeek = [
  {
    name: "Sunday",
    nameAbbr: "Sun",
    index: 0,
    isWeekend: true,
  },
  {
    name: "Monday",
    nameAbbr: "Mon",
    index: 1,
    isWeekend: false,
  },
  {
    name: "Tuesday",
    nameAbbr: "Tues",
    index: 2,
    isWeekend: false,
  },
  {
    name: "Wednesday",
    nameAbbr: "Wed",
    index: 3,
    isWeekend: false,
  },
  {
    name: "Thursday",
    nameAbbr: "Thurs",
    index: 4,
    isWeekend: false,
  },
  {
    name: "Friday",
    nameAbbr: "Fri",
    index: 5,
    isWeekend: false,
  },
  {
    name: "Saturday",
    nameAbbr: "Sat",
    index: 6,
    isWeekend: true,
  },
];

const App = () => {
  const [selectionConfiguration, setSelectionConfiguration] = useState({
    type: CALENDAR_SELECTION_TYPE.single,
    date: null,
    startDate: null,
    endDate: null,
  });
  const [isRangeSelectionAllowed, setRangeSelectionAllowed] = useState(false);

  useEffect(() => {
    setSelectionConfiguration({
      type: isRangeSelectionAllowed
        ? CALENDAR_SELECTION_TYPE.range
        : CALENDAR_SELECTION_TYPE.single,
      date: null,
      startDate: null,
      endDate: null,
    });
  }, [isRangeSelectionAllowed]);

  const handleDateSelect = (date) => {
    const { startDate, endDate } = selectionConfiguration;

    if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single) {
      setSelectionConfiguration({
        ...selectionConfiguration,
        date,
      });
    } else if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range) {
      if (startDate && endDate) {
        setSelectionConfiguration({
          ...selectionConfiguration,
          startDate: date,
          endDate: null,
        });
      } else if (startDate && !endDate && date > startDate) {
        setSelectionConfiguration({
          ...selectionConfiguration,
          endDate: date,
        });
      } else {
        setSelectionConfiguration({
          ...selectionConfiguration,
          startDate: date,
          endDate: null,
        });
      }
    }
  };
  return (
    <div className={getClassName("App")}>
      <header className={getClassName("App__header")}>
        <div className={getClassName("App__header-inner")}>
          <BpkText
            tagName="h1"
            textStyle="xxl"
            className={getClassName("App__heading")}
          >
            Flight Schedule
          </BpkText>
        </div>
      </header>

      <main className={getClassName("App__main")}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "block" }}>
            <div>
              <div style={{ marginBottom: "5px", textAlign: "start" }}>
                <BpkText>Selected Date</BpkText>

                <BpkInput
                  id="dateInput"
                  type={INPUT_TYPES.text}
                  name="date"
                  value={
                    selectionConfiguration.type ===
                    CALENDAR_SELECTION_TYPE.single
                      ? selectionConfiguration.date &&
                        formatDateFull(selectionConfiguration.date)
                      : selectionConfiguration.startDate &&
                        selectionConfiguration.endDate &&
                        `${formatDateFull(
                          selectionConfiguration.startDate
                        )} - ${formatDateFull(selectionConfiguration.endDate)}`
                  }
                  placeholder="Departure date"
                />
              </div>

              <BpkCard>
                <div style={{ textAlign: "start", margin: "8px 0px" }}>
                  <BpkSelectableChip
                    accessibilityLabel="Press to toggle chip"
                    selected={isRangeSelectionAllowed}
                    onClick={() => {
                      setRangeSelectionAllowed(!isRangeSelectionAllowed);
                    }}
                  >
                    I want to select a range
                  </BpkSelectableChip>
                </div>
                <BpkCalendar
                  id="calendar"
                  formatMonth={formatMonth}
                  formatDateFull={formatDateFull}
                  daysOfWeek={daysOfWeek}
                  weekStartsOn={1}
                  changeMonthLabel="Change month"
                  nextMonthLabel="Next month"
                  previousMonthLabel="Previous month"
                  selectionConfiguration={selectionConfiguration}
                  onMonthChange={null}
                  onDateClick={handleDateSelect}
                />
              </BpkCard>
            </div>

            <BpkButton
              style={{ marginTop: "20px" }}
              onClick={() => alert("It works!")}
            >
              Continue
            </BpkButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
