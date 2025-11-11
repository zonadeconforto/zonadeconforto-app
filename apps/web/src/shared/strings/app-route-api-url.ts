/**
 * Class to hold a list of URL (endpoint) of the API
 */
export class AppRouteApiUrl {
    public static readonly BASE = '/api';
    public static readonly BASE_AUTH = `${AppRouteApiUrl.BASE}/auth`;
    public static readonly LOGIN = `${AppRouteApiUrl.BASE_AUTH}/login`;
}
