const getUsedStatesRequest = async () => {

    let resData = await fetch(
        "api/usedstate/getall",
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

export default getUsedStatesRequest

export const getUsedStateByIdRequest = async (id) => {
    const response = await fetch(
        `api/usedstate/${id}`,
        {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
    )
    const content = await response.json()
    return content;
}