import { GetProductData, WriteDataToFile } from "../utils.js"


export const Create = (bodyData) => {
    return GetProductData().then(allProductData => {
        allProductData.push({ id: crypto.randomUUID(), ...bodyData })
        WriteDataToFile(allProductData)
        return allProductData
    })
}

export const Find = (id) => {
    return GetProductData().then(allProductData =>
        allProductData.findIndex(prod => prod.id === id)
    )
}

export const Update = (index, bodyData) => {
    return GetProductData().then(allProductData => {
        allProductData[index] = bodyData
        // WriteDataToFile(allProductData)
        return allProductData
    })
}

export const Remove = (id) => {
    return GetProductData().then(allProductData => {
        let removedProduct = allProductData.filter(prod => prod.id !== id)  
        WriteDataToFile(removedProduct)
        return removedProduct
    })
}