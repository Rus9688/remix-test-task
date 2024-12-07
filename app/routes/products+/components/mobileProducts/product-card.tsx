import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {formatRelative} from 'date-fns';

import {Card, CardMedia, CardContent, Typography, Box, Button} from '@mui/material';
import {EditOutlined, DeleteOutline} from '@mui/icons-material';

import {AppButton} from '~/global/components/app-button';

import {ApiProduct} from '~/api-client/types';

import {ProductCardItem} from './product-card-item';

const DEFAULT_IMAGE =
  'https://img.freepik.com/free-vector/natural-logo-sets_53876-79869.jpg?semt=ais_hybrid';

interface ProductCardProps {
  product: ApiProduct;
  onDelete: (item: ApiProduct) => void;
}

export const ProductCard: FC<ProductCardProps> = ({product, onDelete}) => {
  const {t} = useTranslation(['common', 'products']);

  const {productId, title, image, isActive, sku, quantity, price, priceSale, createdAt, updatedAt} =
    product;

  const titleText = title.en || title.ar;

  const formatNumeric = (val?: number | null) => (val != null ? val.toLocaleString() : null);

  const priceText = formatNumeric(price);
  const salePriceText = formatNumeric(priceSale);
  const quantityText = formatNumeric(quantity);

  const createdAtText = createdAt ? formatRelative(new Date(createdAt), new Date()) : null;
  const updatedAtText =
    updatedAt && updatedAt !== createdAt ? formatRelative(new Date(updatedAt), new Date()) : null;

  return (
    <Card sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <CardMedia
        component="img"
        height={340}
        image={image || DEFAULT_IMAGE}
        alt={titleText || ''}
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        {isActive && (
          <Typography fontWeight={500} variant="body1" sx={{color: '#32CD32'}} textAlign="end">
            {t('common:active')}
          </Typography>
        )}

        {titleText && (
          <Box display="flex" gap={1} mb={2}>
            <Typography fontWeight={700} variant="body1">
              {titleText}
            </Typography>
          </Box>
        )}

        {sku && <ProductCardItem label={t('products:sku')} value={sku} />}
        {quantityText && <ProductCardItem label={t('products:quantity')} value={quantityText} />}
        {priceText && <ProductCardItem label={t('products:price')} value={priceText} />}
        {salePriceText && <ProductCardItem label={t('products:priceSale')} value={salePriceText} />}
        {createdAtText && <ProductCardItem label={t('common:createdAt')} value={createdAtText} />}
        {updatedAtText && <ProductCardItem label={t('common:updatedAt')} value={updatedAtText} />}

        <Box display="grid" gap={2} gridTemplateColumns="1fr 1fr">
          <AppButton variant="outlined" to={`/products/${productId}`}>
            <EditOutlined />
          </AppButton>

          <Button variant="contained" onClick={() => onDelete(product)} color="error">
            <DeleteOutline />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
