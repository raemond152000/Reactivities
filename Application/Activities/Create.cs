using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);  //just adding the activity in memory entity just tracking that were adding 
                                                            //an activity to our activities inside our context in memory

                await _context.SaveChangesAsync(); //only time we make changes when we go back and save changes

                
            }                                       
        }
    }
}