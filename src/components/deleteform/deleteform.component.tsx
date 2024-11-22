'use client';

import React, { useState } from 'react';
import Button from '@/components/button/button.component';
import Input from '../input/input.component';

interface DeleteFormProps<T> {
  item: T; 
  itemName: string; 
  itemSpecifiedName: string;
  onDelete: (item: T) => Promise<void>; 
}

const DeleteForm = <T,>({ item, itemName, itemSpecifiedName, onDelete }: DeleteFormProps<T>) => {
  const [confirmation, setConfirmation] = useState('');

  const handleDelete = async () => {
    await onDelete(item);
  };

  return (
    <div className="max-w-[600px] shadow-md mx-auto my-16 px-12 py-16 flex flex-col gap-4">
      <p className='text-lg'>Tem certeza de que deseja excluir o {itemName}: &apos;{itemSpecifiedName}&apos;</p>
      <p className='text-lg'>Digite  &quot;delete&quot; para confirmar a exclusão:</p>
      <Input
        type="text"
        value={confirmation}
        handleChange={(_, e) => setConfirmation(e.target.value)}
        placeholder="Type 'delete' to confirm"
        className="w-full"
      />
      <Button
        handleClick={handleDelete}
        disabled={confirmation.toLowerCase() !== 'delete'}
        className='bg-red-600'
        textColor="foreground"
      >
        Excluir {itemName}
      </Button>
    </div>
  );
};

export default DeleteForm;