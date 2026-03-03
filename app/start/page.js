import GlobalNav from '../components/GlobalNav';
import RoomConfigurator from '../components/RoomConfigurator';

export const metadata = {
  title: 'Start Your Journey | Luxury by Sam',
  description: 'Find the perfect fitted furniture solution for your space with our interactive configurator.',
};

export default function StartPage() {
  return (
    <main className="min-h-screen relative bg-secondary/30 pt-32 pb-24 font-sans text-foreground">
      <div className="grain-overlay" />
      <GlobalNav />
      {/* 
        The RoomConfigurator component handles its own internal layout,
        we just drop it in here on its dedicated page.
      */}
      <RoomConfigurator />
    </main>
  );
}
