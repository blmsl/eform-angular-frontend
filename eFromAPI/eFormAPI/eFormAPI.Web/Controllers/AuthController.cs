﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microting.eFormApi.BasePn.Abstractions;
using Microting.eFormApi.BasePn.Database.Entities;
using Microting.eFormApi.BasePn.Infrastructure.Helpers;
using Microting.eFormApi.BasePn.Infrastructure.Models.API;
using Microting.eFormApi.BasePn.Models.Auth;
using Swashbuckle.AspNetCore.Swagger;

namespace eFormAPI.Web.Controllers
{
    [Authorize]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IUserService userService,
            UserManager<EformUser> userManager,
            IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/auth/token")]
        public async Task<OperationResult> AuthenticateUser(LoginModel model)
        {
            return await _authService.AuthenticateUser(model);
        }

        [HttpGet]
        [Route("api/auth/logout")]
        public async Task<OperationResult> Logout()
        {
            var result = await _authService.LogOut();
            if (result.Success)
                Response.Cookies.Delete("Authorization");
            return new OperationResult(true);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/auth/two-factor-info")]
        public OperationDataResult<bool> TwoFactorAuthForceInfo()
        {
            return _authService.TwoFactorAuthForceInfo();
        }

        [HttpGet]
        [Route("api/auth/google-auth-info")]
        public async Task<OperationDataResult<GoogleAuthInfoModel>> GetGoogleAuthenticatorInfo()
        {
            return await _authService.GetGoogleAuthenticatorInfo();
        }

        [HttpPost]
        [Route("api/auth/google-auth-info")]
        public async Task<OperationResult> UpdateGoogleAuthenticatorInfo([FromBody] GoogleAuthInfoModel requestModel)
        {
            return await _authService.UpdateGoogleAuthenticatorInfo(requestModel);
        }

        [HttpDelete]
        [Route("api/auth/google-auth-info")]
        public async Task<OperationResult> DeleteGoogleAuthenticatorInfo()
        {
            return await _authService.DeleteGoogleAuthenticatorInfo();
        }

        /// <summary>
        /// Get secret key and barcode to enable GoogleAuthenticator for account
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [Route("api/auth/google-auth-key")]
        public async Task<OperationDataResult<GoogleAuthenticatorModel>> GetGoogleAuthenticator(
            [FromBody] LoginModel loginModel)
        {
            // check model
            if (!ModelState.IsValid)
            {
                return new OperationDataResult<GoogleAuthenticatorModel>(false,
                    LocaleHelper.GetString("InvalidUserNameOrPassword"));
            }

            return await _authService.GetGoogleAuthenticator(loginModel);
        }
    }
}