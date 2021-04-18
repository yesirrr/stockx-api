const got = require('got');

module.exports = async (product, options) => {
    const { currency, proxy, userAgent } = options;
    const variantArray = [];
    let webURL;
    
    if (typeof product == 'string'){
        if (product.includes('stockx.com/')) webURL = product.split('stockx.com/')[1].split('/')[0];
        else webURL = product;
    }
    else webURL = product.urlKey;

    const res = await got(`https://stockx.com/api/products/${webURL}?includes=market&currency=${currency}`, {
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
    const variants = body.Product.children;

    for (let key in variants){
        variantArray.push({
            size: variants[key].shoeSize,
            uuid: key,
            market: variants[key].market
        });
    };

    return {
        name: body["Product"].title,
        image: body["Product"].media.imageUrl,
        urlKey: body["Product"].urlKey,
        pid: body["Product"].styleId,
        uuid: body["Product"].uuid,
        variants: variantArray
    };
};
