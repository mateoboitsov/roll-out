export async function POST(request) {
  try {
    const body = await request.json();
    
    // Preparar los datos para enviar al webhook
    const webhookData = {
      nombre: body.nombre || '',
      email: body.email || '',
      empresa: body.empresa || '',
      mensaje: body.mensaje || '',
      aceptoPolitica: body.aceptoPolitica || false,
      timestamp: new Date().toISOString(),
      origen: 'formulario_contacto'
    };
    
    // Enviar al webhook de Slack
    const response = await fetch('https://hooks.slack.com/services/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', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `*Nuevo mensaje de contacto*
        *Nombre:* ${webhookData.nombre}
        *Email:* ${webhookData.email}
        *Empresa:* ${webhookData.empresa}
        *Mensaje:* ${webhookData.mensaje}
        *Aceptó política:* ${webhookData.aceptoPolitica ? 'Sí' : 'No'}
        *Fecha:* ${webhookData.timestamp}
        *Origen:* ${webhookData.origen}`
      })
    });
    
    if (response.ok) {
      return Response.json({ 
        success: true, 
        message: 'Mensaje enviado con éxito' 
      });
    } else {
      return Response.json({ 
        success: false, 
        error: 'Error del servidor webhook' 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error en API route:', error);
    return Response.json({ 
      success: false, 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
} 