import CookieCounter from "@/components/CookieCounter";
import BiggieCookie from "@/components/BiggieCookie";
import CookieShop from "@/components/CookieShop";

export default function Home() {
	return (
		<main className="flex min-h-screen h-screen flex-row items-center justify-between">
			{/* big cookie */}
			<div className="w-1/2 h-full transition-all flex flex-col justify-start gap-32 py-32 items-center border-r-8 border-black">
				<div className="w-full flex flex-col justify-center items-center gap-2">
          <p className="text-white text-opacity-75 bg-black bg-opacity-50 px-2 py-0.5 rounded-xl text-4xl">Ryan&apos;s bakery</p>
          <CookieCounter />
        </div>
				<BiggieCookie />
			</div>

			{/* shop */}
			
			<div className="w-1/2 h-full transition-all flex flex-col justify-start items-center overflow-y-scroll">
        <h1 className="w-full py-2 text-4xl font-bold text-center text-white bg-black bg-opacity-50 backdrop-blur">Shop</h1>
          <CookieShop />
			</div>
		</main>
	);
}
