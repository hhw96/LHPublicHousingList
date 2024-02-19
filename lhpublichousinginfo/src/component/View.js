import React from 'react';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function View({viewId, viewTit, viewDataNm, viewData}) {

    let dataHtml = "";

    if(viewDataNm && viewDataNm.length > 0){
        if(viewId == "dsAhflInfo"){
            dataHtml += "<h4>다운로드</h4>";
            dataHtml += "<p>";
            viewData.map((item, index)=>{
                if(index > 0) dataHtml += "<br/>";
                dataHtml += "<a href='"+item.AHFL_URL+"' target='_blank'>"+item.CMN_AHFL_NM+"</a>";
            });
            dataHtml += "</p>";
        }else if(viewId == "dsSbdAhfl"){
            dataHtml += "<h4>다운로드</h4>";
            dataHtml += "<p>";
            viewData.map((item, index)=>{
                if(index > 0) dataHtml += "<br/>";
                dataHtml += "<a href='"+item.AHFL_URL+"' target='_blank'>"+item.LCC_NT_NM+" "+item.CMN_AHFL_NM+"</a>";
            });
            dataHtml += "</p>";
        }else if(viewId == "dsSbd"){
            let viewDataNmObj = viewDataNm[0];
            viewData.map((dataItem)=>{
                dataHtml += "<h4>"+dataItem.LCC_NT_NM+"</h4>";
                dataHtml += "<p>";
                Object.keys(viewDataNmObj).map((nmItem, index)=>{
                    if(nmItem != "LCC_NT_NM"){
                        if(index > 0) dataHtml += "<br/>";
                        dataHtml += "<b>" + viewDataNmObj[nmItem] + " : </b>";
                        if(dataItem[nmItem]){
                            dataHtml += dataItem[nmItem];
                        }else{
                            dataHtml += "-";
                        }
                    }
                });
                dataHtml += "</p>";
            });
        }else if(viewId == "dsSplScdl"){
            let viewDataNmObj = viewDataNm[0];
            viewData.map((dataItem)=>{
                dataHtml += "<h4>"+dataItem.SBD_LGO_NM+"</h4>";
                dataHtml += "<p>";
                Object.keys(viewDataNmObj).map((nmItem, index)=>{
                    if(nmItem != "SBD_LGO_NM"){
                        if(index > 0) dataHtml += "<br/>";
                        dataHtml += "<b>" + viewDataNmObj[nmItem] + " : </b>";
                        if(dataItem[nmItem]){
                            dataHtml += dataItem[nmItem];
                        }else{
                            dataHtml += "-";
                        }
                    }
                });
                dataHtml += "</p>";
            });
        }else{
            let viewDataNmObj = viewDataNm[0];
            Object.keys(viewDataNmObj).map((nmItem)=>{
                dataHtml += "<h4>"+viewDataNmObj[nmItem]+"</h4>";
                viewData.map((dataItem)=>{
                    if(dataItem[nmItem]){
                        dataHtml += "<p>"+dataItem[nmItem]+"</p>";
                    }else{
                        dataHtml += "<p>-</p>";
                    }
                });
            });
        }
    }
    
    return (
        <div className="viewContainer component">
            <h3 className='viewTit'>
                <FontAwesomeIcon icon={faCaretRight}/>
                <span>{viewTit}</span>
            </h3>
            <div id={viewId+'ViewTalbe'} dangerouslySetInnerHTML={{__html: dataHtml}}></div>
        </div>
    );
}

export default View;