using System.ComponentModel.DataAnnotations;

namespace WebStrike.Models {
    public class User {
        [Key]
        public int userId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public int password { get; set; }
        public bool isAdmin { get; set; }

    }
}
