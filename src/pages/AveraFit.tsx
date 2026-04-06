import FitNavbar from "@/components/averafit/FitNavbar";
import FitHeroSection from "@/components/averafit/FitHeroSection";
import FitSportsSection from "@/components/averafit/FitSportsSection";
import FitProblemsSection from "@/components/averafit/FitProblemsSection";
import FitFeaturesSection from "@/components/averafit/FitFeaturesSection";
import FitSystemPreviewSection from "@/components/averafit/FitSystemPreviewSection";
import FitHowItWorksSection from "@/components/averafit/FitHowItWorksSection";
import FitPricingSection from "@/components/averafit/FitPricingSection";
import FitTestimonialsSection from "@/components/averafit/FitTestimonialsSection";
import FitStatsSection from "@/components/averafit/FitStatsSection";
import FitCtaSection from "@/components/averafit/FitCtaSection";
import FitFooter from "@/components/averafit/FitFooter";

const AveraFit = () => {
  return (
    <div className="min-h-screen">
      <FitNavbar />
      <FitHeroSection />
      <FitSportsSection />
      <FitProblemsSection />
      <FitFeaturesSection />
      <FitSystemPreviewSection />
      <FitHowItWorksSection />
      <FitStatsSection />
      <FitPricingSection />
      <FitTestimonialsSection />
      <FitCtaSection />
      <FitFooter />
    </div>
  );
};

export default AveraFit;
