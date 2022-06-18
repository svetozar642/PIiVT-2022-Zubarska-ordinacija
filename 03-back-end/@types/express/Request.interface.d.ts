import IKorisnikTokenData from '../../src/components/auth/dto/IKorisnikTokenData';

declare global {
    namespace Express {
        interface Request {
            authorisation ?: IKorisnikTokenData | null;
        }
    }
}