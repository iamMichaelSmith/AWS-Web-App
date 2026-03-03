# Deploy Runbook

## Pre-deploy
- Validate Amplify config (`amplify.yml`, backend resources).
- Run local checks in root and `profilesapp`.

## Deploy
- Push approved changes to main.
- Monitor AWS Amplify deployment logs.

## Post-deploy
- Smoke-test auth flow and critical pages.
- Verify API/data calls and role-based access pages.

## Rollback
- Revert merge commit and redeploy from last known-good state.
