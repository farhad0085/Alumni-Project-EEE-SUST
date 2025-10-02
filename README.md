# Alumni Application for EEE SUST

## Backend
1. Create a `.env` file as shown in `.env.example`
2. Create database in postgresql and write the info in `.env` file.
3. Create a virtual environment.
    ```
    virtualenv venv
    ```
    > If you don't have `virtualenv`, install it first. `pip install virtualenv`
4. Activate virtual environment.
    - Git Bash
        ```
        source venv/Scripts/activate
        ```
    - Windows Powershell / CMD
        ```
        cd venv/Scripts
        activate
        cd ../..
        ```
    - Ubuntu
        ```
        source venv/bin/activate
        ```
5. Install all required libraries
    ```
    pip install -r requirements.txt
    ```
6. Run migrate command.
    ```
    python manage.py migrate
    ```
7. Run the project
    ```
    python manage.py runserver
    ```
The backend will be running on port 8000 i.e [http://localhost:8000](http://localhost:8000)


## Frontend
1. Open another terminal and go to frontend folder.
    ```
    cd frontend/
    ```
2. Run `npm install` to install any packages that is available as a dependency in <strong>package.json</strong>, all in one go.
3. Now Run `npm start` to run the app in the development mode.
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
5. Run `npm run build` to build the app for production to the `build` folder. The build is minified and the filenames include the hashes.


# TODO
- Faculty (Done)
    - Admin Panel
    - Upload from Excel
- Alumni Portal
    - Admin Panel
    - Upload data in bulk or one by one
    - Upload from Excel
- Notice Board (Done)
    - Admin Panel
    - Anyone can view notices
- Events (Done)
- Labs & Projects (Done)
- Student Portal
    - Login
    - Registration
    - Forget Password
    - Change Password
    - User Profile
    - Study Material
