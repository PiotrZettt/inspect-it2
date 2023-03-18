# Inspect-IT
Digital traceability app for a manufacturing environment

## Application objective
The project came to live to help with quality inspection in a manufacturing environment. It allows to produce quality reports and 'heat maps' of specific defects.

## Challange
The user interface has to provide a graphic representation of defects found. To make that possible I had to use an html <canvas> element and implement it within a React component.

## Tools used
The project has been built with Django/REST framework at the backend. It also utilises React in the frontend.

## How to run
To run this app you will need python3.10 installed on your system.

Create a new folder for the application and move into that folder:

```mkdir <folder_name> && cd <folder_name>```

Clone the git repo:

```git clone git@github.com:PiotrZettt/inspect-it2.git```

Create a virtual environment for the project:

```python3 -m venv <your_env_name>```

Change directory to the inspect_it2 Django app:

```cd inspect_it2```

Install all requirements by:
```pip install -r requirements.txt```

Before you create a database and run the server you will need to create a secret key by exporting an environmental variable. It will be read and used by Django's settings.py

```export SECRET_KEY="<Use_a_string_here>"```

We can create the tables now:

```python manage.py makemigrations```  
```python manage.py migrate```

You will also need an admin account. Use command:

```python manage.py createsuperuser```

and follow the prompts.

To run the frontend React you need to go to the react directory and install the dependencies:
```cd frontend && npm init -y```

and run webpack:
```npm run dev```

Everything's ready now. Run the app by:

```python manage.py runserver```

The app will open in your browser on http://127.0.0.1:8000/  

