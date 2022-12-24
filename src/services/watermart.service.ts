import { spawnSync } from "child_process";
import { WatermartImageOptions, WatermartTextOptions } from "src/types";
import * as path from 'path'
import Locals from "../providers/locals";

export class WatermartService {
	private cmd = 'ffmpeg';
	private fontFile = '/Windows/Fonts/arial.ttf';
    constructor() {}
	public getFilterString(options: WatermartTextOptions | WatermartImageOptions): Array<string> {
		if(options.type == 'text') {
			const optionsText: WatermartTextOptions = options;
			const fontFile = Locals.config().FONTS[optionsText?.fontStyle?.fontFile];
			if(!fontFile) {
				throw new Error('FontFile Required'); 
			}
			return [ 
				"-t", optionsText.time, 
				'-filter_complex', `drawtext=fontcolor=${optionsText.color}:fontfile=${fontFile}:text=${optionsText.content}:fontsize=${optionsText?.fontStyle?.fontSize}:x=${optionsText?.position.x}:y=${optionsText?.position.y}` 
			]
		} else if(options.type == 'image') {
			const optionsImage: WatermartImageOptions = options;
			return [ 
				'-i', options.image,
				'-t', options.time,
				'-filter_complex', `[1][0]scale2ref=w=oh*mdar:h=ih*${optionsImage.size / 100}[logo][video];[video][logo] overlay=${optionsImage?.position.x}:${optionsImage?.position.y}:format=auto,format=yuv420p`, 
			]
		}
	}

	public renderWidthFilters(url: string, filters: Array<string>, outputPath: string) {
		spawnSync(this.cmd, [
			'-y', 
			'-i', url,
			...filters,
			'-preset', 'ultrafast',
			'-f', 'mp4', outputPath
		]);
        return outputPath;
    }
}