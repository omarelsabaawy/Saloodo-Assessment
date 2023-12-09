import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Checkbox, Grid, LinearProgress } from '@mui/material';

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

function OrderToDoList({ open, handleClose, order }) {
    const [orderPickedUp, setOrderPickedUp] = useState(order.parcelStatus.pickedUp);
    const [orderOnTheWay, setOrderOnTheWay] = useState(order.parcelStatus.onTheWay);
    const [orderDelivered, setOrderDelivered] = useState(order.parcelStatus.delivered);

    const handlePickedUp = async (e) =>{
        e.preventDefault();
        setOrderPickedUp(true);
    }

    const handleOnTheWay = async (e) =>{
        e.preventDefault();
        setOrderOnTheWay(true);
    }

    const handleDelivered = async (e) =>{
        e.preventDefault();
        setOrderDelivered(true);
    }

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
                        Order to-do list
                    </Typography>
                    <Typography id="transition-modal-title" sx={{ textAlign: 'center', marginTop: '20px' }} variant="h6">
                        Order Id {order.parcelId}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        color='inherit'
                        sx={{ height: '15px', borderRadius: '1rem', marginTop: '25px' }}
                        value={
                            order.parcelStatus.selected ? 25 :
                                order.parcelStatus.pickedUp ? 50 :
                                    order.parcelStatus.onTheWay ? 75 :
                                        order.parcelStatus.droppedOff ? 100 : 0
                        } />
                    <Grid container sx={{ marginTop: '25px' }}>
                        <Grid item xs={6} md={9}>
                            <span style={{ fontSize: "16px" }}>Order Status:</span> {order.currentStatus}
                        </Grid>
                        <Grid sx={{ float: 'right' }} item xs={6} md={3}>
                            {order.parcelStatus.selected ? 25 :
                                order.parcelStatus.pickedUp ? 50 :
                                    order.parcelStatus.onTheWay ? 75 :
                                        order.parcelStatus.droppedOff ? 100 : 0} % finished
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px', display: 'flex' }} item xs={6} md={9}>
                            <Checkbox
                                onClick={handlePickedUp}
                                checked={orderPickedUp}
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                        color: 'white',
                                    },
                                }}
                            />
                            {!orderPickedUp ? (
                                <span style={{ marginTop: 7 }}>Order Picked Up</span>
                            ) : (
                                <del style={{ marginTop: 7 }}>Order Picked Up</del>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px', display: 'flex' }} item xs={6} md={9}>
                            <Checkbox
                                onClick={handleOnTheWay}
                                checked={orderOnTheWay}
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                        color: 'white',
                                    },
                                }}
                            />
                            {!orderOnTheWay ? (
                                <span style={{ marginTop: 7 }}>Order on the way!</span>
                            ) : (
                                <del style={{ marginTop: 7 }}>Order on the way!</del>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '30px' }}>
                        <Grid sx={{ fontSize: '18px', display: 'flex' }} item xs={6} md={9}>
                            <Checkbox
                                onClick={handleDelivered}
                                checked={orderDelivered}
                                sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                        color: 'white',
                                    },
                                }}
                            />
                            {!orderDelivered ? (
                                <span style={{ marginTop: 7 }}>Order delivered.</span>
                            ) : (
                                <del style={{ marginTop: 7 }}>Order delivered.</del>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}

export default OrderToDoList