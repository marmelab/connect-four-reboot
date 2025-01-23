export type ApiResponse = {
  hello: string;
};

const backendUrl = import.meta.env.VITE_REST_API_URL || "http://localhost:3000";

export const fetchHelloWorld = async (): Promise<ApiResponse> => {
  const response = await fetch(backendUrl);
  if (!response.ok) throw new Error("Failed to fetch hello world");
  return await response.json();
};
