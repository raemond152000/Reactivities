import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore    //type of Activity Store, class can also be used as types
}

export const store: Store = {
    activityStore: new ActivityStore()  //new instance of ActivityStore  
}

export const StoreContext = createContext(store);  //react context ; as we create new stores we're adding new stores or new instances of these stores into this object that would be available in react context

//we'll create a simple react hook that will allow us just to use our stores inside our components

export function useStore() {
    return useContext(StoreContext);
}