import React from 'react';

import { Box, CircularProgress, LinearProgress } from './kit';

export const Loading: React.FC<{ size?: number; type?: 'circular' | 'linear' }> = ({
  size,
  type = 'circular',
}) => {
  return type === 'linear' ? (
    <LinearProgress />
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%">
      <CircularProgress size={size} />
    </Box>
  );
};
