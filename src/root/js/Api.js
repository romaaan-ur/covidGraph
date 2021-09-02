import request from "./request";

class API {
    constructor() {}
    async getSummary(){
        const response = await request({
            url: '/summary'
        });
        return response.data
    }
    async getSummaryByCountry({word}) {
        const response = await request({
            url: `/dayone/country/${word}`
        })
        return response.data
    }
}

export default API;