// Beklenmedik bir hata anında sistemi çökertmek yerine profesyonelce cevap verir
const errorHandler = (err, req, res, next) => {
    console.error(`[Error Log]: ${err.stack}`);
    res.status(err.status || 500).json({
        success: false,
        error: "Engine_Calculation_Error",
        message: "Rota maliyeti hesaplanırken bir parametre hatası oluştu."
    });
};

