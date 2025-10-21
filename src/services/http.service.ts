import { ENV } from "@src/ENV";
import SessionUtils from "@src/utils/session.utils";


interface IConfig {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
    body?: any;
    headers?: any;
    ignoreAuth?: boolean;
}

interface IResponse<T> {
    data: T;
    status: number;
    headers: Headers;
}


const getAuthHeaders = async (config?: IConfig): Promise<IConfig> => {
    const token = SessionUtils.getToken();
    if (token) {
        config = {
            ...(config || {}),
            headers: {
                ...config?.headers,
                'Authorization': `Bearer ${token}`,
            },
        };
    }
    return config || {} as IConfig;
}

const get = async <T>(path: string, config?: IConfig): Promise<IResponse<T>> => {
    try {
        config = await getAuthHeaders(config);
        const response = await fetch(`${ENV.API_BASE_URL}${path}`, { ...config, method: 'GET' });
        const data: T = await response.json();
        return {
            data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        throw new Error(error as any);
    }
};

const post = async <T>(path: string, config: IConfig): Promise<IResponse<T>> => {
    try {
        config = await getAuthHeaders(config);
        config.method = 'POST';
        const response = await fetch(`${ENV.API_BASE_URL}${path}`, { ...config });
        const data: T = await response.json();
        return {
            data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        throw new Error(error as any);
    }
};

const patch = async <T>(path: string, config: IConfig): Promise<IResponse<T>> => {
    try {
        config = await getAuthHeaders(config);
        config.method = 'PATCH';
        const response = await fetch(`${ENV.API_BASE_URL}${path}`, { ...config });
        const data: T = await response.json();
        return {
            data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        throw new Error(error as any);
    }
};

const put = async <T>(path: string, config: IConfig): Promise<IResponse<T>> => {
    try {
        config = await getAuthHeaders(config);
        config.method = 'PUT';
        const response = await fetch(`${ENV.API_BASE_URL}${path}`, { ...config });
        const data: T = await response.json();
        return {
            data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        throw new Error(error as any);
    }
};

const destroy = async <T>(path: string, config: IConfig): Promise<IResponse<T>> => {
    try {
        config = await getAuthHeaders(config);
        config.method = 'DELETE';
        const response = await fetch(`${ENV.API_BASE_URL}${path}`, { ...config });
        const data: T = await response.json();
        return {
            data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        throw new Error(error as any);
    }
};




const HttpClient = {
    get,
    post,
    put,
    patch,
    delete: destroy
};

export default HttpClient;