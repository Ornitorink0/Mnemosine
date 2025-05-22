import { Loader } from "@/components/ui/self/loader";

export default function Loading() {
  return (
    <div className="bg-black/70 z-50 fixed inset-0 flex items-center justify-center">
      <Loader className="w-10 h-10" />
    </div>
  );
}
