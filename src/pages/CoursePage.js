import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssessmentDialog from '../components/AssessmentDialog';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { get_course_by_id_api, get_all_assessments_of_course_by_id_api, delete_assessment_by_id_api } from '../utils/api';


// TODO: filter, sort, etc.

export default function CoursesPage() {
    const [courseInfo, setCourseInfo] = useState({});
    const [assessments, setAssessments] = useState([]);
    const { courseId, view } = useParams();

    const handleDeleteAssessment = (assessmentId) => {
        delete_assessment_by_id_api(assessmentId).then((res) => {
            if (res.status === 204) {
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        const getCourseData = async () => {
            const res = await get_course_by_id_api(courseId);
            if (res.status === 200) {
                setCourseInfo(res.data);
            }
            const assRes = await get_all_assessments_of_course_by_id_api(courseId);
            if (assRes.status === 200) {
                setAssessments(assRes.data);
            }
        };
        getCourseData();
    }, [courseId]); // one-time fetch

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
                    <Typography align="center" color="text.secondary" paragraph>
                        {"You currently have " + assessments.length + " assessments."}
                    </Typography>
                    <Typography align="center" color="text.secondary" paragraph>
                        {"You currently have " + courseInfo.grade_now + " out of " + courseInfo.grade_total}
                    </Typography>
                </Container>
            </Box>
            {/* TODO: Assessment List and their grade */}
            <Container sx={{ py: 8 }} maxWidth="md">
                {view === "view" ? <></> : <AssessmentDialog view="create" courseId={courseInfo.id} />}
                <Toolbar />
                <Grid container spacing={1}>
                    <div>
                        <Accordion disabled>
                            <AccordionSummary
                                aria-controls="paneldisablea-content"
                                id="paneldisablea-header"
                            >
                                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                                    Type:Detail
                                </Typography>
                                {view === "view" ? <></> : <Typography sx={{ width: '45%', flexShrink: 0 }}>
                                    Grade : % of Course : Weight
                                </Typography>}
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
                                    {view === "view" ? <></> : <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {assessment.grade_total !== 0 ? ((assessment.grade_now / assessment.grade_total).toFixed(2) * 100 + '%') : 0 + '%'}
                                        {" "} : {" "}
                                        {assessment.grade_total !== 0 ? (((assessment.grade_now / assessment.grade_total).toFixed(2) * assessment.weight) + '%') : 0 + '%'}
                                        {" "} : {assessment.weight + '%'}
                                    </Typography>}
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {assessment.due_date.slice(0, 10) + ':' + assessment.due_date.slice(11, 16)}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {"Description: " + assessment.description}
                                    </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                    <Typography>
                                        {"Grade: This " + assessment.assessment_type + " weighted " + assessment.weight
                                            + " and you get " + assessment.grade_now + " out of " + assessment.grade_total}
                                    </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                    {view === "view"? <></> : <>
                                        <AssessmentDialog view="edit" courseId={courseInfo.id} assessment={assessment}/>
                                        <Button variant="outlined" sx={{ mx: 1 }} onClick={(e) => handleDeleteAssessment(assessment.id)} startIcon={<DeleteIcon />}>Delete</Button>
                                        </>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </Grid>
            </Container>
        </main>
    );
}