import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { AddAdmin } from "./AddAdmin/AddAdmin";
import { AddProduct } from "./AddProduct/AddProduct";
import { DashboardPage } from "./Dashboard/DashboardPage";
import { StockControlPage } from "./StockControl/StockControlPage";
import { AdminTable } from "./AddAdmin/AdminTable";

export function AdminPage() {
  return (
    <HeaderTemplate>
      <div>
        <Tabs>
          <TabList>
            <Tab color={"#000"}>NPS</Tab>
            <Tab color={"#000"}>Stock</Tab>
            <Tab color={"#000"} isDisabled>
              Products
            </Tab>
            <Tab color={"#000"}>Add product</Tab>
            <Tab color={"#000"}>Add admin</Tab>
            <Tab color={"#000"}>Users list</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DashboardPage />
            </TabPanel>
            <TabPanel>
              <StockControlPage />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <AddProduct />
            </TabPanel>
            <TabPanel>
              <AddAdmin />
            </TabPanel>
            <TabPanel>
              <AdminTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </HeaderTemplate>
  );
}
