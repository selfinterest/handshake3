// H3 server

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-body-parser");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const debug = require("debug")("handshake3");
const _ = require("lodash");
const TokenMap = require("./TokenMap");

const app = new Koa();
const router = new Router();


const DEFAULT_DURATION = 5;

const CODES = [
    "TCW",
    "ABC",
    "JLQ",
    "DRM",
    "XRC"
];

const tokenMap = new TokenMap();




let codeCounter = 0;

const verifyToken = function(token, session) {
    if(!session) return {
        verified: false,
        reason: "NO_SESSION"
    }

    //Here is where we would check to see if this token now belonged to someone else, or if it was expired
    const storedToken = tokenMap.get(token);
    if(!storedToken) return {
        verified: false,
        reason: "NO_STORED_TOKEN"
    };

    const storedSession = storedToken.session;

    if(!storedSession) return {
        verified: false,
        reason: "NO_STORED_SESSION"
    };


    return {
        verified: true,
        storedToken: storedToken
    }

}

const makeTokenCode = function(len = 3) {

    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    //TODO: this needs to acknowledge expired tokens, or we'll run out of codes
    do {
        for (let i = 0; i < len; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    } while (tokenMap.get(text));


    debug("Made new token", text);
    return text;
}

const terrenceSession = {
    id: "12345",
    displayName: "Terrence C. Watson",
    firstName: "Terrence",
    lastName: "Watson",
    email: "parliamentaryterrence@gmail.com",
    twitter: "@TerrenceCWatson",
    facebook: "https://www.facebook.com/terrencewatson101",
    homepage: "http://www.terrencewatson.com",
}

const dadSession = {
    id: "f9221",
    displayName: "Chuck Watson",
    firstName: "Charles",
    lastName: "Watson",
    email: "chuck@energychaser.com",
    homepage: "http://energychaser.com"
}

//Add static entries to tokenMap

const addStatics = function addStatics(){
    tokenMap.set("TCW", Object.assign({}, terrenceSession, {noExpire: true}));
    tokenMap.set("CDW", Object.assign({}, dadSession, {noExpire: true}));
}


addStatics();

const putToken = async function(ctx, next){
    let verified = {};
    const token = _.get(ctx, "params.token");
    const session = _.get(ctx, "request.body.session");

    debug("Doing the token thing", ctx.params.token, ctx.request.body);


    if(ctx.params.token) {
        verified = await verifyToken(token, terrenceSession);
        debug("Token verified:", verified)
    }

    if(!verified.verified) {     //issue new token
        debug("Issuing a new token");
        const token = tokenMap.set(makeTokenCode(), terrenceSession);
        debug("Full token is ", token);
        ctx.body = token;
    } else {    //issue the same token
        debug("Stored token is ", verified.storedToken);
        ctx.body = verified.storedToken;
    }




}

router.post("/api/code", putToken);
router.post("/api/code/:token", putToken);



router.get("/api/code", async (ctx, next) => {
    if(codeCounter >= CODES.length) {
        codeCounter = 0;
    }
    ctx.body = {
        code: CODES[codeCounter++],
        seconds: DEFAULT_DURATION
    }
});

router.get("/api/code/:code", async (ctx, next) => {
    // Retrieve profile

    const token = tokenMap.get(ctx.params.code);


    if(!token) {
        //ctx.body = null;
        ctx.throw(404, new Error("Token not found"));
    } else {

        ctx.body = token.session;

    }


});

router.get("/api/admin/codes", async (ctx, next) => {
   ctx.body = tokenMap.toJSON();
});

router.get("/api/admin/codes/flush", async(ctx, next) => {
    tokenMap.clear();
    addStatics();
    ctx.body = tokenMap.toJSON();
    //Add the statics again
})

onerror(app);
app.use(logger());
app.use(bodyParser());
app.use(router.routes());

app.listen(3001, function(){
    console.log("Handshake3 server listening on 3000");
});