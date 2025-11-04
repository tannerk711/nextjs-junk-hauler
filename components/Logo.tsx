import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const sizeMap = {
  sm: { width: 120, height: 40 },
  md: { width: 180, height: 60 },
  lg: { width: 240, height: 80 },
};

export default function Logo({ variant = 'light', size = 'md', href = '/' }: LogoProps) {
  const dimensions = sizeMap[size];
  const logoSrc = variant === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';

  const logoImage = (
    <Image
      src={logoSrc}
      alt="Junkyard Gentlemen - Professional Junk Removal"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className="transition-opacity hover:opacity-80"
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
