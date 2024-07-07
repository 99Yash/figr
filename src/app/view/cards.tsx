'use client';

import { Button } from '@/components/view/button';
import { InputSelect } from '@/components/view/input-select';
import { Inputs } from '@/components/view/inputs';
import { useAppSelector } from '@/store';

export function Cards() {
  const config = useAppSelector((state) => state.config);

  return (
    <div className="flex  justify-center" style={{ gap: config.spacing.value }}>
      <Inputs />
      <Button />
      <InputSelect />
    </div>
  );
}
