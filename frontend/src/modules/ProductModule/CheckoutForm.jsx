import { Form, Input, Button, Steps, Select, Radio, Space, Divider, Card, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { TextArea } = Input;
const { Text } = Typography;

const steps = [
  {
    title: 'Shipping',
    content: 'shipping-form',
  },
  {
    title: 'Payment',
    content: 'payment-form',
  },
  {
    title: 'Review',
    content: 'review',
  },
];

function CheckoutForm({ cartItems = [] }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 10; // Example shipping cost
    const tax = subtotal * 0.1; // Example tax rate
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  };

  const onFinish = async (values) => {
    setLoading(true);
    const totals = calculateTotal();
    const orderData = {
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      shippingAddress: values.shippingAddress,
      billingAddress: values.sameAsShipping ? values.shippingAddress : values.billingAddress,
      paymentMethod: values.paymentMethod,
      subtotal: totals.subtotal,
      tax: totals.tax,
      shippingCost: totals.shipping,
      total: totals.total,
      orderStatus: 'pending',
      paymentStatus: 'pending'
    };

    dispatch(crud.create({ entity: 'invoice', jsonData: orderData }))
      .then(() => {
        navigate('/order-confirmation');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderShippingForm = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Form.Item
        name={['shippingAddress', 'name']}
        label="Full Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['shippingAddress', 'street']}
        label="Street Address"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['shippingAddress', 'city']}
        label="City"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['shippingAddress', 'state']}
        label="State"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['shippingAddress', 'zipCode']}
        label="ZIP Code"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['shippingAddress', 'phone']}
        label="Phone"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Space>
  );

  const renderPaymentForm = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Form.Item
        name="paymentMethod"
        label="Payment Method"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="credit_card">Credit Card</Radio>
            <Radio value="paypal">PayPal</Radio>
            <Radio value="bank_transfer">Bank Transfer</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="sameAsShipping"
        valuePropName="checked"
      >
        <Radio>Billing address same as shipping</Radio>
      </Form.Item>

      {/* Add conditional billing address form */}
    </Space>
  );

  const renderReview = () => {
    const totals = calculateTotal();
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Order Summary">
          {cartItems.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text>{item.name} x {item.quantity}</Text>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            </div>
          ))}
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Subtotal:</Text>
            <Text>${totals.subtotal.toFixed(2)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Shipping:</Text>
            <Text>${totals.shipping.toFixed(2)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Tax:</Text>
            <Text>${totals.tax.toFixed(2)}</Text>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Total:</Text>
            <Text strong>${totals.total.toFixed(2)}</Text>
          </div>
        </Card>
      </Space>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderShippingForm();
      case 1:
        return renderPaymentForm();
      case 2:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          {renderStepContent()}

          <div style={{ marginTop: 24 }}>
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" loading={loading} onClick={() => form.submit()}>
                Place Order
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CheckoutForm;
