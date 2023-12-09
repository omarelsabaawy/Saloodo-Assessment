import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Grid, LinearProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
    color: 'white',
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
};
function ParcelDetails({ open, handleClose, order }) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" sx={{ textAlign: 'center' }} variant="h5">
                        Order Status
                    </Typography>
                    <Typography id="transition-modal-title" sx={{ textAlign: 'center', marginTop: '20px' }} variant="h6">
                        Order Id {order.parcelId}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        color='inherit'
                        sx={{ height: '15px', borderRadius: '1rem', marginTop: '25px' }}
                        value={
                            order.parcelStatus.delivered ? 100 :
                                order.parcelStatus.onTheWay ? 75 :
                                    order.parcelStatus.pickedUp ? 50 :
                                        order.parcelStatus.selected ? 25 : 0
                        } />
                    <Grid container sx={{ marginTop: '25px' }}>
                        <Grid item xs={6} md={9}>
                            <span style={{ fontSize: "16px" }}>Order Status:</span> {order.currentStatus}
                        </Grid>
                        <Grid sx={{ float: 'right' }} item xs={6} md={3}>
                            {order.parcelStatus.delivered ? 100 :
                                order.parcelStatus.onTheWay ? 75 :
                                    order.parcelStatus.pickedUp ? 50 :
                                        order.parcelStatus.selected ? 25 : 0} % finished
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px' }} item xs={6} md={9}>
                            Shipping by: {!order.biker ? "Not Assigned" : order.biker}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px' }} item xs={6} md={9}>
                            Pick up date: {!order.parcelTimeStamps.pickUpDate ? "Not Assigned" : order.parcelTimeStamps.pickUpDate}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px' }} item xs={6} md={9}>
                            Delivery date: {!order.parcelTimeStamps.deliveryDate ? "Not Assigned" : order.parcelTimeStamps.deliveryDate}
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ParcelDetails