import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmedEmail({ email, orderId, total }) {
     return resend.emails.send({
          from: "Spicy Bazaar <onboarding@resend.dev>",
          to: email,
          subject: "Order Confirmed 🌶️ - Spicy Bazaar",
          html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              
              <tr>
                <td align="center" style="background-color: #dc2626; padding: 40px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                    Order Confirmed! 🌶️
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; font-size: 18px; color: #111827; font-weight: 600;">
                    Hello!
                  </p>
                  <p style="margin: 0 0 30px; font-size: 16px; color: #4b5563; line-height: 1.6;">
                    Get your taste buds ready. Your order from <b>Spicy Bazaar</b> has been confirmed and is being prepared for shipment.
                  </p>

                  <div style="background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #9a3412; font-weight: 700; text-transform: uppercase;">Order ID</td>
                        <td align="right" style="padding-bottom: 10px; font-size: 14px; color: #111827; font-weight: 700;">#${orderId}</td>
                      </tr>
                      <tr>
                        <td style="border-top: 1px solid #fed7aa; padding-top: 10px; font-size: 16px; color: #111827; font-weight: 700;">Total Amount</td>
                        <td align="right" style="border-top: 1px solid #fed7aa; padding-top: 10px; font-size: 20px; color: #dc2626; font-weight: 800;">Rs ${total}</td>
                      </tr>
                    </table>
                  </div>

                  <div align="center">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/orders/${orderId}" 
                       style="background-color: #111827; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; transition: background-color 0.3s ease;">
                      Track My Order
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="background-color: #f3f4f6; padding: 30px; text-align: center;">
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">
                    Questions? Contact us at <a href="mailto:support@spicybazaar.com" style="color: #dc2626; text-decoration: none;">support@spicybazaar.com</a>
                  </p>
                  <p style="margin: 10px 0 0; font-size: 12px; color: #9ca3af;">
                    &copy; 2025 Spicy Bazaar. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
     });
}