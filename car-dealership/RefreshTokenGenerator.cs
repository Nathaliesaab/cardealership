using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using car_dealership.Models;

namespace car_dealership
{

    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        private readonly CarDealershipContext context;

        public RefreshTokenGenerator(CarDealershipContext _context)
        {
            context = _context;
        }
        public async Task<string> GenerateToken(int userId)
        {
            var randomnumber = new byte[32];
            using (var randomnumbergenerator = RandomNumberGenerator.Create())
            {
                randomnumbergenerator.GetBytes(randomnumber);
                string RefreshToken = Convert.ToBase64String(randomnumber);

                var _user = await context.GetRefreshToken(userId, null);

                if (_user != null)
                {
                    await context.updateRefreshToken(userId, RefreshToken);
                }
                else
                {
                    await context.InsertRefreshToken(userId, new Random().Next().ToString(), RefreshToken);
                }

                return RefreshToken;
            }
        }
    }
}