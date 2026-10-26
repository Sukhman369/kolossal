import PDFDocument from 'pdfkit';

export interface InvoiceLineItem {
  title: string;
  variantTitle?: string;
  sku?: string;
  hsnCode?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxAmount?: number;
}

export interface InvoiceOrderData {
  id: string;
  displayId?: number | string;
  createdAt: string | Date;
  currencyCode: string;
  paymentStatus?: string;
  paymentMethod?: string;
  customer: {
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    countryCode?: string;
  };
  billingAddress?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    countryCode?: string;
  };
  items: InvoiceLineItem[];
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  discountTotal?: number;
  total: number;
}

function resolveHsnCode(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('hoodie') || t.includes('knit') || t.includes('sweater')) return '6110';
  if (t.includes('tee') || t.includes('t-shirt')) return '6109';
  if (t.includes('puffer') || t.includes('jacket') || t.includes('coat') || t.includes('outerwear')) return '6201';
  if (t.includes('pant') || t.includes('cargo') || t.includes('trouser')) return '6203';
  if (t.includes('ring') || t.includes('chain') || t.includes('silver') || t.includes('jewelry')) return '7113';
  return '6109';
}

function formatCurrency(amount: number, currencyCode: string = 'INR'): string {
  const code = (currencyCode || 'INR').toUpperCase();
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${code} ${formatted}`;
}

export async function generateInvoicePdfBuffer(order: InvoiceOrderData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      info: {
        Title: `Tax Invoice - Beyond Humans - Order #${order.displayId || order.id}`,
        Author: 'Beyond Humans Collective',
        Subject: 'Official Commercial Tax Invoice',
      },
    });

    const buffers: Buffer[] = [];
    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', (err) => reject(err));

    const invoiceNumber = `BH-INV-${new Date().getFullYear()}-${String(order.displayId || 1).padStart(4, '0')}`;
    const issueDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).toUpperCase();

    // ── 1. HEADER & BRAND BAR ───────────────────────────────────────
    // Wine Red Architectural Accent Line
    doc.rect(40, 40, 515, 3).fill('#580D1A');

    doc.font('Helvetica-Bold').fontSize(16).fillColor('#111111');
    doc.text('BEYOND HUMANS', 40, 52, { characterSpacing: 2 });

    doc.font('Helvetica').fontSize(7).fillColor('#580D1A');
    doc.text('ARCHITECTURAL APPAREL & ARTIFACTS // ATELIER CHANDIGARH', 40, 72, { characterSpacing: 1 });

    // Document Type Header (Right aligned)
    doc.font('Helvetica-Bold').fontSize(14).fillColor('#111111');
    doc.text('TAX INVOICE', 350, 52, { align: 'right' });

    doc.font('Helvetica').fontSize(8).fillColor('#666666');
    doc.text(`ORIGINAL FOR RECIPIENT`, 350, 70, { align: 'right' });

    // Divider Line
    doc.strokeColor('#E5E5E5').lineWidth(0.5).moveTo(40, 88).lineTo(555, 88).stroke();

    // ── 2. SELLER & BUYER INFORMATION BLOCKS ──────────────────────
    const metaTop = 98;

    // Left Column: Supplier / Atelier Origin
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#580D1A');
    doc.text('ISSUED BY:', 40, metaTop);

    doc.font('Helvetica-Bold').fontSize(9).fillColor('#111111');
    doc.text('BEYOND HUMANS COLLECTIVE PVT. LTD.', 40, metaTop + 12);

    doc.font('Helvetica').fontSize(8).fillColor('#555555').lineGap(2);
    doc.text('Plot No. 42, Industrial Area Phase II\nChandigarh, 160002, India\nGSTIN: 04AABCB1234F1Z0\nEmail: concierge@beyondhumans.com', 40, metaTop + 24);

    // Right Column: Invoice Reference & Metadata Box
    doc.rect(340, metaTop, 215, 78).fillAndStroke('#FAFAFA', '#E5E5E5');

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#580D1A');
    doc.text('INVOICE NO:', 350, metaTop + 8);
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#111111');
    doc.text(invoiceNumber, 440, metaTop + 7, { align: 'right', width: 105 });

    doc.font('Helvetica').fontSize(7.5).fillColor('#666666');
    doc.text('ISSUE DATE:', 350, metaTop + 22);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#111111');
    doc.text(issueDate, 440, metaTop + 22, { align: 'right', width: 105 });

    doc.font('Helvetica').fontSize(7.5).fillColor('#666666');
    doc.text('ORDER REF:', 350, metaTop + 36);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#111111');
    doc.text(`BH-${order.displayId || order.id}`, 440, metaTop + 36, { align: 'right', width: 105 });

    doc.font('Helvetica').fontSize(7.5).fillColor('#666666');
    doc.text('PAYMENT STATUS:', 350, metaTop + 50);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(order.paymentStatus === 'captured' || order.paymentStatus === 'paid' ? '#059669' : '#D97706');
    doc.text((order.paymentStatus || 'PAID').toUpperCase(), 440, metaTop + 50, { align: 'right', width: 105 });

    doc.font('Helvetica').fontSize(7.5).fillColor('#666666');
    doc.text('PLACE OF SUPPLY:', 350, metaTop + 64);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#111111');
    doc.text((order.shippingAddress?.province || 'Chandigarh (04)').toUpperCase(), 440, metaTop + 64, { align: 'right', width: 105 });

    // Buyer Information
    const buyerTop = 188;
    doc.strokeColor('#E5E5E5').lineWidth(0.5).moveTo(40, buyerTop - 6).lineTo(555, buyerTop - 6).stroke();

    doc.font('Helvetica-Bold').fontSize(8).fillColor('#580D1A');
    doc.text('BILLED & DELIVERED TO:', 40, buyerTop);

    const customerName = [order.customer?.firstName, order.customer?.lastName].filter(Boolean).join(' ') || 'Valued Customer';
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#111111');
    doc.text(customerName, 40, buyerTop + 12);

    const addr = order.shippingAddress || {};
    const addressLines = [
      addr.address1,
      addr.address2,
      [addr.city, addr.province, addr.postalCode].filter(Boolean).join(', '),
      (addr.countryCode || 'IN').toUpperCase(),
      order.customer?.phone ? `Phone: ${order.customer.phone}` : null,
      `Email: ${order.customer?.email}`,
    ].filter(Boolean).join('\n');

    doc.font('Helvetica').fontSize(8).fillColor('#555555').lineGap(2);
    doc.text(addressLines, 40, buyerTop + 24);

    // ── 3. LINE ITEMS TABLE ─────────────────────────────────────────
    const tableTop = 275;

    // Table Header Background
    doc.rect(40, tableTop, 515, 20).fill('#1A1A1A');

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#FFFFFF');
    doc.text('SR', 48, tableTop + 6);
    doc.text('ITEM DESCRIPTION', 75, tableTop + 6);
    doc.text('HSN', 270, tableTop + 6);
    doc.text('QTY', 320, tableTop + 6, { align: 'center', width: 30 });
    doc.text('RATE', 370, tableTop + 6, { align: 'right', width: 70 });
    doc.text('TOTAL', 465, tableTop + 6, { align: 'right', width: 80 });

    let currentY = tableTop + 20;

    order.items.forEach((item, index) => {
      const isEven = index % 2 === 0;
      const hsn = item.hsnCode || resolveHsnCode(item.title);
      const rowHeight = 26;

      if (isEven) {
        doc.rect(40, currentY, 515, rowHeight).fill('#FBFBFA');
      }

      doc.font('Helvetica').fontSize(8).fillColor('#555555');
      doc.text(String(index + 1), 48, currentY + 7);

      // Title & Variant
      doc.font('Helvetica-Bold').fontSize(8).fillColor('#111111');
      doc.text(item.title, 75, currentY + 5, { width: 185, lineBreak: false });

      if (item.variantTitle && item.variantTitle !== 'Standard') {
        doc.font('Helvetica').fontSize(7).fillColor('#777777');
        doc.text(item.variantTitle, 75, currentY + 14, { width: 185, lineBreak: false });
      }

      doc.font('Helvetica').fontSize(7.5).fillColor('#555555');
      doc.text(hsn, 270, currentY + 8);

      doc.text(String(item.quantity), 320, currentY + 8, { align: 'center', width: 30 });

      doc.text(formatCurrency(item.unitPrice, order.currencyCode), 370, currentY + 8, { align: 'right', width: 70 });

      doc.font('Helvetica-Bold').fontSize(8).fillColor('#111111');
      doc.text(formatCurrency(item.total, order.currencyCode), 465, currentY + 8, { align: 'right', width: 80 });

      // Row divider
      doc.strokeColor('#EEEEEE').lineWidth(0.5).moveTo(40, currentY + rowHeight).lineTo(555, currentY + rowHeight).stroke();
      currentY += rowHeight;
    });

    // ── 4. TOTALS & BREAKDOWN SUMMARY ──────────────────────────────
    const summaryTop = Math.max(currentY + 12, 450);

    // Left Column: Note & Terms
    doc.rect(40, summaryTop, 270, 78).fillAndStroke('#FAFAFA', '#E5E5E5');
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#580D1A');
    doc.text('TERMS & DECLARATION:', 50, summaryTop + 8);

    doc.font('Helvetica').fontSize(6.8).fillColor('#666666').lineGap(2);
    doc.text(
      '• Goods once sold are eligible for exchange/return within 7 days in pristine unworn condition with tags intact.\n• All silhouettes are architectural garments milled from certified organic textiles.\n• Certified GST Tax Invoice generated under Section 31 of the CGST Act.',
      50,
      summaryTop + 20,
      { width: 250 }
    );

    // Right Column: Price Breakdown
    const rightColX = 330;
    const rightColW = 225;

    let totalsY = summaryTop + 2;

    const addTotalRow = (label: string, amount: string, bold: boolean = false, highlightColor?: string) => {
      doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(8).fillColor(highlightColor || (bold ? '#111111' : '#666666'));
      doc.text(label, rightColX, totalsY);
      doc.text(amount, rightColX, totalsY, { align: 'right', width: rightColW });
      totalsY += 14;
    };

    addTotalRow('Item Subtotal (Excl. Tax)', formatCurrency(order.subtotal, order.currencyCode));

    if (order.discountTotal && order.discountTotal > 0) {
      addTotalRow('Privilege Drop Discount', `-${formatCurrency(order.discountTotal, order.currencyCode)}`, false, '#580D1A');
    }

    // Tax Itemization (Assumes GST split for India or single tax for intl)
    const isIndia = (order.shippingAddress?.countryCode || 'in').toLowerCase() === 'in';
    const isLocalState = (order.shippingAddress?.province || '').toLowerCase().includes('chandigarh') || (order.shippingAddress?.province || '').toLowerCase().includes('punjab');

    if (isIndia && order.taxTotal > 0) {
      if (isLocalState) {
        addTotalRow('CGST (2.5% / 6%)', formatCurrency(order.taxTotal / 2, order.currencyCode));
        addTotalRow('SGST (2.5% / 6%)', formatCurrency(order.taxTotal / 2, order.currencyCode));
      } else {
        addTotalRow('IGST (5% / 12%)', formatCurrency(order.taxTotal, order.currencyCode));
      }
    } else {
      addTotalRow('Taxes & Duties', formatCurrency(order.taxTotal, order.currencyCode));
    }

    addTotalRow('Express Insured Shipping', order.shippingTotal === 0 ? 'COMPLIMENTARY' : formatCurrency(order.shippingTotal, order.currencyCode));

    // Grand Total Divider & Line
    totalsY += 2;
    doc.strokeColor('#580D1A').lineWidth(1.5).moveTo(rightColX, totalsY).lineTo(rightColX + rightColW, totalsY).stroke();
    totalsY += 6;

    doc.font('Helvetica-Bold').fontSize(10).fillColor('#111111');
    doc.text('NET AMOUNT DUE', rightColX, totalsY);
    doc.text(formatCurrency(order.total, order.currencyCode), rightColX, totalsY, { align: 'right', width: rightColW });

    // ── 5. AUTHENTICATION FOOTER & SIGNATURE ────────────────────────
    const footerTop = 720;
    doc.strokeColor('#E5E5E5').lineWidth(0.5).moveTo(40, footerTop).lineTo(555, footerTop).stroke();

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#111111');
    doc.text('AUTHORIZED SIGNATORY // BEYOND HUMANS ARCHIVE', 40, footerTop + 10);

    doc.font('Helvetica').fontSize(7).fillColor('#777777');
    doc.text('Computer-generated electronic document. No physical signature required.', 40, footerTop + 20);

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#580D1A');
    doc.text('VERIFIED & CERTIFIED', 400, footerTop + 10, { align: 'right', width: 155 });

    doc.font('Helvetica').fontSize(7).fillColor('#999999');
    doc.text(`Generated on ${new Date().toUTCString()}`, 400, footerTop + 20, { align: 'right', width: 155 });

    doc.end();
  });
}
