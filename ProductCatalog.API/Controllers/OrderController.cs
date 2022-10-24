using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductCatalog.Application.Interfaces;
using ProductCatalog.Application.Interfaces.Services;
using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _repository;
        private readonly IProductRepository _productRepository;
        private readonly IOfferRepository _offerRepository;
        private readonly ILoggerService _logger;

        public OrderController(IOrderRepository repository, IProductRepository productRepository, ILoggerService logger, IOfferRepository offerRepository)
        {
            _repository = repository;
            _productRepository = productRepository;
            _logger = logger;
            _offerRepository = offerRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(OrderModel model)
        {
            var order = new OrderEntity
            {
                OrderDate = DateTime.Now,
                ProductId = (int)model.ProductId,
                BuyerId = (int)model.BuyerId,
            };

            if ((int)model.ProductId > 0)
            {
                var product = _productRepository.GetById((int)model.ProductId);

                product.IsSold = true;

                await _offerRepository.DeclineMultipleOffers(new OfferModel { ProductId = product.Id, IsActive = true });

                await _productRepository.UpdateEntity(product);
                _logger.LogInfo("Created Order Successfully");
                return Ok(await _repository.CreateAsync(order));
            }
            else
            {
                _logger.LogError("Product id can not be null or zero");
                return BadRequest("Product not found");
            }

        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            _logger.LogInfo("Get All Orders Request");
            return Ok(_repository.GetAll());
        }

        [HttpPost("getbyfiltering")]
        public IActionResult GetByFiltering(OrderModel model)
        {
            _logger.LogInfo("Get Orders By Filtering Request");
            return Ok(_repository.GetByFiltering(model));
        }

        [HttpGet("getOrders/{userId}")]
        public IActionResult GetOrders(int userId)
        {
            var productModel = new ProductModel
            {
                UserId = userId
            };

            var myProducts = _productRepository.GetByFiltering(productModel);

            List<int> productIdList = new List<int>();
            foreach (var product in myProducts)
            {
                productIdList.Add(product.Id);
            }

            return Ok(_repository.GetOrdersFromMe(productIdList));
        }
    }
}
