import axios from "axios";
import moment from "moment";
import AsteroidController from "../src/Controllers/AsteroidController";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test the number of times the API gets called", () => {
  mockedAxios.get.mockResolvedValue({
    data: {},
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const today = moment(new Date());
  it("Should call the API once if same date", async () => {
    await AsteroidController.findAsteroids(today, today);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
  it("Should call the API once if 7 days", async () => {
    await AsteroidController.findAsteroids(today, moment(today).add(7, "days"));
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
  it("Should call the API twice if 8 days", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    });
    await AsteroidController.findAsteroids(today, moment(today).add(8, "days"));
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
  it("Should still call the API twice if 14 days", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    });
    await AsteroidController.findAsteroids(
      today,
      moment(today).add(14, "days")
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
  it("Should call the API 4 times if 7 x 4 + 1 = 29 days", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {},
    });
    await AsteroidController.findAsteroids(
      today,
      moment(today).add(29, "days")
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
  });
});
