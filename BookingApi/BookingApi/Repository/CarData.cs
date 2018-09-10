using BookingApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BookingApi.Repository
{
    public class CarData
    {
        public static bool Add(Car car)
        {
            try
            {
                using (var connection = new SqlConnection("Data Source = TAVRENTDESK04; Initial Catalog = BookingApiDB; User ID = sa; Password = test123!@#"))
                {
                    connection.Open();
                    string sql = "INSERT INTO Car(Id,dropCity,Pick,DropDate,PickDate) VALUES(@Id,@Drop,@Pick,@DropDate,@PickDate)";
                    SqlCommand cmd = new SqlCommand(sql, connection);
                    cmd.Parameters.AddWithValue("@Id", Guid.NewGuid().ToString());
                    cmd.Parameters.AddWithValue("@Pick", car.Pick);
                    cmd.Parameters.AddWithValue("@Drop", car.Drop);
                    cmd.Parameters.AddWithValue("@PickDate", car.PickDate);
                    cmd.Parameters.AddWithValue("@DropDate", car.DropDate);

                    cmd.CommandType = CommandType.Text;
                    cmd.ExecuteNonQuery();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static List<Car> GetAll()
        {
            try
            {
                using (var connection = new SqlConnection("Data Source=TAVRENTDESK04;Initial Catalog=BookingApiDB;User ID=sa;Password=test123!@#"))
                {
                    List<Car> cars = new List<Car>();
                    connection.Open();
                    string sql = "SELECT Id,dropCity,Pick,DropDate,PickDate FROM Car";
                    SqlCommand cmd = new SqlCommand(sql, connection);
                    cmd.CommandType = CommandType.Text;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Car car = new Car()
                            {
                                Id = new Guid(reader["Id"].ToString()),
                                Pick = reader["Pick"].ToString(),
                                Drop = reader["dropCity"].ToString(),
                                DropDate = reader["DropDate"].ToString(),
                                PickDate = reader["PickDate"].ToString()
                                
                            };
                            cars.Add(car);
                        };
                    }
                    return cars;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}