const _ = require("lodash");
const debug = require("debug")("handshake3");
class TokenMap extends Map {
    get(key) {
        const token = super.get(key);
        if(!token) return null;

        const {issued, duration} = token;
        const now = Date.now() / 1000;
        const elapsed = now - issued;

        if(elapsed >= duration) {
            return null;    //expired
        }

        debug("Elapsed time for token is ", elapsed);
        debug("Remaining duration is ", duration - elapsed)

        const tokenForClient = {
            token: token.code,
            seconds: Math.floor(duration - elapsed),
            session: token.session
        }

        return tokenForClient;

    }

    set(key, session) {

        super.set(key, {
            issued: Date.now() / 1000,
            code: key,
            duration: 1200,
            session: session
        });

        const tokenForClient = {
            seconds: 1200,
            session: session,
            token: key
        }

        return tokenForClient;
    }
}

module.exports = TokenMap;