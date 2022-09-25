import axios from "axios";
import moment from "moment";
import querystring from "node:querystring";
import { AsteroidResponseData } from "../types/asteroid.type";

export interface AsteroidControllerFindAsteroidsSuccessResponse {
  data: AsteroidResponseData;
  message?: string;
}

const findAsteroids: (
  startDate: moment.Moment,
  endDate: moment.Moment
) => Promise<AsteroidControllerFindAsteroidsSuccessResponse> = (
  startDate,
  endDate
) =>
  new Promise(async (resolve, reject) => {
    let numberOfDays = moment.duration(endDate.diff(startDate)).asDays();

    let data: AsteroidResponseData | undefined;
    let error: Error | undefined = undefined;

    const queryStringObject = {
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate ? endDate.format("YYYY-MM-DD") : undefined,
      api_key: process.env.API_KEY,
    };

    const queryCycles = numberOfDays / 8;

    let cycle = 0;
    do {
      // fetch data maximum 8 days per cycle
      // next start date
      const nextStartDate = moment(startDate).add(8 * cycle, "days");
      const nextEndDate = moment(startDate).add(8 * (cycle + 1) - 1, "days");
      queryStringObject.start_date = nextStartDate.format("YYYY-MM-DD");
      // if nextEndDate is after the endDate specified, use the endDate
      queryStringObject.end_date = nextEndDate.isAfter(endDate)
        ? endDate.format("YYYY-MM-DD")
        : nextEndDate.format("YYYY-MM-DD");
      const url = `https://api.nasa.gov/neo/rest/v1/feed?${querystring.stringify(
        queryStringObject
      )}`;
      try {
        const response = await axios.get(url);
        if (!data) {
          data = response.data;
        } else {
          data.element_count = data.element_count + response.data.element_count;
          // merge near_earth_objects data with the existing data
          data.near_earth_objects = {
            ...data.near_earth_objects,
            ...response.data.near_earth_objects,
          };
        }
      } catch (err) {
        error = err as Error;
        // stop the loop if an API call failed
        break;
      }
      cycle++;
    } while (cycle <= queryCycles);
    if (data) {
      resolve({ data, message: error?.message });
    } else {
      reject(error);
    }
  });

export default { findAsteroids };
