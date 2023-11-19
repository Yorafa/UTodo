export default class Course{
    constructor(id, name, description, university, grade_now, grade_total, year, semester, is_public, user, likes){
        this.id = id;
        this.name = name;
        this.description = description;
        this.university = university;
        this.grade_now = grade_now;
        this.grade_total = grade_total;
        this.year = year;
        this.semester = semester;
        this.is_public = is_public;
        this.user = user;
        this.likes = likes;
    }
};