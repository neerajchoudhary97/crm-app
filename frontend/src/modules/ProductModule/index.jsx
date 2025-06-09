import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, Image, Rate, Tag, Typography } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';

import useCart from './useCart';
import CartDrawer from './CartDrawer';

const { Title, Text } = Typography;

function ProductList() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const products = useSelector(selectListItems);

  const {
    cartItems,
    cartVisible,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    setCartVisible
  } = useCart();

  useEffect(() => {
    dispatch(crud.list({ entity: 'quote' }));
  }, []);

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div>
      <div className="space-between mb-4">
        <Title level={4}>Products</Title>
        <Link to="/product/create">
          <Button type="primary">Add New Product</Button>
        </Link>
      </div>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
            <Card
              hoverable
              cover={
                <Image
                  alt={product.name}
                  src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                  preview={false}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              }
              actions={[
                <Button
                  type="link"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>,
                <Button
                  type="link"
                  icon={wishlist.includes(product._id) ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => toggleWishlist(product._id)}
                />
              ]}
            >
              <Link to={`/product/${product._id}`}>
                <Title level={5} ellipsis>{product.name}</Title>
              </Link>
              <div className="space-between mb-2">
                <Text strong>${product.price}</Text>
                {product.discountedPrice && (
                  <Text delete type="secondary">
                    ${product.price}
                  </Text>
                )}
              </div>
              <div className="mb-2">
                <Rate allowHalf defaultValue={product.averageRating || 0} disabled />
                <Text type="secondary"> ({product.ratings?.length || 0})</Text>
              </div>
              <div>
                {product.stock > 0 ? (
                  <Tag color="success">In Stock</Tag>
                ) : (
                  <Tag color="error">Out of Stock</Tag>
                )}
                {product.featured && <Tag color="blue">Featured</Tag>}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <CartDrawer
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeFromCart}
      />
    </div>
  );
}

export default ProductList;
