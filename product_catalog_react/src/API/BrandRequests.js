const getBrandsRequest = async () => {
    let resData = await fetch(
        process.env.REACT_APP_API_URL + "api/brand/getall",
        {
            headers: {'Content-Type': 'application/json'},
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

export default getBrandsRequest

export const getBrandsByFilteringRequest = async ({name,categoryId}) => {
    const response = await fetch(
        process.env.REACT_APP_API_URL + 'api/brand/getbyfiltering',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                categoryId: categoryId
            })
        }
    )
    const result = await response.json()
    return result
}

export const getBrandByIdRequest = async (id) => {
    const response = await fetch(
        process.env.REACT_APP_API_URL + `api/brand/${id}`,
        {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
    )
    const content = await response.json()
    return content;
}