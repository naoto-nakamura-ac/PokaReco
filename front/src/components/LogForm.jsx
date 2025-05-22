import {
  Box,
  useNotice,
  Dialog,
  DialogBody,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Option,
  HStack,
  Text,
  Textarea,
} from '@yamada-ui/react';
import { Calendar } from '@yamada-ui/calendar';
import {
  BabyIcon,
  CakeIcon,
  CalendarDaysIcon,
  Clock9Icon,
  RulerIcon,
  StickyNoteIcon,
  ThermometerIcon,
  VenusAndMarsIcon,
  WeightIcon,
} from '@yamada-ui/lucide';
import { useState } from 'react';
import { format } from 'date-fns';
import 'dayjs/locale/ja';

const LogForm = ({ open, onClose, onSuccess }) => {
  const notice = useNotice({ limit: 1 });

  const [log, setLog] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [timeframe, setTimeframe] = useState('morning');
  const [tempInt, setTempInt] = useState('36');
  const [tempDeci, setTempDeci] = useState('0');
  const [weightInt, setWeightInt] = useState('--');
  const [weightDeci, setWeightDeci] = useState('--');
  const [heightInt, setHeightInt] = useState('--');
  const [heightDeci, setHeightDeci] = useState('--');
  const [memo, setMemo] = useState('');

  // const [isInvalidName, setIsInvalidName] = useState(false);

  const alert = (message) => {
    notice({
      title: 'Error',
      description: message,
      duration: 3000,
      status: 'error',
    });
  };
  // const updateName = (e) => {
  //   setName(e.target.value);
  // };

  // const nameBlur = () => {
  //   setIsInvalidName(true);
  // };

  const register = async () => {
    try {
      if (temperature && log && timeframe) {
        const postData = {
          record_date: log,
          timeframe,
          temperature,
          height,
          weight,
          memo,
        };
        console.log('🍣 ~ LogForm.jsx:76 ~ register ~ postData:', postData);
        const res = await fetch('/api/records/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        const data = await res.json();
        if (res.status === 201) return true;
        alert(data.message);
      } else {
        alert('入力項目が不足しています');
        setIsInvalidName(true);
      }
      return false;
    } catch (error) {
      console.log('error: ', error);
      window.alert('Error');
      return false;
    }
  };

  const navigateDashboard = async () => {
    const success = await register();
    if (success) {
      notice({
        title: 'Success',
        description: '記録に成功しました',
        duration: 3000,
        status: 'success',
      });
      onSuccess();
    }
  };

  const weightIntegers = Array.from({ length: 50 }, (_, i) => String(i));
  const heightIntegers = Array.from({ length: 151 }, (_, i) => String(i));
  const tempertatureIntegers = Array.from({ length: 7 }, (_, i) =>
    String(i + 35)
  );
  const decimals = Array.from({ length: 10 }, (_, i) => String(i));

  const temperature = Number(`${tempInt}.${tempDeci}`);
  const weight = Number(`${weightInt}.${weightDeci}`) || null;
  const height = Number(`${heightInt}.${heightDeci}`) || null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      h="3xl"
      header="記録する"
      success={{
        variant: 'solid',
        bg: 'yellow.300',
        w: 'full',
        borderRadius: 'full',
        marginBottom: 'sm',
        children: '登録',
        // _hover:""
      }}
      onSuccess={navigateDashboard}
    >
      <DialogBody>
        <FormControl label="記録したい日" required errorMessage="日付を入力">
          <InputGroup>
            <InputLeftElement>
              <CalendarDaysIcon />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="YYYY-MM-DD"
              _placeholder={{ opacity: 1, color: 'yellow.800' }}
              readOnly
              value={log}
            />
          </InputGroup>
          <Box h="9xs" />
          <Calendar
            variant="solid"
            locale="ja"
            size="sm"
            w="full"
            value={log ? new Date(log) : new Date()}
            onChange={(value) => {
              const dateStr = format(value, 'yyyy-MM-dd');
              setLog(dateStr);
            }}
          />
        </FormControl>
        <FormControl label="時間帯を選択" required>
          <InputGroup>
            <InputLeftElement>
              <Clock9Icon />
            </InputLeftElement>
            <RadioGroup
              direction="row"
              defaultValue="morning"
              value={timeframe}
              onChange={setTimeframe}
            >
              <Radio value="morning">あさ</Radio>
              <Radio value="afternoon">ひる</Radio>
              <Radio value="night">よる</Radio>
            </RadioGroup>
          </InputGroup>
        </FormControl>

        <FormControl label="体温" required>
          <InputGroup>
            <InputLeftElement>
              <ThermometerIcon />
            </InputLeftElement>

            <HStack spacing={2}>
              <Select
                placeholder="36"
                // defaultValue={36}
                value={tempInt}
                onChange={setTempInt}
              >
                {tempertatureIntegers.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
              <Text>.</Text>
              <Select
                placeholder="0"
                // defaultValue={0}
                value={tempDeci}
                onChange={setTempDeci}
              >
                {decimals.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
              <Text>℃</Text>
            </HStack>
          </InputGroup>
        </FormControl>

        <FormControl label="体重">
          <InputGroup>
            <InputLeftElement>
              <WeightIcon />
            </InputLeftElement>

            <HStack spacing={2}>
              <Select
                placeholder="--"
                // defaultValue={36}
                value={weightInt}
                onChange={setWeightInt}
              >
                {weightIntegers.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
              <Text>.</Text>
              <Select
                placeholder="--"
                // defaultValue={0}
                value={weightDeci}
                onChange={setWeightDeci}
              >
                {decimals.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
              <Text>kg</Text>
            </HStack>
          </InputGroup>
        </FormControl>

        <FormControl label="身長">
          <InputGroup>
            <InputLeftElement>
              <RulerIcon />
            </InputLeftElement>

            <HStack spacing={2}>
              <Select
                placeholder="--"
                // defaultValue={36}
                value={heightInt}
                onChange={setHeightInt}
              >
                {heightIntegers.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
              <Text>.</Text>
              <Select
                placeholder="--"
                // defaultValue={0}
                value={heightDeci}
                onChange={setHeightDeci}
              >
                {decimals.map((num) => (
                  <Option key={num} value={num}>
                    {num}
                  </Option>
                ))}
              </Select>
              <Text>cm</Text>
            </HStack>
          </InputGroup>
        </FormControl>

        <FormControl label="Memo">
          <InputGroup>
            <InputLeftElement>
              <StickyNoteIcon />
            </InputLeftElement>
            <Textarea
              variant="filled"
              placeholder="Free Memo"
              onChange={(e) => setMemo(e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </DialogBody>
    </Dialog>
  );
};

export default LogForm;
