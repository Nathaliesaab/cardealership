namespace car_dealership.Models
{
    public partial class RefreshToken
    {
        public int userId { get; set; }
        public string tokenId { get; set; }
        public string refreshToken { get; set; }
    }
}