import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chapter = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course/" + id);
    const dataFormat = res.data.data;
    setData(dataFormat);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>ตารางการเรียนรู้</h1>
      <hr style={styles.hr} />
      <div style={styles.chapterList}>
        {data.map((chapter) => (
          <ChapterCard key={chapter.id} {...chapter} />
        ))}
      </div>
    </div>
  );
};

const ChapterCard = ({ ch_title, ch_url, ch_view, ch_timetotal }) => {
  return (
    <div style={styles.chapterCard}>
      <h2 style={styles.chapterTitle}>เรื่อง: {ch_title}</h2>
      <div style={styles.videoContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${ch_url}`}
          title={ch_title}
          style={styles.video}
          allowFullScreen
        ></iframe>
      </div>
      <p style={styles.info}>
        <span style={styles.label}>View:</span> {ch_view}{" "}
        <span style={styles.label}>Time:</span> {ch_timetotal}
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  hr: {
    borderColor: "#ddd",
    marginBottom: "20px",
  },
  chapterList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  chapterCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  chapterTitle: {
    color: "#5a5a5a",
    fontSize: "1.5rem",
    marginBottom: "15px",
  },
  videoContainer: {
    position: "relative",
    paddingBottom: "56.25%", // Aspect ratio 16:9
    height: 0,
    overflow: "hidden",
    maxWidth: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    border: "5px solid #3498db", // Blue border around the iframe
  },
  info: {
    fontSize: "1rem",
    color: "#777",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
};

export default Chapter;
