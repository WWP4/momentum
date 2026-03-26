const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sessionId =
      event.queryStringParameters?.session_id || null;
    const requestedCourse =
      event.queryStringParameters?.course || null;

    if (!sessionId || !requestedCourse) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          ok: false,
          error: "Missing session_id or course.",
        }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";

    const purchasedCourse = session.metadata?.course_id || null;

    if (!paid) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          ok: false,
          error: "Payment not completed.",
        }),
      };
    }

    if (!purchasedCourse || purchasedCourse !== requestedCourse) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          ok: false,
          error: "Course access denied.",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        courseId: purchasedCourse,
        courseTitle: session.metadata?.course_title || "",
      }),
    };
  } catch (error) {
    console.error("Verify course access error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: "Could not verify course access.",
      }),
    };
  }
};
