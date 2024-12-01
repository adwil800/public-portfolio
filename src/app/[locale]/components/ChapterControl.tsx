'use client';

import {Link} from "@/navigation";
import {useMediaQuery} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface NextChapterButtonProps {
  label: string;
  target: string;
  direction: 'left' | 'right';
}

export default function ChapterControl({ label, target, direction }: NextChapterButtonProps) {
  
  const isUntilMD = useMediaQuery('(max-width:960px)'); 

  return (
    <>
      {
        isUntilMD &&
        <div className="flex justify-center mb-4 mt-4 ml-1 mr-1">
          <Link href={target} className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          {
            direction === 'left' && <ArrowLeftIcon />
          }
            {label || 'Next Chapter'}
          {
            direction === 'right' && <ArrowRightIcon />
          }
          </Link>
        </div>
      }
    </>
  )
}