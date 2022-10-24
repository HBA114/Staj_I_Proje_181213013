using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductCatalog.Application.Interfaces;
using ProductCatalog.Application.Interfaces.Services;
using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace ProductCatalog.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _repository;
        private readonly ILoggerService _logger;
        public BrandController(IBrandRepository repository, ILoggerService logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateBrand(BrandModel model)
        {
            string idListCategory = " '" + model.CategoryId.ToString() + "' ";
            var brand = new BrandEntity
            {
                Name = model.Name,
                CategoryIdList = idListCategory
            };
            _logger.LogInfo("Brand Created Successfully!");
            return Ok(await _repository.CreateAsync(brand));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateBrand(int id, BrandModel model)
        {
            var entity = _repository.GetById(id);
            if (model.Name != null)
            {
                entity.Name = model.Name;
            }
            if (model.CategoryId != null)
            {
                entity.CategoryIdList = entity.CategoryIdList + " '" + model.CategoryId.ToString() + "' ";
            }

            await _repository.UpdateEntity(entity);
            _logger.LogInfo("Brand Updated Successfully!");
            return Ok("Brand Updated Successfully");
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult GetBrands()
        {
            _logger.LogInfo("Get All Brands Request");
            return Ok(_repository.GetAll());
        }

        [AllowAnonymous]
        [HttpPost("getbyfiltering")]
        public IActionResult GetBrandsByFiltering(BrandModel model)
        {
            _logger.LogInfo("Get Brands By Filtering Request");
            return Ok(_repository.GetBrandsByFiltering(model));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            _logger.LogInfo("Get Brand By Id request runned. Id : " + id.ToString());
            return Ok(_repository.GetById(id));
        }
    }
}
