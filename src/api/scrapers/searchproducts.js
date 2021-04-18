const got = require('got');

module.exports = async (query, options = {}) => {
    const { limit, proxy, userAgent } = options;

    const res = await got(`https://stockx.com/api/browse?_search=${query}`, {
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
        responseType: 'json',
        http2: true
    });

    const { body } = res;

    const { Products } = body;
    const target = limit !== undefined ? Products.slice(0, limit) : Products;
    const productArray = target.map(product => {
        const image = new URL(product.media.imageUrl, 'https://stockx.com').href;

        return {
            name: product.title,
            retail: product.retailPrice,
            releaseDate: product.releaseDate,
            pid: product.styleId,
            uuid: product.market.productUuid,
            image,
            urlKey: product.urlKey,
            market: product.market
        };
    });

    if (productArray == "") throw new Error("No products found!");
    else return productArray;
};
