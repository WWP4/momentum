// netlify/functions/momentum-club-quiz.js

exports.handler = async (event) => {
  // CORS (safe to keep even if same-origin)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: "ok" };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    // Parse body safely
    let data = {};
    try {
      data = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }

    // Accept BOTH naming schemes:
    // New frontend sends: contact_name, facility_name
    // Old expected: primary_contact_name, club_name
    const toEmail = (data.email || "").trim();

    const contactName =
      (data.contact_name ||
        data.primary_contact_name ||
        data.primaryContactName ||
        "").trim();

    const clubName =
      (data.facility_name ||
        data.club_name ||
        data.clubName ||
        data.facilityName ||
        "").trim();

    if (!toEmail) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing email" }),
      };
    }

    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN; // e.g. "momentum-athlete.com"
    const FROM_EMAIL = process.env.MAILGUN_FROM || `hq@${MAILGUN_DOMAIN}`;

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Missing MAILGUN_API_KEY or MAILGUN_DOMAIN env vars",
        }),
      };
    }

  const subject = "Momentum — Partner application received";

// Use your real hosted logo URL:
const LOGO_URL =
  process.env.MOMENTUM_LOGO_URL ||
  "https://YOUR-DOMAIN.com/path/to/momentum-logo.png"; // replace

const BRAND_RED = "#E11D2E";
const BLACK = "#0B0B0D";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";

const html = `
  <div style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:32px 14px;">
          
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:${BLACK};padding:18px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="vertical-align:middle;">
                            <img src="${LOGO_URL}" width="34" height="34" alt="Momentum" style="display:block;border-radius:8px;">
                          </td>
                          <td style="padding-left:12px;vertical-align:middle;">
                            <div style="font-family:Montserrat, Arial, sans-serif;font-size:15px;font-weight:800;letter-spacing:.2px;color:#ffffff;line-height:1.2;">
                              Momentum Athlete
                            </div>
                            <div style="font-family:Montserrat, Arial, sans-serif;font-size:12px;color:#D1D5DB;line-height:1.2;margin-top:3px;">
                              Club Partner Application
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>

                    <td align="right" style="vertical-align:middle;">
                      <span style="display:inline-block;font-family:Montserrat, Arial, sans-serif;font-size:12px;font-weight:800;letter-spacing:.2px;color:#ffffff;background:${BRAND_RED};padding:8px 12px;border-radius:999px;">
                        Received
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 22px 18px 22px;">
                
                <div style="font-family:Montserrat, Arial, sans-serif;font-size:22px;font-weight:900;letter-spacing:-.2px;color:${BLACK};line-height:1.25;margin:0 0 10px 0;">
                  Your partner application is in.
                </div>

                <div style="font-family:Montserrat, Arial, sans-serif;font-size:14px;line-height:1.7;color:${BLACK};margin:0 0 16px 0;">
                  ${contactName ? `Hi ${escapeHtml(contactName)},` : "Hi,"}
                  we’ve received your Momentum partner application${
                    clubName
                      ? ` for <strong style="color:${BLACK};">${escapeHtml(clubName)}</strong>`
                      : ""
                  }.
                </div>

                <!-- Minimal divider -->
                <div style="height:1px;background:${BORDER};margin:16px 0;"></div>

                <!-- Summary (clean, no big “card”) -->
                <div style="font-family:Montserrat, Arial, sans-serif;font-size:12px;font-weight:900;letter-spacing:.18em;color:${MUTED};margin:0 0 10px 0;">
                  SUMMARY
                </div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Montserrat, Arial, sans-serif;font-size:14px;color:${BLACK};">
                  <tr>
                    <td style="padding:8px 0;color:${MUTED};width:160px;">Facility</td>
                    <td style="padding:8px 0;font-weight:800;">${clubName ? escapeHtml(clubName) : "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:${MUTED};">Primary contact</td>
                    <td style="padding:8px 0;font-weight:800;">${contactName ? escapeHtml(contactName) : "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:${MUTED};">Submitted to</td>
                    <td style="padding:8px 0;font-weight:800;">Momentum Partner Team</td>
                  </tr>
                </table>

                <!-- Next steps (tight + premium) -->
                <div style="height:1px;background:${BORDER};margin:16px 0;"></div>

                <div style="font-family:Montserrat, Arial, sans-serif;font-size:12px;font-weight:900;letter-spacing:.18em;color:${MUTED};margin:0 0 10px 0;">
                  WHAT HAPPENS NEXT
                </div>

                <div style="font-family:Montserrat, Arial, sans-serif;font-size:14px;line-height:1.8;color:${BLACK};margin:0 0 14px 0;">
                  <strong>1.</strong> Quick review of your facility and setup<br>
                  <strong>2.</strong> Partner rollout plan (credits, onboarding, parent messaging)<br>
                  <strong>3.</strong> Optional 15–30 minute onboarding call
                </div>

                <!-- CTA button (one bold red element) -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 8px 0;">
                  <tr>
                    <td align="left">
                      <a href="https://calendly.com/tricitycanvasproducts/30min"
                        style="display:inline-block;background:${BRAND_RED};color:#ffffff;text-decoration:none;font-family:Montserrat, Arial, sans-serif;font-weight:900;font-size:14px;letter-spacing:.2px;padding:12px 16px;border-radius:12px;">
                        Schedule the partner call
                      </a>
                    </td>
                  </tr>
                </table>

                <div style="font-family:Montserrat, Arial, sans-serif;font-size:12px;line-height:1.7;color:${MUTED};margin:0;">
                  If you’d rather reply by email, just hit reply — we’ll respond quickly.
                </div>
              </td>
            </tr>

            <!-- Signature / Footer -->
            <tr>
              <td style="padding:18px 22px;background:#FAFAFA;border-top:1px solid ${BORDER};">
                <div style="font-family:Montserrat, Arial, sans-serif;font-size:13px;font-weight:900;color:${BLACK};margin:0 0 4px 0;">
                  Momentum Athlete
                </div>
                <div style="font-family:Montserrat, Arial, sans-serif;font-size:12px;line-height:1.6;color:${MUTED};margin:0;">
                  Momentum Partner Team<br>
                  <a href="mailto:hq@momentum-athlete.com" style="color:${BLACK};font-weight:800;text-decoration:none;">hq@momentum-athlete.com</a>
                </div>
              </td>
            </tr>

          </table>

          <!-- Tiny plain footer -->
          <div style="font-family:Montserrat, Arial, sans-serif;font-size:11px;color:${MUTED};margin-top:12px;">
            Sent by Momentum Athlete. If this wasn’t you, you can ignore this message.
          </div>

        </td>
      </tr>
    </table>
  </div>
`;


    const params = new URLSearchParams();
    params.append("from", `Momentum <${FROM_EMAIL}>`);
    params.append("to", toEmail);
    params.append("subject", subject);
    params.append("html", html);

    const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const mgText = await res.text();

    if (!res.ok) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: "Mailgun error",
          status: res.status,
          details: mgText,
        }),
      };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
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
