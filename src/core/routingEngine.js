/**
 * Core Routing Engine for Eco-Route
 * Calculates optimal path cost considering dynamic variables:
 * - Base distance
 * - Topographical changes (Altitude)
 * - Environmental impact (Wind Resistance)
 */

// Sabit değerler (Bu araç için belirlenmiş ortalama tüketim değerleri)
const BASE_CONSUMPTION_PER_KM = 0.05; // km başına litre
const ALTITUDE_PENALTY_MULTIPLIER = 0.002; // Her 1 metrelik tırmanış için ek yük
const WIND_RESISTANCE_MULTIPLIER = 0.0005; // Karşıdan esen rüzgarın km/h başına etkisi

/**
 * Rota maliyetini hesaplayan ana algoritma
 * Zaman Karmaşıklığı (Time Complexity): O(n) - n = rotadaki segment sayısı
 * 
 * @param {Array} routeSegments - Rotanın parçaları (mesafe, eğim ve rüzgar bilgisi içerir)
 * @param {number} currentFuelPrice - Anlık çekilen yakıt fiyatı (Canlı veri)
 * @returns {Object} Toplam yakıt tüketimi ve maliyeti
 */
function calculateRouteCost(routeSegments, currentFuelPrice) {
    if (!routeSegments || routeSegments.length === 0) {
        throw new Error("Gecerli bir rota verisi saglanmadi.");
    }

    let totalFuelConsumed = 0;
    let totalDistance = 0;

    // Rotadaki her bir parçayı (segment) döngüye sokup hesaplıyoruz
    routeSegments.forEach(segment => {
        const { distanceKm, elevationGainMeters, headwindSpeedKmh } = segment;
        
        // 1. Temel Tüketim Hesaplaması
        let segmentConsumption = distanceKm * BASE_CONSUMPTION_PER_KM;

        // 2. Rakım/Eğim Etkisi (Sadece tırmanış varsa ceza uygula)
        if (elevationGainMeters > 0) {
            segmentConsumption += (elevationGainMeters * ALTITUDE_PENALTY_MULTIPLIER);
        }

        // 3. Rüzgar Direnci Etkisi
        if (headwindSpeedKmh > 0) {
            segmentConsumption += (headwindSpeedKmh * WIND_RESISTANCE_MULTIPLIER * distanceKm);
        }

        totalFuelConsumed += segmentConsumption;
        totalDistance += distanceKm;
    });

    // Toplam maliyeti canlı yakıt fiyatı ile çarpıyoruz
    const totalCost = totalFuelConsumed * currentFuelPrice;

    return {
        totalDistanceKm: totalDistance.toFixed(2),
        totalFuelLiters: totalFuelConsumed.toFixed(2),
        estimatedCostTRY: totalCost.toFixed(2),
        appliedFuelPrice: currentFuelPrice
    };
}

module.exports = { calculateRouteCost };

