import {
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  ChartLine,
  Fire,
  MagnifyingGlass,
  ShoppingCart,
  UserCircle,
  X,
} from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import { UserCart } from "./UserCart";
import { useAuth } from "../../context/AuthContext";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { auth, logout } = useAuth();

  return (
    <div className="fixed flex w-full bg-black shadow-md shadow-zinc-900 h-20 justify-between items-center z-10">
      <div className="flex">
        <Link to="/shoes">
          <strong className="ml-28 transition-all cursor-pointer text-white text-lg hover:opacity-70">
            SHOES
          </strong>
        </Link>
        <strong className="ml-4 transition-all cursor-pointer text-white text-lg hover:opacity-70">
          ACCESSORIES
        </strong>
      </div>
      <div>
        <Link to="/">
          <strong className="text-white font-extrabold text-4xl flex items-center justify-center">
            SNKR SHOP
            <Fire size={48} className="ml-4" />
          </strong>
        </Link>
      </div>
      <div>
        <div className="flex">
          <MagnifyingGlass
            size={36}
            className="mr-8 text-white cursor-pointer hover:opacity-80 transition-al rounded-full h-8 w-8"
          />

          {auth.isAuthenticated ? (
            <Menu>
              <MenuButton>
                <UserCircle
                  size={36}
                  className="mr-8 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8"
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/authenticate">
              <UserCircle
                size={36}
                className="mr-8 text-white cursor-pointer  hover:opacity-80 transition-all rounded-full h-8 w-8"
              />
            </Link>
          )}

          <ShoppingCart
            className="mr-8 cursor-pointer text-white hover:opacity-80 transition-all rounded-full h-8 w-8"
            onClick={onOpen}
          />

          <Link to="/admin">
            <ChartLine
              size={36}
              className="mr-20 text-white cursor-pointer  hover:opacity-80 transition-all rounded-full h-8 w-8"
            />
          </Link>

          <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
            <UserCart onCloseCart={onClose} />
          </Drawer>
        </div>
      </div>
    </div>
  );
}
