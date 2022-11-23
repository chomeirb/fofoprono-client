export type ResponseResult<T> = {
    status: number,
    text: string,
    data: T,
}