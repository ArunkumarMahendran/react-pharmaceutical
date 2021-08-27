
import React,{useState,useEffect} from 'react'
import { encode as base64_encode} from 'base-64';
import {ContractGridDetails} from '../pages/contractGrid'
import GetContract from '../functions/GetContract'
import '../css/login/loginForm.css'

export const LoginForm = () => {
    //STATE DECLARATION 
    const [user,setUser]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(false);
    const [count,setCount]=useState(0);
    const [loading,setloading]=useState(false);
    const [renderContractGrid,setRenderContractGrid]=useState(false);
    const [encodedCredential,setEncodedCredential] =useState("");

    //HOOKS FUNCTIONS
    useEffect(() => { 
        if(count>0) 
            fetchContractData();
        }, [encodedCredential])
     
     // FUNCTION THAT TRIGGER SUBMIT FUNCTIONALITY
    const handleSubmit= async (event) => {
        event.preventDefault(); 
        const credential=base64_encode(`${user}:${password}`);
        setCount(1);
        setloading(true);
        setError(false);
        setEncodedCredential(credential);
    };    

    const fetchContractData = async () => {       
        const data = await GetContract({encodedCredential});  
        setloading(false);         
        if(data!==null)
        { 
            setError(false);
            setRenderContractGrid(true);       
        } 
        else
        {
            setError(true);
            setRenderContractGrid(false);             
        }
    };

    return (
        <>
         {!renderContractGrid && 
         <div className='container'>        
          <div className="login-item">
            <div className="logo">
                Welcome to Pharmaceutical !!
            </div>       
            <div className="logo">
                Sign In
            </div>

             {loading  && 
             <span className="loader">
                 Loading...... Please wait!!
              </span>}
              
             {error  && 
                <span className="my-notify-error">
                    You do not have access to this applictaion
                </span>}
           
           <form  className="form form-login" 
                  onSubmit={handleSubmit}>                
                <div className="form-field">
                    <label className="user" 
                            htmlFor="login-username">
                            <span className="hidden">
                                Username
                            </span>
                    </label>                
                    <input id="login-username"
                            type="text" 
                            className="form-input" 
                            onChange={e=>setUser(e.target.value)}
                            placeholder="Username" required>
                    </input>
                </div>
                
                <div className="form-field">
                    <label className="lock" 
                           htmlFor="login-password">
                        <span className="hidden">
                            Password
                        </span>
                    </label>
                    <input id="login-password" 
                           type="password" 
                           className="form-input"
                           onChange={e=>setPassword(e.target.value)} 
                           placeholder="Password" required>
                    </input>
                </div>
               
                <div className="form-field">
                    <input type="submit" 
                           value="Log in">
                    </input>
                </div>
            </form >
         </div>
         </div>
         }
                 
        <div className ="gridcontainer" >
        {renderContractGrid && 
        <ContractGridDetails 
          encodedCredential={encodedCredential} />} 
        </div>
        
    </>)
}
