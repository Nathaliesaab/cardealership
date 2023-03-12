using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using car_dealership.Models;




namespace car_dealership.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            CarDealershipContext context = HttpContext.RequestServices.GetService(typeof(car_dealership.Models.CarDealershipContext)) as CarDealershipContext;

            //return View(context.GetAllFilms());
            return StatusCode(StatusCodes.Status200OK, context.GetAllFilms());
        }
    }
}

