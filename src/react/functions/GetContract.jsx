

const GetContract = async ({encodedCredential}) => {
     
    const url = 'http://localhost:49317/api/Contract/'
    let headers = new Headers();        
        headers.set('Authorization', 'Basic '+ encodedCredential);       
        headers.set('content-type', 'application/json');
        headers.set('Accept', 'application/json');
        const returnData =  await fetch(url,{method:"GET",headers:headers})
                          .then(response=>{
                            if(response.ok)
                            {
                                return response.json()
                            }                            
                            throw response;})
                      .then(data=>{
                             return data;                                                                        
                        })
                        .catch(error=>{
                            return null;                           
                        });
                        return returnData;
}

export default GetContract

