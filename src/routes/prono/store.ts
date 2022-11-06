import { goto } from '$app/navigation';
import { page as Page } from '$app/stores';
import { games } from '../store';

const URLSearchParamsToObject = (params: URLSearchParams) =>
{
    let obj: Record<string, string> = {};
    params.forEach((val: string, key: string) =>
    {
        obj[key] = val;
    });
    return obj;
};

export const getQueryParamsStore = (key: string) =>
{
    let params: Record<string, string>;
    Page.subscribe((page) =>
    {
        params = URLSearchParamsToObject(page.url.searchParams);
    });

    return {
        subscribe: (cb: Function) =>
        {
            return Page.subscribe((page) =>
            {
                cb(page.url.searchParams.get(key) ?? '');
            });
        },
        set: (value: string) =>
        {
            params[key] = value;
            const urlSearchParams = new URLSearchParams(params);
            goto(`?${urlSearchParams.toString()}`, {
                keepfocus: true,
                replaceState: true,
                noscroll: true
            });
        }
    };
};