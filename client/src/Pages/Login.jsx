import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup } from '@mui/material';
import { login } from '../Services/Auth/Authentication';
import { useUser } from '../Context/UserContext';
import Cookies from 'js-cookie';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState("");

    const { setUser } = useUser();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                username,
                password,
                userType
            };
            const result = await login(userData);
            if (result) {
                Cookies.set('userData', JSON.stringify(result), { expires: 1 });
                setUser(result);
                if (userType === 'User') {
                    navigate('/User/dashboard');
                } else {
                    navigate('/Captain/dashboard');
                }
            }
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#fef7e5' }}>
                    <LockOutlinedIcon fontSize='medium' style={{ color: 'black' }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    type='text'
                    value={username}
                    autoFocus
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormControl
                    fullWidth
                    margin='normal'
                    variant="outlined"
                    id='password'
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                >
                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Grid container style={{ justifyContent: "center" }}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <FormControlLabel value="User" control={<Radio />} label="User" />
                            <FormControlLabel value="Captain" control={<Radio />} label="Captain" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleLogin}
                >
                    Log In
                </Button>
                <Grid container style={{ justifyContent: "center" }}>
                    <Grid item>
                        <Link to="/signup"
                            style={{ textDecoration: "none" }}
                        >
                            Don't have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Login