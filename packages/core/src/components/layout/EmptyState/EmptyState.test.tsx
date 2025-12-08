import { render } from "@testing-library/react-native";
import React from "react";

import { EmptyState } from "./EmptyState";

describe("<EmptyState />", () => {
  it("should render", () => {
    render(<EmptyState />);
  });
});
