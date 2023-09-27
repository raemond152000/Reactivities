import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity"

interface Props{
    activities: Activity[];
    deleteActivity: (id: string) => void;
    selectActivity: (id:string) => void;
}
export default function ActivityList({activities,selectActivity, deleteActivity}: Props){
    return(
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                                <Item.Extra>
                                    <Button onClick={() => selectActivity(activity.id)} floated='right'content='View' color='blue' />
                                    <Button onClick={() => deleteActivity(activity.id)} floated='right'content='Delete' color='red' />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Description>
                        </Item.Content>

                    </Item>
                ))}
                
            </Item.Group>
        </Segment>
    )
}