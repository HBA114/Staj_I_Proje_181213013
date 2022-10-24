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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly ILoggerService _logger;

        public ProductController(IProductRepository repository, ILoggerService logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct(ProductModel model)
        {
            var product = new ProductEntity
            {
                Name = model.Name,
                Description = model.Description,
                ImageBase64 = model.ImageBase64,
                UserId = (int)model.UserId,
                CategoryId = (int)model.CategoryId,
                Price = (float)model.Price,
                IsOfferable = (bool)model.IsOfferable,
                IsSold = (bool)model.IsSold,
                CreateDate = System.DateTime.Now,
                UsedStateId = model.UsedStateId == null ? null : (int)model.UsedStateId,
                ColorId = model.ColorId == null ? null : (int)model.ColorId,
                BrandId = model.BrandId == null ? null : (int)model.BrandId,
            };
            _logger.LogInfo("Product Created Successfully.");
            return Ok(await _repository.CreateAsync(product));
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult GetAllProducts()
        {
            _logger.LogInfo("Get All Products Request");
            return Ok(_repository.GetAll());
        }

        [AllowAnonymous]
        [HttpPost("getbyfiltering")]
        public IActionResult GetProductsByFiltering(ProductModel model)
        {
            _logger.LogInfo("Get Products By Filtering Request");
            return Ok(_repository.GetByFiltering(model));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            _logger.LogInfo("Get Product By Id request runned. Id : " + id.ToString());
            return Ok(_repository.GetById(id));
        }
    }
}
