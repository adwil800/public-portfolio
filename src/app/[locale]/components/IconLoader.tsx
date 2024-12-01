
'use client';

import {useMediaQuery} from "@mui/material";
import icons from "./svgIcons";

const getIcon = (tool: string, height: number, width: number) => { 
  const formattedTool = tool.replace(".", "").replace("-", "").replace(" ", "");
  const IconComponent = icons[formattedTool];
  if (!IconComponent) return <span>{tool}</span>;
  return <IconComponent height={height} width={width || '100%'} className="mr-2"/>;
}

interface IconLoaderProps {
  name: string;
  sm: [number, number];
  md: [number, number];
}

export default function IconLoader({name, sm, md}: IconLoaderProps) {

  const isAfterMD = useMediaQuery('(min-width:960px)'); 
  const isUntilMD = useMediaQuery('(max-width:959px)'); 

  const iconWidth = isUntilMD ? sm[0] : isAfterMD ? md[0] : md[0];
  const iconHeight = isUntilMD ? sm[1] : isAfterMD ? md[1] : md[1];
  
  return (
    <>
      { getIcon(name, iconHeight, iconWidth) }
    </>
  );
}
