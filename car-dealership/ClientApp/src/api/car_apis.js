// API GET REQUEST to retreive all cars
export const getAllCars = async () => {
  try {
    const response = await fetch("/api/car").then((result) => {
      return result.json();
    });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

// API GET REQUEST to retreive specific car by Id
export const get_car = async (id) => {
  try {
    const response = await fetch(`/api/car/${id}`).then((result) => {
      return result.json();
    });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

// API GET REQUEST to search cars by make,model,year,description,and safety
export const search_cars = async (searchUrl) => {
  try {
    const response = await fetch(searchUrl)
      .then((result) => result.json())
      .then((res) => {
        return res.cars;
      });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};
