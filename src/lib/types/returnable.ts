export type ResponseResult<Data> = {
    status: number,
    text: string,
    data: Data,
}