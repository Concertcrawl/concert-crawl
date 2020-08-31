import {Request, Response} from 'express';
import {executeSearch} from "../../utils/search/executeSearch";

export async function searchControl(request: Request, response: Response) {
    try {
        // @ts-ignore Does not know value of input yet.
        const data = await executeSearch(request.params)
        return response.json({status: 200, message: 'Search successful.', data})
    } catch (error) {
        {
            return response.json({status: 400, message: 'Bad search.', data: null})
        }
    }
}

