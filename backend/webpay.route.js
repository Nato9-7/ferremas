
const express = require("express");
const router = express.Router();

const {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} = require("transbank-sdk");

const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

router.post("/create", async (req, res) => {
  try {
    console.log("Datos recibidos en /create:", req.body); // Depuración
    const { amount, sessionId, buyOrder, returnUrl } = req.body;
    
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    console.log("Respuesta de tx.create:", response); // Depuración

    res.json({
      token: response.token,
      url: response.url,
    });
  } catch (error) {
    console.error("Error en /webpay/create:", error);
    res.status(500).json({ error: "Error creando transacción Webpay" });
  }
});

router.post("/commit", async (req, res) => {
  try {
    const { token } = req.body;
    
    // Primero verifica el estado
    const status = await tx.status(token);
    if (status.status === 'AUTHORIZED') {
      return res.json({
        success: true,
        message: "Transacción ya estaba autorizada",
        ...status
      });
    }


    const response = await tx.commit(token);
    res.json({
      success: true,
      ...response
    });
  } catch (error) {
    console.error("Error en /webpay/commit:", error);
    res.status(500).json({ 
      success: false,
      error: "Error al confirmar transacción",
      details: error.message
    });
  }
});

module.exports = router;
