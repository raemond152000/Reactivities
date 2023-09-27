
import { useEffect, useState } from 'react'

import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data)
      })
  }, [])

  function handleSelectActivity(id:string){
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
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) //if theres an id filter through existing array 
    : setActivities([...activities, {...activity, id:uuid()}]);    //to remove the activity we are updating and replace it with the activity that we pass in as parameter
    setEditMode(false);                     // and alternatively when we do not have an acitvity ID then create a new activity to add in array
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !==id)])
  }
  return (
    <>
      <NavBar openForm={handleFormOpen}/>  {/* //need to pass down openForm because it is where Createactivity button is locate */}d
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>

    </>




  )
}

export default App
