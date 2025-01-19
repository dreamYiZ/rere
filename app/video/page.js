// pages/index.js
import FileUpload from "@/components/FileUpload";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Timeline />

      
      <FileUpload />

    </div>
  );
}
