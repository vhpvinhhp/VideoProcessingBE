import { Request, Response } from 'express';
import { WatermartService } from '../services/watermart.service';
import * as path from 'path'
import Locals from '../providers/locals';

export class VideoController {
	constructor() { }

	public static handleWatermart = async (req: Request, res: Response, next): Promise<any> => {
		const { options, videoURL} = req.body;
		const watermartService = new WatermartService();
		const filename = `outputTemp.mp4`
		const outputPath: string =  path.join(__dirname, '../../storages', filename)
		const url: string = `${Locals.config().STORAGE_URL}/${filename}`

		const filter: Array<string> = watermartService.getFilterString(options);
		watermartService.renderWidthFilters(videoURL, filter, outputPath)

		return res.json({ url });
	}
}   