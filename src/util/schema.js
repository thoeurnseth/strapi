const serviceID = {
    restaurant:'api::restaurant.restaurant',
    category:'api::category.category',
    product:'api::product.product',
    plusgate:'api::plusgate.plusgate',
    carts:'api::cart.cart',
    cartItemt:'api::cart-item.cart-item',
    order:'api::order.order',
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

function getCategory(){
    const schema = {
        filters:{
            publishedAt:{"$ne":null}
        },
    }
    return schema;
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

function toTrash(){
    const schema = {
        data:{
            publishedAt: null
        }
    }
    return schema
}

function getProduct(){
    const schema = {
        filters:{
            publishedAt:{"$ne":null}
        },
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

function getCart(userId){
    const schema = {
        filters:{
            users_permissions_user:{id:{"$eq":userId}},
        },
    }
    return schema;
}

function getCartItemt(cartId){
    const schema = {
        filters:{
            cart: { id: cartId },
        },
        populate:{
            // cart: { fields:['id']},
            product:{fields:['title','description']}
        }
    }
    return schema;
}

function createCart(userId,currentdate){
    const schema = {
        data: {
            publishedAt:currentdate,
            users_permissions_user:{connect:[userId]},
        },
    }
    return schema;
}

function createCartItemt(cart,product,qty,currentdate){
    const schema = {
        data: {
            qty:qty,
            cart:{connect:[cart]},
            product:{connect:[product]},
            publishedAt:currentdate,
        },
    }
    return schema;
}

function updateCartItemt(cartId,prodcutId,qty){
    const schema = {
        data: {
            qty:qty,
        },
    }
    return schema;
}

function dalateCartItmems(cartId , prodcutId){
    const schema = {
        filters:{
            cart:{id:{"$eq":cartId}},
            product:{id:{"$eq": prodcutId}}
        }
    }
    return schema;
}

function createOrder(paymentMethod,totalPrice,userId,deliveryStatus,currentdate){
    const schema = {
        data: {
            total:totalPrice,
            paymentMethod:paymentMethod,
            publishedAt:currentdate,
            deliveryStatus:deliveryStatus,
            users_permissions_user:{connect:[userId]},
        },
    }
    return schema;
}

function createCoupon(couponOwner,descriptionOwner,couponAmount,currentdate){
    const schema = {
        data: {
            code:couponOwner,
            description:descriptionOwner,
            couponAmount:couponAmount,
            usageLimit:'1',
            couponType:'Percentage discount',
            publishedAt:currentdate,
        },
    }
    return schema;
}

module.exports = {
    serviceID,
    createCategory,
    updateCategory,
    getProduct,
    createProduct,
    updateProduct,
    toTrash,
    getCategory,
    getCart,
    createCart,
    getCartItemt,
    createCartItemt,
    updateCartItemt,
    dalateCartItmems,
    createOrder,
    createCoupon,
} 