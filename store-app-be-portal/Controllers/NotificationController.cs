using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using store_app_be_portal.Hubs;

namespace store_app_be_portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController(IHubContext<NotificationHub> hubContext) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SendNotification([FromBody] NotificationRequest request)
        {
            await hubContext.Clients.All.SendAsync("ReceiveNotification", request.Title, request.Message);
            return Ok(new { status = "Notification sent" });
        }
    }

    public record NotificationRequest(string Title, string Message);
}
