using car_dealership.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace car_dealership.Controllers
{
    [ApiController]

    public class CarController : ControllerBase
    {
        private CarDealershipContext _context;
        public CarController(CarDealershipContext context)
        {
            _context = context;
        }

        [Route("api/[controller]")]
        public IActionResult Index()
        {
            return StatusCode(StatusCodes.Status200OK, _context?.GetAllCars());
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> GetCarDetailsAsync(int id)
        {
            var car = await _context?.GetCarDetailsAsync(id);
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
            var query = _context?.GetAllCars().AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(c =>
                    c.make.ToUpper().Contains(keyword.ToUpper()) ||
                    c.year.ToString().StartsWith(keyword) ||
                    c.model.ToUpper().Contains(keyword.ToUpper()) ||
                    c.color.ToUpper().Contains(keyword.ToUpper()) ||
                    c.driveType.ToUpper().Contains(keyword.ToUpper()) ||
                    c.description.ToUpper().Contains(keyword.ToUpper())
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

