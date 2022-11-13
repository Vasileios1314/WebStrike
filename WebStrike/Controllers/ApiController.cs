using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebStrike.Data;
using WebStrike.Models;


namespace WebStrike.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ApiController(ApplicationDbContext context ) {  
            _context = context;
        }
        [HttpGet("GetActors")]
        public async Task<List<Actor>> GetActors() {
            return await _context.Actors.ToListAsync();
        }

        [HttpGet("GetActor/{id}")]
        public async Task<IActionResult> GetActorsById(int id) {
            var actor = await _context.Actors.FindAsync(id);
            return actor== null ? NotFound() : Ok(actor);
        }

        [HttpGet("GetProducers")]
        public async Task<List<Producer>> GetProducers() {
            return await _context.Producers.ToListAsync();
        }
        [HttpGet("GetCinemas")]
        public async Task<List<Cinema>> GetCinemas() {
            return await _context.Cinemas.ToListAsync();
        }
        [HttpGet("GetMovies")]
        public async Task<List<Movie>> GetMovies() {
            return await _context.Movies.Include(n => n.Cinema).ToListAsync();
        }
    }
}
