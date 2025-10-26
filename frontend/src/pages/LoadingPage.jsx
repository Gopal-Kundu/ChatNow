import React from "react";

const LoadingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <div style={styles.text}>Loading...</div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    border: "6px solid #fff",
    borderTop: "6px solid #000",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite",
  },
  text: {
    color: "#fff",
    marginTop: "20px",
    fontSize: "18px",
    letterSpacing: "1px",
  },
};


export default LoadingPage;
