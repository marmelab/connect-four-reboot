import { REST_API_URL } from "../consts";

export type ApiResponse = {
  hello: string;
};

export const fetchHelloWorld = async (): Promise<ApiResponse> => {
  const response = await fetch(REST_API_URL);
  if (!response.ok) throw new Error("Failed to fetch hello world");
  return await response.json();
};
