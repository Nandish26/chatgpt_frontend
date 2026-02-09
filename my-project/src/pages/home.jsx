import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <h2 style={styles.logo}>ChatGPT</h2>
        <button style={styles.plusBtn}>Get Plus</button>
      </div>

      {/* Center Content */}
      <div style={styles.centerContent}>
        <h1 style={styles.heading}>What’s on the agenda today?</h1>

        {/* Input Box */}
        <div style={styles.inputBox}>
          <span style={styles.plus}>+</span>
          <input
            type="text"
            placeholder="Ask anything"
            style={styles.input}
          />
          <span style={styles.icon}>🎤</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#ffffff", // WHITE BACKGROUND
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e5e5",
  },

  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },

  plusBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#f5f5ff",
    cursor: "pointer",
  },

  centerContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: "28px",
    marginBottom: "24px",
    fontWeight: "500",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    width: "420px",
    padding: "10px 14px",
    borderRadius: "30px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  plus: {
    fontSize: "20px",
    marginRight: "10px",
    cursor: "pointer",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  icon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
};

export default Home;
