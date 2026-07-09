import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';

type ButtonLinkProps = ButtonProps & {
  href: string;
};

export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{props.children}</Link>
    </Button>
  );
}
