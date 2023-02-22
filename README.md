# Rules for collaboration
- 
-

# What is Yummo?

Yummo is a web application intended to help users find and book restaurants based on their dietary preferences as well as distance factor. Additionally, it is also a social media platform that encourages interaction between various users mainly on the topic of different cuisines. It would act as a one-stop reservation system for all of your favourite restaurants.

# Dependencies
- django
- djangorestframework
- djoser 
- add on whatever dependencies you installed for this project

# Setting up local environment (backend)
`pipenv` is used to manage our dependencies and virtual environment.

If you haven't installed pipenv, run the following command 

> pip install pipenv

## Creating a virtual environment
1. Navigate to the folder where the pipfile is located.
2. Spawn a shell in a virtual environment to isolate the development of this app using the following command

> pipenv shell

This will create a virtual environment if one doesn’t already exist.

## Installing dependencies
Then, run the following command to install the dependencies listed in the pipfile.
> pipenv install

## Installing new packages
To install new packages, simply run the command and replacing `package_name` with the package that you want to install.
> pipenv install `package_name`

# Running the Django Server
Navigate to the Backend folder (where manage.py is located), and run the following command
> python manage.py runserver

If there are any errors about migration, run these 2 commands then try the previous command.

> python manage.py makemigrations

> python manage.py migrate

# Setting up local environment (frontend)
To be filled...