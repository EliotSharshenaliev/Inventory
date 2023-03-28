import {Provider} from "./context/context";
import AppContainer from "./navigation_components/nav_container";

export default function App() {
    return (
        <Provider>
            <AppContainer/>
        </Provider>
    )
}


