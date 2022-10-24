const getCategoriesRequest = async () => {
    let resData = await fetch(
        "api/category/getall",
        {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(async (result) => {
            return result
        },
            (error) => {
                return error
            });
    return resData;
}

export default getCategoriesRequest

export const getCategoryByIdRequest = async (id) => {
    const response = await fetch(
        `api/category/${id}`,
        {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
    )
    const content = await response.json()
    return content;
}