import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Shared styles ──────────────────────────────────────────────────────────
const BASE_STYLES = `
  body { margin:0; padding:0; background:#f0f4f8; font-family:'Segoe UI',Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased; }
  * { box-sizing:border-box; }
  a { color:#0ea5e9; text-decoration:none; }
  a:hover { text-decoration:underline; }
`;

// ── Notification email (you receive this) ─────────────────────────────────
function buildNotificationEmail(name: string, email: string, subject: string, message: string) {
  const now = new Date().toLocaleString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Contact Message</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
  <tr><td align="center">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
        <div style="width:56px;height:56px;background:rgba(255,255,255,0.18);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <span style="font-size:28px;line-height:1;">📬</span>
        </div>
        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New Portfolio Message</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">${now}</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:36px 40px;">

        <!-- Sender info banner -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;">Sent by</p>
              <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${name}</p>
              <p style="margin:4px 0 0;font-size:13px;color:#64748b;">
                <a href="mailto:${email}" style="color:#0ea5e9;">${email}</a>
              </p>
            </td>
            <td align="right">
              <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;font-size:12px;font-weight:600;padding:8px 18px;border-radius:8px;text-decoration:none;letter-spacing:.04em;">
                Reply Now
              </a>
            </td>
          </tr>
        </table>

        <!-- Subject -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td>
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;">Subject</p>
              <p style="margin:0;font-size:15px;font-weight:600;color:#1e293b;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #0ea5e9;border-radius:0 8px 8px 0;padding:12px 16px;">
                ${subject}
              </p>
            </td>
          </tr>
        </table>

        <!-- Message -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr>
            <td>
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;">Message</p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;">
                <p style="margin:0;font-size:14px;line-height:1.85;color:#334155;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#ffffff;font-size:14px;font-weight:600;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:.04em;box-shadow:0 4px 16px rgba(14,165,233,0.35);">
                ✉ Reply to ${name}
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">
          Sent via your portfolio contact form •
          <a href="https://github.com/tomalhossencse" style="color:#0ea5e9;">tomalhossencse</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Auto-reply email (sender receives this) ──────────────────────────────
function buildAutoReplyEmail(name: string, subject: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Thanks for reaching out!</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
  <tr><td align="center">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
        <p style="margin:0 0 12px;font-size:42px;line-height:1;">👋</p>
        <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;">Got your message!</h1>
        <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Thanks for getting in touch, ${name}</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:40px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#334155;">
          Hi <strong>${name}</strong>,
        </p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#334155;">
          I've received your message and will get back to you as soon as possible — usually within <strong>24 hours</strong>.
        </p>

        <!-- Message summary box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin:24px 0;">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;">Your Subject</p>
              <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">${subject}</p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 28px;font-size:14px;line-height:1.75;color:#64748b;">
          While you wait, feel free to check out my work on GitHub or connect on LinkedIn.
        </p>

        <!-- Social buttons -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr>
            <td align="center" style="padding:0 8px 0 0;">
              <a href="https://github.com/tomalhossencse"
                style="display:block;background:#1e293b;color:#ffffff;font-size:13px;font-weight:600;padding:11px 24px;border-radius:8px;text-decoration:none;text-align:center;">
                🐙 GitHub
              </a>
            </td>
            <td align="center" style="padding:0 0 0 8px;">
              <a href="https://www.linkedin.com/in/tomalhossencse"
                style="display:block;background:#0a66c2;color:#ffffff;font-size:13px;font-weight:600;padding:11px 24px;border-radius:8px;text-decoration:none;text-align:center;">
                💼 LinkedIn
              </a>
            </td>
          </tr>
        </table>

        <!-- Signature -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:24px;">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0f172a;">Md. Tomal Hossen</p>
              <p style="margin:0 0 2px;font-size:13px;color:#64748b;">Full Stack Developer</p>
              <p style="margin:0;font-size:13px;">
                <a href="mailto:tomalhossen78@gmail.com" style="color:#0ea5e9;">tomalhossen78@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:18px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">
          This is an automated reply. Please do not reply to this email directly.
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send notification to yourself
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `📬 [Portfolio] ${subject} — from ${name}`,
      html: buildNotificationEmail(name, email, subject, message),
    });

    // Send auto-reply to the person who contacted you
    await transporter.sendMail({
      from: `"Tomal Hossen" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject} — Thanks for reaching out!`,
      html: buildAutoReplyEmail(name, subject),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to send message. Please try again.", detail },
      { status: 500 }
    );
  }
}
