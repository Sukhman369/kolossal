import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { generateInvoicePdfBuffer, InvoiceOrderData } from "../../../../../utils/invoice-generator";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  try {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
    const { data } = await query.graph({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "created_at",
        "currency_code",
        "status",
        "total",
        "subtotal",
        "tax_total",
        "discount_total",
        "shipping_total",
        "items.*",
        "customer.*",
        "shipping_address.*",
        "billing_address.*",
        "payment_collections.*",
        "payment_collections.payments.*",
      ],
      filters: { id },
    });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: `Order with id ${id} not found.` });
    }

    const order = data[0] as Record<string, any>;

    const mappedItems = (order.items || []).map((it: any) => ({
      title: it.title || it.product_title || "Apparel Item",
      variantTitle: it.variant_title || it.variant?.title,
      sku: it.variant_sku || it.variant?.sku,
      quantity: Number(it.quantity || 1),
      unitPrice: Number(it.unit_price ?? it.price ?? 0),
      total: Number(it.total ?? (Number(it.unit_price || 0) * Number(it.quantity || 1))),
    }));

    const invoiceData: InvoiceOrderData = {
      id: order.id,
      displayId: order.display_id,
      createdAt: order.created_at,
      currencyCode: order.currency_code || "INR",
      paymentStatus: order.payment_status || order.payment_collections?.[0]?.status || "paid",
      customer: {
        firstName: order.customer?.first_name || order.shipping_address?.first_name,
        lastName: order.customer?.last_name || order.shipping_address?.last_name,
        email: order.customer?.email || order.email || "customer@beyondhumans.com",
        phone: order.customer?.phone || order.shipping_address?.phone,
      },
      shippingAddress: order.shipping_address || {},
      billingAddress: order.billing_address || order.shipping_address || {},
      items: mappedItems,
      subtotal: Number(order.subtotal || order.item_subtotal || mappedItems.reduce((acc: number, i: any) => acc + i.total, 0)),
      shippingTotal: Number(order.shipping_total || 0),
      taxTotal: Number(order.tax_total || 0),
      discountTotal: Number(order.discount_total || 0),
      total: Number(order.total || mappedItems.reduce((acc: number, i: any) => acc + i.total, 0)),
    };

    const pdfBuffer = await generateInvoicePdfBuffer(invoiceData);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="Invoice-BH-${order.display_id || order.id}.pdf"`
    );
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error("Failed to generate order invoice PDF:", error);
    res.status(500).json({
      message: "An error occurred while generating the invoice PDF.",
      error: error.message,
    });
  }
}
