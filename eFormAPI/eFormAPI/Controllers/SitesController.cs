﻿using System;
using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using eFormAPI.Web.Infrastructure.Models;
using eFormCore;
using eFormShared;
using eFormApi.BasePn.Infrastructure;
using eFormApi.BasePn.Infrastructure.Helpers;
using eFormApi.BasePn.Infrastructure.Models.API;
using System.Web.Http.Cors;
using eFormAPI.Web.Infrastructure.Helpers.ExchangeTokenValidation;

namespace eFormAPI.Web.Controllers
{
    [Authorize]
    public class SitesController : ApiController
    {
        private readonly EFormCoreHelper _coreHelper = new EFormCoreHelper();

        [HttpGet]
        public OperationDataResult<List<SiteName_Dto>> Index()
        {
            Core core = _coreHelper.GetCore();
            var siteNamesDto = core.Advanced_SiteItemReadAll(false);

            return new OperationDataResult<List<SiteName_Dto>>(true, siteNamesDto);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/sites/index/exchange/")]
        [EnableCors(origins: "*", headers: "content-type", methods: "GET")]
        public OperationDataResult<List<SiteName_Dto>> IndexExternally(string token, string callerURL)
        {
            ExchangeIdToken idToken = new ExchangeIdToken(token);
            IdTokenValidationResult result = idToken.Validate(callerURL);
            if (result.IsValid)
            {
                Core core = _coreHelper.GetCore();
                var siteNamesDto = core.Advanced_SiteItemReadAll(false);

                return new OperationDataResult<List<SiteName_Dto>>(true, siteNamesDto);
            }
            else
            {
                return new OperationDataResult<List<SiteName_Dto>> (false,
                    LocaleHelper.GetString("ErrorWhileObtainSiteList"));
            }
        }

        [HttpGet]
        public OperationDataResult<SiteName_Dto> Edit(int id)
        {
            Core core = _coreHelper.GetCore();
            var siteNameDto = core.Advanced_SiteItemRead(id);

            return !siteNameDto.Equals(null)
                ? new OperationDataResult<SiteName_Dto>(true, siteNameDto)
                : new OperationDataResult<SiteName_Dto>(false);
        }

        [HttpPost]
        public OperationResult Update(SiteNameModel siteNameModel)
        {
            try
            {
                Core core = _coreHelper.GetCore();
                var siteNameDto = core.Advanced_SiteItemRead(siteNameModel.Id);

                if (!siteNameDto.Equals(null))
                {
                    core.Advanced_SiteItemUpdate(siteNameDto.SiteUId, siteNameModel.SiteName);
                    return new OperationResult(true);
                }
                return new OperationResult(false);
            }
            catch (Exception)
            {
                return new OperationResult(false, LocaleHelper.GetString("SiteParamCouldNotBeUpdated", siteNameModel.Id));
            }
        }

        [HttpGet]
        public OperationResult Delete(int id)
        {
            try
            {
                Core core = _coreHelper.GetCore();
                var siteDto = core.Advanced_SiteItemRead(id);
                SiteNameModel siteNameModel;

                if (!siteDto.Equals(null))
                {
                    Mapper.Initialize(cfg => cfg.CreateMap<SiteName_Dto, SiteNameModel>());
                    siteNameModel =
                        Mapper.Map<SiteName_Dto, SiteNameModel>(siteDto);
                }
                else
                {
                    return new OperationResult(false, LocaleHelper.GetString("SiteParamNotFound", id));
                }

                return core.Advanced_SiteItemDelete(id)
                    ? new OperationResult(true, LocaleHelper.GetString("SiteParamDeletedSuccessfully", siteNameModel.SiteName))
                    : new OperationResult(false, LocaleHelper.GetString("SiteParamCouldNotBeDeleted", siteNameModel.SiteName));
            }

            catch (Exception)
            {
                return new OperationDataResult<SiteNameModel>(false,
                    LocaleHelper.GetString("SiteParamCouldNotBeDeleted", id));
            }
        }
    }
}