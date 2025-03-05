import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Logger } from './logger.service';
import { ApiResponse } from '../api/api-response';
import { throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlingService {

    constructor(
        private logger: Logger,
        private snackBar: MatSnackBar // Angular Material Snackbar for user notifications
    ) { }

    /**
     * Handles HTTP errors and ApiResponse errors, logs them, and notifies the user.
     * @param error - The error to handle.
     * @returns - An observable with a user-facing error message.
     */
    public handleError(error: HttpErrorResponse | any): Observable<never> {
        let errorMessage = 'An unexpected error occurred.';

        if (error instanceof HttpErrorResponse) {
            // Handle HTTP errors
            if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred.
                errorMessage = `Client-side error: ${error.error.message}`;
            } else {
                // The backend returned an unsuccessful response code.
                errorMessage = `Server error: ${error.status} ${error.message}`;
            }
            this.logger.error(errorMessage);
        } else if (error instanceof ApiResponse) {
            // Handle ApiResponse errors
            if (error.errors) {
                errorMessage = `API Error: ${JSON.stringify(error.errors)}`;
                this.logger.error(errorMessage);
            } else {
                errorMessage = 'An unexpected API response error occurred.';
                this.logger.error(errorMessage);
            }
        }

        // Notify the user
        this.showNotification(errorMessage);

        // Return an observable with a user-facing error message
        return throwError(() => new Error(errorMessage));
    }

    /**
     * Displays a notification to the user.
     * @param message - The message to display.
     */
    private showNotification(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
        });
    }
}
