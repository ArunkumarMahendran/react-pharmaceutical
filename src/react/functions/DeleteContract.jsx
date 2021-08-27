const DeleteContract = async ({encodedCredential,id}) => {
     
    const url = `http://localhost:49317/api/Contract/${id}`
    let headers = new Headers();        
        headers.set('Authorization', 'Basic '+ encodedCredential);       
        headers.set('content-type', 'application/json');
        headers.set('Accept', 'application/json');
      
        const confirm = window.confirm(`Are you sure to delete the contract.`);
    
        const returnData = confirm &&
         await fetch(url,{method:"DELETE",headers:headers})
                          .then(response=>{
                            if(response.ok)
                            {
                                console.log("Delete Invoked")
                                return response.json()
                            }                            
                            throw response;})
                      .then(data=>{
                             return data;                                                                        
                        })
                        .catch(error=>{
                            console.log("Delete Exception")
                            return null;                           
                        });
                        return returnData;
}

export default DeleteContract