namespace car_dealership.Models
{
    public class ReviewRequest
    {
        public int carId { get; set; }
        public int customerId { get; set; }
        public int rating { get; set; }
        public string review { get; set; }
    }
}