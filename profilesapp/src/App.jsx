import { Routes, Route, Link } from "react-router-dom";
import { Flex, Heading, Button, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import SurveyPage from "./pages/SurveyPage.jsx";
import ThanksPage from "./pages/ThanksPage.jsx";
import AdminRoute from "./pages/AdminRoute.jsx";

export default function App() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      gap="1rem"
      className="bm-page"
    >
      <Heading level={1}>Blak Marigold Studio Survey</Heading>
      <Text className="bm-muted">
        Public survey for clients. Staff dashboard for internal review.
      </Text>

      <Flex gap="1rem">
        <Link to="/survey">
          <Button variation="primary">Open Survey</Button>
        </Link>
        <Link to="/admin">
          <Button variation="secondary">Staff Admin</Button>
        </Link>
      </Flex>

      <Routes>
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<SurveyPage />} />
      </Routes>
    </Flex>
  );
}
