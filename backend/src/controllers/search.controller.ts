import {Request, Response} from 'express';
import {executeSearch} from "../../utils/search/executeSearch";

export async function searchControl(request: Request, response: Response) {
    try {
        const data = await executeSearch(request.body)
        return response.json({status: 200, message: 'Search successful.', data})
    } catch (error) {
        {
            return response.json({status: 400, message: 'Bad search.', data: null})
        }
    }
}

