using WebsitemakerApi.Models;
using MongoDB.Driver;
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
        private readonly IMongoCollection<User> _users;

        public UserService(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("Users");
            
            // Create unique indexes
            CreateIndexes();
        }

        private void CreateIndexes()
        {
            try
            {
                // Create unique index on username
                var usernameIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.Username);
                var usernameIndexOptions = new CreateIndexOptions { Unique = true };
                var usernameIndexModel = new CreateIndexModel<User>(usernameIndexKeys, usernameIndexOptions);

                // Create unique index on email
                var emailIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.Email);
                var emailIndexOptions = new CreateIndexOptions { Unique = true };
                var emailIndexModel = new CreateIndexModel<User>(emailIndexKeys, emailIndexOptions);

                _users.Indexes.CreateMany(new[] { usernameIndexModel, emailIndexModel });
            }
            catch (Exception ex)
            {
                // Indexes might already exist, which is fine
                Console.WriteLine($"Index creation warning: {ex.Message}");
            }
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
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
            var existingUserByUsername = await _users.Find(u => u.Username.ToLower() == request.Username.ToLower()).FirstOrDefaultAsync();
            if (existingUserByUsername != null)
                return new AuthResponse { Success = false, Message = "Username already exists" };

            var existingUserByEmail = await _users.Find(u => u.Email.ToLower() == request.Email.ToLower()).FirstOrDefaultAsync();
            if (existingUserByEmail != null)
                return new AuthResponse { Success = false, Message = "Email already exists" };

            // Create new user
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                DateOfBirth = request.DateOfBirth,
                Username = request.Username,
                PasswordHash = HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                await _users.InsertOneAsync(user);

                return new AuthResponse
                {
                    Success = true,
                    Message = "User registered successfully",
                    User = new UserResponse
                    {
                        Id = user.Id!,
                        FullName = user.FullName,
                        Email = user.Email,
                        DateOfBirth = user.DateOfBirth,
                        Username = user.Username,
                        CreatedAt = user.CreatedAt
                    }
                };
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                return new AuthResponse { Success = false, Message = "Username or email already exists" };
            }
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return new AuthResponse { Success = false, Message = "Username and password are required" };

            var user = await _users.Find(u => u.Username.ToLower() == request.Username.ToLower()).FirstOrDefaultAsync();
            
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
                return new AuthResponse { Success = false, Message = "Invalid username or password" };

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                User = new UserResponse
                {
                    Id = user.Id!,
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
            return await _users.Find(u => u.Username.ToLower() == username.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _users.Find(u => u.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
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
