const specs = require('../../config/specs.json');

/**
 * Gelişmiş Yakıt Optimizasyon Algoritması
 * Mesafe, Rakım, Rüzgar ve Motor Verimliliğini birleştirir.
 */
class EcoRoutingEngine {
    static calculateSegmentCost(distance, elevation, windSpeed, fuelPrice) {
        const baseConsumption = (distance / 100) * specs.engine_profile.base_consumption_l_100km;
        
        // Rakım Cezası: Her 100m tırmanış için %2 verim kaybı
        const elevationPenalty = elevation > 0 ? (elevation / 100) * 0.02 : 0;
        
        // Rüzgar Direnci (Karesel artış): Hava direnci hızın karesiyle artar
        const windEffect = windSpeed > 0 ? Math.pow(windSpeed, 2) * 0.0001 : 0;

        const totalLiters = baseConsumption * (1 + elevationPenalty + windEffect);
        return {
            liters: totalLiters.toFixed(4),
            cost: (totalLiters * fuelPrice).toFixed(2)
        };
    }
}
module.exports = EcoRoutingEngine;

