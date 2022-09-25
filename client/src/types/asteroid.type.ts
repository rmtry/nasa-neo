export interface AsteroidResponseData {
  element_count: number;
  links: {
    next: string;
    previous: string;
    self: string;
  };
  near_earth_objects: {
    [x: string]: AsteroidData[];
  };
}

export interface AsteroidData {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  nasa_jpl_url: string;
  close_approach_data: {
    close_approach_date: string;
    close_approach_date_full: string;
    relative_velocity: { kilometers_per_hour: string };
    miss_distance: { kilometers: string };
  }[];
  estimated_diameter: {
    meters: {
      estimated_diameter_max: string;
      estimated_diameter_min: string;
    };
  };
}
