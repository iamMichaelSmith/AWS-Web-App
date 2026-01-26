import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders headline", () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    const headline = screen.getByText(/Blak Marigold Studio Survey/i);
    expect(headline).toBeInTheDocument();
});
