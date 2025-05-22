import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  Text,
  Box,
} from '@yamada-ui/react';
import { LineChart } from '@yamada-ui/charts';
import { useState, useEffect } from 'react';
import moment from 'moment';

function Graph({
  children,
  maxW = '100%',
  maxH = '100%',
  param,
}) {
  const [formatData, setFormatData] = useState(null);
  useEffect(() => {
    // fetchRecords();
    if (param && Array.isArray(param)) {
      formatRecords();
    }
  }, [param]);
  // 時間帯設定
  const timeframeOrder = { morning: 0, afternoon: 1, night: 2 };
  const timeframeLabel = { morning: '朝', afternoon: '昼', night: '夜' };

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
            .format(`YYYY年MM月DD日(${timeframeLabel[item.timeframe]})`),
          temperature: item.temperature,
          weight: item.weight,
          height: item.height,
          memo: item.memo,
        }));
      console.log(formatted);
      setFormatData(formatted);
    }
  };
  const series = [
    {
      dataKey: 'temperature',
      color: 'red.500',
    },
    {
      dataKey: 'memo',
    },
  ];
  return (
    <Box maxW={maxW} maxH={maxH} w="full" h="full">
      <Card bg="whiteAlpha.600">
        <CardHeader justifyContent="center">1週間の体温記録</CardHeader>
        <CardBody display="flex" justifyContent="center" alignItems="center">
          {children?.length > 0 && formatData?.length > 0 ? (
            <VStack>
              <LineChart
                height={300}
                data={formatData}
                series={series}
                dataKey="record_date"
                valueFormatter={(value) => {
                  if (typeof value === 'string') {
                    return `${value}`;
                  } else {
                    return `${value}℃`;
                  }
                }}
                yAxisTickFormatter={(value) => `${value}℃`}
                yAxisProps={{
                  domain: [34, 42],
                }}
                curveType="linear" 
              />
            </VStack>
          ) : (
            <Text>NO DATA...</Text>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}

export default Graph;
