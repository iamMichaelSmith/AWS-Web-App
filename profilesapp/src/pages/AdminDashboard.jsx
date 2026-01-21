import { useEffect, useState } from "react";
import { Flex, Heading, Button, Table, TableRow, TableCell, TableBody, TableHead, Text } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";

const staffClient = generateClient({ authMode: "userPool" });

export default function AdminDashboard() {
    const { signOut } = useAuthenticator((context) => [context.user]);
    const [rows, setRows] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setErrorMsg("");
        try {
            const { data } = await staffClient.models.SurveySubmission.list();
            setRows(data || []);
        } catch (err) {
            setErrorMsg(err?.message || "Unable to load submissions. Are you in the Staff group?");
        }
    }

    return (
        <Flex direction="column" gap="1rem" className="bm-card" padding="1.5rem">
            <Flex justifyContent="space-between" alignItems="center">
                <Heading level={2}>Staff Admin</Heading>
                <Flex gap="0.75rem">
                    <Button variation="secondary" onClick={load}>Refresh</Button>
                    <Button onClick={signOut}>Sign Out</Button>
                </Flex>
            </Flex>

            {errorMsg ? <Text className="bm-error">{errorMsg}</Text> : null}

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
                    {rows.map((r) => (
                        <TableRow key={r.id}>
                            <TableCell fontSize="0.8rem">
                                {new Date(r.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{r.rating}</TableCell>
                            <TableCell fontSize="0.8rem">
                                {Array.isArray(r.mostValuablePart) ? r.mostValuablePart.join(", ") : r.mostValuablePart}
                            </TableCell>
                            <TableCell fontSize="0.8rem">
                                {Array.isArray(r.supportNeeded) ? r.supportNeeded.join(", ") : r.supportNeeded}
                            </TableCell>
                            <TableCell>{r.syncInterest}</TableCell>
                            <TableCell>{r.freeHourNext7Days}</TableCell>
                            <TableCell fontSize="0.8rem">{r.email || ""}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Flex>
    );
}
