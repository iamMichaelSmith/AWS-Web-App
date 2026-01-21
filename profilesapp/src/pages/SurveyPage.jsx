import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Flex,
    Heading,
    Text,
    Button,
    Card,
    TextField,
    TextAreaField,
    RadioGroupField,
    Radio,
    CheckboxField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";

const publicClient = generateClient({ authMode: "identityPool" });

const MOST_VALUABLE_OPTIONS = [
    "Recording quality",
    "Engineering and guidance",
    "Creative vibe and environment",
    "Mixing or sound clarity",
    "Comfort and workflow",
    "Other",
];

const SUPPORT_OPTIONS = [
    "Recording more music",
    "Mixing and mastering",
    "Beat production or songwriting",
    "Sync licensing opportunities",
    "Marketing or distribution guidance",
    "Building a release plan",
];

export default function SurveyPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const source = useMemo(() => params.get("source") || "unknown", [params]);

    const [rating, setRating] = useState("5");
    const [mostValuablePart, setMostValuablePart] = useState([]);
    const [syncInterest, setSyncInterest] = useState("Maybe");
    const [freeHourNext7Days, setFreeHourNext7Days] = useState("Maybe");
    const [supportNeeded, setSupportNeeded] = useState([]);
    const [email, setEmail] = useState("");
    const [consentToMarketing, setConsentToMarketing] = useState(false);
    const [improvements, setImprovements] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    function toggleMostValuable(option) {
        setMostValuablePart((prev) => {
            const exists = prev.includes(option);
            if (exists) return prev.filter((x) => x !== option);
            if (prev.length >= 2) return prev;
            return [...prev, option];
        });
    }

    function toggleSupport(option) {
        setSupportNeeded((prev) => {
            const exists = prev.includes(option);
            if (exists) return prev.filter((x) => x !== option);
            if (prev.length >= 2) return prev;
            return [...prev, option];
        });
    }

    async function submitSurvey() {
        setErrorMsg("");
        if (mostValuablePart.length === 0) {
            setErrorMsg("Please select at least one valuable part of your session.");
            return;
        }
        if (supportNeeded.length === 0) {
            setErrorMsg("Please select at least one support option.");
            return;
        }

        setIsSubmitting(true);
        try {
            await publicClient.models.SurveySubmission.create({
                source,
                rating: Number(rating),
                mostValuablePart,
                syncInterest,
                freeHourNext7Days,
                supportNeeded,
                email: email.trim() ? email.trim() : undefined,
                consentToMarketing: Boolean(consentToMarketing),
                improvements: improvements.trim() ? improvements.trim() : undefined,
            });

            navigate("/thanks");
        } catch (err) {
            setErrorMsg(err?.message || "Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="bm-card" padding="2rem">
            <Flex direction="column" gap="1.5rem">
                <Flex direction="column" gap="0.5rem" alignItems="center" textAlign="center">
                    <Heading level={2}>Quick studio survey</Heading>
                    <Text className="bm-muted">
                        Your answers help us improve sessions and support your next move.
                    </Text>
                </Flex>

                <Flex direction="column" gap="0.75rem">
                    <Heading level={4}>1) Overall, how was your experience today?</Heading>
                    <RadioGroupField
                        label="Rating"
                        labelHidden
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <Flex gap="1rem">
                            <Radio value="1">1</Radio>
                            <Radio value="2">2</Radio>
                            <Radio value="3">3</Radio>
                            <Radio value="4">4</Radio>
                            <Radio value="5">5</Radio>
                        </Flex>
                    </RadioGroupField>
                </Flex>

                <Flex direction="column" gap="0.75rem" alignItems="flex-start">
                    <Heading level={4}>2) What part of your session was most valuable?</Heading>
                    <Text className="bm-muted" fontSize="0.9rem">Pick up to 2</Text>
                    <Flex direction="column" gap="0.5rem" alignItems="flex-start">
                        {MOST_VALUABLE_OPTIONS.map((opt) => (
                            <CheckboxField
                                key={opt}
                                name={opt}
                                label={opt}
                                checked={mostValuablePart.includes(opt)}
                                onChange={() => toggleMostValuable(opt)}
                            />
                        ))}
                    </Flex>
                </Flex>

                <Flex direction="column" gap="0.75rem">
                    <Heading level={4}>3) Interested in placements in TV, films, games, or ads?</Heading>
                    <Text className="bm-muted" fontSize="0.9rem">
                        Sync licensing means your music can be placed in media like shows, commercials, or games.
                    </Text>
                    <RadioGroupField
                        label="Sync Interest"
                        labelHidden
                        name="syncInterest"
                        value={syncInterest}
                        onChange={(e) => setSyncInterest(e.target.value)}
                    >
                        <Flex gap="1.5rem">
                            <Radio value="Yes">Yes</Radio>
                            <Radio value="Maybe">Maybe</Radio>
                            <Radio value="No">No</Radio>
                        </Flex>
                    </RadioGroupField>
                </Flex>

                <Flex direction="column" gap="0.75rem">
                    <Heading level={4}>4) If we offered a free hour next session, could you book within 7 days?</Heading>
                    <RadioGroupField
                        label="Free Hour"
                        labelHidden
                        name="freeHour"
                        value={freeHourNext7Days}
                        onChange={(e) => setFreeHourNext7Days(e.target.value)}
                    >
                        <Flex gap="1.5rem">
                            <Radio value="Yes">Yes</Radio>
                            <Radio value="Maybe">Maybe</Radio>
                            <Radio value="Not right now">Not right now</Radio>
                        </Flex>
                    </RadioGroupField>
                </Flex>

                <Flex direction="column" gap="0.75rem">
                    <Heading level={4}>5) What support would help most right now?</Heading>
                    <Text className="bm-muted" fontSize="0.9rem">Pick up to 2</Text>
                    <Flex direction="column" gap="0.5rem">
                        {SUPPORT_OPTIONS.map((opt) => (
                            <CheckboxField
                                key={opt}
                                name={opt}
                                label={opt}
                                checked={supportNeeded.includes(opt)}
                                onChange={() => toggleSupport(opt)}
                            />
                        ))}
                    </Flex>
                </Flex>

                <Flex direction="column" gap="0.75rem">
                    <Heading level={4}>6) Email (optional)</Heading>
                    <TextField
                        label="Email"
                        labelHidden
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CheckboxField
                        name="consent"
                        label="I want studio updates and offers"
                        checked={consentToMarketing}
                        onChange={(e) => setConsentToMarketing(e.target.checked)}
                    />
                </Flex>

                <Flex direction="column" gap="0.75rem">
                    <Heading level={4}>7) Anything we could do better?</Heading>
                    <TextAreaField
                        label="Improvements"
                        labelHidden
                        value={improvements}
                        onChange={(e) => setImprovements(e.target.value)}
                    />
                </Flex>

                {errorMsg ? <Text className="bm-error">{errorMsg}</Text> : null}

                <Button
                    variation="primary"
                    isLoading={isSubmitting}
                    onClick={submitSurvey}
                    marginTop="1rem"
                    size="large"
                >
                    Submit Survey
                </Button>
            </Flex>
        </Card>
    );
}
