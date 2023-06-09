import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./auth.dto";
import { MetaType } from "./decorators/jwtMeta.decorator";

@Injectable()
export class AuthService {

    getLangList() { }

    login(authLoginDto: AuthLoginDto, meta: MetaType) { }

    register(body: any, IP: string) { }

    refresh(token: string, meta: MetaType) { }

    restore(login: string) { }

    logOut(tokenID: string) { }

    getSessions(userID: string) { }

    killSession(userID: string, tokenID: string) { }

    killAllSessions(userID: string, tokenID: string) { }

}