import { render, fireEvent, screen } from "@testing-library/react";
import { AllProviders } from "./providers";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
export { fireEvent, screen };
