using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductCatalog.Application.Interfaces;
using ProductCatalog.Application.Interfaces.Services;
using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ProductCatalog.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IJwtTokenGenerator _jwt;
        private readonly IMailSender _mailSender;
        private readonly ILoggerService _logger;
        public UserController(IUserRepository repository, IJwtTokenGenerator jwt, IMailSender mailSender, ILoggerService logger)
        {
            _repository = repository;
            _jwt = jwt;
            _mailSender = mailSender;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserModel model)
        {
            var user = new UserEntity
            {
                Name = model.Name,
                Email = model.Email,
                DateOfJoining = DateTime.Now,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                WPA = 0
            };

            UserEntity response;
            response = await _repository.CreateAsync(user);
            await _mailSender.SendWelcomeMail(new MailAddress(model.Email, model.Name));
            _logger.LogInfo("User Created");
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(UserModel model)
        {
            var user = _repository.GetByEmail(model.Email);
            if (user == null)
            {
                _logger.LogError("User not found in database! User object is null.(Login Request)");
                return BadRequest("User Not Found");
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                user.WPA++;
                _repository.UpdateEntity(user);
                if (user.WPA >= 3)
                {
                    _mailSender.SendWrongPasswordInfoMail(new MailAddress(user.Email, user.Name));
                }
                _logger.LogInfo("Invalid Credentials for user! UserId : " + user.Id);
                return BadRequest("Invalid Credentials");
            }

            var jwt = _jwt.GenerateToken(user.Id);

            _logger.LogInfo("User logged in successfully.");
            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                user.DateOfJoining,
                user.WPA,
                jwt
            });
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            var jwt = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var token = _jwt.Verify(jwt);
            int userid = int.Parse(token.Issuer);
            var user = _repository.GetById(userid);
            _logger.LogInfo("User logged in with jwt.");
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            _logger.LogInfo("Logout");
            return Ok(new
            {
                message = "Success"
            });
        }
    }
}
