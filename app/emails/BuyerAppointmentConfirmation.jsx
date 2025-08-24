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
  strong: {
    color: '#017666', // zolGreen
    fontWeight: '600',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#999999',
  }
};

export const BuyerAppointmentConfirmationEmail = ({ propertyTitle, appointmentDate }) => (
  <div style={styles.main}>
    <div style={styles.container}>
      <h1 style={styles.header}>Хүсэлт илгээгдлээ!</h1>
      <p style={styles.paragraph}>
        Сайн байна уу,
      </p>
      <p style={styles.paragraph}>
        Таны доорх үл хөдлөх хөрөнгөтэй танилцах цаг авах хүсэлтийг борлуулагч руу амжилттай илгээлээ.
      </p>
      
      <div style={styles.highlightBox}>
        <p style={styles.paragraph}>
          <strong style={styles.strong}>Үл хөдлөх:</strong> {propertyTitle}
        </p>
        <p style={{...styles.paragraph, marginBottom: 0}}>
          <strong style={styles.strong}>Хүсэлт гаргасан огноо, цаг:</strong> {new Date(appointmentDate).toLocaleString('mn-MN', { dateStyle: 'long', timeStyle: 'short' })}
        </p>
      </div>

      <p style={styles.paragraph}>
        Борлуулагч тантай тун удахгүй холбогдож, цагийг баталгаажуулах болно.
      </p>
      <p style={styles.paragraph}>
        Баярлалаа!
      </p>

      <div style={styles.footer}>
        <p>ZOL Inc. | Таны найдвартай түнш</p>
      </div>
    </div>
  </div>
);