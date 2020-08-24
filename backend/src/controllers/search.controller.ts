import {Request, Response} from 'express';
import { connect } from "../database";
import {executeSearch} from "../../utils/search/executeSearch";

export async function searchControl(request: Request, response: Response) {
    const data = await executeSearch(request.params)
    return response.json({status:200, message: null, data})
}

