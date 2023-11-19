export default class Task{
    constructor(id, title, due_date, grade_now, grade_total, description, is_counted, assessment){
        this.id = id;
        this.title = title;
        this.due_date = due_date;
        this.grade_now = grade_now;
        this.grade_total = grade_total;
        this.description = description;
        this.is_counted = is_counted;
        this.assessment = assessment;
    }
};