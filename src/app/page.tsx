import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <EmailSection />
            </div>
            <Footer />
        </main>
    );
}

