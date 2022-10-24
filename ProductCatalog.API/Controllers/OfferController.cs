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
    public class OfferController : ControllerBase
    {
        private readonly IOfferRepository _repository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly ILoggerService _logger;

        public OfferController(IOfferRepository repository, IProductRepository productRepository, IOrderRepository orderRepository, ILoggerService logger)
        {
            _repository = repository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOffer(OfferModel model)
        {
            var offer = new OfferEntity
            {
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                FromUserId = (int)model.FromUserId,
                ToUserId = (int)model.ToUserId,
                ProductId = (int)model.ProductId,
                OfferPrice = (float)model.OfferPrice,
                IsAccepted = false,
                IsActive = true
            };
            _logger.LogInfo("Offer Created Successfully.");
            return Ok(await _repository.CreateAsync(offer));
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult GetAllOffers()
        {
            _logger.LogInfo("Get All Offers Request");
            return Ok(_repository.GetAll());
        }

        [HttpPost("getbyfiltering")]
        public IActionResult GetOffersByFiltering(OfferModel model)
        {
            _logger.LogInfo("Get Offers By Filtering Request");
            return Ok(_repository.GetOffersByFiltering(model));
        }

        [HttpPost("changeowner/{id}")]
        public async Task<IActionResult> ChangeProductOwner(int id)
        {
            var offer = _repository.GetById(id);
            var product = _productRepository.GetById(offer.ProductId);
            offer.IsAccepted = true;
            offer.IsActive = false;

            offer.UpdateDate = DateTime.Now;

            product.UserId = offer.FromUserId;
            product.IsSold = true;
            // product price can be updated. Or create a filed that shows purchase fee

            await _repository.UpdateEntity(offer);          // i don't sure is this safe. Works for now.
            await _productRepository.UpdateEntity(product);
            _logger.LogInfo("Offer is accepted and product owner is updated");
            return Ok("Updated");
        }

        [HttpGet("accept_offer/{offerId}")]
        public async Task<IActionResult> AcceptOffer(int offerId)
        {
            var offer = _repository.GetById(offerId);
            var product = _productRepository.GetById(offer.ProductId);

            if (offer.IsActive)
            {
                product.IsSold = true;
                product.Price = offer.OfferPrice;
                offer.IsAccepted = true;
                offer.IsActive = false;
                offer.UpdateDate = DateTime.Now;

                await _productRepository.UpdateEntity(product);
                await _repository.UpdateEntity(offer);

                await _repository.DeclineMultipleOffers(new OfferModel { ProductId = offer.ProductId, IsActive = true });

                var order = new OrderEntity
                {
                    OrderDate = DateTime.Now,
                    ProductId = (int)offer.ProductId,
                    BuyerId = (int)offer.FromUserId,
                };
                _logger.LogInfo("Offer Accepted Successfully.");
                return Ok(await _orderRepository.CreateAsync(order));
            }
            else
            {
                _logger.LogError("Offer Already Accepted");
                return BadRequest();
            }
        }

        [HttpGet("decline_offer/{offerId}")]
        public async Task<IActionResult> DeclineOffer(int offerId)
        {
            var offer = _repository.GetById(offerId);
            offer.IsAccepted = false;
            offer.IsActive = false;
            offer.UpdateDate = DateTime.Now;

            await _repository.UpdateEntity(offer);
            _logger.LogInfo("Offer declined successfully.");
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            _logger.LogInfo("Get Offer By Id request runned. Id : " + id.ToString());
            return Ok(_repository.GetById(id));
        }

        [HttpGet("cancel_offer/{orderId}")]
        public async Task<IActionResult> CancelOffer(int orderId)
        {
            var order = _repository.GetById(orderId);

            order.IsActive = false;
            order.UpdateDate = DateTime.Now;

            await _repository.UpdateEntity(order);

            _logger.LogInfo("Cancelled order with id : " + orderId);
            return Ok();
        }
    }
}
