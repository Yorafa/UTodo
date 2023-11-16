import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { get_course_by_id_api, get_all_assessments_of_course_by_id_api } from '../utils/api';
import Toolbar from '@mui/material/Toolbar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';


// TODO: filter, sort, etc.

export default function CoursesPage() {
    const [courseInfo, setCourseInfo] = useState({});
    const [assessments, setAssessments] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const { courseId } = useParams();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        const getCourseData = async () => {
            const res = await get_course_by_id_api(courseId);
            if (res.status === 200) {
                console.log(res.data)
                setCourseInfo(res.data);
            }
            const assRes = await get_all_assessments_of_course_by_id_api(courseId);
            if (assRes.status === 200) {
                setAssessments(assRes.data);
            }
        };
        getCourseData();
    }, [courseId]); // one-time fetch

    // useEffect(() => {
    //     const filtered = assessment.filter((course) =>
    //         course.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredAssessment(filtered);
    // }, [assessment, searchTerm]);

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
                        {courseInfo.name}
                    </Typography>
                    <Typography align="center" color="text.secondary" paragraph>
                        {courseInfo.university + " " + courseInfo.year + " " + courseInfo.semester}
                    </Typography>
                    <Typography align="center" color="text.secondary" paragraph>
                        {courseInfo.description}
                    </Typography>
                </Container>
            </Box>
            {/* TODO: Assessment List and their grade */}
            <Container sx={{ py: 8 }} maxWidth="md">
                <Toolbar />
                <Grid container spacing={1}>
                    <div>
                        <Accordion disabled>
                            <AccordionSummary
                                aria-controls="paneldisablea-content"
                                id="paneldisablea-header"
                            >
                                <Typography sx={{ width: '25%', flexShrink: 0 }}>
                                    Type:Detail
                                </Typography>
                                <Typography sx={{ width: '42%', flexShrink: 0 }}>
                                % of Grade : % of Course
                                </Typography>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Due Date
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    This details is used to fill up so that all following assessment content
                                    can align in the max width they can.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        {assessments.map((assessment, index) => (
                            <Accordion key={"assessment" + assessment.id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {assessment.assessment_type + ":" + assessment.title}
                                    </Typography>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {assessment.grade_total !== 0? (assessment.grade_now/assessment.grade_total + '%') : 0 + '%'} : 
                                        {assessment.grade_total !== 0 ? (assessment.grade_now/assessment.grade_total * assessment.weight + '%') : 0 + '%'}
                                    </Typography>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {assessment.due_date.slice(0, 10) + ':' + assessment.due_date.slice(11, 16)}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>

                                    </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                    <Typography>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </Grid>
            </Container>
        </main>
    );
}