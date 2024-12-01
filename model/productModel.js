import { GetProductData, WriteDataToFile } from "../utils.js"
import Product from "./productSchema.js"


export const Create = (bodyData) => {
    return new Promise(async (resolve, reject) => {
        let getProductData = await GetProductData()
        const product = await new Product({
            id: crypto.randomUUID(),
            ...bodyData
        })
        await product.validate().then(() => {
            getProductData.push(product)
            WriteDataToFile(getProductData)
            resolve(getProductData)
        }).catch(error => reject(error))
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
        WriteDataToFile(allProductData)
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