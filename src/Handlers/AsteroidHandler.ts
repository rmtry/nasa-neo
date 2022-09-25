import moment from "moment";
import AsteroidController, {
  AsteroidControllerFindAsteroidsSuccessResponse,
} from "../Controllers/AsteroidController";

// Handle Server's request & distribute collections
const handleFetchAllAsteroidsByDates: (
  startDate?: any,
  endDate?: any
) => Promise<AsteroidControllerFindAsteroidsSuccessResponse> = (
  startDate,
  endDate
) =>
  new Promise(async (resolve, reject) => {
    // validate inputs
    if (
      !startDate ||
      !moment(startDate as string).isValid() ||
      (endDate && !moment(endDate as string).isValid())
    ) {
      reject(
        new Error(
          "Start Date (and End Date, if exists) must be in the correct format!"
        )
      );
    } else {
      try {
        let success = await AsteroidController.findAsteroids(
          moment(startDate as string, "YYYY-MM-DD"),
          moment(endDate as string, "YYYY-MM-DD")
        );
        resolve(success);
      } catch (err) {
        reject(err as Error);
      }
    }
  });

export default { handleFetchAllAsteroidsByDates };
