# Serverless Web Application with AWS

This project demonstrates how to build a serverless web application using AWS services. It follows the AWS Hands-on tutorial: [Build a Web App with S3, Lambda, API Gateway, DynamoDB](https://docs.aws.amazon.com/hands-on/latest/build-web-app-s3-lambda-api-gateway-dynamodb/module-one.html).

## Application Architecture

The application uses the following AWS services and flow:

```mermaid
graph LR
    Users((Users)) --> Amplify[AWS Amplify]
    Amplify <--> Cognito[Amazon Cognito]
    Amplify --> Lambda[AWS Lambda]
    Lambda --> AppSync[AWS AppSync]
    AppSync --> GraphQL(GraphQL)
    GraphQL --> DynamoDB[(DynamoDB)]
    
    style Amplify fill:#FF9900,stroke:#232F3E,color:white
    style Cognito fill:#DD344C,stroke:#232F3E,color:white
    style Lambda fill:#FF9900,stroke:#232F3E,color:white
    style AppSync fill:#FF4F8B,stroke:#232F3E,color:white
    style DynamoDB fill:#4053D6,stroke:#232F3E,color:white
```

## Module 1: Static Web Hosting & Environment Setup

This module focuses on setting up the local development environment, creating the React application, and establishing version control with GitHub.

### Step 1: Manual Amplify Setup
We started by manually setting up the AWS Amplify environment to host our application through the AWS Management Console.

**Steps:**
1.  **Open Amplify:** Log in to the AWS Console and search for "Amplify", then select it.
2.  **New App:** Click on **"Create new app"** (or "New app") and select **"Host web app"**.
3.  **Select Repo:** Choose **GitHub** as the source code provider and click **Continue**.
    *   *Note: You may need to authorize AWS Amplify to access your GitHub account.*
4.  **Click Main:** Select your repository (`iamMichaelSmith/AWS-Web-App`) and ensure the branch is set to `main`.
5.  **Keep Defaults:** Leave all build settings as their default values and click **Next**.
6.  **Deploy:** Review the summary and click **Save and deploy**.

This initiates the build process, pulling the code from GitHub and deploying it to a live URL.

### Step 2: Create the React Application
We utilized Vite to generate a lightweight and fast React application.

**Terminal Command:**
```powershell
npm create vite@latest profilesapp -- --template react
```

**Configuration:**
*   **Framework:** React
*   **Variant:** JavaScript

**Verification:**
After installation, we started the local development server:
```powershell
cd profilesapp
npm install
npm run dev
```
This launched the application at `http://localhost:5173`, confirming the successful creation of the `profilesapp` directory.

### Step 3: Initialize Git & Connect to GitHub
We established a robust version control workflow to ensure all changes are tracked and synced.

**1. Environment Configuration:**
Before connecting, we ensured the necessary tools were installed and authenticated:
*   **Installed GitHub CLI:** `winget install --id GitHub.cli`
*   **Authenticated:** `gh auth login --web` (Verified with `gh auth status`)

**2. Repository Initialization:**
Inside the `profilesapp` directory:
```powershell
git init
git add .
git commit -m "initial react app"
```

**3. Remote Connection:**
We connected the local repository to GitHub and pushed the initial code:
```powershell
git remote add origin https://github.com/iamMichaelSmith/AWS-Web-App.git
git branch -M main
git push -u origin main
```

✅ **Milestone Reached:** The application is now version-controlled and connected to GitHub, ready for continuous integration and deployment integration with AWS Amplify.

### Step 4: Automated Testing Setup
To ensuring code quality, we integrated a testing framework using **Vitest** and **React Testing Library**.

**Configuration:**
*   Installed dependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`.
*   Configured `vite.config.js` to use `jsdom` environment.
*   Added `"test": "vitest"` script to `package.json`.

**Running Tests:**
To run the test suite locally:
```powershell
npm test
```
This verifies that the React application renders correctly, preventing regressions.