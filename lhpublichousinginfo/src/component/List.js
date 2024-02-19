import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
    
//초기 변수 선언
let reqData = {}; //서버 요청 데이터
let resData = {}; //서버 응답 데이터
let dsList = []; // 공고문 데이터 리스트

let pageSize = 0; // 한 페이지당 데이터 수
let currPage = 0; // 현재 페이지 위치
let allCnt = 0; // 총 데이터 수
let totalPage = 0; //총 페이지 수
let maxPageBtn = 3; //화면에 표시할 페이지 버튼 수
let firstPageBtn = ""; // 화면에 그려질 첫번째 페이지 버튼
let lastPageBtn = ""; // 화면에 그려질 마지막 페이지 버튼

//pagenation 그리기
function drawPagenaion(allCnt, pageSize, currPage, onSearch){

    let pageBtnBox = document.querySelector(".pageBtnBox");
    if(pageBtnBox){
        if(allCnt){ // 데이터가 있을 때
            let pageBtnHtml = "";
            let windowWidth = window.innerWidth;
        
            if(windowWidth > 1000){
                maxPageBtn = 10;
            }else if(windowWidth > 800){
                maxPageBtn = 8;
            }else if(windowWidth > 650){
                maxPageBtn = 5;
            }else{
                maxPageBtn = 3;
            }
        
            totalPage = Math.ceil(allCnt/pageSize); //총 페이지 수
            if(totalPage < maxPageBtn) maxPageBtn = totalPage;
        
            let pageGroup = Math.ceil(currPage/maxPageBtn); // 몇 번째 페이지 그룹인지
            let lastPageGroup = Math.ceil(totalPage/maxPageBtn); // 마지막 페이지 그룹
        
            lastPageBtn = pageGroup * maxPageBtn;
            if(lastPageBtn > totalPage) lastPageBtn = totalPage;
        
            firstPageBtn = lastPageBtn - (maxPageBtn-1);
            if(pageGroup == lastPageGroup) firstPageBtn = ((lastPageGroup -1) * maxPageBtn) +1;
            
            let anglesLeft = document.querySelector("#anglesLeft");
            let chevronLeft = document.querySelector("#chevronLeft");
            let chevronRight = document.querySelector("#chevronRight");
            let anglesRight = document.querySelector("#anglesRight");
        
            if(firstPageBtn == 1){
                anglesLeft.className = "disabled";
                chevronLeft.className = "disabled";
            }else{
                anglesLeft.className = "";
                chevronLeft.className = "";
            }
        
            if(lastPageBtn == totalPage){
                chevronRight.className = "disabled";
                anglesRight.className = "disabled";
            }else{
                chevronRight.className = "";
                anglesRight.className = "";
            }
        
            for(let i = firstPageBtn; i <= lastPageBtn; i++){
                if(i == currPage){
                    pageBtnHtml += '<li class="active" key={"pg'+i+'"}>'+i+'</li>';
                }else{
                    pageBtnHtml += '<li key={"pg'+i+'"}>'+i+'</li>';
                }
            }
    
            pageBtnBox.innerHTML = pageBtnHtml;
    
            let pageBtnList = document.querySelectorAll(".pageBtnBox li");
            pageBtnList.forEach(item => {
                item.addEventListener('click', function(){
                    onSearch(pageSize, item.textContent);
                });
            });
    
        }else{ // 데이터가 없을 때
            document.querySelector("#anglesLeft").className = "disabled";
            document.querySelector("#chevronLeft").className = "disabled";
            document.querySelector("#chevronRight").className = "disabled";
            document.querySelector("#anglesRight").className = "disabled";
        }
    }
}

function List({dataList, onSearch}) {

    if(dataList && dataList.length){
        reqData = dataList[0].dsSch[0];
        resData = dataList[1];
        pageSize = reqData.PG_SZ;
        currPage = reqData.PAGE;
        dsList = resData.dsList;
        if(dsList && dsList.length > 0){
            allCnt = dsList[0].ALL_CNT;
        }

        let pgSzSelect = document.querySelector("select[name='PG_SZ']");
        if(pgSzSelect) pgSzSelect.value = pageSize;

        drawPagenaion(allCnt, pageSize, currPage, onSearch);
    }

    window.addEventListener('resize', function(){
        let timer = null;
        clearTimeout(timer);
        timer = setTimeout(function(){
            drawPagenaion(allCnt, pageSize, currPage, onSearch);
        }, 300);
    });

    return (
        <div className="listContainer component">
            <div className='listTit'>
                <div>Total: {allCnt}</div>
                <div>
                    <select
                        name='PG_SZ'
                        defaultValue={"10"}
                        onChange={(event)=>{
                            let changePgSz = event.target.value;
                            onSearch(changePgSz, null);
                        }}
                    >
                        <option value={"5"}>5개</option>
                        <option value={"10"}>10개</option>
                        <option value={"30"}>30개</option>
                        <option value={"50"}>50개</option>
                    </select>
                </div>
            </div>
            <div className='listBox'>
                <ul className='listHeader'>
                    <li key={"listHeader"}>
                        <div>No</div>
                        <div>공고명</div>
                        <div>공고유형</div>
                        <div>지역명</div>
                        <div>공고상태</div>
                        <div>공고게시일</div>
                        <div>공고마감일</div>
                    </li>
                </ul>
                <ul className='listBody'>
                    {
                        dsList && dsList.length > 0 ?
                        dsList.map((item) => {
                            return (
                                <li key={item.PAN_ID}>
                                    <Link
                                        to={"/view"}
                                        state={{
                                            SPL_INF_TP_CD: item.SPL_INF_TP_CD,
                                            CCR_CNNT_SYS_DS_CD: item.CCR_CNNT_SYS_DS_CD,
                                            PAN_ID: item.PAN_ID,
                                            UPP_AIS_TP_CD: item.UPP_AIS_TP_CD,
                                            AIS_TP_CD: item.AIS_TP_CD
                                        }}>
                                        <div key={item.PAN_ID+"_RNUM"}>{item.RNUM}<input type='hidden' value={item.SPL_INF_TP_CD}/></div>
                                        <div key={item.PAN_ID+"_PAN_NM"}>{item.PAN_NM}</div>
                                        <div key={item.PAN_ID+"_UPP_AIS_TP_NM"}>{item.UPP_AIS_TP_NM}</div>
                                        <div key={item.PAN_ID+"_CNP_CD_NM"}>{item.CNP_CD_NM}</div>
                                        <div key={item.PAN_ID+"_PAN_SS"}>{item.PAN_SS}</div>
                                        <div key={item.PAN_ID+"_PAN_NT_ST_DT"}>{item.PAN_NT_ST_DT}</div>
                                        <div key={item.PAN_ID+"_CLSG_DT"}>{item.CLSG_DT}</div>
                                    </Link>
                                </li>
                            );
                        }) :
                        (<li key={"empty"} className='emptyList'>검색 결과가 없습니다.</li>)
                    }
                </ul>
            </div>
            <div className='listFooter'>
                <div className='pagenation'>
                    <div id='anglesLeft' className='disabled'
                        onClick={()=>{
                            onSearch(pageSize, "1");
                        }}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft}/>
                    </div>
                    <div id='chevronLeft' className='disabled'
                        onClick={()=>{
                            onSearch(pageSize, (Number(firstPageBtn)-1).toString());
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </div>
                    <ul className='pageBtnBox'></ul>
                    <div id='chevronRight'
                        onClick={()=>{
                            onSearch(pageSize, (Number(lastPageBtn)+1).toString());
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </div>
                    <div id='anglesRight'
                        onClick={()=>{
                            onSearch(pageSize, totalPage.toString());
                        }}
                    >
                        <FontAwesomeIcon icon={faAnglesRight}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;