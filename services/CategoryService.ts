export default class CategoryService{
    retrieveData(category: String): Promise<Response> {
        return fetch(process.env.BACK_API + "/categories/" + category); 
    }
}