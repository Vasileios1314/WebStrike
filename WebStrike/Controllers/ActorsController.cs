using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebStrike.Data;
using WebStrike.Models;


namespace WebStrike.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ActorsController(ApplicationDbContext context ) {  
            _context = context;
        }
        [HttpGet("GetActors")]
        public async Task<List<Actor>> GetActors() {
            return await _context.Actors.ToListAsync();
        }
    }
}
