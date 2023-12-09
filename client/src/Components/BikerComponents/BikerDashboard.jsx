import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

function BikerDashboard() {
    return (
        <Grid container sx={{ marginTop: 3 }}>
            <Grid item md={12} lg={11.5} >
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 460,
                        overflowY: 'auto'
                    }}
                >
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Recent Orders
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom component="div">
                                            Order number
                                        </Typography>
                                        <Typography sx={{ fontSize: "16" }} color="text.secondary">
                                            From:
                                        </Typography>
                                        <Typography sx={{ fontSize: "16" }} color="text.secondary">
                                            to:
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button color='success' variant='outlined' size="medium">Select the order</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default BikerDashboard;
