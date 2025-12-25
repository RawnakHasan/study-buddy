import ToDo from "@/components/ToDo";
import TopBar from "@/components/TopBar";

const page = () => {
  return (
    <div className="h-screen flex flex-col justify-evenly gap-4 p-4">
      <TopBar />
      <ToDo />
    </div>
  );
};
export default page;
