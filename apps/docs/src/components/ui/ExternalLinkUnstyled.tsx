import Link from 'next/link';

type ExternalLinkUnstyledProps = {
  readonly className: string;
  readonly href: string;
  readonly children: React.ReactNode;
};

export function ExternalLinkUnstyled({
  className,
  href,
  children,
}: ExternalLinkUnstyledProps) {
  return (
    <Link className={className} href={href} target='_blank' rel='noreferrer'>
      {children}
    </Link>
  );
}
