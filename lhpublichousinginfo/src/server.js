const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// CORS 설정해주기
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// 요청 본문에 있는 데이터를 객체로 변환해주기
app.use(express.urlencoded({ extended: true }));

// JSON 파싱해주기
app.use(express.json());

app.get('/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1', async (req, res) => {
  try {

    res.header('Content-Type', 'application/json; charset=utf-8');

    // API에 GET 요청 보내기
    const apiResponse = await axios.get('http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1', {
      params: req.query,
    });

    // API 응답에서 필요한 데이터 추출 또는 가공
    const responseData = {
      message: 'GET request successfully!',
      data: apiResponse.data,
    };

    // 클라이언트에게 JSON 형식으로 응답
    res.json(responseData);
  } catch (error) {
    console.error('Error during relay:', error);
    res.json({ error: error.message });
  }
});

app.get('/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1', async (req, res) => {
  try {

    res.header('Content-Type', 'application/json; charset=utf-8');

    // API에 GET 요청 보내기
    const apiResponse = await axios.get('http://apis.data.go.kr/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1', {
      params: req.query,
    });

    // API 응답에서 필요한 데이터 추출 또는 가공
    const responseData = {
      message: 'GET request successfully!',
      data: apiResponse.data,
    };

    // 클라이언트에게 JSON 형식으로 응답
    res.json(responseData);
  } catch (error) {
    console.error('Error during relay:', error);
    res.json({ error: error.message });
  }
});

// 서버 시작
const port = 9999;
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});