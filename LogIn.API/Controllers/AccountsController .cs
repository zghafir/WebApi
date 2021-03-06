﻿using LogIn.API.AppConfig;
using LogIn.API.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net.Mail;
using System.Net;
using LogIn.API.Services;
using System.Web.Http.ModelBinding;
using System.Configuration;
using Newtonsoft.Json.Linq;

namespace LogIn.API.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {

        [Authorize]
        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)
            var user = await this.AppUserManagger.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();

        }

        [AllowAnonymous]
        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
        {
            if (!ModelState.IsValid)
            {
                string msg = "";

                foreach (ModelState error in ModelState.Values)
                {
                    foreach (ModelError item in error.Errors)
                    {
                        msg += item.ErrorMessage + " , "; 
                    }
                    
                }
                ModelState.AddModelError("msg", msg);
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = createUserModel.Username,
                Email = createUserModel.Email,
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,
                JoinDate = DateTime.Now.Date,
            };


            IdentityResult addUserResult = await this.AppUserManagger.CreateAsync(user, createUserModel.Password);

            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }

            string code = await this.AppUserManagger.GenerateEmailConfirmationTokenAsync(user.Id);

            var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code }));

            
            try
            {
                EmailService service = new EmailService();
                var body = "Merci de confirmer votre compte en cliquant sur le lien : " + callbackUrl;
                await service.sendmail("confirmer votre compte", body, user.Email);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, TheModelFactory.Create(user));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManagger.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                
                return Ok();
            }
            else
            {
                return GetErrorResult(result);
            }
        }

        [AllowAnonymous]
        [Route("passPerdu")]
        public async Task<IHttpActionResult> passPerdu(PassperdudBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                string msg = "";
                foreach (ModelState error in ModelState.Values)
                {
                    foreach (ModelError item in error.Errors)
                    {
                        msg += item.ErrorMessage + " , ";
                    }

                }
                ModelState.AddModelError("msg", msg);
                return BadRequest(ModelState);
            }

            var client = new WebClient();
            var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}",
                ConfigurationManager.AppSettings["as:reCaptchaSecret"], model.Code));
            var obj = JObject.Parse(result);
            var status = (bool)obj.SelectToken("success");
            if (!status)
            {
                return BadRequest();
            }
            var user = await this.AppUserManagger.FindByEmailAsync(model.Email);

            if (user == null || !(await this.AppUserManagger.IsEmailConfirmedAsync(user.Id)))
            {
                return Ok();
            }

            try
            {
                var code = await this.AppUserManagger.GeneratePasswordResetTokenAsync(user.Id);

                var callbackUrl = new Uri(Url.Link("ResetPassword", new { userId = user.Id, code = code }));
                

                EmailService service = new EmailService();
                var body = "Merci d'utiliser ce lien pour changer votre mot de pass : " + callbackUrl;
                await service.sendmail("Reset Password", body, user.Email);
            }

            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }

            return Ok();
        }

        [AllowAnonymous]
        [Route("ResetPassword")]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await AppUserManagger.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest();
            }
            var result = await AppUserManagger.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return InternalServerError();
        }


    }
}