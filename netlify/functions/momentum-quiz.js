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

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#111;">
        <h2 style="margin:0 0 10px 0;">Application received.</h2>
        <p style="margin:0 0 14px 0;">
          ${parentName ? `Hi ${escapeHtml(parentName)},` : "Hi,"}
          we’ve received your Momentum application${athleteName ? ` for <strong>${escapeHtml(athleteName)}</strong>` : ""}.
        </p>
        <p style="margin:0 0 14px 0;">
          Next, our team reviews training details and maps them to transcript-ready credits.
          Most families hear back within one business day.
        </p>
        <p style="margin:0 0 18px 0;">
          You can book a quick onboarding call here:
          <a href="https://calendly.com/tricitycanvasproducts/30min">Schedule a call</a>
        </p>
        <hr style="border:none;border-top:1px solid #e7e7e7;margin:18px 0;">
        <p style="margin:0;color:#444;font-size:13px;">
          Momentum • 3240 W Chain of Rocks Rd • St. Louis, MO<br>
          <a href="mailto:hq@momentum-athlete.com">hq@momentum-athlete.com</a>
        </p>
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
