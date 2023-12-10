import React, { useEffect, useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useUser } from '../../Context/UserContext';
import { listParcels } from '../../Services/Captains/ListParcels';
import ParcelDetails from '../ParcelDetails';
import SelectParcel from '../SelectParcel';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:8080";
var socket;

function BikerDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewOrder, setViewOrder] = useState(null);
    const [selectOrder, setSelectOrder] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);

    const handleOpen = (order) => {
        setViewOrder(order);
    };

    const handleClose = () => {
        setViewOrder(null);
    };

    const handleOpenSelectOrder = (order) => {
        setSelectOrder(order);
    };

    const handleCloseSelectOrder = () => {
        setSelectOrder(null);
    };

    const { user } = useUser();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("bikerConnected", user.id);
        socket.on("connection", () => setSocketConnected(true));
    }, [])

    useEffect(() => {
        socket.emit('bikerConnected', user.id);
        const handleUpdateOrders = (parcels) => {
            setOrders(parcels);
        };
        socket.on("updateOrders", handleUpdateOrders);

    }, []);

    useEffect(() => {
        const handleUpdateOrders = (recentParcels) => {
            console.log('Received updated orders:', recentParcels);
            console.log(recentParcels);
            setOrders(recentParcels);
        };
        socket.on('update recent orders after biker selection', handleUpdateOrders);
    }, [])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const result = await listParcels(user.token);
                setOrders(result);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch parcel data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user.token]);

    return (
        <Grid container sx={{ marginTop: 3 }}>
            <Grid item md={12} lg={11.5}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 460,
                        overflowY: 'auto',
                    }}
                >
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Recent Orders
                    </Typography>
                    {loading ? (
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                    ) : orders.length === 0 ? (
                        <Typography variant="subtitle1" color="textSecondary" align="center">
                            No orders available.
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {orders.map((order) => (
                                <Grid item xs={6} md={4} key={order.parcelId}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea onClick={() => handleOpen(order)}>
                                            <CardContent>
                                                <Typography gutterBottom sx={{ fontSize: '18px' }} component="div">
                                                    Order id <span style={{ fontSize: '16px', textDecoration: 'underline' }}>{order.parcelId}</span>
                                                </Typography>
                                                <Typography sx={{ fontSize: '16' }} color="text.secondary">
                                                    From: {order.pickUpAddress}
                                                </Typography>
                                                <Typography sx={{ fontSize: '16' }} color="text.secondary">
                                                    to: {order.dropOffAddress}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <Button color="success" variant="outlined" size="medium" onClick={() => handleOpenSelectOrder(order)}>
                                                Pick up the order
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Paper>
            </Grid>
            {viewOrder && (
                <ParcelDetails open={true} handleClose={handleClose} order={viewOrder} />
            )}
            {selectOrder && (
                <SelectParcel open={true} handleClose={handleCloseSelectOrder} order={selectOrder} />
            )}

        </Grid>
    );
}

export default BikerDashboard;