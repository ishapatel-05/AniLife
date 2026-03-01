import Navbar from '../component/navbar' 
import Footer from '../component/footer' 

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1 className="text-center mt-5">Welcome to AniLife! </h1>
            <Footer />
        </div>
    )
}