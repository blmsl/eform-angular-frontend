﻿using System.ComponentModel.DataAnnotations;

namespace eFormAPI.Web.Infrastructure.Models.Settings.Initial
{
    public class ConnectionStringSDKModel
    {
        [Required]
        public string Source { get; set; }
        [Required]
        public string Catalogue { get; set; }
        [Required]
        public string Auth { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
