import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean;    //means were going to darken the background or give it a lighter background as when loading a component
    content?: string; //add loading text
}
export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}