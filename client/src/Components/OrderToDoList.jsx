import React, { useEffect, useState } from 'react';
import { useUser } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Checkbox, Grid, LinearProgress } from '@mui/material';
import { UpdateParcelStatus } from '../Services/Captains/UpdateParcelStatus';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:8080";
var socket;

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
    const [currentOrderDetails, setCurrentOrderDetails] = useState(order);
    const [orderPickedUp, setOrderPickedUp] = useState(currentOrderDetails.parcelStatus.pickedUp);
    const [orderOnTheWay, setOrderOnTheWay] = useState(currentOrderDetails.parcelStatus.onTheWay);
    const [orderDelivered, setOrderDelivered] = useState(currentOrderDetails.parcelStatus.delivered);
    const [socketConnected, setSocketConnected] = useState(false);


    const { user } = useUser();

    useEffect(() => {
        setCurrentOrderDetails(order);
        setOrderPickedUp(order.parcelStatus.pickedUp);
        setOrderOnTheWay(order.parcelStatus.onTheWay);
        setOrderDelivered(order.parcelStatus.delivered);
    }, [order]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("bikerConnected", user.id);
        socket.on("connection", () => setSocketConnected(true));
    }, []);

    const handlePickedUp = async (e) => {
        e.preventDefault();
        try {
            // Update the backend
            const { success, updatedParcel } = await UpdateParcelStatus('pickedUp', currentOrderDetails.parcelId, user.token);

            if (success) {
                // Update local state if the backend update was successful
                socket.emit('to do list action', (user.id, currentOrderDetails.senderId));
                setOrderPickedUp(true);
                setCurrentOrderDetails(updatedParcel);
            }
        } catch (error) {
            // Handle errors
            console.error("Error updating parcel status:", error);
        }
    }

    const handleOnTheWay = async (e) => {
        e.preventDefault();
        try {
            // Update the backend
            const { success, updatedParcel } = await UpdateParcelStatus('onTheWay', currentOrderDetails.parcelId, user.token);

            if (success) {
                // Update local state if the backend update was successful
                socket.emit('to do list action', (user.id, order.senderId));
                setOrderOnTheWay(true);
                setCurrentOrderDetails(updatedParcel);
            }
        } catch (error) {
            // Handle errors
            console.error("Error updating parcel status:", error);
        }
    }

    const handleDelivered = async (e) => {
        e.preventDefault();
        try {
            // Update the backend
            const { success, updatedParcel } = await UpdateParcelStatus('delivered', currentOrderDetails.parcelId, user.token);

            if (success) {
                // Update local state if the backend update was successful
                setOrderDelivered(true);
                setCurrentOrderDetails(updatedParcel);
            }
        } catch (error) {
            // Handle errors
            console.error("Error updating parcel status:", error);
        }
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
                        Order Id {currentOrderDetails.parcelId}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        color='inherit'
                        sx={{ height: '15px', borderRadius: '1rem', marginTop: '25px' }}
                        value={
                            currentOrderDetails.parcelStatus.delivered ? 100 :
                                currentOrderDetails.parcelStatus.onTheWay ? 75 :
                                    currentOrderDetails.parcelStatus.pickedUp ? 50 :
                                        currentOrderDetails.parcelStatus.selected ? 25 : 0
                        }
                    />
                    <Grid container sx={{ marginTop: '25px' }}>
                        <Grid item xs={6} md={9}>
                            <span style={{ fontSize: "16px" }}>Order Status:</span> {currentOrderDetails.currentStatus}
                        </Grid>
                        <Grid sx={{ float: 'right' }} item xs={6} md={3}>
                            {
                                currentOrderDetails.parcelStatus.delivered ? 100 :
                                    currentOrderDetails.parcelStatus.onTheWay ? 75 :
                                        currentOrderDetails.parcelStatus.pickedUp ? 50 :
                                            currentOrderDetails.parcelStatus.selected ? 25 : 0
                            } % finished
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