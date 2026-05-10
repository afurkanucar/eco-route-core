const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Canlı yakıt fiyatlarını çeken servis modülü.
 * Sistem dinamik fiyatlandırma üzerine kuruludur, statik veri kullanılmaz.
 */
async function getLiveDieselPrice() {
    try {
        const { data } = await axios.get('https://www.petrolofisi.com.tr/akaryakit-fiyatlari');
        const $ = cheerio.load(data);
        
        // Sitedeki motorin fiyatının bulunduğu HTML elementini parse ediyoruz
        const rawPrice = $('.diesel-price-selector').first().text(); 
        const priceAsFloat = parseFloat(rawPrice.replace(',', '.'));

        if (!priceAsFloat || isNaN(priceAsFloat)) {
            throw new Error('Canli veri parse edilemedi. HTML yapisi degismis olabilir.');
        }

        console.log(`[Scraper] Canli motorin fiyati basariyla cekildi: ${priceAsFloat} TL`);
        return priceAsFloat;
        
    } catch (error) {
        console.error('[Scraper Error] Baglanti veya parse hatasi:', error.message);
        throw error; 
    }
}

module.exports = { getLiveDieselPrice };

