import { Drawer, List, Button, InputNumber, Typography, Space, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

function CartDrawer({ visible, onClose, cartItems = [], updateQuantity, removeItem }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setLoading(true);
    // Navigate to checkout page
    navigate('/checkout');
    onClose();
  };

  return (
    <Drawer
      title="Shopping Cart"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
      footer={
        <div style={{ padding: '16px 0' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Subtotal:</Text>
              <Text strong>${calculateTotal().toFixed(2)}</Text>
            </div>
            <Button
              type="primary"
              block
              onClick={handleCheckout}
              loading={loading}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </Space>
        </div>
      }
    >
      {cartItems.length === 0 ? (
        <Empty
          description="Your cart is empty"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeItem(item._id)}
                />
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={
                  <Space direction="vertical">
                    <Text type="secondary">${item.price}</Text>
                    <InputNumber
                      min={1}
                      max={item.stock}
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item._id, value)}
                    />
                  </Space>
                }
              />
              <div>
                <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
              </div>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
}

export default CartDrawer;
