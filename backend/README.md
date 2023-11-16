# Django Backend

## Setup

Prefer to use virtualenv to install dependencies and run the server.

try to run the following commands:

```bash
# create virtualenv
# windows
python -m venv .venv
# unix
python3 -m venv .venv

# activate virtualenv
# windows
.venv\Scripts\activate
# unix
source .venv/bin/activate

# install dependencies
pip install -r requirements.txt
```
## ALL API

- [x] POST `/course/create/` : create a course to current user
- [x] PUT/DELETE/GET `/course/<int: id>` : update/delete/get a course by id
- [x] GET `/course/public_all/` : get all public courses
- [x] GET `/course/my_all/` : get all courses of current user
- [x] GET `/course/on_list/` : get all courses of current user that show in sidebar
- [x] PATCH/GET `/course/<int: id>/like/` : like a course or get who like this course
- [x] PATCH `/course/<int: id>/unlike/` : un-like a course
- [x] POST `/course/<int: id>/create/` : create a assessment to a course
- [x] PUT/DELETE/GET `/course/assessment/<int: id>/` : update/delete/get a assessment by id
- [x] GET `/course/<int: id>/assessments/` : get all assessments of a course by id
- [x] POST `/course/assessment/<int: id>/create/` : create a task to a assessment
- [x] PUT/DELETE/GET `/course/assessment/task/<int: id>/` : update/delete/get a task by id
- [x] GET `/course/assessment/<int: id>/tasks/` : get all tasks of a assessment by id
- [x] GET `account/api/token/` : get token
- [x] POST `account/ signin/` : signin
- [x] POST `account/ signup/` : signup
- [x] GET `account/ profile/` : get profile