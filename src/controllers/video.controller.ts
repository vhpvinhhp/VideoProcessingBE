import { Request, Response } from 'express';
import { WatermartService } from '../services/watermart.service';
import * as path from 'path'
import Locals from '../providers/locals';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class VideoController {
	constructor() { }

	public static handleWatermart = async (req: Request, res: Response, next): Promise<any> => {
		const { options, videoURL} = req.body;
		const watermartService = new WatermartService();
		const filename = `${uuidv4()}.mp4`;
		const outputPath: string =  path.join(Locals.config().STORAGE_PATH,filename);
		const tempPath: string =  path.join(Locals.config().STORAGE_PATH,'/temps/',filename);
		const url: string = `${Locals.config().STORAGE_URL}/${filename}`

		const filter: Array<string> = watermartService.getFilterString(options);
		const newVideo = watermartService.renderWidthFilters(videoURL, filter, tempPath)
		watermartService.mergeVideo(newVideo, outputPath)
		fs.unlink(tempPath,() => console.log('Removed temp File'));
		if(!fs.existsSync(outputPath)) {
			return res.status(400).json({ messenge : 'The proccess failed, Try again, please!'});
		}
		return res.status(200).json({ url });
	}
}   