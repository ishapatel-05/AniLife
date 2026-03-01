import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#B03451',
            color: 'white',
            padding: '40px 20px 20px 20px',
            marginTop: '40px'
        }}>
            <div className="container-fluid">
                <div className="row">

                    {/* Col 1 - Emergency */}
                    <div className="col-md-3 mb-4">
                        <h3 style={{ color: '#FCE4EC', fontWeight: 'bold' }}> Emergency / Vet Info</h3>
                        <p>For Emergency call:<br />
                            <strong>1962 / +91 9315982650</strong>
                        </p>
                        <p>Find nearest vet: <Link to="/vet" style={{ color: '#FCE4EC' }}>Vet Contact</Link></p>
                        <h6 style={{ color: '#FCE4EC' }}>Social Media</h6>
                        <p style={{ fontSize: '13px' }}>Connect with us for updates, adoptions, and care tips</p>
                        {/* <div>
                            <span style={socialBtn}>📧</span>
                            <span style={socialBtn}>📸</span>
                            <span style={socialBtn}>👥</span>
                            <span style={socialBtn}>🐦</span>
                        </div> */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <a href="https://mail.google.com/mail/u/0/" style={{ color: 'white', fontSize: '22px' }}>
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                        <a href="https://www.instagram.com/" style={{ color: 'white', fontSize: '22px' }}>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/" style={{ color: 'white', fontSize: '22px' }}>
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://x.com/" style={{ color: 'white', fontSize: '22px' }}>
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://web.whatsapp.com/" style={{ color: 'white', fontSize: '22px' }}>
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                        <div>

                        </div>

                    </div>
                 

                    {/* Col 2 - Quick Links */}
                    <div className="col-md-3 mb-4">
                        <h3 style={{ color: '#FCE4EC', fontWeight: 'bold' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About', path: '/about' },
                                { name: 'Rescue', path: '/rescue' },
                                { name: 'Adopt a Pet', path: '/adopt' },
                                { name: 'Donate', path: '/donate' },
                                { name: 'Animal Guide', path: '/guide' },
                                { name: 'Services', path: '/services' },
                            ].map((link) => (
                                <li key={link.name} style={{ marginBottom: '8px' }}>
                                    <Link to={link.path} style={footerLink}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 - Services */}
                    <div className="col-md-3 mb-4">
                        <h3 style={{ color: '#FCE4EC', fontWeight: 'bold' }}>Our Services</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                'Emergency Help',
                                'Rescue Center',
                                'Vet Support',
                                'Animal Care Guide',
                                'Pet Adoption',
                                'Donation',
                            ].map((service) => (
                                <li key={service} style={{ marginBottom: '8px' }}>
                                    <Link to="#" style={footerLink}>{service}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 - Contact */}
                    <div className="col-md-3 mb-4">
                        <h3 style={{ color: '#FCE4EC', fontWeight: 'bold' }}>Contact Us</h3>
                        <p><strong>Address:</strong><br />
                            123 Pet Street, Vadodara, Gujarat, India
                        </p>
                        <p>
                            House No 16, Near State Bank Of India,
                            Sultanpur, New Delhi, 110030
                        </p>
                        <p><strong> Call:</strong><br />
                            +91 9315982650
                        </p>
                        <p><strong> Email:</strong><br />
                            anilife@gmail.com
                        </p>
                    </div>

                </div>

                {/* Bottom */}
                <hr style={{ borderColor: '#B03451' }} />
                <div className="text-center py-2">
                    <p style={{ margin: 0, fontSize: '20px' }}>
                        © 2024 AniLife Connect. All rights reserved. Made with  for animals.
                    </p>
                </div>
            </div>
        </footer>
    )
}

const footerLink = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px'
}

const socialBtn = {
    fontSize: '30px',
    marginRight: '10px',
    cursor: 'pointer'
}


// import React from "react";

// const Footer = () => {
//   return (
//     <footer style={styles.footer}>
//       <div style={styles.container}>
//         <div style={styles.grid}>

//           {/* Col 1 - Emergency / Vet Info + Social Media */}
//           <div style={styles.col}>
//             <h3 style={styles.heading}>Emergency / Vet Info</h3>
//             <ul style={styles.list}>
//               <li style={styles.listItem}>
//                 For Emergency call:
//                 <br />
//                 <span style={styles.highlight}>
//                   1962 / (0) 98201 22602 / +91 9315982650
//                 </span>
//               </li>
//               <li style={styles.listItem}>
//                 Find nearest vet:{" "}
//                 <a href="#" style={styles.link}>
//                   vetcontact
//                 </a>
//               </li>
//             </ul>

//             <h3 style={styles.heading}>Social Media</h3>
//             <div style={styles.socialRow}>
//               <a href="#" style={styles.socialLink}>
//                 <img src="img/email.png" alt="Email" height="35px" />
//               </a>
//               <a href="#" style={styles.socialLink}>
//                 <img src="img/instagram.png" alt="Instagram" height="35px" />
//               </a>
//               <a href="#" style={styles.socialLink}>
//                 <img src="img/facebook.png" alt="Facebook" height="35px" />
//               </a>
//               <a href="#" style={styles.socialLink}>
//                 <img src="img/social-media.png" alt="Social" height="35px" />
//               </a>
//             </div>
//             <p style={styles.socialText}>
//               Connect with us on social media for updates, adoptions, and care
//               tips
//             </p>
//           </div>

//           {/* Col 2 - Quick Links */}
//           <div style={styles.col}>
//             <h3 style={styles.heading}>Quick Links</h3>
//             <ul style={styles.list}>
//               {["Home", "About", "Rescue", "Adopt a Pet", "Donate for Animals", "Animal Guide", "Services"].map(
//                 (item) => (
//                   <li key={item} style={styles.listItem}>
//                     <a href="#" style={styles.link}>
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Col 3 - Our Services */}
//           <div style={styles.col}>
//             <h3 style={styles.heading}>Our Services</h3>
//             <ul style={styles.list}>
//               {["Emergency Help", "Rescue Center", "Vet Support", "Animal Care Guide", "Pet Adoption", "Donation"].map(
//                 (item) => (
//                   <li key={item} style={styles.listItem}>
//                     <a href="#" style={styles.link}>
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Col 4 - Contact Us */}
//           <div style={styles.col}>
//             <h3 style={styles.heading}>Contact Us</h3>
//             <ul style={styles.list}>
//               <li style={styles.listItem}>
//                 <strong>Address:</strong>
//                 <p style={styles.address}>
//                   123 Pet Street, Vadodara, Gujarat, India
//                 </p>
//                 <p style={styles.address}>
//                   House No 16, Upper Ground Floor, Near State Bank Of India,
//                   Sultanpur, New Delhi, 110030
//                 </p>
//               </li>
//               <li style={styles.listItem}>
//                 <strong>Call:</strong>
//                 <p style={styles.address}>+91 9315982650</p>
//               </li>
//             </ul>
//           </div>

//         </div>

//         {/* Bottom copyright */}
//         <div style={styles.copyright}>
//           <p>
//             &copy; 2024 AniLife Connect. All rights reserved. Made with ❤️ for
//             animals.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const styles = {
//   footer: {
//     backgroundColor: "#B03451",
//     color: "white",
//     marginTop: "30px",
//   },
//   container: {
//     maxWidth: "1200px",
//     margin: "30px",
//     padding: "10px ",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "30px",
//   },
// //   col: {
// //     display: "flex",
// //     flexDirection: "column",
// //   },
//   heading: {
//     fontSize: "18px",
//     fontWeight: "700",
//     marginBottom: "12px",
//     borderBottom: "2px solid #F7A9B8",
//     paddingBottom: "6px",
//     color: "#fff",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//   },
//   listItem: {
//     marginBottom: "8px",
//     fontSize: "14px",
//     lineHeight: "1.6",
//     color: "#fde8ed",
//   },
//   highlight: {
//     color: "#F7A9B8",
//     fontWeight: "600",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     transition: "color 0.2s",
//   },
//   socialRow: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "10px",
//     flexWrap: "wrap",
//   },
//   socialLink: {
//     display: "inline-block",
//     transition: "transform 0.2s",
//   },
//   socialText: {
//     fontSize: "13px",
//     color: "#fde8ed",
//     marginTop: "6px",
//   },
//   address: {
//     fontSize: "13px",
//     color: "#fde8ed",
//     margin: "4px 0",
//   },
//   copyright: {
//     textAlign: "center",
//     borderTop: "1px solid #d4556e",
//     paddingTop: "16px",
//     marginTop: "30px",
//     fontSize: "14px",
//     color: "#fde8ed",
//   },
// };

// export default Footer;