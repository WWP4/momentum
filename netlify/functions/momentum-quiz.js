// netlify/functions/momentum-quiz.js

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = JSON.parse(event.body || "{}");
    const toEmail = (data.email || "").trim();
    const parentName = (data.parent_name || "").trim();
    const athleteName = (data.athlete_name || "").trim();

    if (!toEmail) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing email" }) };
    }

    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN; // e.g. "momentum-athlete.com"
    const FROM_EMAIL = process.env.MAILGUN_FROM || `hq@${MAILGUN_DOMAIN}`;

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing MAILGUN_API_KEY or MAILGUN_DOMAIN env vars" })
      };
    }

    const subject = "Momentum — Application received";

    const BRAND_BLUE = "#0B2D6B";   // adjust if you have an exact Momentum blue
const BRAND_RED  = "#C1121F";   // adjust if you have an exact Momentum red

const html = `
  <div style="margin:0;padding:0;background:#f4f7fb;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7fb;">
      <tr>
        <td align="center" style="padding:28px 14px;">

          <!-- Outer container -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6edf7;">
            
            <!-- Header bar -->
            <tr>
              <td style="background:${BRAND_BLUE};padding:18px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="font-family:Montserrat, Arial, sans-serif;color:#ffffff;">
                      <div style="font-size:18px;font-weight:800;letter-spacing:.2px;line-height:1.2;">
                        Momentum Athlete
                      </div>
                      <div style="font-size:13px;opacity:.92;line-height:1.3;margin-top:3px;">
                        Application Confirmation
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

            <!-- Body -->
            <tr>
              <td style="padding:22px 22px 10px 22px;font-family:Montserrat, Arial, sans-serif;color:#0b1220;">
                
                <div style="font-size:22px;font-weight:800;line-height:1.25;margin:0 0 10px 0;">
                  Your application is in.
                </div>

                <div style="font-size:15px;line-height:1.6;margin:0 0 14px 0;color:#1b2a44;">
                  ${parentName ? `Hi ${escapeHtml(parentName)},` : "Hi,"}
                  we’ve received your Momentum application${athleteName ? ` for <strong style="color:${BRAND_BLUE};">${escapeHtml(athleteName)}</strong>` : ""}.
                </div>

                <!-- Summary box -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7faff;border:1px solid #e3ecfb;border-radius:12px;margin:0 0 16px 0;">
                  <tr>
                    <td style="padding:14px 14px;">
                      <div style="font-size:13px;font-weight:800;letter-spacing:.2px;color:${BRAND_BLUE};margin:0 0 8px 0;">
                        APPLICATION SUMMARY
                      </div>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:#13233f;">
                        <tr>
                          <td style="padding:6px 0;color:#5a6b86;width:160px;">Parent/Guardian</td>
                          <td style="padding:6px 0;font-weight:700;">${parentName ? escapeHtml(parentName) : "—"}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#5a6b86;">Athlete</td>
                          <td style="padding:6px 0;font-weight:700;">${athleteName ? escapeHtml(athleteName) : "—"}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#5a6b86;">Submitted To</td>
                          <td style="padding:6px 0;font-weight:700;">Momentum Review Team</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- What happens next -->
                <div style="font-size:13px;font-weight:900;letter-spacing:.2px;color:${BRAND_BLUE};margin:0 0 8px 0;">
                  WHAT HAPPENS NEXT (STEP-BY-STEP)
                </div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e8effa;border-radius:12px;">
                      <div style="font-size:14px;line-height:1.55;color:#13233f;">
                        <div style="font-weight:800;margin:0 0 4px 0;">
                          Step 1 — We review your training schedule
                        </div>
                        <div style="color:#4d5f7b;">
                          We match your athlete’s training, competition, and recovery details to transcript-ready course credits.
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e8effa;border-radius:12px;">
                      <div style="font-size:14px;line-height:1.55;color:#13233f;">
                        <div style="font-weight:800;margin:0 0 4px 0;">
                          Step 2 — We confirm the best credit plan
                        </div>
                        <div style="color:#4d5f7b;">
                          You’ll receive a clear plan showing what qualifies, what documentation is needed (if any), and next steps.
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:10px 12px;border:1px solid #e8effa;border-radius:12px;">
                      <div style="font-size:14px;line-height:1.55;color:#13233f;">
                        <div style="font-weight:800;margin:0 0 4px 0;">
                          Step 3 — Quick onboarding call (optional, but recommended)
                        </div>
                        <div style="color:#4d5f7b;">
                          If you want, we’ll walk you through everything in 15–30 minutes so you feel 100% confident.
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Primary CTA button -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
                  <tr>
                    <td align="left">
                      <a href="https://calendly.com/tricitycanvasproducts/30min"
                         style="display:inline-block;background:${BRAND_RED};color:#ffffff;text-decoration:none;font-family:Montserrat, Arial, sans-serif;font-weight:800;font-size:14px;letter-spacing:.2px;padding:12px 16px;border-radius:12px;">
                        Schedule the onboarding call
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Help / boomer-proof section -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff7f7;border:1px solid #ffd6da;border-radius:12px;margin:0 0 14px 0;">
                  <tr>
                    <td style="padding:12px 12px;">
                      <div style="font-size:13px;font-weight:900;letter-spacing:.2px;color:${BRAND_RED};margin:0 0 6px 0;">
                        NEED HELP OR DIDN’T HEAR BACK?
                      </div>
                      <div style="font-size:14px;line-height:1.6;color:#2a2a2a;">
                        <div style="margin:0 0 6px 0;">
                          1) Check your spam/junk folder for “Momentum — Application received.”
                        </div>
                        <div style="margin:0 0 6px 0;">
                          2) If you don’t hear from us within one business day, email us directly:
                          <a href="mailto:hq@momentum-athlete.com" style="color:${BRAND_BLUE};font-weight:800;text-decoration:none;">
                            hq@momentum-athlete.com
                          </a>
                        </div>
                        <div style="margin:0;">
                          3) Prefer phone? Reply to this email with your number and the best time to call.
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <div style="font-size:13px;line-height:1.6;color:#51637f;margin:0 0 8px 0;">
                  Thanks for choosing Momentum. We’ll take it from here and make this simple.
                </div>

              </td>
            </tr>

            <!-- Footer -->
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
          <!-- /Outer container -->

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

    // Mailgun API endpoint (US)
    const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

    const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const text = await res.text();

    if (!res.ok) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Mailgun error", details: text })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || "Server error" }) };
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
