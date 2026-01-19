import BeatsNav from '@/components/BeatsNav';
import BeatsScroll from '@/components/BeatsScroll';
import SmoothScroll from '@/components/SmoothScroll';
import SoundSection from '@/components/SoundSection';
import SpecsSection from '@/components/SpecsSection';
import ShopSection from '@/components/ShopSection';

export default function Home() {
    return (
        <SmoothScroll>
            <main className="relative bg-white">
                <BeatsNav />
                <BeatsScroll />
                <SoundSection />
                <SpecsSection />
                <ShopSection />
            </main>
        </SmoothScroll>
    );
}
