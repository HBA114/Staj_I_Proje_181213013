using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class UsedStateController : ControllerBase
    {
        private readonly IUsedStateRepository _repository;
        private readonly ILoggerService _logger;
        public UsedStateController(IUsedStateRepository repository, ILoggerService logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUsedState(BaseModel model)
        {
            var usedState = new UsedStateEntity
            {
                Name = model.Name,
            };
            _logger.LogInfo("Used State Created Successfully!");
            return Ok(await _repository.CreateAsync(usedState));
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult GetAllUsedStates()
        {
            _logger.LogInfo("Get All Used States Request");
            return Ok(_repository.GetAll());
        }

        [AllowAnonymous]
        [HttpPost("getbyfiltering")]
        public IActionResult GetUsedStatesByFiltering(BaseModel model)
        {
            _logger.LogInfo("Get Used States By Filtering Request");
            return Ok(_repository.GetUsedStatesByFiltering(model));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            _logger.LogInfo("Get Used State By Id request runned. Id : " + id.ToString());
            return Ok(_repository.GetById(id));
        }
    }
}
