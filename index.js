const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const mega = require("megajs");
const { File } = require("megajs");
const axios = require("axios");
const app = express();
const http = require("http");
const cheerio = require('cheerio');


app.use(cors());


app.use(
    cors({
        origin: `*`,
    }),
);

app.use(express.json({ limit: "10000tb" }));
app.use(express.urlencoded({ limit: "10000tb", extended: false }));

const PORT = 3000;
const ipAddress = "213.202.230.241";

app.use(`*`, (req, res, next) => {
    try {
        if (req.originalUrl.includes(`/upload`)) {
            next();
        } else if (req.originalUrl.includes(`/load`)) {
            next();
        } else if (req.originalUrl.includes(`/proxy`)) {
            next();
        } else if (req.originalUrl.includes(`/index.css`)) {
            res.sendFile(__dirname + "/index.css");
        } else if (req.originalUrl.includes(`/embeded.js`)) {
            res.sendFile(__dirname + "/embeded.js");
        } else {
            res.sendFile(__dirname + "/index.html");
        }
    } catch {
        req.destroy();
        res.destroy();
    }
});

// AUTH

let users = [{
        email: `vawog11511@artgulin.com`,
        password: `CreatemyPassword$))`,
        publicKey: `oOuBXajlYWfHsQAevEU7EQ`,
    },
    {
        email: `gifah21581@artgulin.com`,
        password: `Password1234@#)()H`,
        publicKey: `LD1cTuoG05gWccL5lwyzSQ`
    }
];

let USGT = (spe) => {
    try {
        if (spe) {
            let ft = users.find((v) => v.email.includes(spe));
            if (ft) {
                return ft;
            } else {
                return null;
            }
        } else {
            let rand = Math.floor(Math.random() * users.length);
            return users[rand];
        }
    } catch (er) {
        return null;
    }
};

const email = "vawog11511@artgulin.com";
const password = "CreatemyPassword$))";
let publicKey = `oOuBXajlYWfHsQAevEU7EQ`;

const stRage = (hasug) => {
    try {
        let ug = hasug ? hasug : USGT();
        if (ug) {
            return new mega.Storage({ email: ug.email, password: ug.password });
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

let destroy = (req, res, isTxt, status) => {
    try {
        if (isTxt) {
            res.status(status).send(isTxt);
        } else {
            req.destroy();
            res.destroy();
        }
    } catch {
        destroy(req, res);
    }
};

let uploadFile = async(req, res, data) => {
    try {
        let ug = USGT();
        let storage = stRage(ug);
        await storage.ready;
        //
        if (storage) {
            let folder = storage.root;
            let imgID = uuidv4().split("-").join("").toUpperCase();
            //
            await folder.upload({
                    name: `${imgID}_${data.name.split(".").join("")}.txt`,
                },
                JSON.stringify(data),
            ).complete;
            // ;
            destroy(
                req,
                res, {
                    success: true,
                    endpoint: `${ug.email.split("@")[0]}/${imgID}_${data.name
            .split(".")
            .join("")}.txt`,
                },
                200,
            );
        } else {
            destroy(req, res);
        }
    } catch (e) {
        destroy(req, res);
    }
};

app.post(`/upload/:id`, (req, res) => {
    try {
        let bd = req.body;
        uploadFile(req, res, bd);
    } catch {
        destroy(req, res);
    }
});

app.get(`/load`, async(req, res) => {
            try {
                let query = req.query;
                if (Object.keys(query).length > 0 && Object.keys(query).length < 2) {
                    let q = query[Object.keys(query)[0]];
                    if (q && q !== "") {
                        let splN = q.split("/");
                        let ug = USGT(splN[0]);
                        if (ug) {
                            let storage = stRage(ug);
                            await storage.ready;
                            //
                            if (storage) {
                                let folder = storage.root;
                                const file = folder.children.find(
                                    (file) => file.name === `${splN[1]}`,
                                );
                                if (file) {
                                    let rd = File.fromURL(await file.link());
                                    await rd.loadAttributes();
                                    //
                                    const data = await rd.downloadBuffer();
                                    if (data) {
                                        let buf = Buffer.from(data);
                                        res.setHeader(`content-type`, `application/json`);
                                        res.send(buf);
                                    } else {
                                        destroy(
                                            req,
                                            res, { success: false, message: "Unable to load File" },
                                            404,
                                        );
                                    }
                                } else {
                                    destroy(req, res, { error: `File not found.` }, 404);
                                }
                            } else {
                                destroy(req, res);
                            }
                        } else {
                            destroy(req, res);
                        }
                    } else {
                        destroy(
                                req,
                                res, {
                                    status: q === "" ? 500 : 404,
                                    error: `${q === "" ? `Query's empty` : `Intended query not found`}`,
          },
          q === "" ? 500 : 404,
        );
      }
    } else {
      destroy(
        req,
        res,
        {
          status: 404,
          error: `${
            Object.keys(query).length >= 2
              ? `Too many querys. One query Required`
              : `No query found.`
          }`,
        },
        404,
      );
    }
  } catch {
    destroy(req, res);
  }
});


const proxies = [
    { ip: '213.202.230.241', port: '80' },
    { ip: '82.137.244.244', port: '80' },
    { ip: '115.244.127.161', port: '80' },
    { ip: '177.55.247.41', port: '8080' },
    { ip: '72.10.164.178', port: '26439' },
    { ip: '219.93.101.60', port: '80' },
    { ip: '67.43.236.20', port: '26971' },
    { ip: '103.227.192.46', port: '8111' },
    { ip: '154.118.228.212', port: '80' },
    { ip: '178.128.113.118', port: '23128' },
    { ip: '78.188.81.57', port: '8080' },
    { ip: '51.145.176.250', port: '8080' },
    { ip: '103.178.42.26', port: '8181' },
    { ip: '35.185.196.38', port: '3128' },
    { ip: '89.163.157.129', port: '80' },
    { ip: '191.101.80.162', port: '80' },
    { ip: '80.13.43.193', port: '80' },
    { ip: '117.54.114.96', port: '80' },
    { ip: '195.235.124.143', port: '80' },
    { ip: '212.77.163.196', port: '3128' },
    { ip: '52.172.1.186', port: '3128' },
    { ip: '75.89.101.60', port: '80' },
    { ip: '179.43.8.16', port: '8088' },
    { ip: '117.160.250.133', port: '80' },
    { ip: '200.174.198.95', port: '8888' },
    { ip: '72.10.164.178', port: '4051' },
    { ip: '187.40.1.123', port: '128' },
    { ip: '82.97.215.240', port: '80' },
    { ip: '117.54.114.98', port: '80' },
    { ip: '117.54.114.101', port: '80' },
    { ip: '117.54.114.35', port: '80' }
];



const agent = new http.Agent({
    rejectUnauthorized: false,
    // secureProtocol: 'TLSv1_2_method' 
});

let ldP = async (req, res, q) => {
  try {
    if (q) {
      let rn = proxies[Math.floor(Math.random() * proxies.length)]
      let ax = await fetch(q)
      if (ax.headers.get('content-type').includes('text/html')) {
        const $ = cheerio.load(await ax.text());
        // 
        $(`head`).append(`<script id="proxyEmbed" src='https://opulent-space-potato-vjw5qvgqpwrcxj49-3000.app.github.dev/embeded.js?href=${new URL(ax.url).origin}'></script>`)
        // 
        destroy(req, res, $.html(), 200)
      }
      else if ( ax.headers.get('content-type').includes('image')) {
        let buf = await ax.arrayBuffer()
        let b = Buffer.from(buf)
        // 
        res.setHeader('Content-Type', ax.headers.get('content-type'))
        res.send(b)
      }
      else {
        res.send(await ax.text())
        // destroy(req, res, await ax.data, 200)
      }
    }
    else {
      let rn = proxies[Math.floor(Math.random() * proxies.length)]
      let ax = await axios.get(`https://www.bing.com/search?pglt=41&q=what%27s+my+ip`)
      if (ax.headers['content-type'].includes('text/html')) {
        const $ = cheerio.load(await ax.data);
        // 
        $(`head`).append(`<script id="proxyEmbed" src='https://opulent-space-potato-vjw5qvgqpwrcxj49-3000.app.github.dev/embeded.js?href=${new URL(ax.config.url).origin}'></script>`)
        // 
        destroy(req, res, $.html(), 200)
      }
      else {
        destroy(req, res, await ax.data, 200)
      }
    }
  }
  catch (e) {
    console.log(e)
    destroy(req, res, e, 500)
  }
}

app.get(`/proxy`, async (req, res) => {
  try {
    let query = req.query;
    if (Object.keys(query).length > 0) {
      let q = query[Object.keys(query)[0]];
      if (q && q !== "") { 
        ldP(req, res, q)
      }
      else {
        ldP(req, res)
      }
    }
    else {
      ldP(req, res)
    }
  }
  catch (er) {
    destroy(req, res);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://${ipAddress}:${PORT}`);
});