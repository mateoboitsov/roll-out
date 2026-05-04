import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const timestamp = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Lisbon' });

    // Slack
    await fetch('process.env.SLACK_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*🎯 Lead desde Olympic Mind (Dani Alves)*
*Nombre:* ${body.nombre || '-'}
*Servicio de interés:* ${body.servicio || '-'}
*Contacto (WA/Email):* ${body.contacto || '-'}
*Mensaje:* ${body.mensaje || '-'}
*Fecha:* ${timestamp}
*Origen:* olympic_mind_popup`
      })
    });

    // Email via Gmail
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Roll Out Studios" <${process.env.GMAIL_USER}>`,
        to: 'boitsov01@gmail.com',
        subject: '🎯 Nueva solicitud desde Olympic Mind',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #111;">
            <h2 style="margin-bottom: 24px;">🎯 Nueva solicitud desde Olympic Mind</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 40%;">Nombre</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${body.nombre || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Servicio</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${body.servicio || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Contacto</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${body.contacto || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Mensaje</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${body.mensaje || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600;">Fecha</td>
                <td style="padding: 10px 0;">${timestamp}</td>
              </tr>
            </table>
          </div>
        `,
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error en utm-popup API:', error);
    return Response.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
