using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces.Services
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(int id);
        JwtSecurityToken Verify(string token);
        TokenValidationParameters GetValidationParameters();
    }
}
