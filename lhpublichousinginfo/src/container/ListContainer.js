import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Filter from '../component/Filter';
import List from '../component/List';
import axios from 'axios';
import moment from 'moment';

const serviceKey = "rLn5aNwnlMGk8NI9zPNYuu8P4MM3hjyietapacBs73pVO2IS1ql5jrelV8vesGd1b/dffH/nvfLNy2EeTcFt5w==";
const reqUrl = 'http://localhost:9999/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1';

function ListContainer() {

    // state set
    const [initFlg, setInitFlg] = useState(true);
    const [dataList, setDataList] = useState([]);
    
    let startDt = new Date();
    startDt.setMonth(startDt.getMonth()-3);
    const [startPostDate, setStartPostDate] = useState(startDt);
    const [endPostDate, setEndPostDate] = useState(new Date());
    const onChangePostDate = (dates) => {
        const [start, end] = dates;
        setStartPostDate(start);
        setEndPostDate(end);
    }
    
    const [startCloseDate, setStartCloseDate] = useState(startDt);
    const [endCloseDate, setEndCloseDate] = useState(new Date());
    const onChangeCloseDate = (dates) => {
        const [start, end] = dates;
        setStartCloseDate(start);
        setEndCloseDate(end);
    }
    
    // 조회 함수
    const requestApi = async (reqUrl, reqData) => {
        let loading = document.querySelector(".blackBg");
        try {

            if(loading) loading.style.display = "block";
            const response = await axios.get( reqUrl, { 
                    params: reqData,
                    withCredentials: true 
                });

            console.log(response.data);
            setDataList(response.data.data);
            if(loading) loading.style.display = "none";

        } catch (error) {
            console.error('API 요청 에러:', error);
            if(loading) loading.style.display = "none";
        }
    };

    useEffect(() => {
        
        if(initFlg){
            let initData = {
                serviceKey: serviceKey,
                PAN_NM: "",
                UPP_AIS_TP_CD: "",
                CNP_CD: "",
                PAN_SS: "",
                PAN_ST_DT: moment(startPostDate).format("YYYYMMDD"),
                PAN_ED_DT: moment(endPostDate).format("YYYYMMDD"),
                CLSG_ST_DT: moment(startCloseDate).format("YYYYMMDD"),
                CLSG_ED_DT: moment(endCloseDate).format("YYYYMMDD"),
                PG_SZ: "10",
                PAGE: "1"
            }
    
            requestApi(reqUrl, initData);
            setInitFlg(false);
        }

    },[]);

    // 검색
    const onSearch = (pgSzParam, pageParam) => {
        if(!initFlg){
            
            let panNm = document.querySelector("input[name='PAN_NM']").value; //공고명
            let uppAisTp = document.querySelector("select[name='UPP_AIS_TP_CD']").value; //공고유형
            let cnp = document.querySelector("select[name='CNP_CD']").value; //지역
            let panSs = document.querySelector("select[name='PAN_SS']").value; //공고 상태
            let panStDt = moment(startPostDate).format("YYYYMMDD"); //게시시작기간
            let panEdDt = moment(endPostDate).format("YYYYMMDD"); //게시끝기간
            let clsgStDt = moment(startCloseDate).format("YYYYMMDD"); //마감시작기간
            let clsgEdDt = moment(endCloseDate).format("YYYYMMDD"); //마감끝기간
            let pgSz = pgSzParam ? pgSzParam : dataList[0].dsSch[0].PG_SZ; //한페이지결과수
            let page = pageParam ? pageParam : dataList[0].dsSch[0].PAGE; //페이지번호
    
            let searchData = {
                serviceKey: serviceKey,
                PAN_NM: panNm,
                UPP_AIS_TP_CD: uppAisTp,
                CNP_CD: cnp,
                PAN_SS: panSs,
                PAN_ST_DT: panStDt,
                PAN_ED_DT: panEdDt,
                CLSG_ST_DT: clsgStDt,
                CLSG_ED_DT: clsgEdDt,
                PG_SZ: pgSz,
                PAGE: page
            }
    
            requestApi(reqUrl, searchData);
        }
    }

    return (
        <div id="wrap">
            <Header></Header>
            <div className='container'>
                <Filter
                    onSearch={onSearch}
                    onChangePostDate={onChangePostDate}
                    onChangeCloseDate={onChangeCloseDate}
                    startPostDate={startPostDate}
                    endPostDate={endPostDate}
                    startCloseDate={startCloseDate}
                    endCloseDate={endCloseDate}
                />
                <List
                    dataList={dataList}
                    onSearch={onSearch}
                />
            </div>
            <div className='blackBg'>
                <div className='loading'></div>
            </div>
        </div>
    );
}

export default ListContainer;