import React, { useEffect, useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useUser } from '../../Context/UserContext';
import ParcelDetails from '../ParcelDetails';
import { listInProgressParcels } from '../../Services/Captains/ListInProgressOrder';

function InProgress() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewOrder, setViewOrder] = useState(null);

    const { user } = useUser();

    const handleOpen = (order) => {
        setViewOrder(order);
    };

    const handleClose = () => {
        setViewOrder(null);
    };

    useEffect(() => {
        const fetchInProgressOrders = async () => {
            try {
                setLoading(true);
                const result = await listInProgressParcels(user.token);
                console.log(result);
                setOrders(result);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch parcel data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchInProgressOrders();
    }, [user.token])

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
                        In Progress Orders
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
                                                <Typography sx={{ fontSize: '16' }} color="orange">
                                                    Status: {order.currentStatus}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <Button color="success" variant="outlined" size="medium">
                                                Order To-Do List
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

        </Grid>
    );
}

export default InProgress