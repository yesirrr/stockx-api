const got = require('got');

module.exports = async (query, options = {}) => {
    const { limit, proxy, userAgent } = options;

    const res = await got("https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6bfb5abee4dcd8cea8f0ca1ca085c2b3", {
        headers: {
            "Host": "stockx.com",
            "DNT": 1,
            "Upgrade-Insecure-Requests": 1,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            "Accept-Encoding": "gzip, br",
            "Accept-Language": "en-US,en;q=0.9",
        },
        body: `{\"params\":\"query=${encodeURIComponent(query)}&facets=*&filters=\"}`,
        method: "POST",
        http2: true,
        responseType: 'json'
    });

    const { body } = res;

    const { hits } = body;
    const target = limit !== undefined ? hits.slice(0, limit) : hits;

    if (hits == "") throw new Error("No products found");
    else return target;
};
