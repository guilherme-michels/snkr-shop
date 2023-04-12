import { Link } from "react-router-dom";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";

export function FeedbackPage() {
  return (
    <HeaderTemplate>
      <div className="bg-zinc-100 h-full p-20 flex flex-col items-center">
        <Link to="/dashboard">dashboard</Link>
      </div>
    </HeaderTemplate>
  );
}
