import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "@/services/weatherApi";
import { WeatherContainer } from "./WeatherContainer";
import fetchMock from "jest-fetch-mock";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

beforeAll(() => {
  fetchMock.enableMocks();
  fetchMock.mockResponse(JSON.stringify({}));
});

afterEach(() => {
  fetchMock.resetMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});

describe("WeatherContainer", () => {
  it("should render placeholder when no city is set", () => {
    const { getByText } = renderWithProviders(<WeatherContainer />);
    expect(
      getByText(/Weather information will appear here/i)
    ).toBeInTheDocument();
  });
});
