using Microsoft.AspNetCore.SignalR;

namespace store_app_be_portal.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string title, string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", title, message);
        }

        public async Task SendNotificationToUser(string connectionId, string title, string message)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveNotification", title, message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReceiveNotification", "Welcome", "Connected to notification hub.");
            await base.OnConnectedAsync();
        }
    }
}
