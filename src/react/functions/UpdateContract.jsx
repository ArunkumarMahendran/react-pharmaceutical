import moment from 'moment';
const UpdateContract = async ({encodedCredential,data}) => {
     
    let contractData= {
        "id":data.id,
        "assignedBy": data.assignedBy,
        "contractId": data.contractId===""?0:parseInt(data.contractId),
        "contractName": data.contractName,
        "approvedDate": data.approvedDate===""? null:        
                        moment(data.approvedDate)
                        .format("MM/DD/yyyy"),
        "assignedDate": data.assignedDate===""?null:
                        moment(data.assignedDate)
                        .format("MM/DD/yyyy")
                        }  

    const url = `http://localhost:49317/api/Contract/`
    let headers = new Headers();        
        headers.set('Authorization', 'Basic '+ encodedCredential);       
        headers.set('content-type', 'application/json');
        headers.set('Accept', 'application/json');
      
        const returnData =  await fetch(url,
                                        {method:"PUT",
                                        headers:headers,
                                        body:JSON.stringify(contractData)})
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

export default UpdateContract