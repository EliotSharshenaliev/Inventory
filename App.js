import {Provider} from "./context/context";
import {AppContainer} from "./navigation_components/nav_container";
import {LocationProvider} from "./context/location_context";

export default function App() {
    return (
        <Provider>
            <LocationProvider>
                <AppContainer/>
            </LocationProvider>
        </Provider>
    )
}


