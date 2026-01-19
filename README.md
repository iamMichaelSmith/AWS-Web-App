# AWS Web App Project

This project follows the AWS Hands-on tutorial: [Build a Web App with S3, Lambda, API Gateway, DynamoDB - Module One](https://docs.aws.amazon.com/hands-on/latest/build-web-app-s3-lambda-api-gateway-dynamodb/module-one.html)

## Project Documentation

### 1- Set up Amplify manually

### Step 1: Create the React app (TERMINAL)

In **Antigravity terminal**, type this **exactly**:

```powershell
npm create vite@latest profilesapp -- --template react
```

You’ll be prompted with questions. Choose:

- Framework: **React**
- Variant: **JavaScript** (not TypeScript, keep it simple for now)

Then:

```powershell
cd profilesapp
npm install
npm run dev
```

#### What just happened

- `profilesapp/` folder was created
- Local dev server started
- This matches the AWS tutorial screenshot exactly

You should see a local URL like:

```
http://localhost:5173
```

Open it once to confirm it works.

Stop the server with:

```powershell
Ctrl + C
```

---

### Step 2: Initialize Git & Connect to GitHub

**Detailed Setup of GitHub Environment:**
Before connecting the repository, we ensured the environment was correctly configured:
1.  **Installed GitHub CLI**: Used `winget install --id GitHub.cli` to install the command-line tool.
2.  **Authenticated**: Ran `gh auth login --web`, selected HTTPS as the protocol, and completed authentication via the browser using a one-time code.
3.  **Verified Connection**: Confirmed the login status for user `iamMichaelSmith` using `gh auth status`.

**Initialize Git INSIDE the app (TERMINAL)**

Still inside `profilesapp`:

```powershell
git init
git add .
git commit -m "initial react app"
```

Now connect it to the GitHub repo you already created:

```powershell
git remote add origin https://github.com/iamMichaelSmith/AWS-Web-App.git
git branch -M main
git push -u origin main
```

✅ This is the moment Amplify starts working for real.