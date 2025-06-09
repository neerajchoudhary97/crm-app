import { Avatar, Popover, Button, Badge, Col, List } from 'antd';

// import Notifications from '@/components/Notification';

import { RocketOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';

export default function UpgradeButton() {
  const translate = useLanguage();

  return (
    <Badge count={1} size="small">
      <Button
        // type="primary"
        // style={{
          // float: 'right',
          // marginTop: '5px',
          // cursor: 'pointer',
          // background: 'white',
          // boxShadow: '0 2px 0 rgb(82 196 26 / 20%)',
        // }}
        // icon={<RocketOutlined />}
        // onClick={() => {
        //   window.open(`http://localhost:3000/`);
        // }}
      >
        {/* {translate('Try Commercial')} */}
      </Button>
    </Badge>
    
  );
}

console.log(
  '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
);
