// const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export interface Stats {
  totalRequests: number;
  processedRequests: number;
}

export const managerAPI = {
  getStats: async (_city: string, _period: string): Promise<Stats> => {
    // Mocking the API response for now
    // In a real scenario, uncomment the fetch code below and remove the mock
    /*
    const accessToken = tokenStorage.getAccessToken();
    const response = await fetch(
      `${API_BASE_URL}/manager/stats?city=${city}&period=${period}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }
    return await response.json();
    */

    // Mock data with a delay to simulate loading
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockStats: Stats = {
          totalRequests: Math.floor(Math.random() * 100) + 10, // Random between 10-109
          processedRequests: Math.floor(Math.random() * 50) + 5, // Random between 5-54
        };
        resolve(mockStats);
      }, 1500); // 1.5 second delay for loading simulation
    });
  },
};
