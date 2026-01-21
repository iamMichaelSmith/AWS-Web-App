import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AdminDashboard from "./AdminDashboard.jsx";

export default function AdminRoute() {
    return (
        <Authenticator>
            <AdminDashboard />
        </Authenticator>
    );
}
