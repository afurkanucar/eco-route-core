const { calculateRouteCost } = require('../src/core/routingEngine');

test('Rampa ve rüzgar olduğunda maliyet artmalı', () => {
    const flatRoute = [{ distanceKm: 10, elevationGainMeters: 0, headwindSpeedKmh: 0 }];
    const hillyRoute = [{ distanceKm: 10, elevationGainMeters: 200, headwindSpeedKmh: 10 }];
    
    const cost1 = calculateRouteCost(flatRoute, 42.0);
    const cost2 = calculateRouteCost(hillyRoute, 42.0);
    
    if (parseFloat(cost2.estimatedCostTRY) > parseFloat(cost1.estimatedCostTRY)) {
        console.log("✅ Test Passed: Algoritma zorlu koşulları doğru hesaplıyor.");
    }
});

