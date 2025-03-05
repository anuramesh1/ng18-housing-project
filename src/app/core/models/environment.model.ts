// create a Environment model
export class Environment {
    environmentName: string = '';
    anyMapKey: string = '';

    constructor(public data: any) {
        if(!data) {
            return;
        }
        this.environmentName = data.environmentName;
        this.anyMapKey = data.anyMapKey;
    }
}