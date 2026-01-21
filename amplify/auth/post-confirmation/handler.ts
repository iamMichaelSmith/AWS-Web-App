import type { PostConfirmationTriggerHandler } from "aws-lambda";

export const handler: PostConfirmationTriggerHandler = async (event) => {
    console.log('PostConfirmation triggered for user:', event.request.userAttributes.email);
    
    // Just return event for now - no GraphQL calls
    return event;
};
