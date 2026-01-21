import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
    UserProfile: a
        .model({
            email: a.string().required(),
        })
        .authorization((allow) => [allow.owner()]),

    SurveySubmission: a
        .model({
            source: a.string(),
            rating: a.integer().required(),
            mostValuablePart: a.string().required(),
            syncInterest: a.string().required(),
            freeHourNext7Days: a.string().required(),
            supportNeeded: a.string().array().required(),
            email: a.string(),
            consentToMarketing: a.boolean().required(),
            improvements: a.string(),
        })
        .authorization((allow) => [
            allow.guest().to(['create']),
            allow.authenticated().to(['create']),
            allow.groups(['Staff']).to(['read', 'update', 'delete']),
        ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
});