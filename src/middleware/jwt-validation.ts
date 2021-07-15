import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default function validarJWT(req: any, res: Response, next: NextFunction)  {
    console.log('ENro')
    // Leer el Token
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {   
        const env: string = process.env["JWT_SECRET"] as string;
        const { id } : any = jwt.verify( token,env );
        req.id = id;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}
