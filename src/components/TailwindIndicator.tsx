export default function TailwindIndicator() {
  return (
    <p className="fixed z-10 grid rounded-full bg-foreground text-background size-10 left-10 bottom-10 place-items-center">
      <span className="hidden 2xl:block">2 XL</span>
      <span className="hidden xl:block 2xl:hidden ">XL</span>
      <span className="hidden lg:block xl:hidden ">LG</span>
      <span className="hidden md:block lg:hidden ">MD</span>
      <span className="hidden sm:block md:hidden">SM</span>
      <span className="block sm:hidden ">XS</span>
    </p>
  );
}
