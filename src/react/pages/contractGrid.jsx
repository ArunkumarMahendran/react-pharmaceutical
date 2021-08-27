import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, Grid } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import { AgGridReact} from 'ag-grid-react';
import FormDialog from '../components/dialog';
import GetContract from '../functions/GetContract'
import DeleteContract from '../functions/DeleteContract'
import AddContract from '../functions/AddContract'
import UpdateContract from '../functions/UpdateContract'

export const ContractGridDetails = ({encodedCredential}) => {
  
     //STATE DECLARATION
    const [fetchData,setfetchData] = useState(null);
    const initialData={id:0
                       ,contractId:""
                       ,contractName:""
                       ,assignedBy:""
                       ,approvedDate:""                                
                       ,assignedDate:""                               
                       ,isCompanyApproved:false
                       ,isVendorContractApproved:false};
    
    let [data,setData] = useState(initialData);    
    
    //HOOKS FUNCTIONS
    useEffect(() => { 
        fetchContractData(); 
    }, []);

    const fetchContractData = async () => {
            const data = await GetContract({encodedCredential});           
            data!==null && setfetchData(data);
            };

    const handleUpdate= (updateData)=>
    {        
        setData(updateData);
        handleClickOpen();
    }
    


const handleDelete= async(id)=>
{
    const returnData = await DeleteContract({encodedCredential,id}); 
    if(returnData!==null)
        fetchContractData(); 
    
}

const handleAddorUpdateContract=async ()=>{       
    let returnData =null;     
    if(data.id!==0)    
        returnData = await UpdateContract({encodedCredential,data});     
    else {  

        returnData = await AddContract({encodedCredential,data});        
    }
    
    if(returnData!==null)
    {
        setData(initialData)
        handleClose();
        fetchContractData(); 
    }  
};

const[open,setOpen]=useState(false);

   const onModelChange=(e)=>
    {
        
        const {value,id}=e.target;
        setData({...data,[id]:value});            
    }

    const handleClickOpen = () =>
    {       
        setOpen(true);
    }
    const handleAddClickOpen = (event) =>
    {
        event.preventDefault();
        setData(initialData)
        setOpen(true);
    }

    const handleClose = () =>
    {
        setOpen(false);
    }
    

const ContractColumnNames=[
        
    {headerName:"Contract ID",field:"contractId"},
    {headerName:"Contract Name",field:"contractName"},
    {headerName:"Assigned By",field:"assignedBy"},
    {headerName:"Company Approved Date",field:"approvedDate"},
    {headerName:"Vendor Approved Date",field:"assignedDate"},
    {headerName:"Actions",field:"id", cellRendererFramework:(params)=>
    <div>
        <Button variant="outlined" color="primary" onClick={()=>handleUpdate(params.data)} >Update</Button>
        <Button variant="outlined" color="secondary" onClick={()=>handleDelete(params.value)} >Delete</Button>
    </div>}
];
const DefaultFilters={
    sortable:true,
    flex:1,
    filter:true,
    floatingFilter:true           
}


   return (
       <div className="ag-theme-alpine" style={{height: 500, width: 1300}}> 
        <Grid>
           <Button
                 variant="contained"
                  color="primary"
                  onClick={handleAddClickOpen}>Add Contract</Button></Grid>
           <AgGridReact
               rowData={fetchData}
               columnDefs={ContractColumnNames}
               defaultColDef={DefaultFilters} />
               <FormDialog 
                    open={open}
                    handleClose={handleClose} 
                    data={data} 
                    onModelChange= {onModelChange}
                    handleAddorUpdateContract={handleAddorUpdateContract}/>
      
       </div>
   );
};

 