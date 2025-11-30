import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const route = req.originalUrl || req.url;
    const ip = req.ip || req.socket.remoteAddress;

    console.log(`[${timestamp}] ${method} ${route} - IP: ${ip}`);

    next();
};
