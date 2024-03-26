import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from "react";
import Data from '../../../../../Data/Data';
import { handleDragOver } from '../../../../DragDrop/DragDropFunctions';
import NonEditableItems from '../../Items/NonEditableItems/NonEditableItems';
import Row from '../../Items/Row/Row';
import './DragContainer.css';

interface DragContainerProps {
  
}





const DragContainer: React.FC<DragContainerProps> = () => {
  const [isClicked, setIsClicked] = useState(false);

  
  return (
    <Box onDragOver={handleDragOver} component='section' sx={{ flexGrow:1,p: 2,borderRadius:'5px' }} className="dragContainer">
      <div className="dragElementRow">
       <Grid container columnSpacing={1} rowSpacing={1}>
       {Data.columns['col-1'].objectId.map(objectId => (
        <Grid key={Data.objects[objectId].id} item xs={3} sm={2} md={4} lg={3} xl={2}>
            <NonEditableItems content={Data.objects[objectId].content}/>
          </Grid>
        ))}
          <Row/>
        </Grid>      
      </div>
    </Box>
  );
};

export default DragContainer;
