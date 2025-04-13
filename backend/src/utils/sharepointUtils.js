import fetch from 'node-fetch';
import GraphInterface from "graph-interface";

export async function getAllSpListItems(url) {
  const token = await getMsAccessToken();
  let allItems = [];

  // Loop until no nextLink is provided
  while (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching items: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    // Add current page of items to our array.
    allItems = allItems.concat(data.value);
    // Check if there's a nextLink to fetch the next page.
    url = data["@odata.nextLink"] || null;
  }

  console.log("done fetching");
  return allItems;
}

export const transformItems = (items) => {
  return items.map(item => {
    return {
      "@odata.etag": item["@odata.etag"],
      ...item.fields // Spread the fields object to include all its properties
    };
  });
};

export async function getMsAccessToken() {
  const graph = new GraphInterface(
    {
      tenantId: process.env.TENANT_ID,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    { cacheAccessTokenByDefault: true },
  );
  const graphtoken = await graph.getAccessToken({
    useCache: false,
    method: "GET",
    headers: {},
    body: null,
    keyMapper: null,
  });
  return graphtoken;
}
