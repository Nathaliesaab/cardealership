using MySql.Data.MySqlClient;
using System.Data;

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

        public List<Car> GetAllCars()
        {
            List<Car> list = new List<Car>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from car", conn);
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
                            stockQuantity = reader.GetInt16("stock_quantity"),
                            color = reader.GetString("color"),
                            colorCode = reader.GetString("color_code"),
                            image = reader.GetString("image"),
                            driveType = reader.GetString("drive_type"),
                            description = reader.GetString("description"),
                        });
                    }
                }
            }

            return list;
        }


        public async Task<Car> GetCarDetailsAsync(int carId)
        {
            Car chosenCar = new Car();

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
                            chosenCar.image = reader.GetString("image");
                        }
                    }
                }
            }

            return chosenCar;
        }


        public async Task<Customer> Create(Customer customer)
        {
            // Connect to the database
            using (var connection = GetConnection())
            {
                await connection.OpenAsync();

                // Insert the customer into the database
                var query = "INSERT INTO customer (name, email, password) VALUES (@Name, @Email, @Password)";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", customer.name);
                    command.Parameters.AddWithValue("@Email", customer.email);
                    command.Parameters.AddWithValue("@Password", customer.password);

                    command.ExecuteNonQuery();
                }
            }

            return customer;
            // return RedirectToAction("Index", "Home");
        }


        public async Task<Customer> AuthenticateCustomer(Customer customer)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "SELECT * FROM customer WHERE email = @custEmail";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@custEmail", customer.email);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            string hashedPassword = reader.GetString("password");
                            bool passwordMatches = BCrypt.Net.BCrypt.Verify(customer.password, hashedPassword);

                            if (passwordMatches)
                            {
                                Customer authenticatedCustomer = new Customer
                                {
                                    id = reader.GetInt32("id"),
                                    name = reader.GetString("name"),
                                    email = reader.GetString("email")
                                };

                                return authenticatedCustomer;
                            }
                        }
                    }
                }
            }

            // If we reach this point, authentication failed
            return null;
        }


        public async Task<bool> CustomerExistsByEmail(string email)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "SELECT COUNT(*) FROM customer WHERE email = @custEmail";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@custEmail", email);
                    var result = await cmd.ExecuteScalarAsync();

                    return Convert.ToInt32(result) > 0;
                }
            }
        }

        public async Task<RefreshToken> GetRefreshToken(int userId, string refreshToken = null)
        {
            RefreshToken token = null;

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "SELECT * FROM refreshtoken WHERE userId = @userId";
                if (!string.IsNullOrEmpty(refreshToken))
                {
                    query += " AND refreshToken = @refreshToken";
                }

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@userId", userId);
                    if (!string.IsNullOrEmpty(refreshToken))
                    {
                        cmd.Parameters.AddWithValue("@refreshToken", refreshToken);
                    }

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            token = new RefreshToken
                            {
                                userId = reader.GetInt16("userId"),
                                refreshToken = reader.GetString("refreshToken"),
                                tokenId = reader.GetString("tokenId")
                            };
                        }
                    }
                }
            }

            return token;
        }


        public async Task<bool> updateRefreshToken(int userId, string refreshToken)
        {
            RefreshToken token = new RefreshToken();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "UPDATE refreshtoken SET refreshToken = @refreshToken where userId = @userId";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@refreshToken", refreshToken);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;

                }
            }
        }
        public async Task<bool> InsertRefreshToken(int userId, string tokenId, string refreshToken)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "INSERT INTO refreshtoken (userId, tokenId, refreshToken) VALUES (@userId, @tokenId, @refreshToken)";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@tokenId", tokenId);
                    cmd.Parameters.AddWithValue("@refreshToken", refreshToken);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
        }

        public async Task<bool> FavouriteCar(int carId, int userId)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "INSERT INTO favourite (customer_id, car_id) VALUES (@customerId, @carId)";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@customerId", userId);
                    cmd.Parameters.AddWithValue("@carId", carId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
        }

        public async Task<List<Car>> GetCustomerFavouriteCars(int customerId)
        {
            List<Car> list = new List<Car>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select c.id,c.make,c.model,c.image ,f.car_id from car c , favourite f where f.car_id = c.id and customer_id = @customerId; ", conn);
                cmd.Parameters.AddWithValue("@customerId", customerId);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Car()
                        {
                            id = reader.GetInt16("id"),
                            model = reader.GetString("model"),
                            make = reader.GetString("make"),
                            image = reader.GetString("image"),
                        });
                    }
                }
            }

            return list;
        }
        public async Task<bool> UnfavouriteCar(int carId, int userId)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                var query = "DELETE FROM favourite WHERE customer_id = @customerId AND car_id = @carId";

                using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@customerId", userId);
                    cmd.Parameters.AddWithValue("@carId", carId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
        }

    }

}

