import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Input,
  Box,
  HStack,
  Text,
  VStack,
  Separator,
  Center
} from '@yamada-ui/react';
import { LineChart } from '@yamada-ui/charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// import { useMemo } from 'react';

function HeatChartPDF() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [formatData, setFormatData] = useState(null);
  const [param, setParam] = useState(null);
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  // 認証状態を取得し未認証ならTopへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.status === 401) {
        navigate('/');
      }
    })();
    fetchRecordsFive();
  }, []);

  useEffect(() => {
    if (param && Array.isArray(param)) {
      formatRecords();
    }
  }, [param]);
  // 時間帯設定
  const timeframeOrder = { morning: 0, afternoon: 1, night: 2 };
  const timeframeLabel = { morning: '朝', afternoon: '昼', night: '夜' };
  const fetchRecordsFive = async () => {
    const query = new URLSearchParams({
      start: moment().subtract(4, 'days').format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    });
    const baseUrl = '/api/records';
    const url = `${baseUrl}?${query.toString()}`;
    const res = await fetch(url, { credentials: 'include' });
    const data = await res.json();
    setParam(data);
  };
  const formatRecords = () => {
    if (param) {
      // 並び替えて整形
      const formatted = param
        .slice()
        .sort((a, b) => {
          const dateA = moment(a.record_date).utcOffset(9).format('YYYY-MM-DD');
          const dateB = moment(b.record_date).utcOffset(9).format('YYYY-MM-DD');
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return timeframeOrder[a.timeframe] - timeframeOrder[b.timeframe];
        })
        .map((item) => ({
          record_date: moment(item.record_date)
            .utcOffset(9)
            .format(`M月D日(${timeframeLabel[item.timeframe]})`),
          temperature: item.temperature,
          weight: item.weight,
          height: item.height,
          memo: item.memo,
        }));
      // console.log(formatted);
      setFormatData(formatted);
    }
  };

  // #TODO 今回は断念
  // データを整理する（record_date を日付と時間帯に分けて、日付ごとにグループ化）
  // const groupedData = useMemo(() => {
  //   const result = {};
  //   formatData?.forEach((data) => {
  //     const match = data.record_date.match(
  //       /(\d{4}年\d{2}月\d{2}日)\(([^)]+)\)/
  //     );
  //     if (!match) return;
  //     const [_, date, time] = match;
  //     if (!result[date]) {
  //       result[date] = { 朝: {}, 昼: {}, 夜: {} };
  //     }
  //     result[date][time] = {
  //       temp: data.temperature,
  //       memo: data.memo,
  //     };
  //   });
  //   return result;
  // }, [formatData]);
  // const chartData = [];
  // Object.entries(groupedData).forEach(([date, times]) => {
  //   ['朝', '昼', '夜'].forEach((timeframe) => {
  //     const record = times[timeframe];
  //     if (record && record.temp !== undefined) {
  //       chartData.push({
  //         label: `${date}(${timeframe})`,
  //         temperature: record.temp,
  //         memo: record.memo,
  //       });
  //     }
  //   });
  // });

  const toPDFExport = async () => {
    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name}_熱型表.pdf`);
  };
  const navigateDashboard = () => {
    navigate('/dashboard');
  };

  const series = [
    { dataKey: 'temperature', color: 'red.500' },
    { dataKey: 'memo' },
  ];
  return (
    <Box>
      <HStack w="80vw" spacing={4} padding="md" mx="auto">
        <Input
          type="text"
          placeholder="お名前"
          flex="1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="年齢（例：3歳2ヶ月）"
          flex="1"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Button flex="1" onClick={toPDFExport}>
          PDF出力
        </Button>
        <Button flex="1" onClick={navigateDashboard}>
          戻る
        </Button>
      </HStack>
      {formatData?.length > 0 ? (
      <VStack
        ref={pdfRef}
        p={4}
        bg="white"
        rounded="md"
        shadow="md"
        width="95%"
        mx="auto"
        alignItems="center"
      >
        <Text fontSize="2xl" fontWeight="bold">
          簡易熱型表
        </Text>
        <Separator w="100%" />
        <Text fontSize="xl">お熱の記録</Text>
        <Text fontSize="lg">
          お名前：{name}（{age}）
        </Text>
        <LineChart
          // data={chartData}
          data={formatData}
          series={series}
          dataKey="record_date"
          yAxisTickFormatter={(value) => `${value}℃`}
          yAxisProps={{
            domain: [34, 42],
            tickCount: 17,
          }}
          curveType="linear"
          h={600}
        ></LineChart>
      </VStack>
      ) : (
        <Center>
          <Text>NO DATA...</Text>
        </Center>
      )}
    </Box>
  );
}
export default HeatChartPDF;
