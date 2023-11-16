const serviceID = {
    restaurant:'api::restaurant.restaurant',
    student:'api::student.student',
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
    const schema = {
        populate:{
            classes:{fields:['title',]},
            teacher:{fields:['title','description','sex']},
        } 
    }
    return schema;
}

module.exports = {
    serviceID,
    getStudent
} 