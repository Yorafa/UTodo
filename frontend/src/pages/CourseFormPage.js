import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Checkbox, Typography, Container, Grid, TextField, Box } from '@mui/material';
import { InputLabel, MenuItem, Select, FormControl, FormControlLabel } from '@mui/material';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { create_course_api, update_course_by_id_api, get_course_by_id_api } from '../utils/api';
import { useParams } from 'react-router-dom';

const semesterList = ["Fall", "Winter", "Summer"];

export default function CourseFormPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [university, setUniversity] = useState("");
    const [year, setYear] = useState(2023);
    const [semester, setSemester] = useState(semesterList[0]);
    const [isPublic, setIsPublic] = useState(false);
    const [isOnList, setIsOnList] = useState(false);
    const [onTouch, setOnTouch] = useState(new Map());
    const [errMsg, setErrMsg] = useState([]);
    const [open, setOpen] = useState(false);

    const { view, courseId } = useParams();

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (name.length < 1) return;
        const data = {
            name,
            description,
            university,
            year,
            semester,
            is_public: isPublic,
            is_on_list: isOnList
        };
        if (view === "create") {
            create_course_api(data).then((res) => {
                const msgArr = ["You are successfully create/update the course!"]
                setErrMsg(msgArr);
                setOpen(true);
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
        } else if (view === "edit") {
            update_course_by_id_api(courseId, data).then((res) => {
                const msgArr = ["You are successfully create/update the course!"]
                setErrMsg(msgArr);
                setOpen(true);
            }).catch((err) => {
                console.log(err);
                if (err.response) {
                    console.log(err.response.status);
                    console.log(err.response.data);
                    const errArr = []
                    Object.entries(err.response.data).forEach(([key, value]) => {
                        errArr.push(`${key}: ${value}`)
                    }
                    );
                    setErrMsg(errArr);
                    setOpen(true);
                }
            })
        }
    };

    const handleSignupSuccess = () => {
        window.location.href = "/myallcourses";
    };

    const handleTouch = (key) => {
        const mp = new Map(onTouch);
        mp.set(key, true);
        setOnTouch(mp);
    };

    useEffect(() => {
        const mp = new Map();
        mp.set("name", false);
        setOnTouch(mp);
        if (view === "edit") {
            get_course_by_id_api(courseId).then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                setSemester(res.data.semester);
                setUniversity(res.data.university)
                setYear(res.data.year);
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
        }
    }, [courseId, view]);

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
                <Typography component="h1" variant="h5">
                    {view === "create" ? <>Create Your Course</> : <>Edit Your Course</>}
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
                        {errMsg[0] === "You are successfully create/update the course!" ? <Button onClick={handleSignupSuccess}>Okay</Button>
                            : <Button onClick={handleClose}>Retry</Button>}
                    </DialogActions>
                </Dialog>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={onTouch.get("name") && name.length < 1}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            handleTouch("name");
                        }}
                        helperText={
                            <>
                                name should not be blank
                            </>
                        }
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="description"
                        id="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="university"
                        id="university"
                        value={university}
                        onChange={(e) => {
                            setUniversity(e.target.value)
                        }}
                    />
                    <Box p={1}></Box>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="simple-select"
                                    value={semester}
                                    label="Semester"
                                    onChange={(e) => { setSemester(e.target.value) }}
                                >
                                    {semesterList.map((sem) => (
                                        <MenuItem value={sem} key={"semester:" + sem}>{sem}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="year"
                                id="year"
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box p={1}></Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControlLabel control={
                                <Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                            } label="Is Public" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel control={<Checkbox checked={isOnList} onChange={(e) => setIsOnList(e.target.checked)} />} label="Is On List" />
                        </Grid>
                    </Grid>
                    <Box p={1}></Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" color="primary" onClick={handleSignupSuccess}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" color="secondary" onClick={(e) => handleSubmit()}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}