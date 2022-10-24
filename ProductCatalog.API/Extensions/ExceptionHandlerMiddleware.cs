using Microsoft.AspNetCore.Http;
using ProductCatalog.Application.Interfaces.Services;
using ProductCatalog.Application.Models.ErrorModels;
using System;
using System.Net;
using System.Threading.Tasks;

namespace ProductCatalog.API.Extensions
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerService _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILoggerService logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong: {e}");
                await HandleException(context, e);
            }
        }

        private async Task HandleException(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await context.Response.WriteAsync(new ErrorInfo()
            {
                StatusCode = context.Response.StatusCode,
                Message = $"Internal Server Error from the custom middleware Check log files for more information. Error: {exception.Message}"
            }.ToString());
        }
    }
}
