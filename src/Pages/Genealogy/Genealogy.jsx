// import React, { useState, useEffect, useRef } from "react";
// import Tree from "react-d3-tree";
// import "./Genealogy.css";
// import { ApiPaths } from "../../Config/ApiPath";
// import Loader from "./../../Components/Loader/Loader";
// import useAxiosHelper from "./../../Common/AxiosHelper";
// import { BasicInfo } from "../../Config/BasicInfo";

// export default function Genealogy() {
//   const [loading, setLoading] = useState(false);
//   const nodeSize = { x: 200, y: 200 };
//   const treeWrapperRef = useRef(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const [centeredNodeId, setCenteredNodeId] = useState(null);
//   const [orgChart, setOrgChart] = useState();
//   const { AxiosPost } = useAxiosHelper();

//   useEffect(() => {
//     generateTree();
//   }, []);

//   useEffect(() => {
//     if (treeWrapperRef.current) {
//       const { width, height } = treeWrapperRef.current.getBoundingClientRect();
//       setDimensions({ width, height });
//       setTranslate({ x: width / 2, y: height / 2 });
//     }
//   }, [treeWrapperRef]);

//   async function generateTree() {
//     let userId = localStorage.getItem("userId");
//     try {
//       setLoading(true);
//       const body = { uid: userId };
//       const response = await AxiosPost(ApiPaths.generationTree, body);
//       BasicInfo.isDebug &&  console.log("Response from tree API:", response);
//       setOrgChart(response);
//       if (response) {
//       }
//     } catch (error) {
//       BasicInfo.isDebug && console.error("Error fetching tree data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const Link = ({ linkData }) => (
//     <path
//       stroke="green"
//       strokeWidth="2"
//       fill="white"
//       d={`M${linkData.source.x},${linkData.source.y}L${linkData.target.x},${linkData.target.y}`}
//     />
//   );

//   return (
//     <div className="dashboard">
//       {loading && <Loader />}
//       <div
//         id="treeWrapper"
//         ref={treeWrapperRef}
//         style={{ width: "100%", height: "100vh" }}
//       >
//         {orgChart && (
//           <Tree
//             data={orgChart}
//             orientation="vertical"
//             centeringTransitionDuration={500}
//             enableLegacyTransitions={true}
//             draggable={true}
//             nodeSize={nodeSize}
//             dimensions={dimensions}
//             centeredNodeId={centeredNodeId}
//             translate={translate}
//             separation={{ siblings: 2, nonSiblings: 2 }}
//             pathFunc="step"
//             initialDepth={1}
//           // linkComponent={Link}
//           />
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import "./Genealogy.css";
import { ApiPaths } from "../../Config/ApiPath";
import Loader from "./../../Components/Loader/Loader";
import useAxiosHelper from "./../../Common/AxiosHelper";

export default function Genealogy() {
  const [loading, setLoading] = useState(false);
  const nodeSize = { x: 200, y: 200 };
  const treeWrapperRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [centeredNodeId, setCenteredNodeId] = useState(null);
  const [orgChart, setOrgChart] = useState();
  const { AxiosPost } = useAxiosHelper();

  useEffect(() => {
    generateTree();
  }, []);

  useEffect(() => {
    if (treeWrapperRef.current) {
      const { width, height } = treeWrapperRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, [treeWrapperRef]);

  async function generateTree() {
    let userId = localStorage.getItem("userId");
    try {
      setLoading(true);
      const body = { uid: userId };
      const response = await AxiosPost(ApiPaths.generationTree, body);
      console.log("Response from tree API:", response);
      setOrgChart(response);
      if (response) {
      }
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  }

  const Link = ({ linkData }) => (
    <path
      stroke="green"
      strokeWidth="2"
      fill="white"
      d={`M${linkData.source.x},${linkData.source.y}L${linkData.target.x},${linkData.target.y}`}
    />
  );

  return (
    <div className="dashboard">
      {loading && <Loader />}
      <div
        id="treeWrapper"
        ref={treeWrapperRef}
        style={{ width: "100%", height: "100vh" }}
      >
        {orgChart && (
          <Tree
            data={orgChart}
            orientation="vertical"
            centeringTransitionDuration={500}
            enableLegacyTransitions={true}
            draggable={true}
            nodeSize={nodeSize}
            dimensions={dimensions}
            centeredNodeId={centeredNodeId}
            translate={translate}
            separation={{ siblings: 2, nonSiblings: 2 }}
            pathFunc="step"
            initialDepth={1}

            // linkComponent={Link}
          />
        )}
      </div>
    </div>
  );
}
