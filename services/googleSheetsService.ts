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
    // Build GET URL with parameters
    const getUrl = googleScriptUrl.replace(/\/exec$/, '/exec') + 
      `?websiteId=${encodeURIComponent(websiteId)}&websiteTitle=${encodeURIComponent(websiteTitle)}`;
    
    // Google Apps Script CORS workaround: Use a CORS proxy or direct fetch
    // Try direct fetch first (will work if script is properly deployed)
    try {
      const response = await fetch(getUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      let data: OrdersResponse;
      
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error(`Failed to parse response: ${text.substring(0, 100)}`);
      }
      
      return data;
    } catch (corsError) {
      // If CORS fails, try using a CORS proxy as fallback
      console.warn('Direct fetch failed, trying CORS proxy:', corsError);
      
      // Use a public CORS proxy (you can replace with your own if needed)
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(getUrl)}`;
      
      const proxyResponse = await fetch(proxyUrl, {
        method: 'GET',
        mode: 'cors',
      });

      if (!proxyResponse.ok) {
        throw new Error(`Proxy HTTP error! status: ${proxyResponse.status}`);
      }

      const proxyText = await proxyResponse.text();
      let proxyData: OrdersResponse;
      
      try {
        proxyData = JSON.parse(proxyText);
      } catch (parseError) {
        throw new Error(`Failed to parse proxy response: ${proxyText.substring(0, 100)}`);
      }
      
      return proxyData;
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

