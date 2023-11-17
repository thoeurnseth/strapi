const serviceID = {
    restaurant:'api::restaurant.restaurant',
    student:'api::student.student',
    category:'api::category.category',
    product:'api::product.product',
}

// function getStoryteacher(){
//     const schema = {
//         filters:{
//             // academic:{external:{"$eq":academic}},
//             // students:{external:{"$eq":student}}
//         },
//         populate:{
//             academic:{fields:['title','external']},
//             classes:{fields:['title','external']},
//             resource:{fields:['url']},
//             file:{fields:['url']}
//         }
//     }

//     return schema
// }

function getStudent(){

}

function createCategory(title,description,resource,file,slug,currentdate){
    const schema = {
        data:{
            title:title,
            image:resource,
            description:description,
            file:file,
            slug:slug,
            publishedAt:currentdate,
        }
    }
    return schema
}

function updateCategory(title,description,resource,file,slug){
    const schema = {
        data:{
            title:title,
            image:resource,
            description:description,
            file:file,
            slug:slug,
        }
    }
    return schema
}

function getProduct(){
    const schema = {
        sort: { createdAt: 'DESC' },
        fields: ["id", "title","description","price","regular_price",],
        populate:{
            category:{fields:['title','description','slug']},
            image:{fields:['id','url']}
        } 
    }
    return schema;
}

function createProduct(title,description,price,regular_price,currentdate,image,category){
    const schema = {
        data:{
            title:title,
            description:description,
            price:price,
            regular_price:regular_price,
            image:image,
            publishedAt:currentdate,
            category:{connect:category},

        }
    }
    return schema;
}

function updateProduct(title,description,price,regular_price,image,category){
    const schema = {
        data:{
            title:title,
            description:description,
            price:price,
            regular_price:regular_price,
            image:image,
            category:{connect:category}
        }
    }
    return schema;
}

module.exports = {
    getStudent,
    serviceID,
    createCategory,
    updateCategory,
    getProduct,
    createProduct,
    updateProduct
} 