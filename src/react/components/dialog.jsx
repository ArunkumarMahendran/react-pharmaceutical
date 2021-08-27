import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose
    ,data,onModelChange,handleAddorUpdateContract}) {
         
  const {id,contractId,contractName,assignedBy,
    approvedDate,assignedDate} = data;
  return (
    <div>      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">
            {id !== 0 ?"Update User":"Create New Contract"}
        </DialogTitle>
        <DialogContent>
         <form>
             <TextField id="contractId"  
                        onChange={(e)=>onModelChange(e)}
                        value={contractId}
                        placeholder="Enter a Contract Id" 
                        lable ="contractId" 
                        variant="outlined" 
                        margin="dense" 
                        fullWidth/>

             <TextField id="contractName"   
                        onChange={(e)=>onModelChange(e)}
                        value={contractName} 
                        placeholder="Enter a Contract Name" 
                        lable ="contractName" 
                        variant="outlined" 
                        margin="dense"  
                        fullWidth/>

             <TextField id="assignedBy"
                        onChange={(e)=>onModelChange(e)} 
                        value={assignedBy} 
                        placeholder="Enter a Assigned By" 
                        lable ="assignedBy" 
                        variant="outlined" 
                        margin="dense"  
                        fullWidth/>

             <TextField id="approvedDate" 
                        onChange={(e)=>onModelChange(e)}
                        value={approvedDate} 
                        placeholder="Enter a Approved Date" 
                        lable ="approvedDate" 
                        variant="outlined" 
                        margin="dense"  
                        fullWidth/>
             
             <TextField id="assignedDate" 
                        onChange={(e)=>onModelChange(e)} 
                        value={assignedDate} 
                        placeholder="Enter a Vendor Approved Date"
                        lable ="assignedDate"
                        variant="outlined" 
                        margin="dense"  
                        fullWidth/>              
         </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} 
                  color="secondary">
            Cancel
          </Button>
          <Button color="primary" 
                  onClick={handleAddorUpdateContract}>
              {id !== 0 ?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
