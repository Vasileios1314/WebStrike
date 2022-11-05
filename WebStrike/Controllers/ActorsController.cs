using Microsoft.AspNetCore.Mvc;

namespace WebStrike.Controllers {
    public class ActorsController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}
