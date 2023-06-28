import {
  Barcode,
  Cake,
  Envelope,
  IdentificationBadge,
  Phone,
} from "phosphor-react";
import { Person } from "../../interfaces/PersonInterface";

interface UserInfoProps {
  user: Person;
}

export function UserInfo(props: UserInfoProps) {
  return (
    <div className="flex flex-col ">
      <strong className="text-2xl">My account</strong>

      <span className="text-lg flex items-center mt-4">
        <IdentificationBadge className="mr-2" />
        Name: {props.user.firstName + " " + props.user.lastName}
      </span>
      <span className="text-lg flex items-center mt-4">
        <Cake className="mr-2" /> Birthday: {props.user.dateBirth}
      </span>
      <span className="text-lg flex items-center mt-4">
        <Envelope className="mr-2" />
        Email: {props.user.email}
      </span>
      <span className="text-lg flex items-center mt-4">
        <Barcode className="mr-2" />
        CPF: {props.user.cpf}
      </span>
      <span className="text-lg flex items-center mt-4">
        <Phone className="mr-2" />
        Phone: {props.user.phone}
      </span>
    </div>
  );
}
