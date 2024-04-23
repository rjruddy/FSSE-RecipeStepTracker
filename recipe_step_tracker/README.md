```
SETUP COMMANDS:
    pip3 install django
    pip3 install django_rest_framework

    django-admin startproject recipe_step_tracker
    cd recipe_step_tracker
    django-admin startapp recipe_step_tracker_api

update build stack:
    python3 manage.py migrate
    python3 manage.py makemigrations  [when adding a new class, etc]

run development server
    python3 manage.py runserver
```