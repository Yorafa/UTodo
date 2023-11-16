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
import { get_all_my_courses_api } from '../utils/api';
import Toolbar from '@mui/material/Toolbar';

// TODO: filter, sort, etc.

export default function AllCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [page, setPage] = useState(1);
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
                    sx={{ mx: 1 }}
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
                                    <Button size="small">View</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Prev Page
                    </Button>
                    {/* center the page number */}
                    <Typography variant="body2" sx={{ mx: 2, textAlign: 'center' }}>
                        Page: {page}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === lastPage}
                    >
                        Next Page
                    </Button>
                </Grid>
            </Container>
        </main>
    );
}