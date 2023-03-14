using car_dealership.Models;
using Microsoft.AspNetCore.Mvc;


namespace car_dealership.Controllers
{
    [ApiController]

    public class CarController : ControllerBase
    {
        [Route("api/[controller]")]
        public IActionResult Index()
        {
            CarDealershipContext? context = HttpContext.RequestServices.GetService(typeof(car_dealership.Models.CarDealershipContext)) as CarDealershipContext;

            return StatusCode(StatusCodes.Status200OK, context?.GetAllCars());
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> GetCarDetailsAsync(int id)
        {
            CarDealershipContext? context = HttpContext.RequestServices.GetService(typeof(car_dealership.Models.CarDealershipContext)) as CarDealershipContext;
            var car = await context?.GetCarDetailsAsync(id);
            if (car.id == 0)
            {
                return StatusCode(StatusCodes.Status200OK, $"Car with id: {id} is not found");
            }
            return StatusCode(StatusCodes.Status200OK, car);
        }


        [HttpGet]
        [Route("api/[controller]/search/{keyword}")]
        public IActionResult SearchCars(string keyword)
        {
            CarDealershipContext? context = HttpContext.RequestServices.GetService(typeof(car_dealership.Models.CarDealershipContext)) as CarDealershipContext;
            var query = context?.GetAllCars().AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(c =>
                    c.make.ToUpper().Contains(keyword.ToUpper()) ||
                    c.year.ToString().StartsWith(keyword) ||
                    c.model.ToUpper().Contains(keyword.ToUpper()) ||
                    c.color.ToUpper().Contains(keyword.ToUpper())
                );
            }
            var cars = query.ToList();

            if (cars.Count == 0)
            {
                return Ok(new List<Car>());
            }

            var result = new
            {
                cars = cars.Select(c => new
                {
                    id = c.id,
                    make = c.make,
                    model = c.model,
                    year = c.year,
                    color = c.color,
                    colorCode = c.colorCode,
                    image = c.image
                })
            };

            return Ok(result);
        }

    }
}

