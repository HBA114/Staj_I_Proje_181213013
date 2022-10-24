using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ProductCatalog.Application.Interfaces;
using ProductCatalog.Application.Interfaces.BaseInterfaces;
using ProductCatalog.Application.Interfaces.Services;
using ProductCatalog.Infrastructure.Repositories;
using ProductCatalog.Infrastructure.Repositories.BaseRepositories;
using ProductCatalog.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new JwtTokenGenerator(configuration.GetSection("JwtSecureKey").Value).GetValidationParameters();
            });

            services.AddTransient(typeof(IRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IBrandRepository, BrandRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IColorRepository, ColorRepository>();
            services.AddTransient<IUsedStateRepository, UsedStateRepository>();
            services.AddTransient<IOfferRepository, OfferRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IJwtTokenGenerator>(x => new JwtTokenGenerator(configuration.GetSection("JwtSecureKey").Value));
            services.AddTransient<IMailSender>(x => new MailSender(configuration));
            services.AddTransient<ILoggerService, LoggerService>();

            return services;
        }
    }
}
