import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import HalalFlyLogo from '../../assets/images/halal-fly-logo.png'; // Use the correct path for your logo image

const generateReceiptPdf = (bookingDetails,setIsDownloading) => {
  const pdf = new jsPDF();
  setIsDownloading(true)
  // Set color scheme and font
  const primaryColor = '#004e8c';
  const accentColor = '#FF8C42';

  // Add Logo
  pdf.addImage(HalalFlyLogo, 'PNG', 15, 10, 50, 15); // Adjust positioning and size as needed

  // Add Title
  pdf.setFontSize(18);
  pdf.setTextColor(primaryColor);
  pdf.text('Order Receipt', 105, 40, { align: 'center' });

  // Draw separator line
  pdf.setDrawColor(accentColor);
  pdf.setLineWidth(0.5);
  pdf.line(15, 45, 195, 45);

  // Order Details Section
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0); // Black color for text
  pdf.text(`Order Number: ${bookingDetails._id}`, 20, 60);
  pdf.text(`Contact Us: ${bookingDetails.ContactUs}`, 20, 70);
  pdf.text(`Payment Method: ${bookingDetails.PaymentMethod}`, 20, 80);
  pdf.text(`Room Type: ${bookingDetails.RoomType}`, 20, 90);
  pdf.text(`Number of Adults: ${bookingDetails.NumOfAdults}`, 20, 100);
  pdf.text(`Payment Status: ${bookingDetails.PaymentStatus}`, 20, 110);
  pdf.text(`Date Created: ${new Date(bookingDetails.DateCreated).toLocaleString()}`, 20, 120);

  // Add a decorative box or section for total or additional information if needed
  pdf.setFillColor(primaryColor);
  pdf.rect(15, 130, 180, 10, 'F'); // Decorative box
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.text('Thank you for choosing HalalFly!', 105, 137, { align: 'center' });

  // Final instructions
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.text(
    'For any queries, contact us at support@halalfly.com or call +49 177 9365929',
    105,
    150,
    { align: 'center' }
  );

  // Print and Download Buttons
  pdf.save(`Order_Receipt_${bookingDetails._id}.pdf`);

};

export default generateReceiptPdf;
