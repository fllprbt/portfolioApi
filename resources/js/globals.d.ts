import { AxiosInstance } from 'axios';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        axios: AxiosInstance;
    }
}
