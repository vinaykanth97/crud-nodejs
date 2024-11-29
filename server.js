import { createServer } from 'http'
import { GetProductData, GetBodyData, WriteDataToFile, Logger } from './utils.js'
import { CreateProduct, GetAllProduct, UpdateProduct, DeleteProduct } from './controller/productController.js'


const PORT = process.env.PORT



const server = createServer((req, res) => {

    Logger(req, res, async () => {

        // res.writeHead(200, requiredHeaders)
        // let productsDatas = await GetProductData()

        if (req.url === "/getproductdetails" && req.method === "GET") {
            GetAllProduct(req, res)
            // res.write(JSON.stringify(productsDatas))
            // res.end()
        }
        else if (req.url === "/createproduct" && req.method === "POST") {

            CreateProduct(req, res)


            // let getBodyJson = await GetBodyData(req, res)
            // if (!getBodyJson) {
            //     res.write(JSON.stringify({ message: 'Sufficient Datas not sent' }))
            //     res.end()
            // } else {
            //     productData.push({ id: crypto.randomUUID(), ...getBodyJson })
            //     res.statusCode = 201
            //     WriteDataToFile(productData)
            //     res.write(JSON.stringify({ message: 'Product Created Successfully' }))
            //     res.end()
            // }
        } else if (req.url.match(/\/updateproductdetails\/([0-9A-Fa-f]{8}(-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$)/) && req.method === "PUT") {
            UpdateProduct(req, res)
            // let getBodyJson = await GetBodyData(req, res)
            // getBodyJson = JSON.parse(getBodyJson)
            // let getSpecificId = req.url.split('/')[2]
            // let findSpecificIndex = productsDatas.findIndex(products => products.id === getSpecificId)
            // if (findSpecificIndex !== -1) {
            //     productsDatas[findSpecificIndex] = {
            //         id: getSpecificId,
            //         ...getBodyJson
            //     }
            //     WriteDataToFile(productsDatas)
            //     res.write(JSON.stringify({ message: "Product updated Successfully" }))
            // } else {
            //     res.write(JSON.stringify({ message: "No Such product found" }))
            // }
            // res.end()
        } else if (req.url.match(/\/removeproduct\/([0-9A-Fa-f]{8}(-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$)/) && req.method === "DELETE") {
            DeleteProduct(req, res)
            // let getSpecificId = req.url.split('/')[2]
            // let findSpecificIndex = productsDatas.findIndex(products => products.id === getSpecificId)
            // if (findSpecificIndex !== -1) {
            //     let filterProducts = productsDatas.filter(products => products.id !== getSpecificId)
            //     WriteDataToFile(filterProducts)
            //     res.write(JSON.stringify({ message: "Product deleted Successfully" }))
            // } else {
            //     res.write(JSON.stringify({ message: "No Such product found" }))
            // }

            // res.end()
        } else {
            res.write(JSON.stringify({ message: "Route Not Found" }))
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server listening in PORT:${PORT}`);
})

server.on('error', (e) => {
    console.log(e);
});