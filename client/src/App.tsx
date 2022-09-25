import React, { useEffect } from "react";
import "./App.css";
import Loading from "./store/components/Loading";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import moment from "moment";
import axios from "axios";
import queryString from "query-string";
import { setAppIsLoading } from "./store/actions/app-settings-actions";
import { useDispatch } from "react-redux";
import AsteroidPng from "./asteroid.png";
import { AxiosResponse } from "./types/api-response.type";
import { AsteroidData, AsteroidResponseData } from "./types/asteroid.type";
import { parsedNumberString } from "./helpers/utils";

function App() {
  const dispatch = useDispatch();

  const [displayedData, setDisplayedData] = React.useState<AsteroidData[]>([]);

  const [closestAsteroid, setClosestAsteroid] = React.useState<
    AsteroidData | undefined
  >(undefined);
  const [furthesteAsteroid, setFurthestAsteroid] = React.useState<
    AsteroidData | undefined
  >(undefined);

  const [startDate, setStartDate] = React.useState<moment.Moment | null>(
    moment(new Date())
  );
  const [endDate, setEndDate] = React.useState<moment.Moment | null>(
    moment(new Date())
  );

  const handleStartDateChange = (newValue: moment.Moment | null) => {
    setStartDate(newValue);
    if (moment(newValue).isAfter(moment(endDate))) {
      setEndDate(newValue);
    }
  };

  const handleEndDateChange = (newValue: moment.Moment | null) => {
    setEndDate(newValue);
  };

  const fetchData = () => {
    if (startDate && endDate) {
      const queryStringObj = {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      };
      dispatch(setAppIsLoading(true));
      axios
        .get(
          `http://localhost:8888/asteroids?${queryString.stringify(
            queryStringObj
          )}`
        )
        .then((response: AxiosResponse) => {
          if (response.data.message) {
            window.alert(
              `There might be some problems getting full data: ${response.data.message}`
            );
          }

          if (response.data.data && response.data.data !== null) {
            const data = response.data.data as AsteroidResponseData;

            setDisplayedData(
              Object.keys(data.near_earth_objects)
                .map((key) => data.near_earth_objects[key])
                .reduce((a, b) => a.concat(b))
                .sort(
                  (a: AsteroidData, b: AsteroidData) =>
                    Number(a.close_approach_data[0].miss_distance.kilometers) -
                    Number(b.close_approach_data[0].miss_distance.kilometers)
                )
            );
          }
        })
        .catch((err) => {
          window.alert(`Err! ${err.toString()}`);
        })
        .finally(() => {
          dispatch(setAppIsLoading(false));
        });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setAppIsLoading(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (displayedData && displayedData.length > 0) {
      console.info(displayedData);
      setClosestAsteroid(displayedData[0]);
      setFurthestAsteroid(displayedData[displayedData.length - 1]);
    }
  }, [displayedData]);

  return (
    <div className="App">
      <div>
        <h1>COMING ASTEROIDS!</h1>
      </div>

      <div style={{ height: "2rem" }} />

      <div
        style={{
          width: "100%",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {closestAsteroid ? (
          <>
            <h2>CLOSEST</h2>
            <img
              alt="asteroid.png"
              src={AsteroidPng}
              width="200px"
              height="200px"
            />
            <p>
              (
              {parsedNumberString(
                closestAsteroid.estimated_diameter.meters.estimated_diameter_min
              )}
              -
              {parsedNumberString(
                closestAsteroid.estimated_diameter.meters.estimated_diameter_max
              )}
              ) m
            </p>
            <h2>
              ID: {closestAsteroid.id} - {closestAsteroid.name}
            </h2>

            <h4>
              Distance:{" "}
              {parsedNumberString(
                closestAsteroid.close_approach_data[0].miss_distance.kilometers
              )}{" "}
              km
            </h4>
            <h4>
              {closestAsteroid.close_approach_data[0].close_approach_date_full}
            </h4>

            <div style={{ height: "2rem" }} />

            {furthesteAsteroid && (
              <>
                <h3>Furthest</h3>
                <p>
                  ID: {furthesteAsteroid.id} - {furthesteAsteroid.name}
                </p>
                <p>
                  Distance:{" "}
                  {parsedNumberString(
                    furthesteAsteroid.close_approach_data[0].miss_distance
                      .kilometers
                  )}{" "}
                  km
                </p>
                <p>
                  {
                    furthesteAsteroid.close_approach_data[0]
                      .close_approach_date_full
                  }
                </p>
              </>
            )}
          </>
        ) : (
          <p>Find the nearest asteroid to Earth</p>
        )}
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label="Start Date"
            inputFormat="MM/DD/YYYY"
            value={startDate}
            closeOnSelect
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <p>to</p>
          <MobileDatePicker
            label="End Date"
            inputFormat="MM/DD/YYYY"
            value={endDate}
            closeOnSelect
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div style={{ height: "2rem" }} />

      <Button
        variant="contained"
        disabled={moment(startDate).isAfter(moment(endDate))}
        onClick={fetchData}
      >
        Find
      </Button>

      <Loading />
    </div>
  );
}

export default App;
