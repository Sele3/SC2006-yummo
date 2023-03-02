# Rules for collaboration
- `main` branch will be used as the working branch. All new changes done shall not be pushed directly to `main` unless it is a very minor change that will not affect the overall applicaion (e.g adding comments, editing readme file etc)

- How to push new changes to GitHub:
  - Create a new branch with the following name format: 
     - [yourname]/[taskid]_[taskname] 
     - (e.g sayhong/1_create-new-models)
  - Push your changes to the new branch just created
  - On GitHub, create a pull request (PR) to `main`
  - Ask another person working on the same end to review the code and approve the PR
  - Impt: Do **NOT** select the option to delete the branch when merging. These will be used for tracking purposes / backup
  
- How to resolve conflicts: 
  - On your own local repo, merge `main` to your own branch
  - On your own local repo, resolve any conflicts as necessary 
  - Push the changes to your own branch
  - On GitHub, the PR should now display that there are no conflicts
  
- Good commit naming conventions to follow (optional)
  - See: https://www.conventionalcommits.org/en/v1.0.0/
  - Also see: https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type 
  - [List of commit type and their descriptions](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/#:~:text=Conventional%20Commits,-Now%20that%20we&text=feat%20%E2%80%93%20a%20new%20feature%20is,bug%20nor%20adds%20a%20feature)
  - [Examples](https://github.com/angular/angular/commits/22b96b96902e1a42ee8c5e807720424abad3082a/CONTRIBUTING.md)

# What is Yummo?

Yummo is a web application intended to help users find and book restaurants based on their dietary preferences as well as distance factor. Additionally, it is also a social media platform that encourages interaction between various users mainly on the topic of different cuisines. It would act as a one-stop reservation system for all of your favourite restaurants.

# Dependencies
- django
- djangorestframework
- djoser 
- Pillow
- add on whatever dependencies you installed for this project

# Setting up local environment (backend)
`pipenv` is used to manage our dependencies and virtual environment

If you haven't installed pipenv, run the following command 

> pip install pipenv

## Creating a virtual environment
1. Navigate to the folder where the pipfile is located (in Backend folder)
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
Navigate to the Backend folder (where manage.py is located), and run the following command.
> python manage.py runserver

If there are any errors about migration, run these 2 commands then try the previous command

> python manage.py makemigrations

> python manage.py migrate

# Setting up local environment (frontend)
Navigate to the yummo folder in Frontend (cd .\Frontend\yummo\), start the server by running
> npm start

If there are errors when starting the server, install missing dependencies by running
> npm install  
