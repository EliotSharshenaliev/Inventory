import React, { useCallback, useState } from 'react';
import { useService } from '../db/services/service';

type LocationType = {
    [key: string]: any;
};

type LocationContextType = {
    get_list: () => Promise<void>;
    locations: LocationType[] | undefined;
    setSelectedLocations: React.Dispatch<React.SetStateAction<LocationType[]>>;
    selectedLocations: LocationType[];
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>> | null;
    modalVisible: boolean
};

export const LocationContext = React.createContext<LocationContextType>({
    get_list: async () => {},
    locations: undefined,
    setSelectedLocations: () => {},
    selectedLocations: [],
    setModalVisible: null,
    modalVisible: null
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [locations, setLocations] = useState<LocationType[] | undefined>(undefined);
    const [selectedLocations, setSelectedLocations] = useState<LocationType[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { get_list_of_locations } = useService();

    const get_list = useCallback(async () => {
        const response = await get_list_of_locations();
        setLocations(response);
    }, [get_list_of_locations]);

    return (
        <LocationContext.Provider value={{ get_list, locations, setSelectedLocations, selectedLocations, setModalVisible, modalVisible }}>
            {children}
        </LocationContext.Provider>
    );
}
