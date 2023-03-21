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
