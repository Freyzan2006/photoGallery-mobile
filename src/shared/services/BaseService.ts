

export class BaseService {
    constructor(private readonly baseUrl: string, private readonly apiKey?: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    public getBaseUrl() {
        return this.baseUrl;
    }

    public getApiKey() {
        return this.apiKey;
    }
}