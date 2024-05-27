import React, {useState, useEffect,createContext} from "react";
import {getAllItems} from "../components/services/itemApi";




export const ShopContext=createContext(null);

const ShopContextProvider = (props) =>{
    const contextValue = {
        getAllItems: getAllItems
    }
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}
export default ShopContextProvider;
