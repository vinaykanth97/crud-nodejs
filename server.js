import { createServer } from 'http'
import { GetProductData, GetBodyData, WriteDataToFile, Logger } from './utils.js'
import { CreateProduct, GetAllProduct, UpdateProduct, DeleteProduct } from './controller/productController.js'


const PORT = process.env.PORT



const server = createServer((req, res) => {

    Logger(req, res, async () => {
        if (req.url === "/getproductdetails" && req.method === "GET") {
            GetAllProduct(req, res)
        }
        else if (req.url === "/createproduct" && req.method === "POST") {
            CreateProduct(req, res)
        } else if (req.url.match(/\/updateproductdetails\/([0-9A-Fa-f]{8}(-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$)/) && req.method === "PUT") {
            UpdateProduct(req, res)
        } else if (req.url.match(/\/removeproduct\/([0-9A-Fa-f]{8}(-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$)/) && req.method === "DELETE") {
            DeleteProduct(req, res)
        } else {
            res.end(JSON.stringify({ message: "Route Not Found" }))
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server listening in PORT:${PORT}`);
})

server.on('error', (e) => {
    console.log(e);
});