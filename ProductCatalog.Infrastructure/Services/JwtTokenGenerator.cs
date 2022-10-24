using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProductCatalog.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Infrastructure.Services
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        //private string secureKey = "primefor_2022_staj_HBA114";
        // this key should changed before production. And should be moved to a config file.
        // if you change this key when app is in use, old customers may not be able to use this service for a while.
        private string secureKey;

        public JwtTokenGenerator(string secureKey)
        {
            this.secureKey = secureKey;
        }

        public string GenerateToken(int id)
        {
            
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);
            var payload = new JwtPayload(
                issuer: id.ToString(),
                audience: null,
                claims: null,
                notBefore: null,
                expires: DateTime.Now.AddHours(1)
            );

            var securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public JwtSecurityToken Verify(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);
            tokenHandler.ValidateToken(
                token,
                new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                },
                out SecurityToken securityToken
            );
            return (JwtSecurityToken)securityToken;
        }

        public TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secureKey)),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            };
        }
    }
}
