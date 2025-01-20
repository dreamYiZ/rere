// pages/index.js
import FileUpload from "@/components/FileUpload";
import Timeline from "@/components/Timeline";
import VideoEditor from "@/components/VideoEditor";
import DebugPanel from "@/components/DebugPanel";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <VideoEditor />
      <Timeline />
      <FileUpload />
      <DebugPanel />
    </div>
  );
}
