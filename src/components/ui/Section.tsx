type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-24 md:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
