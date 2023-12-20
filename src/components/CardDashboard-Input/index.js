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
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-success rounded-3">
              <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
                <div className="text-center">
                  <h3 className="text-white">{getAllWO}</h3>

                  <p className="text-white">Work Order</p>
                </div>
                <img src={LogoWO} className="icon-wo" />
              </div>
              <div className="justify-content-center d-flex">
                <div className=" text-center mb-2">
                  <Link to="/work-order-page" class="text-white text-decoration-none">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                  <BsFillArrowRightCircleFill />
                </div>
              </div>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-info rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllUser}</h3>

                <p className="text-white">User</p>
              </div>
              <img src={LogoUser} className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link to='/register-page' class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </Link>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-danger rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllDepartement}</h3>

                <p className="text-white">Departement</p>
              </div>
              <img src={LogoDepartement} className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link to='/departement-page' class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </Link>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-secondary rounded-3">
            <div class="mt-3 d-flex justify-content-between mx-4 pt-3">
              <div className="text-center">
                <h3 className="text-white">{getAllGroup}</h3>

                <p className="text-white">Group</p>
              </div>
              <img src={LogoGroup} className="icon-wo" />
            </div>
            <div className="justify-content-center d-flex">
              <div className=" text-center mb-2">
                <Link to='/group-page' class="text-white text-decoration-none">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </Link>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;
