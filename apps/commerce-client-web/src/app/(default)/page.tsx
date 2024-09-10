import SliderBanner from '@/app/(default)/(home)/components/slidebanner';

const mockImages = [
  { src: '/mockbannerimage/book1.png', alt: 'Banner 1' },
  { src: '/mockbannerimage/book2.png', alt: 'Banner 2' },
];

export default function Home() {
  return (
    <>
      <SliderBanner images={mockImages} />
    </>
  );
}
