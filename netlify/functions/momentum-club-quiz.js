// netlify/functions/momentum-club-quiz.js
// Email (Mailgun) + SMS (Twilio) in one function.
// Env vars required:
//   MAILGUN_API_KEY, MAILGUN_DOMAIN, (optional) MAILGUN_FROM
//   TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE  (optional if you only want email)

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    // Parse body safely
    let data = {};
    try {
      data = JSON.parse(event.body || "{}");
    } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
    }

    // Accept BOTH naming schemes
    const toEmail = (data.email || "").trim();

    const contactName = (
      data.contact_name ||
      data.primary_contact_name ||
      data.primaryContactName ||
      ""
    ).trim();

    const clubName = (
      data.facility_name ||
      data.club_name ||
      data.clubName ||
      data.facilityName ||
      ""
    ).trim();

    const rawPhone = (
      data.phone ||
      data.phone_number ||
      data.phoneNumber ||
      ""
    ).trim();

    // Email is required for this flow (you can loosen this if you want SMS-only)
    if (!toEmail) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing email" }) };
    }

    // ---- Mailgun env ----
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN; // e.g. "mg.yourdomain.com"
    const FROM_EMAIL = process.env.MAILGUN_FROM || (MAILGUN_DOMAIN ? `hq@${MAILGUN_DOMAIN}` : "");

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Missing MAILGUN_API_KEY or MAILGUN_DOMAIN env vars" }),
      };
    }

    // ---- Premium email ----
    const subject = "MOMENTUM. — Application received";

    const RED = "#E11D2E";
    const BLACK = "#0B0B0D";
    const BORDER = "#EAEAEA";
    const MUTED = "#6B7280";

    const html = `
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
            <td style="padding:0 0 18px 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-weight:900;color:${BLACK};font-size:26px;line-height:1.2;">
                Application received
              </div>
              <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:14px;line-height:1.7;margin-top:8px;">
                ${contactName ? `Hi ${escapeHtml(contactName)},` : "Hi,"}
                we’ve received your club partner application${clubName ? ` for <strong style="color:${BLACK};">${escapeHtml(clubName)}</strong>` : ""}.
              </div>
            </td>
          </tr>

          <tr>
            <td style="border:1px solid ${BORDER};border-radius:14px;padding:16px 16px 10px 16px;">
              <div style="font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:900;letter-spacing:.18em;color:${MUTED};margin:0 0 10px 0;">
                SUMMARY
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="font-family:Montserrat,Arial,sans-serif;font-size:14px;color:${BLACK};">
                <tr>
                  <td style="padding:10px 0;color:${MUTED};width:170px;">Facility</td>
                  <td style="padding:10px 0;font-weight:900;">${clubName ? escapeHtml(clubName) : "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:${MUTED};">Primary contact</td>
                  <td style="padding:10px 0;font-weight:900;">${contactName ? escapeHtml(contactName) : "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:${MUTED};">Next step</td>
                  <td style="padding:10px 0;font-weight:900;">Review + rollout plan</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 0 0 0;">
              <a href="https://calendly.com/tricitycanvasproducts/30min"
                style="display:inline-block;font-family:Montserrat,Arial,sans-serif;font-weight:900;font-size:14px;letter-spacing:.02em;text-decoration:none;background:${BLACK};color:#ffffff;padding:12px 16px;border-radius:12px;">
                Book onboarding call
              </a>
              <span style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:12px;margin-left:10px;">
                or reply to this email
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 0 0 0;">
              <div style="font-family:Montserrat,Arial,sans-serif;color:${MUTED};font-size:12px;line-height:1.7;">
                Momentum Partner Team<br>
                <a href="mailto:hq@momentum-athlete.com" style="color:${BLACK};font-weight:900;text-decoration:none;">hq@momentum-athlete.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`;

    // ---- Send email via Mailgun ----
    const params = new URLSearchParams();
    params.append("from", `Momentum <${FROM_EMAIL}>`);
    params.append("to", toEmail);
    params.append("subject", subject);
    params.append("html", html);

    const mgUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    const mgAuth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

    const emailRes = await fetch(mgUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${mgAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const emailText = await emailRes.text();
    if (!emailRes.ok) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: "Mailgun error",
          status: emailRes.status,
          details: emailText,
        }),
      };
    }

    // ---- Send SMS via Twilio (optional) ----
    let smsSent = false;
    let smsSkippedReason = "";

    const TWILIO_SID = process.env.TWILIO_SID;
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
    const TWILIO_PHONE = process.env.TWILIO_PHONE;

    const toPhone = normalizePhone(rawPhone);

    // Only attempt SMS if (a) phone provided AND (b) env vars present
    if (toPhone && TWILIO_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE) {
      const smsBody =
        `MOMENTUM.\n\n` +
        `Application received` +
        (clubName ? ` — ${clubName}` : "") +
        `.\n\n` +
        `Book onboarding:\nhttps://calendly.com/tricitycanvasproducts/30min`;

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;

      const smsParams = new URLSearchParams();
      smsParams.append("From", TWILIO_PHONE);
      smsParams.append("To", toPhone);
      smsParams.append("Body", smsBody);

      const twilioAuth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");

      const smsRes = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${twilioAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: smsParams.toString(),
      });

      const smsText = await smsRes.text();

      if (!smsRes.ok) {
        // Don’t fail the whole request if SMS fails — email already sent.
        smsSkippedReason = `twilio_error_${smsRes.status}: ${smsText}`;
      } else {
        smsSent = true;
      }
    } else if (!toPhone) {
      smsSkippedReason = "no_phone_provided";
    } else {
      smsSkippedReason = "missing_twilio_env";
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        emailSent: true,
        smsSent,
        smsInfo: smsSent ? "sent" : smsSkippedReason,
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

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Accepts (618) 767-8378, 6187678378, 1-618-767-8378, +16187678378
function normalizePhone(input) {
  if (!input) return "";
  const raw = String(input).trim();
  const digits = raw.replace(/[^\d+]/g, "");

  if (/^\+\d{10,15}$/.test(digits)) return digits;

  const onlyNums = raw.replace(/[^\d]/g, "");
  if (/^\d{10}$/.test(onlyNums)) return `+1${onlyNums}`;
  if (/^1\d{10}$/.test(onlyNums)) return `+${onlyNums}`;

  // last resort: return what we have (Twilio will error if invalid)
  return digits || onlyNums || "";
}
