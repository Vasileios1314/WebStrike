using Microsoft.EntityFrameworkCore;
using WebStrike.Models;

namespace WebStrike.Data {
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {

        }

        public DbSet<User> Users { get; set; }
    }
}
