const { calculateRouteCost } = require('../src/core/routingEngine');

describe('Eco-Route Algorithm Tests', () => {
    test('Hatalı veri girişinde sistemin çökmemesi gerekir', () => {
        expect(() => calculateRouteCost(null)).toThrow('Gecerli bir rota verisi saglanmadi.');
    });

    test('Rampa çıkışında yakıt tüketimi artışı doğrulanmalı', () => {
        const result = calculateRouteCost([{distanceKm: 5, elevationGainMeters: 500}], 42.0);
        expect(Number(result.totalFuelLiters)).toBeGreaterThan(0.25); // 5km için min tüketim
    });
});

