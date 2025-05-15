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
    console.log("Token:", response.token); // Depuración
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
    const status = await tx.status(token);

    // Verifica ambos: status y response_code
    if (status.status === 'AUTHORIZED' && status.response_code === 0) {
      console.log("ESTA WEA ENTRO 1"); // Depuración
      return res.json({
        success: true,
        message: "Transacción autorizada correctamente",
        ...status
      });
    }

    // Si no está autorizada, intenta commit
    const response = await tx.commit(token);

    if (response.status === 'AUTHORIZED' && response.response_code === 0) {
      console.log("ESTA WEA ENTRO 2"); 
      return res.json({
        success: true,
        message: "Transacción autorizada correctamente",
        ...response
      });
    } else {
      console.log("ESTA WEA NO ENTROOO 3");
      return res.json({
        success: false,
        message: "Transacción rechazada o no autorizada",
        ...response
      });
    }
  } catch (error) {
  if (
    error.message &&
    error.message.includes("Transaction already locked by another process")
  ) {
    // Intenta obtener el status actual y devolverlo
    try {
      const status = await tx.status(req.body.token);
      return res.status(200).json({
        success: status.status === 'AUTHORIZED' && status.response_code === 0,
        message: "Transacción ya estaba siendo procesada",
        ...status
      });
    } catch (e) {
      
    }
  }
  console.error("Error en /webpay/commit:", error);
  res.status(500).json({ 
    success: false,
    error: "Error al confirmar transacción",
    details: error.message
  });
}
});

module.exports = router;
