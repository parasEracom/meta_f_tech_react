import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./TermsCondition.css";
import { ApiPaths } from "../../Config/ApiPath";
import useAxiosHelper from "../../Common/AxiosHelper";

const TermsCondition = () => {
  const [companyData, setCompanyData] = useState([])
  useEffect(() => {
    CompanyInfo();

  }, []);
  async function CompanyInfo() {
    try {
      const data = localStorage.getItem("companyData");
      // console.log(JSON.parse(data));
      setCompanyData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container style={{ borderRadius: "30px" }}>
        <div className="termsContainerContent">
          <div className="termsContent">
            <h2>Terms and Conditions</h2>
            <ul>
              <li>
                There are no registration fees to become a business
                associate.Anyone can become a business associate just on sponsor
                of a paid users of company product besides him, but it is
                essential for him/her to be user {companyData?.companyName} product.All the
                benefits of the marketing Plan will go to the business associate
                according to plan.
              </li>
              <li>
                The business associate can display {companyData?.companyName} Name and/or
                logo as designed by the company for printing his/her personal
                stationary, but only with the company's prior written
                permission. The associate shall not use the trademark patent or
                any other intellectual property of the company for a purpose
                other than that of promoting its business.
              </li>
              <li>
                After becoming a business associate, anyone cannot work with
                other establishment engaged in a similar nature of work and/or
                with the similar working plan and product range.
              </li>
              <li>
                If observed, that the Business associate of {companyData?.companyName} is
                enrolled with another establishment engaged in similar nature of
                work and/or with a similar working plan and product range,
                his/her enrollment with {companyData?.companyName} will be terminated, and
                he/she shall be held responsible for making losses and for the
                consequences sustained by other business associate and/or {companyData?.companyName}
                Recovery will be made from business associate.
              </li>
              <li>
                Upon death of business associate, the rights and
                responsibilities of the business associate will be passed on to
                the rightful nominee or legal heir as per the law. The nominee
                or legal heir shall be bound by the original terms and
                conditions.
              </li>
              <li>
                {companyData?.companyName} reserves the right to make any amendments in the
                terms and conditions/marketing plan found necessary by it at any
                time after the Terms &Conditions has been signed or acceptance
                and the business associate shall abide by such amendments. No
                prior notice will be sent to any person for any new amendment.
                Keeping the company's website continuously for latest
                update/information, this is the responsibility of the business
                associate.
              </li>
              <li>
                The company/organization may terminate a business associate
                without any prior notice according to these conditions:
                <ol type="A">
                  <li>
                    If the business associate concerned represents any
                    establishment engaged in a similar nature of business and/or
                    with a similar working plan and product range.
                  </li>
                  <li>
                    If the business associate concerned acts against the
                    interest of {companyData?.companyName} in any way.
                  </li>
                  <li>
                    If any statement or information in the application is found
                    to be false or misleading.
                  </li>
                  <li>
                    If the business associate concerned uses premises/venue
                    concerned with {companyData?.companyName} to represent any other
                    establishment.
                  </li>
                  <li>
                    If the business associate concerned misguides any client or
                    any other business associate of {companyData?.companyName}
                  </li>
                  <li>
                    If a business associate will not activate his account within
                    24hours, after receiving payment/proposal from any client.
                  </li>
                  <li>
                    If a business associate misuse the record/funds of {companyData?.companyName} in any manner.
                  </li>
                  <li>
                    If a business associate is found guilty of any type of
                    character.
                  </li>
                </ol>
              </li>
              <li>
                Any dispute arising out of or in relation to this agreement
                shall be referred to a single arbitrator to be appointed by {companyData?.companyName} business associate shall not raise any
                objection on the ground the arbitrator. So appointed is person
                employed in or having connection with {companyData?.companyName} .
              </li>
              <li>
                The right of a terminated business associate to receive
                commission (in whatever form) from {companyData?.companyName}
                ceases/cancelled immediately with effect from the date of
                termination.
              </li>
              <li>
                In case of any difference of opinion, the decision of {companyData?.companyName} shall be final.
              </li>
              <li>
                {companyData?.companyName} reserves the right to rename or transfer a
                business associate.
              </li>
              <li>
                All right reserved to accept/reject the proposal/application to
                be a business associate with sole discretion of {companyData?.companyName}.
              </li>
            </ul>
            <p className="termsText">
              All disputes shall be subject to the legal Jurisdiction only.
            </p>
            <h4>Declaration</h4>
            <p>
              Hereby declared that I accept and agree to all the terms and
              conditions of <span>{companyData?.companyName} </span> after studying your
              website <span>{companyData?.contactInfo?.website}</span> and discussion with your business
              associates.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermsCondition;
