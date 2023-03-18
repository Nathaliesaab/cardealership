using car_dealership.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Primitives;
namespace car_dealership
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Add(new ServiceDescriptor(typeof(CarDealershipContext), new CarDealershipContext(Configuration.GetConnectionString("DefaultConnection"))));

            var _dbcontext = services.BuildServiceProvider().GetService<CarDealershipContext>();

            services.AddSingleton<IRefreshTokenGenerator>(provider => new RefreshTokenGenerator(_dbcontext));

            var _jwtsetting = Configuration.GetSection("JWTSetting");
            services.Configure<JWTSetting>(_jwtsetting);

            var authkey = Configuration.GetValue<string>("JWTSetting:securitykey");

            // Configures the authentication services in the application.
            services.AddAuthentication(item =>
            {
                // Sets the default authentication scheme to JWT bearer.
                item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            // Configures the JWT bearer authentication middleware.
            .AddJwtBearer(item =>
            {
                // Indicates that HTTPS is required for metadata and tokens.
                item.RequireHttpsMetadata = true;
                // Specifies whether to save the received token in the AuthenticationProperties after a successful authentication.
                item.SaveToken = true;
                // Configures the validation parameters for the JWT token.
                item.TokenValidationParameters = new TokenValidationParameters()
                {
                    // Specifies whether to validate the signature of the token.
                    ValidateIssuerSigningKey = true,
                    // Specifies the key used for validating the token signature.
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authkey)),
                    // Specifies whether to validate the issuer of the token (disabled in this case).
                    ValidateIssuer = false,
                    // Specifies whether to validate the audience of the token (disabled in this case).
                    ValidateAudience = false,
                    // Specifies whether to validate the lifetime of the token.
                    ValidateLifetime = true,
                    // Specifies the clock skew used for validating the token lifetime (zero in this case).
                    ClockSkew = TimeSpan.Zero
                };
            });


            // services.AddSwaggerGen(options =>
            // {
            //     options.SwaggerDoc("api", new OpenApiInfo()
            //     {
            //         Description = "Customer API with curd operations",
            //         Title = "Customer",
            //         Version = "1"
            //     });
            // });

            // services.AddCors(options =>
            // {
            //     options.AddPolicy("CorsPolicy",
            //         builder => builder
            //         .WithOrigins("http://localhost:4200", "http://localhost:82")
            //         .AllowAnyMethod()
            //         .AllowAnyHeader()
            //         .AllowCredentials());
            // });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");


            app.UseHttpsRedirection();

            app.UseRouting();



            app.UseAuthentication();

            app.UseAuthorization();

            string StringValues = string.Empty;

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    // Add CORS header to allow error message to be visible to Angular
                    if (context.Request.Headers.TryGetValue("Origin", out StringValues origin))
                    {
                        context.Response.Headers.Add("Access-Control-Allow-Origin", origin.ToString());
                    }
                });
            });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                   name: "default",
                   pattern: "{controller}/{action=Index}/{id?}");

                endpoints.MapFallbackToFile("index.html");
            });


        }
    }
}