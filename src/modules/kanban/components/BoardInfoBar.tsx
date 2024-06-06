'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronsUpDown, Plus } from 'lucide-react';

import { useModal } from '@/hooks/use-modal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button, buttonVariants } from '@/components/ui/button';
import { Command, CommandGroup } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import CustomModal from '@/components/common/CustomModal';
import BoardDetailsForm from '@/modules/kanban/components/forms/BoardDetails';
import { IBoard } from '@/modules/kanban/models/board.model';

interface PipelineInfoBarProps {
  boardId: string;
  boards: IBoard[];
}

const BoardInfoBar: React.FC<PipelineInfoBarProps> = ({ boardId, boards }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(boardId);
  const { setOpen: setModalOpen, setClose: setModalClose } = useModal();

  const handleClickCreatePipeline = () => {
    setModalOpen(
      <CustomModal
        title="Create a Board"
        subTitle="Boards allows you to group tickets into lanes and track your tasks all in one place."
        scrollShadow={false}
      >
        <BoardDetailsForm boardId={boardId} />
      </CustomModal>
    );
  };

  return (
    <>
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-2 sm:w-48"
            >
              {value
                ? boards.find((board) => board._id === value)?.name
                : 'Select a pipeline'}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[100vw - 16px] p-0 sm:w-48">
            <Command className="w-full">
              {/* <CommandEmpty>No pipelines found.</CommandEmpty> */}
              <CommandGroup className="w-full">
                {boards.map((board) => {
                  return (
                    <Link
                      key={board._id}
                      href={`/kanban/${board._id}`}
                      className={cn(
                        buttonVariants({
                          variant: value === board._id ? 'default' : 'ghost',
                          size: 'sm',
                        }),
                        {
                          'bg-primary font-bold text-white':
                            value === board._id,
                        },
                        'w-full justify-start gap-2'
                      )}
                    >
                      <span>{board.name}</span>
                    </Link>
                  );
                })}
                <Button
                  variant="default"
                  className="mt-4 flex w-full gap-2"
                  onClick={handleClickCreatePipeline}
                >
                  <Plus className="h-4 w-4" />
                  Create Board
                </Button>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default BoardInfoBar;
