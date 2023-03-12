import { FindYourCar } from "./components/FindYourCar";
import { Landing } from "./components/Landing";
import { CarDetails } from "./components/ui/CarDetails";

const AppRoutes = [
  {
    path: "/",
    element: <Landing />,
    linkValue: "Home",
    display: true,
  },
  {
    path: "/findyourcar",
    linkValue: "Find Your Car",
    element: <FindYourCar />,
    display: true,
  },
  {
    path: "/car-details",
    linkValue: "Car Details",
    element: <CarDetails />,
    display: false,
  },
];

export default AppRoutes;
