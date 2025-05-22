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
} from '@yamada-ui/react';
import { Calendar } from '@yamada-ui/calendar';
import { BabyIcon, CakeIcon, VenusAndMarsIcon, XIcon } from '@yamada-ui/lucide';
import { useState } from 'react';
import { format } from 'date-fns';
import 'dayjs/locale/ja';

const AddChild = ({ open, onClose, onSuccess }) => {
  const notice = useNotice({ limit: 1 });

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [gender, setGender] = useState('m');

  const [isInvalidName, setIsInvalidName] = useState(false);

  const alert = (message) => {
    notice({
      title: 'Error',
      description: message,
      duration: 3000,
      status: 'error',
    });
  };
  const updateName = (e) => {
    setName(e.target.value);
  };

  const nameBlur = () => {
    setIsInvalidName(true);
  };

  const register = async () => {
    try {
      if (name && birthday && gender) {
        const res = await fetch('/api/children/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, birthday, gender }),
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
        description: '子どもの登録に成功しました',
        duration: 3000,
        status: 'success',
      });
      onSuccess();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      h="3xl"
      header="子どもを追加する"
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
        <FormControl
          label="Child Name"
          required
          invalid={isInvalidName && !name}
          onBlur={nameBlur}
          errorMessage="子どもの名前を入力してください"
        >
          <InputGroup>
            <InputLeftElement>
              <BabyIcon />
            </InputLeftElement>
            <Input
              variant="filled"
              type="text"
              placeholder="****"
              _placeholder={{ opacity: 1, color: 'yellow.800' }}
              value={name}
              onChange={updateName}
            />
          </InputGroup>
        </FormControl>
        <FormControl
          label="Birthday"
          required
          errorMessage="誕生日を入力してください"
        >
          <InputGroup>
            <InputLeftElement>
              <CakeIcon />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="YYYY-MM-DD"
              _placeholder={{ opacity: 1, color: 'yellow.800' }}
              readOnly
              value={birthday}
            />
          </InputGroup>
          <Box h="9xs" />
          <Calendar
            variant="solid"
            locale="ja"
            size="sm"
            w="full"
            value={birthday ? new Date(birthday) : new Date()}
            onChange={(value) => {
              const dateStr = format(value, 'yyyy-MM-dd')
              setBirthday(dateStr)}
            }
          />
        </FormControl>
        <FormControl label="Gender" required>
          <InputGroup>
            <InputLeftElement>
              <VenusAndMarsIcon />
            </InputLeftElement>

            <RadioGroup
              direction="row"
              defaultValue="m"
              value={gender}
              onChange={setGender}
            >
              <Radio value="m">👦おとこのこ</Radio>
              <Radio value="f">👧おんなのこ</Radio>
            </RadioGroup>
          </InputGroup>
        </FormControl>
      </DialogBody>
    </Dialog>
  );
};

export default AddChild;
