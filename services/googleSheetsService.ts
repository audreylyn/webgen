/**
 * Service to fetch order data from Google Sheets via Apps Script
 */

interface Order {
  orderId: string;
  dateTime: string;
  customerName: string;
  location: string;
  items: string;
  itemDetails: string;
  totalAmount: string;
  note: string;
  status: string;
}

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  ready: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
}

interface OrdersResponse {
  result: string;
  orders?: Order[];
  stats?: OrderStats;
  spreadsheetUrl?: string;
  error?: string;
}

export const fetchOrdersFromSheets = async (
  googleScriptUrl: string,
  websiteId: string,
  websiteTitle: string
): Promise<OrdersResponse | null> => {
  try {
    // 1. Prepare the URL
    // We add a timestamp parameter (&_t=) to prevent browser caching.
    // This allows us to remove 'cache: no-cache' from the fetch options,
    // which prevents the browser from triggering a CORS Preflight check.
    const baseUrl = googleScriptUrl.replace(/\/exec$/, '/exec');
    const queryParams = new URLSearchParams({
      websiteId: websiteId,
      websiteTitle: websiteTitle,
      _t: Date.now().toString() // Cache buster
    });
    
    const getUrl = `${baseUrl}?${queryParams.toString()}`;
    
    // 2. Direct Fetch (Simple Request)
    // IMPORTANT: Do NOT add 'headers' object or 'cache: no-cache'.
    // Keeping this a "Simple Request" is critical for Google Apps Script.
    try {
      const response = await fetch(getUrl, {
        method: 'GET',
        mode: 'cors',
        // cache: 'no-cache', // <--- REMOVED: This causes the CORS Preflight error
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      let data: OrdersResponse;
      
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        // GAS sometimes returns HTML error pages instead of JSON on failure
        console.error('Raw response:', text);
        throw new Error(`Failed to parse response. Server might be down or returning HTML.`);
      }
      
      return data;

    } catch (corsError) {
      // If the direct fetch still fails (e.g. strict firewall), fall back to proxy
      console.warn('Direct fetch failed, trying CORS proxy:', corsError);
      
      // Use a public CORS proxy as fallback
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(getUrl)}`;
      
      const proxyResponse = await fetch(proxyUrl, {
        method: 'GET',
        mode: 'cors',
      });

      if (!proxyResponse.ok) {
        throw new Error(`Proxy HTTP error! status: ${proxyResponse.status}`);
      }

      const proxyText = await proxyResponse.text();
      return JSON.parse(proxyText);
    }
  } catch (error) {
    console.error('Error fetching orders from Google Sheets:', error);
    return {
      result: 'error',
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export type { Order, OrderStats, OrdersResponse };