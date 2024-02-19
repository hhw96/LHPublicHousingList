import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const UPP_AIS_TP_CD = [
    {code: "", desc: "전체"},
    {code: "01", desc: "토지"},
    {code: "05", desc: "분양주택"},
    {code: "06", desc: "임대주택"},
    {code: "13", desc: "주거복지"},
    {code: "22", desc: "상가"},
    {code: "39", desc: "신혼희망타운"}
];
const CNP_CD = [
    {code: "", desc: "전체"},
    {code: "11", desc: "서울특별시"},
    {code: "26", desc: "부산광역시"},
    {code: "27", desc: "대구광역시"},
    {code: "28", desc: "인천광역시"},
    {code: "29", desc: "광주광역시"},
    {code: "30", desc: "대전광역시"},
    {code: "31", desc: "울산광역시"},
    {code: "36110", desc: "세종특별자치시"},
    {code: "41", desc: "경기도"},
    {code: "42", desc: "강원도"},
    {code: "43", desc: "충청북도"},
    {code: "44", desc: "충청남도"},
    {code: "45", desc: "전라북도"},
    {code: "46", desc: "전라남도"},
    {code: "47", desc: "경상북도"},
    {code: "48", desc: "경상남도"},
    {code: "50", desc: "제주특별자치도"}
];
const PAN_SS = [
    {code: "", desc: "전체"},
    {code: "공고중", desc: "공고중"},
    {code: "접수중", desc: "접수중"},
    {code: "접수마감", desc: "접수마감"},
    {code: "상담요청", desc: "상담요청"},
    {code: "정정공고중", desc: "정정공고중"}
];

function Filter({onSearch, onChangePostDate, onChangeCloseDate, startPostDate, endPostDate, startCloseDate, endCloseDate}) {

    return (
        <div className="filterContainer component">
            <ul>
                <li key={"PAN_NM"}><label>공고 제목</label> <input type='text' name="PAN_NM" placeholder='검색어를 입력하세요.'/></li>
                <li key={"UPP_AIS_TP_CD"}>
                    <label>공고 유형</label>
                    <select name='UPP_AIS_TP_CD'>
                        {
                            UPP_AIS_TP_CD.map((item) => {
                                return (<option value={item.code}>{item.desc}</option>);
                            })
                        }
                    </select>
                </li>
                <li key={"CNP_CD"}>
                    <label>지역</label>
                    <select name='CNP_CD'>
                        {
                            CNP_CD.map((item) => {
                                return (<option value={item.code}>{item.desc}</option>);
                            })
                        }
                    </select>
                </li>
                <li key={"PAN_SS"}>
                    <label>공고 상태</label>
                    <select name='PAN_SS'>
                        {
                            PAN_SS.map((item) => {
                                return (<option value={item.code}>{item.desc}</option>);
                            })
                        }
                    </select>
                </li>
                <li key={"PAN_DT"}>
                    <label>게시 기간</label>
                    <DatePicker
                        locale={ko}
                        selected={startPostDate}
                        onChange={(update) => {
                            onChangePostDate(update);
                        }}
                        startDate={startPostDate}
                        endDate={endPostDate}
                        dateFormat="yyyy/MM/dd"
                        selectsRange
                    />
                </li>
                <li key={"CLSG_DT"}>
                    <label>마감 기간</label>
                    <DatePicker
                        locale={ko}
                        selected={startCloseDate}
                        onChange={(update) => {
                            onChangeCloseDate(update);
                        }}
                        startDate={startCloseDate}
                        endDate={endCloseDate}
                        dateFormat="yyyy/MM/dd"
                        selectsRange
                    />
                </li>
            </ul>
            <div className='filterFoot'>
                <button onClick={()=> onSearch()}>
                    조회하기
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
        </div>
    );
}

export default Filter;