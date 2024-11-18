import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getBookingDetails } from 'src/services';
import { useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
import generateReceiptPdf from './generateReceiptPdf';
import { SuccessPaymentTranslation } from '../Translation/translation_german';

const SuccessfulPayment = () => {
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false);
    const { id } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false); // State for download loader
    console.log("isDownloading",isDownloading)
    useEffect(() => {
        const fetchBookingDetails = async () => {
            const resultAction = await dispatch(getBookingDetails(id));
            if (getBookingDetails.fulfilled.match(resultAction)) {
                setBookingDetails(resultAction.payload);
            } else {
                console.error('Error fetching booking details:', resultAction.payload);
            }
        };
        fetchBookingDetails();
    }, [dispatch, id]);

    const toggleDetails = () => setShowDetails(!showDetails);

    const handlePrintReceipt = () => {
        window.print();
    };


    return (
        <Container maxWidth='md'>
            <Box
                sx={{
                    textAlign: 'center',
                    padding: 4,
                    borderRadius: '15px',
                    backgroundColor: '#F0F4F8',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    marginBottom: 2,
                }}
            >
                <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#004e8c', marginBottom: 2 }} />
                <Typography variant="h4" sx={{ color: '#004e8c', marginBottom: 1 }}>
                    {SuccessPaymentTranslation.successTitle}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', marginBottom: 2 }}>
                    {SuccessPaymentTranslation.successMessage}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', marginBottom: 3 }}>
                    {SuccessPaymentTranslation.confirmationMessage}
                </Typography>

                {bookingDetails && (
                    <Typography variant="body2" sx={{ color: '#555', marginBottom: 3 }}>
                        {SuccessPaymentTranslation.orderNumber}: {id}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="warning"
                    sx={{ backgroundColor: '#FF8C42', color: 'white', marginTop: 2 }}
                    onClick={toggleDetails}
                >
                    {showDetails ? SuccessPaymentTranslation.hideDetailsButton : SuccessPaymentTranslation.viewDetailsButton}
                </Button>

                {showDetails && bookingDetails && (
                    <Box sx={{ marginTop: 2, textAlign: 'left', backgroundColor: '#fff', padding: 2, borderRadius: '8px' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, color: '#004e8c' }}>
                            {SuccessPaymentTranslation.receiptTitle}
                        </Typography>
                        <Typography variant="body2">
                            <strong>{SuccessPaymentTranslation.contactUs}:</strong> {bookingDetails.ContactUs}
                        </Typography>
                        <Typography variant="body2">
                            <strong>{SuccessPaymentTranslation.paymentMethod}:</strong> {bookingDetails.PaymentMethod}
                        </Typography>
                        <Typography variant="body2">
                            <strong>{SuccessPaymentTranslation.roomType}:</strong> {bookingDetails.RoomType}
                        </Typography>
                        <Typography variant="body2">
                            <strong>{SuccessPaymentTranslation.numberOfAdults}:</strong> {bookingDetails.NumOfAdults}
                        </Typography>
                        <Typography variant="body2">
                            <strong>{SuccessPaymentTranslation.paymentStatus}:</strong> {bookingDetails.PaymentStatus}
                        </Typography>
                        <Typography variant="body2">
                            <strong>{SuccessPaymentTranslation.dateCreated}:</strong> {new Date(bookingDetails.DateCreated).toLocaleString()}
                        </Typography>

                        <Button
                            variant="outlined"
                            sx={{ marginTop: 2, marginRight: 2 }}
                            onClick={handlePrintReceipt}
                        >
                            {SuccessPaymentTranslation.printReceipt}
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{ marginTop: 2 }}
                            onClick={() => {generateReceiptPdf(bookingDetails,setIsDownloading)
                                setIsDownloading(false)

                            }}
                            disabled={isDownloading} // Disable button while downloading
                        >
                            {isDownloading ? <CircularProgress size={24} /> : SuccessPaymentTranslation.downloadPDF}
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default SuccessfulPayment;
