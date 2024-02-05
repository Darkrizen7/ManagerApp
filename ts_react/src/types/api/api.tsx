export interface API_RETURN<T> {
    success?: boolean
    data?: T
    error?: Error
}
export interface API_RETURN_DATA {
}
export interface API_RETURN_FILE extends API_RETURN_DATA {

}