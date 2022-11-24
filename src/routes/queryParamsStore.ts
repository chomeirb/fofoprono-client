import { goto } from '$app/navigation';
import { page } from '$app/stores';

const URLSearchParamsToObject = (params: URLSearchParams) => {
    let obj: Record<string, string> = {};
    params.forEach((val: string, key: string) => {
        obj[key] = val;
    });
    return obj;
};

export const getQueryParamsStore = (key: string) => {
    let params: Record<string, string>;
    page.subscribe((p) => {
        params = URLSearchParamsToObject(p.url.searchParams);
    });

    return {
        subscribe: (cb: Function) => {
            return page.subscribe((p) => {
                cb(p.url.searchParams.get(key) ?? '');
            });
        },
        set: (value: string) => {
            if (value === '') {
                delete params[key];
            } else {
                params[key] = value;
            }
            const urlSearchParams = new URLSearchParams(params).toString();
            goto(`?${urlSearchParams}`, {
                keepfocus: true,
                replaceState: true,
                noscroll: true
            });
        }
    };
};