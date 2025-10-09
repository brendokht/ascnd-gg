import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/5 flex flex-col gap-4 p-8 shadow md:pt-8">
      <h1 className="text-xl font-semibold">Ascnd GG</h1>
      <div className="flex flex-col gap-4 text-sm md:flex-row">
        <Link href="/">Home</Link>
        <Link href="#">Settings</Link>
        <Link href="#">Help</Link>
        <Link href="#">Contact</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms and Conditions</Link>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">
          Copyright &copy; 2025 Ascnd GG
        </p>
      </div>
    </footer>
  );
}
