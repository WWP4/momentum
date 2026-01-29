// netlify/functions/momentum-quiz-submit.js
import { createClient } from "@supabase/supabase-js";
import formData from "form-data";
import Mailgun from "mailgun.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const FROM_EMAIL = process.env.FROM_EMAIL || `Momentum <hq@${MAILGUN_DOMAIN}>`;

if (!SUPABASE_URL) throw new Error("SUPABASE_URL is required.");
if (!SERVICE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required.");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const mg = MAILGUN_API_KEY
  ? new Mailgun(formData).client({ username: "api", key: MAILGUN_API_KEY })
  : null;

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = JSON.parse(event.body || "{}");
    if (!data?.email) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Missing email" }) };
    }

    // 1) Insert into Supabase
    const { error } = await supabase.from("parent_applications").insert([{
      parent_name: data.parent_name ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,

      athlete_name: data.athlete_name ?? null,
      athlete_age_group: data.athlete_age_group ?? null,
      primary_sport: data.primary_sport ?? null,
      city: data.city ?? null,
      state: data.state ?? null,

      training_sessions_per_week: data.training_sessions_per_week ?? null,
      session_length: data.session_length ?? null,
      session_includes: data.session_includes ?? null,

      games_per_week: data.games_per_week ?? null,
      competition_types: data.competition_types ?? null,

      strength_conditioning: data.strength_conditioning ?? null,
      recovery_practices: data.recovery_practices ?? null,

      nutrition_guidance: data.nutrition_guidance ?? null,
      nutrition_topics: data.nutrition_topics ?? null,

      leadership_roles: data.leadership_roles ?? null,
      character_emphasis: data.character_emphasis ?? null,
      life_skills: data.life_skills ?? null,
      mental_performance: data.mental_performance ?? null,

      notes: data.notes ?? null,
      score: Number.isFinite(+data.score) ? +data.score : null,
      qualifies: typeof data.qualifies === "boolean" ? data.qualifies : null,
      source: data.source ?? "momentum-site"
    }]);

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ ok:false, error:"DB insert failed", detail:error.message }) };
    }

    // 2) Send confirmation email
    if (mg && MAILGUN_DOMAIN) {
      const first = (data.parent_name || "").split(" ")[0];

      const html = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:680px;margin:0 auto;color:#0b0f19;line-height:1.6;padding:22px">
          <div style="height:4px;background:linear-gradient(90deg,#ff2d55 0%,#7a45ff 45%,#3b5bff 100%);border-radius:999px;margin-bottom:18px"></div>

          <h2 style="margin:0 0 8px;font-size:22px;letter-spacing:-.02em">
            Thanks${first ? `, ${first}` : ""} — we received your application.
          </h2>

          <p style="margin:0 0 14px;color:#2b3445">
            We’re mapping your athlete’s training into transcript-ready credits. Most families hear back within one business day.
          </p>

          <div style="background:#fff;border:1px solid #e7e9ef;border-radius:14px;padding:14px;margin:14px 0 18px">
            <div style="font-weight:800;margin-bottom:6px">Next steps</div>
            <ol style="margin:0;padding-left:18px;color:#2b3445">
              <li>We confirm eligibility and credit options.</li>
              <li>You receive a clear plan and what to submit.</li>
              <li>You choose enrollment timing.</li>
            </ol>
          </div>

          <div style="display:flex;gap:12px;flex-wrap:wrap;margin:0 0 18px">
            <a href="https://calendly.com/tricitycanvasproducts/30min"
               style="background:#0b0f19;color:#fff;padding:12px 16px;border-radius:999px;text-decoration:none;font-weight:800;display:inline-block">
              Book Onboarding Call
            </a>

            <a href="https://buy.stripe.com/fZu8wQe9Sgdg7x9e2saR201"
               style="background:#3b5bff;color:#fff;padding:12px 16px;border-radius:999px;text-decoration:none;font-weight:800;display:inline-block">
              Place Deposit (Optional)
            </a>

            <a href="/redirect.html"
               style="border:1px solid #e7e9ef;color:#0b0f19;padding:12px 16px;border-radius:999px;text-decoration:none;font-weight:800;display:inline-block">
              Watch Next Steps Video
            </a>
          </div>

          <p style="margin:0;color:#556070;font-size:13px">
            Momentum Athlete • 3240 W Chain of Rocks Rd • St. Louis, MO<br>
            <a href="mailto:hq@momentum-athlete.com" style="color:#3b5bff;text-decoration:none;font-weight:700">hq@momentum-athlete.com</a>
          </p>
        </div>
      `;

      await mg.messages.create(MAILGUN_DOMAIN, {
        from: FROM_EMAIL,
        to: data.email,
        subject: "Momentum application received — next steps",
        html
      });
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok:true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok:false, error:"Server error", detail:String(err?.message || err) })
    };
  }
}
