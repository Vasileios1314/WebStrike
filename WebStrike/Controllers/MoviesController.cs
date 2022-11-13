using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebStrike.Data;

namespace WebStrike.Controllers {
    public class MoviesController : Controller {
        private readonly ApplicationDbContext _context;
        public MoviesController(ApplicationDbContext context) {
            _context = context;
        }
        public async Task<IActionResult> Index() {
            var data = await _context.Movies.Include(n => n.Cinema).ToListAsync();

            return View();
        }
    }
}
