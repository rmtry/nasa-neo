import moment from "moment";
import AsteroidController from "../src/Controllers/AsteroidController";
import AsteroidHandler from "../src/Handlers/AsteroidHandler";
jest.mock("../src/Controllers/AsteroidController");
const mockedAsteroidController = AsteroidController as jest.Mocked<
  typeof AsteroidController
>;

describe("Asteroid Handler should validate inputs", () => {
  mockedAsteroidController.findAsteroids.mockResolvedValue({ data: {} as any });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const today = moment(new Date());
  it("Should return error when inputs are undefined", async () => {
    try {
      await AsteroidHandler.handleFetchAllAsteroidsByDates(
        undefined,
        undefined
      );
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it("Should return error when startDate is undefined", async () => {
    try {
      await AsteroidHandler.handleFetchAllAsteroidsByDates(undefined, today);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it("Should return error when startDate is invalid", async () => {
    try {
      await AsteroidHandler.handleFetchAllAsteroidsByDates(NaN, today);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it("Should not return error when only endDate is invalid", async () => {
    try {
      const res = await AsteroidHandler.handleFetchAllAsteroidsByDates(
        today,
        undefined
      );
      expect(res).toEqual({ data: {} });
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
  it("Should not return error when only endDate is invalid", async () => {
    try {
      const res = await AsteroidHandler.handleFetchAllAsteroidsByDates(
        today,
        NaN
      );
      expect(res).toEqual({ data: {} });
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
  it("Should call the Controller if the inputs are valid", async () => {
    await AsteroidHandler.handleFetchAllAsteroidsByDates(today, today);
    expect(mockedAsteroidController.findAsteroids).toHaveBeenCalled();
  });
});
