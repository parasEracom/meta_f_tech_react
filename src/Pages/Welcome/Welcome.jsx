import React, { useEffect, useState } from "react";
import "./Welcome.css";
import User from "./../../Images/user.png";
import { ApiPaths } from "../../Config/ApiPath";
import useAxiosHelper from "./../../Common/AxiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { setUserPersonalInfo } from "./../../Redux/ProfileDataSlice";

function Welcome() {
  const dispatch = useDispatch();
  const { AxiosGet, AxiosPost } = useAxiosHelper();

  const profileData = useSelector(
    (state) => state.profileData?.userPersonalInfo
  );

  var x = 0;
  useEffect(() => {
    if (x === 0) {
      FetchData();
      x++;
    }
  }, []);

  const FetchData = async () => {
    try {
      const res1 = await AxiosGet(ApiPaths.getProfile);

      console.log("Response of profile data", res1);

      if (res1) {
        dispatch(setUserPersonalInfo(res1));
      } else console.log("Error in fetching profile data");
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="welcome_letter_page detail">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="welcome_letter_design">
                <div className="welcome_data_letter">
                  <div className="welcome_letter_detail">
                    <h2>Welcome Letter</h2>
                  </div>
                  <div className="welcome_letter_detail_personal">
                    <ul>
                      <li>
                        Email: <b>{profileData?.email}</b>
                      </li>
                      <li>
                        Purchase Date: <b>2/20/2024</b>
                      </li>
                      <li>
                        Purchase Amount: <b>0</b>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="welcome_letter_content">
                  <strong>
                    A Warm Welcome to Meta F - Your Journey Begins!
                  </strong>
                  <br />
                  <br />

                  <div>
                    <strong>Dear {profileData?.name},</strong>
                    <p>
                      Congratulations on taking the first step towards an
                      exciting journey with Meta F ! We are thrilled to welcome
                      you aboard and are looking forward to the valuable
                      contributions we know you'll make to our team.
                    </p>
                    <p>
                      Your decision to join Meta F marks the beginning of a
                      remarkable adventure, and we are confident that your
                      skills and expertise will play a crucial role in our
                      shared success. We appreciate your commitment and
                      enthusiasm for becoming a part of our growing family.
                    </p>
                    <p>
                      Your decision to join Meta F marks the beginning of a
                      remarkable adventure, and we are confident that your
                      skills and expertise will play a crucial role in our
                      shared success. We appreciate your commitment and
                      enthusiasm for becoming a part of our growing family.
                    </p>
                    <p>
                      As you prepare for your joining date, we want to ensure a
                      smooth transition and a positive start to your Epic World
                      experience. To assist you in this process, please take
                      some time to plan your orientation with the company. This
                      will involve familiarizing yourself with our values,
                      goals, and work culture.
                    </p>
                    <p>
                      Setting initial work goals is another key aspect of your
                      integration into the company. We believe that having clear
                      objectives from the outset will help you feel immediately
                      productive in your new role and contribute to your
                      professional growth within Meta F .
                    </p>
                    <p>
                      It's important to note that we view your journey with Sky
                      One World as a partnership. Your success is our success,
                      and we encourage you to actively engage in developing your
                      business. The opportunity to earn is in your hands, and it
                      directly correlates with the effort and dedication you
                      invest in your role.
                    </p>
                    <p>
                      If you have any questions or need assistance before your
                      joining date, please don't hesitate to reach out. You can
                      call us anytime or send an email if that is more
                      convenient for you. We are here to support you and ensure
                      that your onboarding process is as seamless as possible.
                    </p>
                    <p>
                      Once again, welcome to the Meta F team! We believe that
                      the secret of success lies in constancy to purpose, and we
                      are excited to embark on this journey with you. Here's to
                      your success and our collective achievements!
                    </p>
                    <p>All the best, and see you at the top!</p>
                    <p></p>
                    <p>Warm regards,</p>
                  </div>
                </div>
                <div className="welcome_letter_profile">
                  <div className="welcome_letter_image">
                    <img src={User} alt="" />
                  </div>
                  <div className="welcome_letter_info">
                    <h4>User</h4>
                    <p>Meta F </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
