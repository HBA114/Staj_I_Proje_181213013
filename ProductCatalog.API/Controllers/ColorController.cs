using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductCatalog.Application.Interfaces.BaseInterfaces;
using ProductCatalog.Application.Interfaces.Services;
using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities.BaseEntities;
using System;
using System.Threading.Tasks;

namespace ProductCatalog.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorRepository _repository;
        private readonly ILoggerService _logger;

        public ColorController(IColorRepository repository, ILoggerService logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateColor(BaseModel model)
        {
            var color = new ColorEntity
            {
                Name = model.Name,
            };
            _logger.LogInfo("Color Created Successfully!");
            return Ok(await _repository.CreateAsync(color));
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult GetAllColors()
        {
            _logger.LogInfo("Get All Colors Request");
            return Ok(_repository.GetAll());
        }

        [AllowAnonymous]
        [HttpPost("getbyfiltering")]
        public IActionResult GetColorsByFiltering(BaseModel model)
        {
            _logger.LogInfo("Get Colors By Filtering Request");
            return Ok(_repository.GetColorsByFiltering(model));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            _logger.LogInfo("Get Color By Id request runned. Id : " + id.ToString());
            return Ok(_repository.GetById(id));
        }
    }
}
