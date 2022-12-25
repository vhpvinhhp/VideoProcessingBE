export interface FontStyle { 
    fontSize: string
}

export interface Position {
    x: string,
    y: string
}

export interface WatermartTextOptions {
    type: string,
    content?: string,
    image?: string,
    size: number,
    time: string,
    color?: string,
    fontStyle?: FontStyle,
    position: Position
}

export interface WatermartImageOptions {
    type: string,
    image?: string,
    time: string,
    size: number,
    position: Position
}