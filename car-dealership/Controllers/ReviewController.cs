using Microsoft.AspNetCore.Mvc;
using car_dealership.Models;
using Microsoft.AspNetCore.Authorization;

namespace car_dealership.Controllers
{

    [ApiController]

    public class ReviewController : ControllerBase
    {

        private CarDealershipContext _context;

        public ReviewController(CarDealershipContext context)
        {
            _context = context;
        }

        [Authorize]
        [Route("api/[controller]/postreview")]
        [HttpPost]
        public async Task<bool> post_review(ReviewRequest request)
        {
            var result = await _context.PostReview(request);
            return result;
        }

        [Route("api/[controller]/carreviews/{carId}")]
        [HttpGet]
        public async Task<List<CarReview>> car_reviews(int carId)
        {
            var result = await _context.GetCarReviews(carId);
            return result;
        }

    }

}