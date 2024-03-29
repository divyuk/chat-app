import { commonResponseMessages, statusMappings } from "../data/constants";

class AppResponse {
  public message: string;
  public statusCode: string;
  public status: string;
  public data: any;
  public isOperational: boolean;

  constructor(message: any, data: any = null, statusCode: any = null) {
    this.message = message;
    this.statusCode = statusCode || this.getStatusCode(message);
    this.status = this.getStatus(this.statusCode);
    this.data = data;
    this.isOperational = true;
  }

  getStatusCode(message: string) {
    const matchingKey = Object.keys(commonResponseMessages).find(
      (key: string) => commonResponseMessages[key] === message
    );

    return matchingKey ? statusMappings[matchingKey] : 500;
  }

  getStatus(statusCode: string) {
    if (String(statusCode).startsWith("4")) {
      return "failed";
    }
    if (String(statusCode).startsWith("5")) {
      return "error";
    }
    return "success";
  }
}

export default AppResponse;
