﻿using System;
using System.Collections.Generic;
using System.Web.Http;
using eFormShared;
using eFormApi.BasePn.Infrastructure;
using eFormApi.BasePn.Infrastructure.Helpers;
using eFormApi.BasePn.Infrastructure.Models.API;

namespace eFormAPI.Web.Controllers
{
    [Authorize]
    public class UnitsController : ApiController
    {
        private readonly EFormCoreHelper _coreHelper = new EFormCoreHelper();

        [HttpGet]
        public OperationDataResult<List<Unit_Dto>> Index()
        {
            var core = _coreHelper.GetCore();
            var unitsDto = core.Advanced_UnitReadAll();
            return new OperationDataResult<List<Unit_Dto>>(true, unitsDto);
        }

        [HttpGet]
        public OperationDataResult<Unit_Dto> RequestOtp(int id)
        {
            try
            {
                var core = _coreHelper.GetCore();
                var unitDto = core.Advanced_UnitRequestOtp(id);
                return new OperationDataResult<Unit_Dto>(true, LocaleHelper.GetString("NewOTPCreatedSuccessfully"), unitDto);
            }
            catch (Exception)
            {
                return new OperationDataResult<Unit_Dto>(false, LocaleHelper.GetString("UnitParamOTPCouldNotCompleted", id));
            }
        }
    }
}