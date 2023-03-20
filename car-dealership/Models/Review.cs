using System;
namespace car_dealership.Models
{
    public class Review
    {
        public int id { get; set; }
        public int rating { get; set; }
        public int customerId { get; set; }
        public int carId { get; set; }
        public string? review { get; set; }
    }
}

