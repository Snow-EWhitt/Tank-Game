using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TankController : ControllerBase
{
    [HttpGet]
    public void Get()
    {
      throw new NotImplementedException();
    }
}
