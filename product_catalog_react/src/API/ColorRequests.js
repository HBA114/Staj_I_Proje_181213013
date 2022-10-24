const getColorsRequest = async () => {
    let resData = await fetch(
        process.env.REACT_APP_API_URL + "api/color/getall",
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

export default getColorsRequest

export const getColorByIdRequest = async (id) => {
    const response = await fetch(
        process.env.REACT_APP_API_URL + `api/color/${id}`,
        {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
    )
    const content = await response.json()
    return content;
}