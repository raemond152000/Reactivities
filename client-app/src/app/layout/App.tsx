
import { useEffect} from 'react'


import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();
 


  useEffect(() => {
   activityStore.loadActivites();
  }, [activityStore])

  //Refactored to Mobx Store in activityStore.ts

  /* function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  } */

  /* function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=> {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } */
      
   /*  
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) //if theres an id filter through existing array 
    : setActivities([...activities, {...activity, id:uuid()}]);    //to remove the activity we are updating and replace it with the activity that we pass in as parameter
    setEditMode(false);                     // and alternatively when we do not have an acitvity ID then create a new activity to add in array
    setSelectedActivity(activity); */
  /* } */

 /*  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !==id)]);
      setSubmitting(false);
      
    })
 
  } */

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />  {/* //need to pass down openForm because it is where Createactivity button is locate */}d
      <Container style={{ marginTop: '7em' }}>
    
        <ActivityDashboard/>
      </Container>

    </>




  )
}

export default observer (App); // this observer higher order function is going to return our App  
                                //component with additional "powers"
