import Image from "next/image";
import Link from "next/link";

export default function AppNavigation() {
  return (
    <div className="border-b">
      <div className="container">
        <div className="h-[60px] flex items-center">
          <div className="flex items-center font-semibold mr-4">
            <Image
              src="/occtoo.webp"
              className="mr-2 w-5 h-5"
              alt="logo"
              width={20}
              height={20}
            />
            <Link href="/">Occtoo Demo</Link>
          </div>
          <div className="px-4 text-sm font-semibold">
            <Link href="/products">Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
