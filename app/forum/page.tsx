import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div className="text-center max-w-screen max-h-screen">
      <div className="relative">
        <h1 className="text-[#262626] text-[50vw] font-semibold leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-[#F2F2F2] text-[10vw] xl:text-4xl lg:text-5xl font-semibold p-0">
            Page is under construction
          </h2>
          <p className="text-[#F2F2F2] font-light text-[5vw] xl:text-lg">
            Uncharted terrain ahead
          </p>
        </div>
      </div>
    </div>
  );
}
