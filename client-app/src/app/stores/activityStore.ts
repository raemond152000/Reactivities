import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';


export default class ActivityStore {    
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this, {     //"this" word mean that this makeObservable function is gonna be use insde this ActivityStore  class

        })
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
         Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivites = async () => {
 
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
               
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.setLoadingInitial(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        }
    }
    //Alternative way of updating observable from inside the action is create a new action and then use that iniside the loadActivities action
   //this is happening inside its own action we don't need to wrap it in "runInAction"
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
 
    openForm = (id?: string) => {   //if someone chooses to edit the activity, then we're going to pass in the ID to this particular method
        id ? this.selectActivity(id) : this.cancelSelectedActivity();          // but if they're just creating an activity, then we don't need an ID, so we'll just make that particular id parameter optional 
        this.editMode = true;
    }       //if we do have an ID, this slectActivty and pass in the id and the opposite case will be cancel selected activity just in case they were editing an activity before or displaying an activity before they decided to create an activity 

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })         //because this is going to happen inside the next tick
        }
    }

    updateActivity =async (activity:Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            
        }
        
    }

    deleteActivity = async(id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity;   //optional chaining parameter just in case its undefined
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction (() => {
                this.loading =false;
            })
        }
    }
}