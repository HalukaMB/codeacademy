import { ReactNode, createContext, useState } from 'react'

type Props = {
    children: ReactNode;
  };

type UpdateContextType={
    trigger: number;
    setTrigger: React.Dispatch<React.SetStateAction<number>>
}

export const UpdateContext = createContext<UpdateContextType>(null as unknown as UpdateContextType);
export const UpdateContextProvider= (props: Props)=> {
    const [trigger, setTrigger] = useState<number>(0);

    return(
        <UpdateContext.Provider value={{ trigger, setTrigger}}>
            {props.children}
        </UpdateContext.Provider>
    )
}

export default UpdateContext

