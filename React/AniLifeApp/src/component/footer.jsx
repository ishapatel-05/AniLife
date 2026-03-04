import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{
            // backgroundColor: '#B03451',
            // backgroundColor: '#B0334F',
            background: "linear-gradient(135deg, #E91E8C, #C2185B)",    
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
