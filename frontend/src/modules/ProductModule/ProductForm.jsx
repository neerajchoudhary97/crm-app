import { Form, Input, InputNumber, Select, Upload, Switch, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function ProductForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = {
      ...values,
      productType: values.productType || 'physical',
      images: values.images?.map(file => ({
        url: file.response?.url || file.url,
        public_id: file.response?.public_id || file.public_id
      })),
      specifications: values.specifications?.map(spec => ({
        name: spec.name,
        value: spec.value
      })),
      variations: values.variations?.map(variation => ({
        name: variation.name,
        options: variation.options
      }))
    };

    dispatch(crud.create({ entity: 'quote', jsonData: formData }))
      .then(() => {
        navigate('/products');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        productType: 'physical',
        enabled: true,
        featured: false,
        stock: 0,
        specifications: [],
        variations: []
      }}
    >
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: 'Please enter product name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="productType"
        label="Product Type"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="physical">Physical Product</Option>
          <Option value="digital">Digital Product</Option>
          <Option value="service">Service</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="electronics">Electronics</Option>
          <Option value="clothing">Clothing</Option>
          <Option value="books">Books</Option>
          {/* Add more categories */}
        </Select>
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          precision={2}
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="discountedPrice"
        label="Discounted Price"
      >
        <InputNumber
          min={0}
          precision={2}
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="images"
        label="Product Images"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="/api/upload"
          listType="picture-card"
          multiple
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="brand"
        label="Brand"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.List name="specifications">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Missing spec name' }]}
                  style={{ marginRight: 8, flex: 1 }}
                >
                  <Input placeholder="Specification Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: 'Missing spec value' }]}
                  style={{ marginRight: 8, flex: 1 }}
                >
                  <Input placeholder="Specification Value" />
                </Form.Item>
                <Button type="link" onClick={() => remove(name)}>Delete</Button>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Specification
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item name="featured" valuePropName="checked">
        <Switch checkedChildren="Featured" unCheckedChildren="Not Featured" />
      </Form.Item>

      <Form.Item name="enabled" valuePropName="checked">
        <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Product
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProductForm;
