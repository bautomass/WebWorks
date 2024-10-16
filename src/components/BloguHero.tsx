import React, { useState } from "react";
import styles from "./BloguHero.module.css";
import {
  FaHome,
  FaBlog,
  FaInfoCircle,
  FaEnvelope,
  FaUserCog,
} from "react-icons/fa";

const BlogSystem: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const [blogPosts, setBlogPosts] = useState([
    {
      title: "Tīmekļa izstrādes pamati iesācējiem",
      category: "Basics",
      views: 523,
    },
    { title: "SEO optimizācijas noslēpumi", category: "SEO", views: 789 },
    {
      title: "Responsīvā dizaina labākās prakses",
      category: "Design",
      views: 645,
    },
    { title: "JavaScript ES6 jaunumi", category: "JavaScript", views: 912 },
    { title: "Tīmekļa drošības pamati", category: "Security", views: 378 },
    { title: "Modernās CSS tehnikas", category: "CSS", views: 701 },
  ]);

  const addPost = () => {
    const newPost = {
      title: "Jauns raksts",
      category: "Uncategorized",
      views: 0,
    };
    setBlogPosts([...blogPosts, newPost]);
  };

  const editPost = (index: number) => {
    const updatedPosts = [...blogPosts];
    updatedPosts[index].title = "Rediģēts raksts";
    setBlogPosts(updatedPosts);
  };

  const deletePost = (index: number) => {
    const updatedPosts = blogPosts.filter((_, i) => i !== index);
    setBlogPosts(updatedPosts);
  };

  const SlidingMenu = () => {
    return (
      <div className={styles.slidingMenu}>
        <div className={styles.menuItems}>
          <div className={styles.menuItem}>
            <FaHome className={styles.icon} />
            <span className={styles.menuText}>Sākums</span>
          </div>
          <div className={styles.menuItem}>
            <FaBlog className={styles.icon} />
            <span className={styles.menuText}>Blogs</span>
          </div>
          <div className={styles.menuItem}>
            <FaInfoCircle className={styles.icon} />
            <span className={styles.menuText}>Par mums</span>
          </div>
          <div className={styles.menuItem}>
            <FaEnvelope className={styles.icon} />
            <span className={styles.menuText}>Kontakti</span>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => setShowAdminDashboard(!showAdminDashboard)}
          >
            <FaUserCog className={styles.icon} />
            <span className={styles.menuText}>Administratora panelis</span>
          </div>
        </div>
      </div>
    );
  };

  const BlogGrid = () => (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileImage}></div>
        <h1 className={styles.name}>Web Works</h1>
      </div>
      <div className={styles.grid}>
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              hoveredCard === index ? styles.hovered : ""
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={styles.cardContent}>
              <span className={styles.category}>{post.category}</span>
              <h3>{post.title}</h3>
              <p>Published on {new Date().toLocaleDateString()}</p>
              <div className={styles.cardFooter}>
                <span className={styles.readMore}>Read More</span>
                <span className={styles.views}>{post.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className={styles.dashboard}>
      <h2>Administratora panelis</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Kopējais rakstu skaits</h3>
          <p>{blogPosts.length}</p>
        </div>
      </div>
      <div className={styles.postManagement}>
        <h3>Pārvaldīt rakstus</h3>
        <button className={styles.addButton} onClick={addPost}>
          Pievienot jaunu rakstu
        </button>
        <ul className={styles.postList}>
          {blogPosts.map((post, index) => (
            <li key={index} className={styles.postItem}>
              <span>{post.title}</span>
              <div>
                <button
                  className={styles.editButton}
                  onClick={() => editPost(index)}
                >
                  Rediģēt
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deletePost(index)}
                >
                  Dzēst
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className={styles.blogSystem}>
      <SlidingMenu />
      <div className={styles.mainContent}>
        {showAdminDashboard ? <AdminDashboard /> : <BlogGrid />}
      </div>
    </div>
  );
};

export default BlogSystem;