import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import LogoWO from "../../assets/images/data-gathering.png";
import LogoUser from "../../assets/images/user.png";
import LogoDepartement from "../../assets/images/department.png";
import LogoGroup from "../../assets/images/youth.png";
import "./cardDashboard.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CardDashboard() {
  const [getAllWO, setGetAllWO] = useState(null);
  const [getAllUser, setGetAllUser] = useState(null);
  const [getAllDepartement, setGetAllDepartement] = useState(null);
  const [getAllGroup, setGetAllGroup] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { getAllWO, getAllUser, getAllDepartement, getAllGroup } =
        localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth"))
          : {};

      setGetAllWO(getAllWO);
      setGetAllUser(getAllUser);
      setGetAllDepartement(getAllDepartement);
      setGetAllGroup(getAllGroup);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="small-box bg-success rounded-3">
            <div className="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllWO}</h3>
                <p className="label text-white">Work Order</p>
              </div>
              <img src={LogoWO} alt="Work Order Logo" className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link
                  to="/work-order-page"
                  className="text-white text-decoration-none"
                >
                  More info <BsFillArrowRightCircleFill />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="small-box bg-info rounded-3">
            <div className="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllUser}</h3>
                <p className="label text-white">User</p>
              </div>
              <img src={LogoUser} alt="User Logo" className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link
                  to="/user-page"
                  className="text-white text-decoration-none"
                >
                  More info <BsFillArrowRightCircleFill />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="small-box bg-danger rounded-3">
            <div className="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllDepartement}</h3>
                <p className="label text-white">Departement</p>
              </div>
              <img
                src={LogoDepartement}
                alt="Department Logo"
                className="icon-wo"
              />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link
                  to="/departement-page"
                  className="text-white text-decoration-none"
                >
                  More info <BsFillArrowRightCircleFill />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="small-box bg-secondary rounded-3">
            <div className="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllGroup}</h3>
                <p className="label text-white">Group</p>
              </div>
              <img src={LogoGroup} alt="Group Logo" className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link
                  to="/group-page"
                  className="text-white text-decoration-none"
                >
                  More info <BsFillArrowRightCircleFill />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;
