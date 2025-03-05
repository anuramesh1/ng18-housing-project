import { ApiError, InvalidResponseError } from "./errors";

export class ApiResponse {
    data: any | Array<any>;
    errors: any| Array<ApiError>;
    included: any | Array<any>;
    meta: any;
    status: number;
  
    constructor(public nativeResponse: any) {
        if(nativeResponse.status == 204) {
            this.status = 204;
            this.data = undefined; // empty data;
            this.errors = undefined;
            this.included = undefined;
            this.meta = undefined;
            // this.handleStatusCode(nativeResponse.status);
        } else {
            try {
                // This depends on how the microservice returns the response. 
                // If the response returns the data, included, error and meta, the following code will work
                const body = nativeResponse.body;
                
                this.data = (body.data || body.data === false) ? body.data : body;
                this.errors = body.errors;
                this.included = body.included;
                this.meta = body.meta;
            } catch (error) {
                this.data = undefined;
                this.errors = [new InvalidResponseError()]
                this.included = undefined;
                this.meta = undefined;
            }

            this.status = nativeResponse.status;
        }
      
    }

    hasErrors(): boolean {
        return this.errors && this.errors.length > 0;
    }

    getFirstError(): ApiError { 
        if(this.hasErrors()) {
            return this.errors[0];
        } else {
            return new ApiError('UNKNOWN_ERROR', 'An unknown error has occurred');
        }
    }

    deserializeErrors(errors: Array<any>): Array<ApiError> {
        if(errors === undefined || errors === null) {
            return [];
        }
        
        return errors.map(error => new ApiError(error.id, error.message));
    }
  
    private handleStatusCode(status: number): void {
      switch (status) {
        case 200:
          console.log('Request was successful');
          break;
        case 201:
          console.log('Resource was created successfully');
          break;
        case 204:
          console.log('No content to return');
          break;
        case 400:
          console.log('Bad request');
          break;
        case 401:
          console.log('Unauthorized access');
          break;
        case 403:
          console.log('Forbidden access');
          break;
        case 404:
          console.log('Resource not found');
          break;
        case 500:
          console.log('Internal server error');
          break;
        default:
          console.log(`Unhandled status code: ${status}`);
          break;
      }
    }
  }
  