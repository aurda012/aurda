'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { PlusCircle, Trash, X } from 'lucide-react';

import {
  deleteTag,
  getTagsForUser,
  upsertTag,
} from '@/modules/kanban/actions/tag.actions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../../../components/ui/command';
import { Tag } from '../../../../components/ui/tag';
import { cn } from '@/lib/utils';
import { ITag } from '@/modules/kanban/models/tag.model';
import { Types } from 'mongoose';
import { Text } from 'rizzui';
import { saveActivity } from '@/database/actions/activity.actions';

interface TagDetailsProps {
  userId: string;
  getSelectedTags: (tags: ITag[]) => void;
  defaultTags?: ITag[];
}

const TAG_COLORS = ['BLUE', 'ORANGE', 'ROSE', 'PURPLE', 'GREEN'] as const;
type TagColor = typeof TAG_COLORS;

const TagDetails: React.FC<TagDetailsProps> = ({
  getSelectedTags,
  userId,
  defaultTags,
}) => {
  const router = useRouter();

  const [selectedTags, setSelectedTags] = React.useState<ITag[]>(
    defaultTags || []
  );
  const [tags, setTags] = React.useState<ITag[]>([]);
  const [value, setValue] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');

  React.useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const response = await getTagsForUser(userId);

        if (response) {
          setTags(response);
        }
      };

      fetchData();
    }
  }, [userId]);

  React.useEffect(() => {
    getSelectedTags(selectedTags);
  }, [selectedTags, getSelectedTags]);

  const handleDeleteSelection = (tagId: string) => {
    setSelectedTags(() => selectedTags.filter((tag) => tag._id !== tagId));
  };

  // prevent duplicate tags
  const handleAddSelections = (tag: ITag) => {
    if (selectedTags.every((t) => t._id !== tag._id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddTag = async () => {
    if (!value) {
      toast.error('Tags need to have a name');

      return null;
    }
    if (!selectedColor) {
      toast.error('Please select a color');

      return null;
    }

    const tagData: ITag = {
      _id: new Types.ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      color: selectedColor,
      name: value,
      user: userId,
    };

    setTags([...tags, tagData]);
    setValue('');
    setSelectedColor('');

    try {
      await upsertTag(tagData);

      toast.success(<Text as="b">Created Tag!</Text>);
    } catch (error) {
      toast.error(<Text as="b">There was a problem creating the tag.</Text>);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    setTags(tags.filter((tag) => tag._id !== tagId));

    try {
      await deleteTag(tagId);

      toast.success(<Text as="b">Tag deleted!</Text>);

      router.refresh();
    } catch (error) {
      toast.error(<Text as="b">There was a problem deleting the tag.</Text>);
    }
  };

  return (
    <AlertDialog>
      <Command className="bg-transparent">
        {!!selectedTags.length && (
          <div className="border-border mb-2 flex flex-wrap gap-2 rounded-md border-2 bg-background p-2">
            {selectedTags.map((tag) => (
              <div key={tag._id} className="flex items-center">
                <Tag title={tag.name} colorName={tag.color} />
                <X
                  className="h-4 w-4 cursor-pointer text-muted-foreground"
                  onClick={() => handleDeleteSelection(tag._id)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="my-2 flex items-center gap-2">
          {TAG_COLORS.map((colorName) => (
            <div
              className={cn('rounded-sm border transition-all', {
                'border-black dark:border-white': colorName === selectedColor,
              })}
              key={colorName}
            >
              <Tag
                key={colorName}
                selectedColor={setSelectedColor}
                className="px-4"
                colorName={colorName}
              />
            </div>
          ))}
        </div>
        <div className="relative">
          <CommandInput
            className="w-full border-none bg-transparent outline-none focus:ring-0"
            placeholder="Search for tag..."
            value={value}
            onValueChange={setValue}
          />
          <PlusCircle
            onClick={handleAddTag}
            className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-muted-foreground transition-all hover:text-primary"
          />
        </div>
        <CommandList>
          <CommandSeparator />
          <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
            No tags found.
          </CommandEmpty>
          <CommandGroup>
            {tags.map((tag) => (
              <CommandItem
                key={tag._id}
                className="flex cursor-pointer items-center justify-between !bg-transparent !font-light hover:!bg-primary/20"
              >
                <div onClick={() => handleAddSelections(tag)}>
                  <Tag title={tag.name} colorName={tag.color} />
                </div>

                <AlertDialogTrigger>
                  <Trash className="h-4 w-4 cursor-pointer text-muted-foreground transition-all hover:text-rose-400" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                      This action cannot be undone. This will permanently delete
                      your the tag and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={() => handleDeleteTag(tag._id)}
                    >
                      Delete Tag
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </AlertDialog>
  );
};

export default TagDetails;
