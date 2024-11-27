import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Course = () => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course");
    const dataFormat = res.data.data;
    setData(dataFormat);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>คอร์สเรียนของเรา</h1>
      <hr style={styles.hr} />
      <div style={styles.courseList}>
        {data.map((course, index) => (
          <CourseCard key={course.id} {...course} index={index} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ id, title, detail, picture, index }) => {
  const borderColors = [
    "#FF6347", // Tomato Red
    "#4682B4", // Steel Blue
    "#32CD32", // Lime Green
    "#FFD700", // Gold
    "#8A2BE2", // Blue Violet
  ];

  const borderColor = borderColors[index % borderColors.length]; // Cycle through colors

  return (
    <div style={{ ...styles.card, borderColor }}>
      <div style={styles.imageContainer}>
        <img src={picture} alt={title} style={styles.courseImage} />
      </div>
      <div style={styles.cardContent}>
        <h2 style={styles.courseTitle}>{title}</h2>
        <p style={styles.courseDescription}>{detail}</p>
        <NavLink to={`/course/${id}`} style={styles.link}>
          หลักสูตร
        </NavLink>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5em",
    color: "#333",
    marginBottom: "20px",
  },
  hr: {
    margin: "20px 0",
    borderColor: "#ccc",
  },
  courseList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "10px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    border: "4px solid", // Border color will be applied dynamically
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  imageContainer: {
    position: "relative",
    paddingTop: "56.25%", // Aspect ratio 16:9
    overflow: "hidden",
  },
  courseImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
  },
  cardContent: {
    padding: "15px",
  },
  courseTitle: {
    fontSize: "1.5em",
    color: "#007BFF",
    margin: "0 0 10px 0",
  },
  courseDescription: {
    fontSize: "1.1em",
    color: "#555",
    marginBottom: "15px",
  },
  link: {
    fontSize: "1.1em",
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 12px",
    border: "1px solid #007BFF",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
  },
  linkHover: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
};

export default Course;
