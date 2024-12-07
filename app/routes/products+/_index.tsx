import type {MetaFunction} from '@remix-run/node';
import {redirect} from '@remix-run/react';
import {useTranslation} from 'react-i18next';

import {Stack, useMediaQuery} from '@mui/material';

import {useQueryProductsList} from '~/services/products';

import {SkeletonOnLoading} from '~/global/components/skeleton-on-loading';
import {AppButton} from '~/global/components/app-button';
import theme from '~/global/components/mui/theme';

import {ProductsTable} from './components/table';
import {MobileProductsList} from './components/mobileProducts/mobile-products';

//
//

export const handle = {i18n: ['common', 'products']};
export const meta: MetaFunction = () => [{title: 'Remix App - Products'}];

export const clientLoader = async () => {
  if (!window.localStorage.getItem('_at')) return redirect('/');

  return null;
};

//
//

export default function Products() {
  const {t} = useTranslation(['common']);
  const {data, isLoading} = useQueryProductsList();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Stack alignItems="flex-end" my={2}>
        <SkeletonOnLoading isLoading={isLoading}>
          <AppButton to="/products/create" variant="contained">
            {t('common:create')}
          </AppButton>
        </SkeletonOnLoading>
      </Stack>

      {isMobile ? (
        <MobileProductsList data={data?.result} />
      ) : (
        <ProductsTable data={data?.result} isLoading={isLoading} />
      )}
    </>
  );
}
