using System;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System.Data;
using Mysqlx.Crud;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;

namespace car_dealership.Models
{
    public class CarDealershipContext
    {
        public string ConnectionString { get; set; }

        public CarDealershipContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Employee> GetAllFilms()
        {
            List<Employee> list = new List<Employee>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from EMPLOYEE", conn);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Employee()
                        {
                            IdEmployee = reader.GetInt32("IdEmployee"),
                            Name = reader.GetString("Name"),
                            Email = reader.GetString("Email"),
                            Address = reader.GetString("Address"),
                            Phone = reader.GetString("Phone")
                        });
                    }
                }
            }

            return list;
        }

        public List<Car> GetAllCars()
        {
            List<Car> list = new List<Car>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select id,model,make,year,price,stock_quantity from car", conn);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Car()
                        {
                            id = reader.GetInt16("id"),
                            model = reader.GetString("model"),
                            make = reader.GetString("make"),
                            year = reader.GetInt16("year"),
                            price = reader.GetDecimal("price"),
                            stockQuantity = reader.GetInt16("stock_quantity")
                        });
                    }
                }
            }

            return list;
        }


        public async Task<Car> GetCarDetailsAsync(int carId)
        {
            Car chosenCar = new Car();

            //This creates a new instance of the MySqlConnection class using the GetConnection method,
            //which presumably returns a new connection object. The using statement ensures that the
            //connection object is properly disposed of when the statement completes
            //, by calling its Dispose method.
            //This is important because database connections are a limited resource and can c
            //ause issues if they are not properly managed and released.
            //When the using block is exited(either normally or because of an exception),
            //the Dispose method of the MySqlConnection object is called automatically.
            //This method closes the connection to the database and releases any resources
            //that were allocated to the connection object, such as network sockets or database connections.
            using (var conn = GetConnection())
            {
                await conn.OpenAsync();

                var query = "SELECT * FROM car WHERE id = @carId";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@carId", carId);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            chosenCar.id = reader.GetInt16("id");
                            chosenCar.make = reader.GetString("make");
                            chosenCar.model = reader.GetString("model");
                            chosenCar.year = reader.GetInt16("year");
                            chosenCar.condition = reader.GetString("car_condition");
                            chosenCar.price = reader.GetDecimal("price");
                            chosenCar.color = reader.GetString("color");
                            chosenCar.stockQuantity = reader.GetInt16("stock_quantity");
                            chosenCar.description = reader.GetString("description");
                            chosenCar.colorCode = reader.GetString("color_code");
                            chosenCar.safety = reader.GetString("safety");
                            chosenCar.passengers = reader.GetInt16("passengers");
                            chosenCar.numberOfDoors = reader.GetInt16("number_of_doors");
                            chosenCar.driveType = reader.GetString("drive_type");
                        }
                    }
                }
            }

            return chosenCar;
        }


        //[HttpPost]
        //public ActionResult Create(Customer customer)
        //{
        //    // Connect to the database
        //    using (var connection = GetConnection())
        //    {
        //        connection.Open();

        //        // Insert the customer into the database
        //        var query = "INSERT INTO Customers (Name, Email, Password) VALUES (@Name, @Email, @Password)";
        //        using (var command = new MySqlCommand(query, connection))
        //        {
        //            command.Parameters.AddWithValue("@Name", customer.name);
        //            command.Parameters.AddWithValue("@Email", customer.email);
        //            command.Parameters.AddWithValue("@Password", customer.password);

        //            command.ExecuteNonQuery();
        //        }
        //    }

        //    //return true;
        //    return RedirectToAction("Index", "Home");
        //}


        public List<Car> Search(string keyword)
        {
            var query = GetAllCars().AsQueryable();

            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(c =>
                    c.make.Contains(keyword) ||
                    c.model.Contains(keyword) ||
                    c.year.ToString().Contains(keyword) ||
                    c.color.Contains(keyword));
            }

            return query.ToList();
        }
    }
}

