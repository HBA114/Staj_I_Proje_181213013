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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILoggerService _logger;
        public CategoryController(ICategoryRepository repository, ILoggerService logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult GetAllCategories()
        {
            _logger.LogInfo("Get All Categories Request");
            return Ok(_repository.GetAll());
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCategory(BaseModel model)
        {
            var category = new CategoryEntity
            {
                Name = model.Name,
            };
            _logger.LogInfo("Category Created Successfully!");
            return Ok(await _repository.CreateAsync(category));
        }

        [AllowAnonymous]
        [HttpPost("getbyfiltering")]
        public IActionResult GetCategoriesByFiltering(BaseModel model)
        {
            _logger.LogInfo("Get Categories By Filtering Request");
            return Ok(_repository.GetCategoriesByFiltering(model));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            _logger.LogInfo("Get Category By Id request runned. Id : " + id.ToString());
            return Ok(_repository.GetById(id));
        }

    }
}
