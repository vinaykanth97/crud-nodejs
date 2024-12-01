import { Create, Find, Update, Remove } from "../model/productModel.js"
import { GetBodyData, GetProductData } from "../utils.js"

const requiredHeaders = {
    'Content-Type': 'application/json'
}
export const GetAllProduct = async (req, res) => {
    GetProductData().then(prodDatas => {
        res.writeHead(200, requiredHeaders)
        res.end(JSON.stringify(prodDatas))
    }).catch(error => {
        console.log(error)
    })
}

export const CreateProduct = async (req, res) => {
    try {
        let getBodyData = await GetBodyData(req)
        await Create(JSON.parse(getBodyData))
        res.writeHead(201, requiredHeaders)
        res.end(JSON.stringify({ message: 'Added new product' }))
    } catch (error) {
        res.end(JSON.stringify({ message: error.message }))
    }
}

export const UpdateProduct = async (req, res) => {
    let getSpecificId = req.url.split('/')[2]
    let getBodyData = await GetBodyData(req)
    await Find(getSpecificId).then(specificProductIndex => {
        if (specificProductIndex !== -1) {
            Update(specificProductIndex, JSON.parse(getBodyData))
            res.writeHead(201, requiredHeaders)
            res.end(JSON.stringify({ message: 'Updated requested product' }))
        } else {
            res.writeHead(404, requiredHeaders)
            res.end(JSON.stringify({ message: 'Product not found' }))
        }
    }).catch(err => {
        console.log(err)
    })
}

export const DeleteProduct = (req, res) => {
    let getSpecificId = req.url.split('/')[2]
    Find(getSpecificId).then(specificProductIndex => {
        if (specificProductIndex !== -1) {
            Remove(getSpecificId)
            res.writeHead(201, requiredHeaders)
            res.end(JSON.stringify({ message: 'Product Removed!' }))
        } else {
            res.writeHead(404, requiredHeaders)
            res.end(JSON.stringify({ message: 'Product not found' }))
        }
    }).catch(err => {
        console.log(err)
    })
}