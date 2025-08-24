import React from 'react';

// Reusable style objects for cleaner code
const styles = {
  main: {
    fontFamily: '"Poppins", sans-serif',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    lineHeight: '1.6',
    color: '#333333',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
  },
  header: {
    fontFamily: '"Playfair Display", serif',
    color: '#017666', // zolGreen
    paddingBottom: '15px',
    borderBottom: '1px solid #eeeeee',
    marginBottom: '20px',
    fontSize: '28px',
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  highlightBox: {
    backgroundColor: '#fdf9f2',
    borderLeft: '4px solid #BE8A27', // zolGold
    padding: '15px 20px',
    margin: '20px 0',
  },
  messageBox: {
    backgroundColor: '#f0faf8',
    padding: '15px 20px',
    margin: '20px 0',
    borderRadius: '5px',
    fontStyle: 'italic',
  },
  strong: {
    color: '#017666', // zolGreen
    fontWeight: '600',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#BE8A27', // zolGold
    color: '#ffffff',
    padding: '12px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#999999',
  }
};

export const SellerAppointmentRequestEmail = ({ propertyTitle, buyerName, appointmentDate, message, dashboardUrl }) => (
  <div style={styles.main}>
    <div style={styles.container}>
      <h1 style={styles.header}>Танилцах цагийн шинэ хүсэлт!</h1>
      <p style={styles.paragraph}>
        Сайн байна уу,
      </p>
      <p style={styles.paragraph}>
        Таны доорх үл хөдлөх хөрөнгөнд танилцах цагийн шинэ хүсэлт ирлээ:
      </p>
      
      <div style={styles.highlightBox}>
        <p style={{...styles.paragraph, marginBottom: '15px'}}>
          <strong style={styles.strong}>Үл хөдлөх:</strong> {propertyTitle}
        </p>
        <p style={{...styles.paragraph, marginBottom: '15px'}}>
          <strong style={styles.strong}>Хүсэлт гаргасан:</strong> {buyerName}
        </p>
        <p style={{...styles.paragraph, marginBottom: 0}}>
          <strong style={styles.strong}>Хүсэлт гаргасан огноо, цаг:</strong> {new Date(appointmentDate).toLocaleString('mn-MN', { dateStyle: 'long', timeStyle: 'short' })}
        </p>
      </div>

      {message && (
        <>
          <p style={styles.paragraph}><strong style={styles.strong}>Худалдан авагчийн зурвас:</strong></p>
          <div style={styles.messageBox}>
            <p style={{...styles.paragraph, marginBottom: 0}}>"{message}"</p>
          </div>
        </>
      )}

      <p style={styles.paragraph}>
        Энэхүү цагийг баталгаажуулах эсвэл өөрчлөхийн тулд өөрийн хяналтын самбарт нэвтэрнэ үү.
      </p>

      <a href={dashboardUrl || '#'} target="_blank" rel="noopener noreferrer" style={styles.button}>
        Хяналтын самбарт нэвтрэх
      </a>

      <div style={styles.footer}>
        <p>ZOL Inc. | Таны найдвартай түнш</p>
      </div>
    </div>
  </div>
);