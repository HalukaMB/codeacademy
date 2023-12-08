import { ReactNode, createContext, useState } from 'react'

type Props = {
    children: ReactNode;
  };

export const UpdateContext = createContext({})
export const UpdateContextProvider= (props: Props)=> {
    const [trigger, setTrigger] = useState<string|null>(null);

    return(
        <UpdateContext.Provider value={{ trigger, setTrigger}}>
            {props.children}
        </UpdateContext.Provider>
    )
}

export default UpdateContext
