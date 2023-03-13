using System;
namespace car_dealership.Models
{

    public class Car
    {

        public int id { get; set; }

        public string? model { get; set; }

        public string? make { get; set; }


        public string? description { get; set; }

        public int imageId { get; set; }

        public string? color { get; set; }
        public string? colorCode { get; set; }

        public string? safety { get; set; }

        public int passengers { get; set; }
        public decimal price { get; set; }

        public int stockQuantity { get; set; }

        public string? condition { get; set; }

        public int year { get; set; }

        public int numberOfDoors { get; set; }

        public string? driveType { get; set; }

        public string? image { get; set; }
    }
}

