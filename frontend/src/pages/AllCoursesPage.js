import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@mui/material';
import { get_all_my_courses_api, delete_course_by_id_api } from '../utils/api';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';


// TODO: filter, sort, etc.

export default function AllCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteBlocked, setDeleteBlocked] = useState(-1);
    const [open, setOpen] = useState(false);
    const [errMsg, setErrMsg] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(1);
    };

    const handleDelete = () => {
        if (deleteBlocked === -1) return;
        setOpen(false);
        delete_course_by_id_api(deleteBlocked).then((res) => {
            if (res.status === 204) {
                const msgArr = ["You are successfully delete the course!"]
                setErrMsg(msgArr);
                setOpen(true);
                setDeleteBlocked(-1);
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

    useEffect(() => {
        const getCourseData = async () => {
            const res = await get_all_my_courses_api();
            if (res.status === 200) {
                setCourses(res.data);
                setFilteredCourses(res.data);
            }
        };
        getCourseData();
    }, []); // one-time fetch

    useEffect(() => {
        const getCourseData = async () => {
            const res = await get_all_my_courses_api();
            if (res.status === 200) {
                setCourses(res.data);
                setFilteredCourses(res.data);
            }
        };
        getCourseData();
    }, []);

    useEffect(() => {
        const filtered = courses.filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (pageSize <= 0) setPageSize(1);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCourses = filtered.slice(startIndex, endIndex);
        setLastPage(Math.ceil(filtered.length / pageSize));
        setFilteredCourses(paginatedCourses);
    }, [courses, page, pageSize, searchTerm]);

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        My Courses
                    </Typography>
                    <Typography align="center" color="text.secondary" paragraph>
                        This page shows your courses.
                        You can also public your course by simply
                        clicking the "is public" checkbox on the course
                        you want to public.
                        You can change pagination size to show more/less courses in one page.
                    </Typography>
                </Container>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Warning
                </DialogTitle>
                <DialogContent>
                    {errMsg.map((err) => (
                        <DialogContentText id="alert-dialog-description" key={err}>
                            {err}
                        </DialogContentText>
                    ))}
                </DialogContent>
                <DialogActions>
                    {deleteBlocked === -1?
                        <Button onClick={(e) => {window.location.reload();handleClose();}}>OK</Button>
                    :<>
                        <Button onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleClose}>No</Button>
                    </>
                    }
                </DialogActions>
            </Dialog>
            <Container sx={{ py: 8 }} maxWidth="md">
                <TextField
                    label="Search Courses"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <TextField
                    label="Pagination Size"
                    variant="outlined"
                    type="number"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    sx={{ mx: 7 }}
                />
                <Link to="/course/form/create/-1">
                    <Button variant="contained" size="large" sx={{ py: 1.9 }}>
                        Create a New Course
                    </Button>
                </Link>
                <Toolbar />
                <Grid container spacing={4}>
                    {filteredCourses.map((card) => (
                        <Grid item key={"course" + card.id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.year + " " + card.semester + " " + card.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h3">
                                        {card.university}
                                    </Typography>
                                    <Typography>
                                        {card.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={"/course/" + card.id}>
                                        <Button size="small">View</Button>
                                    </Link>
                                    <Link to={"/course/form/edit/" + card.id}>
                                        <Button size="small">Edit</Button>
                                    </Link>
                                    <Link>
                                        <Button size="small" onClick={(e) => {
                                            setDeleteBlocked(card.id);
                                            setErrMsg(["You are trying to delete your course. Are you sure?"]);
                                            setOpen(true);
                                        }}>Delete</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    <Pagination count={lastPage} shape="rounded" page={page} onChange={(e, newPage) => handlePageChange(newPage)} />
                </Grid>
            </Container>
        </main>
    );
}