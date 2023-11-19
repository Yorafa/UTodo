import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { signup_api } from '../utils/api';


export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [onTouch, setOnTouch] = useState(new Map());
    const [errMsg, setErrMsg] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignupSuccess = () => {
        window.location.href = "/signin";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signup_api({ username, email, first_name:firstname, last_name:lastname, password, password_confirmation }).then((res) => {
            if (res.status === 201) {
                console.log('Sign Up successful');
                setErrMsg(["Sign Up successful, please login"]);
                setOpen(true);
            } else {
                console.error('Sign Up failed');
            }
        }).catch((err) => {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
                const errArr = []
                Object.entries(err.response.data).forEach(([key, value]) => {
                    errArr.push(`${key}: ${value}`)
                });
                setErrMsg(errArr);
                setOpen(true);
            }else{
                console.log(err);
            }
        });
    };

    const handleTouch = (key) =>{
        const mp = new Map(onTouch);
        mp.set(key, true);
        setOnTouch(mp);
    };

    useEffect(() => {
        const mp = new Map();
        mp.set("username", false);
        mp.set("email", false);
        mp.set("password", false);
        mp.set("password_confirmation", false);
        setOnTouch(mp);
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        {errMsg.map((err) => (
                            <DialogContentText id="alert-dialog-description" key={err}>
                                {err}
                            </DialogContentText>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        {errMsg[0] === "Sign Up successful, please login"? <Button onClick={handleSignupSuccess}>Okay</Button>
                        :<Button onClick={handleClose}>Retry</Button>}
                    </DialogActions>
                </Dialog>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={onTouch.get("username") && username.length < 4}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            handleTouch("username");
                        }}
                        helperText="Username should be at least 4 letters"
                    />
                    <TextField
                        error={onTouch.get("email") && !email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            handleTouch("email");
                        }}
                        helperText="Email should be valid in xx@xx.xx format"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <TextField
                    
                        error={onTouch.get("password") && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            handleTouch("password");
                        }}
                        helperText={
                            <>
                                Password should be at least 8 letters,
                                <br />
                                at least one uppercase letter,
                                <br />
                                at least one lowercase letter, and one special character
                            </>
                        }
                    />
                    <TextField
                        error={onTouch.get("password_confirmation") && password_confirmation !== password}
                        margin="normal"
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Password Confirmation"
                        type="password"
                        id="password_confirmation"
                        autoComplete="current-password"
                        value={password_confirmation}
                        onChange={(e) => {
                            setPasswordConfirmation(e.target.value)
                            handleTouch("password_confirmation");
                        }}
                        helperText="Password confirmation should match password"
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                {"Already have account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}