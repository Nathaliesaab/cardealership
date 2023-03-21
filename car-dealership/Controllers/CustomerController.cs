using Microsoft.AspNetCore.Mvc;
using car_dealership.Models;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace car_dealership.Controllers
{
    [ApiController]

    public class CustomerController : ControllerBase
    {
        private readonly JWTSetting setting;
        private CarDealershipContext _context;
        private readonly IRefreshTokenGenerator tokenGenerator;

        public CustomerController(CarDealershipContext context, IOptions<JWTSetting> options, IRefreshTokenGenerator _refreshToken)
        {
            _context = context;
            setting = options.Value;
            tokenGenerator = _refreshToken;
        }

        [NonAction]
        public async Task<TokenResponse> Authenticate(int userId, Claim[] claims)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var tokenkey = Encoding.UTF8.GetBytes(setting.securitykey);
            var tokenhandler = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
            );
            tokenResponse.JWTToken = new JwtSecurityTokenHandler().WriteToken(tokenhandler);
            tokenResponse.RefreshToken = await tokenGenerator.GenerateToken(userId);

            return tokenResponse;
        }



        //Authentication endpoit
        [Route("api/[controller]/authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] Customer customer)
        {
            TokenResponse tokenResponse = new TokenResponse();
            Customer _user = await _context.AuthenticateCustomer(customer);
            if (_user == null)
                return Unauthorized();

            var tokenhandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF8.GetBytes(setting.securitykey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim("id", _user.id.ToString()),
                        new Claim(ClaimTypes.Name, _user.name),
                        new Claim(ClaimTypes.Email, _user.email),
                    }
                ),
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenhandler.CreateToken(tokenDescriptor);
            string finaltoken = tokenhandler.WriteToken(token);
            var response = new
            {
                JWTToken = finaltoken,
                RefreshToken = await tokenGenerator.GenerateToken(_user.id)
            };
            return Ok(response);
        }

        // Generate a refresh token endpoint
        [Route("api/[controller]/refresh")]
        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] TokenResponse token)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token.JWTToken);
            var userId = Int32.Parse(securityToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value);


            //var username = principal.Identity.Name;
            var _reftable = _context.GetRefreshToken(userId, token.RefreshToken);
            if (_reftable == null)
            {
                return Unauthorized();
            }
            TokenResponse _result = await Authenticate(userId, securityToken.Claims.ToArray());
            return Ok(_result);
        }



        // Register endpoint
        [Route("api/[controller]/register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Customer request)
        {
            try
            {
                string salt = BCrypt.Net.BCrypt.GenerateSalt();
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.password, salt);

                var existingCustomer = await _context.CustomerExistsByEmail(request.email);
                if (existingCustomer)
                {
                    return BadRequest("Customer with the same email already exists.");
                }

                var newCustomer = new Customer
                {
                    email = request.email,
                    name = request.name,
                    password = hashedPassword,
                };

                await _context.CreateCustomer(newCustomer);

                return Ok("Registration successful!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

