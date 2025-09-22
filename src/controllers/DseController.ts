import { JsonController, Get, QueryParam, BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { StockDataService } from "../services/DsePriceService";
import { apiResponse } from "../utils/helpers";

@JsonController("/v1/dse")
@Service()
export class PriceController {
  constructor(private stockDataService: StockDataService) {}

  @Get("/hello")
  getHello() {
    return apiResponse(
      { 
        message: "Bangladesh Stock Market API is running!",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
      },
      "API is healthy and ready to serve stock data"
    );
  }

  @Get("/latest")
  async getStockData() {
    try {
      const data = await this.stockDataService.getStockData();
      return apiResponse(
        data,
        `Retrieved ${data.length} latest stock records`,
        true
      );
    } catch (error) {
      throw new BadRequestError("Failed to fetch latest stock data");
    }
  }

  @Get("/dsexdata")
  async getDsexData(@QueryParam("symbol") symbol?: string) {
    try {
      const data = await this.stockDataService.getDsexData(symbol);
      const message = symbol 
        ? `Retrieved DSEX data for symbol: ${symbol.toUpperCase()}`
        : `Retrieved ${data.length} DSEX records`;
      
      return apiResponse(data, message, true);
    } catch (error) {
      throw new BadRequestError("Failed to fetch DSEX data");
    }
  }

  @Get("/top30")
  async getTop30() {
    try {
      const data = await this.stockDataService.getTop30();
      return apiResponse(
        data,
        `Retrieved top 30 stock records`,
        true
      );
    } catch (error) {
      throw new BadRequestError("Failed to fetch top 30 stock data");
    }
  }

  @Get("/historical")
  async getHistData(
    @QueryParam("start") start: string,
    @QueryParam("end") end: string,
    @QueryParam("code") code: string = "All Instrument"
  ) {
    // Validate required parameters
    if (!start || !end) {
      throw new BadRequestError("Both 'start' and 'end' date parameters are required. Format: YYYY-MM-DD");
    }

    // Basic date format validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start) || !dateRegex.test(end)) {
      throw new BadRequestError("Invalid date format. Use YYYY-MM-DD format");
    }

    // Check if start date is before end date
    if (new Date(start) > new Date(end)) {
      throw new BadRequestError("Start date must be before or equal to end date");
    }

    try {
      const data = await this.stockDataService.getHistData(start, end, code);
      return apiResponse(
        data,
        `Retrieved ${data.length} historical records from ${start} to ${end} for ${code}`,
        true
      );
    } catch (error) {
      throw new BadRequestError("Failed to fetch historical data");
    }
  }

  @Get("/status")
  async getApiStatus() {
    return apiResponse(
      {
        service: "Bangladesh Stock Market API",
        status: "operational",
        endpoints: {
          latest: "/v1/dse/latest",
          dsexData: "/v1/dse/dsexdata?symbol=<optional>",
          top30: "/v1/dse/top30",
          historical: "/v1/dse/historical?start=<date>&end=<date>&code=<optional>",
          hello: "/v1/dse/hello"
        },
        dataSource: "dsebd.org",
        lastUpdated: new Date().toISOString()
      },
      "API status information"
    );
  }
}
