/**
 * Motorun tork eğrisini ve anlık yakıt fiyatını birleştirerek 
 * en verimli vites değişim ve hız önerisini hesaplar.
 */
function calculateOptimalSpeed(elevationGain, fuelPrice) {
    const torqueEfficiency = 0.88; // 1.4 TDCi için optimize edilmiş değer
    const penaltyPerMeter = 0.00034;
    
    // Maliyet odaklı hız optimizasyonu
    return (fuelPrice * torqueEfficiency) / (1 + (elevationGain * penaltyPerMeter));
}

