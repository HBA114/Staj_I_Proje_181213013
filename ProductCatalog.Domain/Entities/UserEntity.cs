using Newtonsoft.Json;
using System;

namespace ProductCatalog.Domain.Entities
{
    public class UserEntity : BaseEntity
    {
        public string Email { get; set; }
        public DateTime DateOfJoining { get; set; }
        public int WPA { get; set; }    // Wrong password attempts
        [JsonIgnore] public string Password { get; set; }
    }
}
