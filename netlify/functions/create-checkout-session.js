const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = JSON.parse(event.body || "{}");
    const { courseId, courseTitle } = body;

    if (!courseId || !courseTitle) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing course info." }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseTitle,
              description: "1.0 academic credit course enrollment",
            },
            unit_amount: 39500,
          },
          quantity: 1,
        },
      ],

      metadata: {
        course_id: courseId,
        course_title: courseTitle,
      },

      // 🔥 THIS is the key change
      success_url: `${process.env.URL}/course.html?course=${encodeURIComponent(courseId)}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.URL}/course-enrollment.html?course=${encodeURIComponent(courseId)}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error("Stripe session error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to create checkout session.",
      }),
    };
  }
};
