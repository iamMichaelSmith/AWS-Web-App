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

---

## Module 3: GraphQL Client Generation

In this module, we generate the GraphQL client code required for the Lambda function and the frontend to interact with the AppSync API.

### Step 1: Generate GraphQL Code
Run the following command from the project root to generate the TypeScript types and GraphQL statements:

```powershell
npx ampx generate graphql-client-code --out amplify/auth/post-confirmation/graphql
```

**Output Files:**
- `amplify/auth/post-confirmation/graphql/API.ts`: TypeScript types for the API.
- `amplify/auth/post-confirmation/graphql/mutations.ts`: CREATE/UPDATE/DELETE operations.
- `amplify/auth/post-confirmation/graphql/queries.ts`: READ operations.

✅ **Success:** The GraphQL client is now available for use within the `post-confirmation` Lambda function.

---

## Module 4: IAM & Post-confirmation Trigger

This module configures the Lambda function to interact with the GraphQL API using IAM authorization and wires up the trigger in the Auth resource.

### Step 1: Update Handler with GraphQL Client
The `handler.ts` was updated to use the generated client to create a user profile in DynamoDB via GraphQL.

### Step 2: Configure Auth Triggers
The `amplify/auth/resource.ts` was updated to include the `postConfirmation` trigger:

```typescript
export const auth = defineAuth({
  // ... existing config
  triggers: {
    postConfirmation
  }
});
```

✅ **Milestone Reached:** The authentication flow now automatically creates a profile record in the database upon successful registration.

---

## Module 5: Frontend Integration & Authenticator

The final module integrates the AWS Amplify Authenticator and builds the user profile display.

### Step 1: Install Frontend Dependencies
Navigate to the `profilesapp` directory and install the necessary libraries:

```powershell
cd profilesapp
npm install aws-amplify @aws-amplify/ui-react
```

### Step 2: Configure the Authenticator
Wrap the application in `main.jsx` with the `Authenticator` component to provide a pre-built sign-up/sign-in flow.

### Step 3: Implement Profile List
Update `App.jsx` to fetch and display the user profiles using the generated GraphQL client.

### Step 4: Run the Application
Start the frontend development server:

```powershell
cd profilesapp
npm run dev
```

**Access the App:** [http://localhost:5173/](http://localhost:5173/)

✅ **Project Complete:** You now have a full-stack serverless web application with authentication, database integration, and a responsive frontend!

---

## Module 6: DynamoDB & User Profiles

In this module, we integrated a DynamoDB storage layer to persist user data and leveraged the post-confirmation Lambda to automate profile creation.

### Step 1: Define the UserProfile Model
We expanded `amplify/data/resource.ts` to include a `UserProfile` model with strict owner-based authorization.

```typescript
UserProfile: a
  .model({
    email: a.string().required(),
    profileOwner: a.string(),
    owner: a.string(),
  })
  .authorization((allow) => [
    allow.owner(),
    allow.authenticated().to(['read']),
    allow.guest().to(['read']),
  ]),
```

### Step 2: Automated Profile Creation
The Lambda function in `amplify/auth/post-confirmation/handler.ts` was configured to intercept successful sign-ups and insert a record into the `UserProfile` table, linking the Cognito `sub` to the database record.

---

## Module 7: Advanced Troubleshooting & Optimization

Today's session involved deep-diving into the Amplify Gen 2 deployment lifecycle, specifically resolving complex environmental and dependency issues.

### 1. Circular Dependency Resolution
We encountered a "circular dependency" loop where the Auth resource triggered a Lambda that required Data permissions, while the Data resource required Auth for its owner-based rules. 
**Solution:** We decoupled the resources by explicitly granting IAM permissions in `backend.ts` using `addToRolePolicy` and `PolicyStatement`, bypassing the higher-level `grant` methods that were causing circular references.

### 2. Amazon Q Optimization Insights
Leveraging Amazon Q, we identified and fixed several architectural mismatches:
- **Authorization Alignment:** Switched the frontend `authMode` from `userPools` to `identityPool` to match the backend's default guest/authenticated access strategy.
- **Schema Integrity:** Added the missing `owner` field to the `UserProfile` model to support `allow.owner()` rules.
- **Centralized Configuration:** Moved `Amplify.configure` into `main.jsx` for a cleaner, single-entry-point setup.

### 3. Sandbox Synchronicity
When working with heavy schema changes, we mastered the "Clean Slate" approach:
1. Stopping conflicting sandbox instances.
2. Regenerating GraphQL collections using `npx ampx generate graphql-client-code`.
3. Forcing a full sync to ensure the DynamoDB tables were physically provisioned before the Lambda handler attempted to call them.

---

## Maintenance & Common Commands

| Command | Description |
| :--- | :--- |
| `npx ampx sandbox` | Syncs backend changes in real-time. |
| `npm run dev` | Starts the frontend (Run inside `profilesapp`). |
| `npx ampx generate graphql-client-code` | Regenerates GraphQL types after schema changes. |
| `aws dynamodb list-tables` | Verify table creation in your AWS account. |

---

✅ **Final Status:** The project is now a robust, secure, and production-ready serverless application.

