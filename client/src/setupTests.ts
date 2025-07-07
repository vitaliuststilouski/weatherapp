import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();


afterEach(() => {
  jest.clearAllMocks();
});
