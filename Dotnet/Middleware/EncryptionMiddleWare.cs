﻿using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Primitives;
using System.Text.RegularExpressions;
using System.Text;

namespace CrudWithMongoDB.Middleware
{
    public class EncryptionMiddleWare
    {
        private readonly RequestDelegate _next;
        private static string _secretKey;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EncryptionMiddleWare> _logger;

        public EncryptionMiddleWare(RequestDelegate next, IConfiguration configuration, ILogger<EncryptionMiddleWare> logger)
        {
            _next = next;
            _secretKey = configuration["Key:SecretKey"] ?? throw new ArgumentNullException("secretKey", "Secret key cannot be null");
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var originalBodyStream = context.Response.Body;  

            using (var newBodyStream = new MemoryStream())
            {
                var controllerAction = context.GetEndpoint()?.Metadata.GetMetadata<ControllerActionDescriptor>();
                var methodName = controllerAction?.ActionName ?? "Unknown";
                var controllerName = controllerAction?.ControllerName ?? "Unknown";


                string parameters = string.Empty;

                if (context.Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase))
                {
                    context.Request.EnableBuffering();
                    using (var reader = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true))
                    {
                        parameters = await reader.ReadToEndAsync();
                        context.Request.Body.Position = 0;  
                    }
                }

                try
                {

                    if (context.Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase) && context.Request.ContentLength > 0)
                    {
                        var bodyAsText = await new StreamReader(context.Request.Body).ReadToEndAsync();
                        context.Request.Body.Position = 0;  

                        if (!string.IsNullOrEmpty(bodyAsText))
                        {
                            try
                            { 

                                var decryptedBody = EncryptionHelper.EncryptionHelper.Decrypt(bodyAsText, _secretKey);
                                var buffer = Encoding.UTF8.GetBytes(decryptedBody);
                                context.Request.Body = new MemoryStream(buffer);
                                context.Request.Body.Position = 0;  
                            }
                            catch
                            {
                                context.Request.Body.Position = 0;  
                            }
                        }
                    }

                    context.Response.Body = newBodyStream;  
                    await _next(context);  

                    newBodyStream.Seek(0, SeekOrigin.Begin);
                    var plainTextResponse = await new StreamReader(newBodyStream).ReadToEndAsync();
                    var encryptedResponse = EncryptionHelper.EncryptionHelper.Encrypt(plainTextResponse, _secretKey);
                    var encryptedData = Encoding.UTF8.GetBytes(encryptedResponse);

                    context.Response.Body = originalBodyStream;  
                    await context.Response.Body.WriteAsync(encryptedData, 0, encryptedData.Length);  
                }
                catch (Exception ex)
                {
                    await HandleExceptionAsync(context, ex);  
                }
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.LogError(exception, "An error occurred while processing the request");
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";
            return context.Response.WriteAsync(new
            {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error from Middleware"
            }.ToString());
        }

        private string MaskPasswordInLog(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            return Regex.Replace(input, @"(?i)(""password""\s*:\s*"")(.*?)(?="")", "$1****", RegexOptions.IgnoreCase);
        }
    }
}
