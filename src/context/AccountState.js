import axios from "axios";
import slice from "lodash/slice";
import { useEffect, useState } from "react";
import AccountContext from "./AccountContext";
const AccountState = (props) =>{
   
    const initState = {
        allTransaction : [],
        currentPage : 1,
        recordPerPage : 500
    }

    const [state,setState] = useState(initState);

    const loadData = async () =>{
        try{
            const {data}  =  await axios.get('data.json');
            const {transactions:allTransaction} = data;
            setState({
                ...state,
                allTransaction,
            })
        }catch(e){
            console.log('Error');
        }
    }

    const goToPage = (page) =>{
        setState({
            ...state,
            currentPage : page
        })
        
    }

    useEffect(()=>{
        if(!state.allTransaction.length){
            loadData();
        }
        goToPage(1);
    },[state.allTransaction]);


    return (
        <AccountContext.Provider value={{state,goToPage}}>
            {props.children}
        </AccountContext.Provider>
    )
}
export default AccountState;