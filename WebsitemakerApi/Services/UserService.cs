using WebsitemakerApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace WebsitemakerApi.Services
{
    public interface IUserService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
    }

    public class UserService : IUserService
    {
        private static readonly List<User> _users = new();
        private static int _nextId = 1;

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            await Task.Delay(1); // Simulate async operation

            // Validation
            if (string.IsNullOrWhiteSpace(request.FullName))
                return new AuthResponse { Success = false, Message = "Full name is required" };

            if (string.IsNullOrWhiteSpace(request.Email))
                return new AuthResponse { Success = false, Message = "Email is required" };

            if (string.IsNullOrWhiteSpace(request.Username))
                return new AuthResponse { Success = false, Message = "Username is required" };

            if (string.IsNullOrWhiteSpace(request.Password))
                return new AuthResponse { Success = false, Message = "Password is required" };

            if (request.Password != request.ConfirmPassword)
                return new AuthResponse { Success = false, Message = "Passwords do not match" };

            if (request.Password.Length < 6)
                return new AuthResponse { Success = false, Message = "Password must be at least 6 characters long" };

            // Check if user already exists
            if (_users.Any(u => u.Username.ToLower() == request.Username.ToLower()))
                return new AuthResponse { Success = false, Message = "Username already exists" };

            if (_users.Any(u => u.Email.ToLower() == request.Email.ToLower()))
                return new AuthResponse { Success = false, Message = "Email already exists" };

            // Create new user
            var user = new User
            {
                Id = _nextId++,
                FullName = request.FullName,
                Email = request.Email,
                DateOfBirth = request.DateOfBirth,
                Username = request.Username,
                PasswordHash = HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow
            };

            _users.Add(user);

            return new AuthResponse
            {
                Success = true,
                Message = "User registered successfully",
                User = new User
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    Username = user.Username,
                    CreatedAt = user.CreatedAt
                }
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            await Task.Delay(1); // Simulate async operation

            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return new AuthResponse { Success = false, Message = "Username and password are required" };

            var user = _users.FirstOrDefault(u => u.Username.ToLower() == request.Username.ToLower());
            
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
                return new AuthResponse { Success = false, Message = "Invalid username or password" };

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                User = new User
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    Username = user.Username,
                    CreatedAt = user.CreatedAt
                },
                Token = GenerateToken(user)
            };
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            await Task.Delay(1); // Simulate async operation
            return _users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower());
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            await Task.Delay(1); // Simulate async operation
            return _users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + "SALT_KEY"));
            return Convert.ToBase64String(hashedBytes);
        }

        private static bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }

        private static string GenerateToken(User user)
        {
            // Simple token generation - in production, use JWT
            return Convert.ToBase64String(Encoding.UTF8.GetBytes($"{user.Id}:{user.Username}:{DateTime.UtcNow:yyyyMMddHHmmss}"));
        }
    }
}
