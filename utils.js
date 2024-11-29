import path from 'path';
import productData from './data/products.json' with { type: "json" }
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const GetProductData = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(productData)
        } catch (error) {
            console.log(error);
            reject(productData)
        }
    })
}

export const WriteDataToFile = (data) => {
    writeFileSync(path.resolve(__dirname, 'data/products.json'), JSON.stringify(data))
}

export const GetBodyData = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let bodyData = ""
            req.on('data', (chunk) => {
                bodyData += chunk.toString()
            })
            req.on('end', () => {
                resolve(bodyData)
            })
            req.on('error', (err) => {
                reject(err);
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const Logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
}