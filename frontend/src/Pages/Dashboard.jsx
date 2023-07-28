import React, { useEffect, useState } from "react";
import { Row, Col, Card, Progress, Tooltip, Avatar } from "antd";
import axios from "axios";
const myStyle = {
  cardTxtContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
};

const CardComp = ({
  title,
  totalNo,
  onetxt,
  twotxt,
  threetxt,
  sno1,
  sno2,
  sno3,
  sno4,
  sno5,
  sno6,
}) => {
  return (
    <Card className="dashboardCard">
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">{title}</span>
        <span>{totalNo}</span>
      </div>
      <div style={{ margin: "15px 0" }}>
        <Progress
          showInfo={false}
          percent={100}
          success={{
            percent: 60,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: "#52c41a",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          {onetxt}
        </div>
        <div>
          {sno1} {sno2}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              backgroundColor: "#1677ff",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          {twotxt}
        </div>
        <div>
          {sno3} {sno4}
        </div>
      </div>
      {threetxt != "" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#1FBCDE",
                verticalAlign: "middle",
                width: "12px",
                height: "12px",
                marginRight: "5px",
              }}
              size="small"
            />
            {threetxt}
          </div>
          <div>
            {sno5} {sno6}
          </div>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export const Dashboard = () => {
  useEffect(() => {
    getAllInternEmployee();
    getAllpermanetEmployee();
    getHiredCandidate();
    getJobPositions();
    getAllEmployee();
    getHiredCandidatePercentage();
    totalItemQuantity();
    getAssignedItemWithPercentage();
  }, []);
  const [EmployeeCount, setEmployeeCount] = useState("0");
  const [InterEmployee, setInterEmployee] = useState("0");
  const [PermanentEmployee, setPermanentEmployee] = useState("0");
  const [PermanentEmpPer, setPermanentEmpPer] = useState("0");
  const [InterEmpPer, setInterEmpPer] = useState("0");
  const [JobPositions, setJobPositions] = useState("0");
  const [hiredCandidate, sethiredCandidate] = useState("0");
  const [hiredCandidatePer, sethiredCandidatePer] = useState("0");
  const [TotalItem, setTotalItem] = useState("0");
  const [AssignedItem, setAssignedItem] = useState("0");
  const [AssignedItemPer, setAssignedItemPer] = useState("0");
  const [TotalAvailableItem, setTotalAvailableItem] = useState("0");
  const [totalAvailableItemPer, settotalAvailableItemPer] = useState("0");
  const [TotalLossDamageItem, setTotalLossDamageItem] = useState("0");
  const [totalLossDamageItemPer, settotalLossDamageItemPer] = useState("0");
  const getAllEmployee = () => {
    axios
      .get("http://localhost:5000/getAllEmployeedata")
      .then((result) => {
        let data = result.data;
        setEmployeeCount(data);
        setInterEmployee(1);
        setPermanentEmployee(1);
        let PermanentEmpPer = (1 / 2) * 100 + "%";
        let InterEmpPer = (1 / 2) * 100 + "%";
        setPermanentEmpPer(PermanentEmpPer);
        setInterEmpPer(InterEmpPer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllpermanetEmployee = () => {
    axios
      .get("http://localhost:5000/getAllPermanentEmployeedata")
      .then((result) => {
        let data = result.data;
        setPermanentEmployee(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllInternEmployee = () => {
    axios
      .get("http://localhost:5000/getAllInternEmployeedata")
      .then((result) => {
        let data = result.data;
        setInterEmployee(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHiredCandidate = () => {
    axios
      .get("http://localhost:5000/getHiredCandidatecount")
      .then((result) => {
        let data = result.data;
        sethiredCandidate(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobPositions = () => {
    axios
      .get("http://localhost:5000/getJobPositions")
      .then((result) => {
        let data = result.data;
        setJobPositions(data);
        sethiredCandidatePer(hiredCandidatePer);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHiredCandidatePercentage = () => {
    axios
      .get("http://localhost:5000/getHiredCandidatePercentage")
      .then((result) => {
        let data = result.data;
        sethiredCandidatePer(data + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalItemQuantity = () => {
    axios
      .get("http://localhost:5000/totalItemQuantity")
      .then((result) => {
        let data = result.data;
        setTotalItem(data.totalQuantity);
        setTotalAvailableItem(data.totalAvailableQuantity);
        settotalAvailableItemPer(data.totalAvailableItemPer + "%");
        setTotalLossDamageItem(data.TotalLossAndDamageQuantity);
        settotalLossDamageItemPer(data.totalLossDamageItemPer + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAssignedItemWithPercentage = () => {
    axios
      .get("http://localhost:5000/getAssignedItemWithPercentage")
      .then((result) => {
        let data = result.data;
        setAssignedItem(data.totalAssignedQuantity);
        setAssignedItemPer(data.assignedPercentage + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Row>
        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Total No of employees"
            totalNo={EmployeeCount}
            onetxt="Permanent"
            twotxt="Intern"
            threetxt=""
            sno1={PermanentEmployee}
            sno2={PermanentEmpPer}
            sno3={InterEmployee}
            sno4={InterEmpPer}
          />
        </Col>
        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Job positions this month"
            totalNo={JobPositions}
            onetxt="Hired"
            twotxt="Opening"
            threetxt=""
            sno1={hiredCandidate}
            sno2={hiredCandidatePer}
            sno3={JobPositions}
            sno4="100%"
          />
        </Col>

        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Total items in inventory"
            totalNo={TotalItem}
            onetxt="Assigned"
            twotxt="Available"
            threetxt="Loss/Damage"
            sno1={AssignedItem}
            sno2={AssignedItemPer}
            sno3={TotalAvailableItem}
            sno4={totalAvailableItemPer}
            sno5={TotalLossDamageItem}
            sno6={totalLossDamageItemPer}
          />
        </Col>

        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Client Accounts"
            totalNo="60"
            onetxt="New Client"
            twotxt="Old Clients"
            threetxt="Total Clients"
            sno1="40"
            sno2="60%"
            sno3="40"
            sno4="60%"
          />
        </Col>
      </Row>
    </div>
  );
};
