import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { NextApiRequest, NextApiResponse } from "next";

type MyDataQueryParams = {
    offset?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { offset = '0' } = req.query as MyDataQueryParams;
    const comics = await getComics(parseInt(offset), 12)
    res.status(200).json(comics.data)
}