export interface IApiResponsePayload {
    title: string;
    status: string;
    description?: string | Record<string, string>;
}
