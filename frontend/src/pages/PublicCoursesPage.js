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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { get_all_public_courses_api, get_profile_api, like_course_by_id_api, unlike_course_by_id_api } from '../utils/api';
import { Link } from 'react-router-dom';

// TODO: filter, sort, etc.

export default function PublicCoursesPage() {
    const [username, setUsername] = useState("");
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [likeMap, setLikeMap] = useState(new Map());
    const [lastPage, setLastPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(1);
    };

    const handleLike = (e, course) => {
        e.preventDefault();
        if (username === "") return;
        const newMp = new Map(likeMap);
        let likeCnt = likeMap.get(course.user + course.name);
        if (likeCnt === 2) {
            unlike_course_by_id_api(course.id).then(res => {
                if (res.status === 200) {
                    likeCnt++;
                    newMp.set(course.user + course.name, 0);
                    setLikeMap(newMp);
                }
            }
            ).catch((err) => {
                if (err.response) console.log(err.response);
            });
        } else if (likeCnt === 0) {
            like_course_by_id_api(course.id).then(res => {
                if (res.status === 200) {
                    likeCnt++;
                    newMp.set(course.user + course.name, 2);
                    setLikeMap(newMp);
                }
            }
            ).catch((err) => {
                if (err.response) console.log(err.response);
            });
        }
    };

    useEffect(() => {
        const mp = new Map();
        const getCourseData = async () => {
            const res = await get_all_public_courses_api();
            if (res.status === 200) {
                setCourses(res.data);
                setFilteredCourses(res.data);
                res.data.forEach((course) => {
                    mp.set(course.user + course.name, 0);
                });
                setLikeMap(mp);
            }
            if (localStorage.getItem('access_token') !== null) {
                get_profile_api().then((res) => {
                    if (res.status === 200) {
                        setUsername(res.data.username);
                        res.data.liked_courses.forEach((course) => {
                            mp.set(course.name, 2);
                        });
                        setLikeMap(mp);
                    }
                }
                ).catch((err) => {
                    console.log(err);
                });
            }
        };
        getCourseData();
    }, []); // one-time fetch

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
                        Public Courses
                    </Typography>
                    <Typography align="center" color="text.secondary" paragraph>
                        This page shows all public courses.
                        You can also public your course by simply
                        clicking the "is public" checkbox on the course
                        you want to public.
                        You can change pagination size to show more/less courses in one page.
                    </Typography>
                </Container>
            </Box>
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
                                    <Link to={"/course/" + card.id + "/view"}>
                                        <Button size="small">View</Button>
                                    </Link>
                                    <Rating
                                        value={likeMap.get(card.user + card.name) === 2 ? 1 : 0}
                                        precision={1}
                                        max={1}
                                        icon={<FavoriteIcon fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                        onClick={(e) => handleLike(e, card)}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    {/* center the page number */}
                    <Pagination count={lastPage} shape="rounded" page={page} onChange={(e, newPage) => handlePageChange(newPage)} />
                </Grid>
            </Container>
        </main>
    );
}