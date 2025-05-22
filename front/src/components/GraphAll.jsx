import {
  VStack,
  Text,
  Box,
  Center,
  Dialog,
  DialogBody,
} from '@yamada-ui/react';
import { LineChart } from '@yamada-ui/charts';
import { useState, useEffect } from 'react';
import moment from 'moment';

function GraphAll({ maxH = '100%', open, onClose }) {
  const [paramAll, setParamAll] = useState(null);

  const fetchRecordsAll = async () => {
    const res = await fetch('/api/records/', { credentials: 'include' });
    const data = await res.json();
    setParamAll(data);
  };
  const [formatData, setFormatData] = useState(null);
  useEffect(() => {
    fetchRecordsAll();
  }, []);

  useEffect(() => {
    if (paramAll && Array.isArray(paramAll)) {
      formatRecords();
    }
  }, [paramAll]);

  // 時間帯設定
  const timeframeOrder = { morning: 0, afternoon: 1, night: 2 };
  const timeframeLabel = { morning: '朝', afternoon: '昼', night: '夜' };

  const formatRecords = () => {
    if (paramAll) {
      // 並び替えて整形
      const formatted = paramAll
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
    <Dialog
      open={open}
      onClose={onClose}
      h="lg"
      maxW="80vw"
      w="full"
      header="全期間のデータを確認する"
    >
      <DialogBody>
        <Box maxW="100%" maxH={maxH} w="full" h="full" bg="whiteAlpha.600">
          {formatData ? (
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
            <Center>
              <Text>NO DATA...</Text>
            </Center>
          )}
        </Box>
      </DialogBody>
    </Dialog>
  );
}

export default GraphAll;
