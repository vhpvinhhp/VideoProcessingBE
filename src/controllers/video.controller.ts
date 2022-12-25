import { Request, Response } from 'express';
import { WatermartService } from '../services/watermart.service';
import * as path from 'path'
import Locals from '../providers/locals';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

export class VideoController {
	public static handleWatermart = async (req: Request, res: Response) : Promise< string | object> => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return { errors: errors.array() };
		}      
		const { options, videoURL} = req.body;
		const watermartService = new WatermartService();
		const filename = `${uuidv4()}.mp4`;
		const outputPath: string =  path.join(Locals.config().STORAGE_PATH,filename);
		const tempPath: string =  path.join(Locals.config().STORAGE_PATH,'/temps/',filename);
		const url = `${Locals.config().STORAGE_URL}/${filename}`

		const filter: Array<string> = watermartService.getFilterString(options);
		const newVideo = watermartService.renderWidthFilters(videoURL, filter, tempPath)
		watermartService.mergeVideo(newVideo, outputPath)
		if(!fs.existsSync(outputPath)) {
			throw new Error('The proccess failed, Try again, please!');
		}
		fs.unlink(tempPath,() => {});
		return { data: url };
	}
}   