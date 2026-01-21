import { useEffect, useState } from "react";
import {
    Flex,
    Heading,
    Button,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Text,
    Loader,
} from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";

const staffClient = generateClient({ authMode: "userPool" });

export default function AdminDashboard() {
    const { signOut, user } = useAuthenticator((context) => [context.user]);
    const [rows, setRows] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            load();
        }
    }, [user]);

    async function load() {
        setErrorMsg("");
        setIsLoading(true);
        try {
            const { data } = await staffClient.models.SurveySubmission.list();
            setRows(data || []);
        } catch (err) {
            console.error("Admin load error:", err);
            setRows([]);
            setErrorMsg(
                err?.message ||
                "Unable to load submissions. Are you in the Staff group?"
            );
        } finally {
            setIsLoading(false);
        }
    }

    // Show loading while auth is initializing
    if (!user) {
        return (
            <Flex direction="column" alignItems="center" gap="1rem" padding="2rem">
                <Loader size="large" />
                <Text>Loading user session...</Text>
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap="1rem" className="bm-card" padding="1.5rem">
            <Flex justifyContent="space-between" alignItems="center">
                <Heading level={2}>Staff Admin</Heading>
                <Flex gap="0.75rem">
                    <Button variation="secondary" onClick={load} isLoading={isLoading}>
                        Refresh
                    </Button>
                    <Button onClick={signOut}>Sign Out</Button>
                </Flex>
            </Flex>

            <Text className="bm-muted" fontSize="0.9rem">
                Signed in as: {user?.signInDetails?.loginId || user?.username || "unknown"}
            </Text>

            {errorMsg && <Text className="bm-error">{errorMsg}</Text>}

            {isLoading ? (
                <Flex justifyContent="center" padding="2rem">
                    <Loader size="large" />
                </Flex>
            ) : (
                <Table highlightOnHover={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">Created</TableCell>
                            <TableCell as="th">Rating</TableCell>
                            <TableCell as="th">Valuable</TableCell>
                            <TableCell as="th">Support</TableCell>
                            <TableCell as="th">Sync</TableCell>
                            <TableCell as="th">Free Hr</TableCell>
                            <TableCell as="th">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter(Boolean).length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} textAlign="center" padding="2rem">
                                    <Text className="bm-muted">No submissions yet</Text>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.filter(Boolean).map((r, index) => (
                                <TableRow key={r.id ?? `row-${index}`}>
                                    <TableCell fontSize="0.8rem">
                                        {r?.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                                    </TableCell>
                                    <TableCell>{r?.rating || ""}</TableCell>
                                    <TableCell fontSize="0.8rem">
                                        {Array.isArray(r?.mostValuablePart)
                                            ? r.mostValuablePart.join(", ")
                                            : r?.mostValuablePart || ""}
                                    </TableCell>
                                    <TableCell fontSize="0.8rem">
                                        {Array.isArray(r?.supportNeeded)
                                            ? r.supportNeeded.join(", ")
                                            : r?.supportNeeded || ""}
                                    </TableCell>
                                    <TableCell>{r?.syncInterest || ""}</TableCell>
                                    <TableCell>{r?.freeHourNext7Days || ""}</TableCell>
                                    <TableCell fontSize="0.8rem">{r?.email || ""}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </Flex>
    );
}
