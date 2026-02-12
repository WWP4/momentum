// netlify/functions/momentum-club-quiz.js
// Universal customer confirmation email with Calendly CTA.
// Sends via Mailgun. Optional SMS via Twilio (if env vars present).
//
// REQUIRED ENV VARS
// - MAILGUN_API_KEY
// - MAILGUN_DOMAIN         (ex: mg.yourdomain.com)
//
// OPTIONAL ENV VARS
// - MAILGUN_FROM           (ex: "Momentum <hq@momentum-athlete.com>")  // overrides default
// - INTERNAL_NOTIFY_EMAIL  (ex: "hq@momentum-athlete.com")             // if set, sends an internal copy
//
// OPTIONAL (SMS)
// - TWILIO_SID
// - TWILIO_AUTH_TOKEN
// - TWILIO_PHONE           (ex: +1618xxxxxxx)

const CALENDLY_URL = "https://calendly.com/tricitycanvasproducts/30min";
const SUPPORT_EMAIL = "hq@momentum-athlete.com";

exports.handler = async (event) => {
  const headers = corsHeaders();

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    const data = safeJson(event.body);
    if (!data) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
    }

    // Recipient (customer)
    const toEmail = pickString(data, ["email", "contact_email", "primary_contact_email"]);
    if (!toEmail) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing email" }) };
    }

    const name = pickString(data, [
      "contact_name",
      "primary_contact_name",
      "primaryContactName",
      "name",
      "full_name",
      "parent_name",
      "guardian_name",
    ]);

    const phone = pickString(data, ["phone", "phone_number", "phoneNumber"]);
    const qualifies = pickString(data, ["qualifies", "qualification", "tier"]);
    const score = data.score ?? data.mqScore ?? "";

    const mg = getMailgunEnv();
    if (!mg.ok) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: mg.error }) };
    }

    // Build universal email
    const subject = "MOMENTUM. — Submission received";

    const html = buildCustomerEmailHTML({
      name,
      qualifies,
      score,
      calendlyUrl: CALENDLY_URL,
      supportEmail: SUPPORT_EMAIL,
    });

    // Send to customer
    const customerSend = await mailgunSend({
      apiKey: mg.apiKey,
      domain: mg.domain,
      from: mg.from,
      to: toEmail,
      subject,
      html,
    });

    if (!customerSend.ok) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "Mailgun error", status: customerSend.status, details: customerSend.details }),
      };
    }

    // Optional internal notification
    const internalTo = (process.env.INTERNAL_NOTIFY_EMAIL || "").trim();
    let internalSent = false;
    if (internalTo) {
      const internalHtml = buildInternalEmailHTML({
        toEmail,
        name,
        qualifies,
        score,
        data,
        calendlyUrl: CALENDLY_URL,
      });

      const internalRes = await mailgunSend({
        apiKey: mg.apiKey,
        domain: mg.domain,
        from: mg.from,
        to: internalTo,
        subject: `New submission — ${name || toEmail}`,
        html: internalHtml,
      });

      internalSent = internalRes.ok;
    }

    // Optional SMS (never blocks success)
    const sms = await maybeSendSms({
      phone,
      name,
      calendlyUrl: CALENDLY_URL,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        emailSent: true,
        internalSent,
        smsSent: sms.sent,
        smsInfo: sms.info,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err?.message || "Server error" }),
    };
  }
};

/* ----------------------- Email builders ----------------------- */

function buildCustomerEmailHTML({ name, qualifies, score, calendlyUrl, supportEmail }) {
  const BLACK = "#0B0B0D";
  const RED = "#E11D2E";
  const BORDER = "#EAEAEA";
  const MUTED = "#6B7280";
  const SOFT = "#F7F7F8";

  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";

  const statusLine = (() => {
    if (!qualifies) return "We’ve received your submission and your Educator Advisor will review it.";
    const q = qualifies.toLowerCase();
    if (q === "high") return "We’ve received your submission — you may be in a strong range. Your Educator Advisor will confirm details.";
    if (q === "moderate") return "We’ve received your submission — your Educator Advisor will confirm requirements and next steps.";
    if (q === "early") return "We’ve received your submission — your Educator Advisor will help you understand what’s needed to qualify.";
    return "We’ve received your submission and your Educator Advisor will review it.";
  })();

  const rows = [
    score !== "" ? row("Score", escapeHtml(String(score))) : "",
    qualifies ? row("Status", escapeHtml(qualifies)) : "",
    row("Next step", "Book a call with your Educator Advisor"),
    row("Timing", "Choose any available time on the calendar"),
  ].filter(Boolean).join("");

  return `
<div style="margin:0;padding:0;background:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:38px 14px;">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;">

          <tr>
            <td style="padding:0 0 18px 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-weight:900;letter-spacing:.12em;color:${BLACK};font-size:15px;">
                MOMENTUM<span style="color:${RED};">.</span>
              </div>
              <div style="height:2px;width:34px;background:${RED};margin-top:10px;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 0 14px 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-weight:900;color:${BLACK};font-size:26px;line-height:1.2;">
                Submission received
              </div>
              <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:14px;line-height:1.7;margin-top:8px;">
                ${greeting} ${escapeHtml(statusLine)}
              </div>
            </td>
          </tr>

          <tr>
            <td style="border:1px solid ${BORDER};border-radius:14px;padding:16px;background:#ffffff;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:900;letter-spacing:.18em;color:${MUTED};margin:0 0 10px 0;">
                WHAT TO DO NEXT
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="font-family:Montserrat,Arial,sans-serif;font-size:14px;color:${BLACK};">
                ${rows}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 0 0 0;">
              <div style="border:1px solid ${BORDER};border-radius:14px;padding:14px;background:${SOFT};">
                <div style="font-family:Montserrat,Arial,sans-serif;color:${BLACK};font-weight:900;font-size:13px;margin:0 0 8px 0;">
                  On the call, we’ll cover
                </div>
                <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:13.5px;line-height:1.7;">
                  • What counts toward credit for your training structure<br>
                  • The verification requirements you’ll need<br>
                  • The clean path to enrollment (if you choose to move forward)
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 0 0 0;">
              <a href="${calendlyUrl}"
                 style="display:inline-block;font-family:Montserrat,Arial,sans-serif;font-weight:900;font-size:14px;letter-spacing:.02em;text-decoration:none;background:${BLACK};color:#ffffff;padding:12px 16px;border-radius:12px;">
                Book a call with your Educator Advisor
              </a>
              <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:12px;line-height:1.6;margin-top:10px;">
                Prefer email? Reply here or contact <a href="mailto:${supportEmail}" style="color:${BLACK};font-weight:900;text-decoration:none;">${supportEmail}</a>.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 0 0 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:12px;line-height:1.7;">
                Momentum Team
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`;
}

function buildInternalEmailHTML({ toEmail, name, qualifies, score, data, calendlyUrl }) {
  const BLACK = "#0B0B0D";
  const RED = "#E11D2E";
  const MUTED = "#6B7280";
  const BORDER = "#EAEAEA";

  const safe = (v) => escapeHtml(v ?? "");
  const title = `New submission — ${name || toEmail}`;

  // Only include a short, readable snapshot + raw JSON
  const snapshot = `
    <tr><td style="padding:10px 0;color:${MUTED};width:170px;">Name</td><td style="padding:10px 0;font-weight:900;">${safe(name || "")}</td></tr>
    <tr><td style="padding:10px 0;color:${MUTED};">Email</td><td style="padding:10px 0;font-weight:900;">${safe(toEmail)}</td></tr>
    ${qualifies ? `<tr><td style="padding:10px 0;color:${MUTED};">Status</td><td style="padding:10px 0;font-weight:900;">${safe(qualifies)}</td></tr>` : ""}
    ${score !== "" ? `<tr><td style="padding:10px 0;color:${MUTED};">Score</td><td style="padding:10px 0;font-weight:900;">${safe(String(score))}</td></tr>` : ""}
    <tr><td style="padding:10px 0;color:${MUTED};">Calendly</td><td style="padding:10px 0;font-weight:900;">${safe(calendlyUrl)}</td></tr>
  `;

  return `
<div style="margin:0;padding:0;background:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:30px 14px;">
        <table role="presentation" width="700" cellpadding="0" cellspacing="0" border="0" style="max-width:700px;width:100%;">

          <tr>
            <td style="padding:0 0 14px 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-weight:900;letter-spacing:.12em;color:${BLACK};font-size:15px;">
                MOMENTUM<span style="color:${RED};">.</span>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 0 12px 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-weight:900;color:${BLACK};font-size:22px;line-height:1.2;">
                ${escapeHtml(title)}
              </div>
            </td>
          </tr>

          <tr>
            <td style="border:1px solid ${BORDER};border-radius:14px;padding:16px;background:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="font-family:Montserrat,Arial,sans-serif;font-size:14px;color:${BLACK};">
                ${snapshot}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 0 0 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:12px;line-height:1.6;">
                Raw payload:
              </div>
              <pre style="margin:8px 0 0 0;padding:12px;border:1px solid ${BORDER};border-radius:12px;background:#fafafa;font-size:12px;white-space:pre-wrap;word-break:break-word;color:${BLACK};font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
                JSON.stringify(data, null, 2)
              )}</pre>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`;
}

/* ----------------------- Mailgun send ----------------------- */

async function mailgunSend({ apiKey, domain, from, to, subject, html }) {
  try {
    const params = new URLSearchParams();
    params.append("from", from);
    params.append("to", to);
    params.append("subject", subject);
    params.append("html", html);

    const mgUrl = `https://api.mailgun.net/v3/${domain}/messages`;
    const auth = Buffer.from(`api:${apiKey}`).toString("base64");

    const res = await fetch(mgUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await res.text();
    return { ok: res.ok, status: res.status, details: text };
  } catch (e) {
    return { ok: false, status: 500, details: e?.message || "mailgun_send_failed" };
  }
}

function getMailgunEnv() {
  const apiKey = (process.env.MAILGUN_API_KEY || "").trim();
  const domain = (process.env.MAILGUN_DOMAIN || "").trim();
  if (!apiKey || !domain) return { ok: false, error: "Missing MAILGUN_API_KEY or MAILGUN_DOMAIN env vars" };

  // If MAILGUN_FROM not set, default to something safe on your domain
  const from = (process.env.MAILGUN_FROM || `Momentum <no-reply@${domain}>`).trim();
  return { ok: true, apiKey, domain, from };
}

/* ----------------------- Optional SMS (Twilio) ----------------------- */

async function maybeSendSms({ phone, name, calendlyUrl }) {
  const toPhone = normalizePhone(phone);
  if (!toPhone) return { sent: false, info: "no_phone_provided" };

  const sid = (process.env.TWILIO_SID || "").trim();
  const token = (process.env.TWILIO_AUTH_TOKEN || "").trim();
  const from = (process.env.TWILIO_PHONE || "").trim();
  if (!sid || !token || !from) return { sent: false, info: "missing_twilio_env" };

  const first = name ? `Hi ${name.split(" ")[0]}, ` : "Hi, ";
  const body =
    `${first}we received your Momentum submission.\n` +
    `Book a call with your Educator Advisor:\n${calendlyUrl}\n` +
    `Questions? Reply to your email from Momentum.`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const params = new URLSearchParams();
  params.append("From", from);
  params.append("To", toPhone);
  params.append("Body", body);

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await res.text();
    if (!res.ok) return { sent: false, info: `twilio_error_${res.status}: ${text}` };
    return { sent: true, info: "sent" };
  } catch (e) {
    return { sent: false, info: e?.message || "twilio_send_failed" };
  }
}

/* ----------------------- Helpers ----------------------- */

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

function safeJson(body) {
  try {
    return JSON.parse(body || "{}");
  } catch {
    return null;
  }
}

function pickString(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label, valueHtml) {
  const MUTED = "#6B7280";
  return `
    <tr>
      <td style="padding:10px 0;color:${MUTED};width:170px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;font-weight:900;">${valueHtml}</td>
    </tr>
  `;
}

// Accepts (618) 767-8378, 6187678378, 1-618-767-8378, +16187678378
function normalizePhone(input) {
  if (!input) return "";
  const raw = String(input).trim();
  const plusDigits = raw.replace(/[^\d+]/g, "");
  if (/^\+\d{10,15}$/.test(plusDigits)) return plusDigits;

  const onlyNums = raw.replace(/[^\d]/g, "");
  if (/^\d{10}$/.test(onlyNums)) return `+1${onlyNums}`;
  if (/^1\d{10}$/.test(onlyNums)) return `+${onlyNums}`;

  return "";
}
