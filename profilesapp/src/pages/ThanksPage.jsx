import { Flex, Heading, Text, Button, Card } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const GOOGLE_REVIEW_URL = "PASTE_YOUR_GOOGLE_REVIEW_LINK_HERE";

export default function ThanksPage() {
    return (
        <Card className="bm-card" padding="1.5rem" variation="elevated">
            <Flex direction="column" gap="1rem" alignItems="center">
                <Heading level={2}>Thank you</Heading>
                <Text className="bm-muted">
                    If you have 30 seconds, leaving a review helps more artists find us.
                </Text>
                <Button
                    variation="primary"
                    onClick={() => window.open(GOOGLE_REVIEW_URL, "_blank", "noreferrer")}
                >
                    Leave a Google review
                </Button>
            </Flex>
        </Card>
    );
}
