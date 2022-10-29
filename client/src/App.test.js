import { render, screen } from '@testing-library/react';
import React from "react";

test("everything is a node", () => {
  const LandingPage = () => <h1>Welcome to the countries wiki</h1>;
  render(<LandingPage />);
  expect(screen.getByText("Welcome to the countries wiki")).toBeInstanceOf(Node);
});

