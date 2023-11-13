import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { get_all_public_courses_api } from '../utils/api';

// TODO: Paging of cards, search, filter, sort, etc.

export default function PublicCoursesPage() {
    const [courses, setCourses] = React.useState([]);
    const [filteredCourses, setFilteredCourses] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    React.useEffect(() => {
        const getCourseData = async () => {
            const res = await get_all_public_courses_api();
            if (res.status === 200) {
                setCourses(res.data.results);
                setFilteredCourses(res.data.results);
            }
        };
        getCourseData();
    }, []); // one-time fetch

    return (
        <main>
            {/* Hero unit */}
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
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
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
                        Previous Page
                    </Button>
                    {/* center the page number */}
                    <Typography variant="body2" sx={{ mx: 2, textAlign: 'center' }}>
                        Page: {page}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={filteredCourses.length < pageSize}
                    >
                        Next Page
                    </Button>
                    <TextField
                        label="Page Size"
                        variant="outlined"
                        type="number"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        sx={{ mx: 2 }}
                    />
                </Grid>
            </Container>
        </main>
    );
}