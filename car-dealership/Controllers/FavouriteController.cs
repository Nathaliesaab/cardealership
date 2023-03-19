using Microsoft.AspNetCore.Mvc;
using car_dealership.Models;
using Microsoft.AspNetCore.Authorization;

namespace car_dealership.Controllers
{
    [Authorize]
    [ApiController]

    public class FavouriteController : ControllerBase
    {

        private CarDealershipContext _context;

        public FavouriteController(CarDealershipContext context)
        {
            _context = context;
        }

        [Route("api/[controller]/save")]
        [HttpPost]
        public async Task<bool> favourite(Favourite request)
        {
            var result = await _context.FavouriteCar(request.carId, request.customerId);
            return result;
        }

        [Route("api/[controller]/customerfavourite/{id}")]
        [HttpGet]
        public async Task<List<Car>> CustomerFavourite(int id)
        {
            var result = await _context.GetCustomerFavouriteCars(id);
            return result;
        }


        [Route("api/[controller]/remove")]
        [HttpPost]
        public async Task<bool> UnFavouriteCar(Favourite request)
        {
            var result = await _context.UnfavouriteCar(request.carId, request.customerId);
            return result;
        }


    }

}