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

    const BRAND_BLUE = "#0B2D6B";
    const BRAND_RED = "#C1121F";

    const html = `
      <div style="margin:0;padding:0;background:#f4f7fb;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;">
          <tr>
            <td align="center" style="padding:28px 14px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6edf7;">
                
                <tr>
                  <td style="background:${BRAND_BLUE};padding:18px 22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="left" style="font-family:Montserrat, Arial, sans-serif;color:#ffffff;">
                          <div style="font-size:18px;font-weight:800;letter-spacing:.2px;line-height:1.2;">
                            Momentum Athlete
                          </div>
                          <div style="font-size:13px;opacity:.92;line-height:1.3;margin-top:3px;">
                            Club Partner Application
                          </div>
                        </td>
                        <td align="right" style="font-family:Montserrat, Arial, sans-serif;color:#ffffff;">
                          <div style="display:inline-block;background:${BRAND_RED};padding:7px 10px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.2px;">
                            Received
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px 22px 10px 22px;font-family:Montserrat, Arial, sans-serif;color:#0b1220;">
                    <div style="font-size:22px;font-weight:800;line-height:1.25;margin:0 0 10px 0;">
                      Your partner application is in.
                    </div>

                    <div style="font-size:15px;line-height:1.6;margin:0 0 14px 0;color:#1b2a44;">
                      ${contactName ? `Hi ${escapeHtml(contactName)},` : "Hi,"}
                      we’ve received your Momentum partner application${
                        clubName
                          ? ` for <strong style="color:${BRAND_BLUE};">${escapeHtml(
                              clubName
                            )}</strong>`
                          : ""
                      }.
                    </div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7faff;border:1px solid #e3ecfb;border-radius:12px;margin:0 0 16px 0;">
                      <tr>
                        <td style="padding:14px 14px;">
                          <div style="font-size:13px;font-weight:800;letter-spacing:.2px;color:${BRAND_BLUE};margin:0 0 8px 0;">
                            SUBMISSION SUMMARY
                          </div>

                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#13233f;">
                            <tr>
                              <td style="padding:6px 0;color:#5a6b86;width:160px;">Facility</td>
                              <td style="padding:6px 0;font-weight:700;">${
                                clubName ? escapeHtml(clubName) : "—"
                              }</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;color:#5a6b86;">Primary contact</td>
                              <td style="padding:6px 0;font-weight:700;">${
                                contactName ? escapeHtml(contactName) : "—"
                              }</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;color:#5a6b86;">Submitted to</td>
                              <td style="padding:6px 0;font-weight:700;">Momentum Partner Team</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <div style="font-size:13px;font-weight:900;letter-spacing:.2px;color:${BRAND_BLUE};margin:0 0 8px 0;">
                      WHAT HAPPENS NEXT
                    </div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
                      <tr>
                        <td style="padding:10px 12px;border:1px solid #e8effa;border-radius:12px;">
                          <div style="font-size:14px;line-height:1.55;color:#13233f;">
                            <div style="font-weight:800;margin:0 0 4px 0;">Step 1 — Quick review</div>
                            <div style="color:#4d5f7b;">We review your facility details and confirm the best partner setup for your athletes.</div>
                          </div>
                        </td>
                      </tr>
                      <tr><td style="height:10px;"></td></tr>
                      <tr>
                        <td style="padding:10px 12px;border:1px solid #e8effa;border-radius:12px;">
                          <div style="font-size:14px;line-height:1.55;color:#13233f;">
                            <div style="font-weight:800;margin:0 0 4px 0;">Step 2 — Partner rollout plan</div>
                            <div style="color:#4d5f7b;">You’ll get a clear rollout plan: how credit works, what you communicate to parents, and how onboarding runs.</div>
                          </div>
                        </td>
                      </tr>
                      <tr><td style="height:10px;"></td></tr>
                      <tr>
                        <td style="padding:10px 12px;border:1px solid #e8effa;border-radius:12px;">
                          <div style="font-size:14px;line-height:1.55;color:#13233f;">
                            <div style="font-weight:800;margin:0 0 4px 0;">Step 3 — Short onboarding call</div>
                            <div style="color:#4d5f7b;">If you want, we’ll walk through everything in 15–30 minutes and answer questions.</div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
                      <tr>
                        <td align="left">
                          <a href="https://calendly.com/tricitycanvasproducts/30min"
                            style="display:inline-block;background:${BRAND_RED};color:#ffffff;text-decoration:none;font-family:Montserrat, Arial, sans-serif;font-weight:800;font-size:14px;letter-spacing:.2px;padding:12px 16px;border-radius:12px;">
                            Schedule the partner call
                          </a>
                        </td>
                      </tr>
                    </table>

                    <div style="font-size:13px;line-height:1.6;color:#51637f;margin:0 0 8px 0;">
                      Thanks — we’ll keep this simple and fast.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 22px;background:#f7faff;border-top:1px solid #e6edf7;font-family:Montserrat, Arial, sans-serif;color:#556b8b;">
                    <div style="font-size:12px;line-height:1.6;">
                      <strong style="color:${BRAND_BLUE};">Momentum Athlete</strong><br>
                      3240 W Chain of Rocks Rd • St. Louis, MO<br>
                      <a href="mailto:hq@momentum-athlete.com" style="color:${BRAND_BLUE};font-weight:800;text-decoration:none;">hq@momentum-athlete.com</a>
                    </div>
                  </td>
                </tr>

              </table>
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
