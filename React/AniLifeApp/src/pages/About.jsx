import Navbar from '../component/navbar'
import Footer from '../component/footer'

export default function About() {
    return (
        <div style={{ background: "#faeef0", minHeight: "100vh" }}>
            <Navbar />

            {/* Banner */}
            <div style={{
                background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                margin: "10px",
                padding: "60px 20px",
                textAlign: "center",
                color: "white",
                borderRadius: "15px"
            }}>
                <h1 style={{ fontWeight: "bold" }}>AniLife Connect</h1>
                <h5>One Platform. Endless Care</h5>
            </div>

            {/* Who We Are */}
            <div className="container mt-5">
                <div className="card shadow text-center p-4 mb-4"
                    style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                    <h2 style={{ color: "#C2185B" }}> Who We Are</h2>
                    <p className="text-muted">
                        AniLife Connect is a platform created to support animal welfare by
                        connecting people with animal rescue services, veterinary care, and
                        pet adoption in one place. We aim to provide a simple and reliable
                        way for users to help animals in need. Our platform is designed to
                        make animal care easy, fast, and accessible for everyone.
                    </p>
                </div>

                {/* What We Do */}
                <div className="card shadow text-center p-4 mb-4"
                    style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                    <h2 style={{ color: "#C2185B" }}> What We Do</h2>
                    <p className="text-muted">We provide a digital platform where users can:</p>
                    <div className="row mt-3">
                        {[
                            {text: "Adopt animals safely and responsibly" },
                            {text: "Report injured or abandoned animals" },
                            {text: "Get emergency rescue help" },
                            {text: "Find nearby veterinary services" },
                            {text: "Learn animal care through guides" },
                        ].map((item, i) => (
                            <div key={i} className="col-md-4 mb-3">
                                <div className="card p-3 h-100"
                                    style={{ borderRadius: "12px", background: "#fff5f7" }}>
                                    <h3>{item.icon}</h3>
                                    <p className="text-muted mb-0">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why We Do That */}
                <div className="card shadow text-center p-4 mb-4"
                    style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                    <h2 style={{ color: "#C2185B" }}> Why We Do That</h2>
                    <p className="text-muted">
                        Many animals suffer due to lack of awareness, delayed medical help,
                        or no proper support system. AniLife Connect aims to bridge this gap
                        by bringing animal lovers, rescue teams, and veterinarians together
                        on one platform.
                    </p>
                </div>

                {/* Our Mission */}
                <div className="card shadow text-center p-4 mb-5"
                    style={{ borderRadius: "15px", borderTop: "4px solid #E91E8C" }}>
                    <h2 style={{ color: "#C2185B" }}> Our Mission</h2>
                    <p className="text-muted">
                        To protect animals by providing timely rescue, medical support,
                        and responsible adoption. To create a safer and kinder world where
                        every animal receives care, respect, and love.
                    </p>
                    <p className="text-muted">
                        At AniLife Connect, we believe every animal deserves a chance to
                        live a healthy and happy life. Together, we can make a difference.
                    </p>
                    <div style={{
                        background: "linear-gradient(135deg, #E91E8C, #C2185B)",
                        color: "white",
                        padding: "15px 30px",
                        borderRadius: "25px",
                        display: "inline-block",
                        marginTop: "10px"
                    }}>
                        Every Animal Deserves Love & Care!
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}