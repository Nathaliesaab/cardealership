namespace car_dealership
{
    public interface IRefreshTokenGenerator
    {
        Task<string> GenerateToken(int userId);
    }
}