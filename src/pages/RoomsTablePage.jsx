import React from "react";
import MainLayout from "../components/MainLayout";
import RoomTableData from "../components/RoomTable";
import "../sass/main.scss";

const RoomsTablePage = () => {
  return (
    <MainLayout>
      <RoomTableData />
    </MainLayout>
  );
};

export default RoomsTablePage;

/*
  <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
              src={account.image}
            />

            <div className="content-wrapper">
        <div className="filter-items">
          <Button type="primary" htmlType="submit" className="filter-btn">
            Clear all filters
          </Button>
          <Checkbox onChange={onChange}>Free rooms only</Checkbox>
        </div>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            
          </div>
        </Content>
      </div>
  */
