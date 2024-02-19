import React, { useEffect, useState } from 'react';

import Header from '../component/Header';
import View from '../component/View';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const serviceKey = "rLn5aNwnlMGk8NI9zPNYuu8P4MM3hjyietapacBs73pVO2IS1ql5jrelV8vesGd1b/dffH/nvfLNy2EeTcFt5w==";
const reqUrl = 'http://localhost:9999/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1';

let dsAhflInfoNm = [];
let dsAhflInfo = [];
let dsCtrtPlcNm = [];
let dsCtrtPlc = [];
let dsEtcInfoNm = [];
let dsEtcInfo = [];
let dsSbdNm = [];
let dsSbd = [];
let dsSbdAhflNm = [];
let dsSbdAhfl = [];
let dsSplScdlNm = [];
let dsSplScdl = [];

function ViewContainer() {

  const [viewData, setViewData] = useState({});
  const location = useLocation();
    
  // 조회 함수
  const requestApi = async () => {
    let loading = document.querySelector(".blackBg");
    try {
        document.querySelector(".blackBg").style.display = "block";
        let reqData = {
          serviceKey: serviceKey,
          SPL_INF_TP_CD: location.state.SPL_INF_TP_CD,
          CCR_CNNT_SYS_DS_CD: location.state.CCR_CNNT_SYS_DS_CD,
          PAN_ID: location.state.PAN_ID,
          UPP_AIS_TP_CD: location.state.UPP_AIS_TP_CD,
          AIS_TP_CD: location.state.AIS_TP_CD
        }
        const response = await axios.get( reqUrl, { 
          params: reqData,
          withCredentials: true 
        });

        console.log(response.data);
        setViewData(response.data.data[1]);
        if(loading) loading.style.display = "none";

    } catch (error) {
        console.error('API 요청 에러:', error);
        if(loading) loading.style.display = "none";
    }
  };

  useEffect(() => {
    requestApi();
  },[]);

  // data set.
  if(viewData){
    dsAhflInfoNm = viewData.dsAhflInfoNm;
    dsAhflInfo = viewData.dsAhflInfo;
    dsCtrtPlcNm = viewData.dsCtrtPlcNm;
    dsCtrtPlc = viewData.dsCtrtPlc;
    dsEtcInfoNm = viewData.dsEtcInfoNm;
    dsEtcInfo = viewData.dsEtcInfo;
    dsSbdNm = viewData.dsSbdNm;
    dsSbd = viewData.dsSbd;
    dsSbdAhflNm = viewData.dsSbdAhflNm;
    dsSbdAhfl = viewData.dsSbdAhfl;
    dsSplScdlNm = viewData.dsSplScdlNm;
    dsSplScdl = viewData.dsSplScdl;
  }

  return (
    <div id="wrap">
      <Header page={"view"}></Header>
      <div className='container'>
        {
          dsCtrtPlc ?
          <View viewId={"dsCtrtPlc"}  viewTit={"접수처정보"} viewDataNm={dsCtrtPlcNm} viewData={dsCtrtPlc}></View> :
          ""
        }
        {
          dsSbdNm ?
          <View viewId={"dsSbd"}  viewTit={"단지정보"} viewDataNm={dsSbdNm} viewData={dsSbd}></View> :
          ""
        }
        {
          dsAhflInfo ?
          <View viewId={"dsAhflInfo"} viewTit={"첨부파일정보"} viewDataNm={dsAhflInfoNm} viewData={dsAhflInfo}></View> :
          ""
        }
        {
          dsSbdAhfl ?
          <View viewId={"dsSbdAhfl"}  viewTit={"단지별첨부파일정보"} viewDataNm={dsSbdAhflNm} viewData={dsSbdAhfl}></View> :
          ""
        }
        {
          dsSplScdl ?
          <View viewId={"dsSplScdl"}  viewTit={"공급일정"} viewDataNm={dsSplScdlNm} viewData={dsSplScdl}></View> :
          ""
        }
        {
          dsEtcInfo ?
          <View viewId={"dsEtcInfo"}  viewTit={"기타정보"} viewDataNm={dsEtcInfoNm} viewData={dsEtcInfo}></View> :
          ""
        }
      </div>
      <div className='blackBg'>
          <div className='loading'></div>
      </div>
    </div>
  );
}

export default ViewContainer;