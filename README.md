# Serverless Web Application with AWS

This project demonstrates how to build a serverless web application using AWS services. It follows the AWS Hands-on tutorial: [Build a Web App with S3, Lambda, API Gateway, DynamoDB](https://docs.aws.amazon.com/hands-on/latest/build-web-app-s3-lambda-api-gateway-dynamodb/module-one.html).

## Application Architecture

The application uses the following AWS services and flow:

<img width="2158" height="922" alt="AWS Web App Project Image" src="https://github.com/user-attachments/assets/ab3a5c6a-fcad-427f-a8f8-9c320951518f" />


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

---

## Module 2: Serverless Lambda Function

This module implements a serverless Lambda function that triggers after a user confirms their account sign-up. The function is built using AWS Amplify's backend framework.

### Step 1: Create Lambda Function Files

Navigate to the `amplify/auth` directory and create the Lambda function structure:

**1. Create the folder structure:**
```powershell
cd amplify/auth
mkdir post-confirmation
cd post-confirmation
```

**2. Create the handler file:**
Create `handler.ts` with the following code:
```typescript
import type { PostConfirmationTriggerHandler } from "aws-lambda";

export const handler: PostConfirmationTriggerHandler = async (event) => {
  return event;
};
```

**Purpose:** This handler executes when a user confirms their account. Currently, it returns the event unchanged - it will be enhanced in later modules to interact with DynamoDB.

**3. Create the resource file:**
Create `resource.ts` with the following code:
```typescript
import { defineFunction } from '@aws-amplify/backend';

export const postConfirmation = defineFunction({
  name: 'post-confirmation',
});
```

**Purpose:** Defines the Lambda function resource using Amplify's `defineFunction`, naming it to match the folder structure.

### Step 2: Verify TypeScript Compilation

Ensure all TypeScript files compile correctly:
```powershell
cd amplify
npx tsc --noEmit
```

✅ **Success:** Exit code 0 confirms all imports and type definitions are valid.

### File Structure
After completing this module, your project structure should include:
```
amplify/
├── auth/
│   ├── post-confirmation/
│   │   ├── handler.ts      # Lambda function handler
│   │   └── resource.ts     # Lambda function definition
│   └── resource.ts
├── backend.ts
└── data/
```

✅ **Milestone Reached:** You have successfully defined a Lambda function using AWS Amplify. The function is ready to be wired up to the authentication flow in the next steps.

