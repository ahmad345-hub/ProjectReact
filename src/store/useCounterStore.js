import { create } from "zustand";

 const useCounterStore=create((set)=>
    ({
        
        count:0,
        counter:()=>{
set((state)=>({
    count:state.count+1
}))
        }
    })
);
export default useCounterStore; 