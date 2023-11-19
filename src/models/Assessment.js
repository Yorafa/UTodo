export default class Assessment{
    constructor(id, assessment_type, grade_now, grade_total, course){
        this.id = id;
        this.assessment_type = assessment_type;
        this.grade_now = grade_now;
        this.grade_total = grade_total;
        this.course = course;
    }
};