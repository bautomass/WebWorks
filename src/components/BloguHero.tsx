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
// import React, { useState } from "react";
// import styles from "./BloguHero.module.css";

// const BlogSystem: React.FC = () => {
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showAdminDashboard, setShowAdminDashboard] = useState(false);

//   const blogPosts = [
//     { title: "Tīmekļa izstrādes pamati iesācējiem", category: "Basics" },
//     { title: "SEO optimizācijas noslēpumi", category: "SEO" },
//     { title: "Responsīvā dizaina labākās prakses", category: "Design" },
//     { title: "JavaScript ES6 jaunumi", category: "JavaScript" },
//     { title: "Tīmekļa drošības pamati", category: "Security" },
//     { title: "Modernās CSS tehnikas", category: "CSS" },
//   ];

//   const SlidingMenu = () => (
//     <div
//       className={`${styles.slidingMenu} ${isMenuOpen ? styles.open : ""}`}
//       onMouseEnter={() => setIsMenuOpen(true)}
//       onMouseLeave={() => setIsMenuOpen(false)}
//     >
//       <div className={styles.logo}>Blogu Izstrāde</div>
//       <div className={styles.menuContent}>
//         <div className={styles.menuItem}>Home</div>
//         <div className={styles.menuItem}>Blog</div>
//         <div className={styles.menuItem}>About</div>
//         <div className={styles.menuItem}>Contact</div>
//         <div
//           className={styles.menuItem}
//           onClick={() => setShowAdminDashboard(!showAdminDashboard)}
//         >
//           Admin Dashboard
//         </div>
//       </div>
//     </div>
//   );

//   const BlogGrid = () => (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <div className={styles.profileImage}></div>
//         <h1 className={styles.name}>Web Works</h1>
//       </div>
//       <div className={styles.grid}>
//         {blogPosts.map((post, index) => (
//           <div
//             key={index}
//             className={`${styles.card} ${
//               hoveredCard === index ? styles.hovered : ""
//             }`}
//             onMouseEnter={() => setHoveredCard(index)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className={styles.cardContent}>
//               <span className={styles.category}>{post.category}</span>
//               <h3>{post.title}</h3>
//               <p>Published on {new Date().toLocaleDateString()}</p>
//               <div className={styles.cardFooter}>
//                 <span className={styles.readMore}>Read More</span>
//                 <span className={styles.views}>
//                   {Math.floor(Math.random() * 1000) + 100} views
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const AdminDashboard = () => (
//     <div className={styles.dashboard}>
//       <h2>Admin Dashboard</h2>
//       <div className={styles.statsGrid}>
//         <div className={styles.statCard}>
//           <h3>Total Posts</h3>
//           <p>42</p>
//         </div>
//         <div className={styles.statCard}>
//           <h3>Total Views</h3>
//           <p>15,234</p>
//         </div>
//         <div className={styles.statCard}>
//           <h3>New Comments</h3>
//           <p>7</p>
//         </div>
//       </div>
//       <div className={styles.postManagement}>
//         <h3>Manage Posts</h3>
//         <button className={styles.addButton}>Add New Post</button>
//         <table className={styles.postTable}>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Tīmekļa izstrādes pamati iesācējiem</td>
//               <td>Basics</td>
//               <td>2024-07-26</td>
//               <td>
//                 <button className={styles.editButton}>Edit</button>
//                 <button className={styles.deleteButton}>Delete</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div className={styles.blogSystem}>
//       <SlidingMenu />
//       <div className={styles.mainContent}>
//         {showAdminDashboard ? <AdminDashboard /> : <BlogGrid />}
//       </div>
//     </div>
//   );
// };

// export default BlogSystem;
