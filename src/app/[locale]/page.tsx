import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { Rooms } from '@/components/Rooms';
import { Booking } from '@/components/Booking';
import { Dining } from '@/components/Dining';
import { DroneVideo } from '@/components/DroneVideo';
import { Contact } from '@/components/Contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <Rooms />
      <Booking />
      <DroneVideo />
      <Dining />
      <Contact />
    </>
  );
}
