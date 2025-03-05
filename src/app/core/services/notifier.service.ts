import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
})
export class Notifier {

    constructor(private toastr: ToastrService) { }

    alert(body: string, title?: string) {
        this.toastr.success(body, title);
    }

    success(body: string, title?: string) {
        this.toastr.success(body, title);
    }

    error(body: string, title?: string) {
        this.toastr.error(body, title);
    }

    info(body: string, title?: string) {
        this.toastr.info(body, title);
    }   

    warning(body: string, title?: string) {
        this.toastr.warning(body, title);
    }   

    clear() {
        this.toastr.clear();
    }
}