import { createContext, useState } from "react";

const DataProvider = props => {

    const [plan, setPlan] = useState({size:0, total:0, exercise: {}});
    return(
        <DataContext.Provider value={{'plan': plan, 'setPlan': setPlan}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;
export const DataContext = createContext();