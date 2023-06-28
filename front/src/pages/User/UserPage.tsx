import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { useEffect, useState } from "react";
import { SaleInterface } from "../../interfaces/SaleInterface";
import { UserInfo } from "./UserInfo";
import { MyShopping } from "./MyShopping";
import { getPerson } from "../../api/person/person.service";
import { Person } from "../../interfaces/PersonInterface";
import { getSalesByUser } from "../../api/product/product.service";

export function UserPage(): JSX.Element {
  const [sales, setSales] = useState<SaleInterface[]>([]);
  const [user, setUser] = useState<Person | undefined>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async (): Promise<void> => {
    getPerson(localStorage.getItem("userId")!).then((data) => {
      setUser(data);
      if (data) {
        getSalesByUser(data.id).then((salesData) => {
          const sortedSales = salesData.sales.sort((a: any, b: any) => {
            const dateA = new Date(a.data).getTime();
            const dateB = new Date(b.data).getTime();
            return dateB - dateA;
          });
          setSales(sortedSales);
        });
      }
    });
  };

  return (
    <HeaderTemplate>
      <div className="w-full flex items-center justify-center">
        <div className="h-full text-black flex p-4 w-[65%]">
          <div className="flex w-full">
            <div className="w-3/5 bg-blue h-full">
              {user && <UserInfo user={user} />}
            </div>
            <div className="w-2/5 h-full">
              <span className="text-lg font-bold">My shoppings:</span>
              {sales.map((sale) => (
                <div key={sale.id}>
                  <MyShopping sale={sale} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
