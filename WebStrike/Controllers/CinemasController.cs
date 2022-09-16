using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebStrike.Data;

namespace WebStrike.Controllers {
    public class CinemasController : Controller {
        private readonly ApplicationDbContext _context;
        public CinemasController(ApplicationDbContext context) {
            _context = context;
        }
        public async Task<IActionResult> Index() {
            var data = await _context.Producers.ToListAsync();

            return View();
        }
    }
}
