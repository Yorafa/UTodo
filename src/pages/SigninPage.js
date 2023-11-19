import {useState, useEffect} from 'react';
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
import { signin_api } from '../utils/api';

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [onTouch, setOnTouch] = useState(new Map());
    const [errMsg, setErrMsg] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signin_api({ username, password }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                window.location.href = '/';
            }
        }).catch((err) => {
            console.log(err);
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
                const errArr = []
                Object.entries(err.response.data).forEach(([key, value]) => {
                    errArr.push(`${key}: ${value}`)
                });
                setErrMsg(errArr);
                setOpen(true);
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
        mp.set("password", false);
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
                    Sign in
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
                        <Button onClick={handleClose}>Retry</Button>
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
                            setUsername(e.target.value);
                            handleTouch("username");
                        }}
                        helperText={
                            <>
                                Username should be at least 4 letters
                                <br />
                                Username should not be blank
                            </>
                        }
                    />
                    <TextField
                        error={onTouch.get("password") && password.length === 0}
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
                                Password should not be blank
                            </>
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}