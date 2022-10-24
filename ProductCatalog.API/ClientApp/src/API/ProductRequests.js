import { useState } from "react";
import cookies from "js-cookie";

const getProductsRequest = async () => {
    let resData = await fetch("api/product/getall", { headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
        .then(res => res.json())
        .then(async (result) => {
            return result
        },
            (error) => {
                return error
            });
    return resData;
}

export default getProductsRequest

export const postProductRequest = async ({ name, description, price, isOfferable, userId, categoryId, usedStateId, colorId, brandId, imageBase64 }) => {

    let jwt = `Bearer ${cookies.get('jwt')}`
    const response = await fetch(
        'api/product/create',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': jwt },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                description: description,
                imageBase64: imageBase64,
                userId: userId,
                categoryId: categoryId,
                price: price,
                isOfferable: isOfferable,
                usedStateId: usedStateId,
                colorId: colorId,
                brandId: brandId,
            })
        }
    )

    const result = await response.json()
    return result
}

export const getProductByIdRequest = async (id) => {
    const response = await fetch(
        `api/product/${id}`,
        {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }
    )
    const content = await response.json()
    return content;
}