export const getOffersByFilteringRequest = async ({
                                                      userId,
                                                      offerPrice,
                                                      isActive,
                                                      isAccepted,
                                                      toUserId,
                                                      fromUserId,
                                                      lowerThanPrice,
                                                      orderByPrice
                                                  }) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/offer/getbyfiltering`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                userId: userId,
                offerPrice: offerPrice,
                isActive: isActive,
                isAccepted: isAccepted,
                toUserId: toUserId,
                fromUserId: fromUserId,
                lowerThanPrice: lowerThanPrice,
                orderByPrice: orderByPrice
            })
        }
    )

    const result = await response.json()
    return result
}