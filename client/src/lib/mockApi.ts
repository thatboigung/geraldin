import { categories, products, blogPosts, artistProfile } from "./mockData";

type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
  text: () => Promise<string>;
};

export async function handleMockRequest(method: string, url: string, data?: unknown): Promise<MockResponse> {
  // Only implement minimal GET behavior used by the client pages
  if (method.toUpperCase() === "GET") {
    if (url === "/api/categories") {
      return {
        ok: true,
        status: 200,
        json: async () => categories,
        text: async () => JSON.stringify(categories),
      };
    }

    if (url === "/api/products") {
      return {
        ok: true,
        status: 200,
        json: async () => products,
        text: async () => JSON.stringify(products),
      };
    }

    if (url === "/api/blog") {
      return {
        ok: true,
        status: 200,
        json: async () => blogPosts,
        text: async () => JSON.stringify(blogPosts),
      };
    }

    if (url === "/api/artist") {
      return {
        ok: true,
        status: 200,
        json: async () => artistProfile,
        text: async () => JSON.stringify(artistProfile),
      };
    }
  }

  // Default: not found
  return {
    ok: false,
    status: 404,
    json: async () => ({ message: "Not found (mock)" }),
    text: async () => JSON.stringify({ message: "Not found (mock)" }),
  };
}
