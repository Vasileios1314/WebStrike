using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebStrike.Data;

namespace WebStrike.Controllers {
    public class ActorsController : Controller {
        private readonly ApplicationDbContext _context;
        public ActorsController(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<IActionResult> Index() {
            var data = await _context.Actors.ToListAsync();
            return View();
        }
    }
}
