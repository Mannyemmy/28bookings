import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import {useGetSettingsQuery} from "../../../services/AdminApi"
import {
  addDays,
  format,
  formatDistance,
  formatRelative,
  differenceInDays,
  eachDayOfInterval,
} from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { useGetRentalDatesQuery } from "../../../services/messagesApi";
import {useSelector} from "react-redux";

const Dates = ({ id, item, childToParent }) => {
  const { data, isLoading, isSuccess } = useGetRentalDatesQuery(item.id);

  const [dateRange, setdateRange] = useState({
    startDate: addDays(new Date(), 1),
    endDate: new Date(),
  });

  const {data : settings, isLoading : isSettings} = useGetSettingsQuery({
    refetchOnMountOrArgChange: true, refetchOnFocus : true});

  // const {commision} = useSelector( state => state.auth.settings)

  function getDatesInRange(startDate, endDate) {
    return eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
  }

  const [alert, setAlert] = useState(null);

  const hideAlert = () => {
    setAlert(null);
  };

  const [amount, setAmount] = useState(0);

  const { startDate, endDate } = dateRange;

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const confirmBooking = () => {
    childToParent({
      amount,
      startDate: addDays(startDate, 1).toISOString(),
      endDate: addDays(endDate, 1).toISOString(),
      duration: differenceInDays(endDate, startDate) + 1,
    });
    hideAlert();
    document.getElementById("closeButton").click();
  };
  const proceedBooking = () => {
    setAlert(
      <SweetAlert
        info
        showCancel
        title="Confirm Reservation"
        cancelBtnBsStyle="warning"
        confirmBtnBsStyle="success"
        confirmBtnText="Reserve Item"
        onConfirm={confirmBooking}
        onCancel={hideAlert}
        style={{ width: "16em", fontSize: "1em" }}
      >
        ₦{amount} for {differenceInDays(endDate, startDate) + 1} day(s)
      </SweetAlert>
    );
  };
  const calculateAmount = () => {


    var prices = [];
    var days = differenceInDays(endDate, startDate) + 1;

    if(days < item.min_rental_days){
      return window.alert(`at least ${item.min_rental_days} days required for renting this item`)
    }

    prices.push(days * item.daily_price);

    if (days >= 7 && days) {
      var weeks = (days / 7) >> 0;
      var extraWeekDays = days % 7;
      var weekly_price =
        weeks * item.weekly_price + extraWeekDays * item.daily_price;
      prices.push(weekly_price);
    }
    if (days >= 30) {
      var months = (days / 30) >> 0;
      var extraMonthDays = 0;
      var extraMonthWeeks = 0;
      var extraDays = days % 30;
      if (extraDays >= 7) {
        extraMonthWeeks = (extraDays / 7) >> 0;
        extraMonthDays = extraDays % 7;
      } else {
        extraMonthDays = extraDays;
      }
      var monthly_price =
        months * item.monthly_price +
        extraMonthWeeks * item.weekly_price +
        extraMonthDays * item.daily_price;
      prices.push(monthly_price);
    }

    setAmount(Math.min(...prices) + (settings.commision / 100) * Math.min(...prices));

  };

  const handleSelect = async (ranges) => {
    setAmount(0);
    setdateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  return (
    <>
      {isLoading && isSettings? (
        <h1>Loading...</h1>
      ) : (
        data && settings && (
          <div className="modal fade date-modal" id={id}>
           
            <div className="modal-dialog modal-lg  ">
              <div className="modal-content">
                <div className="modal-header py-3 py-md-2">
                  <h4 className="modal-title bi bi-calendar2-check">
                    {" "}
                    &nbsp; Select rental dates{" "}
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    id="closeButton"
                  ></button>
                </div>
                <div className="!tw-p-0 tw-text-xl tw-my-0 tw-flex tw-justify-center tw-items-center tw-space-x-2">
                  <p>Minimum Rental Days: {item.min_rental_days}</p>
                  <p>Rental Commision: {settings.commision}%</p>
                </div>
                <div className="!tw-pt-0 modal-body ">
                  <div className="d-flex align-items-center justify-content-center mx-auto">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleSelect}
                      months={1}
                      minDate={addDays(new Date(), 1)}
                      rangeColors={["green"]}
                      staticRanges={[]}
                      inputRanges={[]}
                      disabledDates={data.length > 0 ? getDatesInRange(
                        data[0].from_date,
                        data[0].to_date
                      ) : []}
                    />
                  </div>
                </div>

                <div>
                  {amount > 0 ? (
                    <div className="rental-fee">
                      <h4>{`Rental fee : ₦${amount} for ${
                        differenceInDays(endDate, startDate) + 1
                      }  day(s)`}</h4>
                    </div>
                  ) : null}
                </div>

                <div className="modal-footer py-3 py-md-1">
                  <button
                    className="btn btn-info py-1"
                    onClick={() => calculateAmount()}
                    // onClick={() => setCalenderDate(new Date())}
                  >
                    Calculate Amount
                  </button>

                  <button
                    disabled={amount === 0}
                    className="btn btn-success py-1"
                    // onClick={() => childToParent({ dateRange, amount })}
                    onClick={proceedBooking}
                  >
                    Proceed to Booking
                  </button>
                  {alert}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Dates;
