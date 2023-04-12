import courtPurple from "../../assets/court_purple.jpg";

interface ShoeCardProps {
  name: string;
  id: string;
}

export function ShoeCard(props: ShoeCardProps) {
  return (
    <div className="rounded-2xl shadow-md shadow-zinc-500 bg-[#f8f8f8] h-[270px] hover:scale-[101%] cursor-pointer transition-all">
      <img src={courtPurple} alt="" className="rounded-2xl" />
      <span className="rounded-2xl flex justify-center font-semibold">
        {props.name}
      </span>
    </div>
  );
}
