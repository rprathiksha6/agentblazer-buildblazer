import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter
function getTransporter() {
  const user = process.env.GMAIL_USER || process.env.EMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  return null;
}

/**
 * Sends official coordinator resolution to a student's Gmail
 */
export async function sendDoubtResolutionEmail({ to, studentName, ticketId, subject, query, resolution, repliedBy }) {
  const transporter = getTransporter();
  const safeName = studentName || 'Student';
  const safeCoordinator = repliedBy || 'AgentBlazer Lead Coordinator';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #07090e; color: #f1f5f9; margin: 0; padding: 24px; }
        .container { max-width: 600px; margin: 0 auto; background: #0c101c; border: 1px solid #7c3aed40; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #4c1d95, #083344); padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; color: #ffffff; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 12px; color: #38bdf8; font-family: monospace; }
        .content { padding: 28px 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
        .ticket-badge { display: inline-block; background: #581c87; color: #e9d5ff; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: bold; margin-bottom: 12px; }
        .box { background: #13192b; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin: 16px 0; }
        .box-title { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-family: monospace; font-weight: bold; margin-bottom: 6px; }
        .resolution-box { background: #052e16; border: 1px solid #166534; border-radius: 12px; padding: 18px; margin: 20px 0; color: #f0fdf4; }
        .resolution-header { font-size: 12px; font-family: monospace; color: #4ade80; font-weight: bold; margin-bottom: 8px; }
        .footer { background: #080b14; border-top: 1px solid #1e293b; padding: 20px; text-align: center; font-size: 11px; color: #64748b; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AgentBlazer Club</h1>
          <p>Dept. of Computer Science & Engineering • SJEC</p>
        </div>
        <div class="content">
          <span class="ticket-badge">Ticket #${ticketId}</span>
          <p>Dear <strong>${safeName}</strong>,</p>
          <p>Thank you for reaching out to the AgentBlazer Club inquiry desk. Our coordinators have reviewed your question regarding <strong>"${subject || 'Technical Query'}"</strong> and provided the official resolution below.</p>
          
          <div class="box">
            <div class="box-title">Your Submitted Query:</div>
            <div style="font-style: italic; color: #e2e8f0;">"${query}"</div>
          </div>

          <div class="resolution-box">
            <div class="resolution-header">Coordinator Resolution (${safeCoordinator}):</div>
            <div style="white-space: pre-wrap; line-height: 1.6;">${resolution}</div>
          </div>

          <p>If you have further questions or need hands-on help during our upcoming cloud labs, feel free to visit the CSE Department coordinator desk or reply to this email.</p>
          
          <p style="margin-top: 24px;">
            Best regards,<br>
            <strong>${safeCoordinator}</strong><br>
            <span style="font-size: 12px; color: #94a3b8;">AgentBlazer Club Leadership Council</span>
          </p>
        </div>
        <div class="footer">
          St Joseph Engineering College, Vamanjoor, Mangaluru - 575028<br>
          Autonomous Institution affiliated to VTU • NAAC 'A+' & NBA Accredited
        </div>
      </div>
    </body>
    </html>
  `;

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"AgentBlazer Club SJEC" <${process.env.GMAIL_USER || process.env.EMAIL_USER}>`,
        to,
        subject: `[AgentBlazer Club] Resolution for Ticket #${ticketId}: ${subject || 'Doubt Response'}`,
        text: `Dear ${safeName},\n\nRegarding your doubt (${ticketId}):\n"${query}"\n\nResolution by ${safeCoordinator}:\n${resolution}\n\nAgentBlazer Club • Dept. of CSE, SJEC`,
        html: htmlContent
      });

      console.log(`✉️ Email successfully dispatched to ${to} via Gmail SMTP (Message ID: ${info.messageId})`);
      return { success: true, mode: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('⚠️ SMTP Error sending email to', to, err.message);
      return { success: false, error: err.message };
    }
  } else {
    // Development / fallback mode when credentials are not yet set
    console.log(`\n======================================================`);
    console.log(`📬 [SIMULATED EMAIL DISPATCH TO GMAIL]`);
    console.log(`To: ${to}`);
    console.log(`Subject: [AgentBlazer Club] Resolution for Ticket #${ticketId}: ${subject}`);
    console.log(`Resolved by: ${safeCoordinator}`);
    console.log(`Resolution:\n${resolution}`);
    console.log(`(Note: Add GMAIL_USER and GMAIL_APP_PASSWORD to .env for live SMTP delivery)`);
    console.log(`======================================================\n`);
    return { success: true, mode: 'simulated' };
  }
}
