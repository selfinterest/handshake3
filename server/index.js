// H3 server

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-body-parser");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const debug = require("debug")("handshake3");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const TokenMap = require("./TokenMap");
const serve = require("koa-static");

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
    twitter: "https://twitter.com/TerrenceCWatson",
    facebook: "https://www.facebook.com/terrencewatson101",
    homepage: "http://www.terrencewatson.com",
    company: "HandshakeThree",
    photo: "tcw2.jpg"
}

const dadSession = {
    id: "f9221",
    displayName: "Chuck Watson",
    firstName: "Charles",
    lastName: "Watson",
    email: "chuck@energychaser.com",
    homepage: "http://energychaser.com",
    company: "Energy Chaster"
}

const otherSessions = {
    "BVP": {
        id: "bvp",
        displayName: "Kent Bennett",
        firstName: "Kent",
        lastName: "Bennett",
        homepage: "https://www.bvp.com/team/kent-bennett",
        company: "Bessemer Venture Partners",
        twitter: "https://twitter.com/kentbennett",
        photo: "kb.jpg"
    },
    "DSC": {
        id: "dchang",
        displayName: "David Chang",
        firstName: "David",
        lastName: "Chang",
        homepage: "http://www.davidchang.me/",
        twitter: "http://www.twitter.com/changds",
        photo: "dchang.jpg"
    },
    "BEC": {
        id: "bclarke",
        displayName: "Barbara Clarke",
        firstName: "Barbara",
        lastName: "Clark",
        homepage: "https://angel.co/barbara-clarke",
        twitter: "https://twitter.com/beclarke",
    },
    "PSH": {
        id: "phenderson",
        displayName: "Paul Henderson",
        firstName: "Paul",
        lastName: "Henderson",
        homepage: "http://coursekicker.com",
        company: "CourseKicker",
        twitter: "https://twitter.com/paulshenderson"
    },
    "NMI": {
        id: "nmeisner",
        displayName: "Norm Meisner",
        firstName: "Norman",
        lastName: "Meisner",
        homepage: "https://www.linkedin.com/in/norman-meisner-734181/",
        company: "Beta Fund"
    },
    "SHR": {
        id: "shermaks",
        displayName: "Shereen Shermak",
        firstName: "Shereen",
        lastName: "Shermak",
        twitter: "https://twitter.com/shrcubed",
    },
    "NSS": {
        id: "statan",
        displayName: "Nicole Stata",
        firstName: "Nicole",
        lastName: "Stata",
        company: "Boston Seed Capital",
        homepage: "http://www.bostonseed.com"
    },
    "CFW": {
        id: "whitec",
        displayName: "Catherine White",
        firstName: "Catherine",
        lastName: "White",
        company: "FinArc Investments",
        homepage: "https://www.finarc.com"
    }





}

//Add static entries to tokenMap

const addStatics = function addStatics(){
    debug("Adding statics");
    tokenMap.set("TCW", Object.assign({}, terrenceSession, {noExpire: true}));
    tokenMap.set("CDW", Object.assign({}, dadSession, {noExpire: true}));


    Object.keys(otherSessions).forEach ( key => {
        debug("Adding ", key);
        tokenMap.set(key, Object.assign({}, otherSessions[key], {noExpire: true}))
    })
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
});

router.get("/api/profile-images/:image", async(ctx) => {
   const stream = ctx.body = fs.createReadStream(__dirname + "/profiles/" + ctx.params.image);

});



onerror(app);
app.use(logger());
app.use(bodyParser());
//if(process.env.NODE_ENV === "production") {
    app.use(serve(path.join(__dirname, "..", "build")));
    router.get("/", async(ctx) => {
        ctx.body = fs.createReadStream(__dirname, "..", "build", "index.html");
    });
//}
app.use(router.routes());


const port = process.env.PORT || 3001;
app.listen(port, function(){
    console.log("Handshake3 server listening on "+port);
});