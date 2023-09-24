
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
      
      
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>>GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]  //api/activities/fdshjsjsjdf
        public async Task<ActionResult<Activity>> GetActivities(Guid id)
        {
           return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]  // when we create resources in an API we use HTTpost 

        public async Task<IActionResult> CreateActivity(Activity activity) //IactionResult gives us access to http response type such as retunr okay 
                                         //retrn bad request  or return not found   
        {
            await Mediator.Send(new Create.Command {Activity = activity});
            return Ok();
        }  

        [HttpPut("{id}")] //for updating resources

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id =id;

            await Mediator.Send(new Edit.Command {Activity = activity});

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command{ Id = id});
            return Ok();
        }
    }
}