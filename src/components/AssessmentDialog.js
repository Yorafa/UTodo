import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import dayjs from 'dayjs';
import { DialogTitle, FormControlLabel, Checkbox } from '@mui/material';
import { FormControl, MenuItem, InputLabel, Select, Box, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { create_assessment_to_course_by_id_api, update_assessment_by_id_api } from '../utils/api';

const assessmentTypeList = [
    "Term Tests",
    'Assignments',
    'Projects',
    'Homework',
    'Quizzes',
    'Final Exam',
    'Others'
]

const today = dayjs().format('YYYY-MM-DD HH:mm');

export default function AssessmentDialog(props) {
    const [open, setOpen] = useState(false);
    const [assessmentType, setAssessmentType] = useState(assessmentTypeList[0]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(today);
    const [gradeNow, setGradeNow] = useState('');
    const [gradeTotal, setGradeTotal] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [isCounted, setIsCounted] = useState(false);
    const [onTouch, setOnTouch] = useState(new Map());

    const { view, courseId, assessment } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (newValue) => {
        const dateStr = newValue.format('YYYY-MM-DD HH:mm');
        setDate(dateStr);
    };

    const handleTouch = (key) =>{
        const mp = new Map(onTouch);
        mp.set(key, true);
        setOnTouch(mp);
    };

    const handleClean = () =>{
        setAssessmentType(assessmentTypeList[0]);
        setTitle('');
        setDate(today);
        setGradeNow('');
        setGradeTotal('');
        setWeight('');
        setDescription('');
        setIsCounted(false);
        const initMap = new Map();
        initMap.set("title", false);
        initMap.set("grade_now", false);
        initMap.set("grade_total", false);
        initMap.set("weight", false);
        setOnTouch(initMap);
    };

    const handleCreateSumbit = () => {
        if (title.length < 1 || gradeNow.length < 1 || gradeTotal.length < 1 || weight.length < 1) return;
        const createData = {
            assessment_type: assessmentType,
            title: title,
            due_date: date,
            grade_now: gradeNow,
            grade_total: gradeTotal,
            weight: weight,
            description: description,
            is_counted: isCounted,
            course: courseId
        }
        create_assessment_to_course_by_id_api(courseId, createData).then((res) => {
            if (res.status === 201) {
                window.location.reload();
            }
        });
        handleClose();
    };
    const handleEditSumbit = () => {
        if (title.length < 1 || gradeNow.length < 1 || gradeTotal.length < 1 || weight.length < 1) return;
        const createData = {
            assessment_type: assessmentType,
            title: title,
            due_date: date,
            grade_now: gradeNow,
            grade_total: gradeTotal,
            weight: weight,
            description: description,
            is_counted: isCounted,
            course: courseId
        }
        update_assessment_by_id_api(assessment.id, createData).then((res) => {
            if (res.status === 200) {
                window.location.reload();
            }
        });
        handleClose();
    };

    useEffect(() => {
        handleClean();
        if (assessment) {
            setAssessmentType(assessment.assessment_type);
            setTitle(assessment.title);
            setDate(assessment.due_date);
            setGradeNow(assessment.grade_now);
            setGradeTotal(assessment.grade_total);
            setWeight(assessment.weight);
            setDescription(assessment.description);
            setIsCounted(assessment.is_counted);
        }
    }, [assessment]);

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {view === 'create' ? 'Create a new assessment' : 'Edit'}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{view === 'create' ? 'Create' : 'Edit'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={6}>
                            <TextField
                                error={onTouch.get("title") && title.length < 1}
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                fullWidth
                                required
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    handleTouch("title");
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker value={dayjs(date)} onChange={(newValue) => handleDateChange(newValue)} />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Box p={1}></Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="simple-select"
                            value={assessmentType}
                            label="Type"
                            onChange={(e) => { setAssessmentType(e.target.value) }}
                        >
                            {assessmentTypeList.map((sem) => (
                                <MenuItem value={sem} key={"Type:" + sem}>{sem}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box p={1}></Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Description"
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Box p={1}></Box>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                error={onTouch.get("grade_now") && !(gradeNow.length > 0 && !isNaN(gradeNow))}
                                fullWidth
                                label="Grade You Get"
                                id="grade"
                                value={gradeNow}
                                required
                                helperText="All grades are number"
                                onChange={(e) => {
                                    setGradeNow(e.target.value);
                                    handleTouch("grade_now");
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                error={onTouch.get("grade_total") && !(gradeTotal.length > 0 && !isNaN(gradeTotal))}
                                fullWidth
                                label="Total Grade"
                                id="grade"
                                value={gradeTotal}
                                required
                                onChange={(e) => {
                                    setGradeTotal(e.target.value);
                                    handleTouch("grade_total");
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                error={onTouch.get("weight") && !(weight.length > 0 && !isNaN(weight))}
                                fullWidth
                                required
                                label="Weight"
                                id="grade"
                                value={weight}
                                onChange={(e) => {
                                    setWeight(e.target.value);
                                    handleTouch("weight");
                                }}
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel control={
                        <Checkbox checked={isCounted} onChange={(e) => setIsCounted(e.target.checked)} />
                    } label="Is Counted" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {view === "create" ? <Button onClick={handleCreateSumbit}>Submit</Button> :
                        <Button onClick={handleEditSumbit}>Update</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
}