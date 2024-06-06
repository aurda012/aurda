'use client';

import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EditProfileForm from '@/app/shared/logistics/customer-profile/edit-profile/edit-profile-form';
import { PiNotePencil } from 'react-icons/pi';

interface EditProfileProps {
  className?: string;
}

export default function EditProfileButton({ className }: EditProfileProps) {
  const { openModal } = useModal();
  return (
    <Button
      variant="outline"
      className={cn('gap-2', className)}
      onClick={() =>
        openModal({
          view: <EditProfileForm />,
          customSize: '850px',
        })
      }
    >
      <PiNotePencil className="h-5 w-5" /> Edit Profile
    </Button>
  );
}
